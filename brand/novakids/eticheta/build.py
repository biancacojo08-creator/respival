#!/usr/bin/env python3
"""Generează eticheta desfășurată NovaKids Multivitamin Elite+ ca SVG editabil.

Dimensiune finală (trim): 220 x 100 mm, bleed 3 mm pe fiecare latură.
Fața (76-144 mm) reproduce mockup-ul 1:1: fiecare element e poziționat
după coordonatele lui în assets/_mockup-referinta.webp (7,9 px = 1 mm).
Rulează:  python3 build.py   ->  NovaKids-eticheta.svg (cu ghidaje) și -print.svg (fără)
"""
import math
from pathlib import Path

W, H, B = 220, 100, 3
FW, FH = W + 2 * B, H + 2 * B
HERE = Path(__file__).parent

# mockup px -> mm pe etichetă (centrul feței = 110 mm)
PX, CX0, CY0 = 7.9, 307, 135
FRONT_L, FRONT_R = 76, 144


def mx(px):
    return (px - CX0) / PX + 110


def my(py):
    return (py - CY0) / PX


GREEN = "#1A472D"
GREEN2 = "#1F442F"
PURPLE = "#774DAB"
PURPLE_K = "#6E3FAE"
INK = "#2B2B33"
TODO = "#E6007E"


def X(x):
    return x + B


def Y(y):
    return y + B


def t(x, y, s, size, fill=INK, weight=700, family="'Open Sans'", anchor="start", ls=0, tl=None, extra=""):
    fit = f' textLength="{tl:.2f}" lengthAdjust="spacingAndGlyphs"' if tl else ""
    return (f'<text x="{X(x):.2f}" y="{Y(y):.2f}" font-family="{family}" font-weight="{weight}" font-size="{size}" '
            f'fill="{fill}" text-anchor="{anchor}" letter-spacing="{ls}"{fit} {extra}>{s}</text>')


def lines(x, y, rows, size, lh, fill=INK, weight=400, family="'Open Sans'"):
    return "".join(t(x, y + i * lh, r, size, fill, weight, family) for i, r in enumerate(rows))


def star(cx, cy, r, fill="#F7B500", stroke=None):
    pts = []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.48
        pts.append(f"{X(cx + rr * math.cos(a)):.2f},{Y(cy - rr * math.sin(a)):.2f}")
    st = f' stroke="{stroke}" stroke-width=".25" stroke-linejoin="round"' if stroke else ""
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"{st}/>'


def sun(cx, cy, r):
    rays = "".join(
        f'<line x1="{X(cx + (r + .8) * math.cos(a)):.2f}" y1="{Y(cy + (r + .8) * math.sin(a)):.2f}" '
        f'x2="{X(cx + (r + 2.2) * math.cos(a)):.2f}" y2="{Y(cy + (r + 2.2) * math.sin(a)):.2f}" '
        f'stroke="#FFC93C" stroke-width=".7" stroke-linecap="round"/>' for a in [i * math.pi / 6 + .26 for i in range(12)])
    return (f'<g id="soare">{rays}<circle cx="{X(cx)}" cy="{Y(cy)}" r="{r}" fill="#FFD84D"/>'
            f'<circle cx="{X(cx - r*.35)}" cy="{Y(cy - r*.1)}" r="{r*.09}" fill="{INK}"/>'
            f'<circle cx="{X(cx + r*.35)}" cy="{Y(cy - r*.1)}" r="{r*.09}" fill="{INK}"/>'
            f'<circle cx="{X(cx - r*.6)}" cy="{Y(cy + r*.22)}" r="{r*.15}" fill="#FF9AA2" opacity=".8"/>'
            f'<circle cx="{X(cx + r*.6)}" cy="{Y(cy + r*.22)}" r="{r*.15}" fill="#FF9AA2" opacity=".8"/>'
            f'<path d="M{X(cx - r*.28):.2f},{Y(cy + r*.18):.2f} Q{X(cx):.2f},{Y(cy + r*.55):.2f} {X(cx + r*.28):.2f},{Y(cy + r*.18):.2f}" '
            f'fill="none" stroke="{INK}" stroke-width=".35" stroke-linecap="round"/></g>')


