# Montaj UGC cu voce + lip sync: cadre cu persoana care vorbește (clipuri lip sync) alternate cu cadre de acoperire
# peste care vocea continuă, subtitrări arse, cadru final cu cutia. 4:5, 1080x1350.
# Rulare: python3 talk.py <id>   (scenariile sunt în TALKS mai jos; fișierele audio/video în talk/<id>/)
import json, os, subprocess, sys
from PIL import Image

D = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1080, 1350, 30
U = lambda n: f'../ugc/{n}.jpg'
B = lambda n: f'broll/{n}.jpg'
LIVER = dict(img=U('U6-ficat-gras-vs-sanatos'), fx=0, fy=1, zoom=1.9, pos='top')

# Fiecare scenariu: piste audio în ordine (a, b, c, d) și cadrele vizuale cu durate care acoperă exact audio.
# Cadru: vid=clip lip sync (ss = secunda de start în clip) sau img=imagine statică; t=subtitrare.
TALKS = {
  'v4': dict(out='T4-nu-eram-leneasa', audio=['a', 'b', 'c', 'd'], shots=[
    dict(vid='a', ss=0, dur=3.0, t='Nu eram leneșă.', hook=True),
    dict(vid='a', ss=3.0, dur=4.08, t='Ficatul meu era sufocat. Și nici nu știam.'),
    dict(img=B('B04-obosita'), fx=.6, dur=3.9, t='Moartă de oboseală de la 3 după-amiaza'),
    dict(img=B('B06-dulce-noaptea'), fx=.4, dur=3.6, t='Ciocolată direct din dulap, seara'),
    dict(img=B('B05-burta'), fx=.5, dur=3.6, t='Burta umflată după fiecare masă'),
    dict(**LIVER, dur=4.3, t='1 din 3 români are ficatul gras. Și nu știe.'),
    dict(vid='c', ss=0, dur=4.6, t='O cană de Hepato Nova Detox pe zi'),
    dict(img=B('B02-plante'), fx=.5, dur=5.4, t='Armurariu, anghinare, păpădie, gălbenele, sunătoare'),
    dict(vid='c', ss=10.0, dur=3.8, t='Fără zahăr. Fără pastile.'),
    dict(end=True, dur=4.5, t='Comandă acum. Plătești la livrare.'),
  ]),
}

def caps(shots, tag):
    """Randează subtitrările (și cadrul final) ca PNG, prin overlays.js-style HTML."""
    spec = [dict(file=f'{D}/_tmp/{tag}-{i}.png', t=s['t'], hook=s.get('hook', False), pos=s.get('pos', ''), end=s.get('end', False))
            for i, s in enumerate(shots)]
    json.dump(spec, open(f'{D}/_tmp/{tag}-caps.json', 'w'))
    subprocess.run(['node', 'caps.js', f'{D}/_tmp/{tag}-caps.json'], cwd=D, check=True)
    return [x['file'] for x in spec]

def still(src, fx=.5, fy=.5, zoom=1.0, dst=None):
    im = Image.open(os.path.join(D, src)).convert('RGB'); w, h = im.size
    cw, ch = (w, w * 5 / 4) if w / h < 4 / 5 else (h * 4 / 5, h)
    cw, ch = cw / zoom, ch / zoom
    x, y = (w - cw) * fx, (h - ch) * fy
    im.crop((int(x), int(y), int(x + cw), int(y + ch))).resize((W * 2, H * 2), Image.LANCZOS).save(dst, quality=95)

def run(tag):
    T = TALKS[tag]; td = f'{D}/talk/{tag}'; os.makedirs(f'{D}/_tmp', exist_ok=True); os.makedirs(f'{D}/out', exist_ok=True)
    pngs = caps(T['shots'], tag); parts = []
    for i, s in enumerate(T['shots']):
        out = f'{D}/_tmp/{tag}-s{i}.mp4'; dur = s['dur']; n = int(round(dur * FPS))
        if 'vid' in s:
            src = ['-ss', str(s['ss']), '-t', str(dur), '-i', f"{td}/{s['vid']}.mp4"]
            bg = f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},setsar=1[bg]"
        else:
            st = f'{D}/_tmp/{tag}-st{i}.jpg'
            if s.get('end'): Image.open(pngs[i]).convert('RGB').resize((W * 2, H * 2)).save(st, quality=95)
            else: still(s['img'], s.get('fx', .5), s.get('fy', .5), s.get('zoom', 1.0), st)
            src = ['-i', st]; z = 'min(1+0.0009*on,1.12)' if i % 2 else 'max(1.12-0.0009*on,1)'
            bg = f"[0:v]zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={n}:s={W}x{H}:fps={FPS},setsar=1[bg]"
        ov = f'{D}/_tmp/blank.png' if s.get('end') else pngs[i]
        if s.get('end'): Image.new('RGBA', (W, H), (0, 0, 0, 0)).save(ov)
        fc = f"{bg};[1:v]format=rgba[t];[bg][t]overlay=0:0,format=yuv420p,trim=end_frame={n}"
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *src, '-loop', '1', '-i', ov, '-filter_complex', fc,
                        '-frames:v', str(n), '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-r', str(FPS), out], check=True)
        parts.append(out)
    lst = f'{D}/_tmp/{tag}-list.txt'; open(lst, 'w').write(''.join(f"file '{p}'\n" for p in parts))
    vis = f'{D}/_tmp/{tag}-vis.mp4'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', vis], check=True)
    ain = sum([['-i', f'{td}/{a}.wav'] for a in T['audio']], [])
    k = len(T['audio']); total = sum(s['dur'] for s in T['shots'])
    af = ''.join(f'[{j}:a]' for j in range(k)) + f'concat=n={k}:v=0:a=1,apad,atrim=0:{total:.2f},loudnorm=I=-14:TP=-1.5[a]'
    dst = f"{D}/out/{T['out']}.mp4"
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ain, '-i', vis, '-filter_complex', af, '-map', f'{k}:v', '-map', '[a]',
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', dst], check=True)
    print('ok', dst, f'{total:.1f}s')

for tag in sys.argv[1:]: run(tag)
