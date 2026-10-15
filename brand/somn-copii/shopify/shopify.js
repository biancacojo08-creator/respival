// Imagini pentru pagina de produs Shopify – NovoKids Somn Liniștit. 2000x2000 (design la 1080, randat la 1.852x).
// Render: node render.js [id-filter]
const C = {
  night: '#1B2150', night2: '#12163A', lav: '#C9BDF4', lav2: '#EFEBFD', moon: '#F7CB6E', honey: '#E9A23B',
  cream: '#FFF8EE', sand: '#F3E6CF', linden: '#7FA65A', leaf: '#2F5D3A', ink: '#1A1A2E', purple: '#6E4BC7', red: '#C8102E',
};
const FONTS = `
@font-face{font-family:Archivo;font-weight:900;src:url(../../../fonts/Archivo-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../../fonts/Inter-700.ttf)}`;
const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.abs{position:absolute}
.h{font-family:Archivo;font-weight:900;letter-spacing:-1.5px;line-height:1.02}
.it{font-family:Fraunces;font-style:italic;font-weight:600;letter-spacing:-.5px}
.prod{position:absolute;filter:drop-shadow(0 30px 28px rgba(20,20,50,.28)) drop-shadow(0 6px 8px rgba(20,20,50,.18))}
.logo{position:absolute;height:44px}
.badge{display:flex;align-items:center;gap:12px;padding:14px 22px;border-radius:999px;font:700 23px Inter;white-space:nowrap}
.star{position:absolute;border-radius:50%;background:#fff}
.card{position:absolute;width:300px;background:#fff;border-radius:28px;padding:26px 24px;box-shadow:0 14px 36px rgba(40,30,90,.10)}
.card .ic{width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:40px;margin-bottom:14px}
.card .ic svg{width:52px;height:52px}
.card b{display:block;font:900 29px/1.1 Archivo;letter-spacing:-.5px}
.card span{display:block;margin-top:8px;font:400 21px/1.35 Inter;color:#555}
.disc{position:absolute;left:0;right:0;bottom:22px;text-align:center;font:400 15px Inter;opacity:.6}
`;
const PROD = '../../product.png', LOGO = '../../../logo-novensa.png';
const prod = (h, x, y, rot = 0) => `<img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
const logo = (x, y, h = 44, extra = '') => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px;${extra}">`;
const white = 'filter:brightness(0) invert(1)';
const disc = (c = C.ink, t = 'Supliment alimentar. Conține miere – se administrează copiilor peste 1 an.') => `<div class="disc" style="color:${c}">${t}</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;
const stars = (n, seed, box) => {
  let s = seed; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: n }, () => { const d = 2 + r() * 4; return `<i class="star" style="left:${box[0] + r() * box[2]}px;top:${box[1] + r() * box[3]}px;width:${d}px;height:${d}px;opacity:${(.35 + r() * .6).toFixed(2)}"></i>`; }).join('');
};
const ico = {
  tei: c => `<svg viewBox="0 0 100 100"><path d="M50 88C20 70 8 50 14 32 20 16 40 14 50 30 60 14 80 16 86 32 92 50 80 70 50 88Z" fill="${c}"/><path d="M50 86V34M50 56 32 42M50 66 68 50" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/></svg>`,
  pasi: () => `<svg viewBox="0 0 100 100">${Array.from({ length: 10 }, (_, i) => `<ellipse cx="50" cy="22" rx="9" ry="22" fill="#fff" stroke="#B9A6EE" stroke-width="2" transform="rotate(${i * 36} 50 50)"/>`).join('')}${Array.from({ length: 24 }, (_, i) => `<line x1="50" y1="50" x2="50" y2="22" stroke="#6E4BC7" stroke-width="2.4" transform="rotate(${i * 15} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="12" fill="#8DBE5A"/><circle cx="50" cy="50" r="5" fill="#F2C94C"/></svg>`,
  miere: () => `<svg viewBox="0 0 100 100"><path d="M50 10C50 10 22 46 22 64a28 28 0 0 0 56 0C78 46 50 10 50 10Z" fill="#E9A23B"/><ellipse cx="40" cy="62" rx="6" ry="12" fill="#fff" opacity=".45"/></svg>`,
  apa: () => `<svg viewBox="0 0 100 100"><path d="M50 10C50 10 22 46 22 64a28 28 0 0 0 56 0C78 46 50 10 50 10Z" fill="#6FB7E8"/><ellipse cx="40" cy="62" rx="6" ry="12" fill="#fff" opacity=".55"/></svg>`,
};

const imgs = [];

// 1. Prezentare
imgs.push({ id: '01-prezentare', html: page(`body{background:${C.cream}}
  .sky{position:absolute;left:190px;top:170px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#2B3275,${C.night} 60%,${C.night2});overflow:hidden}
  .moon{position:absolute;left:720px;top:215px;width:110px;height:110px;border-radius:50%;box-shadow:inset -30px -6px 0 0 ${C.moon},0 0 50px ${C.moon}44}`,
  `${logo(468, 50)}
  <div class="abs h" style="left:0;right:0;top:110px;text-align:center;font-size:44px;color:${C.night}">Somn liniștit <span class="it" style="color:${C.honey}">pentru cei mici</span></div>
  <div class="sky">${stars(60, 7, [0, 0, 700, 700])}</div><div class="moon"></div>
  ${prod(720, 376, 200, 0)}
  <div class="abs" style="left:0;right:0;top:950px;display:flex;justify-content:center;gap:14px">
    <div class="badge" style="background:#fff;color:${C.leaf}">🌿 100% natural</div>
    <div class="badge" style="background:#fff;color:${C.night}">🇷🇴 Fabricat în România</div>
    <div class="badge" style="background:#fff;color:${C.honey}">🍯 Gust de miere</div></div>
  ${disc()}`) });

// 2. Beneficii
const ben = [['🌙', 'Seri mai calme', 'susține relaxarea înainte de culcare', 50, 200], ['😴', 'Adoarme mai ușor', 'un ritual de seară fără negocieri', 50, 560], ['🛏️', 'Somn liniștit', 'pentru nopți odihnite, ca toată familia să doarmă', 730, 200], ['☀️', 'Dimineți senine', 'copil odihnit, părinți relaxați', 730, 560]];
imgs.push({ id: '02-beneficii', html: page(`body{background:${C.lav2}}`,
  `${logo(468, 44)}
  <div class="abs h" style="left:0;right:0;top:100px;text-align:center;font-size:52px;color:${C.night}">Pentru seri calme <span class="it" style="color:${C.purple}">și nopți liniștite</span></div>
  ${ben.map(([e, b, s, x, y]) => `<div class="card" style="left:${x}px;top:${y}px"><div class="ic" style="background:${C.lav2}">${e}</div><b style="color:${C.night}">${b}</b><span>${s}</span></div>`).join('')}
  ${prod(700, 382, 250)}
  ${disc()}`) });

// 4. Ingrediente
const ing = [['tei', 'Flori de tei', 'susțin relaxarea și calmul, efect liniștitor blând', C.linden], ['pasi', 'Floarea pasiunii', 'Passiflora incarnata, contribuie la reducerea agitației', null], ['miere', 'Miere polifloră', 'gust plăcut, pe care copiii îl iubesc', null], ['apa', 'Apă purificată', 'atât. Fără coloranți artificiali.', null]];
imgs.push({ id: '04-ingrediente', html: page(`body{background:${C.cream}}
  .row{position:absolute;left:60px;width:600px;display:flex;align-items:center;gap:24px;background:#fff;border-radius:26px;padding:20px 24px;box-shadow:0 10px 28px rgba(120,90,40,.09)}
  .row .ic{flex:none;width:92px;height:92px;border-radius:50%;background:${C.cream};display:flex;align-items:center;justify-content:center}.row .ic svg{width:62px;height:62px}
  .row b{display:block;font:900 30px Archivo;color:${C.night};letter-spacing:-.5px}.row span{display:block;font:400 21px/1.35 Inter;color:#5d5648;margin-top:4px}`,
  `${logo(60, 52)}
  <div class="abs h" style="left:60px;top:130px;width:640px;font-size:60px;color:${C.night}">Doar 4 ingrediente. <span class="it" style="color:${C.honey}">Toate naturale.</span></div>
  ${ing.map(([k, b, s, c], i) => `<div class="row" style="top:${330 + i * 160}px"><div class="ic">${ico[k](c)}</div><div><b>${b}</b><span>${s}</span></div></div>`).join('')}
  ${prod(760, 730, 220, 3)}
  ${disc()}`) });

// 5. Mod de folosire
const steps = [['1', 'O linguriță de sirop', 'seara, înainte de culcare'], ['2', 'Lumină caldă, fără ecrane', 'liniștea începe cu ritualul'], ['3', 'O poveste scurtă…', 'și somn liniștit 🌙']];
imgs.push({ id: '05-mod-de-folosire', html: page(`body{background:radial-gradient(circle at 80% 30%,#2B3275,${C.night} 55%,${C.night2});color:#fff}
  .st{position:absolute;left:60px;width:600px;display:flex;gap:26px;align-items:center}
  .st .n{flex:none;width:96px;height:96px;border-radius:50%;background:${C.moon};color:${C.night};display:flex;align-items:center;justify-content:center;font:900 46px Archivo}
  .st b{display:block;font:900 34px Archivo;letter-spacing:-.5px}.st span{display:block;font:400 24px Inter;color:#cfd1ef;margin-top:6px}
  .ln{position:absolute;left:106px;top:400px;width:4px;height:360px;background:rgba(255,255,255,.18)}`,
  `${stars(70, 21, [0, 0, 1080, 1000])}${logo(60, 52, 44, white)}
  <div class="abs h" style="left:60px;top:140px;width:800px;font-size:58px">Ritualul de seară <span class="it" style="color:${C.moon}">în 3 pași</span></div>
  <div class="ln"></div>
  ${steps.map(([n, b, s], i) => `<div class="st" style="top:${340 + i * 190}px"><div class="n">${n}</div><div><b>${b}</b><span>${s}</span></div></div>`).join('')}
  ${prod(720, 730, 220, 4)}
  ${disc('#cfd1ef', 'Supliment alimentar. Conține miere – se administrează copiilor peste 1 an. Respectați doza de pe ambalaj.')}`) });

// 7. Conține / nu conține
imgs.push({ id: '07-contine-nu-contine', html: page(`body{background:#fff}
  .col{position:absolute;top:300px;width:330px;border-radius:30px;padding:34px 30px}
  .col h3{font:900 26px Archivo;letter-spacing:3px;margin-bottom:22px}
  .col div{display:flex;align-items:center;gap:14px;font:600 26px/1.2 Inter;margin-bottom:20px}
  .col i{flex:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 24px Inter;font-style:normal}
  .seal{position:absolute;left:826px;top:110px;width:200px;height:200px;border-radius:50%;background:${C.leaf};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font:900 44px/1 Archivo;transform:rotate(-8deg);box-shadow:0 0 0 8px #fff,0 0 0 11px ${C.leaf}}
  .seal small{font:700 18px Inter;letter-spacing:2px;margin-top:6px}`,
  `${logo(60, 52)}
  <div class="abs h" style="left:60px;top:130px;width:740px;font-size:50px;color:${C.night}">Știi exact ce îi dai <span class="it" style="color:${C.leaf}">celui mic.</span></div>
  <div class="seal">100%<small>NATURAL</small></div>
  <div class="col" style="left:60px;background:#F1F7EC;color:${C.leaf}"><h3>CONȚINE</h3>
    <div><i style="background:${C.leaf};color:#fff">✓</i>Flori de tei</div><div><i style="background:${C.leaf};color:#fff">✓</i>Floarea pasiunii</div>
    <div><i style="background:${C.leaf};color:#fff">✓</i>Miere polifloră</div><div><i style="background:${C.leaf};color:#fff">✓</i>Apă purificată</div></div>
  <div class="col" style="left:60px;top:690px;background:#FDF0F0;color:${C.red}"><h3>NU CONȚINE</h3>
    <div><i style="background:${C.red};color:#fff">✕</i>Coloranți artificiali</div><div style="margin-bottom:0"><i style="background:${C.red};color:#fff">✕</i>Conservanți</div></div>
  ${prod(760, 560, 270, 3)}
  ${disc()}`) });

// 3 & 6: lifestyle (fundal = poză AI cu cutia reală)
const life = (id, bg, head, sub, pills, dark) => ({ id, html: page(`body{background:#000 url(../${bg}) center/cover}
  .shade{position:absolute;left:0;right:0;top:0;height:400px;background:linear-gradient(${dark ? 'rgba(18,22,58,.86)' : 'rgba(255,248,238,.92)'},transparent)}`,
  `<div class="shade"></div>${logo(60, 52, 44, dark ? white : '')}
  <div class="abs h" style="left:60px;top:125px;width:980px;font-size:52px;color:${dark ? '#fff' : C.night}">${head}</div>
  <div class="abs" style="left:62px;top:200px;font:600 27px Inter;color:${dark ? '#dfe1f7' : '#4a4a5a'}">${sub}</div>
  <div class="abs" style="left:60px;top:255px;display:flex;gap:12px">${pills.map(p => `<div class="badge" style="background:${dark ? C.moon : C.night};color:${dark ? C.night : '#fff'}">${p}</div>`).join('')}</div>`) });
imgs.push(life('03-lifestyle-seara', 'lifestyle/L1-seara.jpg', 'Nopți liniștite <span class="it" style="color:#F7CB6E">pentru toată familia</span>', 'O linguriță seara, înainte de poveste.', ['🌙 Seri calme', '🌿 100% natural'], true));
imgs.push(life('06-lifestyle-dimineata', 'lifestyle/L2-dimineata.jpg', 'Dimineți senine, <span class="it" style="color:#E9A23B">copii odihniți</span>', 'Un somn bun azi înseamnă o zi bună mâine.', ['☀️ Gata de școală', '🇷🇴 Fabricat în România'], false));

module.exports = imgs.sort((a, b) => a.id.localeCompare(b.id));
