#!/usr/bin/env python3
"""Generează eticheta desfășurată NovaKids Multivitamin Elite+ ca SVG editabil.

Dimensiune finală (trim): 220 x 100 mm, bleed 3 mm pe fiecare latură.
Panouri: spate stânga 0-65 mm, față 65-155 mm, spate dreapta 155-220 mm.
Rulează:  python3 build.py   ->  NovaKids-eticheta.svg (cu ghidaje) și -print.svg (fără)
"""
from pathlib import Path

W, H, B = 220, 100, 3            # trim width, trim height, bleed (mm)
FW = W + 2 * B
FH = H + 2 * B
HERE = Path(__file__).parent

GREEN = "#1F5C2E"
DARK = "#16302A"
PURPLE = "#6B3FA0"
PURPLE_D = "#4E2A84"
GOLD_A, GOLD_B = "#E9C46A", "#B8862F"
TODO = "#E6007E"                 # magenta = text de completat


def X(x):  # trim coords -> svg coords (origin at bleed corner)
    return x + B


def Y(y):
    return y + B


def text(x, y, s, size, fill=DARK, weight=800, family="Montserrat", anchor="start", ls=0, extra=""):
    return (f'<text x="{X(x):.2f}" y="{Y(y):.2f}" font-family="{family}" font-weight="{weight}" '
            f'font-size="{size}" fill="{fill}" text-anchor="{anchor}" letter-spacing="{ls}" {extra}>{s}</text>')


def para(x, y, lines, size, lh, fill=DARK, weight=400, family="Inter"):
    return "\n".join(text(x, y + i * lh, l, size, fill, weight, family) for i, l in enumerate(lines))


