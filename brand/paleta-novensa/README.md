Novensa vinde suplimente naturale lichide, fabricate în România, pentru oameni care vor să aibă încredere în ce iau: părinți, adulți de 40+ și seniori. Identitatea trebuie să arate ca o farmacie naturistă de calitate, liniștită și sigură pe ea, nu ca un magazin de reduceri.

## Cum sună Novensa

- Scrie în română, cu diacritice corecte (ă, â, î, ș, ț cu virgulă dedesubt, nu cu sedilă). Un text fără diacritice nu se publică.
- Te adresezi cu „tu” în reclame și pe site („Comandă acum”, „Alege pachetul tău”). În răspunsurile la întrebări și în textele legale e acceptat și „dumneavoastră”, dar nu amesteca în aceeași pagină.
- Titlurile se scriu ca propoziții, cu majusculă doar la început și la nume proprii: „De ce aleg părinții NovoKids”, nu „De Ce Aleg Părinții NovoKids”.
- Spune concret ce face produsul și cum se folosește, în propoziții scurte: „O linguriță seara, înainte de poveste.” Evită superlativele goale („cel mai bun”, „miraculos”).
- Suplimentele nu tratează boli. Folosește formulări aprobate: „susține”, „contribuie la”, „ajută la relaxare”. Nu scrie „vindecă”, „tratează”, „elimină boala” și nu pomeni afecțiuni (ADHD, diabet, cancer).
- Prețurile se scriu cu virgulă și „lei”: „66,99 lei”. Reducerea: „−44%” (cu semnul minus, nu cratimă).
- Fără emoji pe site. În reclame se pot folosi cu măsură (unul-două pe text).

Exemple bune:
> Nopți liniștite pentru toată familia.
> Un sirop natural cu tei, floarea pasiunii și miere. Fără coloranți artificiali, fără conservanți.
> Plătești la livrare. Transport gratuit la 3 produse.

## Culori

- Fundalul paginii e `surface`; cardurile și caseta de comandă stau pe `surface-raised`; poza de produs și secțiunile alternante stau pe `surface-tint`.
- Tot textul e `ink`; textul secundar și mențiunile legale sunt `muted`.
- `brand` (verdele-pădure) e culoarea Novensa: butonul principal (`on-brand` pe `brand`), linkurile, prețul final, banda din antet. Pe o pagină există un singur buton plin `brand` vizibil deodată.
- `leaf` vine din frunza logo-ului și se folosește pentru bife, iconițe și insigna „100% natural”. Nu scrie text mic cu `leaf` pe fundal luminos.
- `gold` e accentul premium: linii fine, stele, ornamente, un cuvânt mare în italic dintr-un titlu. Pentru etichete mici aurii folosește `gold-text`.
- `offer` (roșu) e rezervat ofertei: procentul de reducere, prețul vechi tăiat, „stoc limitat”. Nu colora butoane sau titluri cu el.
- Proporția pe o pagină: aproximativ 70% suprafețe (`surface`, `surface-raised`, `surface-tint`), 20% `ink` și `brand`, sub 10% `leaf`, `gold` și `offer` la un loc.
- Fiecare produs își păstrează culorile ambalajului în pozele lui (Prosta Complex negru cu auriu, NovoKids albastru-noapte cu verde, Cardio Balance roșu). Interfața din jurul pozei rămâne mereu în culorile Novensa, ca toate produsele să pară ale aceleiași familii.

## Tipografie

- Două familii, ambele de pe Google Fonts, ambele cu diacritice românești complete:
  - `display` = **Newsreader**, un serif editorial care continuă literele cu serife din logo. Se folosește doar pentru titluri (`display`, `h1`, `h2`, `accent`).
  - `sans` = **Plus Jakarta Sans**, același font ca în reamenajarea site-ului. Se folosește pentru tot restul: texte, butoane, prețuri, etichete.
- Încărcare: `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,500&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap`
- Pe pagina de produs: numele produsului în `h1`, descrierea scurtă în `body-lg`, prețul în `price`, butonul în `button`, titlurile de secțiune în `h2`, titlurile cardurilor în `h3`, textul în `body`, mențiunile legale în `small`.
- Un titlu poate avea o parte în `accent` (italic, în `brand` sau `gold`): „Somn liniștit *pentru cei mici*”. Maximum o dată pe secțiune.
- Textul de bază nu scade sub 16px pe mobil (publicul include seniori). Rândurile de text nu depășesc ~65 de caractere.
- Prețurile și cantitățile folosesc cifre tabulare (`font-variant-numeric: tabular-nums`).
- Pe imagini și reclame, unde trebuie să se vadă de departe, titlurile pot folosi Plus Jakarta Sans 800 în loc de Newsreader.

## Spațiere, forme și umbre

- Spațierea urmează pașii `space-1` … `space-16`. Între secțiuni: `space-16` pe desktop, `space-12` pe mobil. În carduri: `space-6`. Marginea laterală pe mobil: `space-4`.
- Colțurile: `radius-sm` pentru câmpuri și chip-uri, `radius-md` pentru butoane și carduri, `radius-lg` pentru poza de produs și blocurile mari, `radius-pill` pentru insigne.
- O singură umbră, `shadow-card`, pentru cardurile de produs și caseta de preț. Restul elementelor se despart prin `surface-tint` sau prin `line`, nu prin umbre.
- Starea de focus (tastatură): un contur plin de 2px în `brand`, la 2px distanță de element, vizibil pe toate suprafețele.

## Imagini

- Produsul apare mereu cu ambalajul real, decupat curat, pe `surface-tint` sau într-o scenă reală. Nu se redesenează și nu se aproximează eticheta.
- Pozele cu oameni arată familii românești reale, în case românești obișnuite, în lumină naturală. Fără modele de stoc evident străine.
- Imaginile de produs pentru Shopify sunt pătrate, 2000×2000 px.

## Iconografie

- Iconițe liniare, cu grosimea liniei de 1,75px, în `leaf` sau `brand`, la 20–24px. Bifele din liste sunt în `leaf`, pe un cerc `surface-tint`.
- Pe site nu se folosesc emoji în locul iconițelor.
