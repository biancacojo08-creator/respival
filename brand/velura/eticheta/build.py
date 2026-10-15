"""Generează eticheta VELURA Cotton Cloud (față + spate, o singură bandă) ca SVG editabil.

Folosire:  python3 build.py   apoi   node render.js
Unități: mm. Format final (trim) 136 × 110 mm, bleed 3 mm → document 142 × 116 mm.
Panouri: spate 0–68 mm · față 68–136 mm (eticheta se lipește cu fața spre client).
"""
from pathlib import Path
from PIL import ImageFont

HERE = Path(__file__).resolve().parent
TW, TH, BL = 136.0, 110.0, 3.0
W, H = TW + 2 * BL, TH + 2 * BL
PANEL = 68.0

IVORY = "#F6EFE6"     # fundalul etichetei (crem cald)
SKY_TOP = "#BCCEDB"   # cerul Cotton Cloud (sus)
SKY_MID = "#DDE5EA"
SKY_LOW = "#F3DDCF"   # răsărit piersicuț (jos)
BLUSH = "#EEDFD3"
INK = "#2B2522"       # Espresso
MINK = "#5E5048"
GOLD = "#B8955C"      # se tipărește ca folie aurie mată
TODO = "#D6007E"      # magenta = de completat

FONTS = {"Manrope": HERE / "fonts" / "Manrope.ttf", "Cormorant Garamond": HERE / "fonts" / "CormorantGaramond.ttf",
         "CormorantItalic": HERE / "fonts" / "CormorantGaramond-Italic.ttf", "Pinyon Script": HERE / "fonts" / "PinyonScript.ttf",
         "Bodoni Moda": HERE / "fonts" / "BodoniModa.ttf"}
_cache = {}


def measure(s, size, family="Manrope", weight=500, ls=0.0):
    key = (family, weight)
    if key not in _cache:
        f = ImageFont.truetype(str(FONTS[family]), 200)
        if family == "Bodoni Moda":
            f.set_variation_by_axes([11, weight])
        elif family != "Pinyon Script":
            f.set_variation_by_axes([weight])
        _cache[key] = f
    return _cache[key].getlength(s) / 200 * size + ls * len(s)


def X(x):
    return x + BL


def Y(y):
    return y + BL


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def t(x, y, s, size, fill=INK, weight=500, family="Manrope", anchor="start", ls=0.0, extra="", italic=False):
    if italic:
        extra += ' font-style="italic"'
    return (f'<text x="{X(x):.2f}" y="{Y(y):.2f}" font-family="{family}" font-weight="{weight}" '
            f'font-size="{size}" fill="{fill}" text-anchor="{anchor}" letter-spacing="{ls}" {extra}>{esc(s)}</text>')


