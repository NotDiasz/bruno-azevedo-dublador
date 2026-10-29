# Verificação do kit de marca

Data: 2026-10-29. Escopo: `brand/logo/` e `brand/brand-kit.html`.

## Resultado

- 25 SVGs válidos pelo parser XML `xml.etree.ElementTree`: 24 variantes da marca e um favicon. Nenhum raster embutido, elemento text ou ID; todos os desenhos são paths.
- 24 variantes rasterizadas por `@resvg/resvg-js`; favicon aberto e renderizado em Chromium. Provas adicionais dos dois selos a 512, 48, 32 e 16 px, além do wordmark a 800 px.
- Provas vistas: selo completo a 512 px; folha com os dois selos a 512/48/16 px; ampliação de pixels do completo a 48 e reduzido a 16; wordmark a 800; imagem social a 1200 × 630. O completo perde separação a 16 px, conforme previsto; a reduzida preserva a interseção e é a indicada nessa escala.
- PNGs abertos com Pillow verify e dimensões conferidas: 180 × 180, 192 × 192, 512 × 512 e 1200 × 630. ICO conferido com os três frames exatos: 16, 32 e 48 px.
- Manual aberto em Chromium headless a 1440, 768 e 390 px: zero erro de console, sem overflow horizontal, duas fontes incorporadas carregadas, 15 SVGs inline e zero requisição externa. Capturas de página inteira produzidas; folhas de contato desktop e celular vistas integralmente.
- Favicon no Chromium: tema claro `rgb(11, 11, 12)` e tema escuro `rgb(237, 234, 227)`.
- Detector Impeccable executado uma vez: sem erro grave; 11 avisos de entrelinha compacta e um advisory de travessões. A entrelinha compacta pertence a títulos e ao espécime tipográfico; texto corrido usa 1,5. O advisory conta os hífens duplos dos nomes reais dos tokens CSS, exigidos na paleta; não há saturação de travessões na prosa.
- Higiene: `rastro.sh` via Git Bash retornou 0. Listou apenas pastas globais Orca de outros projetos; nenhuma foi alterada. Nenhum servidor foi aberto; Chromium foi encerrado em `finally`. Nenhum commit, publicação, link de dependência ou arquivo temporário no repositório.

## Reproduzir as verificações desta sessão

Os scripts e capturas estão em `C:/Users/Miguel/AppData/Local/Temp/bruno-kit-ctx_b639958ef589/`:

```powershell
node "$env:TEMP/bruno-kit-ctx_b639958ef589/verificar.mjs"
python "$env:TEMP/bruno-kit-ctx_b639958ef589/validar.py"
```

Evidências: `verificacao-browser.json`, `validacao.json`, `manual-1440.png`, `manual-768.png`, `manual-390.png`, `manual-contato.png`, `manual-mobile-contato.png`, `prova-tamanhos.png`, `prova-pixels.png` e `renders/wordmark-800.png`.

A primeira tentativa do Playwright procurou uma revisão ainda não instalada e terminou antes de abrir o navegador. A execução final usa explicitamente o Chromium headless já instalado (`chromium_headless_shell-1234`) e passou nos três tamanhos. Nenhum navegador novo foi instalado.

## Inventário

Tamanhos em bytes; esta própria nota não entra no inventário para evitar tamanho autorreferente.

| Arquivo | Bytes |
| --- | ---: |
| `brand/brand-kit.html` | 77,418 |
| `brand/logo/favicon/apple-touch-icon.png` | 2,656 |
| `brand/logo/favicon/favicon.ico` | 3,517 |
| `brand/logo/favicon/favicon.svg` | 379 |
| `brand/logo/favicon/icon-192.png` | 2,823 |
| `brand/logo/favicon/icon-512.png` | 9,166 |
| `brand/logo/favicon/og-image.png` | 28,562 |
| `brand/logo/LEIA-ME.md` | 3,780 |
| `brand/logo/lockup-horizontal-branco.svg` | 5,287 |
| `brand/logo/lockup-horizontal-cor.svg` | 5,292 |
| `brand/logo/lockup-horizontal-preto.svg` | 5,287 |
| `brand/logo/lockup-horizontal.svg` | 5,292 |
| `brand/logo/lockup-vertical-branco.svg` | 5,303 |
| `brand/logo/lockup-vertical-cor.svg` | 5,308 |
| `brand/logo/lockup-vertical-preto.svg` | 5,303 |
| `brand/logo/lockup-vertical.svg` | 5,308 |
| `brand/logo/OFL-Hanken-Grotesk.txt` | 4,402 |
| `brand/logo/selo-mirage-branco.svg` | 709 |
| `brand/logo/selo-mirage-cor.svg` | 714 |
| `brand/logo/selo-mirage-preto.svg` | 709 |
| `brand/logo/selo-mirage-reduzido-branco.svg` | 260 |
| `brand/logo/selo-mirage-reduzido-cor.svg` | 265 |
| `brand/logo/selo-mirage-reduzido-preto.svg` | 260 |
| `brand/logo/selo-mirage-reduzido.svg` | 265 |
| `brand/logo/selo-mirage.svg` | 714 |
| `brand/logo/wordmark-branco.svg` | 4,613 |
| `brand/logo/wordmark-cor.svg` | 4,618 |
| `brand/logo/wordmark-preto.svg` | 4,613 |
| `brand/logo/wordmark-uma-linha-branco.svg` | 4,372 |
| `brand/logo/wordmark-uma-linha-cor.svg` | 4,377 |
| `brand/logo/wordmark-uma-linha-preto.svg` | 4,372 |
| `brand/logo/wordmark-uma-linha.svg` | 4,377 |
| `brand/logo/wordmark.svg` | 4,618 |

## Limites

Não foram feitos registro ou busca de similaridade de marca, prova física de impressão nem implantação do favicon no site. Build do Astro não se aplica aos arquivos independentes desta entrega e fica com a integração do site. O desenho vetorial regulariza a geometria da referência aprovada, sem alterar o conceito.
