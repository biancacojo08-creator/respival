# Generates the Shopify product image "Cardio Balance – oferta 1+1".
# Usage: python3 cardio_1plus1.py <bottle_cutout.png> <out.jpg>
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

F = __file__.rsplit('/', 2)[0] + '/fonts/'
def font(name, size): return ImageFont.truetype(F + name, size)

W = H = 2000
RED, DARK_RED, INK, GREEN = (178, 30, 38), (122, 14, 20), (28, 28, 28), (76, 140, 74)

cut = Image.open(sys.argv[1]).convert('RGBA')
cut = cut.crop(cut.split()[3].point(lambda v: 255 if v > 20 else 0).getbbox())
# the source photo is cropped at the bottle base: drop the dark edge and fade it out
cut = cut.crop((0, 0, cut.width, cut.height - 6))
a = cut.split()[3]
for y in range(cut.height - 30, cut.height):
    k = (cut.height - y) / 30
    for x in range(cut.width):
        a.putpixel((x, y), round(a.getpixel((x, y)) * k))
cut.putalpha(a)

# background: warm cream with soft radial glow
bg = Image.new('RGB', (W, H), (246, 238, 232))
glow = Image.new('L', (W, H), 0)
ImageDraw.Draw(glow).ellipse((250, 450, 1750, 1750), fill=255)
bg.paste((255, 255, 255), mask=glow.filter(ImageFilter.GaussianBlur(220)))
img = bg.convert('RGBA')
d = ImageDraw.Draw(img)

# headline
def center(y, text, f, fill):
    w = d.textlength(text, font=f); d.text(((W - w) / 2, y), text, font=f, fill=fill)
center(95, 'OFERTĂ SPECIALĂ', font('Montserrat-800.ttf', 78), RED)
center(185, 'Cumpără 1, primești 2', font('Merriweather-900.ttf', 118), INK)

# bottles
bh = 1100
b = cut.resize((round(cut.width * bh / cut.height), bh), Image.LANCZOS)
floor = 1640
def shadow(cx):
    s = Image.new('L', (W, H), 0)
    ImageDraw.Draw(s).ellipse((cx - b.width * 0.55, floor - 40, cx + b.width * 0.55, floor + 45), fill=150)
    img.paste((60, 30, 25), mask=s.filter(ImageFilter.GaussianBlur(28)))
for cx in (W / 2 - 360, W / 2 + 360):
    shadow(cx)
    img.alpha_composite(b, (round(cx - b.width / 2), floor - bh))

# "+" between bottles
pc = (W // 2, floor - 260); r = 72
d.ellipse((pc[0] - r, pc[1] - r, pc[0] + r, pc[1] + r), fill=RED, outline='white', width=12)
d.text(pc, '+', font=font('Montserrat-900.ttf', 130), fill='white', anchor='mm')

# GRATIS starburst badge on the second bottle
import math
bc, R1, R2, n = (1690, 600), 245, 212, 22
pts = [(bc[0] + (R1 if i % 2 == 0 else R2) * math.cos(math.pi * i / n - math.pi / 2),
        bc[1] + (R1 if i % 2 == 0 else R2) * math.sin(math.pi * i / n - math.pi / 2)) for i in range(2 * n)]
sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).polygon([(x + 8, y + 14) for x, y in pts], fill=120)
img.paste((0, 0, 0), mask=sh.filter(ImageFilter.GaussianBlur(14)))
d.polygon(pts, fill=RED)
d.ellipse((bc[0] - 190, bc[1] - 190, bc[0] + 190, bc[1] + 190), outline=(255, 255, 255), width=6)
d.text((bc[0], bc[1] - 55), '1+1', font=font('BarlowCondensed-800.ttf', 190), fill='white', anchor='mm')
d.text((bc[0], bc[1] + 85), 'GRATIS', font=font('BarlowCondensed-800.ttf', 105), fill=(255, 226, 140), anchor='mm')

# bottom band with benefits
d.rectangle((0, 1700, W, H), fill=DARK_RED)
d.rectangle((0, 1700, W, 1712), fill=(214, 170, 90))
fb = font('Inter-700.ttf', 54)
items = ['2 cutii = 120 capsule', 'Tratament complet 2 luni', 'Livrare rapidă']
widths = [d.textlength(t, font=fb) + 80 for t in items]
gap = (W - 120 - sum(widths)) / (len(items) - 1)
x = 60
for t, w in zip(items, widths):
    cy = 1855
    d.ellipse((x, cy - 28, x + 56, cy + 28), fill='white')
    d.line([(x + 14, cy), (x + 25, cy + 12), (x + 43, cy - 12)], fill=DARK_RED, width=9, joint='curve')
    d.text((x + 80, cy), t, font=fb, fill='white', anchor='lm')
    x += w + gap

img.convert('RGB').save(sys.argv[2], quality=93)
