// Randează eticheta: preview PNG (cu ghidaje), PNG 300 dpi și PDF de print 142x116 mm (fără ghidaje).
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const wrap = (svg) => `<!doctype html><html><head><style>@page{size:142mm 116mm;margin:0}html,body{margin:0}svg{display:block;width:142mm;height:116mm}</style></head><body>${fs.readFileSync(path.join(__dirname, svg), 'utf8').replace(/width="142mm" height="116mm"/, '')}</body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const tmp = path.join(__dirname, '_render.html');
  const scale = (300 / 25.4) / (96 / 25.4); // 300 dpi
  for (const [svg, out, dpi] of [['Velura-CottonCloud-eticheta.svg', 'Velura-CottonCloud-eticheta-preview.png', 120], ['Velura-CottonCloud-eticheta-print.svg', 'Velura-CottonCloud-eticheta-300dpi.png', 300], ['Velura-CottonCloud-romantic.svg', 'Velura-CottonCloud-romantic-preview.png', 120], ['Velura-CottonCloud-romantic-print.svg', 'Velura-CottonCloud-romantic-300dpi.png', 300]]) {
    fs.writeFileSync(tmp, wrap(svg));
    const ctx = await b.newContext({ deviceScaleFactor: dpi / 96, viewport: { width: Math.ceil(142 * 96 / 25.4), height: Math.ceil(116 * 96 / 25.4) } });
    const pg = await ctx.newPage(); await pg.goto('file://' + tmp); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
    await pg.locator('svg').screenshot({ path: path.join(__dirname, out) }); await ctx.close();
  }
  for (const v of ['eticheta', 'romantic']) {
    fs.writeFileSync(tmp, wrap(`Velura-CottonCloud-${v}-print.svg`));
    await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
    await p.pdf({ path: path.join(__dirname, `Velura-CottonCloud-${v}-print.pdf`), preferCSSPageSize: true, printBackground: true });
  }
  fs.unlinkSync(tmp); await b.close(); console.log('ok');
})();
