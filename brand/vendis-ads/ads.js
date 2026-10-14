// 10 static ads for the VENDIS HAIR keratin mask (1080x1350, 4:5 feed).
// Built only from photos we already have in img/, rendered locally by render.js.
const W = 1080, H = 1350;
const F = '../fonts/';
const CSS = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:C;font-weight:700;src:url(${F}Caveat-700.ttf)}
:root{--pink:#F06BA8;--gold:#D9B45A;--red:#E3262E;--ink:#0d0b0c}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:var(--ink);color:#fff;font-family:I,sans-serif}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.shade-top{position:absolute;left:0;right:0;top:0;height:620px;background:linear-gradient(180deg,rgba(0,0,0,.78),rgba(0,0,0,.45) 55%,transparent)}
.shade-bot{position:absolute;left:0;right:0;bottom:0;height:560px;background:linear-gradient(0deg,rgba(0,0,0,.85),rgba(0,0,0,.4) 60%,transparent)}
.logo{position:absolute;left:50px;top:46px;font:800 30px A;letter-spacing:4px;color:var(--pink);border:2px solid rgba(255,255,255,.75);padding:8px 18px;background:rgba(0,0,0,.35)}
.h{position:absolute;left:50px;right:50px;font:900 92px/1 A;text-transform:uppercase;letter-spacing:-2px;text-shadow:0 4px 18px rgba(0,0,0,.5)}
.h span{background:var(--red);padding:0 14px;box-decoration-break:clone;-webkit-box-decoration-break:clone;display:inline-block;transform:rotate(-1.5deg);margin-top:6px}
.h span.p{background:var(--pink);color:var(--ink)}
.sub{position:absolute;left:50px;right:50px;font:700 40px/1.25 I;text-shadow:0 2px 10px rgba(0,0,0,.6)}
.list{position:absolute;left:50px;right:50px;display:flex;flex-direction:column;gap:20px}
.list div{display:flex;align-items:center;gap:22px;font:800 42px/1.1 A;background:rgba(0,0,0,.55);border-left:8px solid var(--pink);padding:18px 24px;border-radius:0 14px 14px 0;width:fit-content;max-width:100%}
.list b{flex:none;width:58px;height:58px;border-radius:50%;background:var(--pink);color:var(--ink);font:900 34px/58px A;text-align:center}
.list i{font-style:normal;color:var(--gold);font-size:46px}
.sticker{position:absolute;width:230px;height:230px;border-radius:50%;background:var(--red);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(12deg);box-shadow:0 14px 34px rgba(0,0,0,.5);border:5px dashed rgba(255,255,255,.6)}
.sticker b{font:900 86px/1 A}.sticker span{font:800 28px A;letter-spacing:2px}
.foot{position:absolute;left:0;right:0;bottom:0;height:200px;background:var(--ink);border-top:4px solid var(--gold);display:flex;align-items:center;justify-content:space-between;padding:0 50px}
.price{display:flex;flex-direction:column;line-height:1}
.price s{font:800 34px A;color:#9b9096;text-decoration-color:var(--red);text-decoration-thickness:4px}
.price b{font:900 96px A;letter-spacing:-3px}.price b small{font-size:42px;letter-spacing:0}
.cta{background:var(--pink);color:var(--ink);font:900 46px A;text-transform:uppercase;padding:26px 40px;border-radius:999px;box-shadow:0 8px 0 #a43a6c;white-space:nowrap}
.chk{position:absolute;left:0;right:0;bottom:208px;text-align:center;font:700 26px I;color:#fff;text-shadow:0 2px 8px #000}
.chk span{margin:0 14px}.chk span:before{content:"✓ ";color:var(--pink)}
.note{position:absolute;background:#fffdf6;color:#1b1b1b;font:700 64px/1.12 C;padding:40px 46px 34px;border-radius:6px;box-shadow:0 22px 50px rgba(0,0,0,.45);transform:rotate(-3deg)}
.note:before{content:"";position:absolute;left:50%;top:-22px;width:150px;height:44px;margin-left:-75px;background:rgba(240,107,168,.55);transform:rotate(2deg)}
.note small{display:block;margin-top:18px;font:700 44px C;color:#b2346f}
.pov{position:absolute;left:60px;right:60px;background:#fff;color:#111;font:800 50px/1.2 I;padding:28px 34px;border-radius:22px;box-shadow:0 10px 30px rgba(0,0,0,.35)}
.pov b{color:var(--pink)}
`;
const foot = (old = true) => `
<div class="chk"><span>15% keratină</span><span>200 ml</span><span>păr deteriorat</span></div>
<div class="foot"><div class="price">${old ? '<s>99,98 lei</s>' : ''}<b>49,99<small> lei</small></b></div><div class="cta">Comandă acum</div></div>`;
const SPLIT = `
.col{position:absolute;top:0;bottom:250px;width:440px;padding:44px 36px;justify-content:center;background:linear-gradient(180deg,#1d1418,#0d0b0c);display:flex;flex-direction:column;gap:26px}
.col .logo{position:absolute;top:44px;left:36px;font-size:24px;padding:6px 14px}
.col .h{position:static;font-size:58px;line-height:1.02;letter-spacing:-1px;text-shadow:none}
.col .h span{margin-top:8px}
.col .sub{position:static;font:600 30px/1.3 I;text-shadow:none;color:#eee}
.col .sub b{color:var(--pink)}
.col .list{position:static;gap:14px}
.col .list div{font:800 28px/1.15 A;padding:14px 16px;gap:14px;background:rgba(255,255,255,.06)}
.col .list b{width:44px;height:44px;font-size:26px;line-height:44px}
.col .list i{font-size:32px}
.col .note{position:static;font-size:50px;padding:34px 30px 26px;margin-top:30px}
.col .note small{font-size:36px}
.col .pov{position:static;font-size:38px;padding:24px 26px}
.col .big{font:900 128px/0.9 A;color:var(--red);letter-spacing:-6px}
.ph{position:absolute;top:0;bottom:250px;width:640px;overflow:hidden}
.ph img{width:100%;height:100%;object-fit:cover}
.L .col{left:0}.L .ph{right:0}.R .col{right:0}.R .ph{left:0}
.foot{height:250px;padding-top:50px}
.chk{bottom:auto;top:1112px;z-index:2;text-shadow:none;color:#ddd;font-size:24px}
.tophead{position:absolute;left:0;right:0;top:0;height:560px;padding:44px 50px;background:linear-gradient(180deg,#1d1418,#0d0b0c)}
.tophead .logo{position:static;display:inline-block;font-size:24px;padding:6px 14px;margin-bottom:24px}
.tophead .h{position:static;font-size:76px;text-shadow:none}
.tophead .list{position:static;margin-top:26px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.tophead .list div{font:800 28px/1.15 A;padding:14px 16px;gap:12px;background:rgba(255,255,255,.06);width:auto}
.tophead .list i{font-size:32px}
.wide{position:absolute;left:0;right:0;top:560px;bottom:250px;overflow:hidden}.wide img{width:100%;height:100%;object-fit:cover}
`;
const page = (body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${SPLIT}</style></head><body>${body}</body></html>`;
const img = (f, pos = 'center') => `<img class="bg" src="img/${f}.jpg" style="object-position:${pos}">`;
const LOGO = '<div class="logo">VENDIS HAIR</div>';

const split = (side, file, pos, col) => page(`<div class="${side}"><div class="ph"><img src="img/${file}.jpg" style="object-position:${pos}"></div>
  <div class="col"><div class="logo">VENDIS HAIR</div>${col}</div></div>${foot()}`);

module.exports = [
  { id: 'A01-paie', html: split('L', 'blonda-cenusie', '50% 50%', `
    <div class="h">Părul tău arată ca <span>paiele?</span></div>
    <div class="sub">Ars de decolorare, uscat, fără strălucire.</div>
    <div class="sub">Masca cu <b>15% keratină</b> îl face moale și lucios din nou.</div>`) },

  { id: 'A02-de-ani', html: split('R', 'borcan-real', '45% 50%', `
    <div class="note">O folosesc eu însămi de ani de zile. De-asta o recomand din tot sufletul. Chiar ajută!<small>♥ poză reală, fără filtre</small></div>`) },

  { id: 'A03-reducere', html: split('L', 'hero-m', '50% 50%', `
    <div class="h">Reducere</div><div class="big">−50%</div>
    <div class="sub">Masca de păr cu <b>15% keratină</b>, acum la jumătate de preț.</div>
    <div class="sticker" style="position:relative;transform:rotate(-8deg);width:210px;height:210px;margin-top:10px"><span>DOAR</span><b style="font-size:72px">49,99</b><span>LEI</span></div>`) },

  { id: 'A04-beneficii', html: page(`<div class="tophead"><div class="logo">VENDIS HAIR</div>
    <div class="h">Ce face pentru <span class="p">părul tău</span></div>
    <div class="list"><div><i>✓</i>Hrănește firul în profunzime</div><div><i>✓</i>Strălucire intensă</div><div><i>✓</i>Mai puțin frizz</div><div><i>✓</i>Vârfuri cu aspect sănătos</div></div></div>
    <div class="wide"><img src="img/hero-d.jpg" style="object-position:70% 50%"></div>${foot()}`) },

  { id: 'A05-salon', html: split('R', 'blonda-miere', '62% 50%', `
    <div class="h" style="font-size:52px">Tratament de salon. <span class="p">Acasă.</span></div>
    <div class="sub">Fără programare.<br>Fără sute de lei.</div>
    <div class="sub">Doar câteva minute după șampon.</div>`) },

  { id: 'A06-semne', html: split('L', 'bruneta-baie', '50% 50%', `
    <div class="h" style="font-size:52px">3 semne că părul tău cere <span>keratină</span></div>
    <div class="list"><div><b>1</b>Se rupe la periat</div><div><b>2</b>Are vârfuri despicate</div><div><b>3</b>E tern, fără strălucire</div></div>`) },

  { id: 'A07-varfuri', html: split('R', 'saten', '62% 50%', `
    <div class="h" style="font-size:54px">Vârfuri despicate? <span>Nu tăia!</span></div>
    <div class="sub">Hrănește-le cu <b>15% keratină</b> și redă-le aspectul sănătos.</div>`) },

  { id: 'A08-pasi', html: split('L', 'roscata', '42% 50%', `
    <div class="h">Cum o <span class="p">folosești</span></div>
    <div class="list"><div><b>1</b>Speli părul cu șampon</div><div><b>2</b>Aplici masca pe lungimi și vârfuri</div><div><b>3</b>Lași câteva minute și clătești</div></div>
    <div class="sub" style="color:var(--gold)">Gata. Păr moale și lucios.</div>`) },

  { id: 'A09-pov', html: split('R', 'blonda-living', '40% 50%', `
    <div class="pov">POV: ți-ai găsit în sfârșit <b>masca de păr</b> pe care o cumperi iar și iar</div>
    <div class="sub">Păr moale, lucios și ușor de pieptănat.</div>`) },

  { id: 'A10-vopsit', html: split('L', 'bruneta-selfie', '45% 50%', `
    <div class="h" style="font-size:44px">Păr vopsit?<br>Păstrează&#8209;i <span class="p">strălucirea</span></div>
    <div class="sub">Culoare mai vie, păr mai moale, fără frizz.</div>`) },
];
