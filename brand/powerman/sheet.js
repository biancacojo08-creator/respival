// Contact sheet of all PNGs -> _overview.jpg (not an ad).
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const files=fs.readdirSync(path.join(__dirname,'png')).filter(f=>/^PM.*\.png$/.test(f)).sort();
const cols=5, w=300, h=375;
const html=`<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},${w}px);gap:8px;padding:8px;font:14px sans-serif;color:#fff">${files.map(f=>`<div><img src="png/${f}" width="${w}" height="${h}"><div>${f}</div></div>`).join('')}</body>`;
fs.writeFileSync(path.join(__dirname,'_sheet.html'),html);const b=await chromium.launch();const p=await b.newPage({viewport:{width:cols*(w+8)+8,height:400}});
await p.goto('file://'+path.join(__dirname,'_sheet.html'));await p.screenshot({path:path.join(__dirname,'_overview.jpg'),fullPage:true,quality:82});await b.close();})();
