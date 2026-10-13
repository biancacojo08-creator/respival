# VELURA Cotton Cloud: eticheta parfumului de rufe (200 ml)

## Fișiere
| Fișier | Pentru ce |
|---|---|
| `Velura-CottonCloud-eticheta.svg` | **Fișierul de lucru**, cu ghidaje. Se deschide în Illustrator, Figma, Inkscape sau Affinity. Toate textele sunt editabile. |
| `Velura-CottonCloud-eticheta-print.svg` | Același design, fără ghidaje |
| `Velura-CottonCloud-eticheta-print.pdf` | PDF 142 × 116 mm (cu bleed), pentru verificare sau tipar |
| `Velura-CottonCloud-eticheta-300dpi.png` | Imagine la 300 dpi |
| `Velura-CottonCloud-eticheta-preview.png` | Previzualizare cu ghidaje |
| `fonts/` | Cormorant Garamond (logo, nume aromă) și Manrope (texte). **Trebuie instalate** înainte de deschiderea SVG-ului. |
| `build.py`, `render.js` | Scripturile care generează fișierele (`python3 build.py && node render.js`) |

## Dimensiuni
- **Format final (trim): 136 × 110 mm**, bleed 3 mm, deci documentul are 142 × 116 mm. Eticheta e o bandă care se lipește în jurul sticlei.
- Panouri: **spate 0–68 mm**, **față 68–136 mm**.
- Ghidaje: albastru = trim, roșu = bleed, verde = zonă sigură de 3 mm, portocaliu = delimitarea dintre panouri.
- ⚠️ **Dimensiunile sunt estimate.** Se ajustează după sticla reală, la cererea tipografiei sau a producătorului.

## Culori și finisaje
- Fundal Cotton Mist `#C9D3DB`, text Espresso `#2B2522`.
- **Auriul `#B8955C` (cadru, ornament, banda de jos) se tipărește ca folie aurie mată (hot foil)**, nu cu cerneală.
- Hârtie: etichetă autoadezivă **PP albă, rezistentă la apă**, cu finisaj mat.
- Pictograma CLP: romb cu chenar roșu `#E30613`, pe fundal alb. Latura are 10,5 mm, peste minimul legal de 10 mm.

## De completat (textele magenta)
1. **Frazele H și P, lista „CONȚINE” și compoziția** se iau din **FDS-ul producătorului**, pentru rețeta voastră exactă. Cele de pe etichetă sunt doar exemple. Dacă FDS-ul indică altă pictogramă sau și H412 (mediul acvatic), se adaugă.
2. **Codul UFI** primit la notificarea produsului.
3. **Datele distribuitorului**: firmă, adresă, telefon.
4. **Codul EAN-13** de la GS1 România (zona albă are 31 × 21 mm, cam 83% din mărimea standard).
5. **Simbolul de reciclare** al sticlei (PP 05 sau HDPE 02).
6. LOT și EXP se imprimă pe sticlă sau pe etichetă la producție.
