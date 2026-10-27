// "Preț pe zi" statics for Vision Elite+ and UroNova Forte, in Novensa label colours (navy + gold).
// Usage: node render.js   -> png/<id>.png (1080x1080)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const ads = [
  { id: 'vision-1-58-pe-zi', img: 'vision.png', price: '1,58', cure: '142,47', line: 'Pentru ochii tăi, mai puțin decât o cafea pe zi.' },
  { id: 'uronova-1-74-pe-zi', img: 'uronova.png', price: '1,74', cure: '156,72', line: 'Confort zilnic, mai ieftin decât o cafea pe zi.' },
  { id: 'diabexum-1-89-pe-zi', img: 'diabexum.png', price: '1,89', cure: '170', line: 'Echilibru în fiecare zi, mai ieftin decât o cafea.' },
  // 60 capsules per box last 45 days: 3 boxes = 135 days
  { id: 'cardio-1-47-pe-zi', img: 'cardio.png', price: '1,47', tag: 'CURA DE 4 LUNI ȘI JUMĂTATE', cure: '199', caps: '180 de capsule', line: 'Pentru inima ta, mai puțin decât o cafea pe zi.' },
];

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden;background:linear-gradient(160deg,#EEF4FD 0%,#FFFFFF 60%,#F7F1E6 100%);color:#14306B}
.disk{position:absolute;left:-120px;top:250px;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle at 45% 40%,#FFFFFF 0%,#DCE8FA 70%)}
.ring{position:absolute;left:-80px;top:290px;width:640px;height:640px;border-radius:50%;border:3px solid #E6C27A;opacity:.6}
.logo{position:absolute;left:70px;top:64px;height:52px}
.prod{position:absolute;left:70px;bottom:80px;height:640px;filter:drop-shadow(0 36px 30px rgba(20,48,107,.25))}
.col{position:absolute;left:540px;right:40px;top:150px}
.tag{display:inline-block;background:#14306B;color:#F3D48B;font:800 26px/1 A;letter-spacing:2px;padding:14px 22px;border-radius:10px}
.doar{font:800 64px/1 A;margin-top:46px}
.price{display:flex;align-items:flex-end;margin-top:4px}
.num{font:900 190px/0.8 A;letter-spacing:-9px}
.unit{font:900 46px/0.95 A;color:#C9963A;margin:0 0 4px 12px}
.bar{width:150px;height:10px;border-radius:5px;background:linear-gradient(90deg,#C9963A,#F3D48B);margin-top:34px}
.line{font:700 34px/1.25 I;color:#24324F;margin-top:30px}
.card{margin-top:44px;background:#fff;border-radius:22px;box-shadow:0 14px 34px rgba(20,48,107,.14);padding:24px 28px;display:flex;align-items:center;gap:20px}
.card b{font:900 50px/1 A;color:#14306B;white-space:nowrap}
.card span{font:600 24px/1.3 I;color:#4A5675;white-space:nowrap}
`;
const html = (a) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="disk"></div><div class="ring"></div>
<img class="logo" src="../logo-novensa.png">
<img class="prod" src="img/${a.img}">
<div class="col">
  <div class="tag">${a.tag || 'CURA DE 3 LUNI'}</div>
  <div class="doar">Doar</div>
  <div class="price"><div class="num">${a.price}</div><div class="unit">lei<br>/zi</div></div>
  <div class="bar"></div>
  <div class="line">${a.line}</div>
  <div class="card"><b>${a.cure} lei</b><span>3 cutii<br>${a.caps || '90 de capsule'}</span></div>
</div>
</body></html>`;

// 1:1 and 4:5 feed; the 4:5 layout stretches the same composition over 1350px.
const sizes = [
  { suffix: '', h: 1080, css: '' },
  { suffix: '-4x5', h: 1350, css: `html,body{height:1350px}
.logo{top:80px}.disk{top:420px;width:720px;height:720px;left:-190px}.ring{top:460px;width:640px;height:640px;left:-150px}
.prod{height:780px;bottom:110px;left:60px}.col{top:260px}.doar{margin-top:60px}.bar{margin-top:44px}.line{margin-top:40px}.card{margin-top:60px}` },
];

(async () => {
  fs.mkdirSync(path.join(D, 'png'), { recursive: true });
  const b = await chromium.launch();
  for (const s of sizes) {
    const p = await b.newPage({ viewport: { width: 1080, height: s.h } });
    for (const a of ads) {
      const id = a.id + s.suffix, f = path.join(D, '_' + id + '.html');
      fs.writeFileSync(f, html(a).replace('</style>', s.css + '</style>'));
      await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(D, 'png', id + '.png') }); fs.unlinkSync(f);
      console.log('ok', id);
    }
    await p.close();
  }
  await b.close();
})();
