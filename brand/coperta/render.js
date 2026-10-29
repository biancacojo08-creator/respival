// Novensa Facebook cover, Halloween: every product (no oil, no hair mask) on a night scene.
// 1640x624 rendered at 2x. Products and text stay inside the centre ~1100px that mobile shows.
// Usage: node render.js   -> png/novensa-halloween-cover.png (+ -mobil-preview.png crop)
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../fonts/';

// one row, bottles and boxes alternating, Prosta Complex (tallest) in the middle
const row = [['../pret-pe-zi/img/vision.png', 235], ['img/hepato.png', 190], ['../pret-pe-zi/img/cardio.png', 215], ['img/respival.png', 220],
  ['../product-cutout.png', 275], ['img/novokids.png', 225], ['../pret-pe-zi/img/uronova.png', 235], ['../power-man/img/power-man.png', 220], ['../pret-pe-zi/img/diabexum.png', 235]];

const bat = (x, y, s, r) => `<svg class="bat" style="left:${x}px;top:${y}px;width:${s}px;transform:rotate(${r}deg)" viewBox="0 0 100 40"><path d="M50 14c-2-6-6-6-7-1-6-6-16-9-26-8 5 3 7 8 6 13-6-3-14-2-23 3 9 1 15 5 18 12 4-5 10-7 16-5 2-5 7-7 12-6 4-1 10 1 12 6 6-2 12 0 16 5 3-7 9-11 18-12-9-5-17-6-23-3-1-5 1-10 6-13-10-1-20 2-26 8-1-5-5-5-7 1z"/></svg>`;

const pumpkin = (x, s, flip) => `<svg class="pk" style="left:${x}px;width:${s}px;${flip ? 'transform:scaleX(-1)' : ''}" viewBox="0 0 120 100">
<path d="M58 18c0-8 4-14 10-16l3 4c-5 2-7 6-7 12z" fill="#3E5C2A"/>
<ellipse cx="38" cy="58" rx="30" ry="38" fill="#D9621C"/><ellipse cx="82" cy="58" rx="30" ry="38" fill="#D9621C"/>
<ellipse cx="60" cy="58" rx="28" ry="40" fill="#F07A26"/>
<path d="M40 50l9-10 6 10zM65 50l9-10 6 10z" fill="#FFD36B"/><path d="M38 66q22 18 44 0l-6 2-4 6-5-5-6 6-5-6-5 5-4-6z" fill="#FFD36B"/></svg>`;

const prods = (r) => r.map(([src, h]) => `<img src="${src}" style="height:${h}px">`).join('');

