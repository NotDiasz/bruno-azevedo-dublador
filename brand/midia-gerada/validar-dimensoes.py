"""Confere o contrato de mídia com Pillow, sem modificar as imagens."""
from pathlib import Path
from PIL import Image

raiz = Path(__file__).resolve().parents[2]
contrato = {
    'public/media/hero-estudio.webp': (2400, 1350),
    'public/media/bruno/retrato-poster.webp': (1600, 2000),
    'public/media/bruno/retrato-microfone.webp': (1600, 2000),
    'public/media/bruno/retrato-recorte.png': (1600, 2000),
    'public/media/bruno/retrato-recorte.webp': (1600, 2000),
    'public/media/bruno/close-rodape.webp': (1600, 2000),
    'public/media/oficios/microfone.webp': (2400, 1350),
    'public/media/oficios/direcao.webp': (2400, 1350),
    'public/media/oficios/narracao.webp': (2400, 1350),
    'public/media/narrador-dls.webp': (1200, 1500),
    'public/media/fotos/bruno-atma.webp': (1600, 1277),
    'public/media/fotos/bruno-estudio.webp': (1600, 896),
    'src/content/trabalhos/cartazes/the-silent-hour.webp': (1200, 1500),
    'src/content/trabalhos/cartazes/crescent-city.webp': (1200, 1500),
    'src/content/trabalhos/cartazes/the-brutalist.webp': (1200, 1500),
    'src/content/trabalhos/rostos/frank-shawn.webp': (1200, 1500),
    'src/content/trabalhos/rostos/padre-victor.webp': (1200, 1500),
    'src/content/trabalhos/rostos/harry-lee.webp': (1200, 1500),
}
for caminho, tamanho in contrato.items():
    with Image.open(raiz / caminho) as imagem:
        imagem.load()
        assert imagem.size == tamanho, (caminho, imagem.size, tamanho)
        print(f'OK {caminho}: {imagem.width}x{imagem.height} {imagem.mode}')
        if 'retrato-recorte' in caminho:
            assert imagem.mode == 'RGBA', caminho
            alpha = imagem.getchannel('A')
            assert alpha.getextrema() == (0, 255), caminho
            assert alpha.getpixel((0, 0)) == 0, caminho
            assert alpha.getpixel((imagem.width - 1, 0)) == 0, caminho
            print('   Alpha real: 0..255; cantos superiores transparentes')
for variante in sorted((raiz / 'brand/midia-gerada/bruno').glob('*.png')):
    with Image.open(variante) as imagem:
        assert imagem.size == (1600, 2000), variante
        print(f'OK brand/midia-gerada/bruno/{variante.name}: {imagem.width}x{imagem.height} {imagem.mode}')
assert len(list((raiz / 'brand/midia-gerada/bruno').glob('*.png'))) == 8
print(f'Contrato: {len(contrato)}/{len(contrato)} arquivos corretos; 8/8 variantes corretas.')
