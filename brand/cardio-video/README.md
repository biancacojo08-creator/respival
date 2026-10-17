# Videouri Cardio Balance cu voce (4:5, Facebook)

| Video | Hook | Voce (Gemini TTS) | Durată |
|---|---|---|---|
| `final/C1-3dimineata.mp4` | Treaz la 3 dimineața din cauza inimii? | Aoede (femeie) | 37 s |
| `final/C2-semnale.mp4` | Inima ta îți trimite semnale. Tu le ignori? | Charon (bărbat) | 35 s |
| `final/C3-scari.mp4` | Te oprești pe scări și inima îți bubuie? | Algenib (bunic) | 34 s |
| `final/C4-varsta.mp4` | „E de la vârstă.” Inima mea nu era de acord. | Kore (femeie) | 33 s |

- **Pozele** sunt cele deja făcute, cu borcanul în mână (`foto/`). Am folosit și clipurile din `../animatii/`, fără generare nouă.
- **Vocile** sunt făcute cu `gemini-3.8-flash-tts`, temperature 1.1 (~0,015 $ fiecare) și stau în `voci/`. Textele sunt în `videos.json`.
- **Lip sync:** în `talk/` sunt bucățile animate cu `p-video-avatar` (720p, seed 42, ~0,25 $ fiecare). `make.py` le folosește automat în locul pozei. Cele 4 greșite (borcanul pe lângă mână sau un al doilea borcan) sunt mutate în `talk/respinse/` și nu intră în videouri.
- **Refacere** (gratuită): `node cards.js && python3 make.py`. Un `#0.9` după numele pozei mută tăietura 4:5 spre dreapta, ca să nu iasă borcanul din cadru.
- `final/cardio-noaptea-4x5.mp4` e testul fără voce, făcut cu `compose.sh` / `overlays.js`.
