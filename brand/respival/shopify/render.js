// Randează imaginile din shopify.js la 2000x2000 (JPG, calitate 92) în png/.
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const imgs = require('./respival.js');
(async () => {
  const only = process.argv.slice(2);
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2000 / 1080 });
  for (const im of imgs) {
    if (only.length && !only.some(o => im.id.includes(o))) continue;
    const f = path.join(__dirname, 'html', im.id + '.html');
    fs.writeFileSync(f, im.html);
    await pg.goto('file://' + f);
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(__dirname, 'png', im.id + '.jpg'), type: 'jpeg', quality: 92 });
    console.log('ok', im.id);
  }
  await b.close();
})();
