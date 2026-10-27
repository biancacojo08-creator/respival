// Power Man static: soft banana vs firm banana, light background with navy and red.
// Usage: node render-doua-banane.js   -> png/power-man-doua-banane-<4x5|1x1>.png
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;color:#0E1E3A;background:linear-gradient(180deg,#FFF9EA 0%,#FFEFC2 100%)}
.hook{position:absolute;left:0;right:0;top:90px;text-align:center;font:900 112px/1 A;letter-spacing:-3px}
.hook span{color:#D7262E}
.col{position:absolute;top:400px;width:400px;height:600px;display:flex;align-items:center;justify-content:center}
.col.a{left:0}.col.b{right:0}
.soft{height:430px;transform:rotate(150deg) translateY(-30px);filter:saturate(.75) drop-shadow(0 20px 22px rgba(0,0,0,.25))}
.firm{height:600px;transform:rotate(-6deg);filter:drop-shadow(0 26px 26px rgba(0,0,0,.28))}
.lab{position:absolute;top:1010px;width:400px;text-align:center}
.lab.a{left:0}.lab.b{right:0}
.lab b{display:inline-block;font:900 34px/1 A;padding:16px 30px;border-radius:999px}
.lab.a b{background:#D9D3C4;color:#5B5547}.lab.b b{background:#D7262E;color:#fff}
.prod{position:absolute;left:0;right:0;margin:auto;top:560px;height:500px;transform:rotate(-4deg);filter:drop-shadow(0 24px 24px rgba(0,0,0,.3))}
.cta{position:absolute;left:70px;right:70px;bottom:70px;text-align:center;background:#0E1E3A;color:#fff;font:900 46px/1 A;padding:28px;border-radius:999px;box-shadow:0 14px 30px rgba(14,30,58,.35)}
`;
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="hook">De la asta…<br><span>…la asta.</span></div>
<div class="col a"><img class="soft" src="img/banana-moale.png"></div>
<div class="col b"><img class="firm" src="img/banana.png"></div>
<img class="prod" src="img/power-man.png">
<div class="lab a"><b>Fără</b></div><div class="lab b"><b>Cu Power Man</b></div>
<div class="cta">Comandă acum</div>
</body></html>`;

const sizes = [
  { id: 'power-man-doua-banane-4x5', h: 1350, css: '' },
  { id: 'power-man-doua-banane-1x1', h: 1080, css: `html,body{height:1080px}.hook{top:50px;font-size:92px}.col{top:280px;height:520px}
.soft{height:330px}.firm{height:470px}.prod{top:400px;height:400px}.lab{top:800px}.lab b{font-size:30px;padding:13px 26px}.cta{bottom:44px;font-size:40px;padding:22px}` },
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
