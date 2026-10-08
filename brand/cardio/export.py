# Downscales png-hd/ (2160) to png/ (1080) and builds the zip + overview for one series.
# Usage: python3 export.py            -> series C (Cardio-Balance-reclame.zip)
#        python3 export.py toamna     -> series T (Cardio-Balance-toamna.zip)
#        python3 export.py oferta     -> series O (Cardio-Balance-oferta-1plus1.zip)
#        python3 export.py v          -> series V (Cardio-Balance-1plus1-castigatoare.zip), mixed 1:1 and 4:5
import glob, os, sys, zipfile
from PIL import Image
d = os.path.dirname(os.path.abspath(__file__))
SETS = {'': ('C', 'Cardio-Balance-reclame.zip', '_overview.jpg'),
        'toamna': ('T', 'Cardio-Balance-toamna.zip', '_overview-toamna.jpg'),
        'oferta': ('O', 'Cardio-Balance-oferta-1plus1.zip', '_overview-oferta.jpg'),
        'v': ('V', 'Cardio-Balance-1plus1-castigatoare.zip', '_overview-v.jpg')}
prefix, zname, oname = SETS[sys.argv[1] if len(sys.argv) > 1 else '']
fs = sorted(glob.glob(os.path.join(d, 'png-hd', prefix + '[0-9]*.png')))
for f in fs:
    im = Image.open(f).convert('RGB')
    im.resize((1080, round(im.height * 1080 / im.width)), Image.LANCZOS).save(os.path.join(d, 'png', os.path.basename(f)), optimize=True)
cols = 5 if len(fs) > 8 else 4
W = 432 if cols == 5 else 540
sheet = Image.new('RGB', (W * cols, W * ((len(fs) + cols - 1) // cols)), 'white')
for i, f in enumerate(fs):
    t = Image.open(f).convert('RGB'); t.thumbnail((W, W), Image.LANCZOS)
    sheet.paste(t, ((i % cols) * W + (W - t.width) // 2, (i // cols) * W + (W - t.height) // 2))
sheet.save(os.path.join(d, oname), quality=88)
with zipfile.ZipFile(os.path.join(d, zname), 'w', zipfile.ZIP_DEFLATED) as z:
    for f in fs:
        n = os.path.basename(f)
        hd = os.path.join(d, 'png-hd', n[:-4] + '.jpg')
        Image.open(f).convert('RGB').save(hd, quality=94, subsampling=0)
        z.write(hd, f'HD-2160/{n[:-4]}.jpg')
        z.write(os.path.join(d, 'png', n), f'1080/{n}')
    z.write(os.path.join(d, 'cardio-cutout-hd.png'), 'borcan-decupat-HD.png')
    z.write(os.path.join(d, 'PERSONA-CARDIO-BALANCE.md'), 'Targetare-si-texte.md')
print(len(fs), 'ads zipped ->', zname)
