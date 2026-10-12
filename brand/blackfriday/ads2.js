// Black Friday 2026 – SETUL 2: încă 10 reclame 1:1 pe produs, FĂRĂ prețuri.
// Oferta: 1 bucată = transport gratuit · 2, 3 și 5 bucăți = reduceri mari · transport gratuit la orice comandă
// · 1 tichet răzuibil câștigător la fiecare comandă.
// Fără bandă sus și fără date (oferta ține doar câteva zile).
// Render: node render.js --set2 [produs] [id-filter]
const { lib: L } = require('./ads.js');
const { BLK, BLK2, GOLD, GOLDL, GOLDD, RED, CREAM, GREY, GRAD, page, logo, ticketIco, truckIco } = L;
// fără bandă sus și fără date: oferta ține doar câteva zile
const foot = () => `<div class="foot"><span>Transport gratuit</span><span>Plata la livrare</span><span>Tichet răzuibil câștigător</span></div>`;

const PACKS = [
  { n: 1, label: 'Transport gratuit' },
  { n: 2, label: 'Reducere mare' },
  { n: 3, label: 'Reducere mare', best: true },
  { n: 5, label: 'Reducere maximă' },
];

const CSS2 = `
  .ticket{position:absolute;width:500px;height:270px;border-radius:26px;background:${GRAD};box-shadow:0 30px 60px rgba(0,0,0,.55),0 0 0 3px ${GOLDD} inset;color:${BLK}}
  .ticket:before,.ticket:after{content:"";position:absolute;top:110px;width:50px;height:50px;border-radius:50%;background:${BLK}}
  .ticket:before{left:-25px}.ticket:after{right:-25px}
  .ticket .tt{position:absolute;left:44px;top:26px;font:900 30px Archivo;letter-spacing:3px;text-transform:uppercase}
  .ticket .ts{position:absolute;left:44px;top:66px;font:700 19px Inter;opacity:.75}
  .ticket .area{position:absolute;left:44px;top:110px;width:412px;height:120px;border-radius:16px;background:${CREAM};overflow:hidden;display:flex;align-items:center;justify-content:center}
  .ticket .area b{font:900 52px Archivo;letter-spacing:1px;color:${RED}}
  .ticket .silver{position:absolute;inset:0;background:repeating-linear-gradient(135deg,#d9d9d9 0 6px,#bdbdbd 6px 12px);clip-path:polygon(84% 0,100% 0,100% 100%,76% 100%,81% 82%,74% 66%,83% 50%,75% 32%,84% 16%)}
  .ticket .coin{position:absolute;left:70%;top:50%;width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3c4,${GOLD} 60%,${GOLDD});box-shadow:0 6px 12px rgba(0,0,0,.35)}
  .tile{position:absolute;top:620px;width:228px;height:320px;border-radius:26px;background:${BLK2};border:2px solid #3a3226;text-align:center;padding-top:22px}
  .tile .num{font:900 120px/1 Archivo;letter-spacing:-4px;color:#fff;margin-top:6px}
  .tile .u{font:800 26px Archivo;text-transform:uppercase;color:${GREY};margin-top:4px}
  .tile .l{margin:22px 14px 0;font:900 22px/1.15 Archivo;text-transform:uppercase;color:${GOLDL}}
  .tile.best{background:${GRAD};border:none;box-shadow:0 0 0 6px ${BLK},0 0 0 8px ${GOLD},0 20px 40px rgba(212,162,76,.3)}
  .tile.best .num,.tile.best .u,.tile.best .l{color:${BLK}}
  .tline{display:flex;align-items:center;gap:16px;font:800 28px Archivo;text-transform:uppercase;white-space:nowrap}
  .tline small{display:block;font:700 21px Inter;text-transform:none;color:${GREY};margin-top:4px}
`;
const pg = (css, body) => page(CSS2 + css, body);

