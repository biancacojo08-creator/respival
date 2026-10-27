// Cardio Balance aggressive ads, two looks with the same hooks:
//  foto    = full-bleed UGC photo with native caption (like ../prosta-jet/render-foto.js)
//  fundal  = dark glow background with the bottle (like ../prosta-jet/render-agresiv.js)
// Usage: node render.js   -> png/foto/*.jpg and png/fundal/*.png (4:5; fundal also 1:1)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/', U = '../ugc-higgsfield/cardio-balance/';

const BG = {
  red: ['rgba(255,120,120,.55)', '#4A0E12', '#140405'],
  navy: ['rgba(140,195,250,.55)', '#13274D', '#060D1F'],
  gold: ['rgba(232,199,120,.6)', '#1E1A12', '#050505'],
};
const ads = [
  { id: 'noaptea', img: 'cardio-balance-01.jpg', bg: 'red', hook: 'Te trezești noaptea cu inima bătându‑ți în&nbsp;urechi?', hl: 'Nu e doar stresul.' },
  { id: 'scari', img: 'cardio-balance-02.jpg', bg: 'navy', hook: 'Gâfâi după un singur etaj de scări?', hl: 'Inima ta muncește prea mult.' },
  { id: 'tensiune', img: 'cardio-balance-03.jpg', bg: 'red', hook: 'Tensiunea sare la fiecare emoție?', hl: 'Inima are nevoie de sprijin.' },
  { id: 'palpitatii', img: 'cardio-balance-04.jpg', bg: 'gold', hook: 'Inima o ia la galop din&nbsp;senin?', hl: 'Nu o mai ignora.' },
  { id: 'tata', img: 'cardio-balance-05.jpg', bg: 'navy', hook: 'Tata obosește după doi&nbsp;pași?', hl: 'Inima lui cere ajutor.' },
];

const fontCss = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
.cta{position:absolute;text-align:center;background:linear-gradient(90deg,#D4A24C,#F7E19C);color:#0B0B0B;font:900 46px/1 A;border-radius:999px;box-shadow:0 14px 30px rgba(0,0,0,.45)}`;

const foto = (a) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${fontCss}
html,body{width:1080px;height:1350px;overflow:hidden;background:#000}
.ph{position:absolute;inset:0;width:1080px;height:1350px;object-fit:cover}
.cap{position:absolute;left:70px;right:70px;top:80px;text-align:center}
.cap span{background:#fff;color:#111;font:700 50px/1.5 I;padding:6px 18px;border-radius:12px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.cap i{display:inline-block;margin-top:18px;background:#D7262E;color:#fff;font:700 50px/1.25 I;font-style:normal;padding:10px 22px;border-radius:12px}
.foot{position:absolute;left:0;right:0;bottom:0;height:260px;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.75))}
.cta{left:0;right:0;margin:auto;bottom:60px;width:520px;font-size:42px;padding:24px}
</style></head><body>
<img class="ph" src="${U}${a.img}">
<div class="cap"><span>${a.hook}</span><br><i>${a.hl}</i></div>
<div class="foot"></div><div class="cta">Comandă acum</div>
</body></html>`;

const fundal = (a, g) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${fontCss}
html,body{width:1080px;height:1350px;overflow:hidden;color:#fff;
 background:radial-gradient(circle at 50% 66%,${g[0]} 0%,rgba(0,0,0,0) 40%),radial-gradient(circle at 50% 30%,${g[1]} 0%,${g[2]} 80%)}
.head{position:absolute;left:70px;right:70px;top:90px;text-align:center}
.hook{font:900 78px/1.08 A;letter-spacing:-2px}
.hl{display:inline-block;margin-top:34px;background:#D7262E;font:900 58px/1.1 A;letter-spacing:-1px;padding:16px 34px 20px;transform:rotate(-2deg);box-shadow:0 14px 30px rgba(0,0,0,.4)}
.prod{position:absolute;left:0;right:0;margin:auto;bottom:250px;height:560px;transform:rotate(-5deg);filter:drop-shadow(0 40px 40px rgba(0,0,0,.6))}
.chips{position:absolute;left:0;right:0;bottom:180px;display:flex;justify-content:center;gap:14px}
.chips span{border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.08);font:700 27px/1 I;padding:14px 22px;border-radius:999px}
.cta{left:90px;right:90px;bottom:60px;padding:28px}
</style></head><body>
<div class="head"><div class="hook">${a.hook}</div><div class="hl">${a.hl}</div></div>
<img class="prod" src="../pret-pe-zi/img/cardio.png">
<div class="chips"><span>Inimă</span><span>Vase de sânge</span><span>Circulație</span></div>
<div class="cta">Comandă acum</div>
</body></html>`;

const sq = `html,body{height:1080px}.head{top:50px}.hook{font-size:64px}.hl{font-size:46px;margin-top:22px;padding:12px 26px 16px}
.prod{bottom:200px;height:400px}.chips{bottom:135px}.chips span{font-size:23px;padding:11px 18px}.cta{bottom:36px;font-size:40px;padding:22px}`;

(async () => {
  for (const d of ['foto', 'fundal']) fs.mkdirSync(path.join(D, 'png', d), { recursive: true });
  const b = await chromium.launch();
  const shot = async (h, name, out, opts) => {
    const p = await b.newPage({ viewport: { width: 1080, height: opts.h } });
    const f = path.join(D, '_' + name + '.html'); fs.writeFileSync(f, h);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(D, 'png', out), ...(opts.jpg ? { type: 'jpeg', quality: 92 } : {}) });
    fs.unlinkSync(f); await p.close(); console.log('ok', out);
  };
  for (const a of ads) {
    await shot(foto(a), 'f-' + a.id, `foto/cardio-foto-${a.id}-4x5.jpg`, { h: 1350, jpg: true });
    await shot(fundal(a, BG[a.bg]), 'b-' + a.id, `fundal/cardio-${a.id}-4x5.png`, { h: 1350 });
    await shot(fundal(a, BG[a.bg]).replace('</style>', sq + '</style>'), 's-' + a.id, `fundal/cardio-${a.id}-1x1.png`, { h: 1080 });
  }
  await b.close();
})();
