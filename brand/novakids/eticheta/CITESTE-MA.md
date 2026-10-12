# NovaKids Multivitamin Elite+: eticheta desfășurată (pentru echipa de editare)

## Fișiere
| Fișier | Pentru ce |
|---|---|
| `NovaKids-eticheta.svg` | **Fișierul de lucru**, cu ghidaje. Se deschide în Illustrator, Figma, Inkscape sau Affinity. Toate textele sunt text editabil. |
| `NovaKids-eticheta-print.svg` | Același design, fără ghidaje |
| `NovaKids-eticheta-print.pdf` | PDF 226 × 106 mm (cu bleed), pentru verificare sau tipar |
| `NovaKids-eticheta-300dpi.png` | Imagine la 300 dpi, fără ghidaje |
| `NovaKids-eticheta-preview.png` | Previzualizare cu ghidaje |
| `fonts/` | Baloo 2, Nunito, Open Sans. **Trebuie instalate** înainte de deschiderea SVG-ului. |
| `assets/` | Logo NOVENSA, ilustrații, mockup-ul de referință |
| `build.py`, `render.js` | Scripturile care generează fișierele de mai sus |

## Dimensiuni
- **Format final (trim): 220 × 100 mm**, bleed 3 mm → document 226 × 106 mm.
- Panouri: spate stânga 0–76 mm · **față 76–144 mm** (reproduce mockup-ul 1:1, aceleași poziții și proporții) · spate dreapta 144–220 mm.
- Ghidaje (stratul `GHIDAJE-ascunde-la-print`): albastru = trim, roșu = bleed, verde = zonă sigură 3 mm, portocaliu = delimitare panouri.
- ⚠️ **Dimensiunile sunt estimate** după mockup (borcan cu Ø ~70 mm). Se ajustează după dimensiunile reale ale etichetei de la tipografie: circumferința, minus suprapunerea, și înălțimea.

## De făcut înainte de tipar
1. **Ilustrațiile** `ursulet-PLACEHOLDER.png` și `fructe-PLACEHOLDER.png` sunt decupate din mockup, la rezoluție mică. **Trebuie înlocuite cu fișierele HD/vector originale**, cu fundal transparent. Soarele, curcubeul, norii, stelele și iconițele sunt deja vectoriale.
2. **Textele magenta** `[ ]` trebuie completate cu datele reale: ingrediente, doza zilnică și vârsta, valorile nutriționale și %VNR, gramajul, producătorul, nr. de notificare, codul EAN-13.
3. Logo-ul NOVENSA e PNG de 600 px. Pentru tipar e de preferat varianta vectorială.
4. Fonturile sunt cele mai apropiate găsite (Baloo 2 pentru NovaKids, Nunito pentru MULTIVITAMIN, Open Sans pentru texte). Dacă designerul original are fontul exact, se înlocuiește.
5. Am corectat diacriticele față de mockup: SUSȚINE CREȘTEREA, COLORANȚI.
6. Culori de bază (RGB): verde #1A472D, mov #774DAB, auriu #A8782A → #E6BA69, banda aurie #FED98A. Se convertesc în CMYK la tipografie.
