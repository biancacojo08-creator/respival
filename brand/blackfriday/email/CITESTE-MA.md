# Email Black Friday Novensa

- `black-friday-email.jpg`: emailul întreg, o singură imagine lungă (600 px lățime în email, randată la 1200 px pentru ecrane retina).
- `bucati/01.jpg` … `07.jpg`: același email tăiat pe secțiuni. Folosește-le dacă vrei să pui un link separat pe fiecare bucată sau dacă programul de email nu acceptă imagini foarte lungi.
- Randare din nou: `node email.js` (textele sunt în `email.js`).

## Subiect (alege unul)
1. 🖤 Black Friday Novensa a început: reduceri mari + transport gratuit
2. Doar câteva zile: reduceri mari la toate produsele Novensa
3. Un tichet răzuibil câștigător în fiecare colet 🎁
4. Black Friday: transport gratuit chiar și la o singură bucată

**Preheader** (textul gri de după subiect): Pachete de 2, 3 și 5 bucăți la reducere mare. Plata la livrare.

## Text de pus deasupra imaginii
> Bună ziua,
>
> A început Black Friday la Novensa! Pentru câteva zile ai reduceri mari la toate produsele, transport gratuit la orice comandă și un tichet răzuibil câștigător în fiecare colet.
>
> 👉 Vezi ofertele: https://novensa-romania.ro

## Cum îl lipești gratuit

**Gmail (cel mai simplu):**
1. Deschide `black-friday-email.jpg` în browser, click dreapta → *Copiază imaginea*.
2. În Gmail → *Scrie*, lipește textul de mai sus, apoi imaginea (Ctrl+V / Cmd+V).
3. Click pe imagine → selecteaz-o → Ctrl+K (Cmd+K) → pune linkul `https://novensa-romania.ro`. Așa toată imaginea devine clicabilă.
4. Trimite către tine întâi, ca să vezi cum arată pe telefon.
5. Pentru mai mulți destinatari pune adresele la **BCC**, nu la „Către”, ca să nu se vadă între ei. Gmail are limită de aproximativ 500 de destinatari pe zi.

**Shopify Email / Brevo / Mailchimp (gratuite până la o limită):** adaugă un bloc *Imagine* pentru fiecare fișier din `bucati/`, în ordine, fără spațiu între ele, și pune linkul site-ului pe fiecare. Adaugă și textul de mai sus într-un bloc *Text*. Emailurile făcute doar din imagini ajung mai des la spam.

Trimite doar celor care au acceptat să primească emailuri de la tine (GDPR). Platformele de email adaugă automat linkul de dezabonare, în Gmail trebuie să-l scrii tu („Dacă nu mai vrei emailuri, răspunde cu STOP”).
