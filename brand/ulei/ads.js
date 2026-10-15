// 10 Facebook/Instagram ads (4:5, 1080x1350) for ULEI ANTI-FUNGIC "Sănătatea Ta", offer 1+1 la 60 lei.
// Wording avoids medical cure promises (Meta rejects "vindecă", "scapi definitiv" etc.).
const FONTS = `
@font-face{font-family:Mont;font-weight:800;src:url(../../fonts/Montserrat-800.ttf)}
@font-face{font-family:Mont;font-weight:900;src:url(../../fonts/Montserrat-900.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Barlow;font-weight:800;src:url(../../fonts/BarlowCondensed-800.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
`;
const CSS = `${FONTS}
:root{--p:#6d2f86;--p2:#9b4fb5;--l:#f3e6f7;--y:#ffd23f;--r:#e3184f;--ink:#2a1233}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:Inter,sans-serif;color:var(--ink);position:relative;background:var(--l)}
.abs{position:absolute}
.bgimg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.h{font:900 84px/1.02 Mont;letter-spacing:-1.5px}
.h2{font:800 46px/1.15 Mont}
.sub{font:600 36px/1.3 Inter}
.hl{background:var(--y);color:var(--ink);padding:0 12px;border-radius:8px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.offer{position:absolute;left:0;right:0;bottom:0;height:190px;background:var(--p);display:flex;align-items:center;justify-content:space-between;padding:0 48px;color:#fff}
.offer .big{font:800 96px/1 Barlow;color:var(--y);letter-spacing:1px}
.offer .txt{font:800 40px/1.05 Barlow;text-transform:uppercase}
.offer .txt small{display:block;font:600 24px Inter;text-transform:none;color:#ead7f2;margin-top:6px}
.cta{background:var(--y);color:var(--ink);font:800 40px Barlow;text-transform:uppercase;padding:20px 30px;border-radius:16px;box-shadow:0 7px 0 #b38a00;white-space:nowrap}
.burst{position:absolute;width:290px;height:290px;border-radius:50%;background:var(--r);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 14px 34px rgba(0,0,0,.35);border:6px dashed rgba(255,255,255,.6);text-align:center}
.burst b{font:800 100px/0.9 Barlow}
.burst span{font:800 34px/1 Barlow;letter-spacing:1px;text-transform:uppercase}
.burst em{font:800 58px/1 Barlow;font-style:normal;color:var(--y)}
.prod{position:absolute;filter:drop-shadow(0 30px 30px rgba(60,10,80,.35))}
.card{background:rgba(255,255,255,.94);border-radius:28px;padding:34px 40px;box-shadow:0 18px 40px rgba(0,0,0,.18)}
.list{list-style:none}
.list li{font:600 38px/1.25 Inter;margin:16px 0;padding-left:62px;position:relative}
.list li:before{content:"✓";position:absolute;left:0;top:-2px;width:46px;height:46px;border-radius:50%;background:var(--p);color:#fff;font:800 30px/46px Inter;text-align:center}
.list.x li:before{content:"✕";background:var(--r)}
.pill{display:inline-block;background:var(--r);color:#fff;font:800 34px Barlow;letter-spacing:1px;text-transform:uppercase;padding:10px 24px;border-radius:40px}
.shade-top{position:absolute;left:0;right:0;top:0;height:520px;background:linear-gradient(180deg,rgba(30,8,40,.78),rgba(30,8,40,0))}
.white{color:#fff;text-shadow:0 3px 18px rgba(0,0,0,.35)}
`;
const P = '../produs-cutout.png';
const S = n => `../scene/${n}.jpg`;
const offerBar = (cta = 'Comandă acum', bg = '') => `<div class="offer"${bg ? ` style="background:${bg}"` : ''}><div style="display:flex;align-items:center;gap:26px"><div class="big">1+1</div><div class="txt">la doar 60 lei<small>2 flacoane · 30 lei bucata</small></div></div><div class="cta">${cta} ›</div></div>`;
const page = body => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;

