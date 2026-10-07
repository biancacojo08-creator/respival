// PowerMan: the same 10 ads re-laid out for 1:1 (1080x1080). Helpers come from ads.js.
// Render: node render.js --square [id-filter]
const { C, bottle, logo, foot, disc, tag, page: page45, msg, plants } = require('./ads.js').lib;
const page = (css, body) => page45(`html,body{height:1080px}${css}`, body);

const ads = [];

ads.push({ id: 'PM01-discret', html: page(`body{background:radial-gradient(120% 90% at 70% 45%,#2a0a10 0%,${C.black} 60%)}`,
  `${logo(64, 60)}${tag(270, 54)}
  <div class="abs h" style="left:64px;top:150px;font-size:112px;width:600px">Arată ca un spray de gură.</div>
  <div class="abs it" style="left:68px;top:480px;font-size:54px;color:${C.red};width:560px;line-height:1.08">Doar tu știi ce face.</div>
  <div class="abs" style="left:64px;top:650px;display:flex;flex-direction:column;gap:14px">
    <div class="pill" style="background:${C.steel}">💪 Pentru potență, libido și rezistență</div>
    <div class="pill" style="background:${C.steel}">🛏️ Pe noptieră, fără întrebări</div>
    <div class="pill" style="background:${C.steel}">📦 Ajunge în colet discret</div></div>
  <div class="glow" style="width:660px;height:660px;left:520px;top:220px"></div>
  ${bottle(760, 690, 170, 6)}
  ${disc()}${foot()}`) });

