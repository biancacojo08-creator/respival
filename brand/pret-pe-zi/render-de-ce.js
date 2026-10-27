// "De ce să-l alegi?" statics: dark navy, product centred, 4 reasons around it, no price.
// Reasons stick to what each label already says.
// Usage: node render-de-ce.js   -> png/de-ce/<id>.png (4:5 and 1:1)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const ads = [
  { id: 'vision-de-ce', img: 'vision.png', name: 'Vision Elite+', reasons: [
    ['Vedere clară', 'Susține vederea clară'],
    ['Ochi protejați', 'Susține protecția ochilor'],
    ['Antioxidant', 'Protejează celulele de stresul oxidativ'],
    ['Formulă avansată', '30 de capsule, simplu de luat']] },
  { id: 'uronova-de-ce', img: 'uronova.png', name: 'UroNova Forte', reasons: [
    ['Din plante', 'Cu extracte din plante'],
    ['Tract urinar', 'Susține sănătatea tractului urinar'],
    ['Confort zilnic', 'Te simți bine în fiecare zi'],
    ['Formulă avansată', '30 de capsule, simplu de luat']] },
  { id: 'diabexum-de-ce', img: 'diabexum.png', name: 'Diabexum Forte', reasons: [
    ['Echilibru glicemic', 'Susține echilibrul glicemic'],
    ['Metabolism', 'Susține echilibrul metabolic'],
    ['Ingrediente naturale', 'Un complex de ingrediente naturale'],
    ['Formulă avansată', '30 de capsule, simplu de luat']] },
  { id: 'cardio-de-ce', img: 'cardio.png', name: 'Cardio Balance', reasons: [
    ['Inimă sănătoasă', 'Susține sănătatea inimii'],
    ['Vase de sânge', 'Susține vasele de sânge'],
    ['Circulație', 'Sprijin pentru o circulație bună'],
    ['Cutie generoasă', '60 de capsule, o lună și jumătate']] },
];

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;color:#fff;
 background:radial-gradient(circle at 50% 58%,#22468F 0%,#14306B 38%,#0A1B42 75%,#07122E 100%)}
.logo{position:absolute;left:0;right:0;top:70px;margin:auto;height:46px;filter:brightness(0) invert(1);opacity:.9}
.title{position:absolute;left:0;right:0;top:160px;text-align:center;font:900 92px/0.98 A;letter-spacing:-2px}
.title span{color:#F3D48B}
.name{position:absolute;left:0;right:0;top:370px;text-align:center}
.name b{display:inline-block;border:2px solid #E6C27A;color:#F3D48B;font:800 28px/1 A;letter-spacing:3px;padding:14px 26px;border-radius:999px}
.glow{position:absolute;left:290px;top:540px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(243,212,139,.35) 0%,rgba(243,212,139,0) 68%)}
.prod{position:absolute;left:0;right:0;margin:auto;top:520px;height:640px;filter:drop-shadow(0 40px 36px rgba(0,0,0,.45))}
.r{position:absolute;width:290px;display:flex;flex-direction:column}
.r.l{left:44px;align-items:flex-end;text-align:right}.r.rt{right:44px;align-items:flex-start}
.n{width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#C9963A,#F3D48B);color:#14306B;font:900 32px/62px A;text-align:center;margin-bottom:14px;box-shadow:0 0 0 8px rgba(243,212,139,.15)}
.r h3{font:900 36px/1.05 A;color:#fff}
.r p{font:600 23px/1.3 I;color:#C9D6F2;margin-top:8px}
.cta{position:absolute;left:0;right:0;bottom:70px;text-align:center}
.cta b{display:inline-block;background:linear-gradient(90deg,#C9963A,#F3D48B);color:#14306B;font:900 40px/1 A;padding:24px 60px;border-radius:999px;box-shadow:0 12px 30px rgba(0,0,0,.35)}
`;
const pos = [['l', 600], ['rt', 600], ['l', 900], ['rt', 900]];
const html = (a) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<img class="logo" src="../logo-novensa.png">
<div class="title">De ce să-l<br><span>alegi?</span></div>
<div class="name"><b>${a.name.toUpperCase()}</b></div>
<div class="glow"></div>
<img class="prod" src="img/${a.img}">
${a.reasons.map(([h, p], i) => `<div class="r ${pos[i][0]}" style="top:${pos[i][1]}px"><div class="n">${i + 1}</div><h3>${h}</h3><p>${p}</p></div>`).join('')}
<div class="cta"><b>Comandă acum</b></div>
</body></html>`;

// 4:5 feed is the main format; 1:1 compresses the same layout.
const sizes = [
  { suffix: '-4x5', h: 1350, css: '' },
  { suffix: '-1x1', h: 1080, css: `html,body{height:1080px}
.logo{top:50px;height:40px}.title{top:115px;font-size:74px}.name{top:290px}.name b{font-size:24px;padding:12px 22px}
.glow{top:400px;left:315px;width:450px;height:450px}.prod{top:385px;height:520px}
.r{width:300px}.n{width:54px;height:54px;font-size:28px;line-height:54px;margin-bottom:10px}.r h3{font-size:32px}.r p{font-size:21px}
.cta{bottom:44px}.cta b{font-size:34px;padding:20px 50px}` },
];

(async () => {
  const out = path.join(D, 'png', 'de-ce'); fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const s of sizes) {
    const p = await b.newPage({ viewport: { width: 1080, height: s.h } });
    for (const a of ads) {
      const id = a.id + s.suffix, f = path.join(D, '_' + id + '.html');
      let h = html(a).replace('</style>', s.css + '</style>');
      if (s.h === 1080) h = h.replace(/top:600px/g, 'top:420px').replace(/top:900px/g, 'top:660px');
      fs.writeFileSync(f, h);
      await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(out, id + '.png') }); fs.unlinkSync(f);
      console.log('ok', id);
    }
    await p.close();
  }
  await b.close();
})();
