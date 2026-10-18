// Textele pentru video-ul cu părul (PNG transparent 1080x1920). Zonele de jos/sus rămân libere pentru interfața TikTok.
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const F = '../fonts/';
const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1080px;height:1920px;background:transparent;overflow:hidden}
.hook{position:absolute;left:50px;right:50px;top:300px;text-align:center;font:900 112px/1.02 A;letter-spacing:-2px;color:#fff;
  -webkit-text-stroke:6px #000;paint-order:stroke fill;text-shadow:0 10px 30px rgba(0,0,0,.6)}
.hook b{color:#FFE14D}
.wow{position:absolute;left:0;right:0;top:330px;text-align:center;font:900 230px A;color:#FFE14D;-webkit-text-stroke:10px #000;paint-order:stroke fill;
  text-shadow:0 0 60px rgba(255,225,77,.8)}
.box{position:absolute;left:70px;right:70px;top:1080px;text-align:center}
.box span{font:900 70px/1.18 A;color:#111;background:#fff;padding:8px 26px;border-radius:18px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.pill{position:absolute;top:170px;font:900 50px A;letter-spacing:3px;color:#fff;padding:14px 30px;border-radius:999px;box-shadow:0 8px 20px rgba(0,0,0,.35)}
.end h1{position:absolute;left:60px;right:60px;top:420px;text-align:center;font:900 104px/1.05 A;color:#fff;-webkit-text-stroke:5px #000;paint-order:stroke fill}
.end h1 b{color:#FFE14D}
.end .cta{position:absolute;left:110px;right:110px;top:1000px;background:#FF2D55;color:#fff;text-align:center;font:900 72px A;padding:34px 0;border-radius:30px;
  box-shadow:0 14px 0 #a3132f}
.end .sub{position:absolute;left:0;right:0;top:1230px;text-align:center;font:700 40px I;color:#fff;text-shadow:0 2px 8px #000}
.disc{position:absolute;left:0;right:0;bottom:430px;text-align:center;font:700 26px I;color:rgba(255,255,255,.8);text-shadow:0 2px 6px #000}
`;
const page = b => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>${b}</body></html>`;
(async () => {
  const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const items = Object.entries(spec).map(([k, s]) => [k,
    s.style === 'hook' ? `<div class="hook">${s.text}</div>` : s.style === 'wow' ? `<div class="wow">${s.text}</div>` : `<div class="box"><span>${s.text}</span></div>`]);
  items.push(['inainte', `<div class="pill" style="left:50px;background:#E5252A">ÎNAINTE</div>`]);
  items.push(['dupa', `<div class="pill" style="right:50px;background:#18B26B">DUPĂ</div>`]);
  items.push(['end', `<div class="end"><h1>Vrei și tu păr <b>ca oglinda?</b></h1><div class="cta">COMANDĂ ACUM →</div>
    <div class="sub">✓ Plata la livrare   ✓ Livrare rapidă</div></div>`]);
  items.push(['disc', `<div class="disc">Imagini reprezentative</div>`]);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  fs.mkdirSync(path.join(__dirname, '_tmp'), { recursive: true });
  for (const [k, html] of items) {
    const f = path.join(__dirname, '_c.html'); fs.writeFileSync(f, page(html));
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, '_tmp', `${k}.png`), omitBackground: true });
  }
  fs.unlinkSync(path.join(__dirname, '_c.html')); await b.close();
})();
