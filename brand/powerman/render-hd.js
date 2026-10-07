// Renders every ad at 2x (2160x2700) to png-hd/<id>.png for the HD zip.
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const ads = require('./ads.js');
(async () => {
  fs.mkdirSync(path.join(__dirname, 'png-hd'), { recursive: true });
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (const ad of ads) {
    const file = path.join(__dirname, 'html', ad.id + '.html');
    fs.writeFileSync(file, ad.html);
    await pg.goto('file://' + file);
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(__dirname, 'png-hd', ad.id + '.png') });
    console.log('ok', ad.id);
  }
  await browser.close();
})();
