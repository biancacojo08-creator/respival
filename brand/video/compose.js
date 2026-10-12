// Adds aggressive text overlays + offer end card on top of a talking-avatar video.
// Usage: node compose.js <id>   (reads raw/<id>.mp4 and scripts.json, writes final/<id>.mp4)
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../../../fonts/';
const id = process.argv[2];
const S = JSON.parse(fs.readFileSync(path.join(D, 'scripts.json'), 'utf8'))[id];
const raw = path.join(D, 'raw', id + '.mp4');
const probe = (args) => execFileSync('ffprobe', ['-v', 'error', ...args, raw]).toString().trim();
const [W, H] = probe(['-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0']).split(',').map(Number);
const dur = parseFloat(probe(['-show_entries', 'format=duration', '-of', 'csv=p=0']));
const k = W / 720; // scale factor for sizes

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.hook{position:absolute;left:${28 * k}px;right:${28 * k}px;top:${70 * k}px;text-align:center;font:900 ${58 * k}px/1.02 A;text-transform:uppercase;letter-spacing:-1px;color:#fff;
 -webkit-text-stroke:${2 * k}px #000;paint-order:stroke fill;text-shadow:0 ${4 * k}px ${14 * k}px rgba(0,0,0,.7)}
.hook span{background:#FFD23F;color:#0E0E0E;-webkit-text-stroke:0;padding:0 ${10 * k}px;box-decoration-break:clone;-webkit-box-decoration-break:clone;text-shadow:none}
.cap{position:absolute;left:50%;transform:translateX(-50%) rotate(-2deg);bottom:${200 * k}px;width:max-content;max-width:88%;text-align:center;background:#D7262E;color:#fff;font:900 ${40 * k}px A;text-transform:uppercase;padding:${12 * k}px ${26 * k}px;border-radius:${14 * k}px;box-shadow:0 ${8 * k}px ${20 * k}px rgba(0,0,0,.45)}
.cap.y{background:#FFD23F;color:#0E0E0E}
.badge{position:absolute;left:${20 * k}px;bottom:${20 * k}px;font:600 ${16 * k}px I;color:rgba(255,255,255,.85);text-shadow:0 1px 4px #000}
.end{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.88) 45%,rgba(0,0,0,.95))}
.end .box{position:absolute;right:${40 * k}px;top:${120 * k}px;height:${430 * k}px;filter:drop-shadow(0 ${20 * k}px ${24 * k}px rgba(0,0,0,.6))}
.end .t1{position:absolute;left:${40 * k}px;top:${150 * k}px;font:900 ${46 * k}px/1 A;color:#FFD23F;text-transform:uppercase}
.end .p{position:absolute;left:${36 * k}px;top:${205 * k}px;font:900 ${150 * k}px/1 A;color:#fff;letter-spacing:-4px}.end .p small{font-size:${54 * k}px;letter-spacing:0}
.end .t2{position:absolute;left:${40 * k}px;top:${370 * k}px;font:800 ${30 * k}px/1.25 A;color:#fff}
.end .tg{position:absolute;left:${40 * k}px;top:${470 * k}px;background:#D7262E;color:#fff;font:900 ${34 * k}px A;padding:${12 * k}px ${22 * k}px;border-radius:${12 * k}px;transform:rotate(-3deg)}
.end .cta{position:absolute;left:${40 * k}px;right:${40 * k}px;bottom:${110 * k}px;text-align:center;background:#FFD23F;color:#0E0E0E;font:900 ${50 * k}px A;text-transform:uppercase;padding:${22 * k}px;border-radius:999px;box-shadow:0 ${8 * k}px 0 #a07f12}
.end .chk{position:absolute;left:0;right:0;bottom:${50 * k}px;text-align:center;font:700 ${20 * k}px I;color:#eee}
.end .logo{position:absolute;left:${40 * k}px;top:${60 * k}px;height:${44 * k}px;filter:brightness(0) invert(1)}
`;
const page = (body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`;

(async () => {
  const tmp = path.join(D, 'tmp', id); fs.mkdirSync(tmp, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  const shot = async (name, body) => {
    const f = path.join(tmp, name + '.html'); fs.writeFileSync(f, page(body));
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(tmp, name + '.png'), omitBackground: true });
  };
  const END = 5.5; // seconds of end card
  const layers = [];
  await shot('badge', `<div class="badge">Supliment alimentar · Rezultatele pot varia</div>`); layers.push(['badge', 0, dur - END]);
  await shot('hook', `<div class="hook">${S.hook}</div>`); layers.push(['hook', 0, 3.8]);
  const capStart = 4.2, capEnd = dur - END - 0.3, step = (capEnd - capStart) / S.caps.length;
  for (let i = 0; i < S.caps.length; i++) {
    await shot('cap' + i, `<div class="cap ${i % 2 ? 'y' : ''}">${S.caps[i]}</div>`);
    layers.push(['cap' + i, capStart + i * step, capStart + (i + 1) * step - 0.2]);
  }
  await shot('end', `<div class="end"><img class="logo" src="../../../logo-novensa.png"><img class="box" src="../../../product-cutout.png">
    <div class="t1">Cura completă</div><div class="p">190<small> lei</small></div><div class="t2">3 cutii · 15 zile<br>în loc de 200,97 lei</div>
    <div class="tg">TRANSPORT GRATUIT</div><div class="cta">Comandă acum ↓</div><div class="chk">✓ Plata la livrare &nbsp; ✓ Fabricat în România &nbsp; ✓ Supliment alimentar</div></div>`);
  layers.push(['end', dur - END, dur + 1]);
  await b.close();

  const args = ['-y', '-i', raw];
  layers.forEach(([n]) => args.push('-i', path.join(tmp, n + '.png')));
  let chain = '', last = '0:v';
  layers.forEach(([n, a, z], i) => { const out = 'v' + i; chain += `[${last}][${i + 1}:v]overlay=0:0:enable='between(t,${a.toFixed(2)},${z.toFixed(2)})'[${out}];`; last = out; });
  fs.mkdirSync(path.join(D, 'final'), { recursive: true });
  args.push('-filter_complex', chain.slice(0, -1), '-map', `[${last}]`, '-map', '0:a?', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', path.join(D, 'final', id + '.mp4'));
  execFileSync('ffmpeg', args, { stdio: 'ignore' });
  console.log('ok', id, W + 'x' + H, dur.toFixed(1) + 's');
})();
