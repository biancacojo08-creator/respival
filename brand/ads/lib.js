// Shared building blocks for Novensa PROSTA COMPLEX ads (1080x1080).
const FONTS = `
@font-face{font-family:Merri;font-weight:700;src:url(../../fonts/Merriweather-700.ttf)}
@font-face{font-family:Merri;font-weight:900;src:url(../../fonts/Merriweather-900.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Barlow;font-weight:700;src:url(../../fonts/BarlowCondensed-700.ttf)}
@font-face{font-family:Barlow;font-weight:800;src:url(../../fonts/BarlowCondensed-800.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../fonts/Caveat-700.ttf)}
`;

const BASE_CSS = `
${FONTS}
:root{--black:#0b0b0b;--ink:#141414;--gold1:#f7e19c;--gold2:#d4a24c;--gold3:#8f5f1f;--green:#5ba33b;--cream:#f6f1e7;--red:#c8102e}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden;background:var(--black)}
body{font-family:Inter,sans-serif;color:#fff;position:relative}
.gold{background:linear-gradient(180deg,var(--gold1) 0%,var(--gold2) 55%,var(--gold3) 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.serif{font-family:Merri,serif;font-weight:900}
.abs{position:absolute}
.tag{display:inline-flex;align-items:center;gap:16px;padding:10px 26px 10px 10px;border-radius:60px;background:rgba(255,255,255,.08);border:1.5px solid rgba(212,162,76,.55);font:600 26px Inter;color:#f3e6c8;backdrop-filter:blur(4px)}
.tag .ico{width:58px;height:58px;border-radius:50%;background:linear-gradient(160deg,#e9c46a,#9b6a24);display:flex;align-items:center;justify-content:center}
.tag .ico svg{width:34px;height:34px}
.tag b{color:#fff;font-weight:700}
.quote{font-family:Merri,serif;font-weight:900;line-height:1.16;letter-spacing:-.5px}
.qmark{font-family:Merri,serif;font-weight:900;font-size:150px;line-height:.6;height:70px}
.rule{height:4px;border-radius:2px;background:linear-gradient(90deg,var(--gold3),var(--gold1),var(--gold3))}
.footer{position:absolute;left:0;right:0;bottom:0;height:120px;background:#000;border-top:2px solid rgba(212,162,76,.6);display:flex;align-items:center;justify-content:space-between;padding:0 30px}
.badges{display:flex;flex-direction:column;gap:4px}
.badges .row{display:flex;gap:14px;font:600 19px Inter;color:#eadfc6;white-space:nowrap}
.badges .row span:before{content:"✓ ";color:var(--green);font-weight:700}
.badges small{font:400 14px Inter;color:#8d8577;white-space:nowrap}
.cta{background:linear-gradient(180deg,#f3d27e,#c48a2f);color:#1a1205;font:800 30px Barlow;letter-spacing:.5px;text-transform:uppercase;padding:14px 20px;border-radius:12px;box-shadow:0 6px 0 #7a5214;white-space:nowrap}
.price{display:flex;align-items:baseline;gap:10px;margin-right:16px;white-space:nowrap}
.price .now{font:800 46px Barlow;color:#fff}
.price .old{font:700 26px Barlow;color:#9a9083;text-decoration:line-through}
.sticker{position:absolute;width:170px;height:170px;border-radius:50%;background:var(--red);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-12deg);box-shadow:0 10px 30px rgba(0,0,0,.45);border:4px dashed rgba(255,255,255,.55)}
.sticker b{font:800 62px Barlow;line-height:1}
.sticker span{font:700 22px Barlow;letter-spacing:1px}
`;

// ---------- the product box (recreated from the packaging) ----------
const LEAF = `<svg viewBox="0 0 60 60"><path d="M30 54C14 46 8 30 14 10c14 4 22 18 16 44z" fill="#3f8f2a"/><path d="M30 54c4-20 12-34 26-38 2 20-8 34-26 38z" fill="#7cc04b"/><path d="M30 54C24 38 20 26 14 10" stroke="#1f5a14" stroke-width="2" fill="none"/></svg>`;

