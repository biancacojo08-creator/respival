// CARDIO BALANCE (Novensa) statics, 1080x1080, with the real bottle cutout.
// Render: node render.js [id-filter]  → png/<id>.png
const FONTS = `
@font-face{font-family:Merriweather;font-weight:700;src:url(../../fonts/Merriweather-700.ttf)}
@font-face{font-family:Merriweather;font-weight:900;src:url(../../fonts/Merriweather-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Barlow;font-weight:800;src:url(../../fonts/BarlowCondensed-800.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
`;

// palette: label red + Novensa green on warm white
const C = {
  red: '#B3202A', red2: '#8E1520', green: '#2F7A2B', leaf: '#5BA33B', cream: '#FBF6EF', blush: '#F6E3DF',
  ink: '#1A1A1A', grey: '#6B6B6B', wood: '#E8D8C3', navy: '#14233F', wa: '#E5DDD5', waGreen: '#DCF8C6',
};

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.abs{position:absolute}
.h{font-family:Merriweather;font-weight:900;letter-spacing:-1px;line-height:1.08}
.it{font-family:Fraunces;font-style:italic;font-weight:600}
.hand{font-family:Caveat;font-weight:700}
.prod{position:absolute;filter:drop-shadow(0 30px 30px rgba(0,0,0,.30)) drop-shadow(0 6px 8px rgba(0,0,0,.2))}
.logo{position:absolute;height:44px}
.chk{display:flex;align-items:flex-start;gap:16px;font:600 31px/1.25 Inter}
.chk i{flex:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 24px Inter;font-style:normal;margin-top:-1px;color:#fff;background:${C.red}}
.stars{color:#F2A900;letter-spacing:3px}
.btn{display:inline-block;padding:20px 40px;border-radius:14px;font:800 40px Barlow;letter-spacing:1px;text-transform:uppercase}
.foot{position:absolute;left:0;right:0;bottom:0;height:62px;display:flex;align-items:center;justify-content:center;gap:30px;font:600 21px Inter}
.foot span:before{content:"✓ ";font-weight:800}
.disc{position:absolute;left:0;right:0;bottom:70px;text-align:center;font:400 15px Inter;opacity:.65}
.burst{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
`;

const PROD = '../cardio-cutout-hd.png', LOGO = '../../logo-novensa.png';
const prod = (h, x, y, rot = 0) => `<img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
const logo = (x, y, h = 44) => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px">`;
const foot = (bg = C.green, fg = '#fff') => `<div class="foot" style="background:${bg};color:${fg}"><span>Usturoi · Păducel · Vâsc</span><span>Plata la livrare</span><span>Transport gratuit la 2 cutii</span></div>`;
const disc = (c = C.ink) => `<div class="disc" style="color:${c}">Supliment alimentar. Nu înlocuiește tratamentul medical. Dacă urmezi un tratament, consultă medicul.</div>`;
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;
const BENEFITS = ['Susține sănătatea inimii și a vaselor de sânge', 'Reglează ritmul cardiac și tensiunea arterială', 'Îmbunătățește circulația și reduce efortul inimii'];
const checks = (w = 560, items = BENEFITS) => `<div style="display:flex;flex-direction:column;gap:20px;width:${w}px">${items.map(b => `<div class="chk"><i>✓</i><span>${b}</span></div>`).join('')}</div>`;

// --- plant icons (inline SVG)
const garlic = (s = 150) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100">
  <path d="M50 8c3 10 2 16 0 22" stroke="#9C8F6A" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M50 28c-26 6-38 24-34 42 4 16 18 22 34 22s30-6 34-22c4-18-8-36-34-42z" fill="#F7F1E3" stroke="#C9B994" stroke-width="2.5"/>
  <path d="M50 30c-10 14-12 40 0 62M50 30c10 14 12 40 0 62M36 40c-8 14-6 36 6 50M64 40c8 14 6 36-6 50" stroke="#D9CBA6" stroke-width="2.2" fill="none"/>
  <path d="M38 92h24" stroke="#B9A57A" stroke-width="3" stroke-linecap="round"/></svg>`;
const hawthorn = (s = 150) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100">
  <path d="M20 90C40 70 55 50 80 18" stroke="#6B4A2B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M60 44c-14-8-26-2-28 8 12 4 22 2 28-8z" fill="${C.leaf}"/><path d="M66 36c2-14 14-20 24-16-2 12-12 18-24 16z" fill="${C.green}"/>
  <path d="M42 64c-14 0-22 10-20 18 12-2 20-8 20-18z" fill="${C.green}"/>
  ${[[50, 62], [58, 70], [46, 74], [70, 52], [78, 58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="#C62828"/><circle cx="${x - 2.5}" cy="${y - 2.5}" r="2" fill="#fff" opacity=".55"/>`).join('')}</svg>`;
const mistletoe = (s = 150) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100">
  <path d="M50 92V52M50 52L28 30M50 52L72 30M50 70L30 60M50 70L70 60" stroke="#7A8B3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="22" cy="24" rx="8" ry="17" transform="rotate(-40 22 24)" fill="#8AAE3E"/><ellipse cx="78" cy="24" rx="8" ry="17" transform="rotate(40 78 24)" fill="#8AAE3E"/>
  <ellipse cx="22" cy="58" rx="6" ry="14" transform="rotate(-70 22 58)" fill="#6E9632"/><ellipse cx="78" cy="58" rx="6" ry="14" transform="rotate(70 78 58)" fill="#6E9632"/>
  ${[[46, 48], [54, 48], [50, 42], [46, 66], [54, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5.5" fill="#FAFAF2" stroke="#C9CFAE" stroke-width="1.2"/>`).join('')}</svg>`;

const ads = [];

// C01 – ingredients hero
ads.push({ id: 'C01-reteta-bunicii', html: page(`body{background:${C.cream}}`,
  `${logo(60, 54)}
  <div class="abs h" style="left:60px;top:130px;width:600px;font-size:72px;color:${C.ink}">Usturoi, păducel și vâsc.</div>
  <div class="abs it" style="left:60px;top:300px;width:600px;font-size:54px;color:${C.red}">Rețeta bunicii,<br>într-o capsulă.</div>
  <div class="abs" style="left:40px;top:470px;display:flex;gap:6px">
    ${[[garlic(), 'Usturoi'], [hawthorn(), 'Păducel'], [mistletoe(), 'Vâsc']].map(([svg, n]) => `<div style="width:200px;text-align:center"><div style="width:180px;height:180px;margin:0 auto;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.08)">${svg}</div><div style="margin-top:14px;font:700 30px Inter">${n}</div></div>`).join('')}</div>
  <div class="abs" style="left:60px;top:780px;font:600 30px/1.35 Inter;color:${C.grey};width:560px">Fără ceai de fiert. Fără miros de usturoi.</div>
  ${prod(800, 650, 150, 3)}${disc()}${foot()}`) });

// C02 – direct question + label benefits
ads.push({ id: 'C02-tensiune-palpitatii', html: page(`body{background:#fff}
  .band{position:absolute;left:0;right:0;top:0;height:300px;background:${C.red}}`,
  `<div class="band"></div>
  <div class="abs h" style="left:60px;top:60px;width:960px;font-size:74px;color:#fff">Ai tensiune mare<br>sau palpitații?</div>
  <div class="abs" style="left:60px;top:236px;font:600 32px Inter;color:#FBE3E3">Citește ce conține Cardio Balance.</div>
  <div class="abs" style="left:60px;top:370px">${checks(600)}</div>
  <div class="abs" style="left:60px;top:740px;font:700 30px Inter;color:${C.green}">🌿 Usturoi · Păducel · Vâsc</div>
  <div class="abs" style="left:60px;top:800px"><span class="btn" style="background:${C.green};color:#fff">Comandă acum →</span></div>
  ${prod(720, 690, 250, 2)}${disc()}${foot()}`) });

// C03 – offer 1 vs 2 boxes
ads.push({ id: 'C03-oferta-2-cutii', html: page(`body{background:${C.blush}}
  .card{position:absolute;border-radius:28px;background:#fff;box-shadow:0 14px 40px rgba(0,0,0,.10)}`,
  `${logo(60, 50)}
  <div class="abs h" style="left:60px;top:120px;width:960px;font-size:62px;color:${C.ink}">Cura pentru <span style="color:${C.red}">amândoi</span>.<br>Transportul e pe noi.</div>
  <div class="card" style="left:60px;top:330px;width:330px;height:560px;opacity:.92">
    <div style="text-align:center;margin-top:34px;font:700 30px Inter;color:${C.grey}">1 cutie</div>
    <div style="position:relative;height:300px">${prod(290, 110, 10)}</div>
    <div style="text-align:center;font:800 76px Barlow;color:${C.ink}">69,99 lei</div>
    <div style="text-align:center;font:600 24px Inter;color:${C.grey}">+ transport</div></div>
  <div class="card" style="left:420px;top:300px;width:600px;height:620px;border:5px solid ${C.red}">
    <div style="position:absolute;top:-26px;left:50%;transform:translateX(-50%);background:${C.red};color:#fff;font:800 30px Barlow;letter-spacing:1px;padding:8px 26px;border-radius:999px;white-space:nowrap">CEA MAI ALEASĂ</div>
    <div style="text-align:center;margin-top:40px;font:700 34px Inter">2 cutii · 120 de capsule</div>
    <div style="position:relative;height:330px">${prod(320, 130, 10, -4)}${prod(320, 290, 16, 4)}</div>
    <div style="text-align:center;font:800 100px Barlow;color:${C.red};line-height:1">132,98 lei</div>
    <div style="text-align:center;margin-top:10px;font:700 30px Inter;color:${C.green}">🚚 Transport GRATUIT · 66,49 lei/cutie</div></div>
  ${disc()}${foot()}`) });

