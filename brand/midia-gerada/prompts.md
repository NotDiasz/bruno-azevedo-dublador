# Mídia — Bruno Azevedo

Data: 2026-10-29. Ferramenta: image_gen integrada, sem fallback CLI. Geração autorizada pelo Miguel; publicação dos retratos depende da aprovação do Bruno. Nenhuma publicação feita.

## Referências e invariantes

- Fotos reais: `brand/fotos/bruno-atma.png` (837×668) e `bruno-estudio.png` (257×341). Primeiro retrato também usa o círculo do Bruno em `trabalho-the-silent-hour.png`; o ator do filme não é referência de identidade.
- Todas as demais gerações de Bruno usam as duas fotos reais e o primeiro retrato como apoio de continuidade. Rosto largo, olhos castanhos, cabelo curto para trás, grisalho nas laterais, barba grisalha e bigode preservados como orientação; comparação humana continua necessária.
- Fotografia baixa chave, preto #0B0B0C, roupa escura sem marca. Retratos e cenas sem texto publicitário.

## Seleção

- `poster-a`: rosto mais largo e expressão contida, mais próximo da selfie Atma.
- `microfone-a`: mantém rosto amplo, olhar à câmera e equipamento legível, com luz vermelha discreta ao fundo.
- `recorte-a`: preserva largura dos ombros e sorriso de canto discreto; alpha original preservado nos dois formatos.
- `close-b`: enquadramento mais fechado e frontal para o rodapé.
- Duas variantes por uso guardadas em `bruno/`, todas 1600×2000. Não representam duas pessoas nem fotos documentais.
- Originais da ferramenta têm proporções aproximadas; exportação final por crop central mínimo e Lanczos para as medidas exatas, sem distorcer a razão de aspecto.

## Fotos reais e recortes de terceiros

- Atma: nitidez leve convencional (UnsharpMask raio 0,7; 65%; limiar 4), resize Lanczos; 1600×1277. Sem geração, sem mudança facial, logo real preservado.
- Estúdio: crop (0,60,257,204), acima do letreiro; conserva rosto e fone. Nitidez leve convencional e resize Lanczos para 1600×896. Fonte muito pequena, sem reconstrução de detalhe.
- Atores: exclusivamente crop retangular dos PNGs reais fornecidos, resize Lanczos, sem geração, inpainting, alteração de rosto ou remoção de elementos. Crédito deve permanecer nos dados e na interface do portfólio.
- Silent Hour: fonte 700×863; cartaz (0,330,360,780), rosto (25,335,337,725). Crédito: The Silent Hour / Joel Kinnaman / Frank Shawn; recorte da arte promocional fornecida pelo cliente.
- Crescent City: fonte 723×868; cartaz (130,240,434,620), rosto (190,250,414,530). Crédito: Terror em Crescent City / Michael Sirow / Padre Victor; recorte da arte promocional fornecida pelo cliente. A borda do círculo original do ator permanece no cartaz, mas o círculo do Bruno e os textos ficam fora.
- The Brutalist: fonte 718×890; cartaz (95,360,431,780), rosto (174,395,398,675). Crédito: The Brutalist / Joe Alwyn / Harry Lee Van Buren; recorte da arte promocional fornecida pelo cliente. Contorno branco da montagem original permanece, sem redesenhar o ator.
- Cada crop exportado em 1200×1500. Qualidade limitada pela fonte: áreas de 224–360 px ampliadas cerca de 3,3–5,4×, com granulação e suavidade visíveis. Não é upscale generativo. Recomenda-se substituir por stills licenciados de maior resolução quando disponíveis.

## Prompts integrais

### poster-a

Use case: identity-preserve. Create ONE photographic cinematic poster portrait of Bruno Azevedo, same real man in reference photos 1 and 2 and small inset circle in reference 3 (NOT the movie actor). Strict identity: broad full face, brown eyes, full salt-and-pepper beard joined to moustache, short dark hair swept back with grey temples, substantial build, natural age and skin texture. Waist/chest-up, looking directly into camera, serious confident expression with very slight corner smile, plain dark unbranded shirt. Low-key cinematic soft key light, deep background #0B0B0C, restrained natural warm skin, no neon. Portrait 4:5, intended final 1600x2000, enough head and shoulders room. No text, logos, frame or watermark. Preserve facial proportions and identity, do not beautify, slim or substitute generic model.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### poster-b

