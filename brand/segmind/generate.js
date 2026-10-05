// Generates lifestyle photos with the REAL PROSTA COMPLEX box via Segmind (nano-banana, multi-image edit).
// Needs: env SEGMIND_API_KEY, network access to api.segmind.com.
// Usage: node generate.js [scene-id-filter]   -> writes out/<id>.png
const fs = require('fs'), path = require('path');

const KEY = process.env.SEGMIND_API_KEY;
if (!KEY) { console.error('SEGMIND_API_KEY lipsește din mediu.'); process.exit(1); }
const MODEL = process.env.SEGMIND_MODEL || 'nano-banana';
const PRODUCT = path.join(__dirname, '..', '1231.png'); // original packshot (full label)
const productB64 = fs.readFileSync(PRODUCT).toString('base64');
// If the API refuses base64, set PRODUCT_URL to a public URL of the packshot.
const productRef = process.env.PRODUCT_URL || `data:image/png;base64,${productB64}`;

const KEEP = 'Use the exact product box from the reference image: matte black box with green NOVENSA logo, gold "PROSTA", white "COMPLEX", the printed older man and all label text unchanged and readable. Photorealistic, natural light, 50mm, authentic Romanian home, square 1:1, no extra text, no watermark.';
const SCENES = [
  ['S01-mic-dejun', 'A 60-year-old Romanian man with grey hair at a sunny kitchen breakfast table, coffee cup in front, holding the product box toward the camera in his right hand, confident smile.'],
  ['S02-lingura', 'Close-up: an older man\'s hands pouring amber liquid into a 10 ml measuring spoon over a wooden kitchen table, the product box standing next to the spoon, morning light.'],
  ['S03-sotia-lingura', 'A smiling Romanian woman around 60 handing a spoon with amber liquid to her husband (63, grey hair) at the breakfast table; the product box on the table between them.'],
  ['S04-cuplu-3-cutii', 'A Romanian couple in their 60s laughing at a bright breakfast table, three identical product boxes standing in a row on the table in front of them.'],
  ['S05-bunic-nepot', 'A Romanian grandfather (67, grey beard) laughing with his 8-year-old grandson at a garden table in summer, the product box on the table next to a glass of water.'],
  ['S06-taxi', 'A 58-year-old Romanian taxi driver smiling at the wheel of his yellow taxi in Bucharest, holding the product box up next to his face.'],
  ['S07-tir', 'A 52-year-old Romanian truck driver in the cab of a modern European truck, holding the product box, motorway visible through the windshield.'],
  ['S08-selfie', 'Selfie-style phone photo: a friendly 62-year-old Romanian man in his living room holding the product box close to the camera, smiling.'],
  ['S09-colet', 'Top-down photo: an older man\'s hands opening a brown delivery parcel on a kitchen table, three identical product boxes inside.'],
  ['S10-noptiera', 'Evening: a Romanian man in his 60s in pyjamas sitting on the edge of the bed holding a spoon, warm bedside lamp, the product box on the nightstand.'],
  ['S11-pescar', 'A 67-year-old Romanian fisherman with grey beard and cap on a wooden pier in the Danube Delta at sunrise, fishing rod in one hand, the product box in the other, grinning.'],
  ['S12-tamplar', 'A 66-year-old Romanian carpenter in a traditional wooden workshop, apron, holding the product box in his strong hands, wood shavings, sunbeams.'],
];

(async () => {
  const only = process.argv.slice(2);
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
  for (const [id, scene] of SCENES) {
    if (only.length && !only.some(o => id.includes(o))) continue;
    const body = { prompt: `${scene} ${KEEP}`, image_urls: [productRef], aspect_ratio: '1:1', output_format: 'png' };
    const res = await fetch(`https://api.segmind.com/v1/${MODEL}`, { method: 'POST', headers: { 'x-api-key': KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const type = res.headers.get('content-type') || '';
    if (!res.ok) { console.error(id, res.status, (await res.text()).slice(0, 400)); continue; }
    let buf;
    if (type.startsWith('image/')) buf = Buffer.from(await res.arrayBuffer());
    else { // some models answer JSON with a URL or base64
      const j = await res.json(); const v = j.image || j.output || j.images?.[0] || j.url;
      buf = /^https?:/.test(v) ? Buffer.from(await (await fetch(v)).arrayBuffer()) : Buffer.from(String(v).replace(/^data:.*?base64,/, ''), 'base64');
    }
    fs.writeFileSync(path.join(__dirname, 'out', id + '.png'), buf);
    console.log('ok', id, buf.length, 'bytes', 'credits left:', res.headers.get('x-remaining-credits') || '?');
  }
})();
