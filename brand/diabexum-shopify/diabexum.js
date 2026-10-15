// Imagini Shopify pentru Diabexum Forte Elite+ (capsule), 2000x2000. Paleta Novensa (brand/paleta-novensa) + bleumarinul de pe etichetă ca accent.
// Render: node render.js [id-filter]
const C = {
  surface: '#F4F6F1', raised: '#FFFFFF', tint: '#E3EBDD', ink: '#14201A', muted: '#55635B',
  brand: '#173B2C', gold: '#9C7A3F', goldText: '#7A5F2E',
  blue: '#1B3A6B', blueTint: '#E6EDF6', blueText: '#1E4F86',
};
const F = '../../fonts/';
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
.h em{font-style:italic;font-weight:500;color:${C.blueText}}
.label{font:700 17px Jakarta;letter-spacing:2.4px;text-transform:uppercase;color:${C.goldText}}
.prod{position:absolute;filter:drop-shadow(0 28px 26px rgba(20,32,26,.22)) drop-shadow(0 6px 8px rgba(20,32,26,.14))}
.logo{position:absolute;height:40px}
.badge{display:flex;align-items:center;gap:10px;padding:13px 22px;border-radius:999px;background:${C.raised};font:700 21px Jakarta;color:${C.brand};white-space:nowrap;box-shadow:0 8px 24px rgba(20,32,26,.08)}
.disc{position:absolute;left:0;right:0;bottom:24px;text-align:center;font:400 15px Jakarta;color:${C.muted}}
.ic{flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${C.blueTint}}
.ic svg{width:60%;height:60%}
`;
const PROD = '../produs.png', LOGO = '../../logo-novensa.png';
const prod = (h, x, y, rot = 0) => `<img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
const logo = (x, y) => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px">`;
const disc = (t = 'Supliment alimentar. Nu înlocuiește tratamentul medical și o dietă echilibrată. Dacă urmați un tratament, cereți sfatul medicului.') => `<div class="disc">${t}</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;

// iconițe liniare, grosime 1.75 la 24px
const sv = (p, c = C.blueText) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  bolt: sv('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>'),
  heart: sv('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>'),
  lock: sv('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  spray: sv('<rect x="7" y="9" width="8" height="12" rx="1.5"/><path d="M9 9V6h4v3M13 6h2.5l1 1.5"/><path d="M19 5h1.5M19 8h2M19 11h1.5"/>'),
  root: sv('<path d="M12 3v6M12 9c-3 2-4 6-3 12M12 9c3 2 4 6 3 12M12 13l-4 2M12 13l4 2"/>'),
  leaf: sv('<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 14 10"/>'),
  flower: sv('<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5C10 6 10.5 3.5 12 3c1.5.5 2 3 0 6.5M14.4 11.2c3.5-2 6-1.4 6.4.1-.3 1.5-2.8 2.3-6.4.6M13.6 14.3c2 3.5 1.4 6-.1 6.4-1.5-.3-2.3-2.8-.6-6.4M9.6 12.8c-3.5 2-6 1.4-6.4-.1.3-1.5 2.8-2.3 6.4-.6"/>'),
  fan: sv('<path d="M12 21V11M12 11C8 11 4 8 4 4c4 0 8 3 8 7ZM12 11c4 0 8-3 8-7-4 0-8 3-8 7Z"/>'),
  bean: sv('<ellipse cx="12" cy="12" rx="5" ry="7.5"/><path d="M12 4.5c-2 3-2 12 0 15"/>'),
  mush: sv('<path d="M4 12a8 8 0 0 1 16 0Z"/><path d="M10 12v6a2 2 0 0 0 4 0v-6"/>'),
  pepper: sv('<path d="M15 6c-6 1-10 7-11 14 6-1 11-5 12-11"/><path d="M15 6c0-2 1-3 3-3M15 6l2 2"/>'),
  drop: sv('<path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11Z"/>'),
  cup: sv('<path d="M6 8h12l-1.5 12h-9Z"/><path d="M12 2.5v3"/><circle cx="12" cy="6.5" r=".6"/>'),
  mineral: sv('<path d="M12 3 20 9l-3 11H7L4 9Z"/><path d="M4 9h16M12 3l-3 6 3 11 3-11Z"/>'),
  wave: sv('<path d="M3 12h4l2-5 3 10 2-5h7"/>'),
  capsule: sv('<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="m10 9.2 4 5.6"/>'),
  cactus: sv('<path d="M10 21V6a2 2 0 0 1 4 0v15M10 13H7a2 2 0 0 1-2-2V9M14 11h3a2 2 0 0 0 2-2V7M7 21h10"/>'),
  shell: sv('<path d="M12 20c-5 0-8-3-8-7 0-5 4-9 8-9s8 4 8 9c0 4-3 7-8 7Z"/><path d="M12 20V5M12 20 7 7M12 20l5-13"/>'),
  stick: sv('<path d="M5 19 19 5M8 20l12-12M4 16 16 4"/>'),
  clock: sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
};

const imgs = [];

// 1. Prezentare
imgs.push({ id: '01-prezentare', html: page(`
  .disk{position:absolute;left:250px;top:250px;width:580px;height:580px;border-radius:50%;background:${C.blueTint}}
  .ring{position:absolute;left:222px;top:222px;width:636px;height:636px;border-radius:50%;border:1.5px solid ${C.gold};opacity:.55}`,
  `${logo(463, 52)}
  <div class="abs label" style="left:0;right:0;top:122px;text-align:center">Formula avansată Forte Elite+</div>
  <div class="abs h" style="left:0;right:0;top:152px;text-align:center;font-size:56px">Echilibru glicemic, <em>în fiecare zi</em></div>
  <div class="ring"></div><div class="disk"></div>
  ${prod(600, 367, 282)}
  <div class="abs" style="left:0;right:0;top:938px;display:flex;justify-content:center;gap:14px">
    <div class="badge">Glicemie · Colesterol · Pofta de dulce</div>
    <div class="badge">30 de capsule</div></div>
  ${disc()}`) });

// 2. Beneficii
const ben = [
  [I.drop, 'Glicemie normală', 'susține nivelul normal al zahărului din sânge', 60, 300],
  [I.wave, 'Colesterol', 'susține nivelul normal al colesterolului', 60, 610],
  [I.leaf, 'Pofta de dulce', 'te ajută să o ții sub control, mai ales seara', 740, 300],
  [I.capsule, 'Formulă avansată', 'complex de ingrediente naturale, într-o capsulă', 740, 610],
];
imgs.push({ id: '02-beneficii', html: page(`
  .card{position:absolute;width:280px;background:${C.raised};border-radius:12px;padding:26px 24px;box-shadow:0 8px 24px rgba(20,32,26,.08)}
  .card .ic{width:68px;height:68px;margin-bottom:16px}
  .card b{display:block;font:800 25px/1.15 Jakarta;color:${C.brand}}
  .card span{display:block;margin-top:8px;font:400 19px/1.4 Jakarta;color:${C.muted}}
  .glow{position:absolute;left:330px;top:250px;width:420px;height:700px;border-radius:24px;background:${C.blueTint}}`,
  `${logo(463, 50)}
  <div class="abs label" style="left:0;right:0;top:120px;text-align:center">Ce face Diabexum Forte</div>
  <div class="abs h" style="left:0;right:0;top:150px;text-align:center;font-size:52px">Trei griji, <em>un singur flacon</em></div>
  <div class="glow"></div>
  ${ben.map(([ic, b, s, x, y]) => `<div class="card" style="left:${x}px;top:${y}px"><div class="ic">${ic}</div><b>${b}</b><span>${s}</span></div>`).join('')}
  ${prod(580, 372, 300)}
  ${disc()}`) });

// 3. Ingrediente + mod de folosire
const ing = [
  [I.cactus, 'Nopal', 'Opuntia ficus-indica', 'bogat în fibre, contribuie la senzația de sațietate'],
  [I.shell, 'Chitosan', 'fibră naturală', 'contribuie la menținerea nivelului normal al colesterolului'],
  [I.mineral, 'Crom picolinat', 'mineral esențial', 'contribuie la menținerea nivelului normal al glicemiei'],
  [I.stick, 'Scorțișoară', 'Cinnamomum cassia', 'folosită tradițional pentru echilibrul glicemic'],
];
imgs.push({ id: '03-ingrediente-mod-de-folosire', html: page(`
  .grid{position:absolute;left:60px;top:290px;width:620px;display:grid;grid-template-columns:1fr;gap:12px}
  .it{display:flex;align-items:center;gap:14px;background:${C.raised};border-radius:12px;padding:12px 16px;box-shadow:0 8px 24px rgba(20,32,26,.06)}
  .it.wide{grid-column:span 2}
  .it .ic{width:50px;height:50px}
  .it b{display:block;font:700 21px Jakarta;color:${C.ink}}.it b i{font:italic 400 17px Jakarta;color:${C.muted};margin-left:6px}.it span{display:block;margin-top:3px;font:400 17px/1.35 Jakarta;color:${C.muted}}
  .use{position:absolute;left:60px;top:770px;width:600px;background:${C.brand};border-radius:24px;padding:22px 30px;color:#fff;display:flex;gap:24px;align-items:center}
  .use .ic{width:84px;height:84px;background:rgba(255,255,255,.12)}
  .use small{display:block;font:700 15px Jakarta;letter-spacing:2.4px;color:#E2C68A;text-transform:uppercase}
  .use b{display:block;margin-top:6px;font:600 30px/1.1 Newsreader}
  .use span{display:block;margin-top:8px;font:400 18px/1.4 Jakarta;color:#d6e2da}
  .bg{position:absolute;right:0;top:0;width:400px;height:1080px;background:${C.blueTint}}`,
  `<div class="bg"></div>${logo(60, 52)}
  <div class="abs label" style="left:60px;top:132px">Formula</div>
  <div class="abs h" style="left:60px;top:162px;width:620px;font-size:52px">4 ingrediente active,<br><em>într‑o capsulă</em></div>
  <div class="grid">${ing.map(([ic, n, l, d]) => `<div class="it"><div class="ic">${ic}</div><div><b>${n}<i>${l}</i></b><span>${d}</span></div></div>`).join('')}</div>
  <div class="abs" style="left:62px;top:690px;width:600px;line-height:1.35;font:600 18px Jakarta;color:#55635B">Un flacon conține 30 de capsule.</div>
  <div class="use"><div class="ic">${sv('<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="m10 9.2 4 5.6"/>', '#fff')}</div><div><small>Mod de folosire</small><b>1 capsulă, de 1–3 ori pe zi</b><span>După mese, cu un pahar cu apă. Dacă urmați un tratament, întrebați medicul.</span></div></div>
  ${prod(600, 712, 250, 3)}
  ${disc()}`) });

module.exports = imgs;
