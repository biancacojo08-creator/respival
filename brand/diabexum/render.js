// Renders every ad in ads.js to brand/diabexum/png/<id>.png at 1080x1080.
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const ads = require('./ads.js');
(async () => {
  const only = process.argv.slice(2);
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
  for (const ad of ads) {
    if (only.length && !only.some(o => ad.id.includes(o))) continue;
    const file = path.join(__dirname, 'html', ad.id + '.html');
    fs.writeFileSync(file, ad.html);
    await pg.goto('file://' + file);
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(__dirname, 'png', ad.id + '.png') });
    console.log('ok', ad.id);
  }
  await browser.close();
})();
