# Enquadramento comum dos rostos: olhos nivelados, na mesma altura e à mesma
# distância, nariz no centro do quadro (onde passa a divisa do "Original ↔
# Versão brasileira"). Uma imagem do Bruno e um recorte por ator, todos 800×1000.
import math
import numpy as np
from PIL import Image, ImageFilter
from pathlib import Path
R = Path(__file__).resolve().parents[2].as_posix() + '/'  # raiz do repositório
O = R + 'brand/referencias/oficiais/'
W, H = 800, 1000
OLHO_Y, DIST = 0.40 * H, 0.30 * W
ALVO = ((W - DIST) / 2, OLHO_Y), ((W + DIST) / 2, OLHO_Y)
casos = [  # fonte, destino, pupila esquerda, pupila direita (pixels da fonte)
    (R + 'public/media/v2/bruno/retrato.webp', R + 'public/media/v2/bruno/encaixe.webp', (691, 839), (1017, 779)),
    (O + 'the-silent-hour/s3ioaDU8OudHWeg7rIbLyU33iXs.jpg', R + 'src/content/trabalhos/rostos/frank-shawn.webp', (1441, 501), (1656, 491)),
    (O + 'crescent-city/michael-sirow-nhUJDr8d3RHQdz7aIVW5Jc2t3RD.jpg', R + 'src/content/trabalhos/rostos/padre-victor.webp', (288, 436), (526, 530)),
    (O + 'the-brutalist/fJNM8c9bEPGsCWhizHlI2f6ofla.jpg', R + 'src/content/trabalhos/rostos/harry-lee.webp', (1929, 632), (2148, 717)),
]
for fonte, destino, (bx1, by1), (bx2, by2) in casos:
    src = Image.open(fonte).convert('RGB'); w, h = src.size
    if 'sirow' in fonte:  # a foto do Sirow é de luz de dia: mesma correção leve de antes
        from PIL import ImageEnhance
        src = ImageEnhance.Contrast(ImageEnhance.Color(ImageEnhance.Brightness(src).enhance(0.78)).enhance(0.82)).enhance(1.08)
    # Fora da fonte, repete a cor da borda bem desfocada (só aparece se o recorte passar da foto).
    P = max(w, h) // 2
    ext = Image.fromarray(np.pad(np.asarray(src), ((P, P), (P, P), (0, 0)), mode='edge')).filter(ImageFilter.GaussianBlur(45))
    ext.paste(src, (P, P))
    (ax1, ay1), (ax2, ay2) = ALVO
    s = math.hypot(ax2 - ax1, ay2 - ay1) / math.hypot(bx2 - bx1, by2 - by1)
    th = math.atan2(ay2 - ay1, ax2 - ax1) - math.atan2(by2 - by1, bx2 - bx1)
    c, sn = math.cos(-th) / s, math.sin(-th) / s
    a, b, d, e = c, -sn, sn, c
    cx = bx1 + P - (a * ax1 + b * ay1); cy = by1 + P - (d * ax1 + e * ay1)
    out = ext.transform((W, H), Image.AFFINE, (a, b, cx, d, e, cy), resample=Image.BICUBIC)
    # Vinheta: as bordas caem para o preto do site; esconde o que veio de fora da foto.
    yy, xx = np.mgrid[0:H, 0:W]
    r = np.hypot((xx - W / 2) / (W * 0.62), (yy - OLHO_Y * 1.1) / (H * 0.62))
    luz = np.clip(1.25 - r, 0.0, 1.0) ** 0.9
    arr = np.asarray(out).astype(np.float32)
    fundo = np.array([7, 7, 8], np.float32)
    out = Image.fromarray((fundo + (arr - fundo) * luz[..., None]).clip(0, 255).astype(np.uint8))
    out.save(destino, 'WEBP', quality=90, method=6)
    fora = sum(not (P <= a*x+b*y+cx <= w+P and P <= d*x+e*y+cy <= h+P) for x, y in [(0, 0), (W, 0), (0, H), (W, H)])
    print(destino.split('/')[-1], 'ampliação %.2fx' % s, 'giro %.1f°' % math.degrees(th), 'cantos fora da foto:', fora)
