// Renders the hook overlay (transparent) and the end card for the Hepato Nova tea video -> cards/hook.png, cards/end.png
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const F = `@font-face{font-family:M;font-weight:900;src:url(../fonts/Montserrat-900.ttf)}@font-face{font-family:B;font-weight:800;src:url(../fonts/BarlowCondensed-800.ttf)}@font-face{font-family:I;font-weight:600;src:url(../fonts/Inter-600.ttf)}`;
const base = `${F}*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px;overflow:hidden;background:transparent}`;
const hook = `<div style="position:absolute;left:50%;top:70px;transform:translateX(-50%) rotate(-1.5deg);width:980px;text-align:center;background:#fff;color:#141414;font:900 60px/1.12 M;padding:24px 30px;border-radius:24px;box-shadow:0 14px 40px rgba(0,0,0,.45);text-transform:uppercase">Și ficatul tău arată <span style="color:#D7262E">așa?</span><div style="font:900 40px/1.2 M;color:#555;margin-top:8px">Balonată · grea · digestia nu mai merge</div></div>`;
const end = `<div style="position:absolute;inset:0;background:radial-gradient(90% 70% at 50% 45%,#fff 0%,#f3f1e6 60%,#e2e6cf 100%)"></div>
  <img src="../logo-novensa.png" style="position:absolute;left:50%;transform:translateX(-50%);top:60px;height:74px">
  <div style="position:absolute;left:0;right:0;top:160px;text-align:center;font:900 78px/1.05 M;color:#2f5d1e">CEAI HEPATO NOVA<br><span style="color:#c4622d">DETOX</span></div>
  <img src="box-cutout.png" style="position:absolute;left:50%;transform:translateX(-50%);top:360px;height:620px;filter:drop-shadow(0 28px 28px rgba(0,0,0,.3))">
  <div style="position:absolute;left:0;right:0;top:1000px;text-align:center;font:600 38px I;color:#333">Anghinare · Armurariu · Păpădie · Gălbenele · Sunătoare</div>
  <div style="position:absolute;left:50%;transform:translateX(-50%);top:1080px;background:#D7262E;color:#fff;font:800 74px B;text-transform:uppercase;padding:22px 70px;border-radius:22px;box-shadow:0 9px 0 #8e1219;white-space:nowrap">Comandă acum ›</div>
  <div style="position:absolute;left:0;right:0;top:1250px;text-align:center;font:600 34px I;color:#555">Plata la livrare</div>`;
(async () => {
  fs.mkdirSync(path.join(__dirname, 'cards'), { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [name, body, transparent] of [['hook', hook, true], ['end', end, false]]) {
    const f = path.join(__dirname, `_${name}.html`);
    fs.writeFileSync(f, `<!doctype html><meta charset="utf-8"><style>${base}</style>${body}`);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, 'cards', name + '.png'), omitBackground: transparent });
    fs.unlinkSync(f); console.log('ok', name);
  }
  await b.close();
})();
