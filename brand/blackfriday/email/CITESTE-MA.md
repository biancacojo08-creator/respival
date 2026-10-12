# Email de anunț: urmează Black Friday la Novensa

- `black-friday-email.jpg`: emailul întreg, o singură imagine lungă (600 px lățime în email, randată la 1200 px pentru ecrane retina).
- `bucati/01.jpg` … `07.jpg`: același email tăiat pe secțiuni. Folosește-le dacă vrei să pui un link separat pe fiecare bucată sau dacă programul de email nu acceptă imagini foarte lungi.
- Randare din nou: `node email.js` (textele sunt în `email.js`).

## Subiect (alege unul)
1. 🖤 Urmează Black Friday la Novensa
2. Pregătește-te: reduceri mari la toate produsele Novensa, în curând
3. În curând: un tichet răzuibil câștigător în fiecare colet 🎁
4. Black Friday vine. Transport gratuit chiar și la o singură bucată

**Preheader** (textul gri de după subiect): Pachete de 2, 3 și 5 bucăți la reducere mare. Te anunțăm când începe.

## Text de pus deasupra imaginii
> Bună ziua,
>
> Urmează Black Friday la Novensa! Pentru câteva zile vei avea reduceri mari la toate produsele, transport gratuit la orice comandă și un tichet răzuibil câștigător în fiecare colet. Te anunțăm în ziua în care începe.
>
> 👉 Până atunci, vezi produsele: https://novensa-romania.ro

## Cum îl lipești gratuit

**Gmail (cel mai simplu):**
1. Deschide `black-friday-email.jpg` în browser, click dreapta → *Copiază imaginea*.
2. În Gmail → *Scrie*, lipește textul de mai sus, apoi imaginea (Ctrl+V / Cmd+V).
3. Click pe imagine → selecteaz-o → Ctrl+K (Cmd+K) → pune linkul `https://novensa-romania.ro`. Așa toată imaginea devine clicabilă.
4. Trimite către tine întâi, ca să vezi cum arată pe telefon.
5. Pentru mai mulți destinatari pune adresele la **BCC**, nu la „Către”, ca să nu se vadă între ei. Gmail are limită de aproximativ 500 de destinatari pe zi.

**Shopify Email / Brevo / Mailchimp (gratuite până la o limită):** adaugă un bloc *Imagine* pentru fiecare fișier din `bucati/`, în ordine, fără spațiu între ele, și pune linkul site-ului pe fiecare. Adaugă și textul de mai sus într-un bloc *Text*. Emailurile făcute doar din imagini ajung mai des la spam.

Trimite doar celor care au acceptat să primească emailuri de la tine (GDPR). Platformele de email adaugă automat linkul de dezabonare, în Gmail trebuie să-l scrii tu („Dacă nu mai vrei emailuri, răspunde cu STOP”).
