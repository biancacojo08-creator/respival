// 10 personas x 2 ads, 1080x1080. Render with: node render.js [id-filter]
const { page, productBox, tag, footer } = require('./lib.js');

const W = 1080, H = 960; // scene area above the footer

// ---------- scenes (full-bleed SVG backgrounds) ----------
const hex = (op = .12) => {
  let s = '';
  for (let r = 0; r < 14; r++) for (let c = 0; c < 14; c++) {
    const x = c * 90 + (r % 2 ? 45 : 0), y = r * 78;
    s += `<polygon points="${[0, 1, 2, 3, 4, 5].map(i => { const a = Math.PI / 3 * i + Math.PI / 6; return (x + 44 * Math.cos(a)).toFixed(1) + ',' + (y + 44 * Math.sin(a)).toFixed(1); }).join(' ')}" fill="none" stroke="#e3a33b" stroke-opacity="${op}" stroke-width="3"/>`;
  }
  return s;
};
const SCENES = {
  honey: `<rect width="${W}" height="${H}" fill="url(#g)"/><defs><radialGradient id="g" cx="80%" cy="70%" r="80%"><stop offset="0" stop-color="#3a2a0c"/><stop offset=".6" stop-color="#150f06"/><stop offset="1" stop-color="#090705"/></radialGradient></defs>${hex()}`,
  city: (() => {
    let b = '';
    const pts = [[720, 140, 70, '#f3b04a'], [880, 260, 40, '#e86a3a'], [640, 330, 30, '#f7d27a'], [980, 110, 55, '#d9893a'], [820, 420, 26, '#ffd98a'], [560, 120, 34, '#c96b2e'], [1010, 380, 30, '#f2c46a'], [760, 560, 50, '#e09a46']];
    pts.forEach(([x, y, r, c]) => b += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".28"/>`);
    return `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1430"/><stop offset=".55" stop-color="#2a1a1a"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>${b}
    <path d="M540 960 L760 560 L800 560 L1080 960z" fill="#151515"/><path d="M780 580 L790 620 M800 680 L815 740 M825 820 L845 900" stroke="#f3d27e" stroke-width="8" opacity=".55"/>`;
  })(),
  dawn: `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16213e"/><stop offset=".45" stop-color="#7a4a5a"/><stop offset=".62" stop-color="#e89a52"/><stop offset=".64" stop-color="#2a3a4a"/><stop offset="1" stop-color="#0c141c"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="820" cy="610" r="70" fill="#ffd08a" opacity=".9"/>
    ${[640, 670, 705, 745, 790, 840].map((y, i) => `<path d="M${600 - i * 40} ${y} H${1040 + i * 10}" stroke="#ffcf8a" stroke-opacity="${.45 - i * .06}" stroke-width="${4 - i * .4}"/>`).join('')}
    <path d="M300 960 Q 560 380 1000 210" stroke="#cfc6b5" stroke-width="3" fill="none" opacity=".7"/><path d="M1000 210 L 965 700" stroke="#cfc6b5" stroke-width="1.5" opacity=".6"/>
    <g transform="translate(965 700)"><ellipse rx="10" ry="16" fill="#e8463a"/><rect x="-10" y="-2" width="20" height="18" fill="#f6f1e7"/><rect x="-2" y="-34" width="4" height="20" fill="#e8463a"/></g>
    <path d="M920 722 q45 -12 90 0" stroke="#ffcf8a" stroke-width="2" fill="none" opacity=".7"/>`,
  road: `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1a2a"/><stop offset=".42" stop-color="#3b3446"/><stop offset=".44" stop-color="#1a1a1a"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/><path d="M200 960 L700 420 L760 420 L1260 960z" fill="#1f1f1f"/>
    ${[[722, 440, 4, 14], [716, 490, 6, 26], [706, 560, 9, 40], [690, 660, 13, 60], [668, 800, 18, 90]].map(([x, y, w, h]) => `<rect x="${x + 8}" y="${y}" width="${w}" height="${h}" fill="#f3d27e" opacity=".8"/>`).join('')}
    <path d="M700 420 L200 960 M760 420 L1260 960" stroke="#bbb" stroke-width="4" opacity=".5"/>
    <g transform="translate(860 200)" opacity=".9"><rect width="190" height="96" rx="8" fill="#1d4ed8"/><text x="95" y="42" fill="#fff" font-family="Inter" font-weight="700" font-size="30" text-anchor="middle">A8</text><text x="95" y="80" fill="#fff" font-family="Inter" font-weight="600" font-size="24" text-anchor="middle">München 312</text></g>`,
  wood: (() => {
    let l = '';
    for (let i = 0; i < 26; i++) { const y = i * 40 + (i % 3) * 7; l += `<path d="M0 ${y} C 300 ${y + 18}, 700 ${y - 16}, 1080 ${y + 10}" stroke="#2a1708" stroke-width="${2 + (i % 4)}" opacity=".5" fill="none"/>`; }
    return `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a3518"/><stop offset="1" stop-color="#26150a"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>${l}<rect width="${W}" height="${H}" fill="#000" opacity=".35"/>`;
  })(),
  night: (() => {
    let st = ''; for (let i = 0; i < 60; i++) { const x = (i * 197) % 1080, y = (i * 131) % 600; st += `<circle cx="${x}" cy="${y}" r="${(i % 3) + 1}" fill="#fff" opacity="${.15 + (i % 5) * .1}"/>`; }
    return `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1330"/><stop offset="1" stop-color="#05070f"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>${st}<circle cx="930" cy="150" r="70" fill="#f4e6b8"/><circle cx="905" cy="130" r="64" fill="#0b1330"/>`;
  })(),
  sunrise: `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a1a3a"/><stop offset=".55" stop-color="#7a3b2e"/><stop offset="1" stop-color="#e9a04a"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/><circle cx="960" cy="860" r="260" fill="#ffd27a" opacity=".35"/><circle cx="960" cy="860" r="160" fill="#ffe2a0" opacity=".45"/>`,
  elegant: `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14161c"/><stop offset="1" stop-color="#05060a"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>${Array.from({ length: 30 }, (_, i) => `<path d="M${i * 60 - 400} 0 L${i * 60 + 200} ${H}" stroke="#d4a24c" stroke-opacity=".06" stroke-width="2"/>`).join('')}`,
  diaspora: `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#101827"/><stop offset="1" stop-color="#1d1410"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/>
    <path d="M640 760 Q 820 420 990 560" stroke="#f3d27e" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round" fill="none"/>
    <g transform="translate(640 760)"><circle r="16" fill="#9aa4b5"/><text y="56" fill="#cfd6e2" font-family="Inter" font-weight="600" font-size="28" text-anchor="middle">Torino</text></g>
    <g transform="translate(990 560)"><circle r="20" fill="#e3a33b"/><circle r="40" fill="none" stroke="#e3a33b" stroke-opacity=".5" stroke-width="3"/><text y="-58" fill="#f3d27e" font-family="Inter" font-weight="700" font-size="30" text-anchor="middle">Acasă</text></g>`,
};
const scene = (k) => `<svg class="abs" style="left:0;top:0" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${SCENES[k]}</svg>`;

// ---------- template: persona quote ----------
function quoteAd({ sceneKey, icon, who, quote, size = 64, sub, box = { s: 1.12, x: 700, y: 360 }, extra = '', shade = true, textW = 610 }) {
  return page(`
    .shade{position:absolute;left:0;top:0;width:820px;height:${H}px;background:linear-gradient(90deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.55) 60%,rgba(0,0,0,0) 100%)}
    .col{position:absolute;left:60px;top:60px;width:${textW}px;bottom:150px;display:flex;flex-direction:column;gap:26px}
    .quote{font-size:${size}px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.5)}
    .quote em{font-style:normal;color:#f0c66a}
    .sub{font:600 28px/1.35 Inter;color:#eadfc6;max-width:${textW}px}
    .sub b{color:#f0c66a}
  `, `${scene(sceneKey)}${shade ? '<div class="shade"></div>' : ''}${extra}
    <div class="col">${tag(icon, who)}<div class="qmark gold">“</div><div class="quote">${quote}</div><div class="rule" style="width:160px"></div><div class="sub">${sub}</div></div>
    ${productBox(box.s, `left:${box.x}px;top:${box.y}px`)}${footer()}`);
}

const clock = (t, x, y, c = '#ff4d3d') => `<div class="abs" style="left:${x}px;top:${y}px;padding:14px 26px;border-radius:16px;background:#050505;border:2px solid #222;font:800 92px Barlow;color:${c};letter-spacing:4px;text-shadow:0 0 18px ${c}">${t}</div>`;

// ---------- template: WhatsApp chat ----------
function chatAd() {
  const msgs = [
    ['in', 'Iar n-am dormit bine… m-am sculat de 4 ori azi-noapte 😔', '22:47'],
    ['out', 'Tată, ți-am comandat ceva. Vine mâine acasă, plătești la curier 📦', '22:49'],
    ['out', 'Se numește PROSTA COMPLEX, de la Novensa. Iei câte 10 ml dimineața și seara. Te rog să-l iei ❤️', '22:50'],
    ['in', 'Bine, mamă. Mulțumesc 🙏', '22:52'],
  ];
  return page(`
    .phone{position:absolute;left:60px;top:56px;width:500px;height:850px;border-radius:56px;background:#111;border:3px solid #333;padding:16px;box-shadow:0 30px 60px rgba(0,0,0,.6)}
    .scr{width:100%;height:100%;border-radius:42px;overflow:hidden;background:#efe7dd;display:flex;flex-direction:column}
    .hd{background:#075e54;color:#fff;padding:44px 24px 18px;display:flex;align-items:center;gap:16px}
    .av{width:62px;height:62px;border-radius:50%;background:#c9b79c;display:flex;align-items:center;justify-content:center;font:700 28px Inter;color:#5a4630}
    .hd b{font:700 28px Inter;display:block}.hd small{font:400 20px Inter;opacity:.8}
    .msgs{padding:22px 18px;display:flex;flex-direction:column;gap:14px}
    .m{max-width:84%;padding:14px 18px 10px;border-radius:16px;font:400 25px/1.32 Inter;color:#111;box-shadow:0 1px 1px rgba(0,0,0,.12)}
    .m i{display:block;text-align:right;font:400 16px Inter;color:#777;font-style:normal;margin-top:4px}
    .in{background:#fff;align-self:flex-start;border-top-left-radius:4px}
    .out{background:#d9fdd3;align-self:flex-end;border-top-right-radius:4px}
    .right{position:absolute;left:600px;top:70px;width:440px;display:flex;flex-direction:column;gap:22px}
    .h{font:900 48px/1.16 Merri;color:#fff}.h em{font-style:normal;color:#f0c66a}
    .tag{font-size:22px}
  `, `<div class="abs" style="inset:0;background:linear-gradient(135deg,#101827,#1d1410)"></div>
    <div class="phone"><div class="scr"><div class="hd"><div class="av">T</div><div><b>Tata ❤️</b><small>online</small></div></div>
    <div class="msgs">${msgs.map(([d, t, h]) => `<div class="m ${d}">${t}<i>${h}${d === 'out' ? ' ✓✓' : ''}</i></div>`).join('')}</div></div></div>
    <div class="right">${tag('phone', '<b>Ioana, 36</b> · din Torino')}<div class="h">„L-am auzit pe tata obosit la telefon. <em>I l-am trimis acasă.</em>”</div></div>
    ${productBox(.86, 'left:700px;top:470px')}${footer()}`);
}

// ---------- template: handwritten note (Mariana A) ----------
function noteAd() {
  return page(`
    .table{position:absolute;inset:0 0 120px 0;background:linear-gradient(135deg,#d9b98c,#b88a55)}
    .table:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(8deg,rgba(90,50,20,.12) 0 3px,transparent 3px 42px)}
    .h{position:absolute;left:60px;top:54px;width:960px;font:900 60px/1.14 Merri;color:#1b120a}
    .h em{font-style:normal;color:#7a4a12}
    .who{position:absolute;left:60px;top:250px;font:600 26px Inter;color:#3b2a18}
    .note{position:absolute;left:80px;top:330px;width:520px;height:500px;background:#fff8d6;transform:rotate(-5deg);box-shadow:0 18px 30px rgba(60,30,10,.35);padding:56px 44px;font:700 50px/1.18 Caveat;color:#1d3b8c}
    .note:before{content:"";position:absolute;top:-18px;left:200px;width:120px;height:40px;background:rgba(255,255,255,.6);transform:rotate(3deg)}
    .cup{position:absolute;left:560px;top:690px;width:190px;height:190px;border-radius:50%;background:radial-gradient(circle,#3b2212 0 52%,#f4efe6 53% 70%,#e3dccf 71%);box-shadow:0 14px 24px rgba(60,30,10,.35)}
  `, `<div class="table"></div>
    <div class="h">„I-am comandat lui Gelu. <em>Acum dormim amândoi.</em>”</div>
    <div class="who">— Mariana, 61 de ani, Iași</div>
    <div class="note">Gelu, ți-am pus sticla lângă cafea. 10 ml dimineața și 10 ml seara.<br>Să dormim și noi o noapte întreagă ❤️<br><span style="float:right">— M.</span></div>
    <div class="cup"></div>
    ${productBox(1.0, 'left:735px;top:400px')}${footer()}`);
}

// ---------- template: ingredients (Costică B) ----------
function ingredientsAd() {
  const L = [['Serenoa repens', 'palmier pitic', '#c9a227'], ['Urzică', 'extract', '#4c8c4a'], ['Dovleac', 'extract', '#e07b26']];
  const R = [['Zinc', 'mineral', '#9aa7b4'], ['Seleniu', 'mineral', '#b9a07a'], ['Vitamina E', 'vitamină', '#e3c04a']];
  const item = ([n, s, c], side) => `<div class="it ${side}"><span class="dot" style="background:${c}"></span><div><b>${n}</b><small>${s}</small></div></div>`;
  return page(`
    .top{position:absolute;left:60px;right:60px;top:52px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px}
    .h{font:900 54px/1.15 Merri;color:#fff}.h em{font-style:normal;color:#f0c66a}
    .lst{position:absolute;top:410px;display:flex;flex-direction:column;gap:46px}
    .it{display:flex;align-items:center;gap:18px;background:rgba(0,0,0,.55);border:1.5px solid rgba(212,162,76,.45);border-radius:18px;padding:16px 22px;width:310px}
    .it.r{flex-direction:row}
    .dot{width:54px;height:54px;border-radius:50%;flex:none;box-shadow:inset -6px -8px 0 rgba(0,0,0,.25)}
    .it b{font:700 30px Inter;color:#fff;display:block}.it small{font:400 21px Inter;color:#d8cdb6}
  `, `${scene('honey')}
    <div class="top">${tag('bee', '<b>Nea Costică, 64</b> · apicultor, Vâlcea')}<div class="h">„Palmier pitic, urzică și dovleac.<br><em>Plante în care am încredere.</em>”</div></div>
    <div class="lst" style="left:50px">${L.map(x => item(x, 'l')).join('')}</div>
    <div class="lst" style="right:50px">${R.map(x => item(x, 'r')).join('')}</div>
    ${productBox(.98, 'left:400px;top:400px')}${footer()}`);
}

// ---------- template: route map (Petre B) ----------
function routeAd() {
  let grid = '';
  for (let i = 0; i < 14; i++) grid += `<path d="M${i * 85} 0 L${i * 85 - 120} ${H}" stroke="#2c2c34" stroke-width="${i % 4 ? 3 : 9}"/><path d="M0 ${i * 75} L${W} ${i * 75 + 60}" stroke="#2c2c34" stroke-width="${i % 3 ? 3 : 9}"/>`;
  const wc = (x, y) => `<g transform="translate(${x} ${y})"><circle r="34" fill="#3a3a44"/><text y="11" fill="#9a9aa6" font-family="Inter" font-weight="700" font-size="28" text-anchor="middle">WC</text><path d="M-40 -40 L40 40" stroke="#e8463a" stroke-width="8" stroke-linecap="round"/></g>`;
  return page(`
    .col{position:absolute;left:60px;top:60px;width:600px;display:flex;flex-direction:column;gap:24px}
    .h{font:900 64px/1.12 Merri;color:#fff}.h em{font-style:normal;color:#f0c66a}
    .sub{font:600 28px/1.35 Inter;color:#eadfc6}
    .panel{position:absolute;left:0;top:0;width:700px;height:${H}px;background:linear-gradient(90deg,rgba(10,10,14,.95) 55%,rgba(10,10,14,0))}
  `, `<svg class="abs" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#18181e"/>${grid}
      <path d="M600 900 C 700 780, 640 660, 760 560 S 900 380, 860 200 S 980 80, 1040 40" stroke="#f3d27e" stroke-width="12" fill="none" stroke-linecap="round"/>
      ${wc(700, 640)}${wc(905, 400)}${wc(990, 150)}
      <circle cx="600" cy="900" r="18" fill="#f3d27e"/><circle cx="1040" cy="40" r="18" fill="#5ba33b"/></svg>
    <div class="panel"></div>
    <div class="col">${tag('wheel', '<b>Petre, 58</b> · taximetrist, București')}<div class="h">„Ruta mea nu mai depinde <em>de toalete.</em>”</div><div class="rule" style="width:160px"></div>
    <div class="sub">10 ml dimineața, 10 ml seara.<br>PROSTA COMPLEX: Serenoa, urzică și dovleac pentru sănătatea prostatei.</div></div>
    ${productBox(1.0, 'left:720px;top:430px')}${footer()}`);
}

// ---------- template: label + magnifier (Vasile A) ----------
function labelAd() {
  return page(`
    .bg{position:absolute;inset:0 0 120px 0;background:radial-gradient(120% 90% at 20% 20%,#1d2b22,#0a0f0c)}
    .h{position:absolute;left:60px;top:150px;width:960px;font:900 66px/1.12 Merri;color:#fff}.h em{font-style:normal;color:#f0c66a}
    .who{position:absolute;left:60px;top:56px}
    .lab{position:absolute;left:60px;top:380px;width:620px;height:500px;background:#111;border:1px solid #333;border-radius:8px;padding:36px 40px;font:400 30px/1.4 Inter;color:#cfcfcf;box-shadow:0 20px 40px rgba(0,0,0,.6)}
    .lab b{color:#fff;font-weight:700;letter-spacing:.5px}
    .lab .hl{background:rgba(240,198,106,.22);color:#fff;padding:0 4px;border-radius:4px}
    .mag{position:absolute;left:470px;top:690px;width:170px;height:170px;border-radius:50%;border:14px solid #c9a24a;background:radial-gradient(circle,rgba(255,255,255,.08),rgba(255,255,255,.02));box-shadow:0 10px 30px rgba(0,0,0,.5),inset 0 0 30px rgba(255,255,255,.15)}
    .mag:after{content:"";position:absolute;width:30px;height:150px;background:linear-gradient(90deg,#3a2414,#6b4426);border-radius:10px;left:130px;top:130px;height:100px;transform:rotate(-45deg);transform-origin:top center}
  `, `<div class="bg"></div>
    <div class="who">${tag('glasses', '<b>Domnul Vasile, 70</b> · profesor de matematică, Cluj')}</div>
    <div class="h">„Am citit eticheta înainte să cumpăr. <em>Asta m-a convins.</em>”</div>
    <div class="lab"><b>INGREDIENTE:</b><br><span class="hl">Extract de Serenoa repens</span>, extract de urzică, extract de dovleac, zinc, seleniu, vitamina E.<br><br><b>MOD DE UTILIZARE:</b><br>10 ml, de 2 ori pe zi.<br>O cutie = 5 zile.</div>
    <div class="mag"></div>
    ${productBox(1.0, 'left:730px;top:400px')}${footer()}`);
}

// ---------- template: pills vs drops (Vasile B) ----------
function compareAd() {
  const pills = Array.from({ length: 16 }, (_, i) => `<span class="pill" style="left:${40 + (i * 67) % 330}px;top:${380 + Math.floor(i / 5) * 70 + (i % 2) * 18}px;transform:rotate(${(i * 37) % 160 - 80}deg)"></span>`).join('');
  return page(`
    .l{position:absolute;left:0;top:0;width:540px;height:${H}px;background:linear-gradient(180deg,#3a3d42,#23252a)}
    .r{position:absolute;left:540px;top:0;width:540px;height:${H}px;background:radial-gradient(90% 70% at 50% 60%,#1f2c18,#0b0b0b)}
    .lab{position:absolute;top:240px;font:700 30px Inter;letter-spacing:2px;text-transform:uppercase}
    .h{position:absolute;left:60px;right:60px;top:56px;text-align:center;font:900 50px/1.16 Merri;color:#fff;z-index:2}.h em{font-style:normal;color:#f0c66a}
    .pill{position:absolute;width:86px;height:34px;border-radius:20px;background:linear-gradient(90deg,#e9e9e9 50%,#b9bcc2 50%);box-shadow:0 4px 8px rgba(0,0,0,.4)}
    .x{position:absolute;left:70px;top:330px;width:400px;height:400px}
    .glass{position:absolute;left:600px;top:560px;width:150px;height:200px;border:4px solid rgba(255,255,255,.55);border-top:none;border-radius:0 0 26px 26px;background:linear-gradient(180deg,transparent 30%,rgba(227,163,59,.35) 30%)}
    .drop{position:absolute;width:26px;height:26px;background:#e3a33b;border-radius:0 50% 50% 50%;transform:rotate(45deg)}
    .cap{position:absolute;top:800px;font:600 26px/1.3 Inter;color:#eadfc6;text-align:center;width:420px}
  `, `<div class="l"></div><div class="r"></div>
    <div class="h">„Nu încă o pastilă de înghițit.<br><em>10 ml dimineața, 10 ml seara.</em>”</div>
    <div class="lab" style="left:120px;color:#c9ccd2">Încă o capsulă?</div>
    <div class="lab" style="left:640px;color:#f0c66a">Lichid</div>
    ${pills}<svg class="x" viewBox="0 0 400 400"><path d="M40 40L360 360M360 40L40 360" stroke="#e8463a" stroke-width="22" stroke-linecap="round" opacity=".85"/></svg>
    <div class="glass"></div><div class="drop" style="left:660px;top:470px"></div><div class="drop" style="left:664px;top:520px;transform:rotate(45deg) scale(.7)"></div>
    <div class="cap" style="left:60px">${tag('glasses', '<b>Domnul Vasile, 70</b>')}</div>
    ${productBox(.92, 'left:790px;top:330px')}${footer()}`);
}

// ---------- template: split night/morning (Gelu & Mariana B) ----------
function splitAd() {
  return page(`
    .n{position:absolute;left:0;top:0;width:540px;height:${H}px}
    .d{position:absolute;left:540px;top:0;width:540px;height:${H}px;background:linear-gradient(160deg,#f7d58c,#e59a4a 60%,#b9652a)}
    .t{position:absolute;top:130px;width:540px;text-align:center}
    .t .lb{font:700 30px Inter;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px}
    .cap{position:absolute;top:400px;width:440px;font:900 44px/1.18 Merri;text-align:center}
    .who{position:absolute;left:0;right:0;bottom:150px;text-align:center}.who .tag{background:rgba(0,0,0,.75)}
  `, `<svg class="abs n" width="540" height="${H}" viewBox="0 0 1080 ${H}" preserveAspectRatio="xMidYMid slice">${SCENES.night}</svg><div class="d"></div>
    <div class="t" style="left:0"><div class="lb" style="color:#9fb0d8">Înainte</div></div>
    <div class="t" style="left:540px"><div class="lb" style="color:#5a2a0a">Acum</div></div>
    ${clock('03:17', 120, 200)}${clock('07:30', 660, 200, '#2a1405').replace('background:#050505;border:2px solid #222', 'background:#fff3dc;border:2px solid #e4b874').replace('text-shadow:0 0 18px #2a1405', 'text-shadow:none')}
    <div class="cap" style="left:50px;color:#dfe6f7">A patra trezire în noaptea asta.</div>
    <div class="cap" style="left:590px;color:#2a1405">Prima noapte întreagă, după mult timp.</div>
    ${productBox(.9, 'left:405px;top:540px')}
    <div class="who" style="top:36px;bottom:auto">${tag('moon', '<b>Gelu & Mariana</b> · 63 și 61, Ploiești')}</div>${footer()}`);
}

// ---------- template: discreet parcel (Aurel B) ----------
function parcelAd() {
  return page(`
    .bg{position:absolute;inset:0 0 120px 0;background:radial-gradient(90% 80% at 30% 70%,#262a33,#0a0b0e)}
    .mat{position:absolute;left:70px;top:640px;width:560px;height:220px;border-radius:14px;background:repeating-linear-gradient(90deg,#4a3b2a 0 6px,#3b2e20 6px 12px);box-shadow:0 10px 30px rgba(0,0,0,.6)}
    .pk{position:absolute;left:150px;top:440px;width:400px;height:300px;background:linear-gradient(160deg,#c9a06a,#a77b45);border-radius:6px;box-shadow:0 20px 30px rgba(0,0,0,.5)}
    .pk:before{content:"";position:absolute;left:170px;top:0;width:60px;height:100%;background:rgba(220,200,160,.55)}
    .pk:after{content:"";position:absolute;left:0;top:-60px;width:400px;height:60px;background:linear-gradient(160deg,#dcb47c,#b98d55);transform:skewX(-30deg);transform-origin:bottom left}
    .col{position:absolute;left:60px;top:60px;width:960px;display:flex;flex-direction:column;gap:22px}
    .h{font:900 62px/1.12 Merri;color:#fff}.h em{font-style:normal;color:#f0c66a}
    .sub{font:600 28px Inter;color:#eadfc6}
  `, `<div class="bg"></div><div class="mat"></div><div class="pk"></div>
    <div class="col">${tag('tie', '<b>Domnul Aurel, 62</b>')}<div class="h">Colet discret.<br><em>Nimeni nu știe ce e înăuntru.</em></div><div class="sub">Comanzi online în 1 minut · plătești la livrare · fără rețetă</div></div>
    ${productBox(.95, 'left:740px;top:420px')}${footer()}`);
}

// ---------- template: odometer (Dorin B) ----------
function odoAd() {
  const digits = '1248'.split('').map(d => `<span>${d}</span>`).join('');
  return page(`
    .col{position:absolute;left:60px;top:60px;width:640px;display:flex;flex-direction:column;gap:24px}
    .h{font:900 76px/1.08 Merri;color:#fff}.h em{font-style:normal;color:#f0c66a}
    .sub{font:600 28px/1.35 Inter;color:#eadfc6}
    .odo{display:flex;gap:8px;align-items:flex-end;margin-top:10px}
    .odo span{width:86px;height:118px;background:linear-gradient(180deg,#000,#222 50%,#000);color:#fff;border:2px solid #444;border-radius:10px;display:flex;align-items:center;justify-content:center;font:800 96px Barlow}
    .odo i{font:700 40px Barlow;color:#f0c66a;margin-left:10px;font-style:normal}
    .shade{position:absolute;left:0;top:0;width:800px;height:${H}px;background:linear-gradient(90deg,rgba(0,0,0,.8),rgba(0,0,0,0))}
  `, `${scene('road')}<div class="shade"></div>
    <div class="col">${tag('truck', '<b>Dorin, 52</b> · șofer de TIR')}<div class="h">Kilometri,<br><em>nu opriri.</em></div><div class="odo">${digits}<i>km azi</i></div><div class="rule" style="width:160px"></div><div class="sub">10 ml dimineața, 10 ml seara.<br>Între ele: drumul.</div></div>
    ${productBox(1.05, 'left:720px;top:400px')}${footer()}`);
}

// ---------- template: made in Romania (Ilie B) ----------
function madeAd() {
  return page(`
    .col{position:absolute;left:60px;top:60px;width:620px;display:flex;flex-direction:column;gap:26px}
    .h{font:900 66px/1.12 Merri;color:#fff}.h em{font-style:normal;color:#f0c66a}
    .sub{font:600 28px/1.35 Inter;color:#eadfc6}
    .flag{display:flex;width:150px;height:14px;border-radius:7px;overflow:hidden}.flag i{flex:1}
    .seal{position:absolute;left:510px;top:610px;width:200px;height:200px;border-radius:50%;border:4px solid #d4a24c;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:rgba(0,0,0,.5);transform:rotate(-8deg)}
    .seal b{font:800 34px Barlow;color:#f0c66a;line-height:1}.seal span{font:700 20px Inter;color:#fff;letter-spacing:1px}
  `, `${scene('wood')}
    <div class="col">${tag('saw', '<b>Nea Ilie, 66</b> · tâmplar, Maramureș')}<div class="h">Făcut în România.<br><em>Ca lucrurile bune de altădată.</em></div>
    <div class="flag"><i style="background:#002b7f"></i><i style="background:#fcd116"></i><i style="background:#ce1126"></i></div>
    <div class="sub">Serenoa, urzică și dovleac, plus zinc, seleniu și vitamina E. Într-o singură cutie.</div></div>
    <div class="seal"><span>FABRICAT ÎN</span><b>ROMÂNIA</b><span>100 ml lichid</span></div>
    ${productBox(1.08, 'left:720px;top:380px')}${footer()}`);
}

// ---------- template: grandpa + grandson silhouettes (Fănică B) ----------
function nepotAd() {
  const fig = (x, s) => `<g transform="translate(${x} 720) scale(${s})" fill="#140c08"><circle cx="0" cy="-150" r="26"/><path d="M-30 -120 h60 l10 110 h-80z"/><rect x="-26" y="-12" width="20" height="90"/><rect x="6" y="-12" width="20" height="90"/><path d="M20 -100 L170 -260" stroke="#140c08" stroke-width="6"/></g>`;
  return quoteAd({
    sceneKey: 'sunrise', icon: 'fish', who: '<b>Nea Fănică, 67</b> · Tulcea',
    quote: 'Mai mult timp cu nepoții. <em>Mai puțin la baie.</em>', size: 70,
    sub: 'PROSTA COMPLEX: Serenoa, urzică și dovleac pentru sănătatea prostatei și funcția urinară.',
    extra: `<svg class="abs" width="${W}" height="${H}"><rect x="380" y="800" width="700" height="24" fill="#140c08"/>${[420, 560, 700, 840, 980].map(x => `<rect x="${x}" y="820" width="14" height="140" fill="#140c08"/>`).join('')}${fig(480, 1)}${fig(590, .62)}</svg>`,
    box: { s: 1.0, x: 760, y: 380 },
  });
}

module.exports = [
  // 1. Nea Costică – apicultor
  { id: '01A-costica-natura', html: quoteAd({ sceneKey: 'honey', icon: 'bee', who: '<b>Nea Costică, 64</b> · apicultor, Vâlcea', quote: 'Am încredere în ce-mi dă natura. <em>De-asta am ales plantele.</em>', size: 64, sub: 'Serenoa repens, urzică și dovleac, plus zinc, seleniu și vitamina E. Supliment lichid fabricat în România.' }) },
  { id: '01B-costica-ingrediente', html: ingredientsAd() },
  // 2. Petre – taximetrist
  { id: '02A-petre-12ore', html: quoteAd({ sceneKey: 'city', icon: 'wheel', who: '<b>Petre, 58</b> · taximetrist, București', quote: '12 ore pe zi la volan. <em>Nu-mi permit să caut toaleta la fiecare colț.</em>', size: 60, sub: 'PROSTA COMPLEX susține sănătatea prostatei și funcția urinară. 10 ml, de 2 ori pe zi.' }) },
  { id: '02B-petre-ruta', html: routeAd() },
  // 3. Mariana – soția
  { id: '03A-mariana-dormim', html: noteAd() },
  { id: '03B-mariana-noaptea', html: quoteAd({ sceneKey: 'night', icon: 'heart', who: '<b>Mariana, 61</b> · Iași', quote: 'Când el se trezește de 4 ori pe noapte, <em>nu doarme nici ea.</em>', size: 62, sub: 'Fă-i un cadou care contează pentru amândoi. Livrat acasă, plătești la primire.', extra: clock('03:17', 700, 200) }) },
  // 4. Ioana – fiica din diaspora
  { id: '04A-ioana-whatsapp', html: chatAd() },
  { id: '04B-ioana-tata', html: quoteAd({ sceneKey: 'diaspora', icon: 'phone', who: '<b>Pentru cei plecați departe</b>', quote: 'Tata n-o să-ți spună. <em>Dar o să-ți mulțumească.</em>', size: 64, sub: 'Comanzi din străinătate, <b>livrăm la părinții tăi în România</b>. Plata la livrare.', box: { s: .9, x: 770, y: 120 } }) },
  // 5. Domnul Vasile – profesorul sceptic
  { id: '05A-vasile-eticheta', html: labelAd() },
  { id: '05B-vasile-picaturi', html: compareAd() },
  // 6. Nea Fănică – pescar
  { id: '06A-fanica-pescuit', html: quoteAd({ sceneKey: 'dawn', icon: 'fish', who: '<b>Nea Fănică, 67</b> · pescar, Tulcea', quote: 'Vreau să stau la pescuit cu nepotul, <em>nu să fug la mal la fiecare oră.</em>', size: 56, sub: 'PROSTA COMPLEX: Serenoa, urzică și dovleac pentru sănătatea prostatei.', box: { s: .95, x: 760, y: 120 } }) },
  { id: '06B-fanica-nepoti', html: nepotAd() },
  // 7. Dorin – șofer de TIR
  { id: '07A-dorin-autostrada', html: quoteAd({ sceneKey: 'road', icon: 'truck', who: '<b>Dorin, 52</b> · șofer de TIR', quote: 'Pe autostradă în Germania nu oprești când vrei. <em>Trebuia să fac ceva.</em>', size: 58, sub: '10 ml dimineața, 10 ml seara. Supliment lichid pentru sănătatea prostatei și funcția urinară.', box: { s: 1.0, x: 740, y: 420 } }) },
  { id: '07B-dorin-kilometri', html: odoAd() },
  // 8. Domnul Aurel – discretul
  { id: '08A-aurel-jena', html: quoteAd({ sceneKey: 'elegant', icon: 'tie', who: '<b>Domnul Aurel, 62</b>', quote: 'Îmi era jenă să întreb pe cineva. <em>Am comandat discret, online.</em>', size: 64, sub: 'Fără rețetă, fără cozi la farmacie. Colet discret, plata la livrare.' }) },
  { id: '08B-aurel-colet', html: parcelAd() },
  // 9. Gelu & Mariana – cuplul
  { id: '09A-cuplu-prima-noapte', html: quoteAd({ sceneKey: 'sunrise', icon: 'moon', who: '<b>Gelu & Mariana</b> · 63 și 61, Ploiești', quote: 'Prima noapte întreagă de dormit, <em>după mult timp.</em>', size: 70, sub: 'PROSTA COMPLEX susține sănătatea prostatei și funcția urinară. Ingrediente naturale, fabricat în România.' }) },
  { id: '09B-cuplu-inainte-acum', html: splitAd() },
  // 10. Nea Ilie – tâmplar
  { id: '10A-ilie-pastile', html: quoteAd({ sceneKey: 'wood', icon: 'saw', who: '<b>Nea Ilie, 66</b> · tâmplar, Maramureș', quote: 'Toată viața am lucrat cu mâinile. <em>Nu vreau să stau pe pastile.</em>', size: 62, sub: 'Supliment lichid: 10 ml, de 2 ori pe zi. Ingrediente naturale.' }) },
  { id: '10B-ilie-romania', html: madeAd() },
];
