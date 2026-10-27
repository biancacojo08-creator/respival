// Power Man static, second layout: centred hook on dark navy, tilted box, benefit chips.
// Usage: node render-intarire.js   -> png/power-man-intarire-<4x5|1x1>.png
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;color:#fff;
 background:radial-gradient(circle at 50% 68%,rgba(215,38,46,.45) 0%,rgba(215,38,46,0) 42%),radial-gradient(circle at 50% 30%,#1C3566 0%,#0E1E3A 55%,#070F22 100%)}
.hook{position:absolute;left:0;right:0;top:110px;text-align:center;font:900 100px/1 A;letter-spacing:-3px}
.try{position:absolute;left:0;right:0;top:350px;text-align:center}
.try b{display:inline-block;background:#D7262E;color:#fff;font:900 76px/1 A;letter-spacing:-2px;padding:18px 40px 22px;transform:rotate(-3deg);box-shadow:0 14px 30px rgba(0,0,0,.35)}
.arrow{position:absolute;left:0;right:0;top:480px;text-align:center;font:900 70px/1 A;color:#6FB2F2}
.prod{position:absolute;left:0;right:0;margin:auto;top:555px;height:500px;transform:rotate(-7deg);filter:drop-shadow(0 40px 40px rgba(0,0,0,.55))}
.chips{position:absolute;left:0;right:0;bottom:200px;display:flex;justify-content:center;gap:16px}
.chips span{border:2px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);font:700 30px/1 I;padding:16px 26px;border-radius:999px}
.cta{position:absolute;left:90px;right:90px;bottom:70px;text-align:center;background:#D7262E;font:900 46px/1 A;padding:28px;border-radius:999px;box-shadow:0 14px 30px rgba(0,0,0,.4)}
`;
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="hook">Dacă nu reușești<br>să te întărești…</div>
<div class="try"><b>încearcă asta.</b></div>
<div class="arrow">↓</div>
<img class="prod" src="img/power-man.png">
<div class="chips"><span>Libido</span><span>Energie</span><span>Performanță sexuală</span></div>
<div class="cta">Comandă acum</div>
</body></html>`;

const sizes = [
  { id: 'power-man-intarire-4x5', h: 1350, css: '' },
  { id: 'power-man-intarire-1x1', h: 1080, css: `html,body{height:1080px}.hook{top:60px;font-size:84px}.try{top:262px}.try b{font-size:62px}
.arrow{display:none}.prod{top:390px;height:430px}.chips{bottom:150px}.chips span{font-size:26px;padding:13px 22px}.cta{bottom:44px;font-size:40px;padding:22px}` },
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