def cloud(cx, cy, s):
    return (f'<g fill="#E3EEF9" opacity=".95"><circle cx="{X(cx)}" cy="{Y(cy)}" r="{1.4*s}"/>'
            f'<circle cx="{X(cx+1.6*s)}" cy="{Y(cy-.6*s)}" r="{1.8*s}"/><circle cx="{X(cx+3.3*s)}" cy="{Y(cy)}" r="{1.3*s}"/>'
            f'<rect x="{X(cx)}" y="{Y(cy)}" width="{3.3*s}" height="{1.3*s}"/></g>')


def rainbow(cx, cy, r0):
    cols = ["#F8A5C2", "#FBC687", "#FBEFA0", "#BDE7C9", "#A9CDF0", "#CDB8EC"]
    return '<g id="curcubeu" opacity=".7">' + "".join(
        f'<path d="M{X(cx - (r0 - i*1.25)):.2f},{Y(cy):.2f} A{r0 - i*1.25},{r0 - i*1.25} 0 0 1 {X(cx + (r0 - i*1.25)):.2f},{Y(cy):.2f}" '
        f'fill="none" stroke="{c}" stroke-width="1.3"/>' for i, c in enumerate(cols)) + "</g>"


ICONS = {
    "scut": ("M0,-1.05 L0.85,-0.65 L0.85,0.1 Q0.85,0.8 0,1.1 Q-0.85,0.8 -0.85,0.1 L-0.85,-0.65 Z "
             "M-0.35,0 L-0.05,0.3 L0.4,-0.25"),
    "fulger": "M0.25,-1.05 L-0.5,0.15 L0,0.15 L-0.2,1.05 L0.55,-0.2 L0.05,-0.2 Z",
    "creier": ("M-0.85,0.1 Q-0.95,-0.85 -0.1,-0.95 Q0.1,-1.1 0.45,-0.9 Q1,-0.65 0.9,0 Q1,0.75 0.3,0.9 "
               "Q-0.1,1.1 -0.45,0.85 Q-1,0.7 -0.85,0.1 Z M0,-0.95 L0,0.9 M-0.55,-0.3 L0,-0.1 M0.55,0.25 L0,0.3"),
    "inima": "M0,0.9 C-1.3,0 -0.95,-1.1 0,-0.4 C0.95,-1.1 1.3,0 0,0.9 Z",
}


def benefit(cx, cy, icon, color, l1, l2):
    r = 1.75
    return (f'<circle cx="{X(cx)}" cy="{Y(cy)}" r="{r}" fill="#FFFFFF" stroke="{color}" stroke-width=".35"/>'
            f'<circle cx="{X(cx)}" cy="{Y(cy)}" r="{r - .45}" fill="{color}"/>'
            f'<path d="{ICONS[icon]}" transform="translate({X(cx):.2f},{Y(cy):.2f})" fill="none" stroke="#fff" '
            f'stroke-width=".26" stroke-linejoin="round" stroke-linecap="round"/>'
            + t(cx + 2.8, cy - 0.3, l1, 1.85, INK, 500) + t(cx + 2.8, cy + 1.95, l2, 1.85, INK, 500))


def no_icon(cx, cy):
    r = 1.75
    return (f'<circle cx="{X(cx)}" cy="{Y(cy)}" r="{r}" fill="none" stroke="#fff" stroke-width=".28"/>'
            f'<line x1="{X(cx - r*.7):.2f}" y1="{Y(cy - r*.7):.2f}" x2="{X(cx + r*.7):.2f}" y2="{Y(cy + r*.7):.2f}" stroke="#fff" stroke-width=".28"/>')


