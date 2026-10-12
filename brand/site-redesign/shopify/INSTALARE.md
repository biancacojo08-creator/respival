# Cum instalezi pagina premium pe Shopify (fără să descarci tema)

1. **Fă o copie a temei** (siguranță): Online Store → Themes → la tema activă apasă **…** → **Duplicate**. Lucrează pe copie.
2. Pe copie: **…** → **Edit code**.
3. În stânga, la folderul **Sections**, apasă **Add a new section** → scrie `novensa-premium-home` → **Done**.
4. Șterge tot ce e în fișierul nou și **lipește tot conținutul** din `novensa-premium-home.liquid` → **Save**.
5. Mergi la **Customize** (pe copie) → pagina **Home page** → **Add section** → alege **Novensa – Pagina premium**.
6. Ascunde sau șterge secțiunile vechi de pe pagina principală (banner verde, grila veche, Dr. Bacey etc.).
7. În setările secțiunii noi alege:
   - **Colecția afișată** (ex. „Toate produsele” sau o colecție „Bestsellers”);
   - **Produs vedetă**: Diabexum Forte;
   - **Pozele din hero**: 3 poze PNG cu produse fără fundal (le ai în repo în `brand/site-redesign/img/`).
8. Previzualizează, apoi **Publish** pe copie când îți place.

Opțional (nume scurte pe carduri): în Settings → Custom data → Products adaugă metafield-urile
`custom.nume_scurt` (ex. „Cardio Balance”) și `custom.descriere_scurta` (ex. „Capsule pentru susținerea sistemului cardiovascular.”). Dacă nu le completezi, cardul folosește titlul produsului.
