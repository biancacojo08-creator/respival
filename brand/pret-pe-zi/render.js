// "Preț pe zi" statics (Vision Elite+, UroNova Forte) in the style of the Life+ Flora Help ad.
// Usage: node render.js   -> png/<id>.png (1080x1080)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const ads = [
  { id: 'vision-1-58-pe-zi', img: 'vision.png', int: '1', dec: '58', accent: '#1F4FA8', pill: '#CFE0FA',
    line: 'Mai puțin decât o cafea.',
    info: ['Cura de 3 cutii: 142,47 lei', '30 capsule / cutie'] },
  { id: 'uronova-1-74-pe-zi', img: 'uronova.png', int: '1', dec: '74', accent: '#1F4FA8', pill: '#CFE0FA',
    line: 'Mai puțin decât o cafea.',
    info: ['Cura de 3 cutii: 156,72 lei', '30 capsule / cutie'] },
];

const css = (a) => `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1080px;overflow:hidden;background:#FBF1E7;color:#141414}
.price{position:absolute;left:0;right:0;top:110px;display:flex;justify-content:center;align-items:flex-start}
.num{font:900 300px/0.82 A;letter-spacing:-14px}
.side{display:flex;flex-direction:column;align-items:flex-start;margin-left:18px;margin-top:22px}
.pill{background:${a.pill};color:${a.accent};font:800 40px/1 A;padding:12px 26px;border-radius:999px}
.lei{font:900 132px/0.9 A;letter-spacing:-4px;margin-top:6px}
.line{position:absolute;left:0;right:0;top:450px;text-align:center;font:800 56px/1 A;letter-spacing:-1px}
.prod{position:absolute;right:120px;bottom:70px;height:470px;filter:drop-shadow(0 30px 28px rgba(0,0,0,.28))}
.info{position:absolute;left:100px;bottom:120px;display:flex;align-items:center;gap:22px}
.i{width:62px;height:62px;border-radius:50%;background:#141414;color:#FBF1E7;font:800 40px/62px A;text-align:center;flex:none}
.t{font:700 30px/1.3 I}.t small{display:block;font:600 24px/1.35 I;color:#444}
`;
const html = (a) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css(a)}</style></head><body>
<div class="price"><div class="num">${a.int},${a.dec}</div><div class="side"><div class="pill">pe zi</div><div class="lei">lei</div></div></div>
<div class="line">${a.line}</div>
<div class="info"><div class="i">i</div><div class="t">${a.info[0]}<small>${a.info[1]}</small></div></div>
<img class="prod" src="img/${a.img}">
</body></html>`;

(async () => {
  fs.mkdirSync(path.join(D, 'png'), { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const a of ads) {
    const f = path.join(D, '_' + a.id + '.html'); fs.writeFileSync(f, html(a));
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(D, 'png', a.id + '.png') }); fs.unlinkSync(f);
    console.log('ok', a.id);
  }
  await b.close();
})();
