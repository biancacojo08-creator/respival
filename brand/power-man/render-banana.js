// Power Man static, banana layout: navy background, big banana behind the box, yellow accents.
// Usage: node render-banana.js   -> png/power-man-banana-<4x5|1x1>.png
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;color:#fff;
 background:radial-gradient(circle at 72% 62%,rgba(255,217,59,.28) 0%,rgba(255,217,59,0) 40%),linear-gradient(170deg,#13274D 0%,#0B1730 100%)}
.hook{position:absolute;left:70px;right:60px;top:100px;font:900 116px/0.98 A;letter-spacing:-3px}
.hook span{color:#FFD93B}
.sub{position:absolute;left:70px;right:60px;top:370px;font:700 34px/1.3 I;color:#C3CFE3}
.banana{position:absolute;right:150px;top:440px;height:780px;transform:rotate(8deg);filter:drop-shadow(0 30px 40px rgba(0,0,0,.5))}
.prod{position:absolute;left:170px;top:590px;height:560px;transform:rotate(-6deg);filter:drop-shadow(0 34px 34px rgba(0,0,0,.55))}
.chips{position:absolute;left:70px;top:480px;display:flex;flex-direction:column;gap:14px}
.chips span{font:900 30px/1 A;color:#FFD93B;letter-spacing:1px}
.cta{position:absolute;left:70px;right:70px;bottom:70px;text-align:center;background:#FFD93B;color:#0B1730;font:900 46px/1 A;padding:28px;border-radius:999px;box-shadow:0 14px 30px rgba(0,0,0,.4)}
`;
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="hook">Banana ta<br><span>nu mai e tare?</span></div>
<div class="sub">Power Man: pentru libido și performanță sexuală.</div>
<img class="banana" src="img/banana.png">
<img class="prod" src="img/power-man.png">
<div class="cta">Comandă acum</div>
</body></html>`;

const sizes = [
  { id: 'power-man-banana-4x5', h: 1350, css: '' },
  { id: 'power-man-banana-1x1', h: 1080, css: `html,body{height:1080px}.hook{top:60px;font-size:96px}.sub{top:300px;font-size:30px}
.banana{top:330px;height:600px;right:170px}.prod{top:430px;height:450px;left:200px}.cta{bottom:44px;font-size:40px;padding:22px}` },
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