Use case: identity-preserve. ONE photoreal cinematic portrait 4:5 intended 1600x2000. Bruno Azevedo, strictly same real person as photos 1 and 2, continuity reference 3. Broad full face and build, brown eyes, full grey salt-and-pepper beard connected to moustache, short dark hair swept back grey temples, natural skin texture. Plain black unbranded shirt, low key cinema soft warm key, deep dark #0B0B0C, no neon, text, logo, border or watermark. Do not slim, beautify, de-age or change facial structure. Poster portrait variant B, chest-up looking directly at camera serious-confident with subtle corner smile. Slightly more frontal soft key and relaxed shoulders, head fully visible.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### microfone-a

Use case: identity-preserve. ONE photoreal cinematic portrait 4:5 intended 1600x2000. Bruno Azevedo, strictly same real person as photos 1 and 2, continuity reference 3. Broad full face and build, brown eyes, full grey salt-and-pepper beard connected to moustache, short dark hair swept back grey temples, natural skin texture. Plain black unbranded shirt, low key cinema soft warm key, deep dark #0B0B0C, no neon, text, logo, border or watermark. Do not slim, beautify, de-age or change facial structure. Microphone portrait variant a: Bruno in a dark professional dubbing booth wearing over-ear studio headphones, condenser microphone and round pop filter beside his face without covering it, very small red REC indicator light far behind (no lettering). Chest-up three-quarter view, looking slightly toward camera, restrained corner smile, realistic equipment.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### microfone-b

Use case: identity-preserve. ONE photoreal cinematic portrait 4:5 intended 1600x2000. Bruno Azevedo, strictly same real person as photos 1 and 2, continuity reference 3. Broad full face and build, brown eyes, full grey salt-and-pepper beard connected to moustache, short dark hair swept back grey temples, natural skin texture. Plain black unbranded shirt, low key cinema soft warm key, deep dark #0B0B0C, no neon, text, logo, border or watermark. Do not slim, beautify, de-age or change facial structure. Microphone portrait variant b: Bruno in a dark professional dubbing booth wearing over-ear studio headphones, condenser microphone and round pop filter beside his face without covering it, very small red REC indicator light far behind (no lettering). Chest-up frontal view, near-camera gaze, restrained corner smile, realistic equipment.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### recorte-a

Use case: identity-preserve. ONE photoreal cinematic portrait 4:5 intended 1600x2000. Bruno Azevedo, strictly same real person as photos 1 and 2, continuity reference 3. Broad full face and build, brown eyes, full grey salt-and-pepper beard connected to moustache, short dark hair swept back grey temples, natural skin texture. Plain black unbranded shirt, low key cinema soft warm key, deep dark #0B0B0C, no neon, text, logo, border or watermark. Do not slim, beautify, de-age or change facial structure. Transparent cutout variant a: chest-up portrait, shoulders and upper torso fully inside image with generous transparent space above and beside hair, direct eye contact, small familiar corner smile, body angled just slightly. Isolated on actual alpha transparency; NO background, shadow, glow, halo, backdrop or outline. Natural clean fine hair edges. Keep beard full and grey as real photos.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### recorte-b

Use case: identity-preserve. ONE photoreal cinematic portrait 4:5 intended 1600x2000. Bruno Azevedo, strictly same real person as photos 1 and 2, continuity reference 3. Broad full face and build, brown eyes, full grey salt-and-pepper beard connected to moustache, short dark hair swept back grey temples, natural skin texture. Plain black unbranded shirt, low key cinema soft warm key, deep dark #0B0B0C, no neon, text, logo, border or watermark. Do not slim, beautify, de-age or change facial structure. Transparent cutout variant b: chest-up portrait, shoulders and upper torso fully inside image with generous transparent space above and beside hair, direct eye contact, calm serious-confident expression, shoulders square. Isolated on actual alpha transparency; NO background, shadow, glow, halo, backdrop or outline. Natural clean fine hair edges. Keep beard full and grey as real photos.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### close-a

Use case: identity-preserve. ONE photoreal cinematic portrait 4:5 intended 1600x2000. Bruno Azevedo, strictly same real person as photos 1 and 2, continuity reference 3. Broad full face and build, brown eyes, full grey salt-and-pepper beard connected to moustache, short dark hair swept back grey temples, natural skin texture. Plain black unbranded shirt, low key cinema soft warm key, deep dark #0B0B0C, no neon, text, logo, border or watermark. Do not slim, beautify, de-age or change facial structure. Footer close-up variant a: powerful close facial portrait, face fills much of 4:5 composition but full hair and chin inside frame, direct camera gaze, three-quarter head angle with restrained half smile. Beard greying prominently chin and sides matching real photo; soft light across eyes, shadows retain detail.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### close-b

