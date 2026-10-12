// Renders 10 Black Friday ads per product to blackfriday/png/<produs>/<id>.png (1080x1080)
// and a contact sheet per product to blackfriday/png/<produs>/_overview.jpg.
// Usage: node render.js [produs] [id-filter]
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const products = require('./products.js');
const { build } = require('./ads.js');
(async () => {
  const [onlyProd, onlyId] = process.argv.slice(2);
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const P of products) {
    if (onlyProd && P.key !== onlyProd) continue;
    const htmlDir = path.join(__dirname, 'html', P.key), pngDir = path.join(__dirname, 'png', P.key);
    fs.mkdirSync(htmlDir, { recursive: true }); fs.mkdirSync(pngDir, { recursive: true });
    const files = [];
    for (const ad of build(P)) {
      if (onlyId && !ad.id.includes(onlyId)) continue;
      const file = path.join(htmlDir, ad.id + '.html');
      fs.writeFileSync(file, ad.html);
      await pg.goto('file://' + file);
      await pg.evaluate(() => document.fonts.ready);
      await pg.screenshot({ path: path.join(pngDir, ad.id + '.png') });
      files.push(ad.id + '.png');
      console.log('ok', ad.id);
    }
    // contact sheet
    const sz = 360, cols = 5;
    const all = fs.readdirSync(pngDir).filter(f => f.endsWith('.png')).sort();
    const sheet = path.join(htmlDir, '_sheet.html');
    fs.writeFileSync(sheet, `<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},${sz}px);gap:8px;padding:8px;font:14px sans-serif;color:#fff">${all.map(f => `<div><img src="../../png/${P.key}/${f}" width="${sz}"><div>${f}</div></div>`).join('')}</body>`);
    const sp = await browser.newPage({ viewport: { width: cols * (sz + 8) + 8, height: 400 } });
    await sp.goto('file://' + sheet);
    await sp.screenshot({ path: path.join(pngDir, '_overview.jpg'), fullPage: true, quality: 80 });
    await sp.close();
  }
  await browser.close();
})();
