// Banner de toamnă pentru pagina principală novensa-romania.ro, cu toate cele 7 produse (ambalaje reale, decupate).
// Desktop 2400x900 (design 1200x450 @2x), telefon 1080x1350 (design 540x675 @2x); fiecare și fără text, pentru textul temei.
// Render: node render.js   ·  fundalurile: Segmind nano-banana-2.1 (bg-desktop.jpg, bg-mobil.jpg)
const C = { ink: '#14201A', muted: '#55635B', brand: '#173B2C', goldText: '#7A5F2E', rust: '#A44A1E' };
const F = '../../fonts/';
const FONTS = `
@font-face{font-family:Newsreader;font-weight:600;src:url(${F}Newsreader-600.ttf)}
@font-face{font-family:Newsreader;font-weight:500;font-style:italic;src:url(${F}Newsreader-500i.ttf)}
@font-face{font-family:Jakarta;font-weight:400;src:url(${F}PlusJakartaSans-400.ttf)}
@font-face{font-family:Jakarta;font-weight:700;src:url(${F}PlusJakartaSans-700.ttf)}`;
const base = (w, h, bg, bgCss) => `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{position:relative;font-family:Jakarta,sans-serif;color:${C.ink};background:#efe6d8 url(../${bg}) ${bgCss}}
.p{position:absolute;filter:drop-shadow(0 10px 10px rgba(60,40,20,.28)) drop-shadow(0 2px 3px rgba(60,40,20,.22))}
.sh{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(60,35,15,.42),rgba(60,35,15,0))}
.label{font:700 13px Jakarta;letter-spacing:2.2px;text-transform:uppercase;color:${C.goldText}}
.h{font-family:Newsreader;font-weight:600;letter-spacing:-.5px;line-height:1.02;color:${C.ink}}
.h em{font-style:italic;font-weight:500;color:${C.rust}}
.sub{font:400 16px/1.45 Jakarta;color:#3f4a43}
.btn{display:inline-block;background:${C.brand};color:#fff;font:700 15px Jakarta;padding:14px 26px;border-radius:12px;box-shadow:0 8px 20px rgba(23,59,44,.25)}
`;
const AR = { hepato: .625, prosta: .45, cardio: .491, novokids: .455, diabexum: .489, respival: .398, powerman: .397 };
// produs: [cheie, stânga, baza (y), înălțime, z]
const put = items => items.map(([k, x, b, h, z]) => {
  const w = h * AR[k];
  return `<div class="sh" style="left:${x - w * .15}px;top:${b - h * .05}px;width:${w * 1.3}px;height:${h * .1}px;z-index:${z}"></div>` +
    `<img class="p" src="../p/${k}.png" style="left:${x}px;top:${b - h}px;height:${h}px;z-index:${z}">`;
}).join('');

// desktop: un rând, cele mai înalte în centru
const DESK = put([
  ['hepato', 492, 392, 170, 1], ['respival', 590, 392, 168, 2], ['cardio', 650, 398, 168, 3], ['prosta', 726, 394, 206, 5],
  ['novokids', 808, 394, 192, 4], ['diabexum', 884, 398, 158, 3], ['powerman', 956, 392, 168, 2],
]);
const deskText = `<div class="abs" style="position:absolute;left:64px;top:96px;width:420px;display:flex;flex-direction:column;gap:16px">
  <div class="label">Colecția de toamnă</div>
  <div class="h" style="font-size:50px;text-wrap:balance">Natura, <em>pentru sezonul rece</em></div>
  <div class="sub" style="max-width:360px">Suplimente din plante pentru toată familia. Fabricate în România, cu plata la livrare.</div>
  <div><span class="btn">Descoperă produsele →</span></div></div>`;
// telefon: două rânduri pe masă, textul sus
const MOB = put([
  ['hepato', 84, 530, 150, 1], ['prosta', 168, 526, 186, 2], ['novokids', 246, 526, 176, 2], ['powerman', 322, 530, 164, 1], ['respival', 384, 532, 156, 1],
  ['cardio', 146, 596, 136, 5], ['diabexum', 300, 598, 130, 5],
]);
const mobText = `<div style="position:absolute;left:0;right:0;top:56px;display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;padding:0 36px">
  <div class="label">Colecția de toamnă</div>
  <div class="h" style="font-size:44px">Natura,<br><em>pentru sezonul rece</em></div>
  <div class="sub" style="font-size:16px;max-width:400px">Suplimente din plante pentru toată familia. Fabricate în România, cu plata la livrare.</div>
  <div style="margin-top:4px"><span class="btn">Descoperă produsele →</span></div></div>`;

const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`;
const deskCss = base(1200, 450, 'bg-desktop.jpg', 'no-repeat -170px -96px/1370px auto') + `.veil{position:absolute;inset:0;background:linear-gradient(90deg,rgba(250,245,236,.92) 0%,rgba(250,245,236,.78) 30%,rgba(250,245,236,0) 46%)}`;
const mobCss = base(540, 675, 'bg-mobil.jpg', 'no-repeat center bottom/540px auto');
module.exports = [
  { id: 'banner-desktop-2400x900', w: 1200, h: 450, html: page(deskCss, '<div class="veil"></div>' + DESK + deskText) },
  { id: 'banner-desktop-fara-text-2400x900', w: 1200, h: 450, html: page(deskCss, DESK) },
  { id: 'banner-telefon-1080x1350', w: 540, h: 675, html: page(mobCss, MOB + mobText) },
  { id: 'banner-telefon-fara-text-1080x1350', w: 540, h: 675, html: page(mobCss, MOB) },
];
