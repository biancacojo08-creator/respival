// Contact sheet of all PNGs -> png/_overview.jpg (not an ad).
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const files=fs.readdirSync(path.join(__dirname,'png')).filter(f=>new RegExp(process.argv[5]||'^[DE]').test(f)&&/^[DE].*\.png$/.test(f)).sort();
const cols=+(process.argv[2]||4), sz=+(process.argv[3]||360);
const html=`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},${sz}px);gap:8px;padding:8px;font:14px sans-serif;color:#fff">${files.map(f=>`<div><img src="png/${f}" width="${sz}"><div>${f}</div></div>`).join('')}</body>`;
fs.writeFileSync(path.join(__dirname,'_sheet.html'),html);const b=await chromium.launch();const p=await b.newPage({viewport:{width:cols*(sz+8)+8,height:400}});
await p.goto('file://'+path.join(__dirname,'_sheet.html'));await p.screenshot({path:path.join(__dirname,process.argv[4]||'_overview.jpg'),fullPage:true,quality:80});await b.close();})();