// C04 – evening heartbeat (navy, calm)
ads.push({ id: 'C04-seara-in-pat', html: page(`body{background:${C.navy}}`,
  `<div class="abs" style="left:60px;top:90px;font:700 34px Inter;color:#C9D3E6">🌙 22:47</div>
  <div class="abs it" style="left:60px;top:170px;width:620px;font-size:64px;line-height:1.18;color:#fff">Seara, în liniște, îți auzi inima bătând?</div>
  <div class="abs" style="left:60px;top:470px;width:560px;font:600 32px/1.4 Inter;color:#E4E9F3">Cardio Balance, cu usturoi, păducel și vâsc:</div>
  <div class="abs" style="left:60px;top:560px;color:#fff">${checks(580).replace(/background:\$\{C.red\}/g, '')}</div>
  ${prod(780, 680, 170, 3)}${disc('#fff')}${foot(C.red)}`) });

// C05 – wife's note on the table
ads.push({ id: 'C05-biletul-sotiei', html: page(`body{background:${C.wood}}
  .note{position:absolute;left:70px;top:150px;width:560px;height:500px;background:#FFF9C4;transform:rotate(-3deg);box-shadow:0 18px 30px rgba(0,0,0,.18);padding:56px 48px}
  .tape{position:absolute;top:-18px;left:200px;width:150px;height:40px;background:rgba(255,255,255,.6);transform:rotate(4deg)}`,
  `<div class="note"><div class="tape"></div>
    <div class="hand" style="font-size:66px;line-height:1.12;color:#1F3A93">Ioane,<br>ia-ți capsulele<br>lângă cafea.<br>Te vreau lângă mine<br>încă 20 de ani! ♥</div>
    <div class="hand" style="font-size:52px;color:#1F3A93;text-align:right;margin-top:8px">Mariana</div></div>
  <div class="abs h" style="left:70px;top:740px;width:580px;font-size:46px;color:${C.ink}">Grija pentru inimă e mai ușoară în doi.</div>
  <div class="abs" style="left:70px;top:870px;font:700 28px Inter;color:${C.red}">2 cutii = 132,98 lei · transport gratuit</div>
  ${prod(760, 680, 170, 4)}${disc()}${foot()}`) });

