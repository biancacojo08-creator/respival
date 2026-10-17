# Builds the 4 Cardio Balance voiceover videos (1080x1350, 4:5) from videos.json, free and offline:
# photos get a slow zoom/pan, AI clips are reused from ../animatii, hook card on top for the first seconds,
# word-by-word subtitles timed from the voice (silencedetect), end card with the product for the last seconds.
# Usage: python3 make.py [id ...]   (run `node cards.js` first)  -> final/<id>.mp4
import json, os, re, subprocess, sys
D = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1080, 1350, 30
END_LEAD, TAIL, HOOK_DUR = 2.6, 1.0, 3.6  # end card starts END_LEAD s before the voice ends; video runs TAIL s past it


def run(*a):
    subprocess.run(a, check=True)


def dur(f):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))


def shot(src, t, i, out):
    """One shot of t seconds as a 1080x1350 clip: slow zoom/pan on a photo, cover-crop (and hold last frame) on a video.
    A '#0.85' suffix on a photo path sets where the 4:5 crop sits horizontally (0 = left edge, 1 = right edge)."""
    src, _, fx = src.partition('#'); fx = float(fx or 0.5)
    cover = f'scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}'
    if src.endswith('.mp4'):
        vf = f'{cover},fps={FPS},tpad=stop_mode=clone:stop_duration={t},trim=duration={t},setsar=1,format=yuv420p'
        run('ffmpeg', '-v', 'error', '-y', '-i', src, '-vf', vf, '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', out)
        return
    n = round(t * FPS)
    # zoom in or out, drifting to alternate sides, on a 2x pre-scaled frame for smooth motion
    z = f'1.0+0.12*on/{n}' if i % 2 == 0 else f'1.12-0.12*on/{n}'
    x = f'(iw-iw/zoom)*{fx}'
    vf = (f'scale={2 * W}:{2 * H}:force_original_aspect_ratio=increase,crop={2 * W}:{2 * H}:(iw-ow)*{fx}:(ih-oh)/2,'
          f"zoompan=z='{z}':x='{x}':y='(ih-ih/zoom)*0.4':d={n}:s={W}x{H}:fps={FPS},setsar=1,format=yuv420p")
    run('ffmpeg', '-v', 'error', '-y', '-loop', '1', '-i', src, '-vf', vf, '-frames:v', str(n), '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', out)


def subs(voice, text, stop, out):
    """ASS karaoke subtitles: words spread over the speech regions found by silencedetect, up to 3 words per line."""
    log = subprocess.run(['ffmpeg', '-hide_banner', '-i', voice, '-af', 'silencedetect=noise=-35dB:d=0.15', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    total_d = dur(voice)
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
    speech, t = [], 0.0
    for a, b in zip(st, en + [total_d] * (len(st) - len(en))):
        if a > t: speech.append((t, a))
        t = max(t, b)
    if t < total_d: speech.append((t, total_d))
    total = sum(b - a for a, b in speech)

    def at(x):
        for a, b in speech:
            if x <= b - a: return a + x
            x -= b - a
        return speech[-1][1]

    words = text.replace('«', '').replace('»', '').split()
    wt = [len(re.sub(r'\W', '', w)) + 1.5 for w in words]
    cum, times = 0.0, []
    for w in wt:
        times.append((at(cum / sum(wt) * total), at((cum + w) / sum(wt) * total))); cum += w
    chunks, cur = [], []
    for i, w in enumerate(words):
        cur.append(i)
        if len(cur) == 3 or re.search(r'[.,!?:]$', w) or i == len(words) - 1: chunks.append(cur); cur = []
    ts = lambda s: f'{int(s // 3600)}:{int(s % 3600 // 60):02d}:{s % 60:05.2f}'
    lines = ['[Script Info]', 'ScriptType: v4.00+', f'PlayResX: {W}', f'PlayResY: {H}', '', '[V4+ Styles]',
             'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
             'Style: S,Archivo Black,74,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,0,0,0,0,100,100,0,0,1,7,3,2,60,60,300,1',
             '', '[Events]', 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text']
    for c in chunks:
        for i in c:
            a = times[i][0]
            b = times[c[c.index(i) + 1]][0] if i != c[-1] else times[i][1]
            if a >= stop: continue
            line = ' '.join(('{\\c&H3FD2FF&}' + re.sub(r'[.,]+$', '', words[j]).upper() + '{\\c&HFFFFFF&}') if j == i
                            else re.sub(r'[.,]+$', '', words[j]).upper() for j in c)
            lines.append(f'Dialogue: 0,{ts(a)},{ts(min(b, stop))},S,,0,0,0,,{line}')
    open(out, 'w').write('\n'.join(lines) + '\n')


def make(vid, v):
    tmp = os.path.join(D, 'tmp', vid); os.makedirs(tmp, exist_ok=True); os.makedirs(os.path.join(D, 'final'), exist_ok=True)
    voice = os.path.join(D, v['voice']); vd = dur(voice)
    end_at, total = vd - END_LEAD, vd + TAIL
    shots = v['shots']; seg = end_at / len(shots)
    parts = []
    for i, s in enumerate(shots):
        p = os.path.join(tmp, f's{i}.mp4'); shot(os.path.join(D, s), seg + (0.01 if i < len(shots) - 1 else 0), i, p); parts.append(p)
    endp = os.path.join(tmp, 'end.mp4')
    shot(os.path.join(D, 'cards', 'end.png'), total - end_at, 0, endp); parts.append(endp)
    lst = os.path.join(tmp, 'list.txt'); open(lst, 'w').write(''.join(f"file '{p}'\n" for p in parts))
    body = os.path.join(tmp, 'body.mp4')
    run('ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', body)
    ass = os.path.join(tmp, 'subs.ass'); subs(voice, v['text'], end_at, ass)
    fonts = os.path.join(D, '..', 'fonts')
    fc = (f"[0:v][2:v]overlay=enable='between(t,0,{HOOK_DUR})'[h];"
          f"[h]subtitles={ass}:fontsdir={fonts}[v];[1:a]apad=pad_dur={TAIL},atrim=duration={total}[a]")
    run('ffmpeg', '-v', 'error', '-y', '-i', body, '-i', voice, '-i', os.path.join(D, 'cards', vid + '-hook.png'),
        '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-t', f'{total:.2f}',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k',
        '-movflags', '+faststart', os.path.join(D, 'final', vid + '.mp4'))
    print('ok', vid, f'{total:.1f}s')


V = json.load(open(os.path.join(D, 'videos.json')))
for vid in (sys.argv[1:] or V):
    make(vid, V[vid])