ads.push({ id: 'PM02-fara-pastila', html: page(`
  .l{position:absolute;left:0;top:270px;width:540px;bottom:78px;background:#202024}
  .r{position:absolute;left:540px;top:270px;width:540px;bottom:78px;background:linear-gradient(180deg,${C.wine},#2a0409)}
  .lab{position:absolute;top:300px;font:800 32px Barlow;letter-spacing:3px;text-transform:uppercase}
  .lst{position:absolute;top:365px;display:flex;flex-direction:column;gap:22px;width:440px}
  .x,.v{display:flex;gap:16px;font:600 29px/1.2 Inter}.x{color:#8c8c94}.x b{color:${C.red};font:900 29px Inter}.v b{color:${C.gold};font:900 29px Inter}`,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:64px;top:135px;font-size:104px;white-space:nowrap">Fără pastila <span style="color:#3b7bff">albastră</span>.</div>
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
  ${bottle(300, 700, 680, 0)}
  <div class="burst" style="width:190px;height:190px;left:190px;top:760px;background:${C.gold};color:${C.black};font:800 34px/0.95 Barlow;text-transform:uppercase">100%<br>plante<br><span style="font-size:22px">fără rețetă</span></div>
  <div class="abs" style="left:0;right:0;bottom:84px;text-align:center;font:400 14px Inter;opacity:.5">Supliment alimentar, nu medicament. Nu înlocuiește tratamentul prescris de medic. Rezultatele pot varia.</div>
  ${foot()}`) });

ads.push({ id: 'PM03-ea-observa', html: page(`body{background:linear-gradient(160deg,#3a0610 0%,#14040a 55%,${C.black} 100%)}`,
  `${logo(64, 60)}${tag(270, 54)}
  <div class="abs it" style="left:64px;top:120px;font-size:170px;line-height:1;color:${C.red};opacity:.9">“</div>
  <div class="abs it" style="left:64px;top:235px;width:920px;font-size:66px;line-height:1.1;color:#fff">Nu știu ce s-a schimbat la el luna asta.<br><span style="color:${C.gold}">Dar nu mă plâng.</span></div>
  <div class="abs" style="left:68px;top:560px;font:600 28px Inter;color:#d8c9cc">— Ea, după 3 săptămâni de PowerMan</div>
  <div class="abs" style="left:68px;top:650px;width:540px;font:600 32px/1.3 Inter;color:#fff">Mai mult chef. Mai multă rezistență. <span class="gold">Iar ea observă prima.</span></div>
  <div class="abs" style="left:68px;top:850px;font:700 30px Inter;color:${C.gold}">Doar 62,99 lei · plătești la curier</div>
  <div class="glow" style="width:560px;height:560px;left:600px;top:460px"></div>
  ${bottle(500, 780, 460, -5)}
  <div class="abs" style="left:68px;top:950px;font:400 15px Inter;opacity:.5">Scenă ilustrativă. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot()}`) });

ads.push({ id: 'PM04-whatsapp', html: page(`body{background:#0B141A}
  .top{position:absolute;left:0;right:0;top:0;height:120px;background:#202C33;display:flex;align-items:center;gap:22px;padding:0 40px}
  .av{width:76px;height:76px;border-radius:50%;background:#6B7C85;display:flex;align-items:center;justify-content:center;font:700 32px Inter}
  .chat{position:absolute;left:36px;right:36px;top:146px;display:flex;flex-direction:column;gap:14px}
  .chat>div{font-size:29px!important;padding:14px 22px 10px!important}`,
  `<div class="top"><div style="font:400 40px Inter;color:#AEBAC1">←</div><div class="av">A</div><div><div style="font:600 32px Inter">Andrei 🍺</div><div style="font:400 22px Inter;color:#8696A0">online</div></div>${tag(560, 32)}</div>
  <div class="chat">
    ${msg(0, 'Frate, ce-ai pățit? 😂 Ești alt om de o lună. Și Ioana zâmbește tot timpul', '21:14')}
    ${msg(1, 'Hahaha. Ți-am zis de sprayul ăla românesc pentru potență, cu ginseng roșu', '21:15')}
    ${msg(0, 'Ăla de 63 de lei? Credeam că-i țeapă', '21:15')}
    ${msg(1, 'PowerMan. 2–3 pufuri sub limbă. Vine acasă în colet discret și plătești la curier 🤫', '21:16')}
    ${msg(0, 'Dă-mi linkul. Da\' rămâne între noi 🤐', '21:16')}
  </div>
  ${bottle(250, 880, 740, 8)}
  <div class="abs" style="left:36px;top:905px;font:700 28px Inter;color:#E9EDEF">Unii prieteni îți dau sfaturi bune. 👇</div>
  <div class="abs" style="left:36px;top:950px;font:400 14px Inter;color:#8696A0">Conversație ilustrativă. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot(C.red, '#fff', ['Colet discret', 'Plata la livrare', '62,99 lei'])}`) });

const ys = { 330: 270, 520: 420, 710: 570, 900: 720, 420: 330, 640: 500, 860: 670 };
ads.push({ id: 'PM05-7-plante', html: page(`body{background:radial-gradient(90% 70% at 50% 55%,#2a0a10,${C.black} 70%)}
  .ing{position:absolute;display:flex;align-items:center;gap:16px;width:280px}
  .ing .d{width:64px;height:64px;border-radius:50%;flex:none;box-shadow:inset -10px -12px 0 rgba(0,0,0,.25),0 0 0 6px rgba(255,255,255,.07)}
  .ing b{display:block;font:800 28px Barlow;text-transform:uppercase;letter-spacing:.5px}.ing small{font:400 19px Inter;opacity:.7}`,
  `${logo(64, 56)}${tag(270, 50)}
  <div class="abs h" style="left:0;right:0;top:135px;text-align:center;font-size:96px">7 plante. <span class="red">Un singur spray.</span></div>
  ${plants.map(([n, s, c, x, y]) => `<div class="ing" style="left:${x}px;top:${ys[y]}px"><span class="d" style="background:${c}"></span><span><b>${n}</b><small>${s}</small></span></div>`).join('')}
  ${bottle(640, 412, 250)}
  <div class="abs" style="left:0;right:0;top:915px;text-align:center;font:600 28px Inter;color:${C.gold}">Pentru potență, libido și rezistență masculină</div>
  ${disc('Supliment alimentar. Rezultatele pot varia.')}${foot()}`) });

ads.push({ id: 'PM06-comparativ', html: page(`
  table{position:absolute;left:56px;top:305px;width:968px;border-collapse:separate;border-spacing:0}
  td,th{height:84px;font:600 29px Inter;border-bottom:2px solid #26262c}
  th{font:800 28px Barlow;letter-spacing:1.5px;text-transform:uppercase;height:100px}
  .us{background:${C.red};color:#fff;text-align:center;width:250px}
  .them{text-align:center;width:250px;color:#8c8c94}
  tr:first-child .us{border-radius:26px 26px 0 0}tr:last-child .us{border-radius:0 0 26px 26px}
  .ok{color:#fff;font:900 40px Inter}.no{color:#5a5a62;font:900 36px Inter}.big{font:800 44px Barlow}`,
  `${logo(56, 60)}${tag(262, 54)}
  <div class="abs h" style="left:56px;top:135px;font-size:80px;width:820px">Mai multe plante.<br><span class="gold">Cu 17 lei mai puțin.</span></div>
  ${bottle(250, 900, 30, 6)}
  <table><tr><th></th><th class="us">PowerMan</th><th class="them">Alte spray-uri<br>populare</th></tr>
  <tr><td>Preț / flacon</td><td class="us big">62,99 lei</td><td class="them big">~80 lei</td></tr>
  <tr><td>Plante active</td><td class="us big">7</td><td class="them big">4</td></tr>
  <tr><td>Ginseng roșu + colții-babei</td><td class="us ok">✓</td><td class="them" style="font:900 36px Inter;color:#8c8c94">✓</td></tr>
  <tr><td>Guarana, pentru energie</td><td class="us ok">✓</td><td class="them no">✕</td></tr>
  <tr><td>Ardei iute + Poria cocos</td><td class="us ok">✓</td><td class="them no">✕</td></tr>
  <tr><td>Fabricat în România</td><td class="us ok">✓</td><td class="them" style="font:800 36px Inter">?</td></tr></table>
  <div class="abs" style="left:56px;top:935px;width:960px;font:400 15px/1.4 Inter;opacity:.55">Comparație cu formulele și prețurile afișate public de spray-uri sublinguale similare, octombrie 2026. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot()}`) });

ads.push({ id: 'PM07-ritual', html: page(`body{background:${C.cream};color:${C.black}}
  .step{position:absolute;left:64px;width:600px;display:flex;gap:26px;align-items:flex-start}
  .step .n{flex:none;width:84px;height:84px;border-radius:50%;background:${C.red};color:#fff;display:flex;align-items:center;justify-content:center;font:800 36px Barlow}
  .step b{display:block;font:800 42px Barlow;text-transform:uppercase}.step span{font:400 26px/1.3 Inter;color:#444}
  .line{position:absolute;left:105px;top:400px;width:4px;height:380px;background:#d9cfbf}`,
  `${logo(64, 60, 44, false)}${tag()}
  <div class="abs h" style="left:64px;top:135px;font-size:104px;color:${C.black}">2 pufuri.<br><span class="red">Sub limbă.</span> Atât.</div>
  <div class="line"></div>
  <div class="step" style="top:385px"><div class="n">1</div><div><b>Dimineața</b><span>2–3 pufuri sub limbă, cât îți faci cafeaua</span></div></div>
  <div class="step" style="top:565px"><div class="n">2</div><div><b>Seara</b><span>încă 2–3 pufuri, la fel de simplu</span></div></div>
  <div class="step" style="top:745px"><div class="n">3</div><div><b>3–4 săptămâni</b><span>cura completă, pentru rezultate constante</span></div></div>
  ${bottle(680, 730, 270, 4)}
  <div class="abs" style="left:64px;top:950px;font:400 15px Inter;color:#666">Supliment alimentar. Nu depășiți doza recomandată. Rezultatele pot varia.</div>
  ${foot(C.black, '#fff')}`) });

ads.push({ id: 'PM08-tabu', html: page(``,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:56px;top:130px;font-size:250px;letter-spacing:-6px;color:${C.red}">1 din 2</div>
  <div class="abs a" style="left:64px;top:380px;width:960px;font-size:56px;line-height:1.08">bărbați trecuți de 40 de ani au probleme de potență.</div>
  <div class="abs it" style="left:64px;top:540px;width:620px;font-size:48px;line-height:1.12;color:${C.gold}">Aproape niciunul nu vorbește despre asta.</div>
  <div class="abs" style="left:64px;top:700px;width:620px;font:600 28px/1.35 Inter;color:#d6d6db">Nu e o rușine. E vârsta, stresul, oboseala. Bărbații care fac ceva în privința asta nu se plâng. <span style="color:#fff">Se pregătesc.</span></div>
  <div class="glow" style="width:520px;height:520px;left:640px;top:500px"></div>
  ${bottle(440, 800, 510, -4)}
  <div class="abs" style="left:64px;top:930px;width:700px;font:400 14px/1.4 Inter;opacity:.5">Sursa: Massachusetts Male Aging Study (Feldman et al., J Urol 1994), bărbați 40–70 ani. Supliment alimentar, nu tratament. Rezultatele pot varia.</div>
  ${foot()}`) });

ads.push({ id: 'PM09-oferta', html: page(`body{background:linear-gradient(180deg,${C.red} 0%,#8d0a1d 100%)}
  .chk{display:flex;gap:16px;align-items:center;font:700 31px Inter}
  .chk i{flex:none;width:46px;height:46px;border-radius:50%;background:#fff;color:${C.red};display:flex;align-items:center;justify-content:center;font:900 26px Inter;font-style:normal}`,
  `${logo(64, 60)}${tag(270, 54, C.black)}
  <div class="abs h" style="left:64px;top:140px;font-size:104px">Oferta de azi</div>
  <div class="abs" style="left:64px;top:255px;font:700 46px Barlow;color:#ffc9d1;text-decoration:line-through">99,99 lei</div>
  <div class="abs h" style="left:56px;top:300px;font-size:210px;letter-spacing:-5px;line-height:1">62,99<span style="font-size:76px;letter-spacing:0"> lei</span></div>
  <div class="abs" style="left:64px;top:540px;display:flex;flex-direction:column;gap:20px">
    <div class="chk"><i>✓</i>Plătești doar când primești</div>
    <div class="chk"><i>✓</i>Colet discret, fără detalii pe cutie</div>
    <div class="chk"><i>✓</i>Pentru potență și libido</div>
    <div class="chk"><i>✓</i>Fabricat în România</div></div>
  <div class="burst" style="width:220px;height:220px;left:810px;top:110px;background:${C.gold};color:${C.black};font:800 70px/0.9 Barlow">−37%</div>
  ${bottle(600, 750, 340, 6)}
  <div class="abs" style="left:64px;top:840px;font:800 40px Barlow;text-transform:uppercase;background:${C.black};padding:16px 32px;border-radius:14px">Comandă acum →</div>
  <div class="abs" style="left:64px;top:955px;font:400 14px Inter;opacity:.7">Supliment alimentar. Stoc limitat la prețul promoțional. Rezultatele pot varia.</div>
  ${foot(C.black, '#fff')}`) });

ads.push({ id: 'PM10-se-pregatesc', html: page(`body{background:${C.black}}
  .stripe{position:absolute;left:-200px;top:470px;width:1600px;height:230px;background:${C.red};transform:rotate(-8deg)}`,
  `<div class="stripe"></div>${logo(64, 60)}${tag()}
  <div class="abs h" style="left:64px;top:110px;font-size:124px;line-height:1.3">Bărbații<br>nu se plâng.</div>
  <div class="abs h" style="left:64px;top:525px;font-size:112px;color:${C.black};white-space:nowrap">Se pregătesc.</div>
  <div class="abs" style="left:64px;top:745px;width:600px;font:600 31px/1.3 Inter">Potență, libido și rezistență, din <span class="gold">7 plante</span>. 2–3 pufuri sub limbă.</div>
  <div class="abs" style="left:64px;top:870px;font:800 50px Barlow;color:${C.gold}">62,99 LEI <span style="font:700 32px Barlow;color:${C.grey};text-decoration:line-through">99,99</span></div>
  ${bottle(480, 840, 470, 5)}
  ${disc()}${foot()}`) });

module.exports = ads;