// C06 – morning blood-pressure monitor
ads.push({ id: 'C06-tensiometru-dimineata', html: page(`body{background:#F2F4F7}
  .mon{position:absolute;left:70px;top:330px;width:420px;height:430px;border-radius:40px;background:#fff;box-shadow:0 18px 40px rgba(0,0,0,.12);padding:34px}
  .lcd{background:#C7D4C2;border-radius:18px;height:270px;padding:20px 26px;font-family:Barlow;font-weight:800;color:#1E2A1E}`,
  `<div class="abs h" style="left:70px;top:70px;width:940px;font-size:66px;color:${C.ink}">Tensiunea 16 dimineața?<br><span class="it" style="color:${C.red}">Nu ești singur.</span></div>
  <div class="mon"><div class="lcd">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:28px">SYS</span><span style="font-size:120px;line-height:1">160</span></div>
      <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:28px">DIA</span><span style="font-size:90px;line-height:1">95</span></div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;font-size:26px"><span>♥ PUL</span><span style="font-size:44px">88</span></div></div>
    <div style="display:flex;gap:18px;justify-content:center;margin-top:30px"><div style="width:90px;height:44px;border-radius:22px;background:${C.red}"></div><div style="width:44px;height:44px;border-radius:50%;background:#D7DCE3"></div></div></div>
  <div class="abs" style="left:540px;top:350px;width:480px;font:600 30px/1.4 Inter;color:${C.ink}">Cardio Balance, cu <b>usturoi, păducel și vâsc</b>:</div>
  <div class="abs" style="left:540px;top:470px">${checks(470, ['Susține sănătatea inimii', 'Reglează ritmul cardiac și tensiunea arterială', 'Îmbunătățește circulația'])}</div>
  ${prod(290, 870, 680, 0)}
  <div class="abs" style="left:70px;top:800px;font:800 52px Barlow;color:${C.green}">69,99 lei · plata la livrare</div>
  ${disc()}${foot()}`) });

