// Randează eticheta: preview PNG (cu ghidaje), PNG 300 dpi și PDF de print 226x106 mm (fără ghidaje).
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const wrap = (svg) => `<!doctype html><html><head><style>@page{size:226mm 106mm;margin:0}html,body{margin:0}svg{display:block;width:226mm;height:106mm}</style></head><body>${fs.readFileSync(path.join(__dirname, svg), 'utf8').replace(/width="226mm" height="106mm"/, '')}</body></html>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const tmp = path.join(__dirname, '_render.html');
  const scale = (300 / 25.4) / (96 / 25.4); // 300 dpi
  for (const [svg, out, dpi] of [['NovaKids-eticheta.svg', 'NovaKids-eticheta-preview.png', 120], ['NovaKids-eticheta-print.svg', 'NovaKids-eticheta-300dpi.png', 300]]) {
    fs.writeFileSync(tmp, wrap(svg));
    const ctx = await b.newContext({ deviceScaleFactor: dpi / 96, viewport: { width: Math.ceil(226 * 96 / 25.4), height: Math.ceil(106 * 96 / 25.4) } });
    const pg = await ctx.newPage(); await pg.goto('file://' + tmp); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
    await pg.locator('svg').screenshot({ path: path.join(__dirname, out) }); await ctx.close();
  }
  fs.writeFileSync(tmp, wrap('NovaKids-eticheta-print.svg'));
  await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: path.join(__dirname, 'NovaKids-eticheta-print.pdf'), preferCSSPageSize: true, printBackground: true });
  fs.unlinkSync(tmp); await b.close(); console.log('ok');
})();