def para(x, y, s, size, width, lh=1.22, fill=INK, weight=500, bold_lead=None):
    """Text pe mai multe rânduri. bold_lead = începutul primului rând, scris îngroșat."""
    words, lines, cur = s.split(), [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if measure(test, size, weight=weight) <= width or not cur:
            cur = test
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    out = []
    for i, ln in enumerate(lines):
        yy = y + i * size * lh
        if i == 0 and bold_lead and ln.startswith(bold_lead):
            rest = ln[len(bold_lead):]
            out.append(f'<text x="{X(x):.2f}" y="{Y(yy):.2f}" font-family="Manrope" font-size="{size}" fill="{fill}">'
                       f'<tspan font-weight="800">{esc(bold_lead)}</tspan><tspan font-weight="{weight}">{esc(rest)}</tspan></text>')
        else:
            out.append(t(x, yy, ln, size, fill, weight))
    return "\n".join(out), y + len(lines) * size * lh


def cloud(cx, cy, s, fill, op):
    """Nor stilizat din cercuri, vectorial."""
    parts = [(-0.55, 0.12, 0.32), (-0.18, -0.12, 0.42), (0.25, -0.02, 0.36), (0.56, 0.16, 0.26), (0.0, 0.2, 0.34)]
    c = "".join(f'<circle cx="{X(cx + dx * s):.2f}" cy="{Y(cy + dy * s):.2f}" r="{r * s:.2f}"/>' for dx, dy, r in parts)
    base = f'<rect x="{X(cx - 0.62 * s):.2f}" y="{Y(cy + 0.14 * s):.2f}" width="{1.22 * s:.2f}" height="{0.32 * s:.2f}" rx="{0.16 * s:.2f}"/>'
    return f'<g fill="{fill}" opacity="{op}">{c}{base}</g>'


def ghs07(x, y, s):
    """Pictograma CLP GHS07 (semnul exclamării), latura s mm, colțul de sus-stânga al pătratului încadrator."""
    cx, cy, h = X(x + s / 2), Y(y + s / 2), s / 2
    d = f"M{cx:.2f},{cy - h:.2f} L{cx + h:.2f},{cy:.2f} L{cx:.2f},{cy + h:.2f} L{cx - h:.2f},{cy:.2f} Z"
    bw = s * 0.07
    return (f'<g id="pictograma-GHS07"><path d="{d}" fill="#FFFFFF" stroke="#E30613" stroke-width="{bw:.2f}" stroke-linejoin="miter"/>'
            f'<rect x="{cx - s * 0.045:.2f}" y="{cy - s * 0.29:.2f}" width="{s * 0.09:.2f}" height="{s * 0.38:.2f}" rx="{s * 0.02:.2f}" fill="#000"/>'
            f'<circle cx="{cx:.2f}" cy="{cy + s * 0.22:.2f}" r="{s * 0.055:.2f}" fill="#000"/></g>')


def arch(x0, x1, ytop, ybot):
    r = (x1 - x0) / 2
    return (f"M{X(x0):.2f},{Y(ybot):.2f} L{X(x0):.2f},{Y(ytop + r):.2f} "
            f"A{r:.2f},{r:.2f} 0 0 1 {X(x1):.2f},{Y(ytop + r):.2f} L{X(x1):.2f},{Y(ybot):.2f} Z")


def front(o):
    x0 = PANEL
    cx = x0 + PANEL / 2
    CG, IT = "Cormorant Garamond", True
    o.append('<g id="FATA">')
    # chenar auriu rotunjit (folie)
    o.append(f'<rect x="{X(x0 + 3.6):.2f}" y="{Y(3.6):.2f}" width="{PANEL - 7.2:.2f}" height="{TH - 7.2:.2f}" rx="2.4" '
             f'fill="none" stroke="{GOLD}" stroke-width="0.3"/>')
    o.append(t(cx, 12.2, "MAISON DE LINGE", 1.7, MINK, 600, anchor="middle", ls=0.7))
    o.append(t(cx, 25, "VELURA", 11.5, INK, 600, CG, "middle", ls=2.3, extra='id="LOGO"'))
    o.append(t(cx, 31.4, "parfum de rufe", 3.9, MINK, 500, CG, "middle", ls=0.1, italic=IT))
    # fereastra în arcadă: cer de dimineață cu nori
    ax0, ax1, ay0, ay1 = x0 + 12, x0 + PANEL - 12, 36.5, 80.5
    o.append('<clipPath id="clip-arcada"><path d="' + arch(ax0, ax1, ay0, ay1) + '"/></clipPath>')
    o.append('<g id="ARCADA" clip-path="url(#clip-arcada)">')
    o.append(f'<rect x="{X(ax0):.2f}" y="{Y(ay0):.2f}" width="{ax1 - ax0:.2f}" height="{ay1 - ay0:.2f}" fill="url(#cer)"/>')
    o.append(f'<ellipse cx="{X(cx):.2f}" cy="{Y(ay1 - 4):.2f}" rx="26" ry="15" fill="url(#soare)"/>')
    o.append(cloud(cx - 7, 52, 17, "#FFFFFF", 0.96))
    o.append(cloud(cx + 12, 60, 11, "#FFFFFF", 0.85))
    o.append(cloud(cx - 14, 66.5, 8, "#FFFFFF", 0.7))
    o.append(cloud(cx + 6, 73, 13, "#FFFFFF", 0.9))
    o.append('</g>')
    o.append(f'<path d="{arch(ax0 - 1.4, ax1 + 1.4, ay0 - 1.4, ay1 + 1.4)}" fill="none" stroke="{GOLD}" stroke-width="0.35"/>')
    # nume aromă
    o.append(t(cx, 92.3, "Cotton Cloud", 10.2, INK, 500, CG, "middle", ls=0.1, italic=IT, extra='id="AROMA"'))
    o.append(t(cx, 97.6, "bumbac curat · aer proaspăt · mosc alb", 2.9, MINK, 500, CG, "middle", ls=0.12, italic=IT))
    # ornament + cantitate
    o.append(f'<line x1="{X(cx - 13):.2f}" y1="{Y(101.1):.2f}" x2="{X(cx - 2):.2f}" y2="{Y(101.1):.2f}" stroke="{GOLD}" stroke-width="0.3"/>')
    o.append(f'<line x1="{X(cx + 2):.2f}" y1="{Y(101.1):.2f}" x2="{X(cx + 13):.2f}" y2="{Y(101.1):.2f}" stroke="{GOLD}" stroke-width="0.3"/>')
    o.append(f'<path d="M{X(cx):.2f},{Y(100.1):.2f} L{X(cx + 1):.2f},{Y(101.1):.2f} L{X(cx):.2f},{Y(102.1):.2f} L{X(cx - 1):.2f},{Y(101.1):.2f} Z" fill="{GOLD}"/>')
    o.append(t(cx, 105.4, "200 ml ℮  ·  CONCENTRAT", 1.9, INK, 700, anchor="middle", ls=0.35))
    o.append('</g>')



BLUE = "#C7D5E3"      # fundal față, varianta romantică
SAGE = "#9FB394"
SAGE_D = "#7E9673"


def leaf(x, y, length, width, angle, fill=SAGE, vein=SAGE_D):
    d = f"M0,0 Q{length / 2:.2f},{-width:.2f} {length:.2f},0 Q{length / 2:.2f},{width:.2f} 0,0 Z"
    return (f'<g transform="translate({X(x):.2f},{Y(y):.2f}) rotate({angle})"><path d="{d}" fill="{fill}"/>'
            f'<path d="M0,0 L{length * 0.85:.2f},0" stroke="{vein}" stroke-width="0.15"/></g>')


def cotton(cx, cy, s):
    """Floare de bumbac: puf alb din 5 lobi, sepale aurii, cu umbră fină."""
    o = []
    for a in (-150, -95, -30, 30, 95, 150):
        o.append(f'<path d="M0,0 L{s * 0.95:.2f},{-s * 0.22:.2f} L{s * 0.7:.2f},0 L{s * 0.95:.2f},{s * 0.22:.2f} Z" '
                 f'fill="{GOLD}" transform="translate({X(cx):.2f},{Y(cy + s * 0.25):.2f}) rotate({a + 90})"/>')
    lobes = [(-0.42, -0.05, 0.42), (0.42, -0.05, 0.42), (-0.22, -0.42, 0.4), (0.22, -0.42, 0.4), (0.0, 0.08, 0.44)]
    for dx, dy, r in lobes:
        o.append(f'<circle cx="{X(cx + dx * s):.2f}" cy="{Y(cy + dy * s):.2f}" r="{r * s:.2f}" fill="url(#puf)" stroke="#D9DEE4" stroke-width="0.12"/>')
    return "".join(o)


def dots_bg(x0, x1, y0, y1, step=3.6, r=0.38, fill="#FFFFFF", op=0.7):
    o, row = [], 0
    y = y0
    while y <= y1:
        x = x0 + (step / 2 if row % 2 else 0)
        while x <= x1:
            o.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r}"/>')
            x += step
        y += step
        row += 1
    return f'<g fill="{fill}" opacity="{op}">' + "".join(o) + "</g>"


