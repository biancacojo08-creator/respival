# Montează videoclipurile din videos.js: decupaj 4:5, zoom lent pe fiecare cadru, text peste, tranziții. -> out/V*.mp4
# Rulare: node overlays.js && python3 make.py [filtru-id]
import json, os, subprocess, sys
from PIL import Image

D = os.path.dirname(os.path.abspath(__file__))
W, H, FPS, XF = 1080, 1350, 30, 0.3
SCENE, END = 4.0, 5.5
videos = json.loads(subprocess.check_output(['node', '-e', 'console.log(JSON.stringify(require("./videos.js")))'], cwd=D))
os.makedirs(f'{D}/out', exist_ok=True); os.makedirs(f'{D}/_tmp', exist_ok=True)

def still(src, fx=.5, fy=.5, zoom=1.0, dst=None):
    """Decupează imaginea la 4:5 (cu focus și zoom) și o mărește la 2x pentru un zoompan fără tremurat."""
    im = Image.open(src).convert('RGB'); w, h = im.size
    cw, ch = (w, w * 5 / 4) if w / h < 4 / 5 else (h * 4 / 5, h)
    cw, ch = cw / zoom, ch / zoom
    x, y = (w - cw) * fx, (h - ch) * fy
    im.crop((int(x), int(y), int(x + cw), int(y + ch))).resize((W * 2, H * 2), Image.LANCZOS).save(dst, quality=95)

def clip(i, img, ov, dur, out, zin):
    n = int(dur * FPS)
    z = f"min(1+0.0009*on,1.12)" if zin else f"max(1.12-0.0009*on,1)"
    vf = (f"[0:v]zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={n}:s={W}x{H}:fps={FPS},setsar=1[bg];"
          f"[1:v]format=rgba,fade=in:st=0.15:d=0.3:alpha=1[t];[bg][t]overlay=0:0:shortest=1,format=yuv420p")
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', img, '-loop', '1', '-t', str(dur), '-i', ov,
                    '-filter_complex', vf, '-t', str(dur), '-r', str(FPS), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out], check=True)

only = sys.argv[1:]
for v in videos:
    if only and not any(o in v['id'] for o in only): continue
    parts, durs = [], []
    for i, s in enumerate(v['scenes']):
        ov = f"{D}/ov/{v['id']}-{i}.png"; dur = END if s.get('end') else SCENE
        src = ov if s.get('end') else os.path.join(D, s['img'])
        st = f"{D}/_tmp/{v['id']}-{i}.jpg"
        still(src, s.get('fx', .5), s.get('fy', .5), s.get('zoom', 1.0), st)
        blank = f"{D}/_tmp/blank.png"; Image.new('RGBA', (W, H), (0, 0, 0, 0)).save(blank)
        out = f"{D}/_tmp/{v['id']}-{i}.mp4"
        clip(i, st, blank if s.get('end') else ov, dur, out, i % 2 == 0)
        parts.append(out); durs.append(dur)
    # tranziții fade între cadre + pistă audio mută (unele platforme o cer)
    inputs = sum([['-i', p] for p in parts], [])
    fc, last, off = '', '[0:v]', 0.0
    for k in range(1, len(parts)):
        off += durs[k - 1] - XF
        fc += f"{last}[{k}:v]xfade=transition=fade:duration={XF}:offset={off:.2f}[x{k}];"; last = f'[x{k}]'
    total = sum(durs) - XF * (len(parts) - 1)
    dst = f"{D}/out/{v['id']}.mp4"
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inputs, '-f', 'lavfi', '-t', f'{total:.2f}', '-i', 'anullsrc=r=44100:cl=stereo',
                    '-filter_complex', fc.rstrip(';'), '-map', last, '-map', f'{len(parts)}:a', '-c:v', 'libx264', '-preset', 'medium',
                    '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', '-movflags', '+faststart', dst], check=True)
    print(f"ok {v['id']}  {total:.1f}s")
