"""Postări informative 1080×1350 (feed FB/IG). Folosire: python3 build.py && node render.js"""
from pathlib import Path
HERE = Path(__file__).resolve().parent
F = "../fonts"
BASE = f"""
@font-face{{font-family:Merri;src:url({F}/Merriweather-900.ttf);font-weight:900}}
@font-face{{font-family:Merri;src:url({F}/Merriweather-700.ttf);font-weight:700}}
@font-face{{font-family:Fraunces;src:url({F}/Fraunces-800i.ttf);font-weight:800;font-style:italic}}
@font-face{{font-family:Fraunces;src:url({F}/Fraunces-600i.ttf);font-weight:600;font-style:italic}}
@font-face{{font-family:Inter;src:url({F}/Inter-400.ttf);font-weight:400}}
@font-face{{font-family:Inter;src:url({F}/Inter-600.ttf);font-weight:600}}
@font-face{{font-family:Inter;src:url({F}/Inter-700.ttf);font-weight:700}}
@font-face{{font-family:Barlow;src:url({F}/BarlowCondensed-800.ttf);font-weight:800}}
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:1080px;height:1350px;overflow:hidden;font-family:Inter;position:relative;background:var(--bg);color:var(--ink)}}
.logo{{position:absolute;top:56px;left:72px;height:44px}}
.tag{{position:absolute;top:62px;right:72px;font:700 20px Inter;letter-spacing:3px;text-transform:uppercase;color:var(--acc);border:2px solid var(--acc);border-radius:40px;padding:8px 18px}}
h1{{font:900 76px/1.04 Merri;letter-spacing:-1px}}
h1 em{{font:800 italic 80px Fraunces;color:var(--acc)}}
.sub{{font:400 28px/1.4 Inter;color:var(--muted)}}
.foot{{position:absolute;left:0;right:0;bottom:0;height:64px;background:var(--bar);color:var(--barink);display:flex;align-items:center;justify-content:center;gap:34px;font:600 20px Inter}}
.disc{{position:absolute;right:72px;bottom:80px;font:400 16px Inter;color:var(--muted)}}
.prod{{position:absolute;filter:drop-shadow(0 30px 40px rgba(0,0,0,.28))}}
"""
FOOT = '<div class="foot"><span>✓ Ingrediente naturale</span><span>✓ Fabricat în România</span><span>✓ Plata la livrare</span></div>'
LOGO = '<img class="logo" src="../logo-novensa.png">'
DISC = '<div class="disc">Supliment alimentar. Informații generale, nu înlocuiesc sfatul medicului.</div>'

posts = {}

# 1. CARDIO: valorile tensiunii
posts["01-cardio-tensiunea"] = ("""
:root{--bg:#FBF6F1;--ink:#2A1B1B;--acc:#B3262E;--muted:#6B5A57;--bar:#B3262E;--barink:#fff}
.t{position:absolute;left:72px;top:150px;width:640px}
.tbl{position:absolute;left:72px;top:520px;width:600px;border-radius:28px;overflow:hidden;background:#fff;box-shadow:0 20px 50px rgba(120,40,40,.10)}
.r{display:flex;justify-content:space-between;align-items:center;padding:26px 32px;border-bottom:1px solid #F1E6E1;font:600 27px Inter}
.r b{font:800 40px Barlow;letter-spacing:.5px}
.r i{display:inline-block;width:18px;height:18px;border-radius:50%;margin-right:16px;vertical-align:middle}
.r small{display:block;font:400 19px Inter;color:var(--muted);margin-top:4px;margin-left:34px}
.tip{position:absolute;left:72px;top:1080px;width:600px;font:400 25px/1.45 Inter;color:var(--muted)}
.tip strong{color:var(--ink)}
.card{position:absolute;right:58px;top:470px;width:330px;height:560px;border-radius:28px;overflow:hidden;box-shadow:0 30px 60px rgba(120,40,40,.18)}
.card img{width:100%;height:100%;object-fit:cover}
""", f"""{LOGO}<div class="tag">Știai că?</div>
<div class="t"><h1>Cât ar trebui să ai <em>tensiunea?</em></h1>
<p class="sub" style="margin-top:26px">Salvează postarea și verifică-ți valorile o dată pe săptămână.</p></div>
<div class="tbl">
 <div class="r"><span><i style="background:#3FA26B"></i>Optimă</span><b>&lt;120/80</b></div>
 <div class="r"><span><i style="background:#9BC45A"></i>Normală</span><b>120–129/80–84</b></div>
 <div class="r"><span><i style="background:#F2B33D"></i>Normal-înaltă</span><b>130–139/85–89</b></div>
 <div class="r" style="border:0"><span><i style="background:#D33A3A"></i>Mare<small>mergi la medic</small></span><b>≥140/90</b></div>
</div>
<div class="tip"><strong>Sfat:</strong> măsoar-o dimineața, după 5 minute de stat jos, cu brațul sprijinit la nivelul inimii.</div>
<div class="card"><img src="../site-redesign/img/cardio.webp"></div>
<div class="disc" style="right:72px">Valori orientative pentru adulți (ESC/ESH). Supliment alimentar.</div>{FOOT}""")

