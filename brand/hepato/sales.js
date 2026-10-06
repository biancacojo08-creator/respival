// Set 2: 10 reclame cu hook puternic, orientate spre vânzare (S01–S10). 1080x1080 @2x.
// Folosește aceleași fonturi, culori și cutie ca ads.js.
const { C, box, logo, foot, disc, page, priceTag } = require('./ads.js').lib;

// buton CTA comun
const cta = (x, y, bg = C.orange, fg = '#fff', t = 'COMANDĂ ACUM →') =>
  `<div class="abs" style="left:${x}px;top:${y}px;background:${bg};color:${fg};font:900 34px Archivo;letter-spacing:1px;padding:22px 40px;border-radius:16px;box-shadow:0 10px 0 rgba(0,0,0,.18)">${t}</div>`;
const sub = (x, y, w, t, c = C.ink) => `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;font:600 31px/1.32 Inter;color:${c}">${t}</div>`;

const ads = [];

// S01 – 4 cuvinte. Oboseala reîncadrată.
ads.push({ id: 'S01-nu-e-lene', html: page(`body{background:${C.honey}}`,
  `${logo(64, 60)}
  <div class="abs h" style="left:64px;top:150px;font-size:170px;color:${C.forest};letter-spacing:-7px">Nu e<br>lene.</div>
  <div class="abs it" style="left:64px;top:510px;font-size:100px;color:${C.orange}">E ficatul.</div>
  ${sub(64, 680, 520, 'Oboseala de după-amiază, burta grea, pofta de dulce. Dă-i ficatului <b>5 plante</b> și 30 de zile.')}
  ${cta(64, 860, C.forest)}
  ${box(700, 650, 220, 4)}
  ${disc()}${foot(C.forest, '#fff')}`) });

// S02 – curiozitate: 3 semne, 1 organ.
ads.push({ id: 'S02-3-semne', html: page(`body{background:${C.paper}}
  .sg{display:flex;align-items:center;gap:22px;font:800 46px Archivo;color:${C.forest};letter-spacing:-1px}
  .sg b{width:74px;height:74px;border-radius:50%;background:${C.orange};color:#fff;display:flex;align-items:center;justify-content:center;font:900 38px Archivo}`,
  `${logo(64, 60)}
  <div class="abs h" style="left:64px;top:140px;width:640px;font-size:66px;color:${C.forest}">3 semne pe care<br>le ignori zilnic.<br><span class="it" style="color:${C.orange}">Același vinovat.</span></div>
  <div class="abs" style="left:64px;top:430px;display:flex;flex-direction:column;gap:26px">
    <div class="sg"><b>1</b>Pofta de dulce</div><div class="sg"><b>2</b>Balonarea</div><div class="sg"><b>3</b>Oboseala</div></div>
  ${sub(64, 740, 540, 'Toate trec prin ficat. Susține-l cu <b>Hepato Nova Detox</b>.')}
  ${cta(64, 860)}
  ${box(700, 660, 210, 3)}
  ${disc()}${foot(C.forest, '#fff')}`) });

// S03 – "am încercat tot". Femei 30–55.
ads.push({ id: 'S03-am-incercat-tot', html: page(`body{background:${C.blush}}
  .t{font:700 44px/1.5 Inter;color:#6b5a52}.t s{text-decoration-thickness:4px;text-decoration-color:${C.orange}}`,
  `${logo(64, 60)}
  <div class="abs t" style="left:64px;top:140px"><s>Dieta keto</s><br><s>Sală 3 zile pe săptămână</s><br><s>Apă cu lămâie dimineața</s><br><s>Fără pâine</s></div>
  <div class="abs h" style="left:64px;top:470px;width:600px;font-size:62px;color:${C.forest}">…și burta tot acolo?<br><span class="it" style="color:${C.orange}">Ai uitat de ficat.</span></div>
  ${sub(64, 690, 530, '5 plante care susțin ficatul și digestia, o cană de 1–2 ori pe zi.')}
  ${cta(64, 860, C.forest)}
  ${box(700, 650, 220, 4)}
  ${disc('Supliment alimentar. Nu înlocuiește dieta și mișcarea.')}${foot(C.forest, '#fff')}`) });

