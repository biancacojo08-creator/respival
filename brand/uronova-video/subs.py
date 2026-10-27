"""Word-by-word karaoke subtitles for the talking-avatar videos.

The voice was generated from a known script, so the words come from the script (exact
spelling) and only the timing is estimated: ffmpeg silencedetect splits the audio into
speech runs, words are spread over the runs by character share, then inside each run.

Usage: python3 subs.py <video.mp4> <script.txt> <out.ass>
"""
import re
import subprocess
import sys

video, script_path, out = sys.argv[1:4]
text = re.sub(r'<[^>]+>', ' ', open(script_path, encoding='utf-8').read())
words = text.split()

dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', video]))
log = subprocess.run(['ffmpeg', '-i', video, '-af', 'silencedetect=noise=-30dB:d=0.12', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]

# speech runs = gaps between silences
runs, t = [], 0.0
for s, e in zip(starts, ends + [dur] * (len(starts) - len(ends))):
    if s - t > 0.15:
        runs.append((t, s))
    t = e
if dur - t > 0.15:
    runs.append((t, dur))

weight = [len(re.sub(r'\W', '', w)) + 1 for w in words]
total_w, total_t = sum(weight), sum(b - a for a, b in runs)

# assign words to runs by cumulative share, then spread inside each run
timed, wi, acc_t, acc_w = [], 0, 0.0, 0
for ri, (a, b) in enumerate(runs):
    acc_t += b - a
    target = total_w * acc_t / total_t
    chunk = []
    while wi < len(words) and (acc_w + weight[wi] / 2 <= target or ri == len(runs) - 1):
        chunk.append(wi)
        acc_w += weight[wi]
        wi += 1
    cw = sum(weight[i] for i in chunk) or 1
    t = a
    for i in chunk:
        d = (b - a) * weight[i] / cw
        timed.append((words[i], t, t + d))
        t += d


def ts(x):
    h, m = int(x // 3600), int(x % 3600 // 60)
    return f'{h}:{m:02d}:{x % 60:05.2f}'


head = """[Script Info]
ScriptType: v4.00+
PlayResX: 832
PlayResY: 1088

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: W,Archivo Black,66,&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,5,2,2,40,40,330,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
lines = []
# groups of up to 3 words that never run past the end of a sentence
groups, cur = [], []
for item in timed:
    cur.append(item)
    if len(cur) == 3 or item[0][-1] in '.!?':
        groups.append(cur)
        cur = []
if cur:
    groups.append(cur)
for grp in groups:
    for k, (w, a, b) in enumerate(grp):
        end = grp[k + 1][1] if k + 1 < len(grp) else b
        parts = [('{\\c&H3BD9FF&}' + x.upper() + '{\\c&HFFFFFF&}') if j == k else x.upper() for j, (x, _, _) in enumerate(grp)]
        lines.append(f'Dialogue: 0,{ts(a)},{ts(end)},W,,0,0,0,,{" ".join(parts)}')
open(out, 'w', encoding='utf-8').write(head + '\n'.join(lines) + '\n')
print(f'{len(words)} words, {len(runs)} speech runs, {dur:.1f}s -> {out}')
