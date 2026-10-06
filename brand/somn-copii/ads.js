// Novokids Somn Liniștit (sirop pentru copii) – 10 statice Facebook/Instagram, 1080x1080.
// Render: node render.js [id-filter]
// Produsul: somn-copii/product.png (cutia NovoKids decupată din sirsom.png). Fără el se folosește o sticlă ilustrată.
// Ingrediente conform cutiei: mușețel, levănțică, tei, miere, lămâie.
const fs = require('fs'), path = require('path');

const FONTS = `
@font-face{font-family:Archivo;font-weight:800;src:url(../../fonts/Archivo-800.ttf)}
@font-face{font-family:Archivo;font-weight:900;src:url(../../fonts/Archivo-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:800;src:url(../../fonts/Fraunces-800i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Barlow;font-weight:800;src:url(../../fonts/BarlowCondensed-800.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
`;

// palette – noapte liniștită, miere, tei, lavandă
const C = {
  night: '#1B2150', night2: '#12163A', lav: '#C9BDF4', lav2: '#EDE8FC', moon: '#F7CB6E', honey: '#E9A23B',
  cream: '#FFF7EA', sand: '#F3E6CF', linden: '#7FA65A', leaf: '#2F5D3A', blush: '#FBE3DC', rose: '#7A2E45',
  sun: '#FFE7A3', ink: '#1A1A2E', red: '#D7263D',
};

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.abs{position:absolute}
.h{font-family:Archivo;font-weight:900;letter-spacing:-2px;line-height:1}
.it{font-family:Fraunces;font-style:italic;font-weight:600;letter-spacing:-.5px}
.hand{font-family:Caveat;font-weight:700}
.logo{position:absolute;height:46px}
.pill{display:inline-flex;align-items:center;gap:12px;padding:14px 26px;border-radius:999px;font:700 27px Inter;white-space:nowrap}
.stars{color:#F2A900;letter-spacing:3px}
.chk{display:flex;align-items:flex-start;gap:18px;font:600 31px/1.25 Inter}
.chk i{flex:none;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 26px Inter;font-style:normal;margin-top:-1px}
.burst{position:absolute;display:flex;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
.foot{position:absolute;left:0;right:0;bottom:0;height:64px;display:flex;align-items:center;justify-content:center;gap:30px;font:600 21px Inter;letter-spacing:.3px}
.foot span:before{content:"✓ ";font-weight:800}
.disc{position:absolute;left:0;right:0;bottom:72px;text-align:center;font:400 15px Inter;opacity:.65}
.btn{position:absolute;padding:22px 40px;border-radius:18px;font:900 34px Archivo;letter-spacing:.5px}
.star{position:absolute;border-radius:50%;background:#fff}
.moon{position:absolute;border-radius:50%}
.cloud{position:absolute;background:#fff;border-radius:999px}
.cloud:before,.cloud:after{content:"";position:absolute;background:inherit;border-radius:50%}
.cloud:before{width:46%;height:150%;left:14%;bottom:30%}
.cloud:after{width:36%;height:120%;left:48%;bottom:35%}
/* sticla ilustrată */
.btl{position:absolute;width:300px;height:700px;transform-origin:top left;filter:drop-shadow(0 34px 30px rgba(0,0,0,.35)) drop-shadow(0 8px 10px rgba(0,0,0,.2))}
.btl .cap{position:absolute;left:70px;top:0;width:160px;height:112px;border-radius:16px 16px 8px 8px;background:repeating-linear-gradient(90deg,#fff 0 9px,#e6e6ee 9px 12px),#fff;box-shadow:inset -14px 0 18px rgba(0,0,0,.12)}
.btl .neck{position:absolute;left:92px;top:104px;width:116px;height:56px;background:linear-gradient(90deg,#3d1d05,#a65a17 40%,#5a2c08)}
.btl .body{position:absolute;left:0;top:146px;width:300px;height:554px;border-radius:110px 110px 42px 42px;background:linear-gradient(90deg,#4a2306,#a65a17 22%,#e09442 42%,#b8671f 62%,#6b350c 88%,#3d1d05)}
.btl .shine{position:absolute;left:40px;top:60px;width:26px;height:420px;border-radius:20px;background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,.05))}
.btl .label{position:absolute;left:20px;right:20px;top:150px;height:320px;border-radius:20px;background:${C.cream};display:flex;flex-direction:column;align-items:center;padding-top:26px;text-align:center;overflow:hidden}
.btl .label img{height:34px}
.btl .label .moonl{width:50px;height:50px;border-radius:50%;box-shadow:inset -14px -2px 0 0 ${C.moon};margin:12px 0 2px}
.btl .label b{font:900 50px/0.95 Archivo;color:${C.night};letter-spacing:-1px}
.btl .label small{display:block;margin-top:12px;font:700 19px Inter;color:${C.leaf};letter-spacing:2px;text-transform:uppercase}
.btl .label .band{position:absolute;left:0;right:0;bottom:0;height:56px;background:${C.night};color:${C.moon};font:700 17px/56px Inter;letter-spacing:1px}
.prod{position:absolute;filter:drop-shadow(0 34px 34px rgba(0,0,0,.35)) drop-shadow(0 8px 10px rgba(0,0,0,.25))}
`;

const REAL = path.join(__dirname, 'product.png');
const LOGO = '../../logo-novensa.png';
// h = înălțimea afișată în px
const bottle = (h, x, y, rot = 0) => fs.existsSync(REAL)
  ? `<img class="prod" src="../product.png" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`
  : `<div class="btl" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg) scale(${(h / 700).toFixed(3)})">
      <div class="cap"></div><div class="neck"></div>
      <div class="body"><div class="shine"></div><div class="label"><img src="${LOGO}"><div class="moonl"></div>
      <b>Somn<br>Liniștit</b><small>sirop pentru copii</small><div class="band">MUȘEȚEL · LEVĂNȚICĂ · TEI</div></div></div></div>`;
const logo = (x, y, h = 46, extra = '') => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px;${extra}">`;
const white = 'filter:brightness(0) invert(1)';
const foot = (bg, fg) => `<div class="foot" style="background:${bg};color:${fg}"><span>100% natural</span><span>Fabricat în România</span><span>Fără conservanți</span></div>`;
const disc = (c = C.ink, t = 'Supliment alimentar. Conține miere – nu se administrează copiilor sub 1 an. Rezultatele pot varia.') => `<div class="disc" style="color:${c}">${t}</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;

// deterministic starfield
const stars = (n, seed = 7, box = [0, 0, 1080, 1000]) => {
  let s = seed; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: n }, () => {
    const d = 2 + r() * 4;
    return `<i class="star" style="left:${box[0] + r() * box[2]}px;top:${box[1] + r() * box[3]}px;width:${d}px;height:${d}px;opacity:${(.35 + r() * .6).toFixed(2)}"></i>`;
  }).join('');
};
const moon = (d, x, y, c = C.moon) => `<div class="moon" style="width:${d}px;height:${d}px;left:${x}px;top:${y}px;box-shadow:inset ${-d * .28}px ${-d * .06}px 0 0 ${c},0 0 ${d * .6}px ${c}33"></div>`;
const cloud = (w, x, y, o = 1, c = '#fff') => `<div class="cloud" style="width:${w}px;height:${w * .32}px;left:${x}px;top:${y}px;opacity:${o};background:${c}"></div>`;

// SVG icons
const ico = {
  tei: c => `<svg viewBox="0 0 100 100"><path d="M50 88C20 70 8 50 14 32 20 16 40 14 50 30 60 14 80 16 86 32 92 50 80 70 50 88Z" fill="${c}"/><path d="M50 86V34M50 56 32 42M50 66 68 50" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/></svg>`,
  pasi: () => `<svg viewBox="0 0 100 100">${Array.from({ length: 10 }, (_, i) => `<ellipse cx="50" cy="22" rx="9" ry="22" fill="#fff" stroke="#B9A6EE" stroke-width="2" transform="rotate(${i * 36} 50 50)"/>`).join('')}${Array.from({ length: 24 }, (_, i) => `<line x1="50" y1="50" x2="50" y2="22" stroke="#6E4BC7" stroke-width="2.4" transform="rotate(${i * 15} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="12" fill="#8DBE5A"/><circle cx="50" cy="50" r="5" fill="#F2C94C"/></svg>`,
  miere: () => `<svg viewBox="0 0 100 100"><path d="M50 10C50 10 22 46 22 64a28 28 0 0 0 56 0C78 46 50 10 50 10Z" fill="#E9A23B"/><ellipse cx="40" cy="62" rx="6" ry="12" fill="#fff" opacity=".45"/></svg>`,
  apa: () => `<svg viewBox="0 0 100 100"><path d="M50 10C50 10 22 46 22 64a28 28 0 0 0 56 0C78 46 50 10 50 10Z" fill="#6FB7E8"/><ellipse cx="40" cy="62" rx="6" ry="12" fill="#fff" opacity=".55"/></svg>`,
  musetel: () => `<svg viewBox="0 0 100 100">${Array.from({ length: 14 }, (_, i) => `<ellipse cx="50" cy="24" rx="7" ry="20" fill="#fff" stroke="#E4E0D4" stroke-width="1.5" transform="rotate(${i * 25.7} 50 50)"/>`).join('')}<circle cx="50" cy="50" r="15" fill="#F5B92E"/><circle cx="46" cy="46" r="5" fill="#FFD866"/></svg>`,
  lavanda: () => `<svg viewBox="0 0 100 100"><path d="M50 95V30" stroke="#6B9A4A" stroke-width="4" stroke-linecap="round"/><path d="M50 70 34 58M50 78 66 66" stroke="#6B9A4A" stroke-width="3.5" stroke-linecap="round"/>${[14, 24, 34, 44, 54].map((y, i) => `<ellipse cx="${i % 2 ? 57 : 43}" cy="${y}" rx="8" ry="6" fill="${i % 2 ? '#8E6FD8' : '#A68BE6'}"/><ellipse cx="${i % 2 ? 43 : 57}" cy="${y + 4}" rx="8" ry="6" fill="#7A5AC9"/>`).join('')}</svg>`,
  lamaie: () => `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F5C518"/><circle cx="50" cy="50" r="33" fill="#FFF3B0"/>${Array.from({ length: 8 }, (_, i) => `<path d="M50 50 L${50 + 30 * Math.cos(i * Math.PI / 4 - .3)} ${50 + 30 * Math.sin(i * Math.PI / 4 - .3)} A30 30 0 0 1 ${50 + 30 * Math.cos(i * Math.PI / 4 + .3)} ${50 + 30 * Math.sin(i * Math.PI / 4 + .3)}Z" fill="#FFD84A"/>`).join('')}<circle cx="50" cy="50" r="4" fill="#fff"/></svg>`,
  cup: () => `<svg viewBox="0 0 200 170"><path d="M60 30c-6-14 8-18 2-30M100 30c-6-14 8-18 2-30" stroke="#C9B79A" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M20 50h140v40a70 70 0 0 1-140 0Z" fill="#fff" stroke="#E2D3B8" stroke-width="4"/><path d="M160 64c30 0 30 44 0 44" stroke="#E2D3B8" stroke-width="12" fill="none"/><ellipse cx="90" cy="54" rx="66" ry="8" fill="#D9A441"/><ellipse cx="90" cy="162" rx="90" ry="8" fill="#000" opacity=".08"/></svg>`,
};
const leaf = (s, x, y, rot, c = C.linden, o = 1) => `<div class="abs" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform:rotate(${rot}deg);opacity:${o}">${ico.tei(c)}</div>`;

// ---------------------------------------------------------------- ads
const ads = [];

// 1. Ora 23:47 – persona A (mama epuizată)
ads.push({ id: 'S01-ora-2347', html: page(`body{background:radial-gradient(circle at 80% 15%,#2B3275,${C.night} 45%,${C.night2});color:#fff}
  .clock{font:800 170px/1 Barlow;color:${C.moon};letter-spacing:4px;text-shadow:0 0 40px ${C.moon}55}`,
  `${stars(70)}${moon(150, 860, 70)}${cloud(260, 640, 900, .08)}
  ${logo(60, 60, 44, white)}
  <div class="abs clock" style="left:56px;top:150px">23:47</div>
  <div class="abs h" style="left:60px;top:340px;width:600px;font-size:62px">A treia trezire<br>în seara asta.</div>
  <div class="abs it" style="left:60px;top:490px;width:600px;font-size:50px;line-height:1.1;color:${C.lav}">Până am descoperit siropul cu mușețel, levănțică și tei.</div>
  <div class="abs" style="left:60px;top:690px;display:flex;flex-direction:column;gap:14px">
    <div class="pill" style="background:${C.moon};color:${C.night}">🌙 O linguriță seara</div>
    <div class="pill" style="background:rgba(255,255,255,.12);color:#fff">Relaxat în 20–30 de minute*</div></div>
  <div class="abs" style="left:62px;top:850px;font:400 18px Inter;color:#b9bce0">*experiența raportată de părinți</div>
  ${bottle(700, 720, 250, 5)}${disc('#cfd1ef')}${foot(C.moon, C.night)}`) });

// 2. Doar 4 ingrediente – persona C (mama naturistă)
const ing4 = [['musetel', 'Mușețel', 'calm blând', 60, 310, null], ['lavanda', 'Levănțică', 'relaxare', 60, 520, null], ['tei', 'Tei', '„ceaiul bunicii”', 60, 730, C.linden], ['miere', 'Miere', 'gust plăcut', 750, 400, null], ['lamaie', 'Lămâie', 'prospețime', 750, 620, null]];
ads.push({ id: 'S02-5-ingrediente', html: page(`body{background:${C.cream}}
  .ing{position:absolute;width:270px;display:flex;flex-direction:column;align-items:center;text-align:center}
  .ing .c{width:120px;height:120px;border-radius:50%;background:#fff;box-shadow:0 12px 30px rgba(120,90,40,.15);display:flex;align-items:center;justify-content:center}
  .ing .c svg{width:84px;height:84px}
  .ing b{margin-top:14px;font:900 30px Archivo;color:${C.night};letter-spacing:-.5px}.ing small{font:400 24px Inter;color:#6b6457}`,
  `${leaf(160, -40, 860, 30, C.linden, .25)}${leaf(120, 960, 220, -20, C.linden, .25)}
  ${logo(440, 50, 46)}
  <div class="abs h" style="left:0;right:0;top:135px;text-align:center;font-size:66px;color:${C.night}">5 ingrediente. <span class="it" style="color:${C.honey}">100% naturale.</span></div>
  <div class="abs" style="left:0;right:0;top:225px;text-align:center;font:600 30px Inter;color:#5d5648">Fără coloranți artificiali · Fără conservanți</div>
  ${ing4.map(([k, n, s, x, y, c]) => `<div class="ing" style="left:${x}px;top:${y}px"><div class="c">${ico[k](c)}</div><b>${n}</b><small>${s}</small></div>`).join('')}
  ${bottle(640, 395, 300)}${disc()}${foot(C.night, '#fff')}`) });

// 3. Seara: înainte / acum – persona B
ads.push({ id: 'S03-seara-inainte-acum', html: page(`body{background:#fff}
  .l{position:absolute;left:0;top:0;width:540px;height:1016px;background:#E4E1EC}
  .r{position:absolute;left:540px;top:0;width:540px;height:1016px;background:${C.night}}
  .lab{position:absolute;top:60px;font:900 34px Archivo;letter-spacing:4px;text-transform:uppercase}
  .lst{position:absolute;top:150px;display:flex;flex-direction:column;gap:26px;width:440px}
  .x{display:flex;gap:16px;font:600 31px/1.2 Inter;color:#5a566a}.x b{color:${C.red};font:900 31px Inter}
  .v{display:flex;gap:16px;font:600 31px/1.2 Inter;color:#fff}.v b{color:${C.moon};font:900 31px Inter}`,
  `<div class="l"></div><div class="r"></div>${stars(30, 3, [560, 20, 500, 380])}
  <div class="lab" style="left:60px;color:#7c7790">Seara, înainte</div>
  <div class="lab" style="left:600px;color:${C.moon}">Seara, acum</div>
  <div class="lst" style="left:60px"><div class="x"><b>✕</b>„Încă o apă!”</div><div class="x"><b>✕</b>„Încă o poveste!”</div><div class="x"><b>✕</b>„Nu vreau la somn!”</div><div class="x"><b>✕</b>2 ore până adoarme</div></div>
  <div class="lst" style="left:600px"><div class="v"><b>✓</b>O linguriță de sirop</div><div class="v"><b>✓</b>Lumină caldă, o poveste</div><div class="v"><b>✓</b>Relaxat în 20–30 min*</div><div class="v"><b>✓</b>Seara e iar a noastră</div></div>
  ${bottle(560, 430, 450, 0)}
  <div class="abs" style="left:60px;top:930px;font:400 16px Inter;color:#7c7790;width:320px">*Experiențe raportate de părinți. Supliment alimentar. Rezultatele pot varia.</div>
  ${logo(790, 950, 38, white)}
  ${foot(C.moon, C.night)}`) });

// 4. Ofertă -44% – retargeting
ads.push({ id: 'S04-oferta-44', html: page(`body{background:radial-gradient(circle at 75% 40%,#2B3275,${C.night} 50%,${C.night2});color:#fff}`,
  `${stars(60, 11)}
  ${logo(60, 60, 44, white)}
  <div class="abs" style="left:60px;top:150px;font:800 30px Inter;letter-spacing:3px;color:${C.moon}">⏰ DOAR CÂTEVA ZILE</div>
  <div class="abs h" style="left:56px;top:200px;width:640px;font-size:74px">Somn liniștit <span class="it" style="color:${C.lav}">pentru cel mic,</span> la jumătate de preț.</div>
  <div class="abs" style="left:60px;top:560px;font:600 40px Inter;color:#a9add6;text-decoration:line-through;text-decoration-color:${C.red};text-decoration-thickness:4px">119,99 lei</div>
  <div class="abs" style="left:54px;top:610px;font:800 170px/1 Barlow;color:#fff;letter-spacing:-2px">66,99<span style="font-size:64px;margin-left:10px">lei</span></div>
  <div class="btn" style="left:60px;top:810px;background:${C.moon};color:${C.night}">Profită de ofertă →</div>
  <div class="burst" style="width:240px;height:240px;left:800px;top:70px;background:${C.red};font:900 64px/1 Archivo;color:#fff;transform:rotate(-8deg)">−44%</div>
  ${bottle(640, 740, 300, 6)}${disc('#cfd1ef', 'Supliment alimentar. Stoc limitat. Conține miere – nu se administrează copiilor sub 1 an.')}${foot(C.moon, C.night)}`) });

// 5. Ce spun părinții – recenzii
const rev = [['„După câteva zile adoarme mult mai repede și se trezește odihnit.”', 150], ['„I-l dau seara și în 20–30 de minute e deja relaxat.”', 410], ['„Ingrediente naturale, iar dimineața nu mai e iritat.”', 650]];
ads.push({ id: 'S05-recenzii', html: page(`body{background:${C.blush}}
  .card{position:absolute;left:56px;width:640px;background:#fff;border-radius:30px;padding:30px 36px;box-shadow:0 16px 40px rgba(122,46,69,.13)}
  .card q{display:block;quotes:none;font:600 34px/1.22 Fraunces;font-style:italic;color:${C.rose};margin-top:8px}
  .card small{display:block;margin-top:12px;font:700 21px Inter;color:#444}`,
  `${logo(56, 50, 42)}
  <div class="abs h" style="left:360px;top:52px;font-size:46px;color:${C.rose}">Ce spun <span class="it">părinții</span></div>
  ${rev.map(([t, y]) => `<div class="card" style="top:${y}px"><div class="stars" style="font-size:34px">★★★★★</div><q>${t}</q><small>Părinte, client verificat <span style="color:#2E7D32">✔</span></small></div>`).join('')}
  ${bottle(640, 740, 260, 4)}
  ${disc(C.rose, 'Recenzii de pe novensa-romania.ro. Supliment alimentar. Rezultatele pot varia. Nu se administrează sub 1 an.')}${foot(C.rose, '#fff')}`) });

// 6. Dimineți cu zâmbet – persona E
ads.push({ id: 'S06-dimineti-zambet', html: page(`body{background:linear-gradient(180deg,${C.sun},${C.cream} 70%)}
  .sun{position:absolute;right:-90px;top:-90px;width:440px;height:440px;border-radius:50%;background:radial-gradient(#FFD35C,#FFB72B);box-shadow:0 0 0 40px #FFD35C44,0 0 0 90px #FFD35C22}
  .chk i{background:${C.honey};color:#fff}`,
  `<div class="sun"></div>${cloud(240, 120, 960, .9)}
  ${logo(60, 60, 46)}
  <div class="abs h" style="left:60px;top:160px;width:640px;font-size:86px;color:${C.night}">Nopți liniștite.<br><span class="it" style="color:${C.honey}">Dimineți</span> cu zâmbet.</div>
  <div class="abs" style="left:64px;top:470px;display:flex;flex-direction:column;gap:26px;width:560px;color:${C.night}">
    <div class="chk"><i>✓</i>Seara: o linguriță, apoi poveste</div>
    <div class="chk"><i>✓</i>Noaptea: somn odihnitor</div>
    <div class="chk"><i>✓</i>Dimineața: fără crize la grădiniță</div></div>
  <div class="abs hand" style="left:64px;top:780px;font-size:54px;color:${C.rose};transform:rotate(-3deg)">și plecăm toți la timp! ☀️</div>
  ${bottle(660, 730, 280, -4)}${disc()}${foot(C.night, '#fff')}`) });

// 7. Rețeta bunicii – persona D
ads.push({ id: 'S07-reteta-bunicii', html: page(`body{background:${C.sand}}
  .note{position:absolute;left:60px;top:500px;width:560px;background:#FFFDF6;padding:34px 38px;border-radius:6px;box-shadow:0 14px 30px rgba(90,60,20,.15);transform:rotate(-2deg)}`,
  `${leaf(150, 860, 40, 25)}${leaf(110, 960, 170, -15, C.leaf)}${leaf(130, -30, 880, 40, C.leaf, .5)}
  ${logo(60, 60, 46)}
  <div class="abs h" style="left:60px;top:160px;width:640px;font-size:84px;color:${C.leaf}">Rețeta bunicii,<br><span class="it" style="color:${C.honey}">într-o linguriță.</span></div>
  <div class="note"><div class="hand" style="font-size:46px;line-height:1.08;color:#4a3b22">„Pe vremea noastră, la culcare era ceai de tei. Acum e tei, mușețel, levănțică și miere – și îl beau cu plăcere!”</div>
  <div style="margin-top:14px;font:700 22px Inter;color:#8a7650">– așa zice bunica 💛</div></div>
  <div class="abs" style="left:430px;top:770px;width:220px">${ico.cup()}</div>
  ${bottle(640, 740, 300, 4)}${disc()}${foot(C.leaf, '#fff')}`) });

// 8. 3 semne – educativ
ads.push({ id: 'S08-3-semne', html: page(`body{background:${C.lav2}}
  .r{position:absolute;left:60px;width:620px;display:flex;gap:24px;align-items:center}
  .r .n{flex:none;width:90px;height:90px;border-radius:24px;background:${C.night};color:${C.moon};display:flex;align-items:center;justify-content:center;font:900 50px Archivo}
  .r span{font:600 32px/1.22 Inter;color:${C.night}}
  .tip{position:absolute;left:60px;top:720px;width:620px;background:#fff;border-radius:26px;padding:26px 30px;border-left:10px solid ${C.honey}}`,
  `${stars(14, 5, [700, 40, 360, 200]).replace(/background:#fff/g, '')}${moon(100, 900, 70, '#B9A6EE')}
  ${logo(60, 60, 44)}
  <div class="abs h" style="left:60px;top:150px;width:700px;font-size:72px;color:${C.night}">3 semne că seara e <span class="it" style="color:#6E4BC7">prea agitată</span></div>
  <div class="r" style="top:340px"><div class="n">1</div><span>Durează peste o oră până adoarme</span></div>
  <div class="r" style="top:460px"><div class="n">2</div><span>Se trezește de mai multe ori pe noapte</span></div>
  <div class="r" style="top:580px"><div class="n">3</div><span>Dimineața e morocănos și plânge des</span></div>
  <div class="tip"><div style="font:900 26px Archivo;color:${C.honey};letter-spacing:1px">CE NE-A AJUTAT</div>
  <div style="font:600 27px/1.3 Inter;color:${C.night};margin-top:6px">Ecrane oprite, lumină caldă, o poveste și o linguriță de sirop cu mușețel și levănțică.</div></div>
  ${bottle(620, 750, 320, 4)}${disc()}${foot(C.night, '#fff')}`) });

// 9. Plot twist – tati a adormit primul (umor)
ads.push({ id: 'S09-plot-twist', html: page(`body{background:radial-gradient(circle at 70% 30%,#2B3275,${C.night} 55%,${C.night2});color:#fff}
  .z{position:absolute;font:900 Archivo;font-family:Archivo;color:${C.lav};opacity:.9}`,
  `${stars(60, 21)}${moon(130, 880, 60)}
  ${logo(60, 60, 44, white)}
  <div class="abs hand" style="left:60px;top:150px;font-size:100px;color:${C.moon};transform:rotate(-4deg)">Plot twist:</div>
  <div class="abs h" style="left:60px;top:290px;width:620px;font-size:78px">cel mic a adormit <span class="it" style="color:${C.lav}">înaintea lui tati.</span></div>
  <div class="abs" style="left:60px;top:560px;width:600px;font:600 31px/1.35 Inter;color:#d6d8f2">😂 Ritualul de seară + siropul cu mușețel, levănțică și tei. Iar noi am reușit, în sfârșit, să ne vedem filmul. 🍿</div>
  <div class="btn" style="left:60px;top:780px;background:${C.moon};color:${C.night}">Comandă acum →</div>
  <div class="z" style="left:800px;top:230px;font-size:70px;transform:rotate(-10deg)">Z</div>
  <div class="z" style="left:860px;top:170px;font-size:54px;transform:rotate(-6deg)">z</div>
  <div class="z" style="left:910px;top:200px;font-size:40px">z</div>
  ${bottle(620, 760, 330, 5)}${disc('#cfd1ef')}${foot(C.moon, C.night)}`) });

// 10. Din natura României – brand
ads.push({ id: 'S10-din-romania', html: page(`body{background:linear-gradient(160deg,#3B7046,${C.leaf} 60%,#244A2E);color:#fff}
  .flag{position:absolute;left:0;right:0;top:0;height:14px;background:linear-gradient(90deg,#002B7F 0 33.3%,#FCD116 33.3% 66.6%,#CE1126 66.6%)}
  .chip{display:inline-flex;align-items:center;gap:14px;padding:12px 26px 12px 12px;border-radius:999px;background:rgba(255,255,255,.12);font:700 28px Inter}
  .chip span{width:58px;height:58px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}.chip svg{width:40px;height:40px}`,
  `<div class="flag"></div>${leaf(220, 820, 40, 20, '#9CC46F', .35)}${leaf(160, 960, 260, -25, '#9CC46F', .3)}${leaf(200, -60, 820, 35, '#9CC46F', .25)}
  ${logo(60, 60, 46, white)}
  <div class="abs" style="left:60px;top:150px;font:800 28px Inter;letter-spacing:3px;color:${C.moon}">🇷🇴 PRODUS ÎN ROMÂNIA</div>
  <div class="abs h" style="left:56px;top:200px;width:660px;font-size:72px">Din natura României, <span class="it" style="color:${C.moon}">pentru somnul celui mic.</span></div>
  <div class="abs" style="left:60px;top:500px;display:flex;flex-direction:column;gap:14px;align-items:flex-start">
    <div class="chip"><span>${ico.tei(C.linden)}</span>Flori de tei</div>
    <div class="chip"><span>${ico.musetel()}</span>Mușețel</div>
    <div class="chip"><span>${ico.lavanda()}</span>Levănțică</div>
    <div class="chip"><span>${ico.miere()}</span>Miere și lămâie</div></div>
  <div class="abs" style="left:60px;top:880px;font:600 26px Inter;color:#dfeccf">Fără coloranți artificiali. Fără conservanți.</div>
  ${bottle(660, 740, 280, -4)}${disc('#dfeccf')}${foot(C.moon, C.leaf)}`) });

module.exports = ads;
