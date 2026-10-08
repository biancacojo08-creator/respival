// PowerMan: 15 aggressive 1+1 offer ads, 1080x1080. Helpers come from ads.js.
// Offer numbers live in OFFER below; change them there if the real offer differs.
// Render: node render-oferta.js [--hd] [id-filter]
const { C, logo, foot, tag, page: page45, msg } = require('./ads.js').lib;
const page = (css, body) => page45(`html,body{height:1080px}${OCSS}${css}`, body);

const OFFER = { price: '62,99', value: '125,98', unit: '31,50', old: '99,99' };
const Y = '#FFD23F'; // offer yellow

const OCSS = `
.box{position:absolute;filter:drop-shadow(0 30px 30px rgba(0,0,0,.5)) drop-shadow(0 6px 8px rgba(0,0,0,.3))}
.rib{position:absolute;padding:10px 20px;border-radius:10px;font:800 34px Barlow;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;box-shadow:0 8px 20px rgba(0,0,0,.35)}
.plus{position:absolute;width:96px;height:96px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 76px/1 Barlow;box-shadow:0 8px 24px rgba(0,0,0,.4)}
.cta{position:absolute;font:800 42px Barlow;text-transform:uppercase;padding:16px 34px;border-radius:14px;letter-spacing:.5px;white-space:nowrap}
.chk{display:flex;gap:16px;align-items:center;font:700 31px Inter}
.chk i{flex:none;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:900 26px Inter;font-style:normal}
.tape{position:absolute;left:-60px;width:1200px;height:74px;display:flex;align-items:center;gap:30px;white-space:nowrap;overflow:hidden;font:800 40px Barlow;text-transform:uppercase;letter-spacing:2px}
.small{position:absolute;font:400 14px Inter;opacity:.6}
`;

const BOX = '../produs-cutout.png';
const box = (h, x, y, rot = 0) => `<img class="box" src="${BOX}" style="left:${x}px;top:${y}px;height:${h}px;transform:rotate(${rot}deg)">`;
// Two boxes, the second tagged GRATUIT. (x, y) = top-left of the pair, h = box height.
const pair = (h, x, y, { gap = 0.3, plus = true, ribbon = 'Gratuit', ribBg = Y, ribFg = C.black, plusBg = Y, plusFg = C.black } = {}) => {
  const w = h * 0.4, x2 = x + w + w * gap;
  return `${box(h, x, y + h * 0.04, -6)}${box(h, x2, y, 5)}
  ${plus ? `<div class="plus" style="left:${x + w + w * gap / 2 - 48}px;top:${y + h * 0.42}px;background:${plusBg};color:${plusFg}">+</div>` : ''}
  ${ribbon ? `<div class="rib" style="left:${x2 - 10}px;top:${y + h * 0.78}px;background:${ribBg};color:${ribFg};transform:rotate(-6deg)">${ribbon}</div>` : ''}`;
};
const disc = (t = 'Supliment alimentar. Ofertă valabilă în limita stocului. Rezultatele pot varia.', x = 64, y = 962, c = '') => `<div class="small" style="left:${x}px;top:${y}px;${c}">${t}</div>`;
const tapeRow = (top, bg, fg, txt, rot = 0) => `<div class="tape" style="top:${top}px;background:${bg};color:${fg};transform:rotate(${rot}deg)">${Array(8).fill(`<span>${txt}</span><span>★</span>`).join('')}</div>`;
const burst = (x, y, s, bg, fg, html) => `<div class="burst" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${bg};color:${fg}">${html}</div>`;

const ads = [];

// O01 – Hero: 1+1 GRATUIT, uriaș
ads.push({ id: 'O01-1plus1-gratuit', html: page(`body{background:radial-gradient(90% 80% at 70% 55%,#E0162F,#8d0a1d 75%)}`,
  `${logo(64, 60)}${tag(270, 54, C.black)}
  <div class="abs h" style="left:56px;top:140px;font-size:270px;line-height:.85;letter-spacing:-6px;color:${Y}">1+1</div>
  <div class="abs h" style="left:64px;top:370px;font-size:120px">Gratuit</div>
  <div class="abs" style="left:64px;top:510px;width:440px;font:600 32px/1.3 Inter">Cumperi un PowerMan, <b style="color:${Y}">al doilea îl primești gratis.</b></div>
  <div class="abs" style="left:64px;top:680px;font:700 36px Barlow;color:#ffc9d1">2 flacoane doar</div>
  <div class="abs h" style="left:60px;top:720px;font-size:120px;line-height:1">${OFFER.price} lei</div>
  ${pair(520, 540, 230)}
  ${disc()}${foot(C.black, '#fff', ['Plata la livrare', 'Colet discret', 'Livrare în toată țara'])}`) });

