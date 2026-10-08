// CARDIO BALANCE – "winning" formats copied from the Diabexum 1+1 ads (V1–V5). No prices.
// V1, V2 are 4:5 (1080x1350); V3–V5 square. Render: node render.js --set v [id-filter]
const FONTS = `
@font-face{font-family:Montserrat;font-weight:800;src:url(../../fonts/Montserrat-800.ttf)}
@font-face{font-family:Montserrat;font-weight:900;src:url(../../fonts/Montserrat-900.ttf)}
@font-face{font-family:Montserrat;font-weight:600;src:url(../../fonts/Montserrat-600.ttf)}
@font-face{font-family:Merriweather;font-weight:700;src:url(../../fonts/Merriweather-700.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
`;
// Cardio palette: label red + deep navy-wine + gold accent
const C = { red: '#B3202A', wine: '#7E1220', navy: '#1B1F3B', gold1: '#F3D27A', gold2: '#C9963F', ink: '#14182E', cream: '#FBF6EF', green: '#2F7A2B' };
const GOLD = `linear-gradient(180deg,${C.gold1},${C.gold2})`;

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Montserrat,sans-serif;position:relative;overflow:hidden;color:${C.ink}}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.abs{position:absolute}
.pill{position:absolute;left:50%;transform:translateX(-50%);border-radius:999px;text-align:center;white-space:nowrap;font-weight:900;letter-spacing:-.5px;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.prod{position:absolute;filter:drop-shadow(0 26px 22px rgba(0,0,0,.40)) drop-shadow(0 6px 6px rgba(0,0,0,.25))}
.shadow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.45),rgba(0,0,0,0))}
.disc{position:absolute;left:0;right:0;bottom:14px;text-align:center;font:600 14px Inter}
`;
const PROD = '../cardio-cutout-hd-s.png', LOGO = '../../logo-novensa.png';
const bottle = (h, x, y, rot = 0, shadow = true) => {
  const w = h * 0.509;
  return `${shadow ? `<div class="shadow" style="left:${x - w * 0.1}px;top:${y + h - 26}px;width:${w * 1.2}px;height:52px"></div>` : ''}<img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
};
const bg = (id, pos = 'center') => `<div class="bg" style="background-image:url(../bg/${id}-s.jpg);background-position:${pos}"></div>`;
const disc = (c = '#fff') => `<div class="disc" style="color:${c};${c === '#fff' ? 'text-shadow:0 1px 3px rgba(0,0,0,.85)' : 'opacity:.75'}">Supliment alimentar. Nu înlocuiește tratamentul medical. Dacă urmezi un tratament, consultă medicul.</div>`;
const page = (h, body, css = '', dc = '#fff') => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}html,body{width:1080px;height:${h}px}${css}</style></head><body>${body}${disc(dc)}</body></html>`;
const plus = (x, y, s = 110) => `<div class="abs" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;background:${GOLD};box-shadow:0 10px 24px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;color:#fff;font:900 ${s * 0.75}px/1 Montserrat">+</div>`;
// simple line icons
const ICON = {
  heart: c => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>`,
  leaf: c => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="${c}"><path d="M20 4C10 4 5 9 5 15c0 1.6.4 3 1 4l1.4-1.4C9 13 13 10 17 8c-3.4 2.6-6.4 6-8 10.6.9.3 1.9.4 3 .4 6 0 8-6 8-15z"/></svg>`,
  pulse: c => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-5 4 10 2-5h6"/></svg>`,
  drop: c => `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="${c}" stroke-width="1.8"><path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/></svg>`,
  truck: c => `<svg viewBox="0 0 48 32" width="100%" height="100%" fill="${c}"><path d="M2 4h26v18H2zM30 10h9l6 7v5H30z"/><circle cx="10" cy="26" r="4"/><circle cx="37" cy="26" r="4"/><path d="M-6 9h7M-8 14h9M-6 19h7" stroke="${c}" stroke-width="2"/></svg>`,
};
const ring = (icon, s = 84, c = C.gold2) => `<div style="flex:none;width:${s}px;height:${s}px;border-radius:50%;border:3px solid ${c};display:flex;align-items:center;justify-content:center;padding:${s * 0.22}px">${ICON[icon](c)}</div>`;

const ads = [];

