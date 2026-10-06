// Ceai HEPATO NOVA DETOX (Novensa) – 10 static ads, 1080x1080, cu cutia reală.
// Render: node render.js [id-filter]   ·   Contact sheet: node sheet.js
// Prețul nu apare pe imagini până nu e setat mai jos (ex. PRICE = '49,99 lei').
const PRICE = null, OLD_PRICE = null;

const FONTS = `
@font-face{font-family:Archivo;font-weight:800;src:url(../../fonts/Archivo-800.ttf)}
@font-face{font-family:Archivo;font-weight:900;src:url(../../fonts/Archivo-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:800;src:url(../../fonts/Fraunces-800i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
`;

// paleta luată de pe cutie: crem, verde închis, verde frunză, portocaliu gălbenele
const C = {
  cream: '#F6F1E4', paper: '#FBF8F0', sage: '#DCE6C8', leaf: '#7FA83A', forest: '#24481B', forest2: '#33612A',
  orange: '#E26A21', honey: '#F2B33D', ink: '#1A1A14', blush: '#F6DDD0', night: '#1B2430', grey: '#D9D5CC',
};

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.abs{position:absolute}
.h{font-family:Archivo;font-weight:900;letter-spacing:-2px;line-height:.98}
.it{font-family:Fraunces;font-style:italic;font-weight:800;letter-spacing:-.5px}
.hand{font-family:Caveat;font-weight:700}
.prod{position:absolute;filter:drop-shadow(0 34px 30px rgba(0,0,0,.30)) drop-shadow(0 8px 10px rgba(0,0,0,.22))}
.pill{display:inline-flex;align-items:center;gap:12px;padding:14px 24px;border-radius:999px;font:700 26px Inter;white-space:nowrap}
.chk{display:flex;align-items:flex-start;gap:18px;font:600 31px/1.22 Inter}
.chk i{flex:none;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 26px Inter;font-style:normal;margin-top:-2px}
.burst{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
.foot{position:absolute;left:0;right:0;bottom:0;height:64px;display:flex;align-items:center;justify-content:center;gap:30px;font:600 21px Inter;letter-spacing:.3px}
.foot span:before{content:"✓ ";font-weight:800}
.disc{position:absolute;right:28px;bottom:74px;font:400 15px Inter;opacity:.65;text-align:right}
`;

const BOX = '../box-cutout.png', LOGO = '../../logo-novensa.png'; // cutie 1086x1732
const box = (h, x, y, rot = 0) => `<img class="prod" src="${BOX}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
const logo = (x, y, h = 44, extra = '') => `<img class="abs" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px;${extra}">`;
const foot = (bg, fg, items = ['5 plante, 100% naturale', 'Fabricat în România', 'Plata la livrare']) =>
  `<div class="foot" style="background:${bg};color:${fg}">${items.map(t => `<span>${t}</span>`).join('')}</div>`;
const disc = (t = 'Supliment alimentar. Nu înlocuiește o dietă echilibrată.', c = C.ink) => `<div class="disc" style="color:${c}">${t}</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;
const priceTag = (bg, fg) => PRICE
  ? `<div style="font:900 68px Archivo;color:${fg}">${PRICE}${OLD_PRICE ? ` <s style="font:600 34px Inter;opacity:.6">${OLD_PRICE}</s>` : ''}</div>`
  : `<div class="pill" style="background:${bg};color:${fg};font-size:30px">Comandă acum · plătești la livrare</div>`;

const ads = [];

// 1. Pofta de dulce – femei 28–50, birou. Obiceiul de la ora 16 înlocuit cu o cană caldă.
ads.push({ id: 'H01-pofta-de-dulce', html: page(`body{background:${C.blush}}
  .clock{position:absolute;left:64px;top:150px;font:900 150px/1 Archivo;color:${C.orange};letter-spacing:-6px}
  .crossed{position:absolute;left:600px;top:110px;width:400px;height:300px}`,
  `${logo(64, 60)}
  <div class="clock">16:00</div>
  <div class="abs h" style="left:64px;top:320px;width:560px;font-size:70px;color:${C.forest}">Ora la care<br>ciocolata <span class="it" style="color:${C.orange}">câștigă</span><br>mereu.</div>
  <div class="abs" style="left:64px;top:600px;width:520px;font:600 32px/1.3 Inter;color:${C.ink}">Schimbă desertul de după-amiază cu un ritual cald, din 5 plante: <b>anghinare, armurariu, păpădie, gălbenele, sunătoare.</b></div>
  <div class="abs hand" style="left:64px;top:810px;font-size:52px;color:${C.forest};transform:rotate(-3deg)">o cană azi, alta mâine →</div>
  ${box(700, 650, 240, 4)}
  <div class="burst" style="width:190px;height:190px;left:860px;top:110px;background:${C.honey};font:900 26px/1.05 Archivo;color:${C.forest}">0 ZAHĂR<br>0 CALORII*</div>
  ${disc('*Ceaiul neîndulcit. Supliment alimentar. Rezultatele pot varia.')}${foot(C.forest, '#fff')}`) });

// 2. Balonare – femei + bărbați 30–60. Contrast "burtă de după masă".
ads.push({ id: 'H02-balonare', html: page(`body{background:${C.cream}}
  .l{position:absolute;left:0;top:0;width:540px;height:1016px;background:${C.grey}}
  .r{position:absolute;left:540px;top:0;width:540px;height:1016px;background:${C.sage}}
  .lab{position:absolute;top:60px;font:900 30px Archivo;letter-spacing:4px;text-transform:uppercase}
  .lst{position:absolute;top:150px;display:flex;flex-direction:column;gap:24px;width:420px}
  .x{display:flex;gap:16px;font:600 30px/1.2 Inter;color:#55524c}.x b{color:#B3261E;font:900 30px Inter}
  .v{display:flex;gap:16px;font:600 30px/1.2 Inter;color:${C.forest}}.v b{color:${C.leaf};font:900 30px Inter}`,
  `<div class="l"></div><div class="r"></div>
  <div class="lab" style="left:60px;color:#6b6760">După masă</div>
  <div class="lab" style="left:600px;color:${C.forest}">+ o cană de ceai</div>
  <div class="lst" style="left:60px"><div class="x"><b>✕</b>Burta „umflată”</div><div class="x"><b>✕</b>Nasturele de la blugi</div><div class="x"><b>✕</b>Greutate, lene</div><div class="x"><b>✕</b>Somn greu după prânz</div></div>
  <div class="lst" style="left:600px"><div class="v"><b>✓</b>Anghinarea susține digestia</div><div class="v"><b>✓</b>Păpădia ajută eliminarea</div><div class="v"><b>✓</b>Senzație de ușurare*</div><div class="v"><b>✓</b>Ritual cald, fără zahăr</div></div>
  ${box(520, 378, 470)}
  <div class="abs" style="left:60px;top:930px;font:400 16px Inter;color:#6b6760;width:300px">*Experiențe raportate de clienți. Supliment alimentar. Rezultatele pot varia.</div>
  ${logo(760, 940, 40)}
  ${foot(C.forest, '#fff')}`) });

// 3. Oboseala de după-amiază – angajați 30–55. Ficatul lucrează non-stop.
ads.push({ id: 'H03-oboseala', html: page(`body{background:${C.night};color:#fff}
  .glow{position:absolute;right:-160px;top:180px;width:820px;height:820px;border-radius:50%;background:radial-gradient(circle,rgba(242,179,61,.38),rgba(242,179,61,0) 65%)}`,
  `<div class="glow"></div>${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="abs h" style="left:64px;top:160px;width:600px;font-size:84px">Ora 15.<br>Ochii se<br>închid <span class="it" style="color:${C.honey}">singuri.</span></div>
  <div class="abs" style="left:64px;top:520px;width:520px;font:600 32px/1.32 Inter;color:#E8E4DA">Ficatul are peste 500 de sarcini și nu ia nicio pauză. Dă-i și tu una: <b style="color:${C.honey}">o cană de Hepato Nova</b>, între mese.</div>
  <div class="abs" style="left:64px;top:770px;display:flex;flex-direction:column;gap:14px">
    <div class="pill" style="background:${C.honey};color:${C.night}">✓ Susține funcția hepatică</div>
    <div class="pill" style="background:rgba(255,255,255,.12);color:#fff">✓ Fără cofeină · 1–2 căni pe zi</div></div>
  ${box(700, 640, 190, 3)}
  ${disc('Supliment alimentar. Rezultatele pot varia.', '#fff')}${foot(C.honey, C.night)}`) });

// 4. Ficat gras – statistică, public larg 35–65. Fără "ai ficatul gras?" (atribut personal).
ads.push({ id: 'H04-1-din-3', html: page(`body{background:${C.paper}}
  .stat{position:absolute;left:64px;top:140px;font:900 210px/0.9 Archivo;color:${C.orange};letter-spacing:-8px}
  .dots{position:absolute;left:70px;top:610px;display:flex;gap:22px}
  .dots div{width:120px;height:120px;border-radius:50%;background:${C.grey};display:flex;align-items:center;justify-content:center;font:800 54px Inter;color:#fff}
  .dots div.on{background:${C.orange}}`,
  `${logo(64, 60)}
  <div class="stat">1 din 3</div>
  <div class="abs h" style="left:64px;top:360px;width:640px;font-size:58px;color:${C.forest}">români are<br><span class="it" style="color:${C.orange}">ficatul gras.</span><br>Cei mai mulți nu știu.</div>
  <div class="dots"><div class="on">!</div><div></div><div></div></div>
  <div class="abs" style="left:64px;top:790px;width:560px;font:600 28px/1.3 Inter">Ficatul nu doare. Te anunță prin <b>oboseală, balonare, poftă de dulce.</b> Ascultă-l din timp.</div>
  ${box(600, 720, 300, 3)}
  <div class="abs" style="left:64px;top:910px;font:400 15px Inter;color:#6b6760">Sursa: studii citate de Euronews România (2023). Supliment alimentar, nu tratament.<br>Pentru diagnostic, consultă medicul.</div>
  ${foot(C.forest, '#fff')}`) });

// 5. După sărbători / grătar – bărbați + femei 35–65, sezonier (noiembrie–ianuarie, luni dimineață).
ads.push({ id: 'H05-dupa-gratar', html: page(`body{background:${C.forest};color:#fff}
  .list{position:absolute;left:64px;top:170px;font:700 46px/1.35 Inter;color:#cfd9c4}
  .list s{text-decoration-thickness:5px;text-decoration-color:${C.orange}}`,
  `${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="list"><s>Sarmale</s> ✓<br><s>Mici și grătar</s> ✓<br><s>Cozonac</s> ✓<br><s>Vin fiert</s> ✓</div>
  <div class="abs h" style="left:64px;top:520px;width:600px;font-size:68px">Acum e rândul<br><span class="it" style="color:${C.honey}">ficatului.</span></div>
  <div class="abs" style="left:64px;top:730px;width:540px;font:600 30px/1.32 Inter;color:#E6EEDC">Armurariu + anghinare + păpădie. O cană dimineața, una seara, timp de 30 de zile.</div>
  ${box(680, 680, 200, -3)}
  <div class="burst" style="width:200px;height:200px;left:850px;top:70px;background:${C.orange};font:900 28px/1.05 Archivo;color:#fff">CURĂ<br>30 ZILE</div>
  ${disc('Supliment alimentar. Rezultatele pot varia.', '#fff')}${foot(C.honey, C.forest)}`) });

// 6. Femeia 40+ – toate simptomele într-un loc. Femei 38–58.
ads.push({ id: 'H06-dupa-40', html: page(`body{background:${C.sage}}
  .card{position:absolute;left:56px;top:56px;width:610px;height:890px;background:#fff;border-radius:36px;padding:52px 50px}
  .chk i{background:${C.orange};color:#fff}`,
  `<div class="card">${logo(50, 46, 40)}
   <div class="h" style="font-size:64px;color:${C.forest};margin-top:78px">După 40, corpul<br><span class="it" style="color:${C.orange}">nu mai iartă</span><br>ca la 20.</div>
   <div style="display:flex;flex-direction:column;gap:24px;margin-top:40px">
    <div class="chk"><i>!</i>Balonare după orice masă</div>
    <div class="chk"><i>!</i>Pofte de dulce seara</div>
    <div class="chk"><i>!</i>Oboseală fără motiv</div>
    <div class="chk"><i>!</i>Kilograme care nu mai pleacă</div></div>
   <div style="margin-top:36px;font:700 34px Inter;color:${C.forest}">Începe cu <span class="it" style="color:${C.leaf};font-size:40px">ficatul.</span></div></div>
  ${box(760, 650, 150, 3)}
  ${disc('Supliment alimentar. Nu înlocuiește dieta și mișcarea.')}${foot(C.forest, '#fff')}`) });

// 7. Bărbați 40–65 – burta, berea, grătarul. Ton direct, umor.
ads.push({ id: 'H07-barbati', html: page(`body{background:${C.honey}}
  .stripe{position:absolute;left:0;right:0;top:0;height:420px;background:${C.forest}}`,
  `<div class="stripe"></div>${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="abs h" style="left:64px;top:150px;width:950px;font-size:84px;color:#fff">Burta de la 45 de ani<br><span class="it" style="color:${C.honey}">nu e doar de la bere.</span></div>
  <div class="abs" style="left:64px;top:480px;width:540px;font:700 34px/1.3 Inter;color:${C.forest}">E și ficatul care cere o pauză după ani de grătare, mâncare grea și stres.</div>
  <div class="abs" style="left:64px;top:690px;display:flex;flex-direction:column;gap:14px">
    <div class="pill" style="background:${C.forest};color:#fff">✓ Armurariu: plantă clasică pentru ficat</div>
    <div class="pill" style="background:#fff;color:${C.forest}">✓ 2 căni pe zi, fără pastile</div></div>
  ${box(600, 680, 360, 4)}
  ${disc('Supliment alimentar. Rezultatele pot varia.')}${foot(C.forest, '#fff')}`) });

// 8. Ingredientele – scepticii, 45–70, rural/orașe mici. 5 plante x 20%.
const ING = [['Anghinare', 'frunze · 20%', 70, 260], ['Armurariu', 'fructe · 20%', 70, 470], ['Păpădie', 'părți aeriene · 20%', 70, 680],
  ['Gălbenele', 'flori · 20%', 800, 360], ['Sunătoare', 'părți aeriene · 20%', 800, 600]];
ads.push({ id: 'H08-5-plante', html: page(`body{background:${C.cream}}
  .ing{position:absolute;width:240px}.ing b{display:block;font:900 40px Archivo;color:${C.forest};letter-spacing:-1px}
  .ing span{font:600 22px Inter;color:${C.orange}}
  .ing:before{content:"";display:block;width:56px;height:6px;background:${C.leaf};border-radius:3px;margin-bottom:14px}`,
  `${logo(64, 56)}
  <div class="abs h" style="left:0;right:0;top:120px;text-align:center;font-size:62px;color:${C.forest}">5 plante. <span class="it" style="color:${C.orange}">Zero</span> chimicale.</div>
  ${ING.map(([n, d, x, y]) => `<div class="ing" style="left:${x}px;top:${y}px"><b>${n}</b><span>${d}</span></div>`).join('')}
  ${box(690, 335, 230)}
  <div class="abs" style="left:70px;top:880px;width:240px;font:600 22px/1.3 Inter;color:#4a4a40">Fără arome artificiale<br>Fără coloranți</div>
  ${disc()}${foot(C.forest, '#fff')}`) });

// 9. Ritual – "a treia cafea" înlocuită. Femei 25–45, birou, wellness.
ads.push({ id: 'H09-a-treia-cafea', html: page(`body{background:${C.paper}}
  .cups{position:absolute;left:64px;top:430px;display:flex;gap:26px;align-items:flex-end}
  .cup{width:130px;height:150px;border-radius:0 0 50px 50px;display:flex;align-items:center;justify-content:center;font:800 26px Inter;color:#fff;position:relative}
  .cup:after{content:"";position:absolute;right:-30px;top:30px;width:34px;height:60px;border:10px solid currentColor;border-left:none;border-radius:0 30px 30px 0}`,
  `${logo(64, 60)}
  <div class="abs h" style="left:64px;top:150px;width:620px;font-size:76px;color:${C.forest}">Nu-ți trebuie<br>a treia <span class="it" style="color:${C.orange}">cafea.</span></div>
  <div class="cups">
    <div class="cup" style="background:#6B4A33;color:#6B4A33"><span style="color:#fff">1</span></div>
    <div class="cup" style="background:#6B4A33;color:#6B4A33"><span style="color:#fff">2</span></div>
    <div class="cup" style="background:${C.honey};color:${C.honey};outline:6px dashed ${C.orange};outline-offset:10px"><span style="color:${C.forest}">3</span></div></div>
  <div class="abs" style="left:64px;top:650px;width:560px;font:600 31px/1.32 Inter">Pune o cană de <b>Hepato Nova</b> în locul ei: fără cofeină, fără zahăr, cu 5 plante pentru ficat și digestie.</div>
  <div class="abs hand" style="left:64px;top:830px;font-size:44px;color:${C.orange};transform:rotate(-2deg)">1 plic · 200 ml apă · 5 minute</div>
  ${box(680, 660, 210, 3)}
  ${disc()}${foot(C.forest, '#fff')}`) });

// 10. Ofertă – retargeting. Cura recomandată pe cutie: 3 luni → 3 cutii.
ads.push({ id: 'H10-oferta-cura', html: page(`body{background:${C.forest};color:#fff}
  .bg{position:absolute;right:-200px;bottom:-160px;width:900px;height:900px;border-radius:50%;background:${C.forest2}}`,
  `<div class="bg"></div>${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="abs" style="left:64px;top:150px;font:800 28px Inter;letter-spacing:4px;color:${C.honey}">CURA COMPLETĂ RECOMANDATĂ</div>
  <div class="abs h" style="left:64px;top:200px;width:560px;font-size:80px">3 cutii.<br><span class="it" style="color:${C.honey}">3 luni.</span><br>Un ficat odihnit.</div>
  <div class="abs" style="left:64px;top:590px;display:flex;flex-direction:column;gap:20px">
    <div class="chk"><i style="background:${C.honey};color:${C.forest}">✓</i>30 de plicuri / cutie</div>
    <div class="chk"><i style="background:${C.honey};color:${C.forest}">✓</i>Plătești doar la livrare</div>
    <div class="chk"><i style="background:${C.honey};color:${C.forest}">✓</i>Fabricat în România</div></div>
  <div class="abs" style="left:64px;top:820px">${priceTag(C.orange, '#fff')}</div>
  ${box(500, 540, 330, -8)}${box(540, 630, 290, 0)}${box(580, 730, 250, 7)}
  ${disc('Supliment alimentar. Rezultatele pot varia.', '#fff')}${foot(C.honey, C.forest, ['Livrare rapidă', 'Plata la livrare', 'Stoc limitat'])}`) });

module.exports = ads;
module.exports.lib = { C, box, logo, foot, disc, page, priceTag, PRICE, OLD_PRICE };