function build2(P) {
  const SRC = `../../produse/${P.img}`;
  const u = n => `${n} ${n === 1 ? P.one : P.many}`;
  const prod = (h, x, y, rot = 0, z = 1) => `<img class="prod" src="${SRC}" style="height:${h}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg);z-index:${z}">`;
  const stack = (n, h0, cx, y0) => {
    const h = h0 * P.k, y = y0 + (h0 - h), w = h * P.ar;
    if (n === 1) return prod(h, cx - w / 2, y, 3);
    if (n === 2) return prod(h * .94, cx - w * .95, y + h * .05, -7) + prod(h, cx - w * .1, y, 6, 2);
    if (n === 3) return prod(h * .88, cx - w * 1.15, y + h * .1, -10) + prod(h * .88, cx + w * .15, y + h * .1, 10) + prod(h, cx - w / 2, y, 0, 3);
    // 5: 2 în spate + 3 în față
    const b = h * .82, bw = b * P.ar;
    return prod(b, cx - bw * 1.05, y - h * .04, -5, 1) + prod(b, cx + bw * .05, y - h * .04, 5, 1)
      + prod(h * .86, cx - w * 1.2, y + h * .14, -9, 2) + prod(h * .86, cx + w * .2, y + h * .14, 9, 2) + prod(h * .94, cx - w / 2, y + h * .1, 0, 3);
  };
  const ticket = (x, y, rot = -6, scale = 1) => `<div class="ticket" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg) scale(${scale});transform-origin:left top;z-index:6">
    <div class="tt">Tichet răzuibil</div><div class="ts">la fiecare comandă Novensa</div>
    <div class="area"><b>CÂȘTIGĂTOR</b><div class="silver"></div><div class="coin"></div></div></div>`;
  const tline = (size = 28) => `<div class="tline" style="font-size:${size}px">${ticketIco(size * 1.7)}<div><span class="gold">+ 1 tichet răzuibil</span><small>la fiecare comandă · toate sunt câștigătoare</small></div></div>`;
  const sline = (size = 28) => `<div class="tline" style="font-size:${size}px">${truckIco(size * .95)}<span>Transport gratuit la orice comandă</span></div>`;
  const name = (x, y, size = 28) => `<div class="abs" style="left:${x}px;top:${y}px;font:800 ${size}px Archivo;letter-spacing:2px;color:${GOLDL};text-transform:uppercase">${P.name}</div>`;
  const disc = `<div class="disc">${P.disc}</div>`;
  const glow = (s, x, y) => `<div class="glow" style="width:${s}px;height:${s}px;left:${x}px;top:${y}px"></div>`;
  const ads = [];
  const add = (id, css, body) => ads.push({ id: `${P.key}-${id}`, html: pg(css, body) });

  // 11 – Hero: pachetele 1 / 2 / 3 / 5
  add('11-reduceri-mari', ``,
    `${glow(900, 420, -240)}${logo(56, 60)}
    <div class="abs big gold" style="left:52px;top:176px;font-size:130px">Black<br>Friday</div>
    <div class="abs" style="left:58px;top:430px;font:900 40px Archivo;text-transform:uppercase">Reduceri <span class="gold">mari</span></div>
    ${name(60, 486, 26)}
    <div class="abs" style="left:58px;top:530px">${tline(24)}</div>
    ${stack(3, 380, 880, 150)}
    ${PACKS.map((o, i) => `<div class="tile${o.best ? ' best' : ''}" style="left:${56 + i * 244}px"><div class="num">${o.n}</div><div class="u">${o.n === 1 ? P.one : P.many}</div><div class="l">${o.label}</div></div>`).join('')}
    <div class="abs tag" style="left:${56 + 2 * 244 + 114}px;transform:translateX(-50%);top:598px;background:${RED};color:#fff;font-size:18px;padding:8px 16px">Cea mai aleasă</div>
    ${foot()}`);

  // 12 – Tichetul răzuibil
  add('12-tichet-razuibil', ``,
    `${glow(900, 300, 160)}${logo(56, 60)}
    <div class="abs tag" style="left:56px;top:136px;background:${GRAD};color:${BLK}">Black Friday</div>
    <div class="abs serif" style="left:56px;top:210px;width:620px;font-size:56px">La fiecare comandă, un tichet răzuibil.<br><span class="gold">Toate sunt câștigătoare.</span></div>
    ${ticket(70, 560, -5, .9)}
    <div class="abs" style="left:60px;top:880px">${sline(22)}</div>
    ${stack(2, 560, 880, 300)}
    ${name(640, 900, 22)}
    ${foot()}`);

  // 13 – Alege-ți pachetul
  add('13-alege-pachetul', `
    .row{position:absolute;left:56px;width:620px;height:118px;border-radius:22px;background:${BLK2};border:2px solid #3a3226;display:flex;align-items:center;gap:24px;padding:0 28px}
    .row .c{flex:none;width:78px;height:78px;border-radius:50%;background:#2a251e;color:#fff;display:flex;align-items:center;justify-content:center;font:900 44px Archivo}
    .row .t{font:900 34px Archivo;text-transform:uppercase}.row .t small{display:block;font:700 20px Inter;text-transform:none;color:${GREY};margin-top:4px}
    .row.best{background:${GRAD};border:none;color:${BLK}}.row.best .c{background:${BLK};color:${GOLDL}}.row.best small{color:#4a3510}`,
    `${glow(800, 520, 200)}${logo(56, 60)}
    <div class="abs serif" style="left:56px;top:176px;width:960px;font-size:58px">Alege-ți pachetul de <span class="gold">Black Friday</span></div>
    ${PACKS.map((o, i) => `<div class="row${o.best ? ' best' : ''}" style="top:${310 + i * 140}px"><div class="c">${o.n}</div><div class="t">${u(o.n)}<small>${o.n === 1 ? 'Transport gratuit + tichet răzuibil' : `${o.label} + transport gratuit + tichet`}</small></div></div>`).join('')}
    <div class="abs tag" style="left:520px;top:${310 + 2 * 140 - 18}px;background:${RED};color:#fff;font-size:18px;padding:8px 16px">Cea mai aleasă</div>
    ${stack(1, 620, 880, 300)}
    ${disc}${foot()}`);

  // 14 – 5 bucăți
  add('14-pachet-5', ``,
    `${glow(960, 330, 60)}${logo(56, 60)}
    <div class="abs tag" style="left:56px;top:136px;background:${GRAD};color:${BLK}">Cel mai mare pachet</div>
    <div class="abs gold" style="left:44px;top:200px;font:900 300px/1 Archivo;letter-spacing:-12px">5</div>
    <div class="abs big" style="left:250px;top:300px;font-size:76px">${P.many}</div>
    <div class="abs big gold" style="left:56px;top:524px;font-size:46px;letter-spacing:-1px">Reducere maximă</div>
    ${name(60, 600)}
    <div class="abs" style="left:58px;top:650px;width:520px;font:600 26px/1.35 Inter;color:${GREY}">Pentru toată familia sau pentru toată iarna, la cel mai mare discount de Black Friday.</div>
    <div class="abs" style="left:60px;top:770px">${tline(24)}</div>
    ${stack(5, 380, 870, 470)}
    <div class="btn" style="left:56px;top:880px;padding:18px 36px;font-size:28px">Vreau 5 →</div>
    ${foot()}`);

  // 15 – 3 bucăți, cea mai aleasă
  add('15-pachet-3', ``,
    `${glow(960, 330, 60)}${logo(56, 60)}
    <div class="abs tag" style="left:56px;top:136px;background:${RED};color:#fff">Cea mai aleasă</div>
    <div class="abs gold" style="left:44px;top:200px;font:900 300px/1 Archivo;letter-spacing:-12px">3</div>
    <div class="abs big" style="left:250px;top:300px;font-size:76px">${P.many}</div>
    <div class="abs big gold" style="left:56px;top:520px;font-size:56px;letter-spacing:-1px">Reducere mare</div>
    ${name(60, 600)}
    <div class="abs" style="left:58px;top:650px;width:520px;font:600 26px/1.35 Inter;color:${GREY}">Pachetul ales de cei mai mulți clienți: o cură completă, la preț de Black Friday.</div>
    <div class="abs" style="left:60px;top:770px">${tline(24)}</div>
    ${stack(3, 440, 870, 420)}
    <div class="btn" style="left:56px;top:880px;padding:18px 36px;font-size:28px">Vreau 3 →</div>
    ${foot()}`);

  // 16 – 2 bucăți
  add('16-pachet-2', ``,
    `${glow(900, 400, 100)}${logo(56, 60)}
    <div class="abs tag" style="left:56px;top:136px;background:${GRAD};color:${BLK}">Black Friday</div>
    <div class="abs serif" style="left:56px;top:230px;width:620px;font-size:54px">Unul pentru acum.<br><span class="gold">Unul de rezervă.</span></div>
    <div class="abs big" style="left:56px;top:390px;font-size:${P.many.length > 5 ? 74 : 96}px">${u(2)}</div>
    <div class="abs big gold" style="left:58px;top:490px;font-size:52px;letter-spacing:-1px">Reducere mare</div>
    ${name(60, 575)}
    <div class="abs" style="left:60px;top:630px">${tline(24)}</div>
    <div class="abs" style="left:60px;top:740px">${sline(22)}</div>
    ${stack(2, 580, 870, 250)}
    <div class="btn" style="left:56px;top:870px;padding:18px 36px;font-size:28px">Comandă acum →</div>
    ${foot()}`);

  // 17 – 1 bucată: transport gratuit
  add('17-1-bucata', ``,
    `${glow(820, 470, 150)}${logo(56, 60)}
    <div class="abs serif" style="left:56px;top:184px;width:600px;font-size:56px">Chiar și la ${P.one === 'cutie' ? 'o singură cutie' : `un singur ${P.one}`}:</div>
    <div class="abs" style="left:56px;top:330px">${truckIco(90)}</div>
    <div class="abs big gold" style="left:50px;top:440px;font-size:96px;z-index:5">Transport<br>gratuit</div>
    <div class="abs" style="left:60px;top:670px">${tline(28)}</div>
    ${name(60, 780)}
    <div class="btn" style="left:56px;top:850px">Comandă acum →</div>
    ${stack(1, 640, 870, 230)}
    ${disc}${foot()}`);

  // 18 – Cum comanzi în 3 pași
  add('18-3-pasi', `
    .st{position:absolute;left:56px;width:640px;display:flex;gap:26px;align-items:center}
    .st .n{flex:none;width:96px;height:96px;border-radius:24px;background:${GRAD};color:${BLK};display:flex;align-items:center;justify-content:center;font:900 54px Archivo}
    .st b{display:block;font:900 36px Archivo;letter-spacing:-.5px;text-transform:uppercase}.st span{font:600 25px/1.3 Inter;color:${GREY}}`,
    `${glow(800, 520, 220)}${logo(56, 60)}
    <div class="abs serif" style="left:56px;top:176px;width:960px;font-size:58px">Black Friday în <span class="gold">3 pași</span></div>
    <div class="st" style="top:330px"><div class="n">1</div><div><b>Alegi pachetul</b><span>1, 2, 3 sau 5 ${P.many}, cu reduceri mari</span></div></div>
    <div class="st" style="top:500px"><div class="n">2</div><div><b>Plătești la livrare</b><span>transport gratuit la orice comandă</span></div></div>
    <div class="st" style="top:670px"><div class="n">3</div><div><b>Răzuiești tichetul</b><span>e în colet și e sigur câștigător</span></div></div>
    ${name(60, 850, 26)}
    ${stack(1, 600, 880, 320)}
    ${disc}${foot()}`);

  // 19 – Ce e în colet
  add('19-in-colet', `
    .ck{display:flex;align-items:flex-start;gap:18px;font:600 30px/1.25 Inter;width:520px}
    .ck i{flex:none;width:44px;height:44px;border-radius:50%;background:${GRAD};color:${BLK};display:flex;align-items:center;justify-content:center;font:900 24px Inter;font-style:normal;margin-top:-2px}`,
    `${glow(900, 420, 160)}${logo(56, 60)}
    <div class="abs serif" style="left:56px;top:180px;width:600px;font-size:60px">În fiecare colet de <span class="gold">Black Friday</span></div>
    <div class="abs" style="left:58px;top:400px;display:flex;flex-direction:column;gap:30px">
      <div class="ck"><i>✓</i><span>${P.name}, la reducere mare</span></div>
      <div class="ck"><i>✓</i><span>Un tichet răzuibil, <b class="gold">sigur câștigător</b></span></div>
      <div class="ck"><i>✓</i><span>Transport gratuit, oricât comanzi</span></div>
      <div class="ck"><i>✓</i><span>Plata la livrare, la curier</span></div></div>
    <div class="btn" style="left:56px;top:850px">Comandă acum →</div>
    ${stack(3, 460, 850, 170)}
    ${ticket(600, 640, -8, .78)}
    ${foot()}`);

  // 20 – doar câteva zile
  add('20-doar-cateva-zile', `
    .mini{display:flex;flex-direction:column;gap:12px;width:560px}
    .mini div{display:flex;justify-content:space-between;align-items:center;padding:14px 22px;border-radius:16px;background:${BLK2};border:2px solid #3a3226;font:800 28px Archivo;text-transform:uppercase}
    .mini div span{font:900 22px Archivo;color:${GOLDL}}.mini .b{background:${GRAD};border:none;color:${BLK}}.mini .b span{color:${BLK}}`,
    `${glow(900, 420, 120)}${logo(56, 60)}
    <div class="abs tag" style="left:56px;top:140px;background:${RED};color:#fff">Black Friday</div>
    <div class="abs big" style="left:52px;top:210px;font-size:112px">Doar<br><span class="gold">câteva zile</span></div>
    <div class="abs" style="left:58px;top:430px;width:560px;font:600 28px/1.35 Inter;color:${GREY}">Când se termină Black Friday, reducerile dispar. ${P.name}:</div>
    <div class="abs mini" style="left:56px;top:530px">${PACKS.map(o => `<div class="${o.best ? 'b' : ''}">${u(o.n)}<span>${o.label}</span></div>`).join('')}</div>
    <div class="abs" style="left:60px;top:850px">${tline(22)}</div>
    ${stack(3, 440, 880, 380)}
    ${foot()}`);

  return ads;
}

module.exports = { build2 };
