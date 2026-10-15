// Randează bannerele la 2x (JPG 92) și coperta de Facebook (1640x624) din varianta desktop.
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const items = require('./banner.js');
(async () => {
  const b = await chromium.launch();
  for (const it of items) {
    const pg = await b.newPage({ viewport: { width: it.w, height: it.h }, deviceScaleFactor: 2 });
    const f = path.join(__dirname, 'html', it.id + '.html');
    fs.writeFileSync(f, it.html);
    await pg.goto('file://' + f); await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(__dirname, 'png', it.id + '.jpg'), type: 'jpeg', quality: 92 });
    await pg.close(); console.log('ok', it.id);
  }
  await b.close();
})();
// Coperta de Facebook: python3 -c "from PIL import Image; Image.open('png/banner-desktop-fara-text-2400x900.jpg').crop((34,0,2400,900)).resize((1640,624),Image.LANCZOS).save('png/coperta-facebook-1640x624.jpg',quality=92)"