def star(cx, cy, r, fill="#FFC93C"):
    import math
    pts = []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.45
        pts.append(f"{X(cx + rr * math.cos(a)):.2f},{Y(cy - rr * math.sin(a)):.2f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'


def sun(cx, cy, r):
    import math
    rays = "".join(
        f'<line x1="{X(cx + (r + 1) * math.cos(a)):.2f}" y1="{Y(cy + (r + 1) * math.sin(a)):.2f}" '
        f'x2="{X(cx + (r + 3.2) * math.cos(a)):.2f}" y2="{Y(cy + (r + 3.2) * math.sin(a)):.2f}" '
        f'stroke="#FFC93C" stroke-width="1" stroke-linecap="round"/>'
        for a in [i * math.pi / 6 for i in range(12)])
    face = (f'<circle cx="{X(cx)}" cy="{Y(cy)}" r="{r}" fill="#FFD84D"/>'
            f'<circle cx="{X(cx - r*0.35)}" cy="{Y(cy - r*0.15)}" r="{r*0.09}" fill="{DARK}"/>'
            f'<circle cx="{X(cx + r*0.35)}" cy="{Y(cy - r*0.15)}" r="{r*0.09}" fill="{DARK}"/>'
            f'<circle cx="{X(cx - r*0.55)}" cy="{Y(cy + r*0.2)}" r="{r*0.14}" fill="#FF9AA2" opacity=".8"/>'
            f'<circle cx="{X(cx + r*0.55)}" cy="{Y(cy + r*0.2)}" r="{r*0.14}" fill="#FF9AA2" opacity=".8"/>'
            f'<path d="M{X(cx - r*0.3):.2f},{Y(cy + r*0.15):.2f} Q{X(cx):.2f},{Y(cy + r*0.55):.2f} '
            f'{X(cx + r*0.3):.2f},{Y(cy + r*0.15):.2f}" fill="none" stroke="{DARK}" stroke-width=".45" stroke-linecap="round"/>')
    return f'<g id="soare">{rays}{face}</g>'


def cloud(cx, cy, s, op=0.9):
    return (f'<g opacity="{op}" fill="#E8F1FB">'
            f'<circle cx="{X(cx)}" cy="{Y(cy)}" r="{2.2*s}"/><circle cx="{X(cx+2.4*s)}" cy="{Y(cy-0.8*s)}" r="{2.8*s}"/>'
            f'<circle cx="{X(cx+5*s)}" cy="{Y(cy)}" r="{2*s}"/><rect x="{X(cx)}" y="{Y(cy)}" width="{5*s}" height="{2*s}"/></g>')


def rainbow(cx, cy, r0):
    cols = ["#FF9AA2", "#FFC48C", "#FFF1A8", "#B5EAD7", "#A7C7E7", "#C3B1E1"]
    arcs = []
    for i, c in enumerate(cols):
        r = r0 - i * 1.6
        arcs.append(f'<path d="M{X(cx - r):.2f},{Y(cy):.2f} A{r},{r} 0 0 1 {X(cx + r):.2f},{Y(cy):.2f}" '
                    f'fill="none" stroke="{c}" stroke-width="1.7" opacity=".75"/>')
    return f'<g id="curcubeu">{"".join(arcs)}</g>'


ICONS = {
    "scut": "M0,-1.1 L0.95,-0.7 L0.95,0.1 Q0.95,0.85 0,1.2 Q-0.95,0.85 -0.95,0.1 L-0.95,-0.7 Z",
    "fulger": "M0.2,-1.2 L-0.6,0.15 L-0.05,0.15 L-0.25,1.2 L0.6,-0.2 L0.05,-0.2 Z",
    "creier": "M-0.9,0.1 Q-1,-0.9 -0.1,-1 Q0.1,-1.2 0.5,-0.95 Q1.1,-0.7 0.95,0 Q1.05,0.8 0.3,0.95 Q-0.1,1.2 -0.5,0.9 Q-1.05,0.75 -0.9,0.1 Z",
    "inima": "M0,1 C-1.4,0 -1,-1.2 0,-0.45 C1,-1.2 1.4,0 0,1 Z",
}


def benefit(x, y, icon, color, l1, l2):
    r = 1.9
    ic = (f'<circle cx="{X(x)}" cy="{Y(y)}" r="{r}" fill="{color}"/>'
          f'<path d="{ICONS[icon]}" transform="translate({X(x)},{Y(y)}) scale(1.05)" fill="none" stroke="#fff" stroke-width=".32" stroke-linejoin="round"/>')
    return ic + text(x + 3, y - 0.3, l1, 2.25, DARK, 600, "Inter") + text(x + 3, y + 2.15, l2, 2.25, DARK, 600, "Inter")


def build(guides=True):
    o = []
    o.append(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
             f'width="{FW}mm" height="{FH}mm" viewBox="0 0 {FW} {FH}">')
    o.append("""<defs>
<style>
@font-face{font-family:Montserrat;font-weight:600;src:url(fonts/Montserrat-600.ttf)}
@font-face{font-family:Montserrat;font-weight:800;src:url(fonts/Montserrat-800.ttf)}
@font-face{font-family:Montserrat;font-weight:900;src:url(fonts/Montserrat-900.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(fonts/Inter-700.ttf)}
</style>
<linearGradient id="gold" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#C8963E"/><stop offset=".5" stop-color="#F2D27A"/><stop offset="1" stop-color="#B8862F"/></linearGradient>
<linearGradient id="goldv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#F2D27A"/><stop offset="1" stop-color="#C8963E"/></linearGradient>
<linearGradient id="fundal" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#FBF8FF"/><stop offset="1" stop-color="#EDE3FA"/></linearGradient>
<radialGradient id="aura" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E9DDFB"/><stop offset="1" stop-color="#E9DDFB" stop-opacity="0"/></radialGradient>
</defs>""")

    # ---------- FUNDAL (extins pe bleed) ----------
    o.append(f'<g id="FUNDAL"><rect x="0" y="0" width="{FW}" height="{FH}" fill="url(#fundal)"/>'
             f'<ellipse cx="{X(128)}" cy="{Y(55)}" rx="38" ry="30" fill="url(#aura)"/></g>')

    # ---------- BANDA DE JOS ----------
    by = 81
    o.append(f'<g id="BANDA-JOS">'
             f'<rect x="0" y="{Y(by)}" width="{FW}" height="{92 - by}" fill="{PURPLE}"/>'
             f'<rect x="0" y="{Y(by)}" width="{FW}" height=".7" fill="url(#gold)"/>'
             f'<rect x="0" y="{Y(92)}" width="{FW}" height="{H - 92 + B}" fill="url(#gold)"/>')
    o.append(text(110, 97.6, "SUPLIMENT ALIMENTAR", 3.1, "#5A3A12", 800, "Montserrat", "middle", 0.5))
    # dosare banda: 40 jeleuri | fără zahăr | fără gluten | fără coloranți
    o.append(text(70, 89.3, "40", 7, "#FFFFFF", 900))
    o.append(text(80.5, 86.3, "JELEURI", 2.3, "#FFFFFF", 800) + text(80.5, 89.2, "DE FRUCTE", 2.3, "#FFFFFF", 800))
    for i, (a, b) in enumerate([("FĂRĂ", "ZAHĂR"), ("FĂRĂ", "GLUTEN"), ("FĂRĂ COLORANȚI", "ARTIFICIALI")]):
        xx = 97 + i * 19
        o.append(f'<line x1="{X(xx - 2)}" y1="{Y(83.5)}" x2="{X(xx - 2)}" y2="{Y(90)}" stroke="#ffffff" stroke-opacity=".5" stroke-width=".25"/>')
        o.append(f'<circle cx="{X(xx + 1.8)}" cy="{Y(86.6)}" r="1.9" fill="none" stroke="#fff" stroke-width=".3"/>'
                 f'<line x1="{X(xx + 0.5)}" y1="{Y(85.3)}" x2="{X(xx + 3.1)}" y2="{Y(87.9)}" stroke="#fff" stroke-width=".3"/>')
        o.append(text(xx + 4.6, 86.3, a, 2.1, "#FFFFFF", 800) + text(xx + 4.6, 89.0, b, 2.1, "#FFFFFF", 800))
    o.append("</g>")

    # ---------- FAȚĂ ----------
    fx = 68
    o.append('<g id="FATA">')
    o.append(rainbow(133, 50, 22))
    o.append(cloud(112, 22, 0.9) + cloud(141, 40, 0.7))
    o.append(sun(143, 14, 4.3))
    o.append(star(119, 9, 1.4) + star(127, 15, 0.9) + star(150, 29, 0.9) + star(107, 33, 0.8))
    o.append(f'<image id="LOGO" x="{X(fx)}" y="{Y(4.5)}" width="31" height="{31*163/600:.2f}" xlink:href="assets/logo-novensa.png" href="assets/logo-novensa.png"/>')
    # NovaKids
    o.append(f'<text id="NUME" x="{X(fx - 0.5)}" y="{Y(24.5)}" font-family="Montserrat" font-weight="900" font-size="14" letter-spacing="-0.4">'
             f'<tspan fill="{GREEN}">Nova</tspan><tspan fill="#F5A623">K</tspan><tspan fill="#43B05C">i</tspan>'
             f'<tspan fill="#2E86DE">d</tspan><tspan fill="#E84393">s</tspan></text>')
    o.append(star(fx + 44.2, 12.4, 2.1))
    o.append(text(fx, 32, "MULTIVITAMIN", 6.1, DARK, 900, ls=0.1))
    o.append(f'<rect x="{X(fx)}" y="{Y(34.6)}" width="46" height="7" rx="1.4" fill="url(#goldv)"/>'
             f'<rect x="{X(fx + .6)}" y="{Y(35.2)}" width="44.8" height="5.8" rx="1.1" fill="none" stroke="#FFF3C4" stroke-width=".25"/>')
    o.append(text(fx + 23, 40.2, "ELITE+", 5.2, "#FFFFFF", 900, anchor="middle", ls=1.6))
    o.append(f'<rect x="{X(fx)}" y="{Y(43.6)}" width="46" height="4.4" rx="2.2" fill="{PURPLE}"/>')
    o.append(text(fx + 23, 46.7, "COMPLEX PREMIUM PENTRU COPII", 2.25, "#FFFFFF", 800, anchor="middle", ls=0.1))
    o.append(para(fx, 52.6, ["SUSȚINE CREȘTEREA", "ȘI DEZVOLTAREA", "ARMONIOASĂ A COPIILOR"], 2.6, 3.0, PURPLE_D, 800, "Montserrat"))
    for i, (ic, col, a, b) in enumerate([
            ("scut", "#6B3FA0", "Susține imunitatea", "naturală"),
            ("fulger", "#F5A623", "Contribuie la energie", "și vitalitate"),
            ("creier", "#2E86DE", "Susține funcția cognitivă", "și concentrarea"),
            ("inima", "#E84393", "Ajută la creșterea", "și dezvoltarea sănătoasă")]):
        o.append(benefit(fx + 2, 62.4 + i * 4.9, ic, col, a, b))
    # ilustrații (placeholder - de înlocuit cu fișiere HD)
    o.append(f'<image id="URSULET" x="{X(113)}" y="{Y(30)}" width="40" height="{40*210/227:.2f}" '
             f'xlink:href="assets/ursulet-PLACEHOLDER.png" href="assets/ursulet-PLACEHOLDER.png" preserveAspectRatio="xMidYMid meet"/>')
    o.append(f'<image id="FRUCTE" x="{X(110)}" y="{Y(64)}" width="19" height="19" '
             f'xlink:href="assets/fructe-PLACEHOLDER.png" href="assets/fructe-PLACEHOLDER.png"/>')
    # insignă naturale
    o.append(f'<g id="INSIGNA"><circle cx="{X(145)}" cy="{Y(70)}" r="7.6" fill="#FFFFFF" stroke="url(#gold)" stroke-width=".8"/>'
             + text(145, 67.4, "CU", 1.7, PURPLE_D, 800, anchor="middle")
             + text(145, 69.5, "INGREDIENTE", 1.7, PURPLE_D, 800, anchor="middle")
             + text(145, 71.9, "NATURALE", 2.2, GREEN, 900, anchor="middle")
             + text(145, 74.0, "ȘI VITAMINE ESENȚIALE", 1.25, PURPLE_D, 800, anchor="middle") + "</g>")
    o.append("</g>")

    # ---------- SPATE STÂNGA ----------
    lx = 5
    o.append('<g id="SPATE-STANGA">')
    o.append(f'<text x="{X(lx)}" y="{Y(11)}" font-family="Montserrat" font-weight="900" font-size="6.5">'
             f'<tspan fill="{GREEN}">Nova</tspan><tspan fill="#F5A623">K</tspan><tspan fill="#43B05C">i</tspan>'
             f'<tspan fill="#2E86DE">d</tspan><tspan fill="#E84393">s</tspan></text>')
    o.append(text(lx, 15.2, "MULTIVITAMIN ELITE+ • 40 jeleuri de fructe", 2.1, PURPLE_D, 800))
    o.append(text(lx, 21.5, "INGREDIENTE:", 2.3, DARK, 800))
    o.append(para(lx, 24.8, ["[lista completă de ingrediente, în ordine", "descrescătoare a cantității — de la producător]"], 2.0, 2.7, TODO, 600))
    o.append(text(lx, 33, "MOD DE ADMINISTRARE:", 2.3, DARK, 800))
    o.append(para(lx, 36.3, ["[doza zilnică recomandată și vârsta minimă", "— de completat conform fișei tehnice]"], 2.0, 2.7, TODO, 600))
    # tabel valori
    ty = 44
    o.append(f'<rect x="{X(lx)}" y="{Y(ty)}" width="55" height="33" fill="#FFFFFF" stroke="{DARK}" stroke-width=".3"/>'
             f'<rect x="{X(lx)}" y="{Y(ty)}" width="55" height="4.6" fill="{PURPLE}"/>')
    o.append(text(lx + 1.5, ty + 3.3, "Per doză zilnică", 2.1, "#FFFFFF", 700, "Inter")
             + text(lx + 40, ty + 3.3, "cant.", 2.1, "#FFFFFF", 700, "Inter", "end")
             + text(lx + 53.5, ty + 3.3, "%VNR*", 2.1, "#FFFFFF", 700, "Inter", "end"))
    for i, n in enumerate(["Vitamina A", "Vitamina C", "Vitamina D3", "Vitamina E", "Vitamine B", "Zinc", "[...]"]):
        yy = ty + 8 + i * 3.6
        o.append(text(lx + 1.5, yy, n, 2.0, DARK, 400, "Inter")
                 + text(lx + 40, yy, "[ ]", 2.0, TODO, 600, "Inter", "end")
                 + text(lx + 53.5, yy, "[ ]", 2.0, TODO, 600, "Inter", "end"))
        o.append(f'<line x1="{X(lx)}" y1="{Y(yy + 1.2)}" x2="{X(lx + 55)}" y2="{Y(yy + 1.2)}" stroke="{DARK}" stroke-opacity=".25" stroke-width=".15"/>')
    o.append(text(lx, 79.6, "*VNR = valoare nutrițională de referință", 1.6, DARK, 400, "Inter"))
    o.append("</g>")

    # ---------- SPATE DREAPTA ----------
    rx = 160
    o.append('<g id="SPATE-DREAPTA">')
    o.append(text(rx, 9, "ATENȚIONĂRI:", 2.3, DARK, 800))
    o.append(para(rx, 12.3, [
        "Nu depășiți doza zilnică recomandată.",
        "Suplimentele alimentare nu trebuie utilizate ca",
        "înlocuitor pentru o dietă variată și echilibrată",
        "și un stil de viață sănătos. A se administra",
        "copiilor sub supravegherea unui adult.",
        "A nu se lăsa la îndemâna copiilor mici.",
        "A se păstra la temperatura camerei, ferit de",
        "lumină și umiditate."], 1.95, 2.55, DARK, 400))
    o.append(text(rx, 35.5, "Cantitate netă:", 2.1, DARK, 800) + text(rx + 17, 35.5, "40 jeleuri / [ ] g", 2.1, TODO, 600, "Inter"))
    o.append(text(rx, 40.5, "Producător / Distribuitor:", 2.1, DARK, 800))
    o.append(para(rx, 43.4, ["[denumire firmă, adresă, CUI]"], 2.0, 2.6, TODO, 600))
    o.append(text(rx, 48.5, "Nr. notificare:", 2.1, DARK, 800) + text(rx + 16.5, 48.5, "[ ]", 2.1, TODO, 600, "Inter"))
    o.append(text(rx, 53, "Lot / A se consuma de preferință înainte de:", 1.9, DARK, 800))
    o.append(f'<rect x="{X(rx)}" y="{Y(54.5)}" width="30" height="5" fill="none" stroke="{TODO}" stroke-dasharray="1 .7" stroke-width=".25"/>'
             + text(rx + 15, 57.8, "zonă inkjet lot/EXP", 1.7, TODO, 600, "Inter", "middle"))
    o.append(f'<rect x="{X(rx + 25)}" y="{Y(62)}" width="28" height="16" fill="#FFFFFF" stroke="{TODO}" stroke-dasharray="1 .7" stroke-width=".25"/>'
             + text(rx + 39, 70.5, "COD DE BARE EAN-13", 1.8, TODO, 700, "Inter", "middle")
             + text(rx + 39, 73, "[de inserat]", 1.7, TODO, 600, "Inter", "middle"))
    o.append(f'<image x="{X(rx)}" y="{Y(66)}" width="20" height="{20*163/600:.2f}" xlink:href="assets/logo-novensa.png" href="assets/logo-novensa.png"/>')
    o.append("</g>")

    # ---------- GHIDAJE ----------
    if guides:
        g = ['<g id="GHIDAJE-ascunde-la-print" fill="none" stroke-width=".25">']
        g.append(f'<rect x="{B}" y="{B}" width="{W}" height="{H}" stroke="#00AEEF"/>')               # trim
        g.append(f'<rect x=".15" y=".15" width="{FW-.3}" height="{FH-.3}" stroke="#ED1C24" stroke-dasharray="2 1"/>')  # bleed
        g.append(f'<rect x="{B+3}" y="{B+3}" width="{W-6}" height="{H-6}" stroke="#00A651" stroke-dasharray="1 1"/>')  # safe
        for xx in (65, 155):
            g.append(f'<line x1="{X(xx)}" y1="0" x2="{X(xx)}" y2="{FH}" stroke="#F7941D" stroke-dasharray="2 1"/>')
        g.append(text(65 + 45, -0.6, "FAȚĂ (centru 110 mm)", 2, "#F7941D", 700, "Inter", "middle"))
        g.append(text(32.5, -0.6, "SPATE STÂNGA", 2, "#F7941D", 700, "Inter", "middle"))
        g.append(text(187.5, -0.6, "SPATE DREAPTA", 2, "#F7941D", 700, "Inter", "middle"))
        g.append("</g>")
        o.append("".join(g))
    o.append("</svg>")
    return "\n".join(o)


if __name__ == "__main__":
    (HERE / "NovaKids-eticheta.svg").write_text(build(True), encoding="utf-8")
    (HERE / "NovaKids-eticheta-print.svg").write_text(build(False), encoding="utf-8")
    print("ok")
