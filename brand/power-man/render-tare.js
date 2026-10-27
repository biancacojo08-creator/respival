// Power Man static: "Ține-o tare." on solid red, big firm banana behind the box.
// Usage: node render-tare.js   -> png/power-man-tare-<4x5|1x1>.png
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;color:#fff;background:radial-gradient(circle at 70% 55%,#EC3B42 0%,#D7262E 45%,#A9161D 100%)}
.hook{position:absolute;left:70px;top:90px;font:900 180px/1.14 A;letter-spacing:-7px}
.hook span{color:#FFD93B}
.sub{position:absolute;left:70px;width:560px;top:530px;font:700 34px/1.3 I;color:#FFE3E4}
.banana{position:absolute;right:150px;top:220px;height:860px;transform:rotate(18deg);filter:drop-shadow(0 34px 40px rgba(80,0,0,.45))}
.prod{position:absolute;left:150px;top:650px;height:500px;transform:rotate(-8deg);filter:drop-shadow(0 34px 34px rgba(60,0,0,.5))}
.st{position:absolute;left:560px;top:820px;width:200px;height:200px;border-radius:50%;background:#FFD93B;color:#0E1E3A;display:flex;align-items:center;justify-content:center;text-align:center;font:900 30px/1.05 A;transform:rotate(12deg);box-shadow:0 12px 24px rgba(60,0,0,.35)}
.cta{position:absolute;left:70px;right:70px;bottom:70px;text-align:center;background:#fff;color:#D7262E;font:900 46px/1 A;padding:28px;border-radius:999px;box-shadow:0 14px 30px rgba(60,0,0,.35)}
`;
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="hook">Ține-o<br><span>tare.</span></div>
<div class="sub">Power Man susține libidoul și performanța sexuală.</div>
<img class="banana" src="img/banana.png">
<img class="prod" src="img/power-man.png">
<div class="st">Libido<br>+<br>Energie</div>
<div class="cta">Comandă acum</div>
</body></html>`;

const sizes = [
  { id: 'power-man-tare-4x5', h: 1350, css: '' },
  { id: 'power-man-tare-1x1', h: 1080, css: `html,body{height:1080px}.hook{top:40px;font-size:136px}.sub{top:375px;font-size:30px;width:520px}
.banana{top:150px;height:720px;right:110px}.prod{top:490px;height:400px;left:170px}.st{left:520px;top:640px;width:170px;height:170px;font-size:26px}
.cta{bottom:44px;font-size:40px;padding:22px}` },
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