// S04 – fricțiune: ficatul nu doare.
ads.push({ id: 'S04-nu-doare', html: page(`body{background:${C.night};color:#fff}
  .glow{position:absolute;right:-160px;top:200px;width:820px;height:820px;border-radius:50%;background:radial-gradient(circle,rgba(226,106,33,.4),rgba(226,106,33,0) 65%)}`,
  `<div class="glow"></div>${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="abs h" style="left:64px;top:160px;width:640px;font-size:96px">Ficatul<br><span class="it" style="color:${C.orange}">nu doare.</span></div>
  <div class="abs h" style="left:64px;top:380px;width:600px;font-size:54px;color:#E8E4DA">De aceea îl ignori<br>20 de ani.</div>
  ${sub(64, 560, 540, 'Nu aștepta să-ți dea semne. Începe azi o cură de 30 de zile cu 5 plante pentru ficat.', '#E8E4DA')}
  ${cta(64, 800)}
  ${box(700, 650, 210, 3)}
  ${disc('Supliment alimentar, nu tratament. Pentru diagnostic, consultă medicul.', '#fff')}${foot(C.honey, C.night)}`) });

// S05 – provocarea de 30 de zile (calendar).
const days = Array.from({ length: 30 }, (_, i) => `<div class="d${i < 1 ? ' on' : ''}">${i < 1 ? '✓' : i + 1}</div>`).join('');
ads.push({ id: 'S05-provocarea-30', html: page(`body{background:${C.sage}}
  .cal{position:absolute;left:64px;top:390px;display:grid;grid-template-columns:repeat(6,82px);gap:12px}
  .cal div{height:70px;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;font:700 26px Inter;color:${C.forest}}
  .cal .on{background:${C.orange};color:#fff;font:900 34px Inter}`,
  `${logo(64, 60)}
  <div class="abs" style="left:64px;top:140px;font:800 28px Inter;letter-spacing:4px;color:${C.orange}">PROVOCAREA</div>
  <div class="abs h" style="left:64px;top:185px;width:620px;font-size:84px;color:${C.forest}">30 de zile.<br><span class="it" style="color:${C.orange}">O cană pe zi.</span></div>
  <div class="cal">${days}</div>
  ${cta(64, 880, C.forest, '#fff', 'ÎNCEPE AZI →')}
  ${box(700, 680, 200, 4)}
  ${disc()}${foot(C.forest, '#fff')}`) });

// S06 – balonare, imagine mentală concretă.
ads.push({ id: 'S06-nasturele', html: page(`body{background:${C.cream}}
  .btn{position:absolute;left:64px;top:150px;width:150px;height:150px;border-radius:50%;background:#3F5A7A;box-shadow:inset 0 -10px 0 rgba(0,0,0,.25)}
  .btn i{position:absolute;width:20px;height:20px;border-radius:50%;background:${C.cream}}`,
  `${logo(64, 60)}
  <div class="btn"><i style="left:44px;top:44px"></i><i style="left:86px;top:44px"></i><i style="left:44px;top:86px"></i><i style="left:86px;top:86px"></i></div>
  <div class="abs h" style="left:64px;top:340px;width:600px;font-size:66px;color:${C.forest}">Nasturele<br>de la blugi<br><span class="it" style="color:${C.orange}">știe primul.</span></div>
  ${sub(64, 600, 530, 'Burta umflată după prânz nu e normală, doar e obișnuită. <b>Anghinarea și păpădia</b> susțin digestia, cu o cană după masă.')}
  ${cta(64, 860)}
  ${box(700, 650, 220, 4)}
  ${disc()}${foot(C.forest, '#fff')}`) });

// S07 – înainte de încă o dietă (eticheta).
ads.push({ id: 'S07-inainte-de-dieta', html: page(`body{background:${C.forest};color:#fff}
  .lab{position:absolute;left:64px;top:430px;width:560px;background:${C.paper};color:${C.ink};border-radius:24px;padding:34px 38px;font:600 27px/1.55 Inter}
  .lab b{font:900 30px Archivo;color:${C.forest};display:block;margin-bottom:8px;letter-spacing:.5px}
  .lab span{float:right;color:${C.orange};font-weight:800}`,
  `${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="abs h" style="left:64px;top:150px;width:640px;font-size:80px">Înainte de<br>încă o dietă,<br><span class="it" style="color:${C.honey}">citește asta.</span></div>
  <div class="lab"><b>INGREDIENTE / PLIC</b>Anghinare<span>20%</span><br>Armurariu<span>20%</span><br>Păpădie<span>20%</span><br>Gălbenele<span>20%</span><br>Sunătoare<span>20%</span></div>
  ${cta(64, 870, C.honey, C.forest)}
  ${box(680, 660, 230, 3)}
  ${disc('Fără arome artificiale · fără coloranți. Supliment alimentar.', '#fff')}${foot(C.honey, C.forest)}`) });