// V1 – packing desk, 4:5: "Fiecare comandă = 2 borcane"
ads.push({ id: 'V1-fiecare-comanda', h: 1350, html: page(1350, `${bg('V1')}
  <div class="pill" style="top:56px;width:960px;padding:26px 30px;background:#fff;color:${C.wine};font-size:70px;line-height:1.05">FIECARE COMANDĂ<br>= 2 BORCANE</div>
  <div class="pill" style="top:290px;width:640px;padding:16px 0;background:${C.red};color:#fff;font-size:96px">1+1 GRATIS</div>
  <div class="pill" style="top:455px;width:560px;padding:14px 0;background:${GOLD};color:${C.wine};font-size:52px;font-weight:800">Transport gratuit</div>
  <div class="abs" style="left:80px;top:1090px;width:330px;height:200px;background:#fff;box-shadow:0 10px 24px rgba(0,0,0,.18);transform:rotate(-6deg);padding:28px 26px;font:700 44px/1.05 Caveat;color:${C.navy}">Mulțumim pentru<br>comanda ta! ♡</div>
  ${bottle(500, 440, 700, -3)}${bottle(500, 690, 715, 4)}`) });

// V2 – warm table, 4:5: twine + GRATIS tag
const twine = `<svg class="abs" style="left:300px;top:745px" width="560" height="120" viewBox="0 0 560 120"><path d="M0 40 C120 62 260 66 420 52" stroke="#B08A5A" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M0 52 C120 74 260 78 420 64" stroke="#8C6A42" stroke-width="3" fill="none" opacity=".7"/><path d="M412 54 c18 -30 50 -26 40 -4 c-8 16 -30 10 -40 4 c18 10 36 34 18 42 c-14 6 -22 -20 -18 -42" stroke="#9A774B" stroke-width="6" fill="none"/></svg>`;
const tag = `<div class="abs" style="left:740px;top:790px;width:260px;height:150px;background:#D9B98A;border-radius:10px 40px 40px 10px;transform:rotate(24deg);box-shadow:0 10px 20px rgba(0,0,0,.3);display:flex;flex-direction:column;align-items:center;justify-content:center;color:${C.wine};font:900 50px/1 Montserrat"><div style="position:absolute;left:18px;top:62px;width:22px;height:22px;border-radius:50%;background:#6E5333"></div>GRATIS<div style="font-size:36px;margin-top:4px">♡</div></div>`;
ads.push({ id: 'V2-pleaca-cu-1plus1', h: 1350, html: page(1350, `${bg('V2', '30% center')}
  <div class="pill" style="top:90px;width:980px;padding:24px 0;background:#fff;color:${C.wine};font-size:62px">FIECARE COMANDĂ PLEACĂ</div>
  <div class="pill" style="top:240px;width:940px;padding:22px 0;background:${C.wine};color:#fff;font-size:106px;border:4px solid rgba(255,255,255,.7)">CU <span style="background:${GOLD};-webkit-background-clip:text;color:transparent">1+1</span> GRATIS</div>
  <div class="pill" style="top:430px;width:640px;padding:18px 0;background:#fff;color:${C.wine};font-size:64px">Plata la livrare</div>
  ${bottle(560, 300, 640, 0)}${bottle(560, 570, 640, 0)}${twine}${tag}`) });

// V3 – studio pedestal, square: big 1+1 GRATIS + benefits
ads.push({ id: 'V3-oferta-speciala', html: page(1080, `${bg('V3')}
  <img class="abs" src="${LOGO}" style="left:60px;top:42px;height:70px">
  <div class="abs" style="left:64px;top:128px;font:600 18px Montserrat;letter-spacing:4px;color:#4a4a4a">NATURAL. PENTRU O VIAȚĂ MAI BUNĂ.</div>
  <div class="abs" style="left:60px;top:180px;width:470px;padding:12px 0;border-radius:999px;background:${GOLD};text-align:center;font:800 32px Montserrat;letter-spacing:6px;color:${C.wine}">OFERTĂ SPECIALĂ</div>
  <div class="abs" style="left:52px;top:236px;font:900 250px/1 Montserrat;color:${C.wine};letter-spacing:-8px">1+1</div>
  <div class="abs" style="left:60px;top:486px;width:480px;padding:4px 0 10px;background:${GOLD};text-align:center;font:900 96px/1.05 Montserrat;color:#fff;letter-spacing:4px;text-shadow:0 2px 6px rgba(0,0,0,.25)">GRATIS</div>
  <div class="abs" style="left:60px;top:630px;display:flex;flex-direction:column;gap:20px">
    ${[['heart', 'SUSȚINE SĂNĂTATEA<br>INIMII'], ['leaf', 'USTUROI, PĂDUCEL<br>ȘI VÂSC'], ['pulse', 'REGLEAZĂ TENSIUNEA<br>ARTERIALĂ']].map(([i, t]) => `<div style="display:flex;align-items:center;gap:22px">${ring(i, 80)}<div style="font:800 25px/1.15 Montserrat;color:${C.ink}">${t}</div></div>`).join('')}</div>
  <div class="abs" style="left:60px;top:938px;width:430px;height:100px;border-radius:24px;background:${C.wine};display:flex;align-items:center;gap:24px;padding:0 30px;color:#fff"><div style="width:96px;height:64px">${ICON.truck('#fff')}</div><div><div style="font:600 24px Montserrat">TRANSPORT</div><div style="font:900 40px/1 Montserrat">GRATUIT</div></div></div>
  <div class="abs" style="left:620px;top:28px;transform:rotate(-7deg);font:700 58px/1 Caveat;color:${C.wine};text-align:center">Grija pentru inimă<br>începe acum!</div>
  ${bottle(470, 800, 255, 0)}${bottle(500, 570, 230, 0)}${plus(790, 470, 90)}`) });

