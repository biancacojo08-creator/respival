# Poze pentru video UGC – NovoKids Somn Liniștit (Segmind, nano-banana-2.1)

Referință: `../sirsom.png` (cutia reală). Setări: aspect_ratio 9:16, output_resolution 2K, thinking_level high.

## Partea comună (lipită la finalul fiecărei scene)

The product is the exact NovoKids "Somn Liniștit" box from the reference image: keep its shape, white box, green "NOVENSA" logo, green "NovoKids" title, blue "Somn Liniștit", the sleeping moon with nightcap, teddy bear and owl illustration, green bottom band with "Natural și eficient" and "100 ml", and all printed text exactly as in the reference, unchanged and readable, label facing the camera. SCALE IS CRITICAL: it is a small box about 13 cm tall and 5 cm wide, it fits in an adult's palm and is roughly as tall as a hand from wrist to fingertips; never make it bigger. Authentic UGC smartphone photo: vertical 9:16, shot on an iPhone, natural available light, slight grain, real lived-in Romanian apartment interior, not a studio. People have natural Romanian features: dark brown hair, fair-olive skin, brown or hazel eyes, ordinary real people, not models, minimal makeup. No added text, captions, stickers, logos or watermarks. Leave some empty space in the top fifth of the frame for captions.

## U1-selfie-hook
Front-camera selfie at arm's length: a tired but warmly smiling Romanian mother, 32, dark brown hair in a messy bun, grey hoodie, sitting on the edge of a bed in a dim bedroom at night lit by a warm bedside lamp, holding the box up next to her face toward the camera with one hand as if she is about to talk about it; behind her, softly out of focus, a 5-year-old child asleep under a blanket hugging a plush toy.

## U2-lingurita-culcare
Handheld over-the-shoulder phone shot at bedtime: a Romanian mother in her 30s sitting on a child's bed gives a 4-year-old girl with brown hair, in pyjamas with little stars, a teaspoon of amber syrup; the girl smiles and opens her mouth; the box stands on the white nightstand next to a small moon night lamp, label facing the camera; cozy kids' room with warm string lights.

## U3-colet
Daytime kitchen table in a Romanian apartment: a woman's hands (mid-30s, simple wedding ring) have just opened a plain brown cardboard courier parcel with crumpled kraft paper; she holds the box in her palm toward the camera in close-up; background: typical Romanian kitchen with tiled backsplash, a smartphone and a mug of coffee on the table. Unboxing UGC style, 3/4 top-down angle. The parcel has no brand markings.

## U4-dimineata-scoala
Morning in the small hallway of a Romanian apartment near the front door: a happy 7-year-old boy with brown hair, school backpack on, smiling and giving a thumbs up; his father (late 30s, short dark hair, light stubble, casual shirt) crouches next to him holding the box in his palm toward the camera; morning sunlight from a window, shoe rack, coats on hooks. Upbeat, rested "after" moment.

## U5-bunica-nepoata
Evening living room in a Romanian grandmother's home: a warm smiling grandmother about 62, short dyed auburn hair, knitted cardigan, sitting on the sofa with her sleepy 5-year-old granddaughter in pyjamas cuddled against her; the grandmother holds the box in her palm toward the camera; on the coffee table a cup of linden tea on a crocheted doily; patterned rug and a wooden wall unit with books behind, soft lamp light.

## Actualizare: U2 și U3 refăcute cu persoana care vorbește la cameră
- **U2:** mama în pijama roz stă pe marginea patului cu fața la cameră și ține lingurița și cutia; fetița doarme lângă ea.
- **U3:** mama la masa din bucătărie, cu fața la cameră, ține cutia lângă față; în față e coletul deschis.

## Cum s-au obținut pozele finale
1. Segmind nano-banana-2.1 a generat scenele (originalele sunt în `generate-ai/`).
2. Cu `swap.py`, fața cutiei generate de AI a fost înlocuită cu fața reală a cutiei (`ref-fata-cutie.png`). Poziția și perspectiva s-au găsit prin potrivire de puncte (SIFT + omografie), lumina s-a potrivit în spațiul de culoare LAB, iar degetele de pe marginea cutiei s-au păstrat.
   `python3 swap.py ref-fata-cutie.png generate-ai/v1-U1-selfie-hook.jpg U1-selfie-hook.jpg`
