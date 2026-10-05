// Puts aggressive copy + offer on top of the Segmind photos in out/<id>.png -> png/<id>.png (1080x1080).
// Usage: node overlay.js [--demo] [--box]   (--box puts the real cut-out box on the table, bottom-right)   (--demo uses the packshot as a stand-in photo to preview the layout)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const COPY = {
  'S01-mic-dejun': ['Ajunge cu nopțile', 'pierdute la baie.'],
  'S02-lingura': ['10 ml dimineața.', '10 ml seara. Atât.'],
  'S03-sotia-lingura': ['Ea a comandat.', 'Acum dorm amândoi.'],
  'S04-cuplu-3-cutii': ['Cura completă:', '3 cutii, 190 lei'],
  'S05-bunic-nepot': ['Mai mult timp cu nepoții.', 'Mai puțin la baie.'],
  'S06-taxi': ['Ruta mea nu mai', 'depinde de toalete.'],
  'S07-tir': ['Kilometri,', 'nu opriri.'],
  'S08-selfie': ['Cel mai bun obicei', 'de după 50 de ani.'],
  'S09-colet': ['A venit', 'cura completă.'],
  'S10-noptiera': ['Ultimul lucru înainte', 'de culcare: 10 ml.'],
  'S11-pescar': ['Stai pe ponton,', 'nu pe drum spre mal.'],
  'S12-tamplar': ['Nu încă o pastilă.', '10 ml, de 2 ori pe zi.'],
};
const F = '../../fonts/';
const html = (img, [l1, l2], box) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1080px;overflow:hidden;background:#000}
.ph{position:absolute;inset:0;background:url("${img}") center/cover}
.g{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.15) 34%,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 80%,rgba(0,0,0,.85) 100%)}
.h{position:absolute;left:48px;right:48px;top:44px;font:900 76px/1 A;text-transform:uppercase;letter-spacing:-2px;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.5)}
.h span{background:#FFD23F;color:#0E0E0E;padding:0 12px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.logo{position:absolute;right:44px;bottom:150px;height:44px;filter:brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,.6))}
.st{position:absolute;left:40px;bottom:140px;background:#D7262E;color:#fff;border-radius:22px;padding:16px 26px;transform:rotate(-4deg);box-shadow:0 10px 24px rgba(0,0,0,.45)}
.st small{display:block;font:800 26px A;letter-spacing:1px;text-transform:uppercase}.st b{font:900 74px/1 A;letter-spacing:-2px}.st b i{font-style:normal;font-size:34px}
.tg{position:absolute;left:350px;bottom:170px;background:#FFD23F;color:#0E0E0E;font:900 28px/1.05 A;padding:14px 20px;border-radius:14px;transform:rotate(3deg)}
.ft{position:absolute;left:0;right:0;bottom:0;height:110px;background:#0E0E0E;display:flex;align-items:center;justify-content:space-between;padding:0 36px}
.ft .c{font:600 21px I;color:#eee}.ft .c b{color:#FFD23F}
.ft .btn{background:#FFD23F;color:#0E0E0E;font:900 32px A;text-transform:uppercase;padding:16px 30px;border-radius:999px}
.d{position:absolute;right:44px;bottom:118px;font:600 14px I;color:rgba(255,255,255,.7)}
</style></head><body><div class="ph"></div><div class="g"></div>
<div class="h">${l1}<br><span>${l2}</span></div>
<div class="st"><small>Cura completă</small><b>190 <i>lei</i></b></div><div class="tg">TRANSPORT<br>GRATUIT</div>
${box ? '<img src="../../product-cutout.png" style="position:absolute;right:70px;bottom:118px;height:470px;filter:drop-shadow(-14px 22px 18px rgba(0,0,0,.55))">' : ''}<img class="logo" src="../../logo-novensa.png" style="${box ? 'bottom:600px' : ''}"><div class="d">Supliment alimentar. Rezultatele pot varia.</div>
<div class="ft"><div class="c"><b>✓</b> Ingrediente naturale &nbsp; <b>✓</b> Fabricat în România &nbsp; <b>✓</b> Plata la livrare</div><div class="btn">Comandă acum</div></div></body></html>`;
(async () => {
  const demo = process.argv.includes('--demo');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const [id, copy] of Object.entries(COPY)) {
    const src = path.join(__dirname, 'out', id + '.png');
    if (!demo && !fs.existsSync(src)) continue;
    const img = demo ? '../../1231.png' : '../out/' + id + '.png';
    const f = path.join(__dirname, 'html', id + '.html'); fs.writeFileSync(f, html(img, copy, process.argv.includes('--box')));
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, 'png', (demo ? '_demo-' : '') + id + '.png') }); console.log('ok', id);
    if (demo) break;
  }
  await b.close();
})();
