// Montează povestea: 10 clipuri (clipuri/K01..K10.mp4) + voce (voce/V01..V10.mp3) + muzică + subtitrări + final.
// Usage: node compose.js  -> Herbal-Flora-Poveste.mp4
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const D = __dirname, F = path.join(D, '../../fonts/');
const W = 720, H = 1280, XF = 0.3;
const LINES = [
  'Mă numesc Ana. Și ani la rând am avut un secret pe care nu-l spuneam nimănui.',
  'Disconfortul intim revenea iar și iar. Am încercat de toate, dar după câteva săptămâni o luam de la capăt.',
  'Într-o zi i-am povestit totul Ioanei, cea mai bună prietenă a mea. Ea a zâmbit și a scos din geantă un flacon mic.',
  '„Herbal Flora Complex, de la Novensa. Eu îl iau de câteva luni”, mi-a zis.',
  'Înăuntru sunt doar plante: usturoi, oregano, cimbru, frunze de măslin, ghimbir și propolis.',
  'Plantele sunt fermentate natural, cu culturi vii, ca organismul să le poată folosi mai ușor.',
  'Am început cu o capsulă pe zi, dimineața. Un gest mic, care a devenit ritualul meu.',
  'Săptămânile au trecut și am început să mă simt din nou bine în pielea mea.',
  'Acum îmi trăiesc viața fără grija aceea. Iar când o prietenă are nevoie, știu ce să-i spun.',
  'Herbal Flora Complex Elite+. Echilibrul tău intim, natural.',
];
const dur = (f) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());
const clip = (i) => path.join(D, 'clipuri', `K${String(i + 1).padStart(2, '0')}.mp4`);
const voice = (i) => path.join(D, 'voce', `V${String(i + 1).padStart(2, '0')}.mp3`);

const css = `@font-face{font-family:A;font-weight:900;src:url(${F}Archivo-900.ttf)}@font-face{font-family:A;font-weight:800;src:url(${F}Archivo-800.ttf)}
@font-face{font-family:I;font-weight:700;src:url(${F}Inter-700.ttf)}@font-face{font-family:I;font-weight:600;src:url(${F}Inter-600.ttf)}
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.sub{position:absolute;left:50px;right:50px;bottom:190px;text-align:center}
.sub span{font:700 31px/1.42 I;color:#fff;background:rgba(20,20,20,.62);padding:4px 12px;border-radius:8px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.badge{position:absolute;left:0;right:0;bottom:36px;text-align:center;font:600 18px I;color:rgba(255,255,255,.9);text-shadow:0 1px 4px #000}
.t1{position:absolute;left:30px;right:30px;top:90px;text-align:center;font:900 54px/1.05 A;color:#fff;text-transform:uppercase;text-shadow:0 4px 18px rgba(0,0,0,.55)}
.t1 b{color:#FFE3EC;display:block;font-size:40px;font-weight:800;margin-top:10px}
.cta{position:absolute;left:90px;right:90px;bottom:110px;text-align:center;background:#E0306E;color:#fff;font:900 44px A;text-transform:uppercase;padding:20px;border-radius:999px;box-shadow:0 8px 0 #9c1e4b}`;
const page = (b) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${css}</style></head><body>${b}</body></html>`;

(async () => {
  const tmp = path.join(D, 'tmp'); fs.mkdirSync(tmp, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  const shot = async (n, body) => { const f = path.join(tmp, n + '.html'); fs.writeFileSync(f, page(body)); await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: path.join(tmp, n + '.png'), omitBackground: true }); };

  const cd = LINES.map((_, i) => dur(clip(i)));
  const start = []; let t = 0; cd.forEach((d, i) => { start.push(t); t += d - XF; });
  const total = t + XF;
  const layers = []; // [png, from, to]
  for (let i = 0; i < 9; i++) {
    await shot('s' + i, `<div class="sub"><span>${LINES[i]}</span></div>`);
    const a = start[i] + 0.5; layers.push(['s' + i, a, a + dur(voice(i)) + 0.3]);
  }
  await shot('badge', `<div class="badge">Supliment alimentar · Nu înlocuiește o dietă variată · Rezultatele pot varia</div>`); layers.push(['badge', 0, total]);
  await shot('end', `<div class="t1">Echilibrul tău intim, natural<b>Herbal Flora Complex Elite+</b></div><div class="cta">Comandă acum ↓</div>`);
  layers.push(['end', start[9] + 0.6, total]);
  await b.close();

  const args = ['-y'];
  cd.forEach((_, i) => args.push('-i', clip(i)));
  LINES.forEach((_, i) => args.push('-i', voice(i)));
  args.push('-i', path.join(D, 'voce', 'muzica.mp3'));
  layers.forEach(([n]) => args.push('-i', path.join(tmp, n + '.png')));
  let fc = '', last = '0:v';
  for (let i = 1; i < 10; i++) { const o = 'x' + i; fc += `[${last}][${i}:v]xfade=transition=fade:duration=${XF}:offset=${(start[i]).toFixed(3)}[${o}];`; last = o; }
  const L0 = 21;
  layers.forEach(([, a, z], k) => { const o = 'o' + k; fc += `[${last}][${L0 + k}:v]overlay=0:0:enable='between(t,${a.toFixed(2)},${z.toFixed(2)})'[${o}];`; last = o; });
  const vo = LINES.map((_, i) => { const ms = Math.round((start[i] + 0.5) * 1000); fc += `[${10 + i}:a]adelay=${ms}|${ms},volume=1.6[a${i}];`; return `[a${i}]`; }).join('');
  fc += `${vo}amix=inputs=10:normalize=0,asplit=2[vo1][vo2];[20:a]atrim=0:${total.toFixed(2)},afade=t=out:st=${(total - 2.5).toFixed(2)}:d=2.5,volume=0.22[mu];`;
  fc += `[mu][vo1]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=400[duck];[duck][vo2]amix=inputs=2:normalize=0,alimiter=limit=0.95[aout]`;
  args.push('-filter_complex', fc, '-map', `[${last}]`, '-map', '[aout]', '-t', total.toFixed(2), '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '24', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', path.join(D, 'Herbal-Flora-Poveste.mp4'));
  execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
  console.log('ok', total.toFixed(1) + 's');
})();
