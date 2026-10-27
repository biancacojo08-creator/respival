// Prosta Complex photo ads: full-bleed UGC photo with a native-style hook caption on top.
// Usage: node render-foto.js   -> png/foto/<id>-4x5.png (1080x1350)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/', U = '../ugc-higgsfield/prosta-complex/';

const ads = [
  { id: 'foto-jet', img: 'prosta-complex-01.jpg', hook: 'Dacă jetul nu mai are presiune…' },
  { id: 'foto-treziri', img: 'prosta-complex-02.jpg', hook: '3 treziri pe noapte nu sunt „normale la vârsta asta”.' },
  { id: 'foto-sotia', img: 'prosta-complex-03.jpg', hook: 'Când el se trezește toată noaptea, nu doarme nici ea.' },
  { id: 'foto-pescuit', img: 'prosta-complex-04.jpg', hook: 'La pescuit, fără să fugi la mal la fiecare oră.' },
  { id: 'foto-noptiera', img: 'prosta-complex-05.jpg', hook: 'Jet slab. Nopți pierdute. Nu e doar vârsta.' },
  // Harder-hitting set on the older UGC photos: white hook + red second line.
  { id: 'foto-noaptea', dir: '../ugc/', img: 'UGC01-bucatarie.jpg', hook: 'Prostata mărită te scoală din pat de 4 ori pe noapte?', hl: 'Nu e normal.' },
  { id: 'foto-picaturi', dir: '../ugc/', img: 'UGC02-masina.jpg', hook: 'Picături scăpate în pantaloni după ce ai terminat?', hl: 'Prostata îți cere ajutor.' },
  { id: 'foto-sotia-2', dir: '../ugc/', img: 'UGC03-sotia.jpg', hook: 'Se scoală de 4 ori pe noapte. Și eu odată cu el.', hl: 'Gata cu nopțile pierdute.' },
  { id: 'foto-jet-slab', dir: '../ugc/', img: 'UGC04-curte-sat.jpg', hook: 'Jet slab, care se oprește și pornește?', hl: 'Nu-l mai ignora.' },
  { id: 'foto-50', dir: '../ugc/', img: 'UGC05-canapea.jpg', hook: 'Fugi la baie și nu ajungi la timp?', hl: 'Prostata mărită nu trece singură.' },
];

const css = `
@font-face{font-family:I;font-weight:800;src:url(${F}Inter-700.ttf)}
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;background:#000}
.ph{position:absolute;inset:0;width:1080px;height:1350px;object-fit:cover}
.cap{position:absolute;left:70px;right:70px;top:80px;text-align:center}
.cap span{background:#fff;color:#111;font:800 50px/1.5 I;padding:6px 18px;border-radius:12px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.cap i{display:inline-block;margin-top:18px;background:#D7262E;color:#fff;font:800 50px/1.25 I;font-style:normal;padding:10px 22px;border-radius:12px}
.foot{position:absolute;left:0;right:0;bottom:0;height:260px;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.75))}
.cta{position:absolute;left:0;right:0;bottom:60px;text-align:center}
.cta b{display:inline-block;background:linear-gradient(90deg,#D4A24C,#F7E19C);color:#0B0B0B;font:900 42px/1 A;padding:24px 56px;border-radius:999px;box-shadow:0 10px 24px rgba(0,0,0,.4)}
`;
const html = (a) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<img class="ph" src="${a.dir || U}${a.img}">
<div class="cap"><span>${a.hook}</span>${a.hl ? `<br><i>${a.hl}</i>` : ''}</div>
<div class="foot"></div><div class="cta"><b>Comandă acum</b></div>
</body></html>`;

(async () => {
  const out = path.join(D, 'png', 'foto'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const a of ads) {
    const f = path.join(D, '_' + a.id + '.html'); fs.writeFileSync(f, html(a));
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(out, a.id + '-4x5.jpg'), type: 'jpeg', quality: 92 }); fs.unlinkSync(f);
    console.log('ok', a.id);
  }
  await b.close();
})();