const html = `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}
@font-face{font-family:C;font-weight:700;src:url(${F}Caveat-700.ttf)}
@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1640px;height:624px;overflow:hidden;color:#fff;
 background:radial-gradient(circle at 50% 108%,rgba(255,140,40,.55) 0%,rgba(255,120,30,0) 38%),
  radial-gradient(ellipse at 50% 0%,#3B1F5C 0%,#1C0F33 55%,#0B0616 100%)}
.stars{position:absolute;inset:0;background-image:radial-gradient(1.5px 1.5px at 20px 30px,#fff8,transparent),radial-gradient(1px 1px at 90px 80px,#fff6,transparent),radial-gradient(1.5px 1.5px at 160px 20px,#fff7,transparent),radial-gradient(1px 1px at 230px 110px,#fff5,transparent);background-size:260px 160px;height:300px}
.moon{position:absolute;left:1420px;top:110px;width:150px;height:150px;border-radius:50%;
 background:radial-gradient(circle at 38% 35%,#FFF3C4 0%,#FFD27A 55%,#F2A93B 100%);box-shadow:0 0 70px 20px rgba(255,200,100,.35)}
.moon::before,.moon::after{content:'';position:absolute;border-radius:50%;background:rgba(200,130,40,.25)}
.moon::before{left:32px;top:48px;width:34px;height:34px}.moon::after{left:88px;top:90px;width:22px;height:22px}
.bat{position:absolute;fill:#0B0616}
.web{position:absolute;width:230px;height:230px;opacity:.35}
.title{position:absolute;left:0;right:0;top:56px;text-align:center}
.title small{display:block;font:700 46px/1 C;color:#FFB347}
.title b{display:block;font:900 64px/1 A;letter-spacing:-1px;margin-top:2px;text-shadow:0 6px 20px rgba(0,0,0,.5)}
.title b em{font-style:normal;color:#FF8A2A}
.row{position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:flex-end}
.row img{filter:drop-shadow(0 18px 18px rgba(0,0,0,.55))}
.one{bottom:34px;gap:14px}
.ground{position:absolute;left:0;right:0;bottom:0;height:70px;background:linear-gradient(180deg,rgba(11,6,22,0),#0B0616 80%)}
.fog{position:absolute;left:-100px;right:-100px;bottom:0;height:120px;background:radial-gradient(ellipse at 30% 100%,rgba(200,180,255,.18),transparent 60%),radial-gradient(ellipse at 75% 100%,rgba(200,180,255,.15),transparent 60%)}
.pk{position:absolute;bottom:10px;filter:drop-shadow(0 0 16px rgba(255,140,40,.6))}
.spider{position:absolute;left:1240px;top:0;width:44px}.spider i{display:block;margin:0 auto;width:1.5px;height:200px;background:rgba(255,255,255,.45)}.spider svg{display:block;width:44px;margin-top:-4px}
.pki{display:inline-block;vertical-align:-6px;filter:drop-shadow(0 0 10px rgba(255,140,40,.7))}
.logo{position:absolute;right:40px;top:30px;height:46px;filter:brightness(0) invert(1);opacity:.9}
</style></head><body>
<div class="stars"></div>
<div class="moon"></div>
${bat(1500, 150, 80, -12)}${bat(1360, 60, 55, 10)}${bat(330, 90, 80, 8)}${bat(420, 40, 50, -15)}${bat(520, 225, 62, -8)}${bat(610, 262, 38, 12)}${bat(1010, 236, 70, 6)}${bat(1110, 205, 42, -14)}${bat(800, 255, 34, 4)}
<svg class="web" style="left:0;top:0" viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width=".6">
<path d="M0 0L100 30M0 0L80 80M0 0L30 100M0 0L100 0M0 0L0 100"/><path d="M30 0Q25 10 29 9Q20 20 24 24Q12 22 9 29Q10 25 0 30M60 0Q50 20 58 17Q40 40 48 48Q24 44 17 58Q20 50 0 60M90 0Q75 30 87 26Q60 60 72 72Q36 66 26 87Q30 75 0 90"/></svg>
<div class="spider"><i></i><svg viewBox="0 0 60 50"><g stroke="#0B0616" stroke-width="3" fill="none" stroke-linecap="round"><path d="M22 22L6 10L2 2M22 26L4 24L0 30M23 30L8 40L6 48M38 22L54 10L58 2M38 26L56 24L60 30M37 30L52 40L54 48"/></g><ellipse cx="30" cy="27" rx="10" ry="12" fill="#0B0616"/><circle cx="30" cy="13" r="7" fill="#0B0616"/><circle cx="27" cy="12" r="1.6" fill="#FF8A2A"/><circle cx="33" cy="12" r="1.6" fill="#FF8A2A"/></svg></div>
<div class="title"><small>${pumpkin(0, 44).replace('class="pk" style="left:0px;', 'class="pki" style="')} Halloween fericit de la</small><b>Novensa<em>.</em> Natura nu&nbsp;te&nbsp;sperie<em>.</em></b></div>
<div class="fog"></div>
<div class="row one">${prods(row)}</div>
${pumpkin(60, 120)}${pumpkin(178, 80, 1)}${pumpkin(1395, 80, 1)}${pumpkin(1490, 115)}
<img class="logo" src="../logo-novensa.png">
</body></html>`;

(async () => {
  fs.mkdirSync(path.join(D, 'png'), { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1640, height: 624 }, deviceScaleFactor: 2 });
  const f = path.join(D, '_cover.html'); fs.writeFileSync(f, html);
  await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(D, 'png', 'novensa-halloween-cover.png') });
  // what phones show: the centre 1109px (640x360 ratio)
  await p.screenshot({ path: path.join(D, 'png', 'novensa-halloween-mobil-preview.png'), clip: { x: 265, y: 0, width: 1110, height: 624 } });
  fs.unlinkSync(f); await b.close(); console.log('ok');
})();
