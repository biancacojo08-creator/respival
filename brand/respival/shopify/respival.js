// Imagini Shopify pentru Respival (spray oral), 2000x2000. Paleta Novensa (brand/paleta-novensa) + turcoazul de pe cutie ca accent.
// Render: node render.js [id-filter]
const C = {
  surface: '#F4F6F1', raised: '#FFFFFF', tint: '#E3EBDD', ink: '#14201A', muted: '#55635B', line: '#C9D3C3',
  brand: '#173B2C', leaf: '#4E8A3E', gold: '#9C7A3F', goldText: '#7A5F2E',
  teal: '#7EC8CC', tealTint: '#E4F2F2', tealText: '#256569',
};
const F = '../../../fonts/';
const CSS = `
@font-face{font-family:Newsreader;font-weight:600;src:url(${F}Newsreader-600.ttf)}
@font-face{font-family:Newsreader;font-weight:500;font-style:italic;src:url(${F}Newsreader-500i.ttf)}
@font-face{font-family:Jakarta;font-weight:400;src:url(${F}PlusJakartaSans-400.ttf)}
@font-face{font-family:Jakarta;font-weight:600;src:url(${F}PlusJakartaSans-600.ttf)}
@font-face{font-family:Jakarta;font-weight:700;src:url(${F}PlusJakartaSans-700.ttf)}
@font-face{font-family:Jakarta;font-weight:800;src:url(${F}PlusJakartaSans-800.ttf)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Jakarta,sans-serif;position:relative;color:${C.ink};background:${C.surface}}
.abs{position:absolute}
.h{font-family:Newsreader;font-weight:600;letter-spacing:-.5px;line-height:1.04;color:${C.ink}}
.h em{font-style:italic;font-weight:500;color:${C.tealText}}
.label{font:700 17px Jakarta;letter-spacing:2.4px;text-transform:uppercase;color:${C.goldText}}
.prod{position:absolute;filter:drop-shadow(0 28px 26px rgba(20,32,26,.22)) drop-shadow(0 6px 8px rgba(20,32,26,.14))}
.logo{position:absolute;height:40px}
.badge{display:flex;align-items:center;gap:10px;padding:13px 22px;border-radius:999px;background:${C.raised};font:700 21px Jakarta;color:${C.brand};white-space:nowrap;box-shadow:0 8px 24px rgba(20,32,26,.08)}
.stars{color:${C.gold};letter-spacing:2px}
.disc{position:absolute;left:0;right:0;bottom:24px;text-align:center;font:400 15px Jakarta;color:${C.muted}}
.ic{flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${C.tealTint}}
.ic svg{width:60%;height:60%}
`;
const PROD = '../produs.png', LOGO = '../../../logo-novensa.png';
const prod = (h, x, y, rot = 0) => `<img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
const logo = (x, y) => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px">`;
const disc = (t = 'Supliment alimentar. Nu înlocuiește o dietă variată și echilibrată.') => `<div class="disc">${t}</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;

// iconițe liniare, grosime 1.75 la 24px (scalate)
const sv = p => `<svg viewBox="0 0 24 24" fill="none" stroke="${C.tealText}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  throat: sv('<path d="M8 3v5a4 4 0 0 0 8 0V3"/><path d="M10 12v9M14 12v9"/><path d="M7 17h3M14 17h3"/>'),
  cool: sv('<path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5 4.9 17.5"/><path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2"/>'),
  shield: sv('<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6Z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>'),
  leaf: sv('<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 14 10"/>'),
  drop: sv('<path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11Z"/>'),
  flower: sv('<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5C10 6 10.5 3.5 12 3c1.5.5 2 3 0 6.5M14.4 11.2c3.5-2 6-1.4 6.4.1-.3 1.5-2.8 2.3-6.4.6M13.6 14.3c2 3.5 1.4 6-.1 6.4-1.5-.3-2.3-2.8-.6-6.4M9.6 12.8c-3.5 2-6 1.4-6.4-.1.3-1.5 2.8-2.3 6.4-.6"/>'),
  sun: sv('<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>'),
  root: sv('<path d="M4 15c3-1 4-4 7-4s5 2 9 1"/><path d="M8 13.5 7 9M13 11.2l1-4.2M16 12.2l2 3.3M10 12l-1 5"/>'),
  spray: sv('<rect x="7" y="9" width="8" height="12" rx="1.5"/><path d="M9 9V6h4v3M13 6h2.5l1 1.5"/><path d="M19 5h1.5M19 8h2M19 11h1.5"/>'),
};

const imgs = [];

