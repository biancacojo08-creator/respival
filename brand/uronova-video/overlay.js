// Adds the hook caption (first 5 s) and a "Comandă acum" button (last 4 s) to a talking-avatar video.
// Usage: node overlay.js <raw.mp4> <out.mp4> "<hook>" [subs.ass]
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const [raw, out, hook, ass] = process.argv.slice(2), F = path.join(__dirname, '../fonts/');
const probe = (a) => execFileSync('ffprobe', ['-v', 'error', ...a, raw]).toString().trim();
const [W, H] = probe(['-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0']).split(',').map(Number);
const dur = parseFloat(probe(['-show_entries', 'format=duration', '-of', 'csv=p=0']));
const k = W / 720;
const css = `@font-face{font-family:I;font-weight:700;src:url(file://${F}Inter-700.ttf)}@font-face{font-family:A;font-weight:900;src:url(file://${F}Archivo-900.ttf)}
*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.cap{position:absolute;left:${40 * k}px;right:${40 * k}px;top:${70 * k}px;text-align:center}
.cap span{background:#fff;color:#111;font:700 ${36 * k}px/1.5 I;padding:${4 * k}px ${14 * k}px;border-radius:${10 * k}px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.cta{position:absolute;left:0;right:0;bottom:${90 * k}px;text-align:center}
.cta b{display:inline-block;background:linear-gradient(90deg,#D4A24C,#F7E19C);color:#0B0B0B;font:900 ${38 * k}px/1 A;padding:${20 * k}px ${46 * k}px;border-radius:999px;box-shadow:0 ${8 * k}px ${20 * k}px rgba(0,0,0,.4)}`;
(async () => {
  const tmp = fs.mkdtempSync('/tmp/ov-'); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  const shot = async (n, body) => { fs.writeFileSync(`${tmp}/${n}.html`, `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`); await p.goto(`file://${tmp}/${n}.html`); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${tmp}/${n}.png`, omitBackground: true }); };
  await shot('hook', `<div class="cap"><span>${hook}</span></div>`);
  await shot('cta', `<div class="cta"><b>Comandă acum ↓</b></div>`);
  await b.close();
  const end = (dur - 4).toFixed(2);
  execFileSync('ffmpeg', ['-y', '-i', raw, '-i', `${tmp}/hook.png`, '-i', `${tmp}/cta.png`, '-filter_complex',
    `[0:v][1:v]overlay=0:0:enable='between(t,0,5)'[a];[a][2:v]overlay=0:0:enable='gte(t,${end})'` + (ass ? `[b];[b]ass=${ass}:fontsdir=${F}[v]` : '[v]'),
    '-map', '[v]', '-map', '0:a?', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], { stdio: 'ignore' });
  console.log('ok', out, W + 'x' + H, dur.toFixed(1) + 's');
})();
