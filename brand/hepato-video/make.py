# Builds final/hepato-ficat-gras.mp4 (1080x1350, 4:5): the lip-synced woman (avatar.mp4) holding the tea,
# a slow push-in on the two livers while she talks about them, hook card, word-by-word subtitles, end card.
# Reuses the helpers from ../cardio-video/make.py. Usage: node cards.js && python3 make.py
import os, re, subprocess, sys
D = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(D, '..', 'cardio-video'))
from make import W, H, FPS, END_LEAD, TAIL, HOOK_DUR, run, dur, shot, subs

TEXT = ("Dacă și ficatul tău arată așa... te simți mereu balonată, grea, și parcă digestia nu mai merge... vezi asta! "
        "Uite. Ăsta e un ficat sănătos. Iar ăsta... e un ficat înecat în grăsime. Și știi care e partea cea mai rea? Nu doare! "
        "Te anunță doar prin balonare, oboseală și poftă de dulce. Eu nu mai aștept să fie prea târziu. "
        "Beau Ceaiul Hepato Nova Detox, de la Novensa. Anghinare, armurariu, păpădie, gălbenele și sunătoare. "
        "Susține funcția ficatului și ajută digestia. Una-două căni pe zi, între mese. Treizeci de plicuri, treizeci de zile. "
        "Nu-ți mai lăsa ficatul de izbeliște! Comandă acum, plătești la livrare.")

tmp = os.path.join(D, 'tmp'); os.makedirs(tmp, exist_ok=True); os.makedirs(os.path.join(D, 'final'), exist_ok=True)
voice, avatar = os.path.join(D, 'voce.wav'), os.path.join(D, 'avatar.mp4')
vd = dur(voice); end_at, total = vd - END_LEAD, vd + TAIL
ass = os.path.join(tmp, 'subs.ass'); subs(voice, TEXT, end_at, ass)

# the livers close-up runs from "Uite" to the end of "grăsime"
ev = [(l.split(',')[1], l.split(',')[2], l) for l in open(ass) if l.startswith('Dialogue')]
sec = lambda t: int(t.split(':')[0]) * 3600 + int(t.split(':')[1]) * 60 + float(t.split(':')[2])
z0 = min(sec(a) for a, b, l in ev if 'UITE' in l)
z1 = max(sec(b) for a, b, l in ev if 'GRĂSIME' in l)

base = os.path.join(tmp, 'base.mp4')  # avatar cover-cropped to 4:5, cut where the end card starts
shot(avatar, end_at, 0, base)
endp = os.path.join(tmp, 'end.mp4'); shot(os.path.join(D, 'cards', 'end.png'), total - end_at, 0, endp)
lst = os.path.join(tmp, 'list.txt'); open(lst, 'w').write(f"file '{base}'\nfile '{endp}'\n")
body = os.path.join(tmp, 'body.mp4'); run('ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', body)

# livers close-up: slow push-in on the table, taken from a clean frame (the live video has the box dipping in at that moment)
LIVERS = f"crop={W}:{int(H * 0.42)}:0:{int(H * 0.58)},scale={2 * W}:{2 * H},setsar=1"
# lip-sync glitches (an extra hand flashes in at the bottom): hold the clean frame just before, or cut to the livers
HOLDS, CUTAWAYS = [(18.55, 19.05), (26.75, 27.05)], [(31.6, 32.8)]
stills = [(os.path.join(tmp, f'still{i}.png'), t) for i, t in enumerate([4.0] + [a - 0.05 for a, b in HOLDS] + [31.4])]
for f, t in stills:
    run('ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', base, '-frames:v', '1', f)
n = round((z1 - z0) * FPS)
fc = (f"[3:v]{LIVERS},zoompan=z='1.0+0.15*on/{n}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)/2':d={n}:s={W}x{H}:fps={FPS},"
      f"setpts=PTS+{z0}/TB[zc];[0:v][zc]overlay=enable='between(t,{z0},{z1})':eof_action=pass[v0];")
k = 0
for i, (a, b) in enumerate(HOLDS):
    fc += f"[{4 + i}:v]scale={W}:{H},setsar=1[hd{i}];[v{k}][hd{i}]overlay=enable='between(t,{a},{b})'[v{k + 1}];"; k += 1
for a, b in CUTAWAYS:
    fc += f"[{4 + len(HOLDS)}:v]{LIVERS},scale={W}:{H}[ca];[v{k}][ca]overlay=enable='between(t,{a},{b})'[v{k + 1}];"; k += 1
fc += (f"[v{k}][2:v]overlay=enable='between(t,0,{HOOK_DUR})'[h];"
       f"[h]subtitles={ass}:fontsdir={os.path.join(D, '..', 'fonts')}[v];[1:a]apad=pad_dur={TAIL},atrim=duration={total}[a]")
ins = []
for i, (f, t) in enumerate(stills):
    ins += (['-i', f] if i == 0 else ['-loop', '1', '-i', f])
run('ffmpeg', '-v', 'error', '-y', '-i', body, '-i', voice, '-i', os.path.join(D, 'cards', 'hook.png'), *ins,
    '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-t', f'{total:.2f}',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k',
    '-movflags', '+faststart', os.path.join(D, 'final', 'hepato-ficat-gras.mp4'))
print('ok', f'{total:.1f}s', f'ficati {z0:.1f}-{z1:.1f}s')