// V4 – worried man with BP monitor, square
ads.push({ id: 'V4-tensiometru-1plus1', html: page(1080, `${bg('V4')}
  <div class="abs" style="left:0;right:0;bottom:0;height:200px;background:#fff"></div>
  <img class="abs" src="${LOGO}" style="left:650px;top:40px;height:72px">
  <div class="abs" style="left:600px;top:130px;width:440px;text-align:center;font:700 31px/1.25 Merriweather;color:${C.ink}">O inimă liniștită începe cu un pas simplu.</div>
  <div class="abs" style="left:665px;top:236px;width:270px;height:4px;background:${GOLD}"></div>
  <div class="abs" style="left:590px;top:262px;width:430px;padding:10px 0 16px;border-radius:24px;background:${GOLD};border:4px solid #fff;box-shadow:0 14px 30px rgba(0,0,0,.25);text-align:center">
    <div style="font:900 150px/1 Montserrat;color:${C.wine};letter-spacing:-4px">1+1</div><div style="font:900 82px/1 Montserrat;color:#fff;letter-spacing:3px;text-shadow:0 2px 5px rgba(0,0,0,.2)">GRATIS</div></div>
  ${bottle(390, 560, 500, 0)}${bottle(390, 820, 500, 0)}${plus(725, 650, 90)}
  <div class="abs" style="left:30px;top:925px;display:flex;align-items:center;gap:14px">
    ${[['leaf', 'INGREDIENTE<br>NATURALE'], ['heart', 'SUSȚINE<br>INIMA'], ['pulse', 'TENSIUNE<br>ȘI CIRCULAȚIE']].map(([i, t], k) => `${k ? `<div style="width:2px;height:60px;background:${C.gold2};opacity:.6"></div>` : ''}<div style="display:flex;align-items:center;gap:10px">${ring(i, 58, C.gold2)}<div style="font:700 16px/1.2 Montserrat;color:${C.ink}">${t}</div></div>`).join('')}</div>
  <div class="abs" style="left:770px;top:900px;width:280px;padding:16px 0;border-radius:999px;background:${C.green};color:#fff;text-align:center;font:800 24px Montserrat;white-space:nowrap">COMANDĂ ACUM →</div>
  <div class="abs" style="left:790px;top:985px;display:flex;align-items:center;gap:10px;font:800 19px Montserrat;color:${C.ink};white-space:nowrap"><div style="width:52px;height:34px">${ICON.truck(C.ink)}</div>TRANSPORT GRATUIT</div>`, '', C.ink) });

// V5 – big open box full of jars, handwritten on the front, square
const FRONT = 'polygon(212px 452px, 884px 458px, 880px 945px, 250px 945px)';
const jars = (n, h, x0, step, y) => Array.from({ length: n }, (_, i) => bottle(h, x0 + i * step, y + (i % 2) * 6, (i - (n - 1) / 2) * 1.2, false)).join('');
ads.push({ id: 'V5-cutie-plina', html: page(1080, `${bg('V5')}
  ${jars(5, 300, 222, 128, 205)}${jars(5, 300, 250, 128, 262)}
  <div class="bg" style="background-image:url(../bg/V5-s.jpg);clip-path:${FRONT}"></div>
  <div class="abs" style="left:250px;top:520px;width:620px;text-align:center;transform:rotate(-3deg);color:#1F2E6E;font-family:Caveat;font-weight:700">
    <div style="font-size:92px;line-height:1">Cura de 2–3 luni</div>
    <div style="font-size:150px;line-height:1.05">1+1 GRATIS</div>
    <svg width="520" height="30" viewBox="0 0 520 30"><path d="M8 18 C150 6 330 4 512 14" stroke="#1F2E6E" stroke-width="7" fill="none" stroke-linecap="round"/></svg>
    <div style="font-size:70px;line-height:.9;text-align:right;padding-right:20px">♡</div></div>`) });

module.exports = ads;
