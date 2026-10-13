# Builds word-by-word karaoke subtitles (ASS) for a VENDIS video, free and offline:
# word timings come from the script text spread over the speech regions found by ffmpeg silencedetect.
# Usage: python3 subs.py <id> <width> <height>   -> tmp/<id>/subs.ass
import json, re, subprocess, sys, os
D = os.path.dirname(os.path.abspath(__file__))
vid, W, H = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
text = json.load(open(os.path.join(D, 'scripts.json')))[vid]['text']
raw = os.path.join(D, 'raw', vid + '.mp4')

log = subprocess.run(['ffmpeg', '-hide_banner', '-i', raw, '-af', 'silencedetect=noise=-35dB:d=0.12', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', raw]))
st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
sil = list(zip(st, en + [dur] * (len(st) - len(en))))
speech, t = [], 0.0  # speech regions = complement of silences
for a, b in sil:
    if a > t: speech.append((t, a))
    t = max(t, b)
if t < dur: speech.append((t, dur))
total = sum(b - a for a, b in speech)

def at(x):  # position x seconds into the speech-only timeline -> real time
    for a, b in speech:
        if x <= b - a: return a + x
        x -= b - a
    return speech[-1][1]

words = text.split()
wt = [len(re.sub(r'\W', '', w)) + 1.5 for w in words]
cum, times = 0.0, []
for w in wt:
    times.append((at(cum / sum(wt) * total), at((cum + w) / sum(wt) * total))); cum += w

# show spoken numbers as figures, e.g. 'cincisprezece la sută' -> '15%'
i = 0
while i < len(words) - 2:
    if words[i].lower() == 'cincisprezece' and words[i + 1] == 'la' and words[i + 2].startswith('sută'):
        words[i:i + 3] = ['15%' + words[i + 2][4:]]; times[i:i + 3] = [(times[i][0], times[i + 2][1])]
    i += 1

# chunks of up to 3 words, breaking after punctuation
chunks, cur = [], []
for i, w in enumerate(words):
    cur.append(i)
    if len(cur) == 3 or re.search(r'[.,!?:]$', w) or i == len(words) - 1: chunks.append(cur); cur = []

def ts(s): return f'{int(s // 3600)}:{int(s % 3600 // 60):02d}:{s % 60:05.2f}'
fs = round(W * 0.085)
out = [f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: S,Archivo,{fs},&H00FFFFFF,&H00FFFFFF,&H00000000,&H90000000,0,0,0,0,100,100,0,0,1,{round(fs * 0.15)},{round(fs * 0.07)},5,40,40,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"""]
y = round(H * 0.575)
for c in chunks:
    for k, i in enumerate(c):
        a = times[i][0]
        b = times[c[k + 1]][0] if k + 1 < len(c) else times[i][1] + 0.12
        line = ' '.join(('{\\c&H3FD2FF&}' + words[j].upper() + '{\\c&HFFFFFF&}') if j == i else words[j].upper() for j in c)
        out.append(f'Dialogue: 0,{ts(a)},{ts(b)},S,,0,0,0,,{{\\pos({W // 2},{y})}}{line}')
os.makedirs(os.path.join(D, 'tmp', vid), exist_ok=True)
open(os.path.join(D, 'tmp', vid, 'subs.ass'), 'w').write('\n'.join(out) + '\n')
print(vid, len(words), 'words', len(chunks), 'chunks')
