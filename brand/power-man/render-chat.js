// Power Man static: chat-message layout on near-black, banana + box below.
// Usage: node render-chat.js   -> png/power-man-chat-<4x5|1x1>.png
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;color:#fff;background:radial-gradient(circle at 50% 75%,#1D2A4A 0%,#0C1020 55%,#06080F 100%)}
.title{position:absolute;left:0;right:0;top:80px;text-align:center;font:900 92px/1 A;letter-spacing:-2px}
.title span{color:#FFD93B}
.chat{position:absolute;left:90px;right:90px;top:230px;display:flex;flex-direction:column;gap:22px}
.m{max-width:640px;font:600 40px/1.25 I;padding:24px 34px;border-radius:40px}
.m.her{align-self:flex-start;background:#2B2F3A;border-bottom-left-radius:10px}
.m.me{align-self:flex-end;background:#2F7BF6;border-bottom-right-radius:10px;font-weight:700}
.t{font:600 22px/1 I;color:#8A93A8;margin-top:-10px}
.t.r{align-self:flex-end}
.banana{position:absolute;right:150px;top:640px;height:500px;transform:rotate(18deg);filter:drop-shadow(0 26px 30px rgba(0,0,0,.6))}
.prod{position:absolute;left:230px;top:670px;height:480px;transform:rotate(-6deg);filter:drop-shadow(0 30px 30px rgba(0,0,0,.6))}
.cta{position:absolute;left:70px;right:70px;bottom:60px;text-align:center;background:#FFD93B;color:#0C1020;font:900 46px/1 A;padding:28px;border-radius:999px}
`;
const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="title">Ea o să <span>observe.</span></div>
<div class="chat">
  <div class="m her">Ce-ai pățit aseară?</div>
  <div class="m me">Power Man.</div><div class="t r">Văzut 07:12</div>
  <div class="m her">Mai comandă.</div>
</div>
<img class="banana" src="img/banana.png">
<img class="prod" src="img/power-man.png">
<div class="cta">Comandă acum</div>
</body></html>`;

const sizes = [
  { id: 'power-man-chat-4x5', h: 1350, css: '' },
  { id: 'power-man-chat-1x1', h: 1080, css: `html,body{height:1080px}.title{top:50px;font-size:78px}.chat{top:165px;gap:16px}.m{font-size:34px;padding:20px 30px}
.banana{top:520px;height:420px;right:150px}.prod{top:540px;height:350px;left:280px}.cta{bottom:40px;font-size:40px;padding:22px}` },
];

(async () => {
  fs.mkdirSync(path.join(D, 'png'), { recursive: true });
  const b = await chromium.launch();
  for (const s of sizes) {
    const p = await b.newPage({ viewport: { width: 1080, height: s.h } });
    const f = path.join(D, '_' + s.id + '.html'); fs.writeFileSync(f, html.replace('</style>', s.css + '</style>'));
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(D, 'png', s.id + '.png') }); fs.unlinkSync(f);
    console.log('ok', s.id); await p.close();
  }
  await b.close();
})();
