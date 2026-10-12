// Email Black Friday Novensa: imagine lungă de 600 px lățime (randată la 2x = 1200 px), fără prețuri și fără date.
// Render: node email.js  →  email/black-friday-email.jpg (întreg) + email/bucati/01..NN.jpg (tăiat pentru lipit)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const products = require('../products.js');

const BLK = '#0B0B0B', BLK2 = '#181512', GOLD = '#D4A24C', GOLDL = '#F7E19C', GOLDD = '#8F5F1F', RED = '#D7262E', CREAM = '#F4EEE3', GREY = '#cfc6b6';
const GRAD = `linear-gradient(180deg,${GOLDL} 0%,#E6BD68 45%,${GOLD} 70%,${GOLDD} 100%)`;
const LINES = {
  prosta: 'Complex lichid pentru prostată', respival: 'Spray oral cu plante pentru gât',
  cardio: 'Capsule cu usturoi, păducel și vâsc', diabexum: 'Susține nivelul normal al glicemiei',
  powerman: 'Spray oral pentru vitalitate', hepato: 'Ceai cu 5 plante pentru ficat', novokids: 'Sirop pentru seri liniștite la copii',
};
const ORDER = ['prosta', 'respival', 'cardio', 'diabexum', 'hepato', 'novokids', 'powerman'];
const P = ORDER.map(k => products.find(p => p.key === k)).filter(Boolean);

const ticket = `<div class="ticket"><div class="tt">Tichet răzuibil</div><div class="area"><b>CÂȘTIGĂTOR</b><div class="silver"></div><div class="coin"></div></div></div>`;
const truck = `<svg width="54" height="34" viewBox="0 0 64 40"><rect x="2" y="4" width="38" height="25" rx="3" fill="${GOLD}"/><path d="M42 12h11l9 10v7H42z" fill="${GOLD}"/><circle cx="14" cy="32" r="6" fill="${GOLD}" stroke="${BLK2}" stroke-width="3"/><circle cx="51" cy="32" r="6" fill="${GOLD}" stroke="${BLK2}" stroke-width="3"/></svg>`;
const tick = `<svg width="54" height="34" viewBox="0 0 80 50"><path d="M4 4h72v14a7 7 0 0 0 0 14v14H4V32a7 7 0 0 0 0-14z" fill="${GOLD}"/><rect x="14" y="13" width="44" height="24" rx="4" fill="#c9c9c9"/><text x="36" y="31" font-family="Archivo" font-weight="900" font-size="14" fill="${BLK}" text-anchor="middle">★</text></svg>`;
const cash = `<svg width="54" height="34" viewBox="0 0 64 40"><rect x="4" y="6" width="56" height="30" rx="5" fill="${GOLD}"/><circle cx="32" cy="21" r="8" fill="${BLK2}"/><text x="32" y="25.5" font-family="Archivo" font-weight="900" font-size="12" fill="${GOLD}" text-anchor="middle">lei</text></svg>`;