def front_romantic(o):
    x0 = PANEL
    cx = x0 + PANEL / 2
    CG = "Cormorant Garamond"
    o.append('<g id="FATA">')
    # fundal albastru-pudrat cu buline albe și nori
    for (dx, dy, sc, op) in [(-26, 12, 14, 0.75), (25, 30, 11, 0.65), (-27, 70, 10, 0.6), (27, 92, 13, 0.7), (-24, 104, 9, 0.6)]:
        o.append(cloud(cx + dx, dy, sc, "#FFFFFF", op))
    # cartușul în arcadă
    ax0, ax1, ay0, ay1 = x0 + 7.5, x0 + PANEL - 7.5, 6.5, 104
    o.append(f'<path d="{arch(ax0 - 1.3, ax1 + 1.3, ay0 - 1.3, ay1 + 1.3)}" fill="{GOLD}"/>')
    o.append(f'<path d="{arch(ax0, ax1, ay0, ay1)}" fill="#FFFDF9"/>')
    o.append(f'<path d="{arch(ax0 + 1.6, ax1 - 1.6, ay0 + 1.6, ay1 - 1.6)}" fill="none" stroke="{GOLD}" stroke-width="0.8" '
             f'stroke-dasharray="0 1.75" stroke-linecap="round"/>')
    o.append(f'<path d="{arch(ax0 + 3.2, ax1 - 3.2, ay0 + 3.2, ay1 - 3.2)}" fill="none" stroke="{GOLD}" stroke-width="0.2"/>')
    # emblemă: floare de bumbac aurie mică
    o.append(cotton(cx, 17.2, 3.2))
    o.append(t(cx, 27.6, "VELURA", 7.4, INK, 600, CG, "middle", ls=1.5, extra='id="LOGO"'))
    o.append(t(cx, 31.6, "maison de linge", 3.0, GOLD, 600, CG, "middle", ls=0.15, italic=True))
    # buchet: bumbac, frunze, nori
    o.append(cloud(cx + 1, 49, 19, "#E6EDF3", 0.95))
    for (lx, ly, ln, lw, la) in [(-3, 51, 15, 2.8, -152), (3, 51, 15, 2.8, -28), (-2, 53.5, 12, 2.3, 168),
                                 (2, 53.5, 12, 2.3, 12), (-1, 55, 9, 1.8, 130), (1, 55, 9, 1.8, 50)]:
        o.append(leaf(cx + lx, ly, ln, lw, la))
    o.append(f'<path d="M{X(cx):.2f},{Y(58):.2f} L{X(cx):.2f},{Y(45):.2f} M{X(cx):.2f},{Y(52):.2f} Q{X(cx - 5):.2f},{Y(49):.2f} {X(cx - 10):.2f},{Y(45.5):.2f} '
             f'M{X(cx):.2f},{Y(52):.2f} Q{X(cx + 5):.2f},{Y(49):.2f} {X(cx + 10):.2f},{Y(45.5):.2f}" stroke="{SAGE_D}" stroke-width="0.4" fill="none"/>')
    o.append(cotton(cx - 10.5, 44, 5.2))
    o.append(cotton(cx + 10.5, 44, 5.2))
    o.append(cotton(cx, 40.5, 6.6))
    # nume aromă, scris de mână
    o.append(t(cx - 2.5, 68.5, "Cotton", 13.5, INK, 400, "Pinyon Script", "middle", extra='id="AROMA-1"'))
    o.append(t(cx + 5, 79.5, "Cloud", 13.5, INK, 400, "Pinyon Script", "middle", extra='id="AROMA-2"'))
    o.append(t(cx, 85.4, "Fresh / Musk", 2.9, MINK, 600, CG, "middle", ls=0.1))
    o.append(t(cx, 90.3, "Bumbac, Floare de crin,", 2.9, INK, 500, CG, "middle", italic=True))
    o.append(t(cx, 93.9, "Mosc alb, Aer de dimineață", 2.9, INK, 500, CG, "middle", italic=True))
    o.append(f'<line x1="{X(cx - 12):.2f}" y1="{Y(96.4):.2f}" x2="{X(cx + 12):.2f}" y2="{Y(96.4):.2f}" stroke="{GOLD}" stroke-width="0.25"/>')
    o.append(t(cx, 100.3, "℮ 200 ml  ·  parfum de rufe", 2.6, INK, 600, CG, "middle", ls=0.1))
    o.append('</g>')



