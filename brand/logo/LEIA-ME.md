# Kit Bruno Azevedo e Mirage

Marca aprovada em 2026-10-29: exploração 04 “Lente sobreposta” e wordmark 02 “Bruno / Azevedo”. Manual autocontido em `../brand-kit.html`.

## Arquivos e aplicação

- Seis desenhos: selo completo, selo reduzido, wordmark de duas linhas, wordmark de uma linha, lockup horizontal e lockup vertical.
- Cada desenho tem arquivo sem sufixo e variantes `-preto`, `-branco` e `-cor`. Sem sufixo equivale a `-cor`.
- Preto: `#0B0B0C`. Branco: `#EDEAE3`. `-cor`: `currentColor`.
- Todos os elementos gráficos são paths. Não há imagem raster, texto SVG, dependência de fonte, filtro, máscara, clipPath ou ID. Podem ser incorporados juntos no mesmo HTML.
- Os SVGs têm viewBox justo e sem dimensões fixas. Defina largura e altura proporcionalmente no layout e acrescente a área de proteção externamente.
- `currentColor` herda a cor quando o SVG está inline. Um `<img src="...svg">` não herda a cor do documento que o contém; use variante de cor fixa, SVG inline ou máscara CSS.
- Selo completo a partir de 48 px de largura. Selo reduzido de 16 a 47 px, incluindo os usos até 32 px previstos na decisão. As provas a 16 px do completo demonstram por que ele não deve ser usado nessa escala.
- Mínimos conservadores do manual: wordmark de duas linhas 160 px; uma linha 240 px; lockup horizontal 268 px; vertical 160 px.
- Proteção mínima: ¼ da largura do selo em todos os lados. No wordmark separado, ¼ da altura da letra B.

## Geometria e contornos

O selo completo foi redesenhado geometricamente a partir da silhueta aprovada, sem traçado automático de pixels: dois círculos de raio 224, centros separados por 184, interseção vazada e seis lâminas circulares. O viewBox é `632 × 448`. A versão óptica reduzida segue a prova aprovada: círculos de raio 120, separados por 80, sem lâminas, viewBox `320 × 240`. A operação de preenchimento par/ímpar abre o encontro dos círculos sem adicionar outra tinta.

Os wordmarks são contornos extraídos da Hanken Grotesk real, instanciada em peso 500. O avanço entre caracteres usa o avanço da fonte menos 0,05 em, reproduzindo a composição das explorações. As duas linhas são alinhadas pelo limite visível esquerdo; o avanço vertical é 1 em. Os arquivos independem de fonte instalada.

O lockup horizontal iguala a altura do selo à altura das duas linhas e usa intervalo de ¼ da largura do selo. O vertical centraliza o selo com metade da largura do nome e usa o mesmo intervalo relativo.

Fonte de origem: [Hanken Grotesk no Google Fonts](https://github.com/google/fonts/tree/main/ofl/hankengrotesk), arquivo variável oficial `HankenGrotesk[wght].ttf`. SHA-256: `813b3f8fa0965405669a89b38e51bbefd95eef6b8e20d1cb2d8c10cce062662f`. Licença SIL OFL 1.1 em `OFL-Hanken-Grotesk.txt`. O manual incorpora subconjuntos WOFF2 reais de 400 e 500 para funcionar offline.

## Favicons e imagem social

- `favicon/favicon.svg`: símbolo reduzido; preto no tema claro e branco no tema escuro, com `prefers-color-scheme`. Quadro 32 × 32, símbolo com 28 px de largura.
- `favicon/favicon.ico`: três imagens, 16 × 16, 32 × 32 e 48 × 48, símbolo reduzido branco sobre preto.
- `favicon/apple-touch-icon.png`: 180 × 180, fundo preto opaco.
- `favicon/icon-192.png` e `favicon/icon-512.png`: fundo preto opaco, símbolo reduzido branco.
- `favicon/og-image.png`: 1200 × 630, lockup completo branco sobre `#0B0B0C`, sem foto.

O kit fica em `brand/` para integração pelo responsável do site. Esta entrega não altera `public/` nem a configuração do Astro.

## Verificação

Consulte `VERIFICACAO.md` para resultados e inventário em bytes. Capturas, scripts e intermediários ficaram na pasta temporária do despacho; não fazem parte do kit distribuível.
