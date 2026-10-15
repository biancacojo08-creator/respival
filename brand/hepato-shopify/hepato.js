// Imagini Shopify pentru Ceai Hepato Nova Detox, 2000x2000. Paleta Novensa (brand/paleta-novensa) + portocaliul gălbenelelor de pe cutie ca accent.
// Render: node render.js [id-filter]
const C = {
  surface: '#F4F6F1', raised: '#FFFFFF', tint: '#E3EBDD', ink: '#14201A', muted: '#55635B',
  brand: '#173B2C', gold: '#9C7A3F', goldText: '#7A5F2E',
  blue: '#D9773F', blueTint: '#F7EADF', blueText: '#A44A1E',
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
const disc = (t = 'Supliment alimentar. Conține sunătoare: dacă urmați un tratament medical, cereți sfatul medicului.') => `<div class="disc">${t}</div>`;
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
  sun: sv('<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>'),
  clock: sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
};

const imgs = [];

// 1. Prezentare
imgs.push({ id: '01-prezentare', html: page(`
  .disk{position:absolute;left:250px;top:250px;width:580px;height:580px;border-radius:50%;background:${C.blueTint}}
  .ring{position:absolute;left:222px;top:222px;width:636px;height:636px;border-radius:50%;border:1.5px solid ${C.gold};opacity:.55}`,
  `${logo(463, 52)}
  <div class="abs label" style="left:0;right:0;top:122px;text-align:center">Ceai cu 5 plante pentru ficat</div>
  <div class="abs h" style="left:0;right:0;top:152px;text-align:center;font-size:56px">Un ficat odihnit, <em>o cană pe zi</em></div>
  <div class="ring"></div><div class="disk"></div>
  ${prod(600, 352, 282)}
  <div class="abs" style="left:0;right:0;top:938px;display:flex;justify-content:center;gap:14px">
    <div class="badge">5 plante · câte 20%</div>
    <div class="badge">30 de plicuri</div>
    <div class="badge">100% natural</div></div>
  ${disc()}`) });

// 2. Beneficii
const ben = [
  [I.leaf, 'Susține ficatul', 'armurariul și anghinarea, plantele cunoscute pentru ficat', 60, 300],
  [I.drop, 'Digestie ușoară', 'anghinarea și păpădia ajută digestia după mese', 60, 610],
  [I.flower, 'Fără adaosuri', 'fără arome artificiale și fără coloranți', 740, 300],
  [I.cup, 'Ritual simplu', 'o cană caldă, de 1–2 ori pe zi, între mese', 740, 610],
];
imgs.push({ id: '02-beneficii', html: page(`
  .card{position:absolute;width:280px;background:${C.raised};border-radius:12px;padding:26px 24px;box-shadow:0 8px 24px rgba(20,32,26,.08)}
  .card .ic{width:68px;height:68px;margin-bottom:16px}
  .card b{display:block;font:800 25px/1.15 Jakarta;color:${C.brand}}
  .card span{display:block;margin-top:8px;font:400 19px/1.4 Jakarta;color:${C.muted}}
  .glow{position:absolute;left:330px;top:250px;width:420px;height:700px;border-radius:24px;background:${C.blueTint}}`,
  `${logo(463, 50)}
  <div class="abs label" style="left:0;right:0;top:120px;text-align:center">Ce face Hepato Nova Detox</div>
  <div class="abs h" style="left:0;right:0;top:150px;text-align:center;font-size:52px">Pentru ficat și digestie, <em>din plante</em></div>
  <div class="glow"></div>
  ${ben.map(([ic, b, s, x, y]) => `<div class="card" style="left:${x}px;top:${y}px"><div class="ic">${ic}</div><b>${b}</b><span>${s}</span></div>`).join('')}
  ${prod(560, 364, 300)}
  ${disc()}`) });

// 3. Ingrediente + mod de folosire
const ing = [
  [I.leaf, 'Anghinare', 'Cynara scolymus, frunze', 'folosită tradițional pentru ficat și digestie'],
  [I.root, 'Armurariu', 'Silybum marianum, fructe', 'cunoscut pentru susținerea funcției hepatice'],
  [I.flower, 'Păpădie', 'Taraxacum officinale', 'ajută digestia'],
  [I.sun, 'Gălbenele', 'Calendula officinalis, flori', 'plantă blândă, folosită de generații'],
  [I.fan, 'Sunătoare', 'Hypericum perforatum', 'folosită tradițional pentru digestie'],
];
imgs.push({ id: '03-ingrediente-mod-de-folosire', html: page(`
  .grid{position:absolute;left:60px;top:240px;width:620px;display:grid;grid-template-columns:1fr;gap:10px}
  .it{display:flex;align-items:center;gap:14px;background:${C.raised};border-radius:12px;padding:12px 16px;box-shadow:0 8px 24px rgba(20,32,26,.06)}
  .it.wide{grid-column:span 2}
  .it .ic{width:50px;height:50px}
  .it b{display:block;font:700 21px Jakarta;color:${C.ink}}.it b i{font:italic 400 17px Jakarta;color:${C.muted};margin-left:6px}.it span{display:block;margin-top:3px;font:400 17px/1.35 Jakarta;color:${C.muted}}
  .use{position:absolute;left:60px;top:750px;width:600px;background:${C.brand};border-radius:24px;padding:22px 30px;color:#fff;display:flex;gap:24px;align-items:center}
  .use .ic{width:84px;height:84px;background:rgba(255,255,255,.12)}
  .use small{display:block;font:700 15px Jakarta;letter-spacing:2.4px;color:#F2B98F;text-transform:uppercase}
  .use b{display:block;margin-top:6px;font:600 30px/1.1 Newsreader}
  .use span{display:block;margin-top:8px;font:400 18px/1.4 Jakarta;color:#d6e2da}
  .bg{position:absolute;right:0;top:0;width:400px;height:1080px;background:${C.blueTint}}`,
  `<div class="bg"></div>${logo(60, 52)}
  <div class="abs label" style="left:60px;top:132px">Formula</div>
  <div class="abs h" style="left:60px;top:162px;width:620px;font-size:52px">5 plante, <em>în proporții egale</em></div>
  <div class="grid">${ing.map(([ic, n, l, d]) => `<div class="it"><div class="ic">${ic}</div><div><b>${n}<i>${l}</i></b><span>${d}</span></div></div>`).join('')}</div>
  <div class="abs" style="left:62px;top:700px;width:600px;line-height:1.35;font:600 18px Jakarta;color:#55635B">Câte 20% din fiecare plantă. 30 de plicuri, 45 g.</div>
  <div class="use"><div class="ic">${sv('<path d="M5 9h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5Z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M9 3c0 1.5 1.5 1.5 1.5 3M12.5 3c0 1.5 1.5 1.5 1.5 3"/>', '#fff')}</div><div><small>Mod de folosire</small><b>1 plic la 200 ml apă clocotită</b><span>Acoperit 4–5 minute. 1–2 căni pe zi, între mese. Cură de 3 luni, apoi o lună pauză.</span></div></div>
  ${prod(540, 712, 270, 3)}
  ${disc()}`) });

module.exports = imgs;