# 2. PROSTA: semne
posts["02-prosta-semne"] = ("""
:root{--bg:#0E0F0D;--ink:#F6F0E2;--acc:#E2B866;--muted:#B9B19F;--bar:#E2B866;--barink:#0E0F0D}
.logo{filter:brightness(0) invert(1)}
.t{position:absolute;left:72px;top:150px;width:900px}
.big{font:800 180px/0.9 Barlow;color:var(--acc)}
.list{position:absolute;left:72px;top:640px;width:560px;display:flex;flex-direction:column;gap:22px}
.li{display:flex;gap:20px;align-items:center;font:600 28px/1.3 Inter;background:rgba(255,255,255,.05);border:1px solid rgba(226,184,102,.25);border-radius:20px;padding:20px 24px}
.li span{flex:none;width:46px;height:46px;border-radius:50%;background:var(--acc);color:#0E0F0D;display:grid;place-items:center;font:800 26px Barlow}
.prod{right:70px;top:540px;height:640px}
.glow{position:absolute;right:-80px;top:560px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(226,184,102,.28),rgba(226,184,102,0) 65%)}
""", f"""{LOGO}<div class="tag">Știai că?</div>
<div class="t"><div class="big">1 din 2</div>
<h1 style="margin-top:14px;font-size:62px">bărbați peste 50 de ani<br>au <em style="font-size:66px">prostata mărită.</em></h1>
<p class="sub" style="margin-top:22px">Semnele apar treptat. Cele mai frecvente:</p></div>
<div class="list">
 <div class="li"><span>1</span>Te trezești noaptea să urinezi</div>
 <div class="li"><span>2</span>Jet slab sau întrerupt</div>
 <div class="li"><span>3</span>Senzația că vezica nu se golește</div>
 <div class="li"><span>4</span>Urinări dese în timpul zilei</div>
</div>
<div class="glow"></div><img class="prod" src="../site-redesign/img/prosta.webp">
<div class="disc" style="color:#8E8778">Dacă ai aceste semne, discută cu medicul urolog. Supliment alimentar.</div>{FOOT}""")

