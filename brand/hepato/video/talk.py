# Montaj UGC cu voce + lip sync: cadre cu persoana care vorbește (clipuri lip sync) alternate cu cadre de acoperire
# peste care vocea continuă, subtitrări arse, cadru final cu cutia. 4:5, 1080x1350.
# Rulare: python3 fetch.py && python3 talk.py v1 v2 ...   (scenarii în TALKS; fișiere în talk/<id>/)
import json, os, subprocess, sys
from PIL import Image

D = os.path.dirname(os.path.abspath(__file__))
W, H, FPS = 1080, 1350, 30
U = lambda n: f'../ugc/{n}.jpg'
B = lambda n: f'broll/{n}.jpg'
LIVER = dict(img=U('U6-ficat-gras-vs-sanatos'), fx=0, fy=1, zoom=1.9, pos='top')

# Scenariu = segmente audio (a = vorbește la cameră, b = voce peste cadre, c = amestec, d = final).
# Durata fiecărui segment vine din fișierul .wav; cadrele lui o împart egal (sau după 'w').
# face = clipul lip sync al segmentului (talk/<id>/<audio>.mp4), img = imagine statică, end = cadrul final.
F = lambda t, **k: dict(face=True, t=t, **k)
I = lambda img, t, **k: dict(img=img, t=t, **k)
BR = lambda n, t, fx=.5, **k: dict(img=B(n), fx=fx, t=t, **k)
LV = lambda t, **k: dict(**LIVER, t=t, **k)
END = lambda: dict(audio='d', shots=[dict(end=True, t='Comandă acum. Plătești la livrare.')])
TALKS = {
  'v1': dict(out='T1-ficatul-din-stanga', segs=[
    dict(audio='a', shots=[F('Uitați-vă la ficatul din stânga.', hook=True), F('Galben, umflat, plin de grăsime. Așa arăta și al meu.')]),
    dict(audio='b', shots=[BR('B04-obosita', 'Oboseală toată ziua', .6), BR('B05-burta', 'Balonare după fiecare masă'),
                           BR('B06-dulce-noaptea', 'Pofte de dulce noaptea', .4), LV('Nu doare deloc. De asta nu-ți dai seama.')]),
    dict(audio='c', shots=[F('O cană de Hepato Nova Detox pe zi, 30 de zile', w=1.2), BR('B02-plante', 'Armurariu, anghinare, păpădie, gălbenele, sunătoare', w=1.1),
                           F('Ficatul tău îți va mulțumi.', w=.7)]),
    END()]),
  'v2': dict(out='T2-nu-e-burta-de-bere', segs=[
    dict(audio='a', shots=[F('Toată lumea zice că e burtă de bere.', hook=True), F('Nu e. E ficat gras.')]),
    dict(audio='b', shots=[BR('B03-sarmale', 'Sarmale, mici, pâine, iar sarmale'), BR('B05-burta', 'După fiecare masă desfăceam nasturele'),
                           BR('B07-gratar', 'Ficatul procesează tot ce mănânci'), LV('1 din 3 români îl are încărcat cu grăsime')]),
    dict(audio='c', shots=[F('O cană de Hepato Nova Detox după masă', w=1.1), BR('B02-plante', 'Anghinare și păpădie pentru digestie. Armurariu pentru ficat.', w=1.2),
                           F('Fără pastile. Fără chimicale.', w=.8)]),
    END()]),
  'v3': dict(out='T3-ficatul-uraste-craciunul', segs=[
    dict(audio='a', shots=[F('Știți ce urăște ficatul vostru?', hook=True, w=1.3), F('Crăciunul.', hook=True, w=.7)]),
    dict(audio='b', shots=[BR('B03-sarmale', '40 de sarmale'), BR('B07-gratar', 'Mici, cârnați, cozonac, vin'),
                           BR('B05-burta', 'Tu sărbătorești 3 zile'), LV('Ficatul tău plătește tot anul')]),
    dict(audio='c', shots=[F('Anul ăsta l-am pregătit din timp'), BR('B01-ceai-turnat', 'O cană dimineața și una seara, 30 de zile', .4, pos='top', w=1.3),
                           F('5 plante. Făcut în România.', w=.8)]),
    END()]),
  'v4': dict(out='T4-nu-eram-leneasa', segs=[
    dict(audio='a', shots=[F('Nu eram leneșă.', hook=True, w=3.0), F('Ficatul meu era sufocat. Și nici nu știam.', w=4.08)]),
    dict(audio='b', shots=[BR('B04-obosita', 'Moartă de oboseală de la 3 după-amiaza', .6, w=3.9), BR('B06-dulce-noaptea', 'Ciocolată direct din dulap, seara', .4, w=3.6),
                           BR('B05-burta', 'Burta umflată după fiecare masă', w=3.6), LV('1 din 3 români are ficatul gras. Și nu știe.', w=4.3)]),
    dict(audio='c', shots=[F('O cană de Hepato Nova Detox pe zi', w=4.6), BR('B02-plante', 'Armurariu, anghinare, păpădie, gălbenele, sunătoare', w=5.4),
                           F('Fără zahăr. Fără pastile.', w=3.8)]),
    END()]),
  'v5': dict(out='T5-ficatul-moare-in-liniste', segs=[
    dict(audio='a', shots=[F('Stau pe hol la medic din cauza ficatului.', hook=True), F('Și puteam să fac ceva acum 5 ani.')]),
    dict(audio='b', shots=[BR('B04-obosita', 'Ficatul nu doare. Azi e doar oboseală.', .6, w=1.4), BR('B05-burta', 'Mâine e burta umflată'),
                           LV('Peste 5 ani: ficat gras')]),
    dict(audio='c', shots=[F('Nu aștepta să ajungi aici.', w=.8), BR('B02-plante', 'Hepato Nova Detox: 5 plante, o cană pe zi', w=1.1),
                           BR('B09-curier', 'Comanzi într-un minut. Plătești la ușă.', .45)]),
    END()]),
  'v6': dict(out='T6-noi-suntem-trei-in-casa', segs=[
    dict(audio='a', shots=[F('1 din 3 români are ficatul gras.', hook=True, w=1.2), F('Noi suntem trei în casă.', w=.8)]),
    dict(audio='b', shots=[BR('B03-sarmale', 'Eu gătesc sarmale, ciorbe, prăjituri'), BR('B05-burta', 'Toți eram obosiți și balonați după masă'),
                           BR('B04-obosita', 'Și niciunul nu se gândea la ficat', .6)]),
    dict(audio='c', shots=[F('Acum: o cană de Hepato Nova pentru fiecare', w=1.2), BR('B02-plante', 'Plante pe care le știau și bunicii'),
                           BR('B09-curier', 'Livrare acasă. Plătești la ușă.', .45)]),
    END()]),
}

def wavdur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))

def plan(tag):
    """Transformă segmentele în cadre cu durate exacte (sumă = durata audio a fiecărui segment)."""
    shots = []
    for seg in TALKS[tag]['segs']:
        L = wavdur(f"{D}/talk/{tag}/{seg['audio']}.wav") + (1.2 if seg['audio'] == 'd' else 0)
        ws = [s.get('w', 1.0) for s in seg['shots']]; t = 0.0
        for s, w in zip(seg['shots'], ws):
            d = round(L * w / sum(ws), 3); s = dict(s, dur=d)
            if s.pop('face', False): s.update(vid=seg['audio'], ss=round(t, 3))
            shots.append(s); t += d
    return shots

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
    T = TALKS[tag]; T['shots'] = plan(tag); T['audio'] = [g['audio'] for g in T['segs']]; td = f'{D}/talk/{tag}'; os.makedirs(f'{D}/_tmp', exist_ok=True); os.makedirs(f'{D}/out', exist_ok=True)
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