HEAD_FONT = "Cormorant Garamond"
NAVY = "#26324A"
BG_IMG = "assets/fundal-cotton-cloud.jpg"


def front_ilustrat(o):
    x0 = PANEL
    cx = x0 + PANEL / 2
    BD = "Bodoni Moda"
    o.append('<g id="FATA">')
    o.append(f'<image id="ilustratie" href="{BG_IMG}" x="{X(x0):.2f}" y="0" width="{PANEL + BL:.2f}" height="{H}" '
             f'preserveAspectRatio="xMidYMid slice"/>')
    # logo sus
    o.append(t(cx, 14.5, "VELURA", 9.2, NAVY, 600, BD, "middle", ls=1.9, extra='id="LOGO"'))
    o.append(t(cx, 19.6, "MAISON DE LINGE", 1.65, NAVY, 700, anchor="middle", ls=0.65))
    # numele aromei, aliniat la stânga, în cerul liber
    o.append(t(x0 + 7, 52.5, "Cotton", 12, NAVY, 400, BD, extra='id="AROMA-1"', italic=True))
    o.append(t(x0 + 15, 63, "Cloud", 12, NAVY, 400, BD, extra='id="AROMA-2"', italic=True))
    o.append(f'<rect x="{X(x0 + 7.4):.2f}" y="{Y(66.6):.2f}" width="10" height="0.45" fill="{GOLD}"/>')
    o.append(t(x0 + 19.4, 67.3, "FRESH · MOSC ALB", 1.75, NAVY, 700, ls=0.45))
    # text vertical pe marginea din dreapta
    vx, vy = X(x0 + PANEL - 5), Y(40)
    o.append(f'<text x="{vx:.2f}" y="{vy:.2f}" font-family="Manrope" font-weight="700" font-size="1.75" fill="{NAVY}" '
             f'letter-spacing="0.55" text-anchor="middle" transform="rotate(90 {vx:.2f} {vy:.2f})">PARFUM DE RUFE  ·  ℮ 200 ml</text>')
    o.append('</g>')


