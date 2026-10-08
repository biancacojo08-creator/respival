#!/usr/bin/env python3
"""Pune subtitrări și texte hook pe un video UGC, gratuit, cu ffmpeg.

Folosire:
  python3 brand/segmind/subtitrari.py video.mp4 config.json iesire.mp4

config.json:
  {
    "script": "textul exact vorbit în video",
    "hooks": [
      {"text": "CE-AI PĂȚIT, BĂRBATE?!", "start": 0, "end": 3},
      {"text": "2 PUFURI ÎN GURĂ. ATÂT.", "at_word": "Power", "dur": 3},
      {"text": "PLATA LA LIVRARE", "last": 3}
    ]
  }

Sincronizarea se face după pauzele din vocea video-ului (ffmpeg silencedetect):
fiecare cuvânt primește timp proporțional cu lungimea lui, doar în porțiunile cu vorbire.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

FONTS = Path(__file__).resolve().parent.parent / "fonts"
WORDS_PER_CHUNK = 3


def probe(video):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height:format=duration", "-of", "json", video],
        capture_output=True, text=True, check=True).stdout
    d = json.loads(out)
    return d["streams"][0]["width"], d["streams"][0]["height"], float(d["format"]["duration"])


def speech_segments(video, duration):
    err = subprocess.run(
        ["ffmpeg", "-i", video, "-af", "silencedetect=noise=-32dB:d=0.25", "-f", "null", "-"],
        capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    segs, t = [], 0.0
    for s, e in zip(starts, ends + [duration] * (len(starts) - len(ends))):
        if s - t > 0.08:
            segs.append((t, s))
        t = e
    if duration - t > 0.08:
        segs.append((t, duration))
    return segs or [(0.0, duration)]


def word_times(words, segs):
    total = sum(e - s for s, e in segs)
    weights = [len(w) + 2 for w in words]
    scale = total / sum(weights)
    out, acc = [], 0.0

    def real(x):
        for s, e in segs:
            if x <= e - s:
                return s + x
            x -= e - s
        return segs[-1][1]

    for w, wt in zip(words, weights):
        a, acc = acc, acc + wt * scale
        out.append((w, real(a), real(acc - 1e-3)))
    return out


def ts(t):
    t = max(t, 0)
    return f"{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}"


def esc(s):
    return s.replace("{", "(").replace("}", ")")


def build_ass(cfg, w, h, duration, timed):
    cap = round(h * 0.052)
    hook = round(h * 0.048)
    lines = [
        "[Script Info]", "ScriptType: v4.00+", f"PlayResX: {w}", f"PlayResY: {h}", "",
        "[V4+ Styles]",
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, "
        "Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, "
        "Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
        f"Style: Cap,Montserrat Black,{cap},&H00FFFFFF,&H0000FFFF,&H00000000,&H80000000,"
        f"-1,0,0,0,100,100,0,0,1,{max(4, cap // 9)},2,2,60,60,{round(h * 0.24)},1",
        f"Style: Hook,Montserrat Black,{hook},&H00FFFFFF,&H00FFFFFF,&H001E1EDC,&H001E1EDC,"
        f"-1,0,0,0,100,100,0,0,3,{max(10, hook // 4)},0,8,60,60,{round(h * 0.08)},1",
        "", "[Events]",
        "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    ]
    pop = r"{\fad(60,0)\fscx85\fscy85\t(0,90,\fscx100\fscy100)}"
    chunks, cur = [], []
    for item in timed:
        cur.append(item)
        if len(cur) == WORDS_PER_CHUNK or item[0][-1] in ".!?…:":
            chunks.append(cur)
            cur = []
    if cur:
        chunks.append(cur)
    for n, chunk in enumerate(chunks):
        end_chunk = chunks[n + 1][0][1] if n + 1 < len(chunks) else chunk[-1][2] + 0.3
        for j, (_, ws, we) in enumerate(chunk):
            nxt = chunk[j + 1][1] if j + 1 < len(chunk) else end_chunk
            parts = []
            for k, (cw, _, _) in enumerate(chunk):
                word = esc(cw.upper())
                parts.append(r"{\c&H00FFFF&}" + word + r"{\c&HFFFFFF&}" if k == j else word)
            lead = pop if j == 0 else ""
            lines.append(f"Dialogue: 0,{ts(ws)},{ts(nxt)},Cap,,0,0,0,,{lead}{' '.join(parts)}")
    hooks = []
    for hk in cfg.get("hooks", []):
        if "at_word" in hk:
            key = hk["at_word"].lower()
            st = next((s for wd, s, _ in timed if wd.lower().strip(".,!?…:") == key), 0)
            en = st + hk.get("dur", 3)
        elif "last" in hk:
            st, en = duration - hk["last"], duration
        else:
            st, en = hk["start"], hk["end"]
        hooks.append([st, en, hk["text"]])
    hooks.sort()
    for a, b in zip(hooks, hooks[1:]):
        a[1] = min(a[1], b[0])
    for st, en, text in hooks:
        if en > st:
            lines.append(f"Dialogue: 1,{ts(st)},{ts(en)},Hook,,0,0,0,,{pop}{esc(text)}")
    return "\n".join(lines) + "\n"


def main():
    video, cfg_path, out = sys.argv[1:4]
    cfg = json.loads(Path(cfg_path).read_text(encoding="utf-8"))
    w, h, duration = probe(video)
    words = cfg["script"].split()
    timed = word_times(words, speech_segments(video, duration))
    ass = Path(out).with_suffix(".ass")
    ass.write_text(build_ass(cfg, w, h, duration, timed), encoding="utf-8")
    subprocess.run(
        ["ffmpeg", "-y", "-i", video, "-vf", f"ass={ass}:fontsdir={FONTS}",
         "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-c:a", "copy", out],
        check=True)
    print(f"Gata: {out}")


if __name__ == "__main__":
    main()
