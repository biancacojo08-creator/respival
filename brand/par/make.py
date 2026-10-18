# Video TikTok 9:16 înainte/după pentru o mască de păr. Randare cadru cu cadru (PIL) + voce -> out/par-inainte-dupa.mp4
# Rulare: python3 make.py   (textele se randează cu Playwright din caps.js)
import json, math, os, random, subprocess
from PIL import Image, ImageEnhance

D = os.path.dirname(os.path.abspath(__file__)); W, H, FPS = 1080, 1920, 30
S = lambda n: f'{D}/src/{n}.jpeg'
random.seed(7)

# Cadrele, cu timpii aliniați pe pauzele din voce (src/voce.wav).
# kind: zoom (zoom lent ± tremur), flash (alb), split (cortină înainte/după), end (cadrul final)
SHOTS = [
    dict(t0=0.0,  t1=1.7,  kind='zoom', img='inainte-spate', z=(1.0, 1.12), shake=6, cap='hook', label='inainte'),
    dict(t0=1.7,  t1=2.8,  kind='zoom', img='inainte-varfuri', z=(1.05, 1.2), shake=8, cap='paie', label='inainte'),
    dict(t0=2.8,  t1=4.4,  kind='zoom', img='masca', z=(1.0, 1.1), cap='masca'),
    dict(t0=4.4,  t1=5.35, kind='zoom', img='inainte-spate', z=(1.15, 1.3), shake=4, cap='uitati'),
    dict(t0=5.35, t1=5.55, kind='flash'),
    dict(t0=5.55, t1=7.9,  kind='zoom', img='dupa-spate', z=(1.18, 1.0), cap='wow', label='dupa', glow=True),
    dict(t0=7.9,  t1=10.7, kind='split', a='inainte-varfuri', b='dupa-varfuri', cap='nimeni'),
    dict(t0=10.7, t1=13.2, kind='end', img='dupa-spate'),
]
CAPS = {
    'hook': ('hook', 'PĂRUL MEU ERA <b>COMPLET ARS</b>'), 'paie': ('box', 'Paie, nu alta.'),
    'masca': ('box', 'Am pus masca asta...'), 'uitati': ('box', '...și uitați-vă!'),
    'wow': ('wow', 'WOW.'), 'nimeni': ('box', 'Nimeni nu crede că e același păr'),
}

def render_caps():
    spec = {k: dict(style=s, text=t) for k, (s, t) in CAPS.items()}
    json.dump(spec, open(f'{D}/_caps.json', 'w'))
    subprocess.run(['node', 'caps.js', f'{D}/_caps.json'], cwd=D, check=True)

def cover(im, zoom=1.0, cx=.5, cy=.5):
    w, h = im.size; s = max(W / w, H / h) * zoom
    im = im.resize((int(w * s + .5), int(h * s + .5)), Image.BICUBIC)
    x = int((im.width - W) * cx); y = int((im.height - H) * cy)
    return im.crop((x, y, x + W, y + H))

def ease(p): return p * p * (3 - 2 * p)

def frames():
    srcs = {n: Image.open(S(n)).convert('RGB') for n in ['inainte-spate', 'inainte-varfuri', 'masca', 'dupa-spate', 'dupa-varfuri']}
    big = {n: im.resize((im.width * 2, im.height * 2), Image.LANCZOS) for n, im in srcs.items()}  # pentru zoom fără pixeli
    ov = {k: Image.open(f'{D}/_tmp/{k}.png') for k in list(CAPS) + ['inainte', 'dupa', 'end', 'disc']}
    total = SHOTS[-1]['t1']; n = int(total * FPS)
    for i in range(n):
        t = i / FPS; sh = next(s for s in SHOTS if s['t0'] <= t < s['t1']); p = (t - sh['t0']) / (sh['t1'] - sh['t0'])
        if sh['kind'] == 'flash':
            fr = Image.new('RGB', (W, H), (255, 255, 255))
        elif sh['kind'] == 'zoom' or sh['kind'] == 'end':
            z0, z1 = sh.get('z', (1.0, 1.06)); z = z0 + (z1 - z0) * ease(p)
            jx = jy = 0
            if sh.get('shake'): a = sh['shake'] * (1 - p * .5); jx, jy = random.uniform(-a, a), random.uniform(-a, a)
            fr = cover(big[sh['img']], z, .5 + jx / 400, .45 + jy / 400)
            if sh.get('glow'): fr = ImageEnhance.Brightness(fr).enhance(1.0 + .25 * max(0, 1 - p * 3))  # sclipire la dezvăluire
            if sh['kind'] == 'end': fr = ImageEnhance.Brightness(fr).enhance(.55)
        else:  # cortină: înainte în stânga, după vine din dreapta și se oprește la mijloc
            a = cover(big[sh['a']], 1.05); b = cover(big[sh['b']], 1.05)
            x = int(W * (1 - .5 * ease(min(1, p * 2.2))))
            fr = a.copy(); fr.paste(b.crop((x, 0, W, H)), (x, 0))
            fr.paste(Image.new('RGB', (8, H), (255, 255, 255)), (x - 4, 0))
            fr.paste(ov['inainte'], (0, 0), ov['inainte'])
            if p > .3: fr.paste(ov['dupa'], (0, 0), ov['dupa'])
        fr = fr.convert('RGBA')
        if sh.get('label') and sh['kind'] != 'split': fr.alpha_composite(ov[sh['label']])
        if sh.get('cap'):
            c = ov[sh['cap']]
            if sh['cap'] in ('hook', 'wow') and p < .15:  # pop-in
                s = .7 + 2 * p; c = c.resize((int(W * s), int(H * s))); off = ((W - c.width) // 2, (H - c.height) // 3)
                tmp = Image.new('RGBA', (W, H)); tmp.paste(c, off); c = tmp
            fr.alpha_composite(c)
        if sh['kind'] == 'end': fr.alpha_composite(ov['end'])
        if sh['kind'] != 'flash': fr.alpha_composite(ov['disc'])
        yield fr.convert('RGB').tobytes()

if __name__ == '__main__':
    os.makedirs(f'{D}/_tmp', exist_ok=True); os.makedirs(f'{D}/out', exist_ok=True)
    render_caps()
    out = f'{D}/out/par-inainte-dupa.mp4'; total = SHOTS[-1]['t1']
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                           '-i', f'{D}/src/voce.wav', '-filter_complex', f'[1:a]apad,atrim=0:{total},loudnorm=I=-14:TP=-1.5[a]',
                           '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
                           '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    for b in frames(): ff.stdin.write(b)
    ff.stdin.close(); ff.wait(); print('ok', out)
