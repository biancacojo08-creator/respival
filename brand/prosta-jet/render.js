// Prosta Complex static: hook "Dacă jetul nu mai are presiune...". Claims only from the box.
// Usage: node render.js   -> png/<id>.png (4:5 and 1:1)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:M;font-weight:900;src:url(${F}Merriweather-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;background:#F6F0E6;color:#111}
.top{position:absolute;left:0;right:0;top:0;height:470px;background:#0B0B0B}
.top:after{content:'';position:absolute;left:0;right:0;bottom:-2px;height:6px;background:linear-gradient(90deg,#8F5F1F,#F7E19C,#D4A24C,#8F5F1F)}
.hook{position:absolute;left:70px;right:70px;top:110px;color:#fff;font:900 96px/1.02 M;letter-spacing:-1px}
.hook span{color:#E8C778}
.sub{position:absolute;left:70px;right:70px;top:335px;color:#CFC6B5;font:600 34px/1.3 I}
.prod{position:absolute;right:60px;top:400px;height:820px;filter:drop-shadow(0 34px 30px rgba(0,0,0,.4))}
.list{position:absolute;left:70px;width:560px;top:580px}
.r{display:flex;gap:18px;align-items:flex-start;margin-bottom:34px}
.ck{flex:none;width:50px;height:50px;border-radius:50%;background:#0B0B0B;color:#E8C778;font:900 30px/50px A;text-align:center}
.r p{font:700 32px/1.25 I;color:#1B1B1B;padding-top:4px}
.cta{position:absolute;left:70px;bottom:90px}
.cta b{display:inline-block;background:linear-gradient(90deg,#D4A24C,#F7E19C);color:#0B0B0B;font:900 42px/1 A;padding:26px 56px;border-radius:999px;box-shadow:0 12px 26px rgba(0,0,0,.2)}
`;
const reasons = ['Susține sănătatea prostatei și funcția urinară', 'Contribuie la reducerea disconfortului', 'Supliment lichid, cu ingrediente naturale', 'Fabricat în România'];
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="top"></div>
<div class="hook">Dacă jetul nu mai are <span>presiune…</span></div>
<div class="sub">…nu e doar vârsta. Prostata are nevoie de sprijin.</div>
<img class="prod" src="../product-cutout.png">
<div class="list">${reasons.map((r) => `<div class="r"><div class="ck">✓</div><p>${r}</p></div>`).join('')}</div>
<div class="cta"><b>Comandă acum</b></div>
</body></html>`;

const sizes = [
  { id: 'prosta-jet-4x5', h: 1350, css: '' },
  { id: 'prosta-jet-1x1', h: 1080, css: `html,body{height:1080px}.top{height:450px}.hook{top:70px;font-size:82px}.sub{top:335px;font-size:30px}
.prod{top:380px;height:640px}.list{top:500px;width:540px}.r{margin-bottom:22px}.r p{font-size:28px}.ck{width:44px;height:44px;line-height:44px;font-size:26px}
.cta{bottom:60px}.cta b{font-size:36px;padding:22px 48px}` },
];

(async () => {
  fs.mkdirSync(path.join(D, 'png'), { recursive: true });
  const b = await chromium.launch();
  for (const s of sizes) {
    const p = await b.newPage({ viewport: { width: 1080, height: s.h } });
    const f = path.join(D, '_' + s.id + '.html'); fs.writeFileSync(f, html.replace('</style>', s.css + '</style>'));
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(D, 'png', s.id + '.png') }); fs.unlinkSync(f);
    console.log('ok', s.id); await p.close();
  }
  await b.close();
})();
