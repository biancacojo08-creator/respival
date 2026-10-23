# Reclame Vision Elite+ cu personaj care vorbește (lip sync) -> out/F*.mp4, 4:5 1080x1350 pentru Facebook.
# Cadre: personajul (clip lip sync), apropiere pe față, cadru cu sticla, cadru final. Subtitrări pe bucăți de 2-4 cuvinte,
# sincronizate pe pauzele din voce (fraza = segment între pauze, cuvintele împart segmentul după numărul de litere).
# Rulare: python3 make.py f1 f2 f3
import os, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

D = os.path.dirname(os.path.abspath(__file__)); W, H, FPS = 1080, 1350, 30
FONT = f'{D}/../fonts/Archivo-900.ttf'; FONT2 = f'{D}/../fonts/Inter-700.ttf'
END = 2.6  # secunde de cadru final după voce

# segs: (început, sfârșit, text) – intervalele de vorbire din silencedetect.
# cuts: (de la, până la, tip) peste clipul de bază: 'face' = apropiere pe față, 'pack' = sticla pe fundal curat.
V = {
  'v1': dict(out='VV1-vederea-incetosata', hook='Vederea ți-e tot mai încețoșată?', segs=[
      (0.26, 3.05, 'Vederea ți-e din ce în ce mai încețoșată?'), (3.53, 6.83, 'Literele se amestecă, iar ochelarii nu mai ajută?'),
      (7.34, 8.68, 'Așa eram și eu.'), (9.08, 12.21, 'Nu mai puteam citi nici eticheta de la borcan.'),
      (12.76, 17.32, 'Acum iau Vision Elite+, cu morcov și beta-caroten.'), (17.58, 20.66, 'Susține vederea și calmează ochii obosiți.'),
      (21.02, 22.70, 'Eu văd din nou literele mici.'), (23.04, 25.19, 'Comandă acum, plătești la livrare!')],
    cuts=[(7.34, 12.21, 'face'), (14.6, 18.6, 'pack'), (21.02, 22.70, 'face')], pack='Cu morcov și beta-caroten'),
  'v2': dict(out='VV2-fara-ochelari', hook='Te-ai săturat să nu vezi fără ochelari?', segs=[
      (0.31, 3.04, 'Te-ai săturat să nu vezi pe unde mergi fără ochelari?'), (3.56, 5.72, 'Să bagi ața în ac de zece ori?'),
      (6.09, 8.36, 'Eu cos de treizeci de ani.'), (8.62, 10.41, 'Ochii mei sunt pâinea mea.'),
      (11.42, 15.31, 'De aceea iau Vision Elite+, cu morcov și beta-caroten.'), (15.56, 18.09, 'Susține vederea și ochii obosiți de lucru.'),
      (18.82, 20.81, 'Nu mai aștepta să fie prea târziu.'), (20.99, 22.94, 'Comandă acum, plătești la livrare!')],
    cuts=[(6.09, 10.41, 'face'), (13.0, 17.0, 'pack'), (18.82, 20.81, 'face')], pack='Pentru ochii obosiți', hook_y=470),
  'v3': dict(out='VV3-nu-mai-vezi-ca-inainte', hook='Începi să nu mai vezi ca înainte?', segs=[
      (0.22, 2.59, 'Începi să nu mai vezi ca înainte?'), (3.62, 8.35, 'Ții cartea tot mai departe și strângi din ochi ca să citești?'),
      (9.38, 10.49, 'Nu e doar vârsta.'), (11.47, 13.44, 'Ochii tăi au nevoie de ajutor.'),
      (14.14, 19.05, 'Eu iau Vision Elite+, cu morcov și beta-caroten.'),
      (19.35, 24.38, 'Ochii mei nu mai sunt obosiți seara, și citesc iarăși cărțile mele.'), (25.25, 28.33, 'Comandă acum, plătești la livrare!')],
    cuts=[(3.62, 8.35, 'face'), (16.0, 20.0, 'pack'), (22.2, 24.38, 'face')], pack='Cu morcov și beta-caroten'),
}

