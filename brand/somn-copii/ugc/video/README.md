# Video UGC NovoKids: cum au fost făcute

Am urmat rețeta din `brand/segmind/RETETA-SETARI.md` (branch-ul awesome-keller).

- **Vocea:** `gemini-3.8-flash-tts`, temperature 1.1 pentru V1–V5 și 1.2 pentru A1–A5. Am folosit vocile Aoede (mama noaptea), Kore (mama la culcare), Leda (mama la bucătărie), Charon (tata) și Gacrux (bunica). Fișierele sunt în `../voci/`.
- **Video-ul:** `p-video-avatar` (Pruna), cu setările 720p, seed 42, strength_negative_prompt 0.8 și disable_prompt_upsampling true.
  - video_prompt: „... talks to the camera with a steady head ... Fixed camera, no camera motion.” Copilul rămâne adormit sau tăcut.
  - negative_prompt: „head shaking, nodding, head bobbing, swaying, tilting head, fast movement, child talking, ...”
- **Mărirea la 1080p** (gratuit): `ffmpeg -vf "scale=-2:1920:flags=lanczos,unsharp=5:5:0.6" -crf 18`
- **Subtitrări și hook-uri** (gratuit): `python3 ../subtitrari.py in-1080.mp4 V1-mama-noapte.json V1-mama-noapte.mp4`
- **Cost:** 9,53 $ pentru 10 video-uri (0,84–1,09 $ pe video) și 0,13 $ pentru voci.

| Video | Poza | Durată |
|---|---|---|
| V1-mama-noapte / A1-mama-stop-obosit | U1 | 30 / 31 s |
| V2-ritual-seara / A2-obraznicie-seara | U2 | 28 / 31 s |
| V3-colet / A3-doarme-pe-banca | U3 | 25 / 29 s |
| V4-tata-scoala / A4-tati-concentrare | U4 | 26 / 26 s |
| V5-bunica-tei / A5-bunica-obositi | U5 | 34 / 31 s |
