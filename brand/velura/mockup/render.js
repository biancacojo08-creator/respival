const path=require('path');const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:1200},deviceScaleFactor:2});
await p.goto('file://'+path.join(__dirname,'mockup.html'));await p.waitForTimeout(500);
await p.screenshot({path:path.join(__dirname,'Velura-CottonCloud-mockup.png')});await b.close();console.log('ok')})();