def chunks(segs):
    """Împarte fiecare frază în bucăți de max ~18 caractere / 4 cuvinte, cu timp proporțional cu literele."""
    out = []
    for t0, t1, text in segs:
        words = text.split(); groups, cur = [], []
        for w in words:
            if cur and (len(' '.join(cur + [w])) > 18 or len(cur) == 4): groups.append(cur); cur = []
            cur.append(w)
            if w[-1] in ',.?!' and len(cur) > 1: groups.append(cur); cur = []
        if cur: groups.append(cur)
        n = sum(len(' '.join(g)) for g in groups); t = t0
        for g in groups:
            d = (t1 - t0) * len(' '.join(g)) / n; out.append((t, t + d, ' '.join(g))); t += d
    # subtitrarea rămâne pe ecran până la următoarea (fără goluri în pauze)
    return [(a, out[i + 1][0] if i + 1 < len(out) else b, s) for i, (a, b, s) in enumerate(out)]

def font(sz, f=FONT): return ImageFont.truetype(f, sz)

def text_block(txt, sz, maxw, fill, stroke=0, sfill=(0, 0, 0), f=FONT):
    """Text centrat pe mai multe rânduri, ca imagine RGBA."""
    fn = font(sz, f); lines, cur = [], ''
    for w in txt.split():
        t = (cur + ' ' + w).strip()
        if fn.getlength(t) > maxw and cur: lines.append(cur); cur = w
        else: cur = t
    lines.append(cur); lh = int(sz * 1.12)
    im = Image.new('RGBA', (maxw + 2 * stroke + 20, lh * len(lines) + 2 * stroke + 20)); d = ImageDraw.Draw(im)
    for i, l in enumerate(lines):
        d.text((im.width / 2, stroke + 10 + i * lh), l, font=fn, fill=fill, anchor='ma', stroke_width=stroke, stroke_fill=sfill)
    return im

def sub_img(txt):
    """Subtitrare: alb pe pastilă neagră semi-transparentă, cuvântul produsului în galben."""
    fn = font(64); tw = int(fn.getlength(txt)); pad = 28
    im = Image.new('RGBA', (tw + 2 * pad, 64 + 2 * 20)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, im.width - 1, im.height - 1), 22, fill=(0, 0, 0, 175))
    x = pad
    for w in txt.split(' '):
        col = (255, 225, 77) if any(k in w for k in ('Vision', 'Elite')) else (255, 255, 255)
        d.text((x, 18), w, font=fn, fill=col); x += fn.getlength(w + ' ')
    return im

def hook_img(txt):
    im = text_block(txt.upper(), 76, 960, (255, 255, 255), stroke=7)
    bg = Image.new('RGBA', im.size); bg.alpha_composite(im); return bg

def cover(im, zoom=1.0, cx=.5, cy=.5):
    w, h = im.size; s = max(W / w, H / h) * zoom
    im = im.resize((int(w * s + .5), int(h * s + .5)), Image.BICUBIC)
    x = int((im.width - W) * cx); y = int((im.height - H) * cy)
    return im.crop((x, y, x + W, y + H))

def ease(p): return p * p * (3 - 2 * p)

BOTTLE = Image.open(f'{D}/bottle.png').convert('RGB')  # packshot-ul original al sticlei

def bottle_cut():
    """Sticla decupată de pe fundalul alb (prag pe luminozitate + margine netezită)."""
    im = BOTTLE; g = im.convert('L').point(lambda v: 255 if v < 246 else 0).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
    rgba = im.convert('RGBA'); rgba.putalpha(g.filter(ImageFilter.GaussianBlur(1.2))); return rgba.crop(rgba.getbbox())

def bg_grad():
    bg = Image.new('RGB', (W, H)); d = ImageDraw.Draw(bg)
    for y in range(H):
        k = y / H; d.line([(0, y), (W, y)], fill=(int(232 - 40 * k), int(243 - 30 * k), int(255 - 10 * k)))
    glow = Image.new('L', (W, H)); ImageDraw.Draw(glow).ellipse((140, 260, 940, 1060), fill=255)
    bg.paste((255, 255, 255), mask=glow.filter(ImageFilter.GaussianBlur(120))); return bg