// C07 – no tea, no garlic smell
ads.push({ id: 'C07-fara-ceai', html: page(`body{background:${C.cream}}
  .row{display:flex;align-items:center;gap:22px;font:700 40px Inter}
  .x{width:60px;height:60px;border-radius:50%;background:#EEE;color:${C.grey};display:flex;align-items:center;justify-content:center;font:800 34px Inter}`,
  `${logo(60, 54)}
  <div class="abs" style="left:60px;top:170px;display:flex;flex-direction:column;gap:30px">
    <div class="row" style="color:${C.grey};text-decoration:line-through"><span class="x">✕</span>Ceai de păducel fiert și strecurat</div>
    <div class="row" style="color:${C.grey};text-decoration:line-through"><span class="x">✕</span>Usturoi crud și mirosul toată ziua</div>
    <div class="row" style="color:${C.grey};text-decoration:line-through"><span class="x">✕</span>Vâsc căutat prin piețe</div></div>
  <div class="abs h" style="left:60px;top:500px;width:600px;font-size:64px;color:${C.ink}">Toate trei.<br><span style="color:${C.red}">1–3 capsule</span> pe zi.</div>
  <div class="abs" style="left:60px;top:720px;font:600 30px/1.4 Inter;color:${C.ink};width:560px">60 de capsule în borcan.<br>2 cutii: 132,98 lei, transport gratuit.</div>
  ${prod(680, 730, 340, 3)}${disc()}${foot()}`) });

// C08 – diaspora WhatsApp
ads.push({ id: 'C08-whatsapp-mama', html: page(`body{background:${C.wa}}
  .top{position:absolute;left:0;right:0;top:0;height:120px;background:#075E54;color:#fff;display:flex;align-items:center;gap:22px;padding:0 40px}
  .av{width:72px;height:72px;border-radius:50%;background:#F3D9CF;display:flex;align-items:center;justify-content:center;font:700 34px Inter;color:#7A3B2E}
  .m{position:absolute;max-width:560px;padding:20px 26px 30px;border-radius:18px;font:400 31px/1.35 Inter;box-shadow:0 1px 1px rgba(0,0,0,.12)}
  .m small{position:absolute;right:16px;bottom:6px;font-size:18px;color:#7A8A7A}
  .in{left:40px;background:#fff;border-top-left-radius:4px}.out{right:420px;background:${C.waGreen};border-top-right-radius:4px}`,
  `<div class="top"><div class="av">M</div><div><div style="font:700 34px Inter">Mama ❤️</div><div style="font:400 22px Inter;opacity:.8">online</div></div></div>
  <div class="m in" style="top:160px">Iar am avut tensiunea 16 azi-dimineață. Și seara îmi bate inima tare…<small>07:42</small></div>
  <div class="m out" style="top:350px">Mamă, ți-am comandat Cardio Balance. Usturoi, păducel și vâsc, cum îți plac ție 🌿<small>07:45 ✓✓</small></div>
  <div class="m out" style="top:560px">Vine la ușă, plătești la curier. Am luat 2 cutii, una e pentru tata 😘<small>07:46 ✓✓</small></div>
  <div class="m in" style="top:770px">Ce m-aș face fără tine 🥹<small>07:51</small></div>
  ${prod(720, 700, 260, 4)}${disc()}${foot('#075E54')}`) });

module.exports = ads;
