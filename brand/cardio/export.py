# Downscales png-hd/ (2160) to png/ (1080) and builds the zip + overview.
import glob, os, zipfile
from PIL import Image
d = os.path.dirname(os.path.abspath(__file__))
fs = sorted(glob.glob(os.path.join(d, 'png-hd', 'C*.png')))
for f in fs:
    Image.open(f).convert('RGB').resize((1080, 1080), Image.LANCZOS).save(os.path.join(d, 'png', os.path.basename(f)), optimize=True)
W = 540
sheet = Image.new('RGB', (W * 4, W * 2), 'white')
for i, f in enumerate(fs):
    sheet.paste(Image.open(f).convert('RGB').resize((W, W), Image.LANCZOS), ((i % 4) * W, (i // 4) * W))
sheet.save(os.path.join(d, '_overview.jpg'), quality=88)
with zipfile.ZipFile(os.path.join(d, 'Cardio-Balance-reclame.zip'), 'w', zipfile.ZIP_DEFLATED) as z:
    for f in fs:
        n = os.path.basename(f)
        z.write(f, f'HD-2160/{n}')
        z.write(os.path.join(d, 'png', n), f'1080/{n}')
    z.write(os.path.join(d, 'cardio-cutout-hd.png'), 'borcan-decupat-HD.png')
    z.write(os.path.join(d, 'PERSONA-CARDIO-BALANCE.md'), 'Targetare-si-texte.md')
print(len(fs), 'ads zipped')