def back(o):
    x, wdt = 5.0, PANEL - 10.0
    o.append('<g id="SPATE">')
    o.append(t(x, 9.6, "VELURA", 4.2 if HEAD_FONT == "Cormorant Garamond" else 3.6, INK, 600, HEAD_FONT, ls=0.8))
    o.append(t(x + wdt, 9.6, "Cotton Cloud", 3.9 if HEAD_FONT == "Cormorant Garamond" else 3.3, INK, 500, HEAD_FONT, "end", italic=True))
    o.append(f'<rect x="{X(x):.2f}" y="{Y(11.6):.2f}" width="{wdt:.2f}" height="0.45" fill="{GOLD}"/>')

    y = 16.3
    s, y2 = para(x, y, "MOD DE UTILIZARE: Agitați înainte de folosire. Turnați în compartimentul pentru balsam "
                 "sau direct în tambur.", 2.0, wdt, bold_lead="MOD DE UTILIZARE:")
    o.append(s)
    y = y2 + 0.6
    # tabel doze
    rows = [("3–4 kg", "5 ml (⅓ capac)"), ("6–7 kg", "10 ml (⅔ capac)"), ("9–10 kg", "15 ml (1 capac)")]
    rh = 2.7
    o.append(f'<rect x="{X(x):.2f}" y="{Y(y):.2f}" width="{wdt:.2f}" height="{rh * 3:.2f}" fill="{BLUSH}" rx="1"/>')
    for i, (a, b) in enumerate(rows):
        yy = y + i * rh + 1.95
        o.append(t(x + 2, yy, a, 2.0, INK, 700))
        o.append(t(x + wdt - 2, yy, b, 2.0, INK, 500, anchor="end"))
    y += rh * 3 + 2.6

    # CLP
    o.append(ghs07(x, y - 1.0, 10.5))
    o.append(t(x + 12.2, y + 2.4, "ATENȚIE", 2.5, INK, 800, ls=0.2))
    s, yy = para(x + 12.2, y + 5.3, "[H317] Poate provoca o reacție alergică a pielii.", 2.25, wdt - 12.2, fill=TODO, weight=700)
    o.append(s)
    y = max(yy, y + 10.0) + 0.3
    s, y = para(x, y, "[P101] Dacă este necesară consultarea medicului, țineți la îndemână recipientul sau eticheta produsului. "
                "[P102] A nu se lăsa la îndemâna copiilor. [P302+P352] ÎN CAZ DE CONTACT CU PIELEA: spălați cu multă apă. "
                "[P501] Aruncați conținutul/recipientul la un centru de colectare autorizat.", 2.25, wdt, fill=TODO)
    o.append(s)
    y += 0.3
    s, y = para(x, y, "CONȚINE: [lista substanțelor alergene din FDS-ul producătorului, ex. hexyl cinnamal, linalool, "
                "amestec CMIT/MIT (3:1)]", 2.25, wdt, fill=TODO, bold_lead="CONȚINE:")
    o.append(s)
    y += 0.3
    s, y = para(x, y, "COMPOZIȚIE: [<5% agenți de suprafață cationici], parfum, conservanți [denumiri INCI].",
                1.9, wdt, fill=TODO, bold_lead="COMPOZIȚIE:")
    o.append(s)
    y += 0.3
    o.append(t(x, y + 1.6, "UFI: [XXXX-XXXX-XXXX-XXXX]", 2.2, TODO, 800))
    y += 3.9
    print("text principal pana la y =", round(y, 1))

    # zona de jos: stânga = depozitare, distribuitor, LOT/EXP · dreapta = EAN-13 (31 × 21 mm, ~83%)
    ew, eh = 31.0, 21.0
    yb = TH - 5.5 - eh
    assert y < yb - 0.6, f"textul depășește zona de jos: {y:.1f} > {yb - 0.6:.1f}"
    ex = x + wdt - ew
    o.append(f'<rect id="EAN-13" x="{X(ex):.2f}" y="{Y(yb):.2f}" width="{ew}" height="{eh}" fill="#FFFFFF"/>')
    for i in range(44):
        bw = 0.5 if i % 3 == 0 else 0.3
        o.append(f'<rect x="{X(ex + 2.2 + i * 0.6):.2f}" y="{Y(yb + 1.5):.2f}" width="{bw}" height="15.5" fill="{TODO}" opacity="0.8"/>')
    o.append(t(ex + ew / 2, yb + eh - 1.3, "[cod EAN-13]", 1.8, TODO, 700, anchor="middle"))
    cw = wdt - ew - 2.5
    s, yy = para(x, yb + 1.4, "A se păstra la 5–25°C, ferit de soare și îngheț. Valabilitate: 24 de luni.", 1.75, cw)
    o.append(s)
    s, yy = para(x, yy + 0.3, "Distribuitor: [FIRMA SRL, adresa, telefon] · Fabricat în România", 1.75, cw, fill=TODO)
    o.append(s)
    o.append(t(x, yy + 1.2, "LOT / EXP: pe ambalaj", 1.75, INK, 800))
    o.append(t(x, yy + 3.6, "♻ [PP 05]", 1.75, TODO, 700))
    print("zona de jos pana la y =", round(yy + 3.6, 1), "(limita", TH - 5, ")")
    o.append('</g>')