module.exports = [
  { id: 'U01-selfie', html: page(`
    <img class="bgimg" src="${S('selfie')}" style="object-position:50% 70%">
    <div class="shade-top"></div>
    <div class="abs h white" style="left:50px;top:50px;width:980px;font-size:76px">Unghii îngroșate<br>și îngălbenite?</div>
    <div class="abs sub white" style="left:54px;top:250px;width:900px;font-size:40px">Eu am pus <span class="hl">2 picături seara.</span></div>
    <div class="burst" style="left:40px;top:870px;width:240px;height:240px"><span>oferta</span><b>1+1</b><em>60 lei</em></div>
    ${offerBar()}`) },

  { id: 'U02-sandale', html: page(`
    <img class="bgimg" src="${S('sandale')}">
    <div class="abs" style="left:0;right:0;top:0;height:470px;background:linear-gradient(180deg,rgba(255,250,240,.95),rgba(255,250,240,0))"></div>
    <div class="abs h" style="left:50px;top:56px;width:980px">Vara asta porți<br><span style="color:var(--p)">sandale fără jenă.</span></div>
    <div class="abs sub" style="left:54px;top:268px;width:900px">Îngrijire zilnică pentru unghii cu aspect curat.</div>
    <div class="burst" style="left:40px;top:780px;width:250px;height:250px"><span>oferta</span><b>1+1</b><em>60 lei</em></div>
    ${offerBar()}`) },

  { id: 'U03-rutina', html: page(`
    <img class="bgimg" src="${S('baie')}" style="object-position:50% 30%">
    <div class="abs card" style="left:44px;top:44px;width:560px">
      <div class="h2" style="color:var(--p);font-size:52px">Rutina de 30 de secunde</div>
      <ol class="list" style="margin-top:14px">
        <li style="font-size:33px">Spală și usucă unghia</li>
        <li style="font-size:33px">Aplică 1–2 picături</li>
        <li style="font-size:33px">Repetă zilnic, cu răbdare</li>
      </ol>
    </div>
    <img class="prod" src="${P}" style="right:30px;bottom:200px;width:330px">
    ${offerBar()}`) },

  { id: 'U04-colet', html: page(`
    <img class="bgimg" src="${S('colet')}" style="object-position:50% 60%">
    <div class="abs" style="left:0;right:0;top:0;height:300px;background:linear-gradient(180deg,rgba(255,255,255,.96) 55%,rgba(255,255,255,0))"></div>
    <div class="abs h" style="left:50px;top:46px;width:980px;font-size:80px">Primești <span style="color:var(--r)">2 flacoane</span><br>și plătești unul.</div>
    <div class="burst" style="right:36px;top:820px;width:260px;height:260px"><span>doar</span><b>60</b><em>lei</em></div>
    ${offerBar('Vreau 1+1')}`) },

  { id: 'U05-hero-oferta', html: page(`
    <div class="abs" style="inset:0;background:radial-gradient(90% 70% at 50% 55%,#fff 0%,#f3e6f7 55%,#d9b8e6 100%)"></div>
    <div class="abs" style="left:0;right:0;top:50px;text-align:center"><span class="pill">Ofertă limitată</span></div>
    <div class="abs h" style="left:0;right:0;top:130px;text-align:center;font-size:150px;color:var(--p)">1+1</div>
    <div class="abs h2" style="left:0;right:0;top:290px;text-align:center;font-size:66px">la doar <span style="color:var(--r)">60 lei</span></div>
    <img class="prod" src="${P}" style="left:90px;top:420px;width:560px">
    <img class="prod" src="${P}" style="left:450px;top:440px;width:540px">
    ${offerBar()}`) },

  { id: 'U06-ascunzi', html: page(`
    <div class="abs" style="inset:0;background:linear-gradient(160deg,#fff 0%,#f3e6f7 100%)"></div>
    <div class="abs h" style="left:50px;top:56px;width:980px;font-size:80px">Îți ascunzi<br><span style="color:var(--p)">unghiile de la picioare?</span></div>
    <ul class="list x abs" style="left:50px;top:300px;width:600px">
      <li>Nu mai porți sandale</li>
      <li>Eviți piscina și plaja</li>
      <li>Unghii galbene, îngroșate</li>
    </ul>
    <div class="abs h2" style="left:50px;top:690px;width:560px;color:var(--p)">E timpul pentru<br>o îngrijire constantă.</div>
    <img class="prod" src="${P}" style="right:20px;top:520px;width:470px">
    ${offerBar()}`) },

  { id: 'U07-matematica', html: page(`
    <div class="abs" style="inset:0;background:var(--p)"></div>
    <div class="abs h white" style="left:50px;top:60px;width:980px;font-size:78px">Fă calculul:</div>
    <div class="abs card" style="left:50px;top:200px;width:980px;padding:30px 44px">
      <div style="display:flex;justify-content:space-between;font:800 54px Barlow;padding:10px 0;border-bottom:3px dashed #e3cdea"><span>1 flacon</span><span>60 lei</span></div>
      <div style="display:flex;justify-content:space-between;font:800 54px Barlow;padding:10px 0;border-bottom:3px dashed #e3cdea;color:var(--r)"><span>2 flacoane</span><span>TOT 60 lei</span></div>
      <div style="display:flex;justify-content:space-between;font:800 54px Barlow;padding:10px 0;color:var(--p)"><span>Adică</span><span>30 lei bucata</span></div>
    </div>
    <img class="prod" src="${P}" style="left:60px;top:560px;width:520px">
    <img class="prod" src="${P}" style="left:470px;top:580px;width:500px">
    ${offerBar('Comandă acum', '#3d1450')}`) },

  { id: 'U08-de-ce-2', html: page(`
    <div class="abs" style="inset:0;background:linear-gradient(180deg,#f3e6f7,#fff)"></div>
    <div class="abs h" style="left:50px;top:56px;width:980px;font-size:76px">De ce <span style="color:var(--r)">2 flacoane?</span></div>
    <div class="abs sub" style="left:54px;top:170px;width:960px;font-size:38px">Unghia crește încet, câțiva milimetri pe lună. Rezultatul vine cu <b>aplicare zilnică, luni la rând.</b></div>
    <div class="abs card" style="left:50px;top:360px;width:620px">
      <ul class="list">
        <li>Nu rămâi fără ulei la jumătate</li>
        <li>Unul acasă, unul în geantă</li>
        <li>Sau unul pentru cineva drag</li>
      </ul>
    </div>
    <img class="prod" src="${P}" style="right:10px;top:560px;width:420px">
    ${offerBar()}`) },

  { id: 'U09-stoc', html: page(`
    <div class="abs" style="inset:0;background:radial-gradient(80% 60% at 50% 60%,#fff,#ead5f1)"></div>
    <div class="abs" style="left:0;right:0;top:0;height:120px;background:var(--r);color:#fff;display:flex;align-items:center;justify-content:center;font:800 54px Barlow;letter-spacing:2px;text-transform:uppercase">⚠ Stoc limitat la oferta 1+1</div>
    <div class="abs h" style="left:0;right:0;top:170px;text-align:center;font-size:82px">Ultimele pachete<br><span style="color:var(--p)">la 60 lei</span></div>
    <img class="prod" src="${P}" style="left:230px;top:440px;width:620px">
    <div class="burst" style="right:36px;top:420px;width:250px;height:250px"><span>2 la</span><b>60</b><em>lei</em></div>
    ${offerBar('Prinde oferta')}`) },

  { id: 'U10-beneficii', html: page(`
    <div class="abs" style="inset:0;background:#fff"></div>
    <div class="abs" style="left:0;top:0;width:1080px;height:640px;background:linear-gradient(160deg,#9b4fb5,#6d2f86)"></div>
    <div class="abs h white" style="left:50px;top:56px;width:600px;font-size:72px">Ulei<br>Anti-Fungic<br><span style="color:var(--y)">20 ml</span></div>
    <div class="abs sub white" style="left:54px;top:400px;width:460px;font-size:34px">Pentru unghii cu aspect îngrijit, zi de zi.</div>
    <img class="prod" src="${P}" style="right:30px;top:60px;width:500px">
    <ul class="list abs" style="left:50px;top:690px;width:980px">
      <li>Pentru unghii îngroșate și decolorate</li>
      <li>Se aplică ușor, în câteva secunde</li>
      <li>Flacon de 20 ml, se folosește picătură cu picătură</li>
    </ul>
    ${offerBar()}`) },
];
