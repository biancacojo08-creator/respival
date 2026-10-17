// Subtitrări pentru videoclipurile cu voce (talk.py).
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const F = '../../fonts/';
const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1350px;background:transparent;overflow:hidden}
.brand{position:absolute;left:40px;top:40px;background:rgba(36,72,27,.92);color:#F6F1E4;font:700 30px I;padding:14px 26px;border-radius:999px}
.cap{position:absolute;left:50px;right:50px;bottom:80px;text-align:center}
.cap.top{top:110px;bottom:auto}
.cap.small span{font-size:62px}
.cap span{font:900 74px/1.12 A;letter-spacing:-1.5px;color:#fff;background:rgba(10,10,10,.82);padding:6px 22px;border-radius:14px;
  box-decoration-break:clone;-webkit-box-decoration-break:clone}
.hook span{background:#E26A21;font-size:88px}
.disc{position:absolute;left:0;right:0;bottom:24px;text-align:center;font:600 22px I;color:rgba(255,255,255,.85);text-shadow:0 2px 6px rgba(0,0,0,.7)}
`;
const endCss = `
body{background:#F6F1E4 !important}
.t{position:absolute;left:60px;right:60px;top:70px;text-align:center;font:900 76px/1.05 A;letter-spacing:-2px;color:#24481B}
.box{position:absolute;left:50%;top:380px;height:560px;transform:translateX(-50%) rotate(-3deg);filter:drop-shadow(0 40px 40px rgba(0,0,0,.35))}
.cta{position:absolute;left:90px;right:90px;top:990px;background:#E26A21;color:#fff;text-align:center;font:900 58px A;padding:24px 0;border-radius:24px;box-shadow:0 12px 0 #9c4512}
.sub{position:absolute;left:0;right:0;top:1150px;text-align:center;font:700 36px I;color:#24481B}
.disc2{position:absolute;left:0;right:0;bottom:40px;text-align:center;font:600 24px I;color:#555}
`;
const page = (body, extra = '') => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}${extra}</style></head><body>${body}</body></html>`;
(async () => {
  // Randează subtitrările dintr-un fișier JSON [{file, t, hook, pos, end}] (folosit de talk.py).
  const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const s of spec) {
    const html = s.end
      ? page(`<div class="t">${s.t}</div><img class="box" src="../box-cutout.png">
          <div class="cta">COMANDĂ ACUM →</div><div class="sub">✓ 5 plante  ✓ Fabricat în România  ✓ Plata la livrare</div>
          <div class="disc2">Supliment alimentar. Rezultatele pot varia.</div>`, endCss)
      : page(`<div class="brand">NOVENSA · Ceai Hepato Nova Detox</div>
          <div class="cap ${s.hook ? 'hook' : ''} ${s.pos || ''}"><span>${s.t}</span></div>`);
    const f = path.join(__dirname, '_caps.html'); fs.writeFileSync(f, html);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: s.file, omitBackground: !s.end });
  }
  fs.unlinkSync(path.join(__dirname, '_caps.html')); await b.close();
})();