def build(guides, variant="clasic"):
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}mm" height="{H}mm" viewBox="0 0 {W} {H}">',
         '<defs><style>'
         '@font-face{font-family:"Cormorant Garamond";src:url(fonts/CormorantGaramond.ttf);font-weight:300 700}'
         '@font-face{font-family:"Cormorant Garamond";src:url(fonts/CormorantGaramond-Italic.ttf);font-weight:300 700;font-style:italic}'
         '@font-face{font-family:Manrope;src:url(fonts/Manrope.ttf);font-weight:200 800}'
         '@font-face{font-family:"Pinyon Script";src:url(fonts/PinyonScript.ttf)}'
         '@font-face{font-family:"Bodoni Moda";src:url(fonts/BodoniModa.ttf);font-weight:400 900}'
         '@font-face{font-family:"Bodoni Moda";src:url(fonts/BodoniModa-Italic.ttf);font-weight:400 900;font-style:italic}'
         '</style>'
         f'<linearGradient id="cer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SKY_TOP}"/>'
         f'<stop offset="0.55" stop-color="{SKY_MID}"/><stop offset="1" stop-color="{SKY_LOW}"/></linearGradient>'
         '<radialGradient id="soare"><stop offset="0" stop-color="#FFF6EA" stop-opacity="0.95"/>'
         '<stop offset="1" stop-color="#FFF6EA" stop-opacity="0"/></radialGradient>'
         '<radialGradient id="puf" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stop-color="#FFFFFF"/>'
         '<stop offset="0.7" stop-color="#FAFBFC"/><stop offset="1" stop-color="#E4E9EE"/></radialGradient></defs>',
         f'<rect id="FUNDAL" x="0" y="0" width="{W}" height="{H}" fill="{IVORY}"/>']
    global HEAD_FONT
    HEAD_FONT = "Bodoni Moda" if variant == "ilustrat" else "Cormorant Garamond"
    if variant == "ilustrat":
        o.append(f'<image href="{BG_IMG}" x="0" y="0" width="{X(PANEL):.2f}" height="{H}" preserveAspectRatio="xMidYMax slice"/>')
        o.append(f'<rect id="card-spate" x="{X(2.4):.2f}" y="{Y(2.4):.2f}" width="{PANEL - 4.8:.2f}" height="{TH - 4.8:.2f}" rx="2.4" '
                 f'fill="#FFFDF9" fill-opacity="0.93"/>')
    if variant == "romantic":
        o.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="{BLUE}"/>')
        o.append(dots_bg(1.5, W, 1.5, H))
        o.append(f'<rect id="card-spate" x="{X(2.4):.2f}" y="{Y(2.4):.2f}" width="{PANEL - 4.8:.2f}" height="{TH - 4.8:.2f}" rx="2.4" '
                 f'fill="#FFFDF9" stroke="{GOLD}" stroke-width="0.3"/>')
    back(o)
    {"romantic": front_romantic, "ilustrat": front_ilustrat}.get(variant, front)(o)
    if guides:
        o.append('<g id="GHIDAJE-ascunde-la-print" fill="none" stroke-width="0.2">'
                 f'<rect x="{BL}" y="{BL}" width="{TW}" height="{TH}" stroke="#0070F3"/>'
                 f'<rect x="0.1" y="0.1" width="{W - 0.2}" height="{H - 0.2}" stroke="#E00"/>'
                 f'<rect x="{BL + 3}" y="{BL + 3}" width="{TW - 6}" height="{TH - 6}" stroke="#16A34A" stroke-dasharray="1 1"/>'
                 f'<line x1="{X(PANEL)}" y1="0" x2="{X(PANEL)}" y2="{H}" stroke="#F97316" stroke-dasharray="2 1"/>'
                 '</g>')
    o.append('</svg>')
    return "\n".join(o)


if __name__ == "__main__":
    (HERE / "Velura-CottonCloud-eticheta.svg").write_text(build(True), encoding="utf-8")
    (HERE / "Velura-CottonCloud-eticheta-print.svg").write_text(build(False), encoding="utf-8")
    (HERE / "Velura-CottonCloud-romantic.svg").write_text(build(True, "romantic"), encoding="utf-8")
    (HERE / "Velura-CottonCloud-romantic-print.svg").write_text(build(False, "romantic"), encoding="utf-8")
    (HERE / "Velura-CottonCloud-ilustrat.svg").write_text(build(True, "ilustrat"), encoding="utf-8")
    (HERE / "Velura-CottonCloud-ilustrat-print.svg").write_text(build(False, "ilustrat"), encoding="utf-8")
    print("ok")
