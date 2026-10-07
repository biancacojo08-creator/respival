// Renders every ad in ads.js to png-hd/<id>.png at 2160x2160 (2x); png/ gets 1080x1080 downscales via export.py.
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const args = process.argv.slice(2);
const setIdx = args.indexOf('--set');
const set = setIdx >= 0 ? args.splice(setIdx, 2)[1] : null;
const ads = require(set ? `./ads-${set}.js` : './ads.js');
(async () => {
  const only = args;
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2 });
  for (const ad of ads) {
    if (only.length && !only.some(o => ad.id.includes(o))) continue;
    const file = path.join(__dirname, 'html', ad.id + '.html');
    fs.writeFileSync(file, ad.html);
    await pg.goto('file://' + file);
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(__dirname, 'png-hd', ad.id + '.png') });
    console.log('ok', ad.id);
  }
  await browser.close();
})();
