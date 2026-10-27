// Power Man statics with a strong hook, same layout as ../prosta-jet (navy + red, colours of the box). Claims only from the box.
// Usage: node render.js   -> png/<id>.png (4:5 and 1:1)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:M;font-weight:900;src:url(${F}Merriweather-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;background:#F2F5FA;color:#111}
.top{position:absolute;left:0;right:0;top:0;height:470px;background:#0E1E3A}
.top:after{content:'';position:absolute;left:0;right:0;bottom:-2px;height:6px;background:#D7262E}
.hook{position:absolute;left:70px;right:70px;top:110px;color:#fff;font:900 96px/1.02 M;letter-spacing:-1px}
.hook span{color:#6FB2F2}
.sub{position:absolute;left:70px;right:70px;top:335px;color:#C3CFE3;font:600 34px/1.3 I}
.prod{position:absolute;right:70px;top:420px;height:780px;filter:drop-shadow(0 34px 30px rgba(0,0,0,.4))}
.list{position:absolute;left:70px;width:560px;top:580px}
.r{display:flex;gap:18px;align-items:flex-start;margin-bottom:34px}
.ck{flex:none;width:50px;height:50px;border-radius:50%;background:#D7262E;color:#fff;font:900 30px/50px A;text-align:center}
.r p{font:700 32px/1.25 I;color:#1B1B1B;padding-top:4px}
.cta{position:absolute;left:70px;bottom:90px}
.cta b{display:inline-block;background:#D7262E;color:#fff;font:900 42px/1 A;padding:26px 56px;border-radius:999px;box-shadow:0 12px 26px rgba(0,0,0,.2)}
`;
const ads = [
  { id: 'power-man', hook: 'Mai multă energie.<br><span>Mai mult chef.</span>', sub: 'Pentru bărbații care vor să se simtă din nou în formă.',
    reasons: ['Susține libidoul', 'Susține creșterea energiei', 'Susține performanța în cuplu', 'Supliment alimentar, 30 ml'] },
];
const html = (a) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="top"></div>
<div class="hook">${a.hook}</div>
<div class="sub">${a.sub}</div>
<img class="prod" src="img/power-man.png">
<div class="list">${a.reasons.map((r) => `<div class="r"><div class="ck">✓</div><p>${r}</p></div>`).join('')}</div>
<div class="cta"><b>Comandă acum</b></div>
</body></html>`;

const sizes = [
  { suffix: '-4x5', h: 1350, css: '' },
  { suffix: '-1x1', h: 1080, css: `html,body{height:1080px}.top{height:450px}.hook{top:70px;font-size:82px}.sub{top:335px;font-size:30px}
.prod{top:380px;height:640px}.list{top:500px;width:540px}.r{margin-bottom:22px}.r p{font-size:28px}.ck{width:44px;height:44px;line-height:44px;font-size:26px}
.cta{bottom:60px}.cta b{font-size:36px;padding:22px 48px}` },
];

(async () => {
  fs.mkdirSync(path.join(D, 'png'), { recursive: true });
  const b = await chromium.launch();
  for (const s of sizes) {
    const p = await b.newPage({ viewport: { width: 1080, height: s.h } });
    for (const a of ads) {
      const id = a.id + s.suffix, f = path.join(D, '_' + id + '.html');
      fs.writeFileSync(f, html(a).replace('</style>', s.css + '</style>'));
      await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: path.join(D, 'png', id + '.png') }); fs.unlinkSync(f);
      console.log('ok', id);
    }
    await p.close();
  }
  await b.close();
})();
