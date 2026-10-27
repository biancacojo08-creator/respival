// Prosta Complex: the aggressive photo-ad hooks on designed backgrounds (Power Man style).
// Usage: node render-agresiv.js   -> png/agresiv/<id>-<4x5|1x1>.png
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

// bg: [glow colour, centre, edge]
const BG = {
  gold: ['rgba(232,199,120,.6)', '#1E1A12', '#050505'],
  navy: ['rgba(140,195,250,.55)', '#13274D', '#060D1F'],
  red: ['rgba(255,140,140,.5)', '#4A0E12', '#140405'],
};
const ads = [
  { id: 'noaptea', bg: 'gold', hook: 'Prostata mărită te scoală din pat de 4 ori pe noapte?', hl: 'Nu e normal.' },
  { id: 'picaturi', bg: 'navy', hook: 'Picături scăpate în pantaloni după ce ai terminat?', hl: 'Prostata îți cere ajutor.' },
  { id: 'sotia', bg: 'red', hook: 'Se scoală de 4 ori pe noapte. Și eu odată cu&nbsp;el.', hl: 'Gata cu nopțile pierdute.' },
  { id: 'jet-slab', bg: 'gold', hook: 'Jet slab, care se oprește și pornește?', hl: 'Nu-l mai ignora.' },
  { id: 'nu-ajungi', bg: 'navy', hook: 'Fugi la baie și nu ajungi la timp?', hl: 'Prostata mărită nu trece singură.' },
];

const css = (g) => `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;color:#fff;
 background:radial-gradient(circle at 50% 66%,${g[0]} 0%,rgba(0,0,0,0) 40%),radial-gradient(circle at 50% 30%,${g[1]} 0%,${g[2]} 80%)}
.head{position:absolute;left:70px;right:70px;top:90px;text-align:center}
.hook{font:900 78px/1.08 A;letter-spacing:-2px}
.hl{display:inline-block;margin-top:34px;background:#D7262E;font:900 58px/1.1 A;letter-spacing:-1px;padding:16px 34px 20px;transform:rotate(-2deg);box-shadow:0 14px 30px rgba(0,0,0,.4)}
.prod{position:absolute;left:0;right:0;margin:auto;bottom:250px;height:600px;transform:rotate(-5deg);filter:drop-shadow(0 40px 40px rgba(0,0,0,.6))}
.chips{position:absolute;left:0;right:0;bottom:180px;display:flex;justify-content:center;gap:14px}
.chips span{border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.08);font:700 27px/1 I;padding:14px 22px;border-radius:999px}
.cta{position:absolute;left:90px;right:90px;bottom:60px;text-align:center;background:linear-gradient(90deg,#D4A24C,#F7E19C);color:#0B0B0B;font:900 46px/1 A;padding:28px;border-radius:999px;box-shadow:0 14px 30px rgba(0,0,0,.45)}
`;
const html = (a) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css(BG[a.bg])}</style></head><body>
<div class="head"><div class="hook">${a.hook}</div><div class="hl">${a.hl}</div></div>
<img class="prod" src="../product-cutout.png">
<div class="chips"><span>Supliment lichid</span><span>Ingrediente naturale</span><span>Fabricat în România</span></div>
<div class="cta">Comandă acum</div>
</body></html>`;

const sizes = [
  { suffix: '-4x5', h: 1350, css: '' },
  { suffix: '-1x1', h: 1080, css: `html,body{height:1080px}.head{top:50px}.hook{font-size:64px}.hl{font-size:46px;margin-top:22px;padding:12px 26px 16px}
.prod{bottom:200px;height:400px}.chips{bottom:135px}.chips span{font-size:23px;padding:11px 18px}.cta{bottom:36px;font-size:40px;padding:22px}` },
];

(async () => {
  const out = path.join(D, 'png', 'agresiv'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const s of sizes) {
    const p = await b.newPage({ viewport: { width: 1080, height: s.h } });
    for (const a of ads) {
      const id = a.id + s.suffix, f = path.join(D, '_' + id + '.html');
      fs.writeFileSync(f, html(a).replace('</style>', s.css + '</style>'));
      await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(out, id + '.png') }); fs.unlinkSync(f);
      console.log('ok', id);
    }
    await p.close();
  }
  await b.close();
})();
