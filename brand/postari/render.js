const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const f of fs.readdirSync(__dirname).filter(f=>/^\d.*\.html$/.test(f))){await p.goto('file://'+path.join(__dirname,f));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:path.join(__dirname,f.replace('.html','.png'))});}
await b.close();console.log('ok')})();