const PLANTS = `<svg viewBox="0 0 300 120" class="plants">
  <ellipse cx="40" cy="98" rx="22" ry="12" fill="#c9a227" transform="rotate(-25 40 98)"/>
  <ellipse cx="62" cy="106" rx="16" ry="9" fill="#e0bb3a" transform="rotate(20 62 106)"/>
  <path d="M20 70c10-30 40-40 60-30-10 22-34 36-60 30z" fill="#3e8a2a"/>
  <path d="M60 60c20-26 52-26 66-10-18 18-44 22-66 10z" fill="#5aa33a"/>
  <path d="M95 92c14-18 38-20 52-8-14 14-36 18-52 8z" fill="#2f6f20"/>
  <circle cx="34" cy="80" r="6" fill="#b5651d"/><circle cx="48" cy="74" r="5" fill="#9c4f12"/>
  <path d="M250 100c-6-30 10-56 40-62 2 30-14 54-40 62z" fill="#3e8a2a" opacity=".85"/>
  <path d="M232 108c-16-18-14-44 4-58 14 20 12 44-4 58z" fill="#5aa33a" opacity=".85"/>
</svg>`;

function productBox(scale = 1, extraStyle = '') {
  return `
<div class="boxwrap" style="transform:scale(${scale});${extraStyle}">
  <div class="box3d">
    <div class="face front">
      <div class="logo">${LEAF}<span>NOVENSA</span></div>
      <div class="pname gold">PROSTA</div>
      <div class="pcomplex">COMPLEX</div>
      <div class="prule"></div>
      <div class="pclaim">Suport rapid și complet<br>pentru prostată</div>
      <ul class="pbul"><li>Susține sănătatea prostatei și funcția urinară.</li><li>Contribuie la reducerea disconfortului</li></ul>
      ${PLANTS}
      <div class="plichid">SUPLIMENT LICHID</div>
      <div class="pml">100 ml</div>
    </div>
    <div class="face side">
      <div class="sname gold">PROSTA</div><div class="scomplex">COMPLEX</div>
      <div class="srule"></div>
      <div class="stxt"><b>INGREDIENTE:</b><br>Extract de Serenoa repens, Extract de Urzică, Extract de Dovleac, Zinc, Seleniu, Vitamina E.<br><br><b>MOD DE UTILIZARE:</b><br>Adulți: câte 30 de picături (1 ml), de 2 ori pe zi, dizolvate în puțină apă.</div>
      <div class="sbadges"><span>${LEAF}</span><span class="ro"><i></i><i></i><i></i></span></div>
    </div>
    <div class="face top"></div>
  </div>
  <div class="boxshadow"></div>
</div>`;
}