def pack_frame(cut, bg, p, label):
    fr = bg.copy().convert('RGBA')
    b = cut.resize((int(cut.width * (H * .62 * (1 + .1 * ease(p))) / cut.height), int(H * .62 * (1 + .1 * ease(p)))), Image.LANCZOS)
    sh = Image.new('RGBA', fr.size); ImageDraw.Draw(sh).ellipse((W / 2 - b.width * .45, 230 + b.height - 30, W / 2 + b.width * .45, 230 + b.height + 30), fill=(0, 40, 90, 70))
    fr.alpha_composite(sh.filter(ImageFilter.GaussianBlur(18))); fr.alpha_composite(b, ((W - b.width) // 2, 230))
    fr.alpha_composite(label, ((W - label.width) // 2, 90)); return fr

def end_frame(cut, bg):
    fr = bg.copy().convert('RGBA'); b = cut.resize((int(cut.width * 640 / cut.height), 640), Image.LANCZOS)
    fr.alpha_composite(b, ((W - b.width) // 2, 150))
    d = ImageDraw.Draw(fr); y = 860
    d.rounded_rectangle((110, y, W - 110, y + 140), 34, fill=(229, 37, 42)); d.text((W / 2, y + 70), 'COMANDĂ ACUM →', font=font(72), fill='white', anchor='mm')
    d.text((W / 2, y + 210), '✓ Plătești la livrare   ✓ Livrare rapidă', font=font(40, FONT2), fill=(20, 40, 80), anchor='mm')
    return fr

def run(tag):
    v = V[tag]; vid = f'{D}/talk/{tag}.mp4'; wav = f'{D}/talk/{tag}.wav'
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav]))
    total = dur + END; n = int(total * FPS)
    subs = [(a, b, sub_img(s)) for a, b, s in chunks(v['segs'])]; hook = hook_img(v['hook'])
    cut = bottle_cut(); bg = bg_grad(); label = text_block(v['pack'].upper(), 60, 940, (14, 45, 110)); endf = end_frame(cut, bg)
    # cadrele clipului lip sync, citite ca flux brut la 30 fps, scalate la 1080 lățime
    vh = int(1088 * W / 832)
    src = subprocess.Popen(['ffmpeg', '-loglevel', 'error', '-i', vid, '-vf', f'fps={FPS},scale={W}:{vh}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    os.makedirs(f'{D}/out', exist_ok=True); dst = f"{D}/out/{v['out']}.mp4"
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-i', wav,
                           '-filter_complex', f'[1:a]apad,atrim=0:{total:.2f},loudnorm=I=-14:TP=-1.5[a]', '-map', '0:v', '-map', '[a]',
                           '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k',
                           '-movflags', '+faststart', dst], stdin=subprocess.PIPE)
    last = None
    for i in range(n):
        t = i / FPS
        raw = src.stdout.read(W * vh * 3)
        if len(raw) == W * vh * 3: last = Image.frombytes('RGB', (W, vh), raw)
        base = last.crop((0, 0, W, H))  # păstrăm partea de sus (fața), tăiem jos
        if t >= dur:
            fr = endf
        else:
            kind = next((k for a, b, k in v['cuts'] if a <= t < b), None)
            if kind == 'pack':
                a, b = next((a, b) for a, b, k in v['cuts'] if k == 'pack'); fr = pack_frame(cut, bg, (t - a) / (b - a), label)
            elif kind == 'face':
                fr = last.crop((90, 0, W - 90, int((W - 180) * 1.25))).resize((W, H), Image.BICUBIC).convert('RGBA')
            else:
                fr = base.convert('RGBA')
            if t < 3.2:
                fr.alpha_composite(hook, ((W - hook.width) // 2, v.get('hook_y', 70)))
            s = next((im for a, b, im in subs if a <= t < b), None)
            if s: fr.alpha_composite(s, ((W - s.width) // 2, int(H * (.87 if kind == 'pack' else .74))))
        ff.stdin.write(fr.convert('RGB').tobytes())
    src.stdout.close(); src.wait(); ff.stdin.close(); ff.wait(); print('ok', dst, f'{total:.1f}s')

for tag in sys.argv[1:]: run(tag)
