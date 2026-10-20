# Shopify product-gallery collages (2048x2048) for Novensa Vision / UroNova.
# People scenes come from Segmind nano-banana (src/, generated WITHOUT the product);
# the real packshot cutout is composited here so the label stays original and the bottle keeps its real, small size.
# Usage: python3 build.py vision|uronova
import sys, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
OUT = os.path.join(HERE, 'png')
FONTS = os.path.join(HERE, '..', 'fonts')
W = H = 2048
NAVY, GOLD, RED, GREEN, CREAM = (16, 42, 110), (212, 162, 76), (227, 38, 47), (46, 157, 74), (247, 244, 238)


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name + '.ttf'), size)


def src(name):
    return Image.open(os.path.join(SRC, name)).convert('RGB')


def cover(im, w, h, focus_y=0.5):
    """Scale and crop to fill w x h."""
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = (im.width - w) // 2
    y = int((im.height - h) * focus_y)
    return im.crop((x, y, x + w, y + h))


def place_bottle(scene, bottle, cx, base_y, height, warmth=1.0, bright=0.97):
    """Stand the real bottle on a surface: contact shadow + soft cast shadow, light colour match."""
    b = bottle.resize((round(bottle.width * height / bottle.height), height), Image.LANCZOS)
    rgb = ImageEnhance.Brightness(b.convert('RGB')).enhance(bright)
    if warmth != 1.0:
        r, g, bl = rgb.split()
        r = r.point(lambda v: min(255, int(v * warmth)))
        bl = bl.point(lambda v: int(v / warmth))
        rgb = Image.merge('RGB', (r, g, bl))
    b = Image.merge('RGBA', (*rgb.split(), b.getchannel('A')))
    x, y = cx - b.width // 2, base_y - b.height
    sh = Image.new('L', scene.size, 0)
    d = ImageDraw.Draw(sh)
    d.ellipse((x - b.width * 0.05, base_y - b.width * 0.12, x + b.width * 1.25, base_y + b.width * 0.1), fill=120)
    sh = sh.filter(ImageFilter.GaussianBlur(b.width * 0.12))
    contact = Image.new('L', scene.size, 0)
    ImageDraw.Draw(contact).ellipse((x + b.width * 0.05, base_y - b.width * 0.06, x + b.width * 0.95, base_y + b.width * 0.04), fill=170)
    contact = contact.filter(ImageFilter.GaussianBlur(b.width * 0.04))
    dark = Image.new('RGB', scene.size, (30, 22, 15))
    scene = Image.composite(dark, scene, sh)
    scene = Image.composite(dark, scene, contact)
    scene.paste(b, (x, y), b)
    return scene


def text_c(d, xy, s, f, fill, anchor='mm', **kw):
    d.text(xy, s, font=f, fill=fill, anchor=anchor, **kw)


def mark(canvas, cx, cy, r, ok):
    d = ImageDraw.Draw(canvas)
    d.ellipse((cx - r - 6, cy - r - 6, cx + r + 6, cy + r + 6), fill='white')
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=GREEN if ok else RED)
    k, w = r * 0.42, max(8, r // 6)
    if ok:
        d.line([(cx - k, cy + 2), (cx - k * 0.25, cy + k * 0.75), (cx + k * 1.05, cy - k * 0.7)], fill='white', width=w, joint='curve')
    else:
        d.line([(cx - k, cy - k), (cx + k, cy + k)], fill='white', width=w)
        d.line([(cx - k, cy + k), (cx + k, cy - k)], fill='white', width=w)


def rounded(im, r):
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, im.width - 1, im.height - 1), r, fill=255)
    out = im.convert('RGBA')
    out.putalpha(m)
    return out


