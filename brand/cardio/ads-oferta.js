// CARDIO BALANCE – offer series 1+1 GRATIS (O01–O10): 2 jars / 120 capsules / 2–3 months, free shipping. No prices shown (client request).
// Render: node render.js --set oferta [id-filter]
const FONTS = `
@font-face{font-family:Merriweather;font-weight:900;src:url(../../fonts/Merriweather-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Barlow;font-weight:800;src:url(../../fonts/BarlowCondensed-800.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
`;
const C = { red: '#B3202A', red2: '#8E1520', green: '#2F7A2B', cream: '#FBF4E8', ink: '#1E1A16', rust: '#B5541C', amber: '#F2B33D', yellow: '#FFD23F' };

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.abs{position:absolute}
.h{font-family:Merriweather;font-weight:900;letter-spacing:-.5px;line-height:1.1}
.it{font-family:Fraunces;font-style:italic;font-weight:600}
.hand{font-family:Caveat;font-weight:700}
.bc{font-family:Barlow;font-weight:800;letter-spacing:.5px;line-height:1}
.panel{position:absolute;border-radius:28px;padding:40px 44px;background:rgba(251,244,232,.92);box-shadow:0 20px 50px rgba(0,0,0,.25)}
.dark{background:rgba(24,18,14,.74);color:#fff}
.prod{position:absolute;filter:drop-shadow(0 26px 22px rgba(0,0,0,.42)) drop-shadow(0 6px 6px rgba(0,0,0,.28))}
.shadow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.42),rgba(0,0,0,0))}
.burst{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;clip-path:polygon(50% 0%,61% 12%,75% 6%,79% 21%,94% 25%,88% 39%,100% 50%,88% 61%,94% 75%,79% 79%,75% 94%,61% 88%,50% 100%,39% 88%,25% 94%,21% 79%,6% 75%,12% 61%,0% 50%,12% 39%,6% 25%,21% 21%,25% 6%,39% 12%)}
.old{position:relative;display:inline-block;color:#8a8178}
.old:after{content:"";position:absolute;left:-4px;right:-4px;top:50%;height:4px;background:${C.red};transform:rotate(-8deg)}
.chk{display:flex;gap:14px;font:600 28px/1.28 Inter;margin-top:14px}
.chk i{flex:none;width:36px;height:36px;border-radius:50%;background:${C.green};color:#fff;display:flex;align-items:center;justify-content:center;font:800 20px Inter;font-style:normal}
.tag{display:inline-block;padding:12px 22px;border-radius:999px;background:${C.green};color:#fff;font:700 25px Inter}
.foot{position:absolute;left:0;right:0;bottom:0;height:58px;display:flex;align-items:center;justify-content:center;gap:28px;font:700 21px Inter;color:#fff;background:${C.red}}
.foot span:before{content:"✓ ";font-weight:800;color:${C.yellow}}
.disc{position:absolute;left:0;right:0;bottom:62px;text-align:center;font:400 14px Inter}
.logo{height:38px}
`;
const PROD = '../cardio-cutout-hd.png', LOGO = '../../logo-novensa.png';
const bottle = (h, x, y, rot = 0) => {
  const w = h * 0.509;
  return `<div class="shadow" style="left:${x - w * 0.1}px;top:${y + h - 26}px;width:${w * 1.2}px;height:52px"></div><img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
};
const pair = (h, x, y) => `${bottle(h, x, y, -4)}${bottle(h, x + h * 0.47, y + 12, 4)}`;
const bg = id => `<div class="bg" style="background-image:url(../bg/${id}.jpg)"></div>`;
const burst = (x, y, s = 250, rot = -10) => `<div class="burst" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${C.yellow};color:${C.red};transform:rotate(${rot}deg)"><div class="bc" style="font-size:${s * 0.3}px">1+1</div><div class="bc" style="font-size:${s * 0.16}px">GRATIS</div></div>`;
const foot = () => `<div class="foot"><span>1+1 GRATIS</span><span>Transport gratuit</span><span>Plata la livrare</span></div>`;
const disc = (c = '#fff') => `<div class="disc" style="color:${c};${c === '#fff' ? 'text-shadow:0 1px 3px rgba(0,0,0,.8)' : 'opacity:.7'}">Supliment alimentar. Nu înlocuiește tratamentul medical. Dacă urmezi un tratament, consultă medicul.</div>`;
const page = (body, css = '', dc = '#fff') => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}${disc(dc)}${foot()}</body></html>`;
const offer = (size = 90, color = C.red) => `<div class="bc" style="font-size:${size}px;color:${color}">1+1 GRATIS</div>`;

const ads = [];

// O01 – hero, red studio
ads.push({ id: 'O01-1plus1-hero', html: page(`
  <div class="abs" style="left:60px;top:56px"><img class="logo" src="${LOGO}" style="filter:brightness(0) invert(1)"></div>
  <div class="abs bc" style="left:56px;top:120px;font-size:250px;color:${C.yellow}">1+1</div>
  <div class="abs bc" style="left:62px;top:360px;font-size:150px;color:#fff">GRATIS</div>
  <div class="abs" style="left:62px;top:560px;font:700 34px/1.4 Inter;color:#FBE3E3;width:470px">2 borcane Cardio Balance<br>120 capsule · cura de 2–3 luni</div>
  <div class="abs" style="left:62px;top:720px"><span class="tag" style="background:#fff;color:${C.red};font-size:30px;padding:16px 28px">Comandă acum</span></div>
  ${pair(520, 560, 380)}`, `body{background:radial-gradient(circle at 75% 55%,#D2353F,${C.red2} 70%)}`) });

// O02 – 3-month calendar
const month = (name) => `<div style="width:250px;border-radius:20px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.10);overflow:hidden">
  <div style="background:${C.red};color:#fff;font:800 30px Barlow;letter-spacing:1px;padding:12px 0;text-align:center">${name}</div>
  <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;padding:16px">${Array.from({ length: 28 }, () => `<div style="height:22px;border-radius:50%;background:#F2C9CC;display:flex;align-items:center;justify-content:center;color:${C.red};font:800 15px Inter">✓</div>`).join('')}</div></div>`;
ads.push({ id: 'O02-cura-3-luni', html: page(`
  <div class="abs" style="left:60px;top:56px"><img class="logo" src="${LOGO}"></div>
  <div class="abs h" style="left:60px;top:120px;width:760px;font-size:62px">O cură completă.<br><span style="color:${C.red}">2–3 luni</span> de grijă pentru inimă.</div>
  <div class="abs" style="left:60px;top:340px;display:flex;gap:24px">${month('LUNA 1')}${month('LUNA 2')}${month('LUNA 3')}</div>
  <div class="abs" style="left:60px;top:690px">${offer(110)}<div style="font:700 30px Inter;margin-top:12px">2 borcane · 120 capsule · transport gratuit</div></div>
  ${burst(840, 60, 200, 10)}${bottle(330, 870, 610, 3)}`, `body{background:${C.cream}}`, C.ink) });

// O03 – breakfast for two (autumn bg)
ads.push({ id: 'O03-unul-pentru-el', html: page(`${bg('T04')}
  <div class="panel" style="left:48px;top:56px;width:600px">
    <div class="h" style="font-size:56px">Unul pentru tine.<br><span style="color:${C.red}">Unul GRATIS</span> pentru el.</div>
    <div style="font:600 28px/1.4 Inter;margin-top:16px">Cardio Balance 1+1: 2 borcane, 120 capsule, transport gratuit.</div></div>
  ${burst(800, 70, 220, 10)}${pair(420, 600, 540)}`) });

// O04 – one jar vs the full course
ads.push({ id: 'O04-un-borcan-sau-cura', html: page(`
  <div class="abs h" style="left:0;right:0;top:64px;text-align:center;font-size:62px">Un borcan sau <span style="color:${C.red}">cura completă</span>?</div>
  <div class="abs" style="left:70px;top:210px;width:400px;height:640px;border-radius:28px;background:#fff;opacity:.85;text-align:center">
    <div style="font:700 32px Inter;color:#777;margin-top:30px">1 borcan</div>
    <div style="position:relative;height:380px">${bottle(340, 115, 20)}</div>
    <div class="bc" style="font-size:64px;color:#777">60 capsule</div><div style="font:600 26px Inter;color:#888;margin-top:8px">aproximativ o lună</div></div>
  <div class="abs" style="left:500px;top:190px;width:510px;height:680px;border-radius:28px;background:#fff;border:6px solid ${C.red};text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.12)">
    <div class="bc" style="font-size:52px;color:${C.red};margin-top:26px">1+1 GRATIS</div>
    <div style="position:relative;height:400px">${pair(360, 70, 14)}</div>
    <div class="bc" style="font-size:80px;color:${C.red}">120 capsule</div><div style="font:700 28px Inter;margin-top:8px">2–3 luni · transport gratuit</div></div>
  `, `body{background:${C.cream}}`, C.ink) });

// O05 – winter covered (stove bg)
ads.push({ id: 'O05-toata-iarna', html: page(`${bg('T08')}
  <div class="panel dark" style="left:48px;top:56px;width:620px">
    <div class="h" style="font-size:52px">Toată iarna, acoperită.</div>
    <div style="font:600 29px/1.4 Inter;margin-top:16px;color:#F3E6D3">120 capsule de Cardio Balance, cu usturoi, păducel și vâsc: cura completă de 2–3 luni.</div>
    <div style="margin-top:18px">${offer(88, C.yellow)}</div></div>
  ${burst(820, 80, 210, 10)}${pair(400, 560, 560)}`) });

// O06 – what you get (order slip, no prices)
ads.push({ id: 'O06-ce-primesti', html: page(`
  <div class="abs" style="left:70px;top:70px;width:520px;padding:44px 46px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.14);transform:rotate(-2deg);font-family:Inter">
    <div style="font:800 34px Inter;letter-spacing:1px;text-align:center">COMANDA TA</div>
    <div style="border-top:3px dashed #ccc;margin:22px 0"></div>
    ${[['Cardio Balance, 60 capsule', '✓'], ['Cardio Balance, 60 capsule', 'GRATIS'], ['Transport', 'GRATIS']].map(([a, b]) => `<div style="display:flex;justify-content:space-between;font:600 27px Inter;margin:16px 0"><span>${a}</span><b style="color:${C.green}">${b}</b></div>`).join('')}
    <div style="border-top:3px dashed #ccc;margin:22px 0"></div>
    <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font:800 30px Inter">PRIMEȘTI</span><span class="bc" style="font-size:64px;color:${C.red}">120 capsule</span></div>
    <div style="font:600 24px Inter;color:#666;margin-top:10px">Plătești la livrare, curierului.</div></div>
  <div class="abs" style="left:70px;top:760px;width:540px"><div class="chk"><i>✓</i><span>Cura completă de 2–3 luni</span></div><div class="chk"><i>✓</i><span>Usturoi, păducel și vâsc</span></div></div>
  ${burst(820, 60, 200, 10)}${pair(470, 600, 430)}`, `body{background:#F3EDE4}`, C.ink) });

// O07 – ingredients bg
ads.push({ id: 'O07-reteta-bunicii-1plus1', html: page(`${bg('T03')}
  <div class="panel" style="left:48px;top:48px;width:984px;padding:30px 44px;text-align:center">
    <div class="h" style="font-size:54px">Usturoi, păducel și vâsc.</div>
    <div class="it" style="font-size:42px;color:${C.red};margin-top:6px">Acum 1+1 GRATIS: 120 de capsule.</div></div>
  <div class="panel" style="left:48px;top:790px;padding:20px 30px">${offer(70)}</div>
  ${pair(450, 560, 450)}`) });

// O08 – WhatsApp
ads.push({ id: 'O08-whatsapp-1plus1', html: page(`
  <div class="abs" style="left:0;right:0;top:0;height:120px;background:#075E54;color:#fff;display:flex;align-items:center;gap:22px;padding:0 40px"><div style="width:72px;height:72px;border-radius:50%;background:#F3D9CF;display:flex;align-items:center;justify-content:center;font:700 34px Inter;color:#7A3B2E">L</div><div><div style="font:700 34px Inter">Lenuța, vecina</div><div style="font:400 22px Inter;opacity:.8">online</div></div></div>
  ${[[160, 'in', 'Ai văzut? La Cardio Balance e 1+1 gratis acum 😮', '09:12'], [330, 'out', 'Am comandat ieri! Două borcane, unul pentru mine și unul pentru Ion 😄', '09:14 ✓✓'], [540, 'in', 'Și transportul?', '09:15'], [690, 'out', 'Gratuit, și plătești la curier. Ne ajunge 2–3 luni 🌿', '09:16 ✓✓']].map(([t, k, m, h]) => `<div style="position:absolute;top:${t}px;${k === 'in' ? 'left:40px;background:#fff;border-top-left-radius:4px' : 'right:420px;background:#DCF8C6;border-top-right-radius:4px'};max-width:560px;padding:20px 26px 32px;border-radius:18px;font:400 31px/1.35 Inter;box-shadow:0 1px 1px rgba(0,0,0,.12)">${m}<small style="position:absolute;right:16px;bottom:6px;font-size:18px;color:#7A8A7A">${h}</small></div>`).join('')}
  ${burst(790, 150, 210, 10)}${pair(420, 640, 470)}`, `body{background:#E5DDD5}`, C.ink) });

// O09 – direct question (window bg)
ads.push({ id: 'O09-tensiune-1plus1', html: page(`${bg('T06')}
  <div class="panel" style="left:48px;top:56px;width:600px">
    <div class="h" style="font-size:54px">Ai tensiune mare sau palpitații?</div>
    <div style="font:600 28px/1.4 Inter;margin-top:14px">Ia cura completă de Cardio Balance: 2 borcane, 120 capsule, pentru 2–3 luni.</div>
    <div style="margin-top:16px">${offer(84)}</div></div>
  ${burst(810, 70, 210, 10)}${pair(420, 600, 540)}`) });

// O10 – evening armchair, 2–3 months
ads.push({ id: 'O10-doua-trei-luni', html: page(`${bg('T02')}
  <div class="panel dark" style="left:48px;top:56px;width:620px">
    <div class="h" style="font-size:54px">120 de capsule.<br><span style="color:${C.yellow}">2–3 luni</span> de liniște.</div>
    <div style="font:600 29px/1.4 Inter;margin-top:16px;color:#F3E6D3">Cardio Balance cu usturoi, păducel și vâsc, pentru inimă, tensiune și circulație.</div>
    <div class="tag" style="margin-top:20px">1+1 GRATIS · transport gratuit</div></div>
  ${pair(400, 600, 560)}`) });

module.exports = ads;