const BOX_CSS = `
.boxwrap{position:absolute;width:300px;height:460px;perspective:1600px;transform-origin:top left}
.box3d{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateY(24deg) rotateX(-4deg)}
.face{position:absolute;backface-visibility:hidden}
.front{width:300px;height:460px;transform:translateZ(45px);background:radial-gradient(120% 70% at 50% 100%,#1d2a17 0%,#111 45%,#0a0a0a 100%);border:1px solid #2a2a2a;padding:30px 22px 0;text-align:center;overflow:hidden;box-shadow:inset 0 0 40px rgba(0,0,0,.6)}
.front:after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,0) 35%,rgba(0,0,0,.25) 100%)}
.side{width:90px;height:460px;transform:rotateY(-90deg) translateZ(45px);background:linear-gradient(90deg,#050505,#121212);border:1px solid #222;padding:22px 8px;text-align:left}
.top{width:300px;height:90px;transform:rotateX(90deg) translateZ(45px);background:#1a1a1a}
.logo{display:flex;align-items:center;justify-content:center;gap:6px}
.logo svg{width:38px;height:38px}
.logo span{font:900 27px Merri;color:#4f9a30;letter-spacing:.5px}
.pname{font:900 58px Merri;line-height:1.05;margin-top:16px;letter-spacing:.5px}
.pcomplex{font:900 37px Merri;color:#f1ece2;letter-spacing:1px;margin-top:-2px}
.prule{height:3px;margin:14px -22px 14px;background:linear-gradient(90deg,transparent,#d4a24c 15%,#f7e19c 50%,#d4a24c 85%,transparent)}
.pclaim{font:400 16px Inter;color:#eee;line-height:1.3}
.pbul{list-style:none;text-align:left;margin:10px 4px 0 14px;font:700 11.5px Merri;color:#ddd;line-height:1.35}
.pbul li{position:relative;margin-bottom:6px}
.pbul li:before{content:"•";position:absolute;left:-10px}
.plants{position:absolute;left:10px;bottom:52px;width:280px;height:84px}
.plichid{position:absolute;left:0;right:0;bottom:30px;font:700 21px Inter;color:#f2f2f2;letter-spacing:.3px}
.pml{position:absolute;left:0;right:0;bottom:8px;font:600 16px Inter;color:#ddd}
.sname{font:900 19px Merri;line-height:1}
.scomplex{font:900 11px Merri;color:#ddd;margin-top:2px}
.srule{height:1px;background:#a77a35;margin:8px 0}
.stxt{font:400 7.5px Inter;color:#bbb;line-height:1.35}
.stxt b{color:#ddd}
.sbadges{position:absolute;bottom:22px;left:8px;right:8px;display:flex;justify-content:space-around;align-items:center}
.sbadges svg{width:22px;height:22px}
.ro{display:flex;width:22px;height:22px;border-radius:50%;overflow:hidden}
.ro i{flex:1}.ro i:nth-child(1){background:#002b7f}.ro i:nth-child(2){background:#fcd116}.ro i:nth-child(3){background:#ce1126}
.boxshadow{position:absolute;left:-30px;right:-50px;bottom:-26px;height:46px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.75),transparent);transform:translateZ(-1px)}
`;

// ---------- small icons for persona tags ----------
const I = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="#1a1205" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICONS = {
  bee: I('<ellipse cx="12" cy="14" rx="5" ry="6"/><path d="M7 12h10M7.5 16h9"/><path d="M9 8c-3-4-7-2-5 1M15 8c3-4 7-2 5 1"/>'),
  wheel: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M3.5 10h6M14.5 10h6M12 14.5V21"/>'),
  heart: I('<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'),
  phone: I('<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>'),
  glasses: I('<circle cx="7" cy="14" r="3.5"/><circle cx="17" cy="14" r="3.5"/><path d="M10.5 14h3M3.5 13l1-4M20.5 13l-1-4"/>'),
  fish: I('<path d="M3 12c4-5 10-5 14 0-4 5-10 5-14 0z"/><path d="M17 12l4-3v6z"/><circle cx="8" cy="11" r=".8" fill="#1a1205"/>'),
  truck: I('<rect x="2" y="7" width="12" height="9"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
  tie: I('<path d="M10 3h4l-1 3 2 10-3 5-3-5 2-10z"/>'),
  moon: I('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
  saw: I('<path d="M3 15l12-9 4 4-12 9z"/><path d="M6 17l1 1M9 15l1 1M12 13l1 1"/>'),
};

function tag(icon, html) {
  return `<div class="tag"><span class="ico">${ICONS[icon]}</span><span>${html}</span></div>`;
}

function footer({ price = true } = {}) {
  return `<div class="footer">
    <div class="badges"><div class="row"><span>Ingrediente naturale</span><span>Fabricat în România</span><span>Plata la livrare</span></div>
    <small>Supliment alimentar. Rezultatele pot varia.</small></div>
    <div style="display:flex;align-items:center">${price ? `<div class="price"><span class="old">99,99</span><span class="now">64,99 lei</span></div>` : ''}<div class="cta">Comandă acum</div></div>
  </div>`;
}

function page(css, body) {
  return `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${BASE_CSS}${BOX_CSS}${css}</style></head><body>${body}</body></html>`;
}

module.exports = { page, productBox, tag, footer, ICONS, LEAF };