def three_panels(title, sub, panels, ok, footer, bottle=None, bg=CREAM):
    c = Image.new('RGB', (W, H), bg)
    d = ImageDraw.Draw(c)
    text_c(d, (W // 2, 150), title, font('Montserrat-900', 118), NAVY)
    text_c(d, (W // 2, 262), sub, font('Inter-600', 54), (70, 70, 80))
    m, g, top, ph = 70, 34, 350, 1280
    pw = (W - 2 * m - 2 * g) // 3
    for i, (img, cap, fy) in enumerate(panels):
        x = m + i * (pw + g)
        p = rounded(cover(img, pw, ph, fy), 36)
        c.paste(p, (x, top), p)
        mark(c, x + pw // 2, top + ph - 120, 78, ok)
        text_c(d, (x + pw // 2, top + ph + 78), cap[0], font('Montserrat-800', 50), NAVY)
        text_c(d, (x + pw // 2, top + ph + 140), cap[1], font('Inter-400', 40), (80, 80, 90))
    d.rounded_rectangle((m, H - 190, W - m, H - 70), 60, fill=NAVY)
    text_c(d, (W // 2, H - 130), footer, font('Montserrat-800', 52), 'white')
    if bottle:  # flank the title with the real bottle on both sides
        b = bottle.resize((round(bottle.width * 290 / bottle.height), 290), Image.LANCZOS)
        c.paste(b, (m + 30, 30), b)
        c.paste(b, (W - m - 30 - b.width, 30), b)
    return c


def before_after(before, after, fy_b, fy_a, claim, bottle, note):
    c = Image.new('RGB', (W, H), CREAM)
    d = ImageDraw.Draw(c)
    ph = H - 330
    half = W // 2
    c.paste(ImageEnhance.Color(cover(before, half - 6, ph, fy_b)).enhance(0.75), (0, 0))
    c.paste(cover(after, half - 6, ph, fy_a), (half + 6, 0))
    d.rectangle((half - 6, 0, half + 6, ph), fill='white')
    for x, lbl, col in [(half // 2, 'ÎNAINTE', (60, 60, 70)), (half + half // 2, 'DUPĂ', GREEN)]:
        f = font('Montserrat-900', 76)
        w = d.textlength(lbl, font=f)
        d.rounded_rectangle((x - w / 2 - 50, 60, x + w / 2 + 50, 190), 65, fill=col)
        text_c(d, (x, 126), lbl, f, 'white')
    d.rectangle((0, ph, W, H), fill=NAVY)
    b = bottle.resize((round(bottle.width * 290 / bottle.height), 290), Image.LANCZOS)
    c.paste(b, (90, ph + 14), b)
    text_c(d, (330, ph + 115), claim[0], font('Montserrat-900', 74), 'white', anchor='lm')
    text_c(d, (330, ph + 200), claim[1], font('Inter-600', 50), GOLD, anchor='lm')
    text_c(d, (W - 40, H - 22), note, font('Inter-400', 26), (170, 180, 210), anchor='rb')
    return c


def save(im, name):
    os.makedirs(OUT, exist_ok=True)
    im.save(os.path.join(OUT, name + '.jpg'), quality=90, optimize=True)
    print('ok', name)


NOTE = 'Imagini ilustrative. Supliment alimentar, nu înlocuiește un regim alimentar variat. Rezultatele pot varia.'


def vision():
    bt = Image.open(os.path.join(SRC, 'vision_cut.png'))
    # lifestyle: the real bottle on the coffee table, next to the tea cup (about cup height = ~8 cm)
    life = src('v-s-telefon.jpg')
    life = place_bottle(life, bt, 575, 1120, 118, warmth=1.03)
    save(cover(life, W, W, 1.0), 'vision-01-acasa')

    save(three_panels('Te recunoști?', 'Ochii obosiți îți strică ziua', [
        (src('v-p-noapte.jpg'), ('Condusul noaptea', 'farurile te orbesc'), 0.4),
        (src('v-p-telefon.jpg'), ('Scrisul mic', 'ții telefonul tot mai departe'), 0.55),
        (src('v-p-ac.jpg'), ('Ața în ac', 'ochii obosesc repede'), 0.4),
    ], False, 'E momentul să ai grijă de ochii tăi'), 'vision-02-problema')

    save(three_panels('Cu VISION ELITE+', 'Grijă zilnică pentru ochii tăi', [
        (src('v-s-zi.jpg'), ('Drum relaxat', 'privești înainte liniștit'), 0.4),
        (life, ('Citești ușor', 'mesaje, știri, rețete'), 0.55),
        (src('v-s-ac.jpg'), ('Lucru de mână', 'cu plăcere, ca altădată'), 0.4),
    ], True, '30 capsule  ·  Formulă avansată', bottle=bt), 'vision-03-solutia')

    save(before_after(src('v-p-telefon.jpg'), life, 0.55, 0.55,
                      ('Susține vederea clară', 'și protecția ochilor, natural'), bt, NOTE), 'vision-04-inainte-dupa')


if __name__ == '__main__':
    {'vision': vision}[sys.argv[1] if len(sys.argv) > 1 else 'vision']()
