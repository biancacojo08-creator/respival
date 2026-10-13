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
         "CormorantItalic": HERE / "fonts" / "CormorantGaramond-Italic.ttf"}
_cache = {}


def measure(s, size, family="Manrope", weight=500, ls=0.0):
    key = (family, weight)
    if key not in _cache:
        f = ImageFont.truetype(str(FONTS[family]), 200)
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


def back(o):
    x, wdt = 5.0, PANEL - 10.0
    o.append('<g id="SPATE">')
    o.append(t(x, 9.6, "VELURA", 4.2, INK, 600, "Cormorant Garamond", ls=0.8))
    o.append(t(x + wdt, 9.6, "Cotton Cloud", 3.9, INK, 500, "Cormorant Garamond", "end", italic=True))
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


def build(guides):
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}mm" height="{H}mm" viewBox="0 0 {W} {H}">',
         '<defs><style>'
         '@font-face{font-family:"Cormorant Garamond";src:url(fonts/CormorantGaramond.ttf);font-weight:300 700}'
         '@font-face{font-family:"Cormorant Garamond";src:url(fonts/CormorantGaramond-Italic.ttf);font-weight:300 700;font-style:italic}'
         '@font-face{font-family:Manrope;src:url(fonts/Manrope.ttf);font-weight:200 800}'
         '</style>'
         f'<linearGradient id="cer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SKY_TOP}"/>'
         f'<stop offset="0.55" stop-color="{SKY_MID}"/><stop offset="1" stop-color="{SKY_LOW}"/></linearGradient>'
         '<radialGradient id="soare"><stop offset="0" stop-color="#FFF6EA" stop-opacity="0.95"/>'
         '<stop offset="1" stop-color="#FFF6EA" stop-opacity="0"/></radialGradient></defs>',
         f'<rect id="FUNDAL" x="0" y="0" width="{W}" height="{H}" fill="{IVORY}"/>']
    back(o)
    front(o)
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
    print("ok")
