# Vídeo da hero — Google Flow

Data: 2026-10-29. Três alternativas de direção prontas para colar. São prompts para o Miguel executar; nenhum vídeo foi gerado nesta entrega. Publicação só após aprovação do Bruno.

## Preparação e direção comum

Use a imagem indicada como primeiro quadro e referência de identidade; se o modo disponível aceitar quadro final, use a mesma imagem também no fim. Escolha a maior qualidade disponível, 8 s (ou 6 s se necessário), 24 fps e a proporção indicada. Os nomes e controles disponíveis dependem da versão do Flow; estes são os valores desejados, não uma afirmação sobre a interface.

Mantenha poros, barba grisalha, fone, roupa, microfone e foco da imagem. A névoa azul-noite deve mover-se muito devagar, sem atravessar ou esconder o rosto. Não adicionar título: a tipografia é do site. A frase é uma sugestão de interpretação, sem alegar ser gravação real do Bruno; o arquivo do site será mudo.

## Prompt 1 — cabine, gesto mínimo, 16:9

Referência: `public/media/v2/hero-poster.webp`.

```text
Create an 8-second seamless cinematic loop from the supplied first-frame image, 16:9. Preserve Bruno Azevedo's exact face, stocky build, natural skin texture, salt-and-pepper full beard, brown eyes, swept-back short hair, black plain shirt, headphones, microphone and pop filter. Keep him on the right and preserve the dark left negative space for a website headline. Low-key lateral rim lighting, half face in shadow, deep midnight-blue atmospheric haze fading into black. No new objects or text. The camera is almost locked: a barely perceptible 1 percent push-in from seconds 0 to 4, then ease back to the exact starting framing by second 8. He takes one subtle breath, quietly mouths the Brazilian Portuguese phrase “A voz fica” between seconds 2 and 4, and returns to his starting relaxed closed-mouth pose. No large head turn or gestures. The tiny red REC indicator dims and relights exactly once around second 4; all other lighting remains stable. Midnight-blue mist drifts extremely slowly in a small cyclical eddy, returning to a visually matching distribution. Match the first-frame facial pose, framing, focus, exposure and mist at the last frame; no visible reset, cut, dissolve, wobble, morphing or facial beautification. Photographic prime-lens realism and fine film grain. No music; audio is unnecessary.
```

Tradução curta: oito segundos na cabine; respiração discreta e “A voz fica”, avanço de câmera quase imperceptível que retorna, REC pisca uma vez e névoa azul fecha o ciclo.

## Prompt 2 — pausa e intenção, 16:9

Referência: `public/media/v2/hero-poster.webp`.

```text
Animate the supplied photograph into an understated luxury cinema-studio portrait, 8 seconds, 16:9, designed as a clean website background loop. Lock Bruno's identity and all photographic details to the reference. Keep the wide left headline area empty and dark, the subject at right, the softly defocused condenser microphone and pop filter stationary. Preserve his black shirt, coherent headphones and cable, natural gray beard fibers, asymmetry and skin pores. Maintain midnight-blue volumetric haze, deep black shadows, restrained cool rim and neutral skin light. Begin with one second of stillness, then a very slight inhale and a concentrated quiet delivery of “Cada voz, uma história” in Brazilian Portuguese during seconds 2–5, with minimal jaw movement. Let him settle precisely back to the reference mouth and gaze by second 7. An almost invisible push-in reaches only 0.5 percent at the midpoint and returns smoothly to the original camera position for the loop. The small distant red REC lamp blinks once, off then on, near second 5. Very slow blue mist movement, cyclical and never across his eyes. Hold the matching starting pose for the final half-second. Last frame visually matches first frame. No cuts, new props, hand movements, dramatic zoom, bright fog, light flicker elsewhere, face drift, text or logos. Fine film grain, realistic optics. No soundtrack required.
```

Tradução curta: interpretação um pouco mais longa, com pausa inicial e final; “Cada voz, uma história”, névoa suave e câmera que volta ao enquadramento inicial.

## Prompt 3 — composição móvel, 9:16