const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;font-weight:900;src:url(../../fonts/Archivo-900.ttf)}
@font-face{font-family:Archivo;font-weight:800;src:url(../../fonts/Archivo-800.ttf)}
@font-face{font-family:Merri;font-weight:900;src:url(../../fonts/Merriweather-900.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
*{box-sizing:border-box;margin:0;padding:0}
body{width:600px;background:${BLK};color:#fff;font-family:Inter,sans-serif}
.sec{position:relative;padding:40px 36px;overflow:hidden}
.gold{background:${GRAD};-webkit-background-clip:text;background-clip:text;color:transparent}
.big{font-family:Archivo;font-weight:900;text-transform:uppercase;letter-spacing:-2px;line-height:.92}
.serif{font-family:Merri;font-weight:900;letter-spacing:-.5px;line-height:1.1}
.glow{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(212,162,76,.32) 0%,rgba(212,162,76,0) 68%)}
.btn{display:inline-block;padding:18px 34px;border-radius:999px;font:900 22px Archivo;text-transform:uppercase;letter-spacing:.5px;background:${GRAD};color:${BLK};box-shadow:0 6px 0 ${GOLDD}}
.tag{display:inline-block;padding:8px 18px;border-radius:999px;font:900 16px Archivo;letter-spacing:1.5px;text-transform:uppercase}
.logo{height:34px;filter:brightness(0) invert(1)}
.hr{height:2px;background:linear-gradient(90deg,transparent,${GOLDD},transparent);margin:0 36px}
.why{display:flex;flex-direction:column;gap:18px}
.why div{display:flex;align-items:center;gap:18px;background:${BLK2};border:2px solid #3a3226;border-radius:18px;padding:16px 20px}
.why b{display:block;font:900 21px Archivo;text-transform:uppercase}.why span{font:600 16px Inter;color:${GREY}}
.packs{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:22px}
.pk{border-radius:16px;background:${BLK2};border:2px solid #3a3226;text-align:center;padding:14px 4px 16px}
.pk .n{font:900 62px/1 Archivo;letter-spacing:-2px}.pk .u{font:800 13px Archivo;text-transform:uppercase;color:${GREY};margin-top:2px}
.pk .l{font:900 13px/1.2 Archivo;text-transform:uppercase;color:${GOLDL};margin-top:10px}
.pk.best{background:${GRAD};border:none}.pk.best .n,.pk.best .u,.pk.best .l{color:${BLK}}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px}
.card{background:${BLK2};border:2px solid #3a3226;border-radius:20px;padding:18px 16px 20px;text-align:center}
.card .im{height:200px;display:flex;align-items:flex-end;justify-content:center;background:radial-gradient(circle at 50% 70%,rgba(212,162,76,.28),rgba(212,162,76,0) 65%)}
.card img{max-height:190px;max-width:200px;filter:drop-shadow(0 14px 14px rgba(0,0,0,.6))}
.card h3{font:900 19px Archivo;letter-spacing:.5px;text-transform:uppercase;margin-top:14px;color:${GOLDL}}
.card p{font:600 15px/1.3 Inter;color:${GREY};margin-top:6px;min-height:40px}
.card .b{display:inline-block;margin-top:12px;padding:10px 20px;border-radius:999px;background:${GRAD};color:${BLK};font:900 14px Archivo;text-transform:uppercase}
.card.wide{grid-column:1 / span 2;display:flex;align-items:center;gap:20px;text-align:left}
.card.wide .im{width:200px;flex:none}
.ticket{position:relative;width:420px;height:220px;margin:26px auto 0;border-radius:22px;background:${GRAD};color:${BLK};transform:rotate(-4deg);box-shadow:0 24px 44px rgba(0,0,0,.6)}
.ticket:before,.ticket:after{content:"";position:absolute;top:90px;width:40px;height:40px;border-radius:50%;background:${BLK}}
.ticket:before{left:-20px}.ticket:after{right:-20px}
.ticket .tt{position:absolute;left:36px;top:24px;font:900 26px Archivo;letter-spacing:3px;text-transform:uppercase}
.ticket .area{position:absolute;left:36px;top:76px;width:348px;height:110px;border-radius:14px;background:${CREAM};overflow:hidden;display:flex;align-items:center;justify-content:center}
.ticket .area b{font:900 44px Archivo;color:${RED}}
.ticket .silver{position:absolute;inset:0;background:repeating-linear-gradient(135deg,#d9d9d9 0 6px,#bdbdbd 6px 12px);clip-path:polygon(84% 0,100% 0,100% 100%,76% 100%,81% 82%,74% 66%,83% 50%,75% 32%,84% 16%)}
.ticket .coin{position:absolute;left:70%;top:48%;width:54px;height:54px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3c4,${GOLD} 60%,${GOLDD});box-shadow:0 6px 12px rgba(0,0,0,.35)}
.foot{background:${BLK2};border-top:2px solid ${GOLDD};padding:26px 36px 30px;text-align:center;font:600 14px/1.6 Inter;color:#9a8f7e}
.foot b{color:${GOLDL}}
</style></head><body>

<!-- 1. Hero -->
<div class="sec" style="padding-top:34px;padding-bottom:46px">
  <div class="glow" style="width:700px;height:700px;left:120px;top:-180px"></div>
  <div style="position:relative;display:flex;justify-content:space-between;align-items:center">
    <img class="logo" src="../../logo-novensa.png"><span class="tag" style="background:${RED};color:#fff">Doar câteva zile</span></div>
  <div class="big gold" style="position:relative;font-size:118px;margin-top:40px">Black<br>Friday</div>
  <div class="serif" style="position:relative;font-size:34px;margin-top:20px">Reduceri mari la toate produsele <span class="gold">Novensa.</span></div>
  <div style="position:relative;font:600 18px/1.45 Inter;color:${GREY};margin-top:16px;width:470px">Transport gratuit la orice comandă și un tichet răzuibil câștigător în fiecare colet.</div>
  <div style="position:relative;display:flex;justify-content:center;align-items:flex-end;margin-top:30px;height:300px">
    ${['respival', 'prosta', 'cardio'].map((k, i) => { const p = products.find(x => x.key === k); return `<img src="../produse/${p.img}" style="height:${[250, 300, 240][i] * p.k}px;margin:0 ${i === 1 ? -14 : 0}px;position:relative;z-index:${i === 1 ? 2 : 1};transform:rotate(${[-8, 0, 8][i]}deg);filter:drop-shadow(0 20px 20px rgba(0,0,0,.6))">`; }).join('')}
  </div>
  <div style="position:relative;text-align:center;margin-top:30px"><span class="btn">Vezi ofertele →</span></div>
</div>
<div class="hr"></div>

<!-- 2. Ce primești -->
<div class="sec">
  <div class="serif" style="font-size:32px;text-align:center">Ce primești de <span class="gold">Black Friday</span></div>
  <div class="why" style="margin-top:24px">
    <div>${truck}<span><b>Transport gratuit</b><span>la orice comandă, chiar și la o singură bucată</span></span></div>
    <div>${tick}<span><b>Tichet răzuibil cadou</b><span>câte unul la fiecare comandă, toate sunt câștigătoare</span></span></div>
    <div>${cash}<span><b>Plata la livrare</b><span>plătești la curier, când primești coletul</span></span></div>
  </div>
</div>
<div class="hr"></div>

<!-- 3. Pachete -->
<div class="sec">
  <div class="serif" style="font-size:32px;text-align:center">Cu cât iei mai mult, <span class="gold">cu atât economisești</span></div>
  <div class="packs">
    <div class="pk"><div class="n">1</div><div class="u">bucată</div><div class="l">Transport<br>gratuit</div></div>
    <div class="pk"><div class="n">2</div><div class="u">bucăți</div><div class="l">Reducere<br>mare</div></div>
    <div class="pk best"><div class="n">3</div><div class="u">bucăți</div><div class="l">Cea mai<br>aleasă</div></div>
    <div class="pk"><div class="n">5</div><div class="u">bucăți</div><div class="l">Reducere<br>maximă</div></div>
  </div>
  <div style="font:600 15px Inter;color:${GREY};text-align:center;margin-top:16px">Pachetele sunt valabile la toate produsele de mai jos.</div>
</div>
<div class="hr"></div>

<!-- 4. Produse -->
<div class="sec">
  <div class="serif" style="font-size:32px;text-align:center">Produsele <span class="gold">la reducere</span></div>
  <div class="grid">
    ${P.map((p, i) => {
      const last = i === P.length - 1 && P.length % 2 === 1;
      return `<div class="card${last ? ' wide' : ''}"><div class="im"><img src="../produse/${p.img}"></div><div><h3>${p.name}</h3><p>${LINES[p.key] || ''}</p><span class="b">Vezi oferta →</span></div></div>`;
    }).join('')}
  </div>
</div>
<div class="hr"></div>

<!-- 5. Tichet -->
<div class="sec" style="text-align:center;padding-bottom:56px">
  <div class="glow" style="width:620px;height:620px;left:-10px;top:40px"></div>
  <div class="serif" style="position:relative;font-size:32px">În fiecare colet: <span class="gold">un tichet răzuibil.</span></div>
  <div style="position:relative;font:600 18px/1.45 Inter;color:${GREY};margin-top:12px">Îl răzuiești când primești coletul. Toate tichetele sunt câștigătoare.</div>
  <div style="position:relative">${ticket}</div>
</div>
<div class="hr"></div>

<!-- 6. CTA final -->
<div class="sec" style="text-align:center;padding:46px 36px 50px">
  <div class="big" style="font-size:52px">Black Friday ține<br><span class="gold">doar câteva zile</span></div>
  <div style="font:600 18px/1.45 Inter;color:${GREY};margin-top:16px">După aceea, reducerile dispar.</div>
  <div style="margin-top:28px"><span class="btn" style="font-size:24px;padding:20px 40px">Comandă acum →</span></div>
  <div style="font:700 17px Inter;color:${GOLDL};margin-top:22px">novensa-romania.ro</div>
</div>

<div class="foot">
  <b>Transport gratuit · Plata la livrare · Fabricat în România</b><br>
  Produsele Novensa sunt suplimente alimentare și nu înlocuiesc o dietă variată sau tratamentul medical. Rezultatele pot varia.
</div>
</body></html>`;

(async () => {
  const dir = __dirname, out = path.join(dir, 'bucati');
  fs.writeFileSync(path.join(dir, '_email.html'), html);
  fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 600, height: 800 }, deviceScaleFactor: 2 });
  await pg.goto('file://' + path.join(dir, '_email.html'));
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(300);
  await pg.screenshot({ path: path.join(dir, 'black-friday-email.jpg'), fullPage: true, quality: 88, type: 'jpeg' });
  // one slice per section (so each can be linked separately)
  const boxes = await pg.$$eval('body > .sec, body > .foot', els => els.map(e => { const r = e.getBoundingClientRect(); return [r.top, r.height]; }));
  let i = 0;
  for (const [top, h] of boxes) {
    await pg.screenshot({ path: path.join(out, String(++i).padStart(2, '0') + '.jpg'), clip: { x: 0, y: top, width: 600, height: h }, quality: 88, type: 'jpeg', fullPage: true });
  }
  console.log('ok', boxes.length, 'slices');
  await b.close();
})();
