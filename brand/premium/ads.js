// Premium DTC-style statics (O Positiv-inspired) with the real PROSTA COMPLEX box. 1080x1080.
// Render: node render.js [id-filter]
const FONTS = `
@font-face{font-family:Archivo;font-weight:600;src:url(../../fonts/Archivo-600.ttf)}
@font-face{font-family:Archivo;font-weight:800;src:url(../../fonts/Archivo-800.ttf)}
@font-face{font-family:Archivo;font-weight:900;src:url(../../fonts/Archivo-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:800;src:url(../../fonts/Fraunces-800i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
`;

// palette
const C = {
  cream: '#F4EEE3', sand: '#E9DFCC', sage: '#CFDCC8', forest: '#123A2B', forest2: '#1E5240',
  saffron: '#F2B33D', ink: '#141414', gold: '#C9963F', burgundy: '#5A1F2B', navy: '#13233F', blush: '#F3D9CF',
};

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.abs{position:absolute}
.h{font-family:Archivo;font-weight:900;letter-spacing:-2px;line-height:.98}
.it{font-family:Fraunces;font-style:italic;font-weight:600;letter-spacing:-.5px}
.prod{position:absolute;filter:drop-shadow(0 34px 34px rgba(0,0,0,.35)) drop-shadow(0 8px 10px rgba(0,0,0,.25))}
.logo{position:absolute;height:46px}
.pill{display:inline-flex;align-items:center;gap:12px;padding:14px 24px;border-radius:999px;font:700 26px Inter;white-space:nowrap}
.stars{color:#F2A900;letter-spacing:3px}
.chk{display:flex;align-items:flex-start;gap:18px;font:600 32px/1.22 Inter}
.chk i{flex:none;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font:800 26px Inter;margin-top:-2px}
.burst{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
.foot{position:absolute;left:0;right:0;bottom:0;height:64px;display:flex;align-items:center;justify-content:center;gap:28px;font:600 21px Inter;letter-spacing:.3px}
.foot span:before{content:"✓ ";font-weight:800}
.disc{position:absolute;right:28px;bottom:72px;font:400 15px Inter;opacity:.6}
`;

const PROD = '../../product-cutout.png', LOGO = '../../logo-novensa.png';
const prod = (h, x, y, rot = 0) => `<img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
const logo = (x, y, h = 46, extra = '') => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px;${extra}">`;
const foot = (bg, fg) => `<div class="foot" style="background:${bg};color:${fg}"><span>Ingrediente naturale</span><span>Fabricat în România</span><span>Plata la livrare</span></div>`;
const disc = (t = 'Supliment alimentar. Rezultatele pot varia.', c = C.ink) => `<div class="disc" style="color:${c}">${t}</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;

// ---------------------------------------------------------------- ads
const ads = [];

// 1. Hero – cream
ads.push({ id: 'P01-hero-nopti', html: page(`body{background:${C.cream}}
  .blob{position:absolute;right:-120px;top:120px;width:760px;height:760px;border-radius:50%;background:${C.sage}}`,
  `<div class="blob"></div>${logo(64, 60)}
  <div class="abs h" style="left:64px;top:150px;width:560px;font-size:82px;color:${C.forest}">Nopți liniștite.<br><span class="it" style="font-size:78px;color:${C.gold}">Zile</span> fără grija toaletei.</div>
  <div class="abs" style="left:64px;top:560px;display:flex;flex-direction:column;gap:14px">
    <div class="pill" style="background:${C.forest};color:#fff">✓ Susține funcția urinară</div>
    <div class="pill" style="background:#fff;color:${C.forest}">✓ Contribuie la reducerea disconfortului</div>
    <div class="pill" style="background:#fff;color:${C.forest}">✓ Susține sănătatea prostatei</div></div>
  <div class="abs" style="left:64px;top:840px;font:700 28px Inter;color:${C.forest}"><span class="stars">★★★★★</span> 4,75/5 de la clienți</div>
  ${prod(740, 650, 160, 4)}${disc()}${foot(C.forest, '#fff')}`) });

// 2. Benefits checklist – sage
ads.push({ id: 'P02-beneficii', html: page(`body{background:${C.sage}}
  .card{position:absolute;left:56px;top:56px;width:600px;height:880px;background:#fff;border-radius:36px;padding:56px 50px}
  .chk i{background:${C.forest};color:#fff}`,
  `<div class="card">${logo(50, 48, 40)}
   <div class="h" style="font-size:72px;color:${C.forest};margin-top:80px">Ce face<br><span class="it" style="color:${C.gold}">PROSTA COMPLEX</span><br>pentru tine</div>
   <div style="display:flex;flex-direction:column;gap:30px;margin-top:48px">
    <div class="chk"><i>✓</i>Susține funcția urinară normală</div>
    <div class="chk"><i>✓</i>Contribuie la reducerea disconfortului urinar</div>
    <div class="chk"><i>✓</i>Susține sănătatea prostatei</div>
    <div class="chk"><i>✓</i>Pentru nopți mai liniștite</div></div></div>
  ${prod(780, 640, 130, -3)}
  <div class="burst" style="width:200px;height:200px;left:820px;top:60px;background:${C.saffron};font:900 30px/1 Archivo;color:${C.forest}">100%<br>NATURAL</div>
  ${disc()}${foot(C.forest, '#fff')}`) });

// 3. Before / After – split
ads.push({ id: 'P03-inainte-dupa', html: page(`body{background:#fff}
  .l{position:absolute;left:0;top:0;width:540px;height:1016px;background:#D9D6D0}
  .r{position:absolute;left:540px;top:0;width:540px;height:1016px;background:${C.forest}}
  .lab{position:absolute;top:56px;font:900 34px Archivo;letter-spacing:4px;text-transform:uppercase}
  .lst{position:absolute;top:150px;display:flex;flex-direction:column;gap:26px;width:420px}
  .x{display:flex;gap:16px;font:600 30px/1.2 Inter;color:#55524c}.x b{color:#B3261E;font:900 30px Inter}
  .v{display:flex;gap:16px;font:600 30px/1.2 Inter;color:#fff}.v b{color:${C.saffron};font:900 30px Inter}`,
  `<div class="l"></div><div class="r"></div>
  <div class="lab" style="left:60px;color:#6b6760">Înainte</div>
  <div class="lab" style="left:600px;color:${C.saffron}">Cu PROSTA COMPLEX</div>
  <div class="lst" style="left:60px"><div class="x"><b>✕</b>Treziri repetate noaptea</div><div class="x"><b>✕</b>Drumuri dese la baie</div><div class="x"><b>✕</b>Disconfort și usturime</div><div class="x"><b>✕</b>Planifici ziua după toalete</div></div>
  <div class="lst" style="left:600px"><div class="v"><b>✓</b>Nopți mai liniștite*</div><div class="v"><b>✓</b>Funcție urinară susținută</div><div class="v"><b>✓</b>Contribuie la reducerea disconfortului</div><div class="v"><b>✓</b>Îți trăiești ziua liber</div></div>
  ${prod(560, 372, 440)}
  <div class="abs" style="left:60px;top:940px;font:400 16px Inter;color:#6b6760;width:330px">*Experiențe raportate de clienți. Supliment alimentar. Rezultatele pot varia.</div>
  ${logo(760, 950, 40, 'filter:brightness(0) invert(1)')}
  ${foot(C.saffron, C.forest)}`) });

// 4. Us vs Them – comparison
ads.push({ id: 'P04-noi-vs-ei', html: page(`body{background:${C.cream}}
  table{position:absolute;left:56px;top:300px;width:640px;border-collapse:separate;border-spacing:0}
  td,th{height:96px;font:600 27px Inter;border-bottom:2px solid ${C.sand}}
  th{font:800 24px Archivo;letter-spacing:1px;text-transform:uppercase;height:80px}
  td:first-child{padding-right:10px}
  .us{background:${C.forest};color:#fff;text-align:center;width:170px}
  .them{text-align:center;width:170px;color:#8a857c}
  tr:first-child .us{border-radius:24px 24px 0 0}tr:last-child .us{border-radius:0 0 24px 24px}
  .ok{color:${C.saffron};font:900 40px Inter}.no{color:#B3261E;font:900 36px Inter}`,
  `${logo(56, 56)}
  <div class="abs h" style="left:56px;top:140px;font-size:80px;color:${C.forest}">De ce <span class="it" style="color:${C.gold}">lichid?</span></div>
  <table><tr><th></th><th class="us">PROSTA<br>COMPLEX</th><th class="them">Capsule<br>obișnuite</th></tr>
  <tr><td>Se dizolvă în puțină apă</td><td class="us ok">✓</td><td class="them no">✕</td></tr>
  <tr><td>Fără pastile de înghițit</td><td class="us ok">✓</td><td class="them no">✕</td></tr>
  <tr><td>Serenoa + urzică + dovleac</td><td class="us ok">✓</td><td class="them">?</td></tr>
  <tr><td>Zinc, seleniu, vitamina E</td><td class="us ok">✓</td><td class="them">?</td></tr>
  <tr><td>Fabricat în România</td><td class="us ok">✓</td><td class="them">?</td></tr></table>
  ${prod(700, 720, 210, 3)}${disc()}${foot(C.forest, '#fff')}`) });

// 5. Real review card
ads.push({ id: 'P05-recenzie', html: page(`body{background:${C.blush}}
  .card{position:absolute;left:56px;top:150px;width:640px;background:#fff;border-radius:36px;padding:54px 50px;box-shadow:0 20px 50px rgba(90,31,43,.15)}`,
  `${logo(56, 60)}
  <div class="card"><div class="stars" style="font-size:52px">★★★★★</div>
  <div class="it" style="font-size:52px;line-height:1.16;color:${C.burgundy};margin-top:22px">„Produs bun, natural, fără reacții adverse. După aproximativ o săptămână am simțit diferența.”</div>
  <div style="margin-top:34px;font:700 26px Inter;color:${C.ink}">Client verificat <span style="color:#2E7D32">✔</span></div>
  <div style="font:400 22px Inter;color:#6d6d6d;margin-top:6px">recenzie de pe novensa-romania.ro</div></div>
  <div class="abs" style="left:56px;top:830px;font:800 30px Archivo;color:${C.burgundy}">4,75 / 5 · <span style="font-weight:600">media recenziilor</span></div>
  ${prod(720, 690, 190, 4)}${disc()}${foot(C.burgundy, '#fff')}`) });

// 6. Ingredients – forest premium
const ing = [['Serenoa repens', 'palmier pitic', '#C79A3A', 70, 300], ['Urzică', 'extract', '#5E9B4A', 60, 520], ['Dovleac', 'extract', '#E07B26', 70, 740], ['Zinc', 'mineral', '#A9B6C2', 790, 300], ['Seleniu', 'mineral', '#C8B08A', 800, 520], ['Vitamina E', 'vitamină', '#EBC94C', 790, 740]];
ads.push({ id: 'P06-ingrediente', html: page(`body{background:${C.forest};color:#fff}
  .ing{position:absolute;display:flex;align-items:center;gap:16px;width:250px}
  .ing .d{width:66px;height:66px;border-radius:50%;flex:none;box-shadow:inset -8px -10px 0 rgba(0,0,0,.2),0 0 0 6px rgba(255,255,255,.08)}
  .ing b{display:block;font:800 26px Archivo}.ing small{font:400 20px Inter;opacity:.75}`,
  `${logo(440, 50, 46, 'filter:brightness(0) invert(1)')}
  <div class="abs h" style="left:0;right:0;top:130px;text-align:center;font-size:66px">6 ingrediente. <span class="it" style="color:${C.saffron}">O singură cutie.</span></div>
  ${ing.map(([n, s, c, x, y]) => `<div class="ing" style="left:${x}px;top:${y}px"><span class="d" style="background:${c}"></span><span><b>${n}</b><small>${s}</small></span></div>`).join('')}
  ${prod(700, 345, 250)}${disc('Supliment alimentar.', '#fff')}${foot(C.saffron, C.forest)}`) });

// 7. Ritual / timeline
ads.push({ id: 'P07-ritual', html: page(`body{background:${C.cream}}
  .step{position:absolute;left:56px;width:600px;display:flex;gap:24px;align-items:flex-start}
  .step .n{flex:none;width:86px;height:86px;border-radius:50%;background:${C.forest};color:#fff;display:flex;align-items:center;justify-content:center;font:900 30px Archivo}
  .step b{display:block;font:900 36px Archivo;color:${C.forest};letter-spacing:-.5px}.step span{font:400 26px/1.3 Inter;color:#444}
  .line{position:absolute;left:98px;top:360px;width:4px;height:420px;background:${C.sand}}`,
  `${logo(56, 56)}
  <div class="abs h" style="left:56px;top:140px;font-size:78px;color:${C.forest}">Ritualul de <span class="it" style="color:${C.gold}">1 minut</span></div>
  <div class="line"></div>
  <div class="step" style="top:300px"><div class="n">AM</div><div><b>30 de picături dimineața</b><span>dizolvate în puțină apă, lângă cafea</span></div></div>
  <div class="step" style="top:500px"><div class="n">PM</div><div><b>30 de picături seara</b><span>același gest simplu, înainte de culcare</span></div></div>
  <div class="step" style="top:700px"><div class="n">30</div><div><b>Zile de consecvență</b><span>pentru funcția urinară și confortul tău</span></div></div>
  ${prod(700, 720, 200, -3)}${disc()}${foot(C.forest, '#fff')}`) });

// 8. Stat
ads.push({ id: 'P08-9-din-10', html: page(`body{background:${C.saffron}}`,
  `${logo(56, 56, 46)}
  <div class="abs h" style="left:56px;top:150px;font-size:250px;color:${C.forest};letter-spacing:-10px">9/10</div>
  <div class="abs h" style="left:64px;top:430px;width:560px;font-size:64px;color:${C.forest}">clienți recomandă<br><span class="it" style="color:#fff;font-size:56px;white-space:nowrap">PROSTA COMPLEX*</span></div>
  <div class="abs" style="left:64px;top:650px;width:520px;font:600 28px/1.35 Inter;color:${C.forest}">Susține funcția urinară și contribuie la reducerea disconfortului.</div>
  ${prod(740, 680, 170, 4)}
  <div class="abs" style="left:64px;top:900px;font:400 17px Inter;color:${C.forest};opacity:.75">*90% dintre clienții chestionați de Novensa ar recomanda produsul. Supliment alimentar.</div>
  ${foot(C.forest, '#fff')}`) });

// 9. Bold statement
ads.push({ id: 'P09-baia-nu-conduce', html: page(`body{background:${C.navy};color:#fff}`,
  `${logo(56, 56, 46, 'filter:brightness(0) invert(1)')}
  <div class="abs h" style="left:56px;top:160px;width:640px;font-size:100px">Baia nu ar trebui <span style="white-space:nowrap">să-ți</span> <span class="it" style="color:${C.saffron}">conducă</span> ziua.</div>
  <div class="abs" style="left:60px;top:790px;width:560px;font:600 30px/1.35 Inter;opacity:.9">PROSTA COMPLEX susține funcția urinară, ziua și noaptea.</div>
  ${prod(740, 660, 180, 4)}${disc('Supliment alimentar. Rezultatele pot varia.', '#fff')}${foot(C.saffron, C.navy)}`) });

// 10. For her (gift angle)
ads.push({ id: 'P10-pentru-ea', html: page(`body{background:${C.burgundy};color:#fff}
  .tag{position:absolute;left:56px;top:150px;padding:12px 22px;border-radius:999px;background:rgba(255,255,255,.12);font:700 24px Inter;letter-spacing:1px}`,
  `${logo(56, 56, 46, 'filter:brightness(0) invert(1)')}<div class="tag">PENTRU EA ❤</div>
  <div class="abs h" style="left:56px;top:240px;width:640px;font-size:96px">Cadoul care îți aduce înapoi <span class="it" style="color:${C.saffron}">somnul.</span><br>Și lui.</div>
  <div class="abs" style="left:60px;top:760px;width:560px;font:600 29px/1.35 Inter;opacity:.9">Când el doarme liniștit, dormi și tu. Livrat acasă, plătești la primire.</div>
  ${prod(740, 660, 180, -3)}${disc('Supliment alimentar.', '#fff')}${foot(C.saffron, C.burgundy)}`) });

// 11. Night → morning (typographic before/after)
ads.push({ id: 'P11-0317-0730', html: page(`body{background:linear-gradient(90deg,#0E1630 0 50%,#F7E3BE 50% 100%)}
  .t{position:absolute;top:120px;font:900 150px Archivo;letter-spacing:-4px}
  .c{position:absolute;top:310px;width:440px;font:600 32px/1.3 Inter}`,
  `<div class="abs" style="left:60px;top:56px;font:800 26px Archivo;letter-spacing:4px;color:#8FA0C8">ÎNAINTE</div>
  <div class="abs" style="left:600px;top:56px;font:800 26px Archivo;letter-spacing:4px;color:${C.forest}">CU PROSTA COMPLEX</div>
  <div class="t" style="left:56px;color:#FF5A4E;text-shadow:0 0 30px rgba(255,90,78,.5)">03:17</div>
  <div class="t" style="left:596px;color:${C.forest}">07:30</div>
  <div class="c" style="left:60px;color:#C9D3EA">A patra trezire<br>în noaptea asta.</div>
  <div class="c" style="left:600px;color:${C.forest}">Te trezești când<br>sună ceasul.*</div>
  ${prod(600, 335, 400)}
  <div class="abs" style="left:600px;top:940px;font:400 16px Inter;color:${C.forest};width:420px">*Experiențe raportate de clienți. Rezultatele pot varia.</div>
  ${foot(C.forest, '#fff')}`) });

// 12. Offer
ads.push({ id: 'P12-oferta', html: page(`body{background:${C.forest};color:#fff}
  .price{position:absolute;left:56px;top:470px}
  .old{font:800 54px Archivo;color:rgba(255,255,255,.55);text-decoration:line-through}
  .now{font:900 170px Archivo;letter-spacing:-6px;line-height:1;color:#fff}
  .now small{font-size:60px;letter-spacing:0}
  .cta{position:absolute;left:56px;top:790px;background:${C.saffron};color:${C.forest};font:900 38px Archivo;padding:24px 44px;border-radius:999px;text-transform:uppercase}`,
  `${logo(56, 56, 46, 'filter:brightness(0) invert(1)')}
  <div class="abs h" style="left:56px;top:150px;width:620px;font-size:88px">Doar azi: <span class="it" style="color:${C.saffron}">-35%</span> la PROSTA COMPLEX</div>
  <div class="price"><div class="old">99,99 lei</div><div class="now">64,99<small> lei</small></div></div>
  <div class="cta">Comandă acum →</div>
  <div class="burst" style="width:230px;height:230px;left:810px;top:60px;background:${C.saffron};font:900 64px/0.9 Archivo;color:${C.forest}">-35%</div>
  ${prod(720, 640, 230, 4)}${disc('Supliment alimentar.', '#fff')}${foot(C.saffron, C.forest)}`) });

module.exports = ads;
