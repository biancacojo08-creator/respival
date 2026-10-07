// PowerMan spray oral (Novensa): 10 statics, 1080x1350.
// Image text avoids explicit sexual words on purpose (Meta policy), see STRATEGIE.md.
// Render: node render.js [id-filter]
const FONTS = `
@font-face{font-family:Archivo;font-weight:800;src:url(../../fonts/Archivo-800.ttf)}
@font-face{font-family:Archivo;font-weight:900;src:url(../../fonts/Archivo-900.ttf)}
@font-face{font-family:Barlow;font-weight:700;src:url(../../fonts/BarlowCondensed-700.ttf)}
@font-face{font-family:Barlow;font-weight:800;src:url(../../fonts/BarlowCondensed-800.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:800;src:url(../../fonts/Fraunces-800i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
`;

const C = {
  black: '#0B0B0D', char: '#17171B', steel: '#2A2A31', red: '#D0102B', wine: '#5E0915',
  gold: '#D4A24C', cream: '#F2EDE4', grey: '#9A9AA3', green: '#3FB34F',
};

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:#fff;background:${C.black}}
.abs{position:absolute}
.h{font-family:Barlow;font-weight:800;text-transform:uppercase;letter-spacing:-1px;line-height:.92}
.a{font-family:Archivo;font-weight:900;letter-spacing:-1.5px;line-height:1}
.it{font-family:Fraunces;font-style:italic;font-weight:600}
.red{color:${C.red}}.gold{color:${C.gold}}
.bottle{position:absolute;filter:drop-shadow(0 40px 40px rgba(0,0,0,.55)) drop-shadow(0 0 60px rgba(208,16,43,.25))}
.logo{position:absolute;height:44px}
.pill{display:inline-flex;align-items:center;gap:12px;padding:14px 26px;border-radius:999px;font:700 27px Inter;white-space:nowrap}
.foot{position:absolute;left:0;right:0;bottom:0;height:78px;display:flex;align-items:center;justify-content:center;gap:34px;font:700 23px Inter;letter-spacing:.3px}
.foot span:before{content:"✓ ";font-weight:800}
.disc{position:absolute;left:0;right:0;bottom:88px;text-align:center;font:400 16px Inter;opacity:.55}
.burst{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
.tag{position:absolute;padding:10px 22px;border-radius:10px;font:800 36px Barlow;letter-spacing:1px;text-transform:uppercase;white-space:nowrap}
.glow{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(208,16,43,.45),rgba(208,16,43,0) 68%)}
`;

// Real PowerMan box (produs-cutout.png, cut out from produs-original.png). h = rendered height in px.
const bottle = (h, x, y, rot = 0) => `<img class="bottle" src="../produs-cutout.png" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg)">`;

const LOGO = '../../logo-novensa.png';
const logo = (x, y, h = 44, white = true) => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px;${white ? 'filter:brightness(0) invert(1)' : ''}">`;
const foot = (bg = C.red, fg = '#fff', items = ['Colet discret', 'Plata la livrare', 'Fabricat în România']) =>
  `<div class="foot" style="background:${bg};color:${fg}">${items.map(t => `<span>${t}</span>`).join('')}</div>`;
const disc = (t = 'Supliment alimentar. Nu înlocuiește un stil de viață sănătos sau sfatul medicului. Rezultatele pot varia.') => `<div class="disc">${t}</div>`;
const tag = (x = 270, y = 54, bg = C.red, fg = '#fff', t = 'Spray pentru potență și libido') => `<div class="tag" style="left:${x}px;top:${y}px;background:${bg};color:${fg}">${t}</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;

const ads = [];

// 01 – Discreția: arată ca un spray de gură
ads.push({ id: 'PM01-discret', html: page(`body{background:radial-gradient(120% 80% at 70% 45%,#2a0a10 0%,${C.black} 60%)}`,
  `${logo(64, 64)}${tag(270, 58)}
  <div class="abs h" style="left:64px;top:170px;font-size:128px;width:620px">Arată ca un spray de gură.</div>
  <div class="abs it" style="left:68px;top:560px;font-size:64px;color:${C.red};width:560px;line-height:1.08">Doar tu știi ce face.</div>
  <div class="abs" style="left:64px;top:770px;display:flex;flex-direction:column;gap:16px">
    <div class="pill" style="background:${C.steel}">💪 Pentru potență, libido și rezistență</div>
    <div class="pill" style="background:${C.steel}">🛏️ Pe noptieră, fără întrebări</div>
    <div class="pill" style="background:${C.steel}">📦 Ajunge în colet discret</div></div>
  <div class="glow" style="width:760px;height:760px;left:500px;top:260px"></div>
  ${bottle(900, 660, 230, 6)}
  ${disc()}${foot()}`) });