Referência: `public/media/v2/bruno/hero-mobile.webp`. Gerar separadamente do desktop; não recortar o vídeo horizontal.

```text
Use the supplied vertical reference as the exact first frame for an 8-second 9:16 seamless loop. Preserve Bruno Azevedo's exact identity, beard, hair, natural pores, black plain shirt, headphones and recording equipment. Preserve the phone-specific composition: the upper 35 percent is quiet low-contrast midnight-blue haze and dark negative space for a title; Bruno remains in the lower right and the microphone and single circular pop filter in the lower left. Never recenter him or fill the top with equipment. Maintain low-key lateral lighting and deep midnight-blue atmospheric smoke fading into near-black. Camera almost stationary: a gentle 0.5 percent push-in through second 4, smoothly returning to the exact initial framing by second 8. Bruno breathes subtly, softly mouths “A voz fica” in Brazilian Portuguese between seconds 2 and 4, then returns to the initial mouth and gaze. No head turn or hand gestures. The tiny distant red REC LED switches off and back on exactly once around second 4. Haze moves very slowly in a small looping eddy without covering the face and ends at a visually matching density. Match first and last frame pose, exposure, focus and framing. No cuts, dissolve, morphing, wax skin, extra cables, text or logos. Premium prime-lens photographic realism and subtle film grain. No music or audio needed.
```

Tradução curta: mesmo gesto mínimo em 9:16, com área livre no alto; a névoa move-se lentamente e a câmera volta ao ponto inicial.

## Exportação e arquivos do site

Exporte o resultado escolhido em MP4 H.264, 1920×1080 para desktop ou 1080×1920 para celular, SDR Rec.709, 24 fps, 6–8 s. Preserve um master com a maior qualidade disponível. Os comandos abaixo recebem `flow-hero-master.mp4`, limitam a oito segundos, removem áudio e metadados e criam as versões do site; execute na raiz do projeto quando o master existir.

### Desktop MP4, orçamento abaixo de 4 MB

```powershell
ffmpeg -i flow-hero-master.mp4 -t 8 -map 0:v:0 -an -sn -dn -map_metadata -1 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=24" -c:v libx264 -preset slow -crf 24 -maxrate 2800k -bufsize 2800k -pix_fmt yuv420p -movflags +faststart public/media/v2/hero.mp4
```

O teto de 2,8 Mbit/s por oito segundos deixa margem para o contêiner dentro de 4.000.000 bytes. Confirme o tamanho real abaixo; se ultrapassar, baixe maxrate e bufsize para 2400k e repita.

### Desktop WebM VP9

```powershell
ffmpeg -i flow-hero-master.mp4 -t 8 -map 0:v:0 -an -sn -dn -map_metadata -1 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=24" -c:v libvpx-vp9 -b:v 2200k -crf 32 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p public/media/v2/hero.webm
```

### Versão móvel

Use `flow-hero-mobile-master.mp4`; nos dois comandos, troque o filtro por `scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=24` e os destinos por `public/media/v2/bruno/hero-mobile.mp4` e `public/media/v2/bruno/hero-mobile.webm`. Mantenha os mesmos limites de bitrate.

### Conferência depois da exportação

```powershell
Get-Item public/media/v2/hero.mp4, public/media/v2/hero.webm | Select-Object Name, Length
if ((Get-Item public/media/v2/hero.mp4).Length -gt 4000000) { throw "MP4 acima de 4 MB: reduzir bitrate e reexportar." }
ffprobe -v error -show_entries stream=codec_name,codec_type,width,height,r_frame_rate -show_entries format=duration,size -of json public/media/v2/hero.mp4
ffprobe -v error -show_entries stream=codec_name,codec_type,width,height,r_frame_rate -show_entries format=duration,size -of json public/media/v2/hero.webm
```

Confira por reprodução que o começo e fim não saltam, que o REC pisca uma vez e que rosto, fone e microfone não deformam durante a fala. O prompt pede loop, mas só a inspeção do resultado comprova; se houver salto, regenere com o mesmo quadro inicial/final, menor gesto e câmera ainda mais discreta. Não use reversão do vídeo: a fala ficaria invertida.
