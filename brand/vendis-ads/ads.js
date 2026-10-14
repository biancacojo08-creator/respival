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
const page = (body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;
const img = (f, pos = 'center') => `<img class="bg" src="img/${f}.jpg" style="object-position:${pos}">`;
const LOGO = '<div class="logo">VENDIS HAIR</div>';

module.exports = [
  { id: 'A01-paie', html: page(`${img('blonda-cenusie', '50% 30%')}<div class="shade-top"></div><div class="shade-bot"></div>${LOGO}
    <div class="h" style="top:140px">Părul tău arată ca <span>paiele?</span></div>
    <div class="sub" style="top:400px">Ars de decolorare, uscat, fără strălucire.<br>Masca cu <b style="color:var(--pink)">15% keratină</b> îl face moale și lucios din nou.</div>${foot()}`) },

  { id: 'A02-de-ani', html: page(`${img('borcan-real', '50% 60%')}<div class="shade-bot"></div>${LOGO}
    <div class="note" style="left:80px;right:80px;top:150px">O folosesc eu însămi de ani de zile. De-asta o recomand din tot sufletul. Chiar ajută!<small>♥ poză reală, fără filtre</small></div>${foot()}`) },

  { id: 'A03-reducere', html: page(`${img('hero-m', '50% 50%')}<div class="shade-top"></div>${LOGO}
    <div class="h" style="top:140px">Reducere<br><span>−50%</span></div>
    <div class="sub" style="top:390px">Masca de păr cu 15% keratină,<br>acum la jumătate de preț.</div>
    <div class="sticker" style="right:60px;top:700px"><span>DOAR</span><b>49,99</b><span>LEI</span></div>${foot()}`) },

  { id: 'A04-beneficii', html: page(`${img('roscata', '35% 50%')}<div class="shade-top" style="height:100%;background:linear-gradient(90deg,rgba(0,0,0,.8),rgba(0,0,0,.35) 70%,transparent)"></div>${LOGO}
    <div class="h" style="top:140px;font-size:80px">Ce face<br><span class="p">pentru părul tău</span></div>
    <div class="list" style="top:430px"><div><i>✓</i>Hrănește firul în profunzime</div><div><i>✓</i>Strălucire intensă</div><div><i>✓</i>Mai puțin frizz</div><div><i>✓</i>Vârfuri cu aspect sănătos</div><div><i>✓</i>Ideală pentru păr vopsit</div></div>${foot()}`) },

  { id: 'A05-salon', html: page(`${img('blonda-miere', '50% 40%')}<div class="shade-top"></div><div class="shade-bot"></div>${LOGO}
    <div class="h" style="top:140px">Tratament de salon.<br><span class="p">Acasă.</span></div>
    <div class="sub" style="top:470px">Fără programare. Fără sute de lei.<br>Doar câteva minute după șampon.</div>${foot()}`) },

  { id: 'A06-semne', html: page(`${img('bruneta-baie', '50% 30%')}<div class="shade-top" style="height:100%;background:linear-gradient(180deg,rgba(0,0,0,.8),rgba(0,0,0,.3) 60%,rgba(0,0,0,.6))"></div>${LOGO}
    <div class="h" style="top:140px;font-size:76px">3 semne că părul tău cere <span>keratină</span></div>
    <div class="list" style="top:520px"><div><b>1</b>Se rupe la periat</div><div><b>2</b>Are vârfuri despicate</div><div><b>3</b>E tern, fără strălucire</div></div>${foot()}`) },

  { id: 'A07-varfuri', html: page(`${img('saten', '50% 35%')}<div class="shade-top"></div><div class="shade-bot"></div>${LOGO}
    <div class="h" style="top:140px">Vârfuri despicate?<br><span>Nu tăia!</span></div>
    <div class="sub" style="top:520px">Hrănește-le cu 15% keratină și redă-le aspectul sănătos.</div>${foot()}`) },

  { id: 'A08-pasi', html: page(`${img('hero-d', '82% 50%')}<div class="shade-top" style="height:100%;background:linear-gradient(180deg,rgba(0,0,0,.8),rgba(0,0,0,.4) 55%,rgba(0,0,0,.65))"></div>${LOGO}
    <div class="h" style="top:140px;font-size:84px">Cum o <span class="p">folosești</span></div>
    <div class="list" style="top:360px"><div><b>1</b>Speli părul cu șampon</div><div><b>2</b>Aplici masca pe lungimi și vârfuri</div><div><b>3</b>Lași câteva minute și clătești</div></div>
    <div class="sub" style="top:850px;font-size:44px;color:var(--gold)">Gata. Păr moale și lucios.</div>${foot()}`) },

  { id: 'A09-pov', html: page(`${img('blonda-living', '50% 40%')}<div class="shade-bot"></div>
    <div class="pov" style="top:70px">POV: ți-ai găsit în sfârșit <b>masca de păr</b> pe care o cumperi iar și iar</div>${foot()}`) },

  { id: 'A10-vopsit', html: page(`${img('bruneta-selfie', '50% 30%')}<div class="shade-top"></div><div class="shade-bot"></div>${LOGO}
    <div class="h" style="top:140px;font-size:84px">Păr vopsit?<br>Păstrează-i <span class="p">strălucirea</span></div>
    <div class="sub" style="top:470px">Culoare mai vie, păr mai moale,<br>fără frizz.</div>${foot()}`) },
];
