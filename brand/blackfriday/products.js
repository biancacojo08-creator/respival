// Produsele Novensa pentru Black Friday 2026 (9–16 noiembrie).
// Cadoul = tichete răzuibile, toate câștigătoare: „+ tichet răzuibil” / „+ 2 tichete răzuibile”.
// La PROSTA COMPLEX se afișează prețurile din BLACK-FRIDAY.md. La celelalte, fără prețuri
// (ca în seriile 1+1 de până acum): oferta e 1 buc. / 1+1 GRATUIT / 2+2 GRATUIT.
const noPrice = (one, many) => [
  { title: `1 ${one}`, big: '1', sub: 'Transport gratuit', n: 1, gifts: 0 },
  { title: '1+1 gratuit', big: '1+1', sub: `2 ${many} · plătești 1`, n: 2, gifts: 1 },
  { title: '2+2 gratuit', big: '2+2', sub: `4 ${many} · plătești 2`, n: 4, gifts: 2, best: true },
];

module.exports = [
  {
    key: 'prosta', name: 'PROSTA COMPLEX', img: 'prosta.png', ar: 542 / 1190, k: 1,
    one: 'cutie', many: 'cutii',
    packs: [
      { title: '1 cutie', price: '66,99', sub: 'Transport gratuit', per: '66,99', n: 1, gifts: 0 },
      { title: '2 cutii', price: '119', was: '133,98', per: '59,50', n: 2, gifts: 1 },
      { title: '3 cutii', price: '169', was: '190', per: '56,33', n: 3, gifts: 2, best: true, extra: 'cura completă · 15 zile' },
      { title: '6 cutii', price: '299', was: '380', per: '49,83', n: 6, gifts: 3 },
    ],
    hook: ['Nopți liniștite.', 'Fără grija toaletei.'],
    checks: ['Susține sănătatea prostatei', 'Susține funcția urinară', 'Supliment lichid, fabricat în România'],
    gift: ['Cadoul pe care tata n-o să-l ceară.', 'Dar o să-l folosească.'],
    giftBody: 'Îl trimiți direct la părinți, iar ei plătesc la livrare.', card: 'Pentru tata ♥',
    disc: 'Supliment alimentar. Rezultatele pot varia.',
  },
  {
    key: 'cardio', name: 'CARDIO BALANCE', img: 'cardio.png', ar: 1552 / 3048, k: .9,
    one: 'borcan', many: 'borcane', packs: noPrice('borcan', 'borcane'),
    hook: ['Grijă pentru inimă,', 'în fiecare zi.'],
    checks: ['Usturoi, păducel și vâsc', 'Susține sănătatea inimii și a vaselor de sânge', '60 de capsule în fiecare borcan'],
    gift: ['Pentru inima mamei.', 'Și a tatei.'],
    giftBody: 'Cu 1+1 gratuit, fiecare are borcanul lui. Plata la livrare.', card: 'Pentru mama ♥',
    disc: 'Supliment alimentar. Nu înlocuiește tratamentul medical.',
  },
  {
    key: 'diabexum', name: 'DIABEXUM FORTE', img: 'diabexum.png', ar: 853 / 1475, k: .86,
    one: 'flacon', many: 'flacoane', packs: noPrice('flacon', 'flacoane'),
    hook: ['Pofta de dulce', 'nu mai decide pentru tine.'],
    checks: ['Susține nivelul normal al glicemiei', 'Susține nivelul normal al colesterolului', 'Ingrediente naturale'],
    gift: ['Un cadou de grijă', 'pentru cei dragi.'],
    giftBody: 'Îl trimiți direct la părinți, iar ei plătesc la livrare.', card: 'Pentru mama ♥',
    disc: 'Supliment alimentar. Nu înlocuiește tratamentul medical.',
  },
  {
    key: 'powerman', name: 'POWERMAN', img: 'powerman.png', ar: 364 / 911, k: 1,
    one: 'flacon', many: 'flacoane', packs: noPrice('flacon', 'flacoane'),
    hook: ['Energie și vitalitate,', 'fără încă o pastilă.'],
    checks: ['7 extracte din plante', 'Spray oral, ușor de folosit', 'Colet discret, plata la livrare'],
    gift: ['Unul pentru tine.', 'Unul pentru un prieten.'],
    giftBody: 'Cu 1+1 gratuit, al doilea flacon e din partea noastră.', card: 'Pentru un prieten',
    disc: 'Supliment alimentar. Rezultatele pot varia.',
  },
  {
    key: 'hepato', name: 'HEPATO NOVA DETOX', img: 'hepato.png', ar: 1629 / 2598, k: .8,
    one: 'cutie', many: 'cutii', packs: noPrice('cutie', 'cutii'),
    hook: ['O cană pe zi', 'pentru ficatul tău.'],
    checks: ['5 plante: anghinare, armurariu, păpădie, gălbenele, sunătoare', 'Susține funcția hepatică și digestia', '30 de plicuri = 30 de zile'],
    gift: ['Înainte de mesele de sărbători,', 'un ceai care chiar ajută.'],
    giftBody: 'Ceai cu 5 plante, livrat acasă. Plătești la livrare.', card: 'Pentru tine ♥',
    disc: 'Supliment alimentar. Rezultatele pot varia.',
  },
  {
    key: 'novokids', name: 'NOVOKIDS SOMN LINIȘTIT', img: 'novokids.png', ar: 566 / 1243, k: 1,
    one: 'cutie', many: 'cutii', packs: noPrice('cutie', 'cutii'),
    hook: ['Seri liniștite', 'pentru cei mici.'],
    checks: ['Tei, floarea pasiunii și miere', 'Gust plăcut de miere', 'O linguriță seara, apoi povestea'],
    gift: ['Seri mai liniștite', 'pentru toată familia.'],
    giftBody: 'Un cadou util pentru părinții cu copii mici. Plata la livrare.', card: 'Pentru cei mici ♥',
    disc: 'Supliment alimentar. Nu se administrează sub 1 an.',
  },
  {
    // Prețuri de pe site (novensa-romania.ro, 12.10.2026): 1 flacon = 67,99 lei. Pachetele 2 / 3 sunt propunerea BF
    // (prețul tăiat = 2 × 67,99 și 3 × 67,99, adică prețul actual, conform regulii celor 30 de zile).
    key: 'respival', name: 'RESPIVAL', img: 'respival.png', ar: 372 / 932, k: 1,
    one: 'flacon', many: 'flacoane',
    packs: [
      { title: '1 flacon', price: '67,99', sub: 'Transport gratuit', per: '67,99', n: 1, gifts: 0 },
      { title: '2 flacoane', price: '119', was: '135,98', per: '59,50', n: 2, gifts: 1 },
      { title: '3 flacoane', price: '169', was: '203,97', per: '56,33', n: 3, gifts: 2, best: true, extra: 'pentru toată familia' },
    ],
    hook: ['Iarna vine.', 'Gâtul tău e pregătit?'],
    checks: ['Propolis, nalbă, salvie, mușețel, eucalipt, ghimbir și alte plante', 'Spray oral pentru gât, 1–2 pufuri', 'Peste 600 de recenzii pe site'],
    gift: ['Câte un spray pentru fiecare', 'din familie.'],
    giftBody: 'Iarna vine cu răceli. Trimite-le părinților un spray cu plante, plătesc la livrare.', card: 'Pentru mama ♥',
    disc: 'Supliment alimentar. Rezultatele pot varia.',
  },
];
