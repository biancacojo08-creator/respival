# Rețeta exactă: cum am făcut pozele și video-urile

Dacă folosești aceleași modele cu aceleași setări, iese aceeași calitate pe orice platformă.
Nu iese identic la pixel, pentru că fiecare generare e puțin aleatoare (cu `seed` fix se apropie mult).

## 1. Pozele: Nano Banana Pro (Google)
- **Model:** `nano-banana-pro` (Google „Gemini 3 Pro Image”)
- **Imagine de referință:** poza produsului (Cardio Balance / Power Man), urcată ca „reference image”
- **Format:** 9:16 pentru UGC vertical, 1:1 pentru feed, 4:5 pentru reclame
- **Rezoluție:** 2K
- **Prompt:** promptul complet pentru fiecare poză e în istoricul generărilor. Structura e mereu:
  1. `Authentic UGC selfie photo taken with a smartphone front camera.`
  2. cine e (vârstă, păr, haine) și unde stă (casă românească, bloc, curte…)
  3. `He/She holds the SMALL product box up next to his/her face, label toward the camera.`
  4. `IMPORTANT SCALE: the box is small, about 7 cm tall, about three quarters of his palm.`
  5. `Use the EXACT product from the reference image: …` + descrierea etichetei
  6. `Casual phone selfie look, realistic skin, not a studio photo, no extra text, no watermark.`

## 2. Vocea: Gemini 3.8 Flash TTS (Google)
- **Model:** `gemini-3.8-flash-tts`
- **Video 1 și 2 (pat/dormitor):** voce `Charon`, temperature `1.1`
  - style: `A 58-year-old Romanian man lying in bed next to his wife, speaking Romanian in a low, warm, conspiratorial half-whisper with a smile in his voice, amused and confident, natural like a casual phone video, not like an announcer`
- **Video 3 (baie, halat):** voce `Algenib`, temperature `1.1`
  - style: `A 60-year-old Romanian man with a moustache, just out of the shower, speaking Romanian with a slightly hoarse, warm voice, ironic and funny, cheeky humor, proud, natural like a casual phone selfie video, not like an announcer`
- Textele exacte sunt în `video/V1-…json`, `V2-…json`, `V3-…json` (câmpul `script`). Pe lângă text, am pus `<chuckles>` și `<short pause>` acolo unde râde sau face pauză.

## 3. Video-ul: Pruna P-Video Avatar
- **Model:** `p-video-avatar` (Pruna AI)
- **Intrări:** poza (image) + fișierul de voce (audio)
- **Rezoluție:** 720p · **seed:** 42 · **strength_negative_prompt:** 0.5
- **video_prompt:** `Handheld selfie video … The man is talking to the camera with natural head movement, a cheeky smile and small chuckles, holding the product box steady. The woman stays silent with closed mouth, just smiling. Fixed camera, slight natural handheld sway.`
- **negative_prompt:** `woman talking, subtitles, text, watermark, blurry, distorted face, deformed hands, changing product label`

## 4. Subtitrări și hook-uri: gratuit
`python3 brand/segmind/subtitrari.py video.mp4 brand/segmind/video/V1-cuplu-pat.json iesire.mp4`