# 3. HEPATO: ficatul
posts["03-hepato-ficatul"] = ("""
:root{--bg:#F4F1E6;--ink:#1F3A24;--acc:#C98A1B;--muted:#5D6B57;--bar:#2F6B3A;--barink:#fff}
.t{position:absolute;left:72px;top:150px;width:900px}
.grid{position:absolute;left:72px;top:470px;width:520px;display:grid;grid-template-columns:1fr 1fr;gap:20px}
.c{background:#fff;border-radius:24px;padding:26px 24px;box-shadow:0 14px 34px rgba(47,107,58,.08)}
.c b{display:block;font:800 64px/1 Barlow;color:#2F6B3A}
.c p{font:600 22px/1.3 Inter;margin-top:8px}
.leaf{position:absolute;right:-60px;top:380px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,#DCE8C9,rgba(220,232,201,0) 70%)}
.prod{right:40px;top:480px;height:610px}
.note{position:absolute;left:72px;top:1010px;width:560px;font:400 25px/1.45 Inter;color:var(--muted)}
.note strong{color:var(--ink)}
""", f"""{LOGO}<div class="tag">Știai că?</div>
<div class="t"><h1>Ficatul tău lucrează <em>non-stop</em> pentru tine.</h1></div>
<div class="grid">
 <div class="c"><b>500+</b><p>funcții în corp</p></div>
 <div class="c"><b>1,5 kg</b><p>cel mai mare organ intern</p></div>
 <div class="c"><b>~1,4 L</b><p>sânge filtrat pe minut</p></div>
 <div class="c"><b>♻</b><p>se poate regenera</p></div>
</div>
<div class="note"><strong>Ajută-l:</strong> apă suficientă, mai puțin alcool și prăjeli, plus o cană de ceai din plante seara.</div>
<div class="leaf"></div><img class="prod" src="../site-redesign/img/hepato.webp">
{DISC}{FOOT}""")

# 4. RESPIVAL: sezonul rece
posts["04-respival-sezon-rece"] = ("""
:root{--bg:#EAF3F6;--ink:#163A4A;--acc:#2C8FA8;--muted:#4F6B76;--bar:#163A4A;--barink:#fff}
.t{position:absolute;left:72px;top:150px;width:900px}
.list{position:absolute;left:72px;right:72px;top:520px;display:grid;grid-template-columns:1fr 1fr;gap:22px}
.li{background:#fff;border-radius:26px;padding:30px 30px;box-shadow:0 16px 36px rgba(22,58,74,.08)}
.li .ic{font-size:46px}
.li h3{font:900 30px/1.2 Merri;margin-top:12px}
.li p{font:400 22px/1.4 Inter;color:var(--muted);margin-top:8px}
.li.wide{grid-column:span 2;display:flex;gap:26px;align-items:center;background:var(--ink);color:#fff}
.li.wide p{color:#BFD7E0}
.blob{position:absolute;right:-120px;top:-120px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,#CFE6EE,rgba(207,230,238,0) 70%)}
""", f"""<div class="blob"></div>{LOGO}<div class="tag">Ghid scurt</div>
<div class="t"><h1>4 obiceiuri pentru <em>o respirație ușoară</em> în sezonul rece</h1></div>
<div class="list">
 <div class="li"><div class="ic">🪟</div><h3>Aerisește</h3><p>de 2–3 ori pe zi, câte 10 minute</p></div>
 <div class="li"><div class="ic">💧</div><h3>Umiditate 40–60%</h3><p>aerul uscat irită căile respiratorii</p></div>
 <div class="li"><div class="ic">🍵</div><h3>Lichide calde</h3><p>ceai, supă, apă: 2 litri pe zi</p></div>
 <div class="li"><div class="ic">🚶</div><h3>Mișcare afară</h3><p>30 de minute de mers zilnic</p></div>
 <div class="li wide"><div class="ic">🌿</div><div><h3>Plus: Respival</h3><p>susține sănătatea căilor respiratorii, cu extracte din plante. Pe novensa-romania.ro</p></div></div>
</div>
<div class="disc">Supliment alimentar. Informații generale, nu înlocuiesc sfatul medicului.</div>{FOOT}""")

for name, (css, body) in posts.items():
    (HERE / f"{name}.html").write_text(f"<!doctype html><html><head><meta charset='utf-8'><style>{BASE}{css}</style></head><body>{body}</body></html>", encoding="utf-8")
print("ok", len(posts))