// 1. Prezentare
imgs.push({ id: '01-prezentare', html: page(`
  .disk{position:absolute;left:250px;top:250px;width:580px;height:580px;border-radius:50%;background:${C.tealTint}}
  .ring{position:absolute;left:222px;top:222px;width:636px;height:636px;border-radius:50%;border:1.5px solid ${C.gold};opacity:.55}`,
  `${logo(463, 52)}
  <div class="abs label" style="left:0;right:0;top:122px;text-align:center">Spray oral cu plante</div>
  <div class="abs h" style="left:0;right:0;top:152px;text-align:center;font-size:56px">Gât liniștit, <em>respirație ușoară</em></div>
  <div class="ring"></div><div class="disk"></div>
  ${prod(640, 412, 268)}
  <div class="abs" style="left:0;right:0;top:938px;display:flex;justify-content:center;gap:14px">
    <div class="badge"><span class="stars">★★★★★</span>Peste 600 de recenzii</div>
    <div class="badge">30 ml · 1–2 pufuri</div>
    <div class="badge">Fabricat în România</div></div>
  ${disc()}`) });

// 2. Beneficii
const ben = [
  [I.throat, 'Calmează gâtul', 'ajută la ameliorarea tusei și a iritației gâtului', 60, 300],
  [I.cool, 'Efect răcoritor', 'senzație de prospețime, imediat după puf', 60, 610],
  [I.shield, 'Protecție locală', 'susține rezistența zonei gâtului în sezonul rece', 740, 300],
  [I.leaf, 'Ingrediente naturale', 'propolis, nalbă, salvie, mușețel, eucalipt, ghimbir', 740, 610],
];
imgs.push({ id: '02-beneficii', html: page(`
  .card{position:absolute;width:280px;background:${C.raised};border-radius:12px;padding:26px 24px;box-shadow:0 8px 24px rgba(20,32,26,.08)}
  .card .ic{width:68px;height:68px;margin-bottom:16px}
  .card b{display:block;font:800 25px/1.15 Jakarta;color:${C.brand}}
  .card span{display:block;margin-top:8px;font:400 19px/1.4 Jakarta;color:${C.muted}}
  .glow{position:absolute;left:330px;top:250px;width:420px;height:700px;border-radius:24px;background:${C.tint}}`,
  `${logo(463, 50)}
  <div class="abs label" style="left:0;right:0;top:120px;text-align:center">Ce face Respival</div>
  <div class="abs h" style="left:0;right:0;top:150px;text-align:center;font-size:52px">Pentru gâtul iritat <em>din sezonul rece</em></div>
  <div class="glow"></div>
  ${ben.map(([ic, b, s, x, y]) => `<div class="card" style="left:${x}px;top:${y}px"><div class="ic">${ic}</div><b>${b}</b><span>${s}</span></div>`).join('')}
  ${prod(640, 412, 282)}
  ${disc()}`) });

// 3. Ingrediente + mod de folosire
const ing = [[I.drop, 'Propolis'], [I.flower, 'Nalbă'], [I.leaf, 'Salvie'], [I.sun, 'Mușețel'], [I.leaf, 'Eucalipt'], [I.root, 'Ghimbir']];
imgs.push({ id: '03-ingrediente-mod-de-folosire', html: page(`
  .grid{position:absolute;left:60px;top:300px;width:600px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .it{display:flex;align-items:center;gap:16px;background:${C.raised};border-radius:12px;padding:16px 18px;box-shadow:0 8px 24px rgba(20,32,26,.06)}
  .it .ic{width:56px;height:56px}
  .it b{font:700 23px Jakarta;color:${C.ink}}
  .use{position:absolute;left:60px;top:700px;width:600px;background:${C.brand};border-radius:24px;padding:30px 34px;color:#fff;display:flex;gap:24px;align-items:center}
  .use .ic{width:84px;height:84px;background:rgba(255,255,255,.12)}
  .use .ic svg{stroke:#fff}
  .use small{display:block;font:700 15px Jakarta;letter-spacing:2.4px;color:${C.teal};text-transform:uppercase}
  .use b{display:block;margin-top:6px;font:600 34px/1.1 Newsreader}
  .use span{display:block;margin-top:8px;font:400 18px/1.4 Jakarta;color:#d6e2da}
  .bg{position:absolute;right:0;top:0;width:400px;height:1080px;background:${C.tealTint}}`,
  `<div class="bg"></div>${logo(60, 52)}
  <div class="abs label" style="left:60px;top:132px">Formula</div>
  <div class="abs h" style="left:60px;top:162px;width:620px;font-size:52px">Propolis și plante,<br><em>într‑un spray</em></div>
  <div class="grid">${ing.map(([ic, n]) => `<div class="it"><div class="ic">${ic}</div><b>${n}</b></div>`).join('')}</div>
  <div class="abs" style="left:62px;top:640px;font:600 19px Jakarta;color:${C.muted}">…și alte extracte din plante</div>
  <div class="use"><div class="ic">${I.spray}</div><div><small>Mod de folosire</small><b>1–2 pufuri direct pe gât</b><span>Respectați doza recomandată pe ambalaj.</span></div></div>
  ${prod(660, 744, 240, 3)}
  ${disc()}`) });

module.exports = imgs;
