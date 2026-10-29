"""Confere o contrato de dimensões da mídia v2 com Pillow."""
from pathlib import Path
from PIL import Image

raiz = Path(__file__).resolve().parents[3]
arquivos = {
    'public/media/v2/hero-poster.webp': (2560, 1440),
    'public/media/v2/bruno/retrato.webp': (2000, 2500),
    'public/media/v2/bruno/perfil.webp': (2000, 2500),
    'public/media/v2/bruno/close.webp': (2000, 2500),
    'public/media/v2/bruno/microfone.webp': (2000, 2500),
    'public/media/v2/bruno/bastidor.webp': (2000, 2500),
    'public/media/v2/bruno/hero-mobile.webp': (1440, 2560),
    'brand/midia-gerada/v2/comparacao.jpg': (2400, 1920),
}
for nome, esperado in arquivos.items():
    caminho = raiz / nome
    with Image.open(caminho) as imagem:
        imagem.load()
        assert imagem.size == esperado, f'{nome}: {imagem.size} != {esperado}'
        assert imagem.mode == 'RGB', f'{nome}: modo inesperado {imagem.mode}'
        assert imagem.format == ('WEBP' if nome.endswith('.webp') else 'JPEG')
        print(f'OK {nome}: {imagem.width}x{imagem.height} {imagem.format} RGB {caminho.stat().st_size} bytes')
print('8 arquivos válidos; 7 WebP e 1 JPEG; 0 divergências.')