// 02 – Fără pastila albastră: spray vs pastilă
ads.push({ id: 'PM02-fara-pastila', html: page(`
  .l{position:absolute;left:0;top:300px;width:540px;bottom:78px;background:#202024}
  .r{position:absolute;left:540px;top:300px;width:540px;bottom:78px;background:linear-gradient(180deg,${C.wine},#2a0409)}
  .lab{position:absolute;top:340px;font:800 34px Barlow;letter-spacing:3px;text-transform:uppercase}
  .lst{position:absolute;top:420px;display:flex;flex-direction:column;gap:28px;width:440px}
  .x,.v{display:flex;gap:16px;font:600 31px/1.2 Inter}.x{color:#8c8c94}.x b{color:${C.red};font:900 31px Inter}.v b{color:${C.gold};font:900 31px Inter}`,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:64px;top:140px;font-size:104px;white-space:nowrap">Fără pastila <span style="color:#3b7bff">albastră</span>.</div>
  <div class="l"></div><div class="r"></div>
  <div class="lab" style="left:60px;color:#8c8c94">Pastilele clasice</div>
  <div class="lab" style="left:600px;color:${C.gold}">PowerMan spray</div>
  <div class="lst" style="left:60px">
    <div class="x"><b>✕</b>Coadă și întrebări la farmacie</div>
    <div class="x"><b>✕</b>Te uiți la prospect cu frică</div>
    <div class="x"><b>✕</b>Pastilă de înghițit</div>
    <div class="x"><b>✕</b>Substanțe de sinteză</div></div>
  <div class="lst" style="left:600px">
    <div class="v"><b>✓</b>Comanzi online, în 1 minut</div>
    <div class="v"><b>✓</b>Fără rețetă</div>
    <div class="v"><b>✓</b>2–3 pufuri sub limbă</div>
    <div class="v"><b>✓</b>7 extracte din plante</div></div>
  ${bottle(420, 640, 840, 0)}
  <div class="burst" style="width:230px;height:230px;left:200px;top:930px;background:${C.gold};color:${C.black};font:800 40px/0.95 Barlow;text-transform:uppercase">100%<br>plante<br><span style="font-size:26px">fără rețetă</span></div>
  <div class="abs" style="left:0;right:0;bottom:88px;text-align:center;font:400 15px Inter;opacity:.5">Supliment alimentar, nu medicament. Nu înlocuiește tratamentul prescris de medic. Rezultatele pot varia.</div>
  ${foot()}`) });

// 03 – Ea observă (scenă ilustrativă, nu recenzie)
ads.push({ id: 'PM03-ea-observa', html: page(`body{background:linear-gradient(160deg,#3a0610 0%,#14040a 55%,${C.black} 100%)}`,
  `${logo(64, 64)}${tag(270, 58)}
  <div class="abs it" style="left:64px;top:150px;font-size:200px;line-height:1;color:${C.red};opacity:.9">“</div>
  <div class="abs it" style="left:64px;top:290px;width:900px;font-size:76px;line-height:1.1;color:#fff">Nu știu ce s-a schimbat la el luna asta.<br><span style="color:${C.gold}">Dar nu mă plâng.</span></div>
  <div class="abs" style="left:68px;top:700px;font:600 30px Inter;color:#d8c9cc">— Ea, după 3 săptămâni de PowerMan</div>
  <div class="abs" style="left:68px;top:830px;width:520px;font:600 34px/1.3 Inter;color:#fff">Mai mult chef. Mai multă rezistență. <span class="gold">Iar ea observă prima.</span></div>
  <div class="abs" style="left:68px;top:1050px;font:700 30px Inter;color:${C.gold}">Doar 62,99 lei · plătești la curier</div>
  <div class="glow" style="width:640px;height:640px;left:560px;top:620px"></div>
  ${bottle(620, 740, 610, -5)}
  <div class="abs" style="left:68px;top:1170px;font:400 15px Inter;opacity:.5">Scenă ilustrativă. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot()}`) });

// 04 – Conversație WhatsApp între prieteni
const msg = (me, t, time) => `<div style="align-self:${me ? 'flex-end' : 'flex-start'};max-width:720px;background:${me ? '#005C4B' : '#202C33'};color:#E9EDEF;padding:20px 26px 14px;border-radius:${me ? '22px 4px 22px 22px' : '4px 22px 22px 22px'};font:400 33px/1.32 Inter">${t}<div style="text-align:right;font:400 18px Inter;color:#8696A0;margin-top:4px">${time}${me ? ' <span style="color:#53BDEB">✓✓</span>' : ''}</div></div>`;
ads.push({ id: 'PM04-whatsapp', html: page(`body{background:#0B141A}
  .top{position:absolute;left:0;right:0;top:0;height:140px;background:#202C33;display:flex;align-items:center;gap:24px;padding:0 44px}
  .av{width:84px;height:84px;border-radius:50%;background:#6B7C85;display:flex;align-items:center;justify-content:center;font:700 36px Inter}
  .chat{position:absolute;left:40px;right:40px;top:180px;display:flex;flex-direction:column;gap:20px}`,
  `<div class="top"><div style="font:400 44px Inter;color:#AEBAC1">←</div><div class="av">A</div><div><div style="font:600 36px Inter">Andrei 🍺</div><div style="font:400 24px Inter;color:#8696A0">online</div></div>${tag(560, 40)}</div>
  <div class="chat">
    ${msg(0, 'Frate, ce-ai pățit? 😂 Ești alt om de o lună. Și Ioana zâmbește tot timpul', '21:14')}
    ${msg(1, 'Hahaha. Ți-am zis de sprayul ăla românesc pentru potență, cu ginseng roșu', '21:15')}
    ${msg(0, 'Ăla de 63 de lei? Credeam că-i țeapă', '21:15')}
    ${msg(1, 'PowerMan. 2–3 pufuri sub limbă. Vine acasă în colet discret și plătești la curier 🤫', '21:16')}
    ${msg(0, 'Dă-mi linkul. Da\' rămâne între noi 🤐', '21:16')}
  </div>
  ${bottle(360, 820, 905, 8)}
  <div class="abs" style="left:40px;top:1150px;font:700 30px Inter;color:#E9EDEF">Unii prieteni îți dau sfaturi bune. 👇</div>
  <div class="abs" style="left:40px;top:1200px;font:400 15px Inter;color:#8696A0">Conversație ilustrativă. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot(C.red, '#fff', ['Colet discret', 'Plata la livrare', '62,99 lei'])}`) });

// 05 – 7 plante active (infografic)
const plants = [
  ['Ginseng roșu', 'Panax ginseng', '#C2412D', 60, 330], ['Colții-babei', 'Tribulus terrestris', '#B9A04A', 60, 520],
  ['Damiana', 'Turnera diffusa', '#5E9B4A', 60, 710], ['Ginkgo biloba', 'frunze', '#E0B53C', 60, 900],
  ['Guarana', 'Paullinia cupana', '#8E2A1D', 760, 420], ['Poria cocos', 'ciupercă tradițională', '#D8C7A8', 760, 640],
  ['Ardei iute', 'Capsicum (cayenne)', '#E3322B', 760, 860]];
ads.push({ id: 'PM05-7-plante', html: page(`body{background:radial-gradient(90% 60% at 50% 55%,#2a0a10,${C.black} 70%)}
  .ing{position:absolute;display:flex;align-items:center;gap:18px;width:280px}
  .ing .d{width:72px;height:72px;border-radius:50%;flex:none;box-shadow:inset -10px -12px 0 rgba(0,0,0,.25),0 0 0 6px rgba(255,255,255,.07)}
  .ing b{display:block;font:800 30px Barlow;text-transform:uppercase;letter-spacing:.5px}.ing small{font:400 20px Inter;opacity:.7}`,
  `${logo(64, 56)}${tag(270, 50)}
  <div class="abs h" style="left:0;right:0;top:140px;text-align:center;font-size:104px">7 plante. <span class="red">Un singur spray.</span></div>
  ${plants.map(([n, s, c, x, y]) => `<div class="ing" style="left:${x}px;top:${y}px"><span class="d" style="background:${c}"></span><span><b>${n}</b><small>${s}</small></span></div>`).join('')}
  ${bottle(800, 402, 330)}
  <div class="abs" style="left:0;right:0;top:1150px;text-align:center;font:600 28px Inter;color:${C.gold}">Pentru potență, libido și rezistență masculină</div>
  ${disc('Supliment alimentar. Rezultatele pot varia.')}${foot()}`) });

// 06 – Comparativ: mai multe plante, cu 17 lei mai puțin
ads.push({ id: 'PM06-comparativ', html: page(`
  table{position:absolute;left:56px;top:440px;width:968px;border-collapse:separate;border-spacing:0}
  td,th{height:100px;font:600 30px Inter;border-bottom:2px solid #26262c}
  th{font:800 30px Barlow;letter-spacing:1.5px;text-transform:uppercase;height:120px}
  .us{background:${C.red};color:#fff;text-align:center;width:250px}
  .them{text-align:center;width:250px;color:#8c8c94}
  tr:first-child .us{border-radius:26px 26px 0 0}tr:last-child .us{border-radius:0 0 26px 26px}
  .ok{color:#fff;font:900 42px Inter}.no{color:#5a5a62;font:900 38px Inter}.big{font:800 46px Barlow}`,
  `${logo(56, 60)}${tag(262, 54)}
  <div class="abs h" style="left:56px;top:140px;font-size:96px;width:800px">Mai multe plante.<br><span class="gold">Cu 17 lei<br>mai puțin.</span></div>
  ${bottle(330, 860, 40, 6)}
  <table><tr><th></th><th class="us">PowerMan</th><th class="them">Alte spray-uri<br>populare</th></tr>
  <tr><td>Preț / flacon</td><td class="us big">62,99 lei</td><td class="them big">~80 lei</td></tr>
  <tr><td>Plante active</td><td class="us big">7</td><td class="them big">4</td></tr>
  <tr><td>Ginseng roșu + colții-babei</td><td class="us ok">✓</td><td class="them" style="font:900 38px Inter;color:#8c8c94">✓</td></tr>
  <tr><td>Guarana, pentru energie</td><td class="us ok">✓</td><td class="them no">✕</td></tr>
  <tr><td>Ardei iute + Poria cocos</td><td class="us ok">✓</td><td class="them no">✕</td></tr>
  <tr><td>Fabricat în România</td><td class="us ok">✓</td><td class="them" style="font:800 38px Inter">?</td></tr></table>
  <div class="abs" style="left:56px;top:1192px;width:960px;font:400 16px/1.4 Inter;opacity:.55">Comparație cu formulele și prețurile afișate public de spray-uri sublinguale similare, octombrie 2026. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot()}`) });

// 07 – Ritualul: 2–3 pufuri sub limbă
ads.push({ id: 'PM07-ritual', html: page(`body{background:${C.cream};color:${C.black}}
  .step{position:absolute;left:64px;width:600px;display:flex;gap:28px;align-items:flex-start}
  .step .n{flex:none;width:96px;height:96px;border-radius:50%;background:${C.red};color:#fff;display:flex;align-items:center;justify-content:center;font:800 40px Barlow}
  .step b{display:block;font:800 46px Barlow;text-transform:uppercase}.step span{font:400 28px/1.3 Inter;color:#444}
  .line{position:absolute;left:111px;top:470px;width:4px;height:470px;background:#d9cfbf}`,
  `${logo(64, 60, 44, false)}${tag()}
  <div class="abs h" style="left:64px;top:140px;font-size:120px;color:${C.black}">2 pufuri.<br><span class="red">Sub limbă.</span> Atât.</div>
  <div class="line"></div>
  <div class="step" style="top:450px"><div class="n">1</div><div><b>Dimineața</b><span>2–3 pufuri sub limbă, cât îți faci cafeaua</span></div></div>
  <div class="step" style="top:690px"><div class="n">2</div><div><b>Seara</b><span>încă 2–3 pufuri, la fel de simplu</span></div></div>
  <div class="step" style="top:930px"><div class="n">3</div><div><b>3–4 săptămâni</b><span>cura completă, pentru rezultate constante</span></div></div>
  ${bottle(820, 710, 380, 4)}
  <div class="abs" style="left:64px;top:1170px;font:400 15px Inter;color:#666">Supliment alimentar. Nu depășiți doza recomandată. Rezultatele pot varia.</div>
  ${foot(C.black, '#fff')}`) });

// 08 – Tabu: 1 din 2 bărbați peste 40 de ani
ads.push({ id: 'PM08-tabu', html: page(``,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:56px;top:150px;font-size:330px;letter-spacing:-8px;color:${C.red}">1 din 2</div>
  <div class="abs a" style="left:64px;top:470px;width:960px;font-size:62px;line-height:1.08">bărbați trecuți de 40 de ani au probleme de potență.</div>
  <div class="abs it" style="left:64px;top:660px;width:600px;font-size:56px;line-height:1.12;color:${C.gold}">Aproape niciunul nu vorbește despre asta.</div>
  <div class="abs" style="left:64px;top:890px;width:600px;font:600 30px/1.35 Inter;color:#d6d6db">Nu e o rușine. E vârsta, stresul, oboseala. Bărbații care fac ceva în privința asta nu se plâng. <span style="color:#fff">Se pregătesc.</span></div>
  <div class="glow" style="width:620px;height:620px;left:600px;top:620px"></div>
  ${bottle(560, 770, 640, -4)}
  <div class="abs" style="left:64px;top:1150px;width:960px;font:400 15px/1.4 Inter;opacity:.5">Sursa: Massachusetts Male Aging Study (Feldman et al., J Urol 1994), bărbați 40–70 ani. Supliment alimentar, nu tratament. Rezultatele pot varia.</div>
  ${foot()}`) });

// 09 – Oferta
ads.push({ id: 'PM09-oferta', html: page(`body{background:linear-gradient(180deg,${C.red} 0%,#8d0a1d 100%)}
  .chk{display:flex;gap:18px;align-items:center;font:700 34px Inter}
  .chk i{flex:none;width:52px;height:52px;border-radius:50%;background:#fff;color:${C.red};display:flex;align-items:center;justify-content:center;font:900 30px Inter;font-style:normal}`,
  `${logo(64, 60)}${tag(270, 54, C.black)}
  <div class="abs h" style="left:64px;top:150px;font-size:120px">Oferta de azi</div>
  <div class="abs" style="left:64px;top:290px;font:700 52px Barlow;color:#ffc9d1;text-decoration:line-through">99,99 lei</div>
  <div class="abs h" style="left:56px;top:345px;font-size:250px;letter-spacing:-6px;line-height:1">62,99<span style="font-size:90px;letter-spacing:0"> lei</span></div>
  <div class="abs" style="left:64px;top:640px;display:flex;flex-direction:column;gap:26px">
    <div class="chk"><i>✓</i>Plătești doar când primești</div>
    <div class="chk"><i>✓</i>Colet discret, fără detalii pe cutie</div>
    <div class="chk"><i>✓</i>Pentru potență și libido</div>
    <div class="chk"><i>✓</i>Fabricat în România</div></div>
  <div class="burst" style="width:260px;height:260px;left:780px;top:90px;background:${C.gold};color:${C.black};font:800 84px/0.9 Barlow">−37%</div>
  ${bottle(720, 700, 430, 6)}
  <div class="abs" style="left:64px;top:1080px;font:800 44px Barlow;text-transform:uppercase;background:${C.black};padding:18px 36px;border-radius:14px">Comandă acum →</div>
  <div class="abs" style="left:64px;top:1195px;font:400 15px Inter;opacity:.7">Supliment alimentar. Stoc limitat la prețul promoțional. Rezultatele pot varia.</div>
  ${foot(C.black, '#fff')}`) });

// 10 – Bărbații nu se plâng. Se pregătesc.
ads.push({ id: 'PM10-se-pregatesc', html: page(`body{background:${C.black}}
  .stripe{position:absolute;left:-200px;top:540px;width:1600px;height:280px;background:${C.red};transform:rotate(-8deg)}`,
  `<div class="stripe"></div>${logo(64, 60)}${tag()}
  <div class="abs h" style="left:64px;top:120px;font-size:150px;line-height:1.32">Bărbații<br>nu se plâng.</div>
  <div class="abs h" style="left:64px;top:625px;font-size:128px;color:${C.black};white-space:nowrap">Se pregătesc.</div>
  <div class="abs" style="left:64px;top:900px;width:560px;font:600 34px/1.3 Inter">Potență, libido și rezistență, din <span class="gold">7 plante</span>. 2–3 pufuri sub limbă.</div>
  <div class="abs" style="left:64px;top:1060px;font:800 52px Barlow;color:${C.gold}">62,99 LEI <span style="font:700 34px Barlow;color:${C.grey};text-decoration:line-through">99,99</span></div>
  ${bottle(600, 830, 600, 5)}
  ${disc()}${foot()}`) });

// Shared pieces for the 1:1 set (ads-square.js).
ads.lib = { C, bottle, logo, foot, disc, tag, page, msg, plants };
module.exports = ads;
