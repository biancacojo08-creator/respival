// Renders the 1+1 offer set (ads-oferta.js) to png-oferta/ at 1080x1080, or 2160x2160 with --hd (png-oferta-hd/).
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const ads = require('./ads-oferta.js');
(async () => {
  const hd = process.argv.includes('--hd');
  const only = process.argv.slice(2).filter(a => a !== '--hd');
  const out = path.join(__dirname, hd ? 'png-oferta-hd' : 'png-oferta');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: hd ? 2 : 1 });
  for (const ad of ads) {
    if (only.length && !only.some(o => ad.id.includes(o))) continue;
    const file = path.join(__dirname, 'html', ad.id + '-oferta.html');
    fs.writeFileSync(file, ad.html);
    await pg.goto('file://' + file);
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(out, ad.id + '.png') });
    console.log('ok', ad.id);
  }
  await browser.close();
})();
