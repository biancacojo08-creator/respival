# Targetare Meta pe personaje + unghiul câștigător

Toate seturile de reclame: **România** (cu excepția personajului Ioana), obiectiv **Vânzări**, plasări Advantage+, cu excepția celor menționate. Vârstele sunt cele ale **celui care vede reclama**, nu neapărat ale utilizatorului produsului.

> Meta nu permite targetare după afecțiuni de sănătate (nu mai există interese de tip „prostată”, „urologie”). Targetăm după **vârstă, gen, ocupație, stil de viață, comportament**; algoritmul găsește restul din creative. De aceea creative-ul e targetarea: personajul trebuie să fie recunoscut instant de publicul lui.

| # | Personaj | Reclama A | Reclama B | ⭐ Câștigătoare | Targetare |
|---|---|---|---|---|---|
| 1 | **Nea Costică**, 64, apicultor | `01A` „Am încredere în ce-mi dă natura” | `01B` ingredientele în jurul cutiei | **01B**: publicul rural recunoaște plantele, iar concretul bate abstractul | Bărbați 55–75 · interese: apicultură, grădinărit, agricultură, plante medicinale, remedii naturiste · rural și orașe mici (fără București, Cluj, Timiș) · Facebook Feed |
| 2 | **Petre**, 58, taximetrist | `02A` „12 ore pe zi la volan…” | `02B` harta cu toaletele tăiate | **02A**: specific și credibil, își recunoaște ziua | Bărbați 45–65 · București + Ilfov, Cluj, Iași, Timiș, Constanța, Brașov (raza 25 km) · interese: Uber, Bolt, taxi, șofer profesionist · Feed + Reels |
| 3 | **Mariana**, 61, soția | `03A` biletul de pe masă „Acum dormim amândoi” | `03B` „nu doarme nici ea” + ceasul 03:17 | **03A**: e un cadou, nu un reproș; format nativ, iar ea e eroina | **Femei 50–70** · interese: gătit, rețete, seriale românești, credință, nepoți · căsătorite · toată țara · Facebook Feed |
| 4 | **Ioana**, 36, fiica din diaspora | `04A` conversație pe WhatsApp cu tata | `04B` „Tata n-o să-ți spună” + traseul Torino → Acasă | **04A**: conversația e trăită de toți cei plecați, iar formatul nu arată a reclamă | **Femei + bărbați 28–45** · **Italia, Spania, Germania, UK, Franța, Austria, Belgia** · limba: română · comportament: „Locuiește în afara țării natale” · ⚠️ livrare doar în RO, spus clar în text |
| 5 | **Domnul Vasile**, 70, profesorul sceptic | `05A` eticheta + lupa | `05B` pastile tăiate vs. picături | **05A**: scepticii vor dovezi, iar eticheta e dovada | Bărbați 60–75 · studii universitare · interese: istorie, știri, cărți, șah, cuvinte încrucișate · orașe mari + reședințe de județ · Feed |
| 6 | **Nea Fănică**, 67, pescar | `06A` pescuit în zori | `06B` „Mai mult timp cu nepoții” (siluete pe ponton) | **06A**: scenă foarte specifică, pescarii se recunosc pe loc | Bărbați 55–75 · interese: pescuit sportiv, Delta Dunării, bărci · toată țara · Feed + Reels |
| 7 | **Dorin**, 52, șofer de TIR | `07A` „Pe autostradă în Germania nu oprești când vrei” | `07B` „Kilometri, nu opriri” + kilometraj | **07A**: durere concretă, o nișă care se recunoaște imediat | Bărbați 40–62 · interese: transport internațional, camioane, Scania, Volvo Trucks, DAF · **RO + DE, IT, FR, BE, NL** · ⚠️ livrare la adresa din RO |
| 8 | **Domnul Aurel**, 62, discretul | `08A` „Îmi era jenă să întreb pe cineva” | `08B` coletul discret | **08A**: emoția vinde, iar logistica e doar un detaliu | Bărbați 50–70 · interese: afaceri, știri, tenis, mașini premium · orașe mari · Feed |
| 9 | **Gelu și Mariana**, cuplu | `09A` „Prima noapte întreagă de dormit” | `09B` Înainte 03:17 / Acum 07:30 | **09B**: contrastul se înțelege în 1 secundă, fără să citești | Bărbați + femei 55–72 · Advantage+ audience (publicul larg, de scalare) |
| 10 | **Nea Ilie**, 66, tâmplar | `10A` „Nu vreau să stau pe pastile” | `10B` „Făcut în România. Ca lucrurile bune de altădată.” | **10A**: cea mai puternică obiecție a categoriei, întoarsă în favoarea produsului | Bărbați 55–75 · interese: tâmplărie, bricolaj, Dedeman, meșteșuguri, tradiții · rural + orașe mici, accent pe Maramureș, Bucovina, Ardeal · Feed |

Imaginile sunt în `brand/ads/png/` (1080×1080).

## Cum testăm

1. **Faza 1 (zilele 1–5):** 10 seturi de reclame (câte unul pe personaj), cu ambele reclame A și B în fiecare set. Buget: 30–50 lei/zi pe set. Metrică principală: **cost pe achiziție**; secundare: CTR peste 1,2%, cost/clic.
2. **Faza 2 (ziua 6+):** opriți seturile cu cost pe achiziție peste 1,5× media. Câștigătorii primesc buget +20% la 48 h.
3. **Faza 3:** reclamele câștigătoare se mută într-o campanie Advantage+ Shopping (publicul 9, larg) pentru scalare.
4. **Retargeting** (vizitatori și add-to-cart, 14 zile): reclamă de ofertă (−35%, 64,99 lei) + recenzie reală de pe site.

## Text principal (primary text) pentru reclame

**Petre (2):** 12 ore pe zi la volan, în trafic. Când trebuie să oprești la fiecare oră, ziua devine un calvar. PROSTA COMPLEX de la Novensa: Serenoa repens (palmier pitic), urzică și dovleac, plus zinc, seleniu și vitamina E, pentru sănătatea prostatei și funcția urinară. 100% natural · fabricat în România · plata la livrare. 👉 Acum 64,99 lei în loc de 99,99 lei.

**Mariana (3):** Când el se ridică de 4 ori pe noapte, nu se odihnește niciunul dintre voi. Fă-i un cadou care contează pentru amândoi: PROSTA COMPLEX de la Novensa, supliment lichid pentru sănătatea prostatei. Natural, fabricat în România, livrat acasă, plătești la primire.

**Ioana (4):** E greu să fii departe și să-l auzi pe tata obosit la telefon. Comanzi tu, noi livrăm la părinții tăi în România, iar ei plătesc la livrare (sau plătești tu online). PROSTA COMPLEX: supliment lichid pentru sănătatea prostatei, fabricat în România.

**Vasile (5):** Nu cumpăra pe încredere, citește eticheta. Extract de Serenoa repens, urzică, dovleac, plus zinc, seleniu și vitamina E. 30 de picături în puțină apă, nu încă o capsulă. Fabricat în România.

*Rezultatele pot varia. Suplimentul alimentar nu înlocuiește o dietă variată și nici consultul medical.*