def build(guides=True):
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
         f'width="{FW}mm" height="{FH}mm" viewBox="0 0 {FW} {FH}">',
         """<defs><style>
@font-face{font-family:Baloo2;src:url(fonts/Baloo2.ttf);font-weight:400 800}
@font-face{font-family:Nunito;src:url(fonts/Nunito.ttf);font-weight:200 1000}
@font-face{font-family:'Open Sans';src:url(fonts/OpenSans.ttf);font-weight:300 800;font-stretch:75% 100%}
</style>
<linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#A8782A"/><stop offset=".5" stop-color="#E6BA69"/><stop offset="1" stop-color="#A8782A"/></linearGradient>
<linearGradient id="goldband" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#C99A45"/><stop offset=".45" stop-color="#FED98A"/><stop offset="1" stop-color="#C99A45"/></linearGradient>
<linearGradient id="fundal" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#FAF8FC"/><stop offset="1" stop-color="#ECE5F5"/></linearGradient>
<radialGradient id="aura" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E7DDF6"/><stop offset="1" stop-color="#E7DDF6" stop-opacity="0"/></radialGradient>
</defs>"""]

    # ---------- FUNDAL ----------
    o.append(f'<g id="FUNDAL"><rect width="{FW}" height="{FH}" fill="url(#fundal)"/>'
             f'<ellipse cx="{X(mx(450))}" cy="{Y(my(560))}" rx="26" ry="22" fill="url(#aura)"/></g>')

    # ---------- BANDA JOS (mov + auriu), pe toată circumferința ----------
    top, mid, gold_bot = my(762), my(850), my(902)
    wave = (f'M0,{Y(top + 1.5):.2f} C{X(60)},{Y(top + 2.2):.2f} {X(mx(150))},{Y(top + .8):.2f} {X(mx(300))},{Y(top - .6):.2f} '
            f'S{X(mx(560))},{Y(top - 3):.2f} {FW},{Y(top - 2.5):.2f} L{FW},{Y(mid):.2f} L0,{Y(mid):.2f} Z')
    o.append(f'<g id="BANDA-JOS"><path d="{wave}" fill="{PURPLE}"/>'
             f'<rect x="0" y="{Y(mid):.2f}" width="{FW}" height="{gold_bot - mid:.2f}" fill="url(#goldband)"/>'
             f'<rect x="0" y="{Y(gold_bot):.2f}" width="{FW}" height="{H - gold_bot + B:.2f}" fill="#FFFFFF"/>')
    o.append(t(110, my(886), "SUPLIMENT ALIMENTAR", 2.3, "#6B4A12", 700, anchor="middle", ls=0.55))
    by1, by2 = my(812), my(832)
    o.append(t(mx(74), my(834), "40", 5.6, "#FFFFFF", 900, "Nunito"))
    o.append(t(mx(128), by1, "JELEURI", 1.85, "#FFFFFF", 700) + t(mx(128), by2, "DE FRUCTE", 1.85, "#FFFFFF", 700))
    for sx in (196, 307, 417):
        o.append(f'<line x1="{X(mx(sx)):.2f}" y1="{Y(my(790)):.2f}" x2="{X(mx(sx)):.2f}" y2="{Y(my(842)):.2f}" stroke="#fff" stroke-opacity=".55" stroke-width=".2"/>')
    for ix, a, b, c in [(227, "FĂRĂ", "ZAHĂR", None), (337, "FĂRĂ", "GLUTEN", None), (442, "FĂRĂ", "COLORANȚI", "ARTIFICIALI")]:
        o.append(no_icon(mx(ix), my(815)))
        x0 = mx(ix) + 2.6
        if c:
            o.append(t(x0, my(803), a, 1.75, "#FFFFFF", 700) + t(x0, my(818), b, 1.5, "#FFFFFF", 700) + t(x0, my(833), c, 1.5, "#FFFFFF", 700))
        else:
            o.append(t(x0, by1, a, 1.85, "#FFFFFF", 700) + t(x0, by2, b, 1.85, "#FFFFFF", 700))
    o.append("</g>")

    # ---------- FAȚĂ ----------
    o.append('<g id="FATA">')
    o.append(rainbow(mx(452), my(485), 14.5))
    o.append(cloud(mx(492), my(318), .9) + cloud(mx(330), my(275), .55))
    o.append(sun(mx(472), my(257), 3.2))
    for sx, sy in [(395, 215), (455, 330), (300, 285), (525, 360), (310, 610), (370, 745), (120, 625)]:
        o.append(star(mx(sx), my(sy), .55, "#F7C948"))
    # ilustrații raster — PLACEHOLDER, de înlocuit cu originalele HD
    o.append(f'<image id="URSULET" x="{X(mx(300)):.2f}" y="{Y(my(385)):.2f}" width="{260/PX:.2f}" height="{275/PX:.2f}" '
             f'xlink:href="assets/ursulet-PLACEHOLDER.png" href="assets/ursulet-PLACEHOLDER.png"/>')
    o.append(f'<image id="FRUCTE" x="{X(mx(262)):.2f}" y="{Y(my(622)):.2f}" width="{186/PX:.2f}" height="{156/PX:.2f}" '
             f'xlink:href="assets/fructe-PLACEHOLDER.png" href="assets/fructe-PLACEHOLDER.png"/>')
    o.append(f'<image id="LOGO" x="{X(mx(87)):.2f}" y="{Y(my(187)):.2f}" width="{190/PX:.2f}" height="{190/PX*163/600:.2f}" '
             f'xlink:href="assets/logo-novensa.png" href="assets/logo-novensa.png"/>')
    # NovaKids (Baloo 2, i fără punct — steaua îl înlocuiește)
    o.append(f'<text id="NUME" x="{X(mx(80)):.2f}" y="{Y(my(327)):.2f}" font-family="Baloo2" font-weight="800" font-size="14.4" '
             f'textLength="{382/PX:.2f}" lengthAdjust="spacingAndGlyphs">'
             f'<tspan fill="{GREEN}">Nova</tspan><tspan fill="{PURPLE_K}">K</tspan><tspan fill="#F6B21A">ı</tspan>'
             f'<tspan fill="#34A2D4">d</tspan><tspan fill="#E84393">s</tspan></text>')
    o.append(star(mx(360), my(251), 2.35, "#F7B500", "#E39B00"))
    o.append(t(mx(84), my(380), "MULTIVITAMIN", 5.6, GREEN2, 800, "Nunito", tl=306 / PX))
    o.append(f'<rect x="{X(mx(85)):.2f}" y="{Y(my(392)):.2f}" width="{245/PX:.2f}" height="{45/PX:.2f}" rx=".5" fill="url(#gold)"/>')
    o.append(t(mx(207), my(428), "ELITE+", 4.6, "#FFFFFF", 600, "'Open Sans'", "middle", tl=178 / PX))
    o.append(f'<rect x="{X(mx(85)):.2f}" y="{Y(my(446)):.2f}" width="{245/PX:.2f}" height="{26/PX:.2f}" rx=".45" fill="{PURPLE}"/>')
    o.append(t(mx(207), my(465), "COMPLEX PREMIUM PENTRU COPII", 1.95, "#FFFFFF", 600, "'Open Sans'", "middle", tl=225 / PX))
    o.append(t(mx(85), my(507), "SUSȚINE CREȘTEREA", 2.3, PURPLE, 700, tl=150 / PX)
             + t(mx(85), my(530), "ȘI DEZVOLTAREA ARMONIOASĂ", 2.3, PURPLE, 700, tl=225 / PX)
             + t(mx(85), my(551), "A COPIILOR", 2.3, PURPLE, 700, tl=78 / PX))
    for (cy, ic, col, a, b) in [(595, "scut", "#774DAB", "Susține imunitatea", "naturală"),
                                (637, "fulger", "#F5A623", "Contribuie la energie", "și vitalitate"),
                                (682, "creier", "#34A2D4", "Susține funcția cognitivă", "și concentrarea"),
                                (727, "inima", "#E84393", "Ajută la creșterea", "și dezvoltarea sănătoasă")]:
        o.append(benefit(mx(96), my(cy), ic, col, a, b))
    bx, byy, br = mx(470), my(700), 47 / PX
    o.append(f'<g id="INSIGNA"><circle cx="{X(bx):.2f}" cy="{Y(byy):.2f}" r="{br:.2f}" fill="#FFFFFF" stroke="url(#gold)" stroke-width=".55"/>'
             + t(bx, byy - 3.0, "CU", 1.45, GREEN2, 700, anchor="middle")
             + t(bx, byy - 1.3, "INGREDIENTE", 1.45, GREEN2, 700, anchor="middle")
             + t(bx, byy + 0.9, "NATURALE", 2.05, GREEN2, 800, anchor="middle")
             + t(bx, byy + 2.6, "ȘI VITAMINE", 1.45, GREEN2, 700, anchor="middle")
             + t(bx, byy + 4.2, "ESENȚIALE", 1.45, GREEN2, 700, anchor="middle") + "</g>")
    o.append("</g>")

    # ---------- SPATE STÂNGA (0-76) ----------
    lx = 6
    o.append('<g id="SPATE-STANGA">')
    o.append(f'<text x="{X(lx)}" y="{Y(11.5)}" font-family="Baloo2" font-weight="800" font-size="7.5">'
             f'<tspan fill="{GREEN}">Nova</tspan><tspan fill="{PURPLE_K}">K</tspan><tspan fill="#F6B21A">i</tspan>'
             f'<tspan fill="#34A2D4">d</tspan><tspan fill="#E84393">s</tspan></text>')
    o.append(t(lx, 15.5, "MULTIVITAMIN ELITE+ • 40 jeleuri de fructe", 2.1, PURPLE, 700))
    o.append(t(lx, 22, "INGREDIENTE:", 2.2, INK, 800))
    o.append(lines(lx, 25.2, ["[lista completă de ingrediente, în ordine descrescătoare", "a cantității — de la producător]"], 1.95, 2.6, TODO, 600))
    o.append(t(lx, 33.4, "MOD DE ADMINISTRARE:", 2.2, INK, 800))
    o.append(lines(lx, 36.6, ["[doza zilnică recomandată și vârsta minimă —", "de completat conform fișei tehnice]"], 1.95, 2.6, TODO, 600))
    ty, tw = 43.5, 64
    o.append(f'<rect x="{X(lx)}" y="{Y(ty)}" width="{tw}" height="30.5" fill="#FFFFFF" stroke="{INK}" stroke-width=".3"/>'
             f'<rect x="{X(lx)}" y="{Y(ty)}" width="{tw}" height="4.4" fill="{PURPLE}"/>')
    o.append(t(lx + 1.5, ty + 3.1, "Per doză zilnică", 2.0, "#FFFFFF", 700)
             + t(lx + 47, ty + 3.1, "cant.", 2.0, "#FFFFFF", 700, anchor="end")
             + t(lx + tw - 1.5, ty + 3.1, "%VNR*", 2.0, "#FFFFFF", 700, anchor="end"))
    for i, n in enumerate(["Vitamina A", "Vitamina C", "Vitamina D3", "Vitamina E", "Vitamine B", "Zinc", "[...]"]):
        yy = ty + 7.6 + i * 3.4
        o.append(t(lx + 1.5, yy, n, 1.95, INK, 400) + t(lx + 47, yy, "[ ]", 1.95, TODO, 600, anchor="end")
                 + t(lx + tw - 1.5, yy, "[ ]", 1.95, TODO, 600, anchor="end"))
        o.append(f'<line x1="{X(lx)}" y1="{Y(yy + 1.15)}" x2="{X(lx + tw)}" y2="{Y(yy + 1.15)}" stroke="{INK}" stroke-opacity=".2" stroke-width=".15"/>')
    o.append(t(lx, 76.5, "*VNR = valoare nutrițională de referință", 1.6, INK, 400))
    o.append("</g>")

    # ---------- SPATE DREAPTA (144-220) ----------
    rx = 150
    o.append('<g id="SPATE-DREAPTA">')
    o.append(t(rx, 9.5, "ATENȚIONĂRI:", 2.2, INK, 800))
    o.append(lines(rx, 12.8, [
        "Nu depășiți doza zilnică recomandată. Suplimentele",
        "alimentare nu trebuie utilizate ca înlocuitor pentru o",
        "dietă variată și echilibrată și un stil de viață sănătos.",
        "A se administra copiilor sub supravegherea unui adult.",
        "A nu se lăsa la îndemâna copiilor mici. A se păstra la",
        "temperatura camerei, ferit de lumină și umiditate."], 1.9, 2.5, INK, 400))
    o.append(t(rx, 31.5, "Cantitate netă:", 2.0, INK, 800) + t(rx + 16.5, 31.5, "40 jeleuri / [ ] g", 2.0, TODO, 600))
    o.append(t(rx, 36.5, "Producător / Distribuitor:", 2.0, INK, 800))
    o.append(t(rx, 39.4, "[denumire firmă, adresă, CUI]", 1.95, TODO, 600))
    o.append(t(rx, 44.5, "Nr. notificare:", 2.0, INK, 800) + t(rx + 16, 44.5, "[ ]", 2.0, TODO, 600))
    o.append(t(rx, 49.5, "Lot / A se consuma de preferință înainte de:", 1.85, INK, 800))
    o.append(f'<rect x="{X(rx)}" y="{Y(51)}" width="30" height="5" fill="none" stroke="{TODO}" stroke-dasharray="1 .7" stroke-width=".25"/>'
             + t(rx + 15, 54.3, "zonă inkjet lot/EXP", 1.7, TODO, 600, anchor="middle"))
    o.append(f'<rect x="{X(rx + 36)}" y="{Y(58)}" width="28" height="15" fill="#FFFFFF" stroke="{TODO}" stroke-dasharray="1 .7" stroke-width=".25"/>'
             + t(rx + 50, 65.8, "COD DE BARE EAN-13", 1.8, TODO, 700, anchor="middle")
             + t(rx + 50, 68.3, "[de inserat]", 1.7, TODO, 600, anchor="middle"))
    o.append(f'<image x="{X(rx)}" y="{Y(63)}" width="24" height="{24*163/600:.2f}" xlink:href="assets/logo-novensa.png" href="assets/logo-novensa.png"/>')
    o.append("</g>")

    # ---------- GHIDAJE ----------
    if guides:
        g = ['<g id="GHIDAJE-ascunde-la-print" fill="none" stroke-width=".25">',
             f'<rect x="{B}" y="{B}" width="{W}" height="{H}" stroke="#00AEEF"/>',
             f'<rect x=".15" y=".15" width="{FW-.3}" height="{FH-.3}" stroke="#ED1C24" stroke-dasharray="2 1"/>',
             f'<rect x="{B+3}" y="{B+3}" width="{W-6}" height="{H-6}" stroke="#00A651" stroke-dasharray="1 1"/>']
        for xx in (FRONT_L, FRONT_R):
            g.append(f'<line x1="{X(xx)}" y1="0" x2="{X(xx)}" y2="{FH}" stroke="#F7941D" stroke-dasharray="2 1"/>')
        g.append(t(110, -0.6, "FAȚĂ (centru 110 mm)", 2, "#F7941D", 700, anchor="middle")
                 + t(FRONT_L / 2, -0.6, "SPATE STÂNGA", 2, "#F7941D", 700, anchor="middle")
                 + t((FRONT_R + W) / 2, -0.6, "SPATE DREAPTA", 2, "#F7941D", 700, anchor="middle"))
        g.append("</g>")
        o.append("".join(g))
    o.append("</svg>")
    return "\n".join(o)


if __name__ == "__main__":
    (HERE / "NovaKids-eticheta.svg").write_text(build(True), encoding="utf-8")
    (HERE / "NovaKids-eticheta-print.svg").write_text(build(False), encoding="utf-8")
    print("ok")
