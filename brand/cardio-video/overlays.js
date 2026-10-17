// Renders transparent caption overlays + end card (1080x1350) for the Cardio Balance "noaptea" video.
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const F = `@font-face{font-family:M;font-weight:900;src:url(../fonts/Montserrat-900.ttf)}@font-face{font-family:B;font-weight:800;src:url(../fonts/BarlowCondensed-800.ttf)}@font-face{font-family:I;font-weight:600;src:url(../fonts/Inter-600.ttf)}`;
const base = `${F}*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px;overflow:hidden;background:transparent}
.cap{position:absolute;left:50%;transform:translateX(-50%);width:max-content;max-width:92%;text-align:center;font:900 62px/1.15 M;color:#fff;padding:18px 34px;border-radius:20px;background:rgba(0,0,0,.55);text-shadow:0 3px 12px rgba(0,0,0,.5)}
.cap b{color:#ffd23f}.red{background:#D7262E}`;
const cap = (txt, top, cls = '') => `<div class="cap ${cls}" style="top:${top}px">${txt}</div>`;
const OV = {
  t1: cap('E ora <b>3 noaptea</b>…', 120) + cap('și iar nu poți dormi?', 260),
  t2: cap('Transpiri.<br>Inima bate tare.', 120),
  t3: cap('Vrei dimineți <b>liniștite</b>?', 120),
  t4: cap('Ai grijă de inima ta<br>în fiecare zi.', 1030, ''),
  end: `<div style="position:absolute;inset:0;background:radial-gradient(90% 70% at 50% 45%,#fff 0%,#f4efe8 60%,#e6ddd0 100%)"></div>
    <img src="../logo-novensa.png" style="position:absolute;left:50%;transform:translateX(-50%);top:60px;height:70px">
    <div style="position:absolute;left:0;right:0;top:160px;text-align:center;font:900 92px/1 M;color:#1b1b1b">CARDIO <span style="color:#D7262E">BALANCE</span></div>
    <img src="src/cardio-cutout.png" style="position:absolute;left:150px;top:300px;height:640px;filter:drop-shadow(0 26px 26px rgba(0,0,0,.35))">
    <img src="src/cardio-cutout.png" style="position:absolute;left:540px;top:330px;height:600px;filter:drop-shadow(0 26px 26px rgba(0,0,0,.35))">
    <div style="position:absolute;right:50px;top:300px;width:260px;height:260px;border-radius:50%;background:#D7262E;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);border:6px dashed rgba(255,255,255,.6);box-shadow:0 14px 30px rgba(0,0,0,.3)"><b style="font:800 110px/0.9 B">1+1</b><span style="font:800 50px/1 B;color:#ffd23f">GRATIS</span></div>
    <div style="position:absolute;left:0;right:0;top:990px;text-align:center;font:600 40px I;color:#333">Comanzi unul, îl primești pe al doilea gratuit</div>
    <div style="position:absolute;left:50%;transform:translateX(-50%);top:1090px;background:#D7262E;color:#fff;font:800 66px B;text-transform:uppercase;padding:22px 60px;border-radius:20px;box-shadow:0 8px 0 #8e1219;white-space:nowrap">Comandă acum ›</div>`,
};
(async () => {
  fs.mkdirSync(path.join(__dirname, 'ov'), { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [k, body] of Object.entries(OV)) {
    const f = path.join(__dirname, `_${k}.html`);
    fs.writeFileSync(f, `<!doctype html><meta charset="utf-8"><style>${base}</style>${body}`);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, 'ov', k + '.png'), omitBackground: k !== 'end' });
    fs.unlinkSync(f);
  }
  await b.close();
})();