Use case: identity-preserve. ONE photoreal cinematic portrait 4:5 intended 1600x2000. Bruno Azevedo, strictly same real person as photos 1 and 2, continuity reference 3. Broad full face and build, brown eyes, full grey salt-and-pepper beard connected to moustache, short dark hair swept back grey temples, natural skin texture. Plain black unbranded shirt, low key cinema soft warm key, deep dark #0B0B0C, no neon, text, logo, border or watermark. Do not slim, beautify, de-age or change facial structure. Footer close-up variant b: powerful close facial portrait, face fills much of 4:5 composition but full hair and chin inside frame, direct camera gaze, frontal head angle, serious confident expression. Beard greying prominently chin and sides matching real photo; soft light across eyes, shadows retain detail.

Saída final: 1600×2000 PNG (variante); selecionada em WebP, PNG adicional para recorte.

### hero

Use case: photorealistic-natural. Cinematic photograph for website hero, wide 16:9 intended 2400x1350. Dark professional film dubbing studio, view through booth glass, lit projection screen showing an entirely indistinct blurred cinematic scene with no recognizable people, console equipment at edges, empty studio, no people anywhere. Low-key black #0B0B0C shadows with restrained warm neutral practical light. Central third visually calm and low contrast, card will cover it. Real acoustic panels, convincing glass reflections, natural photographic detail. No text, letters, logos, watermarks, neon or excessive glow.

Saída final: 2400×1350 WebP.

### microfone

Use case: photorealistic-natural. Cinematic close-up photograph of a professional condenser microphone with round black pop filter in an empty dark dubbing booth, wide 16:9 intended 2400x1350. No people. Microphone and filter dominate one side, negative space across rest, shallow depth of field, low-key warm neutral studio lighting and rich black #0B0B0C. Natural metal grille and acoustic foam texture. Restrained color matching dark cinema studio imagery. No text, letters, logos, watermarks, neon or excessive glow.

Saída final: 2400×1350 WebP.

### direcao

Use case: photorealistic-natural. Cinematic close-up for dark voice actor portfolio, wide 16:9 intended 2400x1350. Professional analog/digital sound mixing console faders and printed Portuguese dubbing script pages resting on the desk, visible simple timecodes such as 00:01:12:08 in a column, loose pencil. No people or hands. Authentic functional studio objects with shallow depth of field; close tactile view of faders, paper and controls, warm neutral soft practical light, low-key #0B0B0C surroundings, restrained palette, no neon. No equipment logos, brands, decorative typography or watermark. Script text small, secondary to scene.

Saída final: 2400×1350 WebP.

### narracao

Use case: photorealistic-natural. Cinematic night football stadium photograph, wide 16:9 intended 2400x1350. Low grass-level perspective, richly textured real green pitch in foreground, powerful stadium floodlights along top edges, empty unbranded stands receding into dark background. No people, no players, no ball needed, no logos, no ads, no text or watermark. Low-key dramatic natural sports photography, rich black #0B0B0C shadows, restrained warm-neutral floodlights, realistic atmosphere without excessive fog/glow. Foreground close-up grass establishes commentator's football atmosphere.

Saída final: 2400×1350 WebP.

### dls

Use case: photorealistic-natural. Cinematic portrait 4:5 intended 1200x1500. One ordinary unbranded worn black-and-white stitched football on richly textured green grass, seen from a very low angle under a single directional stadium floodlight at night. Ball fills lower central composition, dark empty stadium background softly blurred. Low-key photographic light, natural materials and subtle wear, deep #0B0B0C shadows, restrained warm-neutral highlights matching a cinema voice portfolio. No people, logos, DLS branding, advertising, text, watermarks or neon.

Saída final: 1200×1500 WebP.

## Validação

`validacao.jpg` reúne todos os 18 arquivos finais, em duas passagens sobre #0B0B0C e #E1AC10. `bruno/comparacao.jpg` confronta as duas fotos reais com as oito variantes. Dimensões e alpha conferidos por `python brand/midia-gerada/validar-dimensoes.py`; saída em `dimensoes.txt`.

