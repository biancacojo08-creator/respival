// CARDIO BALANCE – autumn indoor series (T01–T10). Canva-generated backgrounds in bg/,
// real bottle composited on top. Render: node render.js --set toamna [id-filter]
const FONTS = `
@font-face{font-family:Merriweather;font-weight:900;src:url(../../fonts/Merriweather-900.ttf)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(../../fonts/Fraunces-600i.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../fonts/Inter-700.ttf)}
@font-face{font-family:Barlow;font-weight:800;src:url(../../fonts/BarlowCondensed-800.ttf)}
`;
const C = { red: '#B3202A', green: '#2F7A2B', cream: '#FBF4E8', ink: '#1E1A16', rust: '#B5541C', amber: '#F2B33D' };

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:${C.ink}}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.abs{position:absolute}
.h{font-family:Merriweather;font-weight:900;letter-spacing:-.5px;line-height:1.1}
.it{font-family:Fraunces;font-style:italic;font-weight:600}
.panel{position:absolute;border-radius:28px;padding:44px 46px;background:rgba(251,244,232,.90);backdrop-filter:blur(6px);box-shadow:0 20px 50px rgba(0,0,0,.25)}
.dark{background:rgba(24,18,14,.72);color:#fff}
.prod{position:absolute;filter:drop-shadow(0 26px 22px rgba(0,0,0,.45)) drop-shadow(0 6px 6px rgba(0,0,0,.3))}
.shadow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.45),rgba(0,0,0,0))}
.chk{display:flex;gap:14px;font:600 27px/1.28 Inter;margin-top:14px}
.chk i{flex:none;width:36px;height:36px;border-radius:50%;background:${C.red};color:#fff;display:flex;align-items:center;justify-content:center;font:800 20px Inter;font-style:normal}
.price{font:800 54px Barlow;letter-spacing:.5px}
.tag{display:inline-block;margin-top:18px;padding:12px 22px;border-radius:999px;background:${C.green};color:#fff;font:700 24px Inter}
.foot{position:absolute;left:0;right:0;bottom:0;height:58px;display:flex;align-items:center;justify-content:center;gap:28px;font:600 20px Inter;color:#fff;background:rgba(30,22,16,.82)}
.foot span:before{content:"✓ ";font-weight:800;color:${C.amber}}
.disc{position:absolute;left:0;right:0;bottom:62px;text-align:center;font:400 14px Inter;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.8)}
.logo{position:absolute;height:40px}
`;
const PROD = '../cardio-cutout-hd.png', LOGO = '../../logo-novensa.png';
// bottle standing on a surface: x,y = top-left, h = height; adds a contact shadow at its base
const bottle = (h, x, y, rot = 0) => {
  const w = h * 0.509;
  return `<div class="shadow" style="left:${x - w * 0.1}px;top:${y + h - 26}px;width:${w * 1.2}px;height:52px"></div><img class="prod" src="${PROD}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">`;
};
const bg = id => `<div class="bg" style="background-image:url(../bg/${id}.jpg)"></div>`;
const foot = () => `<div class="foot"><span>Usturoi · Păducel · Vâsc</span><span>Plata la livrare</span><span>Transport gratuit la 2 cutii</span></div>`;
const disc = () => `<div class="disc">Supliment alimentar. Nu înlocuiește tratamentul medical. Dacă urmezi un tratament, consultă medicul.</div>`;
const checks = (items = ['Susține sănătatea inimii și a vaselor de sânge', 'Reglează ritmul cardiac și tensiunea arterială', 'Îmbunătățește circulația']) =>
  items.map(b => `<div class="chk"><i>✓</i><span>${b}</span></div>`).join('');
const page = (body, css = '') => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}${disc()}${foot()}</body></html>`;

const ads = [];

ads.push({ id: 'T01-toamna-inima', html: page(`${bg('T01')}
  <div class="panel" style="left:48px;top:56px;width:560px">
    <img src="${LOGO}" style="height:36px;margin-bottom:22px">
    <div class="h" style="font-size:58px">Toamna,<br>inima cere <span style="color:${C.rust}">grijă</span>.</div>
    ${checks()}
    <div class="price" style="margin-top:22px;color:${C.red}">69,99 lei</div></div>
  ${bottle(560, 700, 400, 2)}`) });

ads.push({ id: 'T02-fotoliu-seara', html: page(`${bg('T02')}
  <div class="panel dark" style="left:48px;top:56px;width:600px">
    <div class="it" style="font-size:60px;line-height:1.15">Seara, în liniște, îți auzi inima bătând?</div>
    <div style="font:600 28px/1.4 Inter;margin-top:22px;color:#F3E6D3">Cardio Balance, cu usturoi, păducel și vâsc, susține inima și reglează ritmul cardiac.</div>
    <div class="tag">Comandă, plătești la livrare</div></div>
  ${bottle(540, 720, 420, 0)}`) });

ads.push({ id: 'T03-reteta-bunicii', html: page(`${bg('T03')}
  <div class="panel" style="left:48px;top:48px;width:984px;padding:34px 44px;text-align:center">
    <div class="h" style="font-size:60px">Usturoi, păducel și vâsc.</div>
    <div class="it" style="font-size:44px;color:${C.red};margin-top:8px">Rețeta bunicii, într-o capsulă.</div></div>
  ${bottle(600, 640, 380, 2)}
  <div class="abs" style="left:60px;top:830px;padding:14px 26px;border-radius:16px;background:rgba(251,244,232,.92);font:700 28px Inter">Fără ceai de fiert · fără miros</div>`) });

ads.push({ id: 'T04-mic-dejun-doi', html: page(`${bg('T04')}
  <div class="panel" style="left:48px;top:56px;width:560px">
    <div class="h" style="font-size:56px">Cura pentru <span style="color:${C.red}">amândoi</span>.</div>
    <div style="font:600 28px/1.4 Inter;margin-top:16px">Două cutii, una pentru tine, una pentru el.</div>
    <div class="price" style="margin-top:20px;color:${C.red};font-size:76px;line-height:1">132,98 lei</div>
    <div style="font:700 26px Inter;color:${C.green};margin-top:8px">🚚 Transport GRATUIT</div></div>
  ${bottle(420, 640, 540, -3)}${bottle(420, 860, 550, 3)}`) });

ads.push({ id: 'T05-noptiera', html: page(`${bg('T05')}
  <div class="panel dark" style="left:48px;top:56px;width:580px">
    <div class="h" style="font-size:54px">Inima ta lucrează și noaptea.</div>
    <div class="it" style="font-size:42px;color:${C.amber};margin-top:12px">Ajut-o și tu.</div>
    <div style="font:600 27px/1.4 Inter;margin-top:20px;color:#F3E6D3">1–3 capsule pe zi. Usturoi, păducel și vâsc, pentru inimă, tensiune și circulație.</div></div>
  ${bottle(540, 720, 410, 0)}`) });

ads.push({ id: 'T06-fereastra-tensiune', html: page(`${bg('T06')}
  <div class="panel" style="left:48px;top:56px;width:580px">
    <div class="h" style="font-size:58px">Ai tensiune mare sau palpitații?</div>
    ${checks()}
    <div class="tag">Plata la livrare</div></div>
  ${bottle(540, 720, 420, 2)}`) });

ads.push({ id: 'T07-bucataria-bunicii', html: page(`${bg('T07')}
  <div class="panel" style="left:48px;top:56px;width:560px">
    <img src="${LOGO}" style="height:36px;margin-bottom:20px">
    <div class="h" style="font-size:56px">Ca la bunica: <span style="color:${C.green}">plante</span> pentru inimă.</div>
    <div style="font:600 28px/1.4 Inter;margin-top:16px">Usturoi, păducel și vâsc, acum în capsule. 60 într-un borcan.</div>
    <div class="price" style="margin-top:18px;color:${C.red}">69,99 lei</div></div>
  ${bottle(540, 710, 420, 2)}`) });

ads.push({ id: 'T08-soba-iarna', html: page(`${bg('T08')}
  <div class="panel dark" style="left:48px;top:56px;width:600px">
    <div class="h" style="font-size:54px">Vine frigul.<br>Pregătește-ți inima pentru iarnă.</div>
    ${checks()}
    <div class="tag">2 cutii: transport gratuit</div></div>
  ${bottle(400, 560, 545, 0)}`) });

ads.push({ id: 'T09-ceai-paducel', html: page(`${bg('T09')}
  <div class="panel" style="left:48px;top:56px;width:580px">
    <div class="it" style="font-size:54px;line-height:1.15">Ceaiul de păducel al bunicii,</div>
    <div class="h" style="font-size:58px;color:${C.red};margin-top:6px">acum în capsule.</div>
    <div style="font:600 27px/1.4 Inter;margin-top:18px">Plus usturoi și vâsc. Pentru inimă, tensiune și circulație.</div></div>
  ${bottle(540, 720, 420, 2)}`) });

ads.push({ id: 'T10-recolta-oferta', html: page(`${bg('T10')}
  <div class="panel" style="left:48px;top:56px;width:560px">
    <div class="h" style="font-size:54px">Ce e mai bun din toamnă, <span style="color:${C.rust}">pentru inima ta</span>.</div>
    <div style="display:flex;gap:26px;align-items:flex-end;margin-top:22px">
      <div><div style="font:600 22px Inter;color:#666">1 cutie</div><div class="price" style="font-size:46px">69,99 lei</div></div>
      <div><div style="font:700 22px Inter;color:${C.red}">2 cutii</div><div class="price" style="font-size:66px;color:${C.red};line-height:1">132,98 lei</div></div></div>
    <div class="tag">🚚 Transport gratuit la 2 cutii</div></div>
  ${bottle(420, 640, 540, -3)}${bottle(420, 860, 550, 3)}`) });

module.exports = ads;
