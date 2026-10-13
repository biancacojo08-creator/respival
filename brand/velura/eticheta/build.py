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

MIST = "#C9D3DB"      # culoarea aromei Cotton Cloud
MIST_DEEP = "#B4C1CB"
INK = "#2B2522"       # Espresso
MINK = "#5E5048"
GOLD = "#B8955C"      # se tipărește ca folie aurie mată
TODO = "#D6007E"      # magenta = de completat

FONTS = {"Manrope": HERE / "fonts" / "Manrope.ttf", "Cormorant Garamond": HERE / "fonts" / "CormorantGaramond.ttf"}
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


def t(x, y, s, size, fill=INK, weight=500, family="Manrope", anchor="start", ls=0.0, extra=""):
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


def front(o):
    x0 = PANEL
    cx = x0 + PANEL / 2
    o.append('<g id="FATA">')
    # cadru auriu subțire
    o.append(f'<rect x="{X(x0 + 4):.2f}" y="{Y(4):.2f}" width="{PANEL - 8:.2f}" height="{TH - 8:.2f}" fill="none" stroke="{GOLD}" stroke-width="0.3"/>')
    o.append(t(cx, 16, "PARFUM CONCENTRAT PENTRU RUFE", 1.9, MINK, 700, anchor="middle", ls=0.42))
    o.append(t(cx, 30.5, "VELURA", 11.5, INK, 600, "Cormorant Garamond", "middle", ls=2.3, extra='id="LOGO"'))
    # ornament auriu
    o.append(f'<line x1="{X(cx - 11):.2f}" y1="{Y(35):.2f}" x2="{X(cx - 2.2):.2f}" y2="{Y(35):.2f}" stroke="{GOLD}" stroke-width="0.35"/>')
    o.append(f'<line x1="{X(cx + 2.2):.2f}" y1="{Y(35):.2f}" x2="{X(cx + 11):.2f}" y2="{Y(35):.2f}" stroke="{GOLD}" stroke-width="0.35"/>')
    o.append(f'<path d="M{X(cx):.2f},{Y(33.7):.2f} L{X(cx + 1.3):.2f},{Y(35):.2f} L{X(cx):.2f},{Y(36.3):.2f} L{X(cx - 1.3):.2f},{Y(35):.2f} Z" fill="{GOLD}"/>')
    o.append(t(cx, 40.1, "MAISON DE LINGE · ROMÂNIA", 1.6, MINK, 600, anchor="middle", ls=0.5))
    # nori
    o.append(cloud(cx - 7, 56, 15, "#FFFFFF", 0.95))
    o.append(cloud(cx + 9, 61.5, 10, "#FFFFFF", 0.7))
    o.append(cloud(cx - 15, 63, 6.5, "#FFFFFF", 0.55))
    # nume aromă
    o.append(t(cx, 80, "Cotton Cloud", 8.6, INK, 500, "Cormorant Garamond", "middle", ls=0.15, extra='id="AROMA"'))
    o.append(t(cx, 86, "BUMBAC CURAT · AER PROASPĂT · MOSC ALB", 1.75, MINK, 700, anchor="middle", ls=0.3))
    # bandă aurie (folie)
    o.append(f'<rect id="banda-folie" x="{X(x0 + 4):.2f}" y="{Y(TH - 16):.2f}" width="{PANEL - 8:.2f}" height="1.1" fill="{GOLD}"/>')
    o.append(t(x0 + 8, TH - 8.4, "200 ml ℮", 2.6, INK, 700))
    o.append(t(x0 + PANEL - 8, TH - 8.4, "1 capac = 1 mașină", 2.0, MINK, 600, anchor="end"))
    o.append('</g>')


def back(o):
    x, wdt = 5.0, PANEL - 10.0
    o.append('<g id="SPATE">')
    o.append(t(x, 9.6, "VELURA", 4.2, INK, 600, "Cormorant Garamond", ls=0.8))
    o.append(t(x + wdt, 9.6, "Cotton Cloud", 3.4, INK, 500, "Cormorant Garamond", "end"))
    o.append(f'<rect x="{X(x):.2f}" y="{Y(11.6):.2f}" width="{wdt:.2f}" height="0.45" fill="{GOLD}"/>')

    y = 16.3
    s, y2 = para(x, y, "MOD DE UTILIZARE: Agitați înainte de folosire. Turnați în compartimentul pentru balsam "
                 "sau direct în tambur.", 2.0, wdt, bold_lead="MOD DE UTILIZARE:")
    o.append(s)
    y = y2 + 0.6
    # tabel doze
    rows = [("3–4 kg", "5 ml (⅓ capac)"), ("6–7 kg", "10 ml (⅔ capac)"), ("9–10 kg", "15 ml (1 capac)")]
    rh = 2.7
    o.append(f'<rect x="{X(x):.2f}" y="{Y(y):.2f}" width="{wdt:.2f}" height="{rh * 3:.2f}" fill="#FFFFFF" opacity="0.55" rx="0.8"/>')
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
         '@font-face{font-family:Manrope;src:url(fonts/Manrope.ttf);font-weight:200 800}'
         '</style></defs>',
         f'<rect id="FUNDAL" x="0" y="0" width="{W}" height="{H}" fill="{MIST}"/>',
         # textură subtilă de bumbac: linii foarte fine
         '<g id="textura" opacity="0.18" stroke="#FFFFFF" stroke-width="0.12">'
         + "".join(f'<line x1="0" y1="{yy:.2f}" x2="{W}" y2="{yy:.2f}"/>' for yy in [i * 1.4 for i in range(int(H / 1.4) + 1)])
         + '</g>']
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
