// DIABEXUM FORTE (Novensa) – 10 conversion statics, 1080x1080.
// Offer: 1+1 GRATUIT = 2 flacoane la 99,99 lei, transport gratuit, plata la livrare.
// Render: node render.js [id-filter]   ·   Overview: node sheet.js
const FONTS = `
@font-face{font-family:Archivo;font-weight:800;src:url(../../fonts/Archivo-800.ttf)}
@font-face{font-family:Archivo;font-weight:900;src:url(../../fonts/Archivo-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
`;
const C = { navy: '#0A2D58', blue: '#0F4C92', sky: '#E6F0FA', red: '#E1262D', yel: '#FFD23F', ink: '#0E0E0E', cream: '#F6F1E7', green: '#1E8C45', choc: '#3B2418' };

const PROD = '../packshot-real.png'; // real bottle, background removed
const LOGO = '../../logo-novensa.png';

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.abs{position:absolute}
.big{font-family:Archivo;font-weight:900;letter-spacing:-3px;line-height:.92;text-transform:uppercase}
.h{font-family:Archivo;font-weight:900;letter-spacing:-2px;line-height:.98}
.it{font-family:Fraunces;font-style:italic;font-weight:600;letter-spacing:-.5px;text-transform:none}
.prod{position:absolute;filter:drop-shadow(0 30px 30px rgba(0,0,0,.35)) drop-shadow(0 8px 10px rgba(0,0,0,.25))}
.logo{position:absolute}
.btn{position:absolute;padding:24px 44px;border-radius:999px;font:900 36px Archivo;text-transform:uppercase;letter-spacing:.5px;box-shadow:0 8px 0 rgba(0,0,0,.35);white-space:nowrap}
.tape{position:absolute;left:-40px;right:-40px;height:64px;display:flex;align-items:center;gap:40px;white-space:nowrap;font:900 30px Archivo;letter-spacing:2px;text-transform:uppercase;overflow:hidden}
.burst{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
.chk{display:flex;align-items:flex-start;gap:18px;font:600 32px/1.22 Inter}
.chk i{flex:none;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 26px Inter;font-style:normal;margin-top:-3px}
.foot{position:absolute;left:0;right:0;bottom:0;height:64px;display:flex;align-items:center;justify-content:center;gap:28px;font:600 21px Inter;letter-spacing:.3px}
.foot span:before{content:"✓ ";font-weight:800}
.disc{position:absolute;right:28px;bottom:72px;font:400 15px Inter;opacity:.65}
.strike{position:relative;display:inline-block}.strike:after{content:"";position:absolute;left:-4px;right:-4px;top:52%;height:6px;background:${C.red};transform:rotate(-8deg)}
`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;
const prod = (h, x, y, rot = 0) => `<img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
// two boxes = the 1+1 visual
const duo = (h, x, y) => `<img class="prod" src="${PROD}" style="height:${h * .92}px;left:${x}px;top:${y + h * .08}px;transform:rotate(-7deg)">
  <img class="prod" src="${PROD}" style="height:${h}px;left:${x + h * .42}px;top:${y}px;transform:rotate(5deg)">`;
const logo = (x, y, h = 44, white) => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px;${white ? 'filter:brightness(0) invert(1)' : ''}">`;
const foot = (bg, fg) => `<div class="foot" style="background:${bg};color:${fg}"><span>Transport gratuit</span><span>Plata la livrare</span><span>Livrare rapidă în toată țara</span></div>`;
const disc = (c = C.ink, t = 'Supliment alimentar. Nu înlocuiește tratamentul medical. Rezultatele pot varia.') => `<div class="disc" style="color:${c}">${t}</div>`;
const tape = (top, bg, fg, txt) => `<div class="tape" style="top:${top}px;background:${bg};color:${fg}">${Array(6).fill(`<span>${txt}</span><span>★</span>`).join('')}</div>`;
const plus = (x, y, size, bg, fg) => `<div class="burst" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${bg};color:${fg};font:900 ${size * .24}px/0.95 Archivo;letter-spacing:-1px"><div>1+1<br><span style="font-size:${size * .1}px;letter-spacing:0">GRATUIT</span></div></div>`;

const ads = [];

// D01 – offer hero
ads.push({ id: 'D01-1plus1-hero', html: page(`body{background:${C.red};color:#fff}`,
  `${tape(0, C.yel, C.ink, '1+1 gratuit · Transport gratuit')}
  ${logo(56, 100, 44, true)}
  <div class="abs" style="left:52px;top:170px;font:900 250px/1 Archivo;letter-spacing:-12px">1+1</div>
  <div class="abs big" style="left:58px;top:420px;font-size:70px;color:${C.yel}">Gratuit</div>
  <div class="abs" style="left:60px;top:510px;font:800 34px Archivo">2 flacoane Diabexum Forte</div>
  <div class="abs" style="left:56px;top:565px;font:900 150px/1 Archivo;letter-spacing:-6px">99,99<span style="font-size:54px;letter-spacing:0"> lei</span></div>
  <div class="abs" style="left:60px;top:725px;font:700 32px Inter">Transport <b style="color:${C.yel}">GRATUIT</b></div>
  <div class="btn" style="left:56px;top:800px;background:${C.yel};color:${C.ink}">Comandă acum →</div>
  ${duo(500, 580, 360)}${foot(C.ink, '#fff')}`) });

// D02 – pick the offer (1 vs 1+1)
ads.push({ id: 'D02-alege-oferta', html: page(`body{background:${C.sky}}
  .card{position:absolute;top:250px;height:650px;border-radius:36px;padding:36px;text-align:center}
  .card .t{font:900 34px Archivo;text-transform:uppercase;letter-spacing:1px}
  .card .p{font:900 92px/1 Archivo;letter-spacing:-4px;margin-top:10px}.card .p small{font-size:40px;letter-spacing:0}
  .card .s{font:700 26px Inter;margin-top:10px}`,
  `${logo(56, 56)}
  <div class="abs big" style="left:56px;top:130px;font-size:78px;color:${C.navy}">Alege-ți <span style="color:${C.red}">oferta</span></div>
  <div class="card" style="left:56px;width:400px;background:#fff;border:3px solid #d5dde8">
    <div class="t" style="color:#7a8699">1 flacon</div>
    <img src="${PROD}" style="height:310px;margin:26px 0 8px;filter:drop-shadow(0 18px 18px rgba(0,0,0,.3))">
    <div class="p" style="color:${C.ink}">99,99<small> lei</small></div><div class="s" style="color:#7a8699">un singur flacon</div></div>
  <div class="card" style="left:480px;width:544px;background:${C.navy};color:#fff;box-shadow:0 0 0 8px ${C.yel}">
    <div class="t" style="color:${C.yel}">2 flacoane · 1+1 gratuit</div>
    <div style="position:relative;height:340px">
      <img src="${PROD}" style="position:absolute;height:290px;top:40px;left:90px;transform:rotate(-7deg);filter:drop-shadow(0 14px 14px rgba(0,0,0,.4))">
      <img src="${PROD}" style="position:absolute;height:310px;top:20px;left:240px;transform:rotate(6deg);filter:drop-shadow(0 18px 18px rgba(0,0,0,.45))"></div>
    <div class="p">99,99<small> lei</small></div><div class="s" style="color:${C.yel}">AL DOILEA GRATUIT ✓</div></div>
  <div class="abs" style="left:640px;top:212px;background:${C.red};color:#fff;font:900 26px Archivo;padding:12px 24px;border-radius:999px;letter-spacing:1px">CEA MAI BUNĂ OFERTĂ</div>
  ${foot(C.red, '#fff')}`) });

// D03 – sweet cravings hook
ads.push({ id: 'D03-pofta-de-dulce', html: page(`body{background:${C.choc};color:#fff}`,
  `${logo(56, 56, 44, true)}
  <div class="abs" style="left:56px;top:140px;font:700 50px Caveat;color:${C.yel}">22:47, în fața frigiderului…</div>
  <div class="abs h" style="left:56px;top:215px;width:620px;font-size:86px">„Doar <span class="it" style="color:${C.yel}">o bucățică</span> de ciocolată.”</div>
  <div class="abs" style="left:60px;top:500px;width:560px;font:600 30px/1.35 Inter;color:#eadfd6">Și apoi încă una. Diabexum Forte te ajută să ții sub control pofta de dulce și susține nivelul normal al glicemiei.</div>
  <div class="abs" style="left:60px;top:705px;font:900 46px Archivo">1+1 GRATUIT · <span style="color:${C.yel}">99,99 lei</span></div>
  <div class="btn" style="left:56px;top:790px;background:${C.red};color:#fff">Vreau oferta 1+1</div>
  ${prod(600, 700, 240, 4)}${disc('#fff')}${foot(C.yel, C.ink)}`) });

// D04 – glycemia statement (blunt)
ads.push({ id: 'D04-glicemia-urca', html: page(`body{background:${C.ink};color:#fff}`,
  `${tape(0, C.yel, C.ink, 'Atenție · Glicemie · Colesterol')}
  <div class="abs big" style="left:56px;top:120px;width:600px;font-size:78px">Glicemia ta <span style="color:${C.yel}">nu se reglează</span> singură.</div>
  <div class="abs" style="left:60px;top:470px;width:560px;font:600 28px/1.35 Inter;color:#ddd">Somnolență după masă, poftă de dulce, valori care tot urcă la analize? Fă ceva pentru tine azi.</div>
  <div class="abs" style="left:60px;top:650px;display:flex;flex-direction:column;gap:16px">
   <div class="chk" style="font-size:30px"><i style="background:${C.yel};color:${C.ink}">✓</i>Susține nivelul normal al glicemiei</div>
   <div class="chk" style="font-size:30px"><i style="background:${C.yel};color:${C.ink}">✓</i>Susține nivelul normal al colesterolului</div></div>
  <div class="btn" style="left:56px;top:810px;background:${C.red};color:#fff">1+1 gratuit · 99,99 lei</div>
  ${prod(640, 700, 240, 5)}${disc('#fff')}${foot(C.red, '#fff')}`) });

// D05 – 3 in 1 benefits
ads.push({ id: 'D05-3-in-1', html: page(`body{background:#fff}
  .b{position:absolute;left:56px;width:620px;display:flex;gap:24px;align-items:center}
  .b .n{flex:none;width:100px;height:100px;border-radius:26px;display:flex;align-items:center;justify-content:center;font:900 30px Archivo;color:#fff}
  .b b{display:block;font:900 40px Archivo;letter-spacing:-.5px;color:${C.navy}}.b span{font:400 26px/1.3 Inter;color:#444}`,
  `${logo(56, 56)}
  <div class="abs big" style="left:56px;top:135px;font-size:70px;color:${C.navy}">3 griji. <span style="color:${C.red}">Un flacon.</span></div>
  <div class="b" style="top:300px"><div class="n" style="background:${C.blue}">01</div><div><b>Glicemie</b><span>susține nivelul normal al zahărului din sânge</span></div></div>
  <div class="b" style="top:440px"><div class="n" style="background:${C.red}">02</div><div><b>Colesterol</b><span>susține nivelul normal al colesterolului</span></div></div>
  <div class="b" style="top:580px"><div class="n" style="background:${C.choc}">03</div><div><b>Pofta de dulce</b><span>te ajută să o ții sub control</span></div></div>
  <div class="btn" style="left:56px;top:770px;background:${C.red};color:#fff">1+1 gratuit · 99,99 lei</div>
  ${prod(640, 700, 220, 4)}${plus(850, 230, 190, C.yel, C.ink)}${disc()}${foot(C.navy, '#fff')}`) });

// D06 – price math
ads.push({ id: 'D06-50-lei-cutia', html: page(`body{background:${C.yel};color:${C.ink}}`,
  `${logo(56, 56)}
  <div class="abs big" style="left:56px;top:140px;font-size:64px">Cât costă de fapt?</div>
  <div class="abs" style="left:56px;top:230px;font:900 300px/1 Archivo;letter-spacing:-14px">50<span style="font-size:90px;letter-spacing:0"> lei</span></div>
  <div class="abs" style="left:64px;top:530px;font:800 40px Archivo">pe flacon, cu oferta 1+1</div>
  <div class="abs" style="left:64px;top:600px;width:500px;font:600 29px/1.4 Inter">2 flacoane la doar 99,99 lei, iar transportul e pe noi. Plătești abia când primești coletul.</div>
  <div class="btn" style="left:56px;top:790px;background:${C.ink};color:${C.yel}">Comandă 2 flacoane →</div>
  ${duo(520, 600, 330)}${foot(C.red, '#fff')}`) });

// D07 – before / after split
ads.push({ id: 'D07-inainte-dupa', html: page(`body{background:${C.ink}}
  .l{position:absolute;left:0;top:0;width:540px;height:1016px;background:#2A2A2E}
  .r{position:absolute;left:540px;top:0;width:540px;height:1016px;background:${C.sky}}
  .lab{position:absolute;top:60px;font:900 40px Archivo;letter-spacing:3px;text-transform:uppercase}
  .w{position:absolute;top:140px;width:440px;font:900 58px/1.02 Archivo;text-transform:uppercase;letter-spacing:-2px}`,
  `<div class="l"></div><div class="r"></div>
  <div class="lab" style="left:56px;color:#9b9ba3">Înainte</div><div class="lab" style="left:596px;color:${C.navy}">Cu Diabexum</div>
  <div class="w" style="left:56px;color:#fff">Pofte.<br>Moleșeală.<br>Valori mari.</div>
  <div class="w" style="left:596px;color:${C.navy}">Mai puțin dulce.<br>Mai multă<br>energie.*</div>
  ${prod(500, 330, 440)}
  <div class="abs" style="left:640px;top:810px;font:900 40px/1.15 Archivo;color:${C.navy}">1+1 GRATUIT<br><span style="color:${C.red}">99,99 lei</span></div>
  <div class="abs" style="left:56px;top:900px;font:400 16px Inter;color:#9b9ba3;width:280px">*Experiențe raportate de clienți. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot(C.red, '#fff')}`) });

// D08 – zero risk / pay on delivery
ads.push({ id: 'D08-plata-la-livrare', html: page(`body{background:${C.cream}}
  .chk i{background:${C.green};color:#fff}`,
  `${logo(56, 56)}
  <div class="abs big" style="left:56px;top:140px;width:600px;font-size:84px;color:${C.navy}">Plătești doar când <span style="color:${C.red}">ai coletul</span> în mână.</div>
  <div class="abs" style="left:60px;top:520px;display:flex;flex-direction:column;gap:26px">
   <div class="chk"><i>✓</i>1+1 gratuit: 99,99 lei</div>
   <div class="chk"><i>✓</i>Transport gratuit</div>
   <div class="chk"><i>✓</i>Plata ramburs, la curier</div></div>
  <div class="btn" style="left:56px;top:810px;background:${C.ink};color:#fff">Comandă fără risc →</div>
  ${duo(500, 600, 360)}${foot(C.navy, '#fff')}`) });

// D09 – scarcity
ads.push({ id: 'D09-stoc-limitat', html: page(`body{background:${C.navy};color:#fff}
  .bar{position:absolute;left:60px;top:700px;width:520px;height:30px;border-radius:99px;background:rgba(255,255,255,.18);overflow:hidden}
  .bar i{display:block;width:83%;height:100%;background:linear-gradient(90deg,${C.yel},${C.red})}`,
  `${tape(0, C.red, '#fff', 'Ofertă limitată · 1+1 gratuit')}
  ${logo(56, 100, 44, true)}
  <div class="abs big" style="left:56px;top:170px;width:620px;font-size:76px">Al doilea flacon e <span style="color:${C.yel}">gratuit.</span></div>
  <div class="abs" style="left:60px;top:430px;width:520px;font:600 28px/1.35 Inter;opacity:.92">Diabexum Forte: susține glicemia și colesterolul în limite normale și te ajută cu pofta de dulce.</div>
  <div class="abs" style="left:60px;top:600px;font:900 50px Archivo">2 flacoane · <span style="color:${C.yel}">99,99 lei</span></div>
  <div class="bar"><i></i></div>
  <div class="abs" style="left:60px;top:745px;font:700 24px Inter;color:${C.yel}">Oferta 1+1 e valabilă doar cât durează stocul</div>
  <div class="btn" style="left:56px;top:810px;background:${C.yel};color:${C.ink}">Prinde oferta →</div>
  ${duo(520, 590, 330)}${disc('#fff')}${foot(C.red, '#fff')}`) });

// D10 – 1 for you, 1 for mom/dad (sharing angle for the free box)
ads.push({ id: 'D10-una-pentru-mama', html: page(`body{background:${C.sky}}`,
  `${logo(56, 56)}
  <div class="abs h" style="left:56px;top:140px;width:640px;font-size:70px;color:${C.navy}">Una pentru tine.<br><span class="it" style="color:${C.red}">Una pentru mama.</span></div>
  <div class="abs" style="left:60px;top:330px;width:520px;font:600 28px/1.35 Inter;color:#33465f">Cu oferta 1+1 primești 2 flacoane Diabexum Forte. Împarte-le cu cineva drag căruia îi pasă de glicemie.</div>
  <div class="abs" style="left:60px;top:600px;font:900 46px Archivo;color:${C.navy}">2 flacoane · <span style="color:${C.red}">99,99 lei</span></div>
  <div class="abs" style="left:60px;top:665px;font:700 28px Inter;color:${C.green}">✓ Transport gratuit · ✓ Plata la livrare</div>
  <div class="btn" style="left:56px;top:790px;background:${C.red};color:#fff">Comandă 1+1 →</div>
  ${duo(520, 600, 330)}${plus(830, 60, 200, C.red, '#fff')}${disc()}${foot(C.navy, '#fff')}`) });

// ================================================================ HOOK SET (E01–E10)
// Strong hooks: pofta de dulce · glicemie mare · kg în plus · moleșeală · analize. Same 1+1 offer on every ad.
const offer = (x, y, c1 = '#fff', c2 = C.yel) => `<div class="abs" style="left:${x}px;top:${y}px;font:900 44px Archivo;color:${c1}">1+1 GRATUIT · <span style="color:${c2}">99,99 lei</span></div>`;
const ship = (x, y, c = '#fff') => `<div class="abs" style="left:${x}px;top:${y}px;font:700 26px Inter;color:${c}">✓ Transport gratuit &nbsp;✓ Plata la livrare</div>`;

// E01 – sweet craving controls you
ads.push({ id: 'E01-pofta-te-controleaza', html: page(`body{background:#FF5C8A;color:#fff}
  .cube{position:absolute;width:90px;height:90px;border-radius:14px;background:#fff;box-shadow:inset -10px -12px 0 rgba(0,0,0,.08),0 14px 24px rgba(0,0,0,.18)}`,
  `${logo(56, 56, 44, true)}
  <div class="cube" style="left:900px;top:70px;transform:rotate(14deg)"></div><div class="cube" style="left:790px;top:120px;width:60px;height:60px;transform:rotate(-12deg)"></div>
  <div class="abs big" style="left:56px;top:140px;width:640px;font-size:80px">Tu mănânci dulcele?</div>
  <div class="abs big" style="left:56px;top:320px;width:620px;font-size:80px;color:${C.ink}">Sau dulcele <span style="color:#fff">te mănâncă</span> pe tine?</div>
  <div class="abs" style="left:60px;top:590px;width:540px;font:600 28px/1.35 Inter">Diabexum Forte te ajută să ții pofta de dulce sub control și susține echilibrul glicemic.</div>
  ${offer(60, 735, C.ink, '#fff')}
  <div class="btn" style="left:56px;top:815px;background:${C.ink};color:#fff">Vreau oferta 1+1 →</div>
  ${prod(560, 690, 330, 5)}${disc('#fff')}${foot(C.ink, '#fff')}`) });

// E02 – high blood sugar at the tests
ads.push({ id: 'E02-glicemie-mare', html: page(`body{background:${C.navy};color:#fff}
  .meter{position:absolute;left:56px;top:150px;width:420px;height:300px;border-radius:40px;background:#DDE6EF;box-shadow:inset 0 0 0 10px #B9C7D6,0 20px 40px rgba(0,0,0,.35);padding:34px 40px;color:${C.ink}}
  .meter .v{font:900 150px/1 Archivo;letter-spacing:-6px;color:${C.red}}.meter .u{font:700 28px Inter;color:#55667a}`,
  `<div class="meter"><div style="font:700 24px Inter;color:#55667a;letter-spacing:2px">GLICEMIE À JEUN</div><div class="v">142<span style="font-size:60px">↑</span></div><div class="u">mg/dL · „la limită”, zice doctorul</div></div>
  <div class="abs big" style="left:56px;top:500px;width:620px;font-size:62px">Glicemie <span style="color:${C.yel}">mare</span> la analize?</div>
  <div class="abs" style="left:60px;top:650px;width:560px;font:600 26px/1.35 Inter;opacity:.92">Nu aștepta următoarele analize. Diabexum Forte susține menținerea nivelului normal al glicemiei.</div>
  ${offer(60, 780)}
  <div class="btn" style="left:56px;top:850px;padding:18px 36px;font-size:30px;background:${C.yel};color:${C.ink}">Comandă acum →</div>
  ${prod(640, 680, 200, 4)}${disc('#fff')}${foot(C.red, '#fff')}`) });

// E03 – extra kilos
ads.push({ id: 'E03-kg-in-plus', html: page(`body{background:${C.yel};color:${C.ink}}`,
  `${logo(56, 56, 44)}
  <div class="abs big" style="left:56px;top:140px;width:660px;font-size:96px">Kilogramele în plus <span style="color:${C.red}">nu vin din aer.</span></div>
  <div class="abs h" style="left:60px;top:440px;width:600px;font-size:46px;letter-spacing:-1px">Vin din „încă un biscuit” de la 10 seara.</div>
  <div class="abs" style="left:60px;top:580px;width:540px;font:600 28px/1.35 Inter">Diabexum Forte te ajută să controlezi pofta de dulce și susține echilibrul metabolic.</div>
  ${offer(60, 715, C.ink, C.red)}
  <div class="btn" style="left:56px;top:800px;background:${C.red};color:#fff">Începe azi →</div>
  ${prod(620, 690, 220, 5)}${disc()}${foot(C.ink, '#fff')}`) });

// E04 – 6 benefits grid
const ben = [['🩸', 'Glicemie', 'susține nivelul normal'], ['🫀', 'Colesterol', 'susține valori normale'], ['🍫', 'Poftă de dulce', 'o ții sub control'], ['🔥', 'Metabolism', 'susține echilibrul metabolic'], ['⚡', 'Energie', 'fără moleșeala de după masă*'], ['🌿', 'Natural', 'complex de ingrediente naturale']];
ads.push({ id: 'E04-6-beneficii', html: page(`body{background:#fff}
  .g{position:absolute;left:56px;top:270px;width:600px;display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .t{background:${C.sky};border-radius:24px;padding:22px 22px;height:150px}
  .t .e{font-size:40px;line-height:1}.t b{display:block;font:900 30px Archivo;color:${C.navy};margin-top:8px}.t span{font:400 20px/1.25 Inter;color:#44546a}`,
  `${logo(56, 56)}
  <div class="abs big" style="left:56px;top:135px;font-size:68px;color:${C.navy}">6 beneficii. <span style="color:${C.red}">Un flacon.</span></div>
  <div class="g">${ben.map(([e, b, t]) => `<div class="t"><div class="e">${e}</div><b>${b}</b><span>${t}</span></div>`).join('')}</div>
  <div class="btn" style="left:56px;top:830px;background:${C.red};color:#fff">1+1 gratuit · 99,99 lei</div>
  ${prod(640, 700, 220, 4)}${plus(870, 230, 170, C.yel, C.ink)}${disc(C.ink, '*Experiențe raportate de clienți. Supliment alimentar. Rezultatele pot varia.')}${foot(C.navy, '#fff')}`) });

// E05 – after-lunch slump
ads.push({ id: 'E05-somn-dupa-masa', html: page(`body{background:#2B2F45;color:#fff}`,
  `${logo(56, 56, 44, true)}
  <div class="abs" style="left:56px;top:140px;font:900 180px/1 Archivo;letter-spacing:-6px;color:#8C93B8">14:30</div>
  <div class="abs big" style="left:56px;top:340px;width:620px;font-size:70px">Ți se închid ochii <span style="color:${C.yel}">după masă?</span></div>
  <div class="abs" style="left:60px;top:580px;width:540px;font:600 26px/1.35 Inter;opacity:.92">Moleșeala, apoi pofta de ceva dulce… Susține-ți echilibrul glicemic cu Diabexum Forte.</div>
  ${offer(60, 710)}${ship(60, 772)}
  <div class="btn" style="left:56px;top:830px;background:${C.yel};color:${C.ink}">Comandă acum →</div>
  ${prod(620, 690, 220, 5)}${disc('#fff')}${foot(C.red, '#fff')}`) });

// E06 – lab results notification
ads.push({ id: 'E06-notificare-analize', html: page(`body{background:linear-gradient(180deg,#3E5C86,#14294A);color:#fff}
  .n{position:absolute;left:56px;width:620px;background:rgba(255,255,255,.95);color:${C.ink};border-radius:28px;padding:24px 28px;box-shadow:0 18px 40px rgba(0,0,0,.35)}
  .n .a{display:flex;gap:12px;align-items:center;font:600 20px Inter;color:#666}.n .a i{width:34px;height:34px;border-radius:9px;background:${C.red};display:inline-block}
  .n b{display:block;font:800 28px Inter;margin-top:10px}.n p{font:400 24px/1.3 Inter;margin-top:4px}`,
  `<div class="abs" style="left:56px;top:60px;font:600 90px Inter;letter-spacing:-2px;opacity:.9">08:12</div>
  <div class="n" style="top:200px"><div class="a"><i></i>REZULTATE ANALIZE · acum</div><b>Glicemie ↑ · Colesterol ↑</b><p>Valori peste limita de referință.</p></div>
  <div class="n" style="top:390px;opacity:.85"><div class="a"><i style="background:${C.yel}"></i>NOTIȚE · ieri</div><b>De mâine: fără dulce!!!</b><p>(a 5-a oară luna asta)</p></div>
  <div class="abs big" style="left:56px;top:590px;width:600px;font-size:54px">Cunoști <span style="color:${C.yel}">notificarea</span> asta?</div>
  ${offer(60, 735)}
  <div class="btn" style="left:56px;top:815px;background:${C.yel};color:${C.ink}">Vreau 1+1 gratuit →</div>
  ${prod(620, 700, 220, 4)}${disc('#fff')}${foot(C.red, '#fff')}`) });

// E07 – "diet starts Monday"
ads.push({ id: 'E07-dieta-de-luni', html: page(`body{background:${C.cream}}
  .d{position:absolute;left:56px;display:flex;gap:20px;align-items:center;font:700 34px Inter}
  .d s{color:#9a9a9a}.d i{font-style:normal;color:${C.red};font:900 34px Archivo}`,
  `${logo(56, 56)}
  <div class="abs big" style="left:56px;top:140px;width:640px;font-size:84px;color:${C.navy}">„Dieta începe <span style="color:${C.red}">de luni.”</span></div>
  <div class="d" style="top:370px"><s>Luni: fără dulce</s><i>✕</i></div>
  <div class="d" style="top:430px"><s>Marți: doar o prăjitură</s><i>✕</i></div>
  <div class="d" style="top:490px"><s>Miercuri: „merit și eu”</s><i>✕</i></div>
  <div class="d" style="top:560px;color:${C.green}">Joi: încep cu Diabexum Forte ✓</div>
  <div class="abs" style="left:60px;top:640px;width:540px;font:600 26px/1.35 Inter;color:#444">Te ajută să ții pofta de dulce sub control, ca voința să nu lupte singură.</div>
  ${offer(60, 740, C.navy, C.red)}
  <div class="btn" style="left:56px;top:815px;background:${C.red};color:#fff">Încep azi, nu luni →</div>
  ${prod(600, 700, 240, 5)}${disc()}${foot(C.navy, '#fff')}`) });

// E08 – "do you recognize yourself?" checklist
ads.push({ id: 'E08-te-regasesti', html: page(`body{background:#fff}
  .c{display:flex;gap:18px;align-items:center;font:600 31px Inter;color:${C.ink}}
  .c i{flex:none;width:46px;height:46px;border-radius:10px;border:4px solid ${C.navy};display:flex;align-items:center;justify-content:center;font:900 30px Inter;font-style:normal;color:${C.red}}`,
  `${logo(56, 56)}
  <div class="abs big" style="left:56px;top:135px;font-size:86px;color:${C.navy}">Te regăsești?</div>
  <div class="abs" style="left:60px;top:270px;display:flex;flex-direction:column;gap:24px">
   <div class="c"><i>✓</i>Poftă de dulce seara, zilnic</div>
   <div class="c"><i>✓</i>Glicemie mare la analize</div>
   <div class="c"><i>✓</i>Câteva kg în plus pe burtă</div>
   <div class="c"><i>✓</i>Somnoros după fiecare masă</div>
   <div class="c"><i>✓</i>Colesterolul „la limită”</div></div>
  <div class="abs h" style="left:60px;top:640px;width:560px;font-size:44px;color:${C.red}">Atunci Diabexum Forte e pentru tine.</div>
  ${offer(60, 755, C.navy, C.red)}
  <div class="btn" style="left:56px;top:830px;padding:18px 36px;font-size:30px;background:${C.navy};color:#fff">Comandă acum →</div>
  ${prod(620, 700, 220, 4)}${disc()}${foot(C.red, '#fff')}`) });

// E09 – sticky note
ads.push({ id: 'E09-notita-frigider', html: page(`body{background:#D9E2EA}
  .note{position:absolute;left:70px;top:110px;width:600px;height:520px;background:#FFE877;transform:rotate(-3deg);box-shadow:0 22px 40px rgba(0,0,0,.25);padding:60px 50px;font:700 64px/1.15 Caveat;color:#1d2a44}
  .pin{position:absolute;left:340px;top:90px;width:44px;height:44px;border-radius:50%;background:${C.red};box-shadow:0 6px 10px rgba(0,0,0,.35)}`,
  `<div class="note">Notă pentru mine:<br>NU mai mânca dulce seara!<br><span style="font-size:48px;color:${C.red}">(a 12-a notiță… 😩)</span></div><div class="pin"></div>
  <div class="abs h" style="left:60px;top:665px;width:620px;font-size:38px;color:${C.navy}">Mai puține notițe. <span style="color:${C.red}">Mai puțină poftă.*</span></div>
  ${offer(60, 760, C.navy, C.red)}
  <div class="btn" style="left:56px;top:835px;padding:18px 36px;font-size:30px;background:${C.red};color:#fff">Comandă acum →</div>
  ${prod(600, 700, 220, 5)}${disc(C.ink, '*Experiențe raportate de clienți. Supliment alimentar. Rezultatele pot varia.')}${foot(C.navy, '#fff')}`) });

// E10 – it's not lack of willpower
ads.push({ id: 'E10-nu-e-vointa', html: page(`body{background:${C.ink};color:#fff}`,
  `${tape(0, C.yel, C.ink, 'Pofta de dulce · Glicemie · Kg în plus')}
  <div class="abs big" style="left:56px;top:130px;width:640px;font-size:96px">Nu e lipsă <span style="color:#777"><s>de voință.</s></span></div>
  <div class="abs h" style="left:56px;top:360px;width:600px;font-size:54px;color:${C.yel}">E un cerc: glicemia urcă, coboară, și îți cere iar dulce.</div>
  <div class="abs" style="left:60px;top:560px;width:540px;font:600 28px/1.35 Inter;color:#ddd">Diabexum Forte susține echilibrul glicemic și te ajută să rupi cercul poftei de dulce.</div>
  ${offer(60, 700)}${ship(60, 765)}
  <div class="btn" style="left:56px;top:830px;background:${C.red};color:#fff">Rupe cercul →</div>
  ${prod(620, 690, 230, 5)}${disc('#fff')}${foot(C.red, '#fff')}`) });

module.exports = ads;
