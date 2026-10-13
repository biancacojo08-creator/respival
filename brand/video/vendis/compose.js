// VENDIS HAIR: aggressive text overlays, a mask-application cutaway and an end card on top of a talking-avatar video.
// Usage: node compose.js <id>   (reads raw/<id>.mp4 and scripts.json, writes final/<id>.mp4)
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = '../../../../fonts/';
const id = process.argv[2];
const S = JSON.parse(fs.readFileSync(path.join(D, 'scripts.json'), 'utf8'))[id];
const raw = path.join(D, 'raw', id + '.mp4');
const probe = (args) => execFileSync('ffprobe', ['-v', 'error', ...args, raw]).toString().trim();
const [W0, H0] = probe(['-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0']).split(',').map(Number);
const W = 720, H = Math.round(H0 * W / W0 / 2) * 2; // normalise width to 720
const dur = parseFloat(probe(['-show_entries', 'format=duration', '-of', 'csv=p=0']));
const PINK = '#F06BA8', GOLD = '#D9B45A';

const css = `
@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.hook{position:absolute;left:24px;right:24px;top:${H * 0.08}px;text-align:center;font:900 64px/1.02 A;text-transform:uppercase;letter-spacing:-1px;color:#fff;
 -webkit-text-stroke:2px #000;paint-order:stroke fill;text-shadow:0 4px 14px rgba(0,0,0,.75)}
.hook span{background:#E3262E;color:#fff;-webkit-text-stroke:0;padding:0 12px;box-decoration-break:clone;-webkit-box-decoration-break:clone;text-shadow:none;display:inline-block;transform:rotate(-2deg);margin-top:8px}
.cap{position:absolute;left:50%;transform:translateX(-50%) rotate(-2deg);top:${H * 0.12}px;width:max-content;max-width:90%;text-align:center;background:#E3262E;color:#fff;font:900 40px A;text-transform:uppercase;padding:12px 26px;border-radius:14px;box-shadow:0 8px 20px rgba(0,0,0,.45)}
.cap.p{background:${PINK};color:#111}
.cut{position:absolute;left:50%;transform:translateX(-50%) rotate(2deg);bottom:${H * 0.1}px;width:max-content;background:#111;color:${GOLD};font:900 46px A;text-transform:uppercase;padding:12px 26px;border-radius:14px;border:3px solid ${GOLD}}
.end{position:absolute;inset:0;background:radial-gradient(circle at 50% 38%,#3a2430,#0d0b0c 70%)}
.end .jar{position:absolute;left:50%;transform:translateX(-50%);top:${H * 0.15}px;height:${H * 0.44}px;border-radius:28px;box-shadow:0 24px 50px rgba(0,0,0,.7),0 0 0 4px ${GOLD}}
.end .t1{position:absolute;left:0;right:0;top:${H * 0.055}px;text-align:center;font:900 54px/1 A;color:#fff;text-transform:uppercase;letter-spacing:-1px}
.end .t1 b{color:${PINK}}
.end .tg{position:absolute;left:50%;top:${H * 0.62}px;transform:translateX(-50%) rotate(-3deg);background:#E3262E;color:#fff;font:900 36px A;padding:12px 24px;border-radius:12px;white-space:nowrap}
.end .t2{position:absolute;left:0;right:0;top:${H * 0.7}px;text-align:center;font:800 30px/1.3 A;color:#fff}
.end .cta{position:absolute;left:40px;right:40px;bottom:${H * 0.1}px;text-align:center;background:${PINK};color:#111;font:900 50px A;text-transform:uppercase;padding:22px;border-radius:999px;box-shadow:0 8px 0 #a43a6c}
.end .chk{position:absolute;left:0;right:0;bottom:${H * 0.045}px;text-align:center;font:700 21px I;color:#eee}
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
  const END = 5, HOOK = 3.6;
  const CUT = [dur * 0.42, dur * 0.42 + 2.6]; // mask-application cutaway
  const layers = [];
  await shot('hook', `<div class="hook">${S.hook}</div>`); layers.push(['hook', 0, HOOK]);
  const capStart = HOOK + 0.3, capEnd = dur - END - 0.3, step = (capEnd - capStart) / S.caps.length;
  for (let i = 0; i < S.caps.length; i++) {
    let a = capStart + i * step, z = a + step - 0.2;
    if (a < CUT[1] && z > CUT[0]) { if (a >= CUT[0]) a = CUT[1]; else z = CUT[0]; } // keep caps off the cutaway
    await shot('cap' + i, `<div class="cap ${i % 2 ? 'p' : ''}">${S.caps[i]}</div>`);
    layers.push(['cap' + i, a, z]);
  }
  await shot('cut', `<div class="cut">15% Keratină</div>`);
  await shot('end', `<div class="end"><div class="t1">Salvează-ți <b>părul</b></div><img class="jar" src="../../img/jar.jpg">
    <div class="tg">MASCĂ CU 15% KERATINĂ</div><div class="t2">Pentru păr ars, despicat<br>și fără strălucire</div>
    <div class="cta">Comandă acum ↓</div><div class="chk">✓ Păr vopsit &amp; decolorat &nbsp; ✓ 200 ml &nbsp; ✓ Efect de salon</div></div>`);
  await b.close();

  // inputs: 0 avatar, 1 cutaway photo, 2.. overlay PNGs
  const args = ['-y', '-i', raw, '-loop', '1', '-t', '3', '-i', path.join(D, 'img', 'cut.jpg')];
  const pngs = [...layers.map(l => l[0]), 'cut', 'end'];
  pngs.forEach(n => args.push('-i', path.join(tmp, n + '.png')));
  const pi = (n) => 2 + pngs.indexOf(n);
  let fc = `[0:v]scale=${W}:${H},setsar=1,fps=25,` +
    // punch-in zoom on the hook for extra energy
    `zoompan=z='if(lt(it,${HOOK}),1.12-0.12*it/${HOOK},1)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=25[base];` +
    `[1:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},fps=25,setpts=PTS-STARTPTS+${CUT[0].toFixed(2)}/TB[cutv];` +
    `[base][cutv]overlay=0:0:eof_action=pass:enable='between(t,${CUT[0].toFixed(2)},${CUT[1].toFixed(2)})'[v0];`;
  let last = 'v0', k = 0;
  const add = (n, a, z) => { const o = 'o' + (++k); fc += `[${last}][${pi(n)}:v]overlay=0:0:enable='between(t,${a.toFixed(2)},${z.toFixed(2)})'[${o}];`; last = o; };
  layers.forEach(([n, a, z]) => add(n, a, z));
  add('cut', CUT[0], CUT[1]);
  add('end', dur - END, dur + 1);
  fs.mkdirSync(path.join(D, 'final'), { recursive: true });
  args.push('-filter_complex', fc.slice(0, -1), '-map', `[${last}]`, '-map', '0:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', dur.toFixed(2), path.join(D, 'final', id + '.mp4'));
  execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'inherit'] });
  console.log('ok', id, W + 'x' + H, dur.toFixed(1) + 's');
})();
