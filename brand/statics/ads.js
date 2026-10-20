// 1080x1080 static ads for Vision Elite+ and UroNova Forte, same system as brand/premium (free, local render).
// Real packshot cutouts + photos already generated for Shopify/UGC. Copy uses only confirmed facts:
// Vision: carrot + beta-carotene, 64,99 lei, owner's benefit wording; UroNova: bearberry leaves, label claims, no price.
// Render: node render.js [id-filter]
const FONTS = `
@font-face{font-family:Archivo;font-weight:800;src:url(../../fonts/Archivo-800.ttf)}
@font-face{font-family:Archivo;font-weight:900;src:url(../../fonts/Archivo-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
`;
const C = { cream: '#F4F1EA', ink: '#141414', yellow: '#FFD23F', red: '#D7262E', green: '#2E9D4A' };

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.abs{position:absolute}
.h{font-family:Archivo;font-weight:900;letter-spacing:-2px;line-height:.98}
.it{font-family:Fraunces;font-style:italic;font-weight:600;letter-spacing:-.5px}
.prod{position:absolute;filter:drop-shadow(0 34px 34px rgba(0,0,0,.35)) drop-shadow(0 8px 10px rgba(0,0,0,.25))}
.logo{position:absolute;height:46px}
.pill{display:inline-flex;align-items:center;gap:12px;padding:14px 26px;border-radius:999px;font:700 28px Inter;white-space:nowrap}
.chk{display:flex;align-items:flex-start;gap:18px;font:600 33px/1.22 Inter}
.chk i{flex:none;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 27px Inter;margin-top:-2px}
.cta{display:inline-block;padding:22px 40px;border-radius:999px;font:900 34px Archivo;text-transform:uppercase;letter-spacing:.5px}
.foot{position:absolute;left:0;right:0;bottom:0;height:64px;display:flex;align-items:center;justify-content:center;gap:30px;font:600 21px Inter;letter-spacing:.3px}
.foot span:before{content:"✓ ";font-weight:800}
.disc{position:absolute;right:28px;bottom:72px;font:400 15px Inter;opacity:.65}
.photo{position:absolute;object-fit:cover}
.tag{position:absolute;font:900 30px Archivo;letter-spacing:3px;text-transform:uppercase;padding:12px 26px;border-radius:999px;color:#fff}
.burst{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
`;
const LOGO = '../../logo-novensa.png';
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;
const logo = (x, y, h = 46, extra = '') => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px;${extra}">`;
const disc = (c = C.ink) => `<div class="disc" style="color:${c}">Supliment alimentar. Rezultatele pot varia.</div>`;

const P = {
  vision: {
    key: 'V', name: 'VISION ELITE+', short: 'Vision Elite+', cut: '../../shopify/src/vision_cut.png',
    main: '#13307A', soft: '#DCE6F7', accent: '#F2B33D',
    ingr: 'morcov + beta-caroten', ingrLong: ['Pulbere din rădăcini de morcov', 'Extract de beta-caroten din morcov'],
    ben: ['Îmbunătățește vederea', 'Calmează usturimea', 'Efect rapid'],
    price: '64,99', foot: ['Plata la livrare', 'Livrare rapidă', '30 capsule'],
    heroH: 'Ochi obosiți?<br><span class="it" style="color:#F2B33D">Vezi</span> din nou clar.',
    hook: ['ȚII TELEFONUL', 'LA UN METRU?', 'NU E VÂRSTA.'],
    before: ['Scrisul mic e o ceață', 'Te orbesc farurile noaptea', 'Ochii ustură seara', 'Ții telefonul tot mai departe'],
    after: ['Îmbunătățește vederea', 'Calmează usturimea', 'Efect rapid', 'Citești liniștit, oricând'],
    ugc1: '../../shopify/ugc-vision/02-bunic-curte.jpg', ugc1H: 'Ochelarii mai groși<br>nu rezolvă nimic.',
    ugc2: '../../shopify/ugc-vision/07-it-canapea.jpg', ugc2H: '10 ore în ecran?<br>Ochii tăi plătesc.',
    ba: ['../../shopify/src/v-p-telefon.jpg', '../../shopify/src/v-s-telefon.jpg'],
    baH: ['Îmbunătățește vederea', 'Calmează usturimea · cu morcov + beta-caroten'],
    attn: ['Dacă ai trecut de 40 de ani', 'și strângi din ochi la telefon,', 'nu da mai departe.'],
    why: [['Îmbunătățește vederea', 'pentru ochii obosiți de ecrane și ani'], ['Calmează usturimea', 'seara, după o zi lungă'], ['Plătești la livrare', 'fără card, fără risc']],
  },
  uronova: {
    key: 'U', name: 'URONOVA FORTE', short: 'UroNova Forte', cut: '../../shopify/src/uronova_cut.png',
    main: '#123A7A', soft: '#F7E1E3', accent: '#C8102E',
    ingr: 'strugurii-ursului', ingrLong: ['Pulbere din frunze de strugurii-ursului', 'Extracte din plante'],
    ben: ['Ajută la combaterea infecțiilor urinare', 'Ajută la combaterea recurenței', 'Susține confortul zilnic'],
    price: null, foot: ['Plata la livrare', 'Livrare rapidă', '30 capsule'],
    heroH: 'Gata cu<br><span class="it" style="color:#C8102E">usturimea</span><br>care revine.',
    hook: ['SUFERI DE', 'INFECȚII URINARE', 'RECURENTE?'],
    before: ['Usturime și arsuri', 'Fugi la baie la 10 minute', 'Nopți nedormite', 'Infecția revine iar și iar'],
    after: ['Ajută la combaterea infecțiilor urinare', 'Ajută la combaterea recurenței', 'Susține sănătatea tractului urinar', 'Confort zilnic'],
    ugc1: '../../shopify/ugc-uronova/04-bunica-ceai.jpg', ugc1H: '40 de ani de chin.<br>Nimeni nu mi-a spus.',
    ugc2: '../../shopify/ugc-uronova/09-studenta-camin.jpg', ugc2H: 'Fetelor,<br>o să revină!',
    ba: ['../../shopify/src/u-p-noapte.jpg', '../../shopify/src/u-s-bucatarie.jpg'],
    baH: ['Confort, nu chin.', 'Ajută la combaterea recurenței · cu strugurii-ursului'],
    attn: ['Infecțiile urinare', 'îmi făceau viața un chin.', 'Până am găsit asta.'],
    why: [['Strugurii-ursului', 'pulbere din frunze, planta folosită de generații'], ['Ajută la combaterea recurenței', 'nu doar a infecției de azi'], ['Plătești la livrare', 'fără card, colet discret']],
  },
};

const ads = [];
for (const [slug, p] of Object.entries(P)) {
  const prod = (h, x, y, rot = 0) => `<img class="prod" src="${p.cut}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
  const foot = (bg, fg) => `<div class="foot" style="background:${bg};color:${fg}">${p.foot.map(t => `<span>${t}</span>`).join('')}</div>`;
  const priceOr = (big, small) => p.price
    ? `<div class="h" style="font-size:${big}px;color:inherit">${p.price.split(',')[0]}<span style="font-size:${small}px">,${p.price.split(',')[1]} lei</span></div>`
    : `<div class="h" style="font-size:${small * 1.3}px;color:inherit">Plătești<br>la livrare.</div>`;
  const id = n => `${p.key}${String(n).padStart(2, '0')}`;

  // 1 Hero
  ads.push({ id: `${id(1)}-hero`, html: page(`body{background:${C.cream}}
    .blob{position:absolute;right:-140px;top:110px;width:780px;height:780px;border-radius:50%;background:${p.soft}}
    .pill{white-space:normal;max-width:560px;line-height:1.2}`,
    `<div class="blob"></div>${logo(64, 60)}
    <div class="abs h" style="left:64px;top:150px;width:600px;font-size:86px;color:${p.main}">${p.heroH}</div>
    <div class="abs" style="left:64px;top:${slug === 'vision' ? 520 : 600}px;display:flex;flex-direction:column;gap:14px">
      ${p.ben.map((b, i) => `<div class="pill" style="background:${i ? '#fff' : p.main};color:${i ? p.main : '#fff'}">✓ ${b}</div>`).join('')}</div>
    ${prod(700, 640, 170, 4)}${disc()}${foot(p.main, '#fff')}`) });

  // 2 Benefits card
  ads.push({ id: `${id(2)}-beneficii`, html: page(`body{background:${p.soft}}
    .card{position:absolute;left:56px;top:56px;width:620px;height:890px;background:#fff;border-radius:36px;padding:56px 50px}
    .chk i{background:${p.main};color:#fff}`,
    `<div class="card">${logo(50, 48, 40)}
     <div class="h" style="font-size:70px;color:${p.main};margin-top:80px">Ce face<br><span class="it" style="color:${p.accent}">${p.short}</span><br>pentru tine</div>
     <div style="display:flex;flex-direction:column;gap:30px;margin-top:46px">
      ${[...p.ben, 'Cu ' + p.ingr].map(b => `<div class="chk"><i>✓</i>${b}</div>`).join('')}</div></div>
    ${prod(760, 650, 150, -3)}
    <div class="burst" style="width:200px;height:200px;left:830px;top:50px;background:${C.yellow};font:900 32px/1 Archivo;color:${C.ink}">30<br>CAPSULE</div>
    ${disc()}${foot(p.main, '#fff')}`) });

  // 3 Before / after – text split
  ads.push({ id: `${id(3)}-inainte-dupa`, html: page(`body{background:#fff}
    .l{position:absolute;left:0;top:0;width:540px;height:1016px;background:#DAD7D1}
    .r{position:absolute;left:540px;top:0;width:540px;height:1016px;background:${p.main}}
    .lab{position:absolute;top:56px;font:900 32px Archivo;letter-spacing:4px;text-transform:uppercase}
    .lst{position:absolute;top:140px;display:flex;flex-direction:column;gap:24px;width:430px}
    .x{display:flex;gap:16px;font:600 30px/1.2 Inter;color:#55524c}.x b{color:#B3261E;font:900 30px Inter}
    .v{display:flex;gap:16px;font:600 30px/1.2 Inter;color:#fff}.v b{color:${C.yellow};font:900 30px Inter}`,
    `<div class="l"></div><div class="r"></div>
    <div class="lab" style="left:60px;color:#6b6760">Înainte</div>
    <div class="lab" style="left:600px;color:${C.yellow}">Cu ${p.short}</div>
    <div class="lst" style="left:60px">${p.before.map(t => `<div class="x"><b>✕</b>${t}</div>`).join('')}</div>
    <div class="lst" style="left:600px">${p.after.map(t => `<div class="v"><b>✓</b>${t}</div>`).join('')}</div>
    ${prod(500, 410, 490)}
    <div class="abs" style="left:60px;top:950px;font:400 16px Inter;color:#6b6760;width:330px">Supliment alimentar. Rezultatele pot varia.</div>
    ${foot(C.ink, '#fff')}`) });

  // 4 Big aggressive hook – yellow
  ads.push({ id: `${id(4)}-hook`, html: page(`body{background:${C.yellow}}`,
    `${logo(64, 60)}
    <div class="abs" style="left:60px;top:150px;width:600px;display:flex;flex-direction:column;align-items:flex-start;gap:36px">
      <div class="h" style="font-size:80px;color:${C.ink}">${p.hook[0]}<br>${p.hook[1]}<br><span style="color:${C.red}">${p.hook[2]}</span></div>
      <div style="width:540px;font:600 32px/1.3 Inter">${p.short}, cu ${p.ingr}. ${p.ben[0]}.</div>
      <div class="cta" style="background:${C.ink};color:${C.yellow}">Comandă acum →</div></div>
    ${prod(660, 700, 220, 5)}${disc()}${foot(C.ink, C.yellow)}`) });

  // 5 + 6 UGC photo ads
  for (const [n, img, head, extra] of [[5, p.ugc1, p.ugc1H, 'top'], [6, p.ugc2, p.ugc2H, 'list']]) {
    ads.push({ id: `${id(n)}-ugc`, html: page(`body{background:#000}
      .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.65) 0%,rgba(0,0,0,0) 34%,rgba(0,0,0,0) 55%,rgba(0,0,0,.85) 100%)}`,
      `<img class="photo" src="${img}" style="left:0;top:0;width:1080px;height:1016px;object-position:50% 30%">
      <div class="shade"></div>
      <div class="abs h" style="left:56px;right:56px;top:56px;font-size:80px;color:#fff;text-shadow:0 4px 16px rgba(0,0,0,.5)">${head}</div>
      ${extra === 'list'
        ? `<div class="abs" style="left:56px;bottom:110px;display:flex;flex-direction:column;gap:12px">${p.ben.map(b => `<div class="pill" style="background:#fff;color:${p.main}">✓ ${b}</div>`).join('')}</div>`
        : `<div class="abs" style="left:56px;bottom:110px;width:600px"><div class="h" style="font-size:54px;color:${C.yellow}">${p.short}</div><div style="font:600 30px/1.3 Inter;color:#fff;margin-top:14px">${p.ben[0]}. ${p.ben[1]}.</div></div>`}
      <div class="abs cta" style="right:56px;bottom:110px;background:${C.yellow};color:${C.ink};font-size:28px">Comandă →</div>
      ${foot(p.main, '#fff')}`) });
  }

  // 7 Photo before / after
  ads.push({ id: `${id(7)}-poze-inainte-dupa`, html: page(`body{background:#fff}
    .ph{position:absolute;top:0;width:536px;height:840px;object-fit:cover;object-position:50% 40%}`,
    `<img class="ph" src="${p.ba[0]}" style="left:0;filter:saturate(.7) brightness(.92)"><img class="ph" src="${p.ba[1]}" style="left:544px">
    <div class="tag" style="left:40px;top:40px;background:#444">Înainte</div><div class="tag" style="left:584px;top:40px;background:${C.green}">După</div>
    <div class="abs" style="left:0;right:0;top:840px;height:176px;background:${p.main}"></div>
    ${prod(300, 60, 730)}
    <div class="abs h" style="left:260px;top:870px;font-size:52px;color:#fff">${p.baH[0]}</div>
    <div class="abs" style="left:262px;top:935px;font:600 30px Inter;color:${C.yellow}">${p.baH[1]}</div>
    <div class="abs" style="right:24px;top:990px;font:400 14px Inter;color:#c9d3ec">Imagini ilustrative. Rezultatele pot varia.</div>
    ${foot(C.ink, '#fff')}`) });

  // 8 Ingredient spotlight
  ads.push({ id: `${id(8)}-ingrediente`, html: page(`body{background:${p.main};color:#fff}
    .ring{position:absolute;left:330px;top:250px;width:420px;height:420px;border-radius:50%;background:rgba(255,255,255,.08)}`,
    `${logo(470, 56, 46, 'filter:brightness(0) invert(1)')}
    <div class="abs h" style="left:0;right:0;top:130px;text-align:center;font-size:64px">Ce e <span class="it" style="color:${C.yellow}">înăuntru</span>?</div>
    <div class="ring"></div>${prod(520, 405, 220)}
    ${p.ingrLong.map((t, i) => `<div class="abs" style="${i ? 'right' : 'left'}:56px;top:380px;width:280px;text-align:${i ? 'right' : 'left'}">
      <div style="width:70px;height:70px;border-radius:50%;background:${C.yellow};${i ? 'margin-left:auto;' : ''}margin-bottom:18px"></div>
      <div style="font:800 34px/1.15 Archivo">${t}</div></div>`).join('')}
    <div class="abs" style="left:0;right:0;top:800px;text-align:center;font:600 32px Inter">${p.ben.join(' · ')}</div>
    ${disc('#fff')}${foot(C.yellow, C.ink)}`) });

  // 9 Offer / CTA card
  ads.push({ id: `${id(9)}-oferta`, html: page(`body{background:${C.red};color:#fff}`,
    `${logo(64, 60, 46, 'filter:brightness(0) invert(1)')}
    <div class="abs h" style="left:64px;top:150px;font-size:${p.name.length > 13 ? 76 : 84}px">${p.name}</div>
    <div class="abs" style="left:64px;top:250px;font:600 32px Inter">30 capsule · cu ${p.ingr}</div>
    <div class="abs" style="left:60px;top:330px;color:#fff">${priceOr(230, 80)}</div>
    <div class="abs" style="left:64px;top:${p.price ? 600 : 590}px;width:560px;display:flex;flex-direction:column;gap:10px;font:700 30px/1.2 Inter">${p.ben.slice(0, 3).map(b => `<div>✓ ${b}</div>`).join('')}</div>
    <div class="abs cta" style="left:64px;top:810px;background:${C.yellow};color:${C.ink}">Comandă acum →</div>
    ${p.price ? `<div class="burst" style="width:230px;height:230px;right:40px;top:50px;background:${C.yellow};font:900 30px/1.05 Archivo;color:${C.ink}">PLATA LA<br>LIVRARE</div>` : ''}
    ${prod(640, 640, 270, 4)}${disc('#fff')}${foot(C.ink, '#fff')}`) });

  // 10 Attention marquee – dark
  const marquee = Array(8).fill('ATENȚIE').join(' · ');
  ads.push({ id: `${id(10)}-atentie`, html: page(`body{background:${C.ink};color:#fff}
    .mq{position:absolute;left:-20px;right:-20px;height:56px;background:${C.yellow};color:${C.ink};font:900 28px/56px Archivo;letter-spacing:3px;white-space:nowrap;overflow:hidden}`,
    `<div class="mq" style="top:0">${marquee}</div>
    <div class="abs" style="left:64px;top:110px;width:590px;display:flex;flex-direction:column;align-items:flex-start;gap:34px">
    <div class="h" style="font-size:62px">${p.attn[0]}<br><span style="color:${C.yellow}">${p.attn[1]}</span><br>${p.attn[2]}</div>
    <div style="width:560px;display:flex;flex-direction:column;gap:20px">
      ${p.why.map(([a, b], i) => `<div style="display:flex;gap:20px;align-items:flex-start"><div style="flex:none;width:52px;height:52px;border-radius:50%;background:${C.red};font:900 28px/52px Archivo;text-align:center">${i + 1}</div>
      <div><div style="font:800 30px Archivo">${a}</div><div style="font:400 23px Inter;opacity:.8;margin-top:4px">${b}</div></div></div>`).join('')}</div>
    <div class="cta" style="background:${C.yellow};color:${C.ink};font-size:30px">Comandă acum →</div></div>
    ${prod(700, 650, 180, 4)}${disc('#fff')}${foot(C.red, '#fff')}`) });
}
module.exports = ads;
