// Black Friday 2026 (9–16 noiembrie) – 10 reclame 1:1 (1080x1080) pentru fiecare produs din products.js.
// Transport gratuit la orice comandă, pachete avantajoase + tichete răzuibile cadou, toate câștigătoare.
// Render: node render.js [produs] [id-filter]
const PERIOD = '9–16 noiembrie';

const FONTS = `
@font-face{font-family:Archivo;font-weight:800;src:url(../../../fonts/Archivo-800.ttf)}
@font-face{font-family:Archivo;font-weight:900;src:url(../../../fonts/Archivo-900.ttf)}
@font-face{font-family:Merri;font-weight:900;src:url(../../../fonts/Merriweather-900.ttf)}
@font-face{font-family:Caveat;font-weight:700;src:url(../../../fonts/Caveat-700.ttf)}
@font-face{font-family:Inter;font-weight:400;src:url(../../../fonts/Inter-400.ttf)}
@font-face{font-family:Inter;font-weight:600;src:url(../../../fonts/Inter-600.ttf)}
@font-face{font-family:Inter;font-weight:700;src:url(../../../fonts/Inter-700.ttf)}
`;

// palette: negru + auriu (ca pe cutia PROSTA COMPLEX)
const BLK = '#0B0B0B', BLK2 = '#181512', GOLD = '#D4A24C', GOLDL = '#F7E19C', GOLDD = '#8F5F1F', RED = '#D7262E', CREAM = '#F4EEE3', GREY = '#cfc6b6';
const GRAD = `linear-gradient(180deg,${GOLDL} 0%,#E6BD68 45%,${GOLD} 70%,${GOLDD} 100%)`;

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1080px;overflow:hidden}
body{font-family:Inter,sans-serif;position:relative;color:#fff;background:${BLK}}
.abs{position:absolute}
.gold{background:${GRAD};-webkit-background-clip:text;background-clip:text;color:transparent}
.big{font-family:Archivo;font-weight:900;letter-spacing:-3px;line-height:.92;text-transform:uppercase}
.serif{font-family:Merri;font-weight:900;letter-spacing:-1px;line-height:1.06}
.prod{position:absolute;filter:drop-shadow(0 30px 30px rgba(0,0,0,.6)) drop-shadow(0 0 40px rgba(212,162,76,.18))}
.logo{position:absolute;filter:brightness(0) invert(1)}
.tape{position:absolute;left:-40px;right:-40px;top:0;height:62px;display:flex;align-items:center;gap:34px;white-space:nowrap;font:900 27px Archivo;letter-spacing:2px;text-transform:uppercase;overflow:hidden;background:${GRAD};color:${BLK}}
.btn{position:absolute;z-index:9;padding:22px 40px;border-radius:999px;font:900 32px Archivo;text-transform:uppercase;letter-spacing:.5px;background:${GRAD};color:${BLK};box-shadow:0 8px 0 ${GOLDD};white-space:nowrap}
.strike{position:relative;display:inline-block}.strike:after{content:"";position:absolute;left:-4px;right:-4px;top:52%;height:5px;background:${RED};transform:rotate(-8deg)}
.foot{position:absolute;z-index:9;left:0;right:0;bottom:0;height:64px;display:flex;align-items:center;justify-content:center;gap:28px;font:700 21px Inter;letter-spacing:.3px;background:${BLK2};color:${GOLDL};border-top:2px solid ${GOLDD}}
.foot span:before{content:"✓ ";font-weight:900}
.disc{position:absolute;z-index:9;right:28px;bottom:74px;font:400 15px Inter;color:#fff;opacity:.55}
.tag{display:inline-block;padding:10px 22px;border-radius:999px;font:900 24px Archivo;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap}
.glow{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(212,162,76,.34) 0%,rgba(212,162,76,0) 68%)}
.line{display:flex;align-items:center;gap:16px;font:800 30px Archivo;text-transform:uppercase;white-space:nowrap}
`;

const LOGO = '../../../logo-novensa.png';
const page = (css, body) => `<!doctype html><html lang="ro"><head><meta charset="utf-8"><style>${CSS}${css}</style></head><body>${body}</body></html>`;
const logo = (x, y, h = 44) => `<img class="logo" src="${LOGO}" style="left:${x}px;top:${y}px;height:${h}px">`;
const tape = (txt = `Black Friday · ${PERIOD} · Transport gratuit la orice comandă`) =>
  `<div class="tape">${Array(4).fill(`<span>${txt}</span><span>★</span>`).join('')}</div>`;
const foot = () => `<div class="foot"><span>Transport gratuit</span><span>Plata la livrare</span><span>Ofertă ${PERIOD}</span></div>`;
const price = (p, size, gold = false, unit = .36) => { const g = gold ? ' class="gold"' : ''; return `<span${g} style="font:900 ${size}px/1 Archivo;letter-spacing:${-size / 26}px">${p}</span><span${g} style="font:900 ${Math.round(size * unit)}px Archivo;letter-spacing:0"> lei</span>`; };
const cad = k => k ? `+ ${k === 1 ? 'tichet răzuibil' : `${k} tichete răzuibile`}` : '';
const win = k => k === 1 ? 'câștigător' : 'toate câștigătoare';

// icons
// tichet răzuibil: bilet auriu cu zona argintie răzuită parțial
const ticketIco = (s = 60) => `<svg width="${s}" height="${s * .62}" viewBox="0 0 80 50"><path d="M4 4h72v14a7 7 0 0 0 0 14v14H4V32a7 7 0 0 0 0-14z" fill="${GOLD}"/><rect x="14" y="13" width="44" height="24" rx="4" fill="#c9c9c9"/><path d="M14 30c8-6 14 2 22-5s14 1 22-4v12c0 2-2 4-4 4H18c-2 0-4-2-4-4z" fill="${BLK}" opacity=".85"/><text x="36" y="34" font-family="Archivo" font-weight="900" font-size="14" fill="${GOLDL}" text-anchor="middle">★</text><circle cx="66" cy="25" r="3" fill="${BLK}"/></svg>`;
const giftIco = (s = 46, c = GOLD, bg = BLK) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M32 18c-3-9-15-13-16-5-1 5 9 5 16 5zm0 0c3-9 15-13 16-5 1 5-9 5-16 5z" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round"/><rect x="6" y="18" width="52" height="12" rx="3" fill="${c}"/><rect x="10" y="30" width="44" height="28" rx="3" fill="${c}"/><rect x="29" y="18" width="6" height="40" fill="${bg}"/></svg>`;
const truckIco = (s = 60, c = GOLD, bg = BLK) => `<svg width="${s * 1.6}" height="${s}" viewBox="0 0 64 40"><rect x="2" y="4" width="38" height="25" rx="3" fill="${c}"/><path d="M42 12h11l9 10v7H42z" fill="${c}"/><path d="M46 15h6l5 6H46z" fill="${bg}"/><circle cx="14" cy="32" r="6" fill="${c}" stroke="${bg}" stroke-width="3"/><circle cx="51" cy="32" r="6" fill="${c}" stroke="${bg}" stroke-width="3"/></svg>`;

function build(P) {
  const SRC = `../../produse/${P.img}`;
  const priced = P.packs.some(o => o.price);
  const best = P.packs.find(o => o.best), second = P.packs[1];
  const prod = (h, x, y, rot = 0, z = 1) => `<img class="prod" src="${SRC}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg);z-index:${z}">`;
  // fan of n products centred on cx; h = height of the front product (scaled per product with P.k)
  const stack = (n, h0, cx, y0) => {
    const h = h0 * P.k, y = y0 + (h0 - h), w = h * P.ar;
    if (n === 1) return prod(h, cx - w / 2, y, 3);
    if (n === 2) return prod(h * .94, cx - w * .95, y + h * .05, -7) + prod(h, cx - w * .1, y, 6, 2);
    if (n === 3) return prod(h * .88, cx - w * 1.15, y + h * .1, -10) + prod(h * .88, cx + w * .15, y + h * .1, 10) + prod(h, cx - w / 2, y, 0, 3);
    if (n === 4) return prod(h * .8, cx - w * 1.05, y, -6, 1) + prod(h * .8, cx + w * .2, y, 6, 1)
      + prod(h * .9, cx - w * .95, y + h * .12, -4, 2) + prod(h * .9, cx + w * .05, y + h * .12, 4, 2);
    const b = h * .78, bw = b * P.ar;
    return [-1, 0, 1].map(i => prod(b, cx - bw / 2 + i * bw * .82, y - h * .02, i * 5, 1)).join('')
      + prod(h * .86, cx - w * 1.12, y + h * .16, -9, 2) + prod(h * .86, cx + w * .12, y + h * .16, 9, 2) + prod(h * .94, cx - w / 2, y + h * .1, 0, 3);
  };
  const disc = (t = P.disc) => `<div class="disc">${t}</div>`;
  const name = (x, y, size = 30) => `<div class="abs" style="left:${x}px;top:${y}px;font:800 ${size}px Archivo;letter-spacing:2px;color:${GOLDL};text-transform:uppercase">${P.name}</div>`;
  // big offer label for a pack: price if priced, else "1+1 GRATUIT"
  const offer = (o, size, gold = true) => o.price
    ? price(o.price, size, gold)
    : `<span class="${gold ? 'gold' : ''}" style="font:900 ${size}px/1 Archivo;letter-spacing:${-size / 22}px">${o.big}</span>${o.n > 1 ? `<span class="${gold ? 'gold' : ''}" style="font:900 ${Math.round(size * .34)}px Archivo;letter-spacing:1px"> GRATUIT</span>` : ''}`;
  const subline = o => o.price ? (o.was ? `în loc de <span class="strike">${o.was} lei</span>` : '') : o.sub;
  const giftLine = (k, size = 30) => k ? `<div class="line" style="font-size:${size}px">${ticketIco(size * 1.6)}<div style="display:flex;flex-direction:column;gap:4px"><span class="gold">${cad(k)}</span><span style="font:700 ${size * .72}px Inter;text-transform:none;color:${GREY}">${win(k) === 'câștigător' ? 'Tichetul e câștigător' : 'Toate tichetele sunt câștigătoare'}</span></div></div>` : '';
  const shipLine = (size = 28) => `<div class="line" style="font-size:${size}px">${truckIco(size * .95)}<span>Transport gratuit</span></div>`;
  const packName = o => o.price ? o.title : (o.n === 1 ? o.title : `${o.title} · ${o.n} ${P.many}`);
  const ads = [];
  const add = (id, css, body) => ads.push({ id: `${P.key}-${id}`, html: page(css, body) });

  // 01 – Hero: toate pachetele
  const nc = P.packs.length, cw = nc === 4 ? 228 : 308, gap = nc === 4 ? 16 : 18;
  add('01-black-friday', `
    .card{position:absolute;top:610px;width:${cw}px;height:330px;border-radius:26px;background:${BLK2};border:2px solid #3a3226;text-align:center;padding-top:26px}
    .card .t{font:900 28px Archivo;text-transform:uppercase;color:#fff}
    .card .p{margin-top:16px;color:#fff;height:80px;display:flex;align-items:center;justify-content:center}
    .card .w{font:600 20px Inter;color:#9a8f7e;margin-top:10px;height:26px}
    .card .g{margin-top:14px;font:800 22px/1.25 Archivo;text-transform:uppercase;color:${GOLDL}}
    .card.best{background:${GRAD};border:none;box-shadow:0 0 0 6px ${BLK},0 0 0 8px ${GOLD},0 20px 40px rgba(212,162,76,.3)}
    .card.best .t,.card.best .p,.card.best .g{color:${BLK}}.card.best .w{color:#5b4215}`,
    `${tape()}<div class="glow" style="width:900px;height:900px;left:420px;top:-240px"></div>
    ${logo(56, 104)}
    <div class="abs big gold" style="left:52px;top:180px;font-size:138px">Black<br>Friday</div>
    <div class="abs" style="left:58px;top:450px;width:560px;font:700 28px/1.35 Inter">${P.name}<br><span style="color:${GOLDL}">Tichete răzuibile cadou, toate câștigătoare<br>Transport gratuit la orice comandă</span></div>
    ${stack(Math.min(best.n, 3), 380, 880, 140)}
    ${P.packs.map((o, i) => `<div class="card${o.best ? ' best' : ''}" style="left:${56 + i * (cw + gap)}px">
      <div class="t">${o.title}</div>
      <div class="p">${o.price ? price(o.price, o.price.length > 4 ? 62 : 74) : `<span style="font:900 ${o.big.length > 1 ? 84 : 92}px/1 Archivo;letter-spacing:-3px">${o.big}</span>`}</div>
      <div class="w">${o.price ? (o.was ? `<span class="strike">${o.was} lei</span>` : '') : (o.n > 1 ? `${o.n} ${P.many}` : '')}</div>
      <div class="g">${o.gifts ? cad(o.gifts) : 'Transport<br>gratuit'}</div></div>`).join('')}
    ${P.packs.map((o, i) => o.best ? `<div class="abs tag" style="left:${56 + i * (cw + gap) + cw / 2}px;transform:translateX(-50%);top:588px;background:${RED};color:#fff;font-size:18px;padding:8px 16px">Cea mai aleasă</div>` : '').join('')}
    ${foot()}`);

  // 02 – 1 bucată + transport gratuit
  const one = P.packs[0];
  add('02-1-bucata-transport-gratuit', ``,
    `${tape()}<div class="glow" style="width:820px;height:820px;left:470px;top:150px"></div>
    ${logo(56, 104)}
    <div class="abs tag" style="left:56px;top:180px;background:${GRAD};color:${BLK}">Black Friday</div>
    <div class="abs serif" style="left:56px;top:250px;width:600px;font-size:64px">Chiar și ${P.one === 'cutie' ? 'o singură cutie' : `un singur ${P.one}`} are <span class="gold">transport gratuit.</span></div>
    ${name(60, 560, 28)}
    ${priced ? `<div class="abs" style="left:56px;top:610px">${price(one.price, 120)}</div>` : `<div class="abs" style="left:60px;top:612px;width:560px;font:600 30px/1.35 Inter;color:${GREY}">Comanzi cât ai nevoie. Livrarea e din partea noastră, iar plătești la curier.</div>`}
    <div class="abs" style="left:60px;top:760px">${shipLine(32)}</div>
    <div class="btn" style="left:56px;top:840px">Comandă acum →</div>
    ${stack(1, 680, 830, 200)}
    ${disc()}${foot()}`);

  // 03 – al doilea pachet (+ cadou)
  add('03-pachet-cadou', ``,
    `${tape()}<div class="glow" style="width:860px;height:860px;left:420px;top:120px"></div>
    ${logo(56, 104)}
    <div class="abs tag" style="left:56px;top:180px;background:${GRAD};color:${BLK}">Black Friday</div>
    ${priced
      ? `<div class="abs big" style="left:52px;top:250px;font-size:${second.title.length > 7 ? 80 : 116}px">${second.title}</div>
         <div class="abs" style="left:56px;top:390px">${offer(second, 170)}</div>`
      : `<div class="abs gold" style="left:48px;top:240px;font:900 210px/1 Archivo;letter-spacing:-8px">${second.big}</div>
         <div class="abs gold" style="left:56px;top:445px;font:900 84px/1 Archivo;letter-spacing:2px">GRATUIT</div>
         <div class="abs" style="left:58px;top:545px;font:700 32px Inter;color:${GREY}">${second.sub}</div>`}
    ${priced ? `<div class="abs" style="left:60px;top:575px;font:700 32px Inter;color:${GREY}">${subline(second)}</div>` : ''}
    ${name(60, priced ? 630 : 612, 28)}
    <div class="abs" style="left:60px;top:690px">${giftLine(second.gifts, 32)}</div>
    <div class="abs" style="left:60px;top:782px">${shipLine(28)}</div>
    <div class="btn" style="left:56px;top:862px">Vreau oferta →</div>
    ${stack(second.n, 560, 870, 250)}
    ${disc()}${foot()}`);

  // 04 – pachetul vedetă (cea mai aleasă)
  add('04-cea-mai-aleasa', ``,
    `${tape()}<div class="glow" style="width:960px;height:960px;left:330px;top:60px"></div>
    ${logo(56, 104)}
    <div class="abs tag" style="left:56px;top:180px;background:${RED};color:#fff">Cea mai aleasă</div>
    ${priced
      ? `<div class="abs big gold" style="left:52px;top:248px;font-size:96px">Cura<br>completă</div>
         <div class="abs" style="left:58px;top:448px;font:700 32px Inter;color:${GREY}">${best.title} · ${best.extra}</div>
         <div class="abs" style="left:56px;top:500px">${price(best.price, 170)}</div>
         <div class="abs" style="left:60px;top:680px;font:700 32px Inter;color:${GREY}">${subline(best)}</div>`
      : `<div class="abs gold" style="left:48px;top:240px;font:900 210px/1 Archivo;letter-spacing:-8px">${best.big}</div>
         <div class="abs gold" style="left:56px;top:445px;font:900 84px/1 Archivo;letter-spacing:2px">GRATUIT</div>
         <div class="abs" style="left:58px;top:545px;font:700 32px Inter;color:${GREY}">${best.sub}</div>
         ${name(60, 612, 28)}
         <div class="abs" style="left:58px;top:660px;width:540px;font:600 26px/1.35 Inter;color:${GREY}">Cura completă, cu tichete răzuibile câștigătoare și transport gratuit.</div>`}
    <div class="abs" style="left:60px;top:${priced ? 745 : 755}px">${giftLine(best.gifts, 32)}</div>
    <div class="abs" style="left:800px;top:96px;z-index:5;width:230px;height:230px;border-radius:50%;background:${GRAD};color:${BLK};display:flex;align-items:center;justify-content:center;text-align:center;flex-direction:column;font:900 64px/1 Archivo;text-transform:uppercase;transform:rotate(8deg);box-shadow:0 0 0 6px ${BLK},0 0 0 8px ${GOLD}"><span>+${best.gifts}</span><span style="font-size:28px;margin-top:4px">tichete</span><span style="font:800 17px Inter;text-transform:none;margin-top:4px">toate câștigătoare</span></div>
    ${stack(Math.min(best.n, 4), priced ? 470 : 430, 870, priced ? 360 : 400)}
    <div class="btn" style="left:56px;top:850px">Comandă acum →</div>
    ${foot()}`);

  // 05 – cu cât iei mai mult
  add('05-cu-cat-iei-mai-mult', `
    .bar{position:absolute;left:56px;height:${nc === 4 ? 118 : 150}px;border-radius:20px;display:flex;align-items:center;justify-content:space-between;padding:0 30px;color:#fff}
    .bar .a{font:900 36px Archivo;text-transform:uppercase}.bar .a small{display:block;font:700 20px Inter;text-transform:none;opacity:.8;margin-top:4px}
    .bar .b{text-align:right;font:900 46px Archivo;letter-spacing:-1px}.bar .b small{display:block;font:700 19px Inter;letter-spacing:0;opacity:.8}`,
    `${tape()}${logo(56, 104)}
    <div class="abs serif" style="left:56px;top:176px;width:960px;font-size:60px">Cu cât iei mai mult, <span class="gold">${priced ? 'plătești mai puțin' : 'primești mai mult'}</span>${priced ? ` pe ${P.one}` : ''}.</div>
    ${P.packs.map((o, i) => {
      const ws = nc === 4 ? [620, 720, 820, 968] : [640, 800, 968], last = i === nc - 1;
      const bg = last ? GRAD : ['#2a251e', '#3a3226', '#5a4626'][i];
      const right = priced ? `${o.per} lei<small>pe ${P.one}</small>` : `Primești ${o.n}<small>${o.n === 1 ? `plătești 1` : `plătești ${o.n / 2}`}</small>`;
      const left = priced ? `${o.title}<small>${o.price} lei total${o.gifts ? ` · ${cad(o.gifts)}` : ''}</small>` : `${o.title}<small>${o.n} ${o.n === 1 ? P.one : P.many}${o.gifts ? ` · ${cad(o.gifts)}` : ''} · transport gratuit</small>`;
      return `<div class="bar" style="top:${370 + i * (nc === 4 ? 140 : 180)}px;width:${ws[i]}px;background:${bg};${last ? `color:${BLK}` : ''}"><div class="a">${left}</div><div class="b">${right}</div></div>`;
    }).join('')}
    <div class="abs" style="left:56px;top:928px;font:700 22px Inter;color:${GOLDL}">${P.name} · transport gratuit la toate pachetele</div>
    ${foot()}`);

  // 06 – transport gratuit la orice comandă
  add('06-transport-gratuit', `
    .row{display:flex;justify-content:space-between;align-items:baseline;width:540px;padding:14px 0;border-bottom:2px solid #2c261d;font:700 29px Inter}
    .row b{font:900 32px Archivo;color:${GOLDL};white-space:nowrap}`,
    `<div class="glow" style="width:1000px;height:1000px;left:300px;top:40px"></div>
    ${logo(56, 56)}
    <div class="abs tag" style="left:56px;top:134px;background:${GRAD};color:${BLK}">Black Friday · ${PERIOD}</div>
    <div class="abs" style="left:56px;top:216px">${truckIco(84)}</div>
    <div class="abs big gold" style="left:50px;top:330px;font-size:112px;z-index:5">Transport<br>gratuit</div>
    <div class="abs big" style="left:54px;top:560px;font-size:58px;letter-spacing:-1px">la orice comandă</div>
    <div class="abs" style="left:58px;top:650px">${P.packs.map(o => `<div class="row"><span>${packName(o)}</span><b>${o.price ? `${o.price} lei` : (o.gifts ? `+ ${o.gifts} ${o.gifts === 1 ? 'tichet' : 'tichete'}` : '✓')}</b></div>`).join('')}</div>
    ${stack(Math.min(best.n, 3), 360, 900, 600)}
    ${foot()}`);

  // 07 – ce primești în pachetul vedetă
  add('07-ce-primesti', `
    .li{display:flex;align-items:center;gap:20px;font:700 30px/1.2 Inter;padding:16px 0;border-bottom:2px dashed #3a3226}
    .li i{flex:none;width:46px;height:46px;border-radius:50%;background:${GRAD};color:${BLK};display:flex;align-items:center;justify-content:center;font:900 26px Inter;font-style:normal}
    .li small{display:block;font:600 21px Inter;color:#a99d89;margin-top:4px}
    .li em{margin-left:auto;font:800 22px Archivo;font-style:normal;text-transform:uppercase;color:${GOLDL};white-space:nowrap}`,
    `${tape()}${logo(56, 104)}
    <div class="abs serif" style="left:56px;top:176px;width:980px;font-size:60px">Ce primești de <span class="gold">Black Friday</span></div>
    <div class="abs" style="left:56px;top:320px;width:600px">
      <div class="li"><i>✓</i><div>${best.n} ${P.many} ${P.name}<small>${priced ? best.extra : best.sub}</small></div></div>
      ${Array.from({ length: best.gifts }, () => `<div class="li"><i>✓</i><div>Tichet răzuibil cadou<small>100% câștigător</small></div><em>Gratuit</em></div>`).join('')}
      <div class="li"><i>✓</i><div>Transport gratuit</div><em>0 lei</em></div>
      <div class="li" style="border:none"><i>✓</i><div>Plata la livrare</div></div></div>
    <div class="abs" style="left:58px;top:820px;font:800 34px Archivo;text-transform:uppercase">${priced
      ? `Total: ${price(best.price, 92, true)} <span style="font:700 28px Inter;color:#a99d89;text-transform:none;margin-left:10px">${subline(best)}</span>`
      : `<span class="gold" style="font:900 64px Archivo">${best.big} GRATUIT</span> <span style="font:700 28px Inter;color:#a99d89;text-transform:none;margin-left:10px">${best.sub}</span>`}</div>
    <div class="glow" style="width:700px;height:700px;left:600px;top:200px"></div>
    ${stack(Math.min(best.n, 3), 400, 900, 330)}
    ${foot()}`);

  // 08 – cadou pentru cineva drag (fără pungă, cadoul nu e numit)
  add('08-cadou-pentru-cei-dragi', `
    .card{position:absolute;z-index:6;left:600px;top:790px;padding:18px 26px;background:${CREAM};color:#3a2a14;transform:rotate(-7deg);box-shadow:0 14px 30px rgba(0,0,0,.5);font:700 46px/1 Caveat;text-align:center;border-radius:6px;white-space:nowrap}
`,
    `${tape()}<div class="glow" style="width:900px;height:900px;left:360px;top:160px"></div>
    ${logo(56, 104)}
    <div class="abs tag" style="left:56px;top:180px;background:${GRAD};color:${BLK}">Cadou de Black Friday</div>
    <div class="abs serif" style="left:56px;top:250px;width:540px;font-size:54px">${P.gift[0]}<br><span class="gold">${P.gift[1]}</span></div>
    <div class="abs" style="left:60px;top:600px;width:540px;font:600 28px/1.35 Inter;color:#d9d0c0">${P.giftBody}</div>
    <div class="abs" style="left:60px;top:740px">${giftLine(best.gifts, 28)}</div>
    <div class="btn" style="left:56px;top:850px">Trimite cadoul →</div>
    ${stack(Math.min(second.n, 2), 540, 880, 230)}
    <div class="card">${P.card}</div>
    ${foot()}`);

  // 09 – beneficiu + ofertă
  add('09-beneficii-oferta', `
    .ck{display:flex;align-items:flex-start;gap:18px;font:600 29px/1.25 Inter;width:560px}
    .ck i{flex:none;width:42px;height:42px;border-radius:50%;background:${GRAD};color:${BLK};display:flex;align-items:center;justify-content:center;font:900 24px Inter;font-style:normal;margin-top:-2px}`,
    `${tape()}<div class="glow" style="width:900px;height:900px;left:400px;top:100px"></div>
    ${logo(56, 104)}
    <div class="abs serif" style="left:56px;top:180px;width:620px;font-size:64px">${P.hook[0]}<br><span class="gold">${P.hook[1]}</span></div>
    <div class="abs" style="left:58px;top:430px;display:flex;flex-direction:column;gap:22px">${P.checks.map(c => `<div class="ck"><i>✓</i><span>${c}</span></div>`).join('')}</div>
    <div class="abs" style="left:56px;top:720px;width:580px;padding:22px 28px;border-radius:22px;border:2px solid ${GOLD};background:${BLK2}">
      <div style="font:900 22px Archivo;letter-spacing:2px;color:${GOLDL}">BLACK FRIDAY · ${PERIOD.toUpperCase()}</div>
      <div style="font:900 40px Archivo;text-transform:uppercase;margin-top:8px">${priced ? `${best.title}: <span class="gold">${best.price} lei</span>` : `<span class="gold">${second.big} gratuit</span> + tichet`}</div>
      <div style="font:700 22px Inter;color:${GREY};margin-top:6px">+ tichete răzuibile, toate câștigătoare · transport gratuit</div></div>
    ${stack(1, 640, 860, 220)}
    ${disc()}${foot()}`);

  // 10 – ultima zi
  add('10-ultima-zi', `
    .clock{display:flex;gap:14px}
    .clock div{width:120px;height:130px;border-radius:18px;background:${BLK2};border:2px solid ${GOLDD};display:flex;flex-direction:column;align-items:center;justify-content:center}
    .clock b{font:900 64px/1 Archivo}.clock span{font:700 17px Inter;color:#a99d89;text-transform:uppercase;letter-spacing:1px;margin-top:6px}
    .mini{display:flex;flex-direction:column;gap:10px;font:700 26px Inter;width:560px}.mini b{font:900 28px Archivo;color:${GOLDL}}`,
    `${tape(`Ultima zi · Black Friday Novensa · Se termină la 23:59`)}
    <div class="glow" style="width:900px;height:900px;left:380px;top:120px"></div>
    ${logo(56, 104)}
    <div class="abs big" style="left:50px;top:180px;font-size:150px"><span style="color:${RED}">Ultima</span><br><span class="gold">zi</span></div>
    <div class="abs" style="left:58px;top:462px;width:560px;font:700 30px/1.3 Inter">Black Friday se termină<br><b style="color:${GOLDL}">luni, 16 noiembrie, la 23:59.</b></div>
    <div class="abs clock" style="left:56px;top:560px"><div><b>23</b><span>ore</span></div><div><b>59</b><span>min</span></div><div><b>59</b><span>sec</span></div></div>
    <div class="abs mini" style="left:58px;top:716px">
      ${P.packs.filter(o => o.gifts).slice(-2).map(o => `<div>${packName(o)} ${cad(o.gifts)}${o.price ? ` · <b>${o.price} lei</b>` : ''}</div>`).join('')}
      <div>Transport gratuit la orice comandă</div></div>
    <div class="btn" style="left:56px;top:870px;padding:18px 36px;font-size:28px">Comandă până la 23:59 →</div>
    ${stack(Math.min(best.n, 3), 420, 880, 380)}
    ${foot()}`);

  return ads;
}

module.exports = { build, lib: { PERIOD, BLK, BLK2, GOLD, GOLDL, GOLDD, RED, CREAM, GREY, GRAD, page, logo, tape, foot, ticketIco, truckIco, giftIco } };