// S08 – decembrie în cifre (sezonier, de rulat din noiembrie).
ads.push({ id: 'S08-decembrie-in-cifre', html: page(`body{background:#7A1E22;color:#fff}
  .n{display:flex;align-items:baseline;gap:20px;font:600 34px Inter;color:#F4D9C9}
  .n b{font:900 78px Archivo;color:#fff;letter-spacing:-2px;min-width:200px}`,
  `${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="abs it" style="left:64px;top:135px;font-size:76px;color:${C.honey}">Decembrie, în cifre:</div>
  <div class="abs" style="left:64px;top:260px;display:flex;flex-direction:column;gap:6px">
    <div class="n"><b>40+</b>sarmale</div><div class="n"><b>3</b>cozonaci</div><div class="n"><b>12</b>mese în familie</div><div class="n"><b>1</b>singur ficat</div></div>
  <div class="abs h" style="left:64px;top:690px;width:580px;font-size:48px">Pregătește-l <span class="it" style="color:${C.honey}">din timp.</span></div>
  ${cta(64, 840, C.honey, '#7A1E22')}
  ${box(700, 650, 210, -3)}
  ${disc('Supliment alimentar. Rezultatele pot varia.', '#fff')}${foot(C.honey, '#7A1E22')}`) });

// S09 – fără risc: cum comanzi (reduce frica de a cumpăra online).
ads.push({ id: 'S09-60-secunde', html: page(`body{background:${C.paper}}
  .st{display:flex;align-items:center;gap:24px;font:700 34px/1.25 Inter;color:${C.ink}}
  .st b{flex:none;width:84px;height:84px;border-radius:22px;background:${C.forest};color:#fff;display:flex;align-items:center;justify-content:center;font:900 44px Archivo}`,
  `${logo(64, 60)}
  <div class="abs h" style="left:64px;top:140px;width:640px;font-size:70px;color:${C.forest}">Comanzi în<br>60 de secunde.<br><span class="it" style="color:${C.orange}">Plătești la ușă.</span></div>
  <div class="abs" style="left:64px;top:480px;display:flex;flex-direction:column;gap:28px;width:560px">
    <div class="st"><b>1</b>Lași numele și adresa</div>
    <div class="st"><b>2</b>Curierul îți aduce coletul</div>
    <div class="st"><b>3</b>Plătești doar când îl primești</div></div>
  ${cta(64, 860)}
  ${box(700, 660, 210, 3)}
  <div class="burst" style="width:200px;height:200px;left:850px;top:80px;background:${C.honey};font:900 26px/1.05 Archivo;color:${C.forest}">FĂRĂ<br>CARD</div>
  ${disc()}${foot(C.forest, '#fff')}`) });

// S10 – reorder / retargeting cumpărători: nu întrerupe cura.
ads.push({ id: 'S10-ziua-27', html: page(`body{background:${C.orange};color:#fff}
  .bar{position:absolute;left:64px;top:560px;width:560px;height:34px;border-radius:17px;background:rgba(255,255,255,.3)}
  .bar i{display:block;height:100%;width:90%;border-radius:17px;background:#fff}`,
  `${logo(64, 60, 44, 'filter:brightness(0) invert(1)')}
  <div class="abs" style="left:64px;top:150px;font:900 150px/1 Archivo;letter-spacing:-6px">27/30</div>
  <div class="abs h" style="left:64px;top:320px;width:620px;font-size:70px">Mai ai 3 plicuri.<br><span class="it" style="color:${C.forest}">Nu te opri acum.</span></div>
  <div class="bar"><i></i></div>
  ${sub(64, 630, 540, 'Cura recomandată pe cutie e de <b>3 luni</b>. Comandă următoarea cutie acum, ca s-o ai la timp.', '#fff')}
  ${cta(64, 850, C.forest, '#fff', 'CONTINUĂ CURA →')}
  ${box(700, 650, 220, 4)}
  ${disc('Supliment alimentar. Rezultatele pot varia.', '#fff')}${foot(C.forest, '#fff', ['Livrare rapidă', 'Plata la livrare', 'Fabricat în România'])}`) });

module.exports = ads;