// O02 – Plătești 1. Primești 2.
ads.push({ id: 'O02-platesti-1', html: page(`body{background:${C.black}}`,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:64px;top:150px;font-size:116px;line-height:1.05">Plătești <span class="red">1.</span><br>Primești <span style="color:${Y}">2.</span></div>
  <div class="abs" style="left:64px;top:430px;width:470px;font:600 31px/1.35 Inter;color:#d6d6db">Spray oral pentru potență și libido, cu 7 plante. Acum la 1+1 gratuit, cât ține stocul.</div>
  <div class="cta" style="left:64px;top:720px;background:${C.red};color:#fff">Vreau 2 la preț de 1 →</div>
  <div class="abs" style="left:64px;top:840px;font:800 46px Barlow;color:${Y}">2 FLACOANE · ${OFFER.price} LEI</div>
  ${pair(450, 610, 270, { ribBg: C.red, ribFg: '#fff', plusBg: C.red, plusFg: '#fff' })}
  ${disc()}${foot()}`) });

// O03 – Bon fiscal: matematica ofertei
ads.push({ id: 'O03-bon', html: page(`body{background:#2a2a30}
  .rc{position:absolute;left:70px;top:150px;width:520px;height:790px;background:#FBFAF6;color:#1b1b1b;padding:44px 40px;font-family:'DejaVu Sans Mono',monospace;box-shadow:0 30px 60px rgba(0,0,0,.5);transform:rotate(-2deg);
    -webkit-mask:linear-gradient(#000,#000) top/100% calc(100% - 18px) no-repeat,radial-gradient(circle at 12px 18px,transparent 11px,#000 12px) bottom/24px 18px repeat-x}
  .rc .r{display:flex;justify-content:space-between;font-size:26px;line-height:1.6}
  .rc hr{border:0;border-top:3px dashed #999;margin:18px 0}`,
  `${logo(64, 60)}${tag()}
  <div class="rc">
    <div style="text-align:center;font:700 30px 'DejaVu Sans Mono',monospace">NOVENSA</div>
    <div style="text-align:center;font-size:20px;color:#666">bon de comandă · oferta 1+1</div><hr>
    <div class="r"><span>PowerMan x1</span><span>${OFFER.price}</span></div>
    <div class="r"><span>PowerMan x1</span><span>${OFFER.price}</span></div>
    <div class="r" style="color:#666"><span>Subtotal</span><span>${OFFER.value}</span></div>
    <div class="r" style="color:${C.red};font-weight:700"><span>Oferta 1+1</span><span>-${OFFER.price}</span></div>
    <div class="r" style="color:${C.red}"><span>Livrare</span><span>la curier</span></div><hr>
    <div class="r" style="font-size:40px;font-weight:700"><span>TOTAL</span><span>${OFFER.price}</span></div>
    <div style="font-size:20px;color:#666;margin-top:6px">plătești la livrare, în numerar sau cu cardul</div>
    <div style="margin-top:34px;text-align:center;font:700 30px 'DejaVu Sans Mono',monospace;border:4px solid ${C.red};color:${C.red};padding:10px;transform:rotate(-6deg)">AI ECONOMISIT ${OFFER.price} LEI</div>
  </div>
  ${pair(470, 600, 280, { ribbon: 'x2', ribBg: C.red, ribFg: '#fff', plus: false })}
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului.', 640, 962, 'color:#fff')}${foot()}`) });

// O04 – Al doilea e din partea noastră (cadou)
ads.push({ id: 'O04-cadou', html: page(`body{background:${C.cream};color:${C.black}}
  .bow{position:absolute;left:790px;top:250px;width:24px;height:560px;background:${C.red};opacity:.9}`,
  `${logo(64, 60, 44, false)}${tag()}
  <div class="abs h" style="left:64px;top:150px;font-size:84px;width:560px">Al doilea e<br><span class="red">din partea<br>noastră.</span></div>
  <div class="abs" style="left:64px;top:420px;width:500px;font:600 29px/1.35 Inter;color:#333">Comanzi PowerMan azi și primești <b>încă un flacon gratuit</b>. Fără cod, fără condiții, fără card.</div>
  <div class="abs" style="left:64px;top:640px;display:flex;flex-direction:column;gap:16px">
    <div class="chk"><i style="background:${C.red};color:#fff">✓</i>2 flacoane · ${OFFER.price} lei</div>
    <div class="chk"><i style="background:${C.red};color:#fff">✓</i>Plătești doar la livrare</div>
    <div class="chk"><i style="background:${C.red};color:#fff">✓</i>Colet discret</div></div>
  ${box(460, 600, 330, -6)}${box(460, 800, 300, 5)}
  <div class="abs" style="left:820px;top:170px;font-size:110px;transform:rotate(8deg)">🎁</div>
  ${burst(840, 700, 200, C.red, '#fff', '<div style="font:800 40px/0.95 Barlow;text-transform:uppercase">Al 2-lea<br><span style="font-size:58px">gratis</span></div>')}
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului.', 64, 962, 'color:#555')}${foot(C.black, '#fff')}`) });

// O05 – Bandă de avertizare: stoc limitat
ads.push({ id: 'O05-stoc-limitat', html: page(`body{background:${C.black}}`,
  `${tapeRow(150, Y, C.black, 'Oferta 1+1 · stoc limitat', -6)}
  ${logo(64, 50)}${tag(270, 44)}
  <div class="abs h" style="left:64px;top:280px;font-size:92px;width:560px;line-height:.98">Când se termină stocul,<br><span class="red">se termină 1+1.</span></div>
  <div class="abs" style="left:64px;top:690px;font:800 54px Barlow;color:${Y}">2 FLACOANE · ${OFFER.price} LEI</div>
  <div class="cta" style="left:64px;top:780px;background:${C.red};color:#fff">Comandă acum →</div>
  ${pair(440, 620, 330)}
  ${tapeRow(905, Y, C.black, 'Plătești la livrare · colet discret', 3)}
  <div class="small" style="left:64px;top:1000px;color:#fff;font-size:13px">Supliment alimentar. Ofertă valabilă în limita stocului. Rezultatele pot varia.</div>`) });

// O06 – Unul acum, unul de rezervă
ads.push({ id: 'O06-unul-rezerva', html: page(`body{background:linear-gradient(90deg,#141418 50%,#22050b 50%)}`,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:0;width:540px;top:170px;text-align:center;font-size:84px">Unul<br>pentru acum.</div>
  <div class="abs h" style="left:540px;width:540px;top:170px;text-align:center;font-size:84px;color:${Y}">Unul<br>de rezervă.</div>
  ${box(470, 175, 380, -4)}${box(470, 715, 380, 4)}
  <div class="rib" style="left:700px;top:760px;background:${Y};color:${C.black};transform:rotate(-6deg)">Gratuit</div>
  <div class="plus" style="left:492px;top:560px;background:${C.red};color:#fff">+</div>
  <div class="abs" style="left:0;right:0;top:885px;text-align:center;font:800 50px Barlow">1+1 GRATUIT · DOAR <span style="color:${Y}">${OFFER.price} LEI</span></div>
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului. Rezultatele pot varia.', 0, 962, 'right:0;text-align:center;color:#fff')}${foot()}`) });

// O07 – WhatsApp: „iau și pentru tine?”
ads.push({ id: 'O07-whatsapp-1plus1', html: page(`body{background:#0B141A}
  .top{position:absolute;left:0;right:0;top:0;height:120px;background:#202C33;display:flex;align-items:center;gap:22px;padding:0 40px}
  .av{width:76px;height:76px;border-radius:50%;background:#6B7C85;display:flex;align-items:center;justify-content:center;font:700 32px Inter}
  .chat{position:absolute;left:36px;right:36px;top:146px;display:flex;flex-direction:column;gap:14px}
  .chat>div{font-size:30px!important;padding:14px 22px 10px!important}`,
  `<div class="top"><div style="font:400 40px Inter;color:#AEBAC1">←</div><div class="av">M</div><div><div style="font:600 32px Inter">Mihai 🔧</div><div style="font:400 22px Inter;color:#8696A0">online</div></div>${tag(560, 32)}</div>
  <div class="chat">
    ${msg(1, 'Bă, PowerMan e la 1+1 gratis 🔥 2 flacoane la 63 de lei', '19:02')}
    ${msg(0, 'Ăla de mi-ai zis? Care te-a pus pe picioare? 😂', '19:03')}
    ${msg(1, 'Ăla. Iau eu 2 și ți-l dau pe al doilea. Plătim la curier', '19:03')}
    ${msg(0, 'Fă comanda. Dar nu zici la nimeni 🤐', '19:04')}
  </div>
  ${pair(300, 700, 650, { ribbon: '1+1', plus: false })}
  <div class="abs" style="left:36px;top:835px;font:800 46px Barlow;color:${Y}">1+1 GRATUIT · ${OFFER.price} LEI</div>
  <div class="abs" style="left:36px;top:905px;font:700 26px Inter;color:#E9EDEF">Împarte-l cu un prieten. 👇</div>
  <div class="small" style="left:36px;top:962px;color:#8696A0">Conversație ilustrativă. Supliment alimentar. Rezultatele pot varia.</div>
  ${foot(C.red, '#fff', ['Colet discret', 'Plata la livrare', '2 flacoane'])}`) });

// O08 – Comparativ agresiv: 1 flacon vs 2 flacoane
ads.push({ id: 'O08-vs-alte-spray', html: page(`body{background:${C.black}}
  .col{position:absolute;top:300px;width:470px;height:620px;border-radius:28px;padding:36px;text-align:center}`,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:64px;top:140px;font-size:100px">Fă socoteala.</div>
  <div class="col" style="left:56px;background:#1d1d22;color:#8c8c94">
    <div style="font:800 34px Barlow;text-transform:uppercase;letter-spacing:2px">Alte spray-uri populare</div>
    <div style="font:800 150px/1 Barlow;margin-top:40px">1</div><div style="font:700 32px Inter">flacon</div>
    <div style="font:800 76px Barlow;margin-top:60px;text-decoration:line-through">~80 lei</div>
    <div style="font:600 24px Inter;margin-top:16px">4 plante active</div></div>
  <div class="col" style="left:554px;background:${C.red};color:#fff;box-shadow:0 0 0 6px ${Y}">
    <div style="font:800 34px Barlow;text-transform:uppercase;letter-spacing:2px">PowerMan 1+1</div>
    <div style="font:800 150px/1 Barlow;margin-top:40px;color:${Y}">2</div><div style="font:700 32px Inter">flacoane</div>
    <div style="font:800 76px Barlow;margin-top:60px">${OFFER.price} lei</div>
    <div style="font:600 24px Inter;margin-top:16px">7 plante active · fabricat în RO</div></div>
  ${box(230, 880, 30, 8)}
  <div class="small" style="left:64px;top:945px;width:950px;color:#fff">Comparație cu prețurile și formulele afișate public de spray-uri sublinguale similare, octombrie 2026. Supliment alimentar. Ofertă în limita stocului.</div>
  ${foot()}`) });

// O09 – Prețul pe flacon
ads.push({ id: 'O09-pret-flacon', html: page(`body{background:${Y};color:${C.black}}`,
  `${logo(64, 60, 44, false)}${tag(270, 54, C.black)}
  <div class="abs" style="left:64px;top:160px;font:800 52px Barlow;text-transform:uppercase">Cu oferta 1+1, un flacon te costă</div>
  <div class="abs h" style="left:50px;top:240px;font-size:250px;letter-spacing:-8px;line-height:1">${OFFER.unit}</div>
  <div class="abs h" style="left:64px;top:500px;font-size:90px">lei. <span class="red">Atât.</span></div>
  <div class="abs" style="left:64px;top:630px;width:500px;font:600 29px/1.35 Inter">Mai puțin decât un pachet de țigări pe zi, o săptămână. 2 flacoane la ${OFFER.price} lei, plata la livrare.</div>
  <div class="cta" style="left:64px;top:850px;background:${C.black};color:${Y}">Comandă 2 flacoane →</div>
  ${pair(430, 630, 420, { ribBg: C.red, ribFg: '#fff', plusBg: C.black, plusFg: Y })}
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului.', 64, 962, 'color:#000')}${foot(C.black, '#fff')}`) });

// O10 – Ce primești în colet
ads.push({ id: 'O10-in-colet', html: page(`body{background:#EDE6DA;color:${C.black}}
  .parcel{position:absolute;left:520px;top:520px;width:500px;height:300px;background:linear-gradient(180deg,#C99A5E,#A97A42);border-radius:8px;box-shadow:0 30px 50px rgba(0,0,0,.35)}
  .parcel:before{content:"";position:absolute;left:0;right:0;top:-40px;height:60px;background:#D9AE72;transform:perspective(600px) rotateX(55deg);border-radius:6px}
  .tapeb{position:absolute;left:740px;top:520px;width:60px;height:300px;background:rgba(240,225,190,.7)}`,
  `${logo(64, 60, 44, false)}${tag()}
  <div class="abs h" style="left:64px;top:150px;font-size:104px">Ce primești<br><span class="red">în colet:</span></div>
  <div class="abs" style="left:64px;top:400px;display:flex;flex-direction:column;gap:18px">
    <div class="chk"><i style="background:${C.red};color:#fff">1</i>PowerMan, 30 ml</div>
    <div class="chk"><i style="background:${Y};color:#000">2</i>PowerMan, 30 ml <b class="red">GRATUIT</b></div>
    <div class="chk"><i style="background:${C.black};color:#fff">✓</i>Ambalaj discret</div>
    <div class="chk"><i style="background:${C.black};color:#fff">✓</i>Plătești la livrare</div></div>
  ${box(430, 590, 220, -8)}${box(430, 790, 200, 6)}
  <div class="parcel"></div><div class="tapeb"></div>
  <div class="abs" style="left:64px;top:770px;font:800 64px Barlow">TOTAL: <span class="red">${OFFER.price} LEI</span></div>
  <div class="abs" style="left:64px;top:850px;font:600 26px Inter;color:#555;text-decoration:line-through">valoare ${OFFER.value} lei</div>
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului.', 64, 962, 'color:#555')}${foot(C.red, '#fff')}`) });

// O11 – Unul în noptieră, unul în geantă (umor)
ads.push({ id: 'O11-noptiera-geanta', html: page(`body{background:radial-gradient(100% 80% at 50% 60%,#2a0a10,${C.black} 70%)}`,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:0;right:0;top:140px;text-align:center;font-size:96px">Unul în noptieră.<br><span style="color:${Y}">Unul în geanta de sală.</span></div>
  ${pair(500, 300, 360, { gap: 0.55 })}
  <div class="abs" style="left:0;right:0;top:880px;text-align:center;font:700 32px Inter">Oferta 1+1: 2 flacoane la <span style="color:${Y}">${OFFER.price} lei</span>. Pregătit oriunde.</div>
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului. Rezultatele pot varia.', 0, 962, 'right:0;text-align:center;color:#fff')}${foot()}`) });

// O12 – Obiecția „e țeapă?”
ads.push({ id: 'O12-e-teapa', html: page(`body{background:#fff;color:${C.black}}`,
  `${logo(64, 60, 44, false)}${tag()}
  <div class="abs h" style="left:64px;top:150px;font-size:120px">„E țeapă?”</div>
  <div class="abs" style="left:64px;top:290px;width:540px;font:700 38px/1.3 Inter">Nu plătești nimic online.</div>
  <div class="abs" style="left:64px;top:360px;width:520px;display:flex;flex-direction:column;gap:20px;margin-top:20px">
    <div class="chk" style="font-size:29px"><i style="background:${C.red};color:#fff">1</i>Comanzi în 1 minut, doar nume și adresă</div>
    <div class="chk" style="font-size:29px"><i style="background:${C.red};color:#fff">2</i>Primești coletul discret acasă</div>
    <div class="chk" style="font-size:29px"><i style="background:${C.red};color:#fff">3</i>Plătești curierului ${OFFER.price} lei pentru 2 flacoane</div></div>
  <div class="abs" style="left:64px;top:760px;width:520px;padding:22px 28px;background:${Y};border-radius:18px;font:800 40px/1.1 Barlow;text-transform:uppercase">Riscul e zero. Oferta 1+1 nu ține mult.</div>
  ${pair(470, 600, 300, { ribBg: C.red, ribFg: '#fff', plusBg: C.red, plusFg: '#fff' })}
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului.', 64, 962, 'color:#555')}${foot()}`) });

// O13 – 3 motive să comanzi azi
ads.push({ id: 'O13-3-motive', html: page(`body{background:${C.black}}
  .m{position:absolute;left:64px;width:560px;display:flex;gap:24px;align-items:flex-start}
  .m .n{flex:none;font:800 110px/0.8 Barlow;color:${C.red}}
  .m b{display:block;font:800 44px Barlow;text-transform:uppercase}.m span{font:400 26px/1.3 Inter;color:#cfcfd4}`,
  `${logo(64, 60)}${tag()}
  <div class="abs h" style="left:64px;top:140px;font-size:100px">3 motive să<br>comanzi <span style="color:${Y}">azi</span>:</div>
  <div class="m" style="top:390px"><div class="n">1</div><div><b>1+1 gratuit</b><span>2 flacoane la ${OFFER.price} lei, cât ține stocul</span></div></div>
  <div class="m" style="top:560px"><div class="n">2</div><div><b>Zero risc</b><span>plătești la livrare, nu online</span></div></div>
  <div class="m" style="top:730px"><div class="n">3</div><div><b>Nimeni nu știe</b><span>colet discret, comanzi de pe telefon</span></div></div>
  ${pair(450, 640, 380)}
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului. Rezultatele pot varia.', 64, 962, 'color:#fff')}${foot()}`) });

// O14 – Ultimatum: „Tu încă te gândești?”
ads.push({ id: 'O14-te-gandesti', html: page(`body{background:${C.red}}`,
  `${logo(64, 60)}${tag(270, 54, C.black)}
  <div class="abs h" style="left:64px;top:150px;font-size:98px;line-height:.98">Tu încă<br>te gândești?</div>
  <div class="abs" style="left:64px;top:390px;width:520px;font:700 32px/1.3 Inter">Alți bărbați au comandat deja <span style="color:${Y}">2 flacoane la preț de 1</span>.</div>
  <div class="abs" style="left:64px;top:620px;font:800 40px Barlow;color:#ffc9d1;text-decoration:line-through">${OFFER.value} lei</div>
  <div class="abs h" style="left:60px;top:665px;font-size:150px;line-height:1;color:${Y}">${OFFER.price} lei</div>
  <div class="cta" style="left:64px;top:840px;background:${C.black};color:#fff">Nu mai sta pe gânduri →</div>
  ${pair(440, 630, 300, { ribBg: C.black, ribFg: Y, plusBg: C.black, plusFg: '#fff' })}
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului.', 64, 962, 'color:#fff')}${foot(C.black, '#fff')}`) });

// O15 – Minimal: 2 flacoane. 1 preț.
ads.push({ id: 'O15-2-flacoane-1-pret', html: page(`body{background:${C.cream};color:${C.black}}`,
  `${logo(64, 60, 44, false)}${tag()}
  <div class="abs h" style="left:0;right:0;top:140px;text-align:center;font-size:150px">2 flacoane.</div>
  <div class="abs h" style="left:0;right:0;top:280px;text-align:center;font-size:150px;color:${C.red}">1 preț.</div>
  ${box(460, 320, 460, -6)}${box(460, 560, 445, 6)}
  ${burst(800, 440, 220, Y, C.black, `<div style="font:800 46px/0.95 Barlow;text-transform:uppercase">1+1<br><span style="font-size:36px">gratuit</span></div>`)}
  ${burst(60, 560, 220, C.black, '#fff', `<div style="font:800 54px/0.95 Barlow">${OFFER.price}<br><span style="font-size:32px">LEI</span></div>`)}
  ${disc('Supliment alimentar. Ofertă valabilă în limita stocului. Rezultatele pot varia.', 0, 962, 'right:0;text-align:center;color:#555')}${foot()}`) });

module.exports = ads;
module.exports.OFFER = OFFER;
