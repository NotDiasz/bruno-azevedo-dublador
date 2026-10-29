# Bruno Azevedo + Mirage — explorações de marca

Data: 2026-10-29. Estado: propostas para escolha do Miguel; nenhuma alternativa aprovada. Não há kit vetorial nem aplicação no site.

## Direção e limites

A ideia vem do briefing: “os rostos mudam, a voz é a mesma”. A exploração mantém a paleta e a família da seção 2 da especificação. A proposta visual é transformar objetos da dublagem e a sobreposição do círculo do dublador no cartaz em uma assinatura reconhecível em uma cor. A escolha de símbolo permanece **NÃO VALIDADA**. Padrões permitidos: silhuetas sólidas, espaço negativo, variações de composição tipográfica, preto/branco/mostarda e prova isolada sobre vermelho. Não há proposta de movimento nesta entrega.

Foram compostas três opções tipográficas e seis opções de selo. Os selos saíram de uma única geração com seis células, isoladas e normalizadas em uma tinta com Pillow. Os nomes, legendas e lockups foram compostos depois com a fonte real: nenhuma letra da marca veio da geração. A versão final é raster; não houve vetorização.

## Arquivos para decisão

| Opção | Arquivo | Ideia / composição |
| --- | --- | --- |
| 1 | `01-wordmark-1.png` | Bruno Azevedo em uma linha, Hanken Grotesk 500, tracking −0,05 em. É a opção diretamente prevista na spec. |
| 2 | `02-wordmark-2.png` | Duas linhas alinhadas à esquerda, Hanken Grotesk 500, tracking −0,05 em. |
| 3 | `03-wordmark-3.png` | Duas linhas: Bruno 400 e Azevedo 500, tracking −0,05 em. |
| 4 | `04-selo-lente-sobreposta.png` | Dois círculos e uma lente na interseção; o círculo do dublador encontra o do ator. |
| 5 | `05-selo-perfil-sonoro.png` | Barras de som e perfil humano em espaço negativo. |
| 6 | `06-selo-tres-bipes.png` | Círculo aberto e três sinais da contagem de cinema. |
| 7 | `07-selo-m-sincronia.png` | M em uma faixa contínua de sincronia. |
| 8 | `08-selo-versao-brasileira.png` | Quadro de película com eco; “Versão brasileira” + Mirage em Hanken real. |
| 9 | `09-selo-dois-rostos.png` | Dois perfis espelhados compartilham um círculo. |

As nove explorações e as quatro folhas `lockups-{preto,branco,vermelho,mostarda}.png` medem **1254 × 1254**. Cada folha de lockups combina os seis selos com o wordmark 1; são 24 provas de aplicação. O vermelho de fundo é uma prova solicitada de paleta, não recomendação para uma grande área vermelha no site: o REC continua sendo acento mínimo na aplicação.

`visao-geral.jpg`: **3000 × 4160**, nove opções numeradas com legendas e as quatro folhas de fundo. A numeração pertence ao documento comparativo, não ao sistema visual do site.

`prova-reducao.png`: **1600 × 1100**, tamanho real, ampliação sem suavização e negativo dos seis símbolos. `provas-32px/`: seis PNG transparentes **32 × 32**, uma tinta preta. As bordas têm antialias, não gradiente decorativo.

## Prompt integral da geração

Ferramenta: image_gen integrada. Uma chamada, sem imagem de entrada; os cartazes foram examinados como referência contextual, sem envio de rosto de terceiro para geração. Nenhum rosto real foi gerado ou alterado.

```text
Create a square graphic design exploration contact sheet of SIX distinctly different minimalist one-color logo symbols for MIRAGE, the personal seal of Brazilian dubbing actor Bruno Azevedo. Context: the viewer sees another actor but hears Bruno, an auditory mirage. Six clean separate cells in a 3 columns by 2 rows layout, warm offwhite #EDEAE3 background, solid nearblack #0B0B0C marks. Each mark is centered with generous empty space and fully isolated for later extraction. NO typography, NO labels, NO letters except abstract M geometry. Row1 left: two bold intersecting portrait circles creating a photographic lens aperture in the intersection, derived from the dubbing actor portrait circle overlaid onto a film poster. Row1 middle: a bold sound ribbon doubles as a human profile in negative space, facing right, no detailed face. Row1 right: cinema countdown circle with one thick open arc and three bold cue dots, extremely reduced geometry. Row2 left: abstract M formed by a continuous thick sync waveform ribbon, elegant two peaks. Row2 middle: a bold solid rounded film frame containing an abstract echo made of two offset vertical shapes, an icon for a Brazilian-version rubber stamp, no words. Row2 right: two facing mirrored abstract crescent profiles inside one circle, representing two faces sharing one voice. All six must use thick bold silhouettes and large negative spaces, survive 32 pixel favicon size, flat one ink, no thin wires, no microphones, no lightning, no gradients, no glow, no shadows, no 3D, no texture, no photorealism, no mockup. Refined film culture identity design, clever unexpected negative space, strong optical balance. This is an exploration sheet for later manual composition with real Hanken Grotesk typography.
```

A chamada foi armazenada originalmente em:
`C:/Users/Miguel/.codex/generated_images/01a1890a-642d-7323-9b35-eb012af6cf87/exec-f84441e4-4a3d-4847-881f-b27094032412.png`.
O arquivo original é uma folha de pesquisa da ferramenta e permanece no destino padrão. A entrega não depende dele para abrir.

## Instruções integrais de composição

As instruções abaixo foram executadas como composição determinística, e não como chamadas extras ao modelo:

1. **Wordmark 1:** criar tela RGB 1254 × 1254 em #EDEAE3; compor “Bruno Azevedo” em uma linha com Hanken Grotesk 500 oficial, tracking −0,05 em, baseline comum, tinta #0B0B0C; centralizar em área (94,270,1066,620); incluir identificação e ficha tipográfica com a mesma família.
2. **Wordmark 2:** mesma tela e tinta; compor “Bruno” e “Azevedo” em duas linhas alinhadas à esquerda, peso 500 nas duas, tracking −0,05 em; centralizar o conjunto na mesma área; incluir ficha.
3. **Wordmark 3:** repetir a composição em duas linhas com “Bruno” 400 e “Azevedo” 500; tracking −0,05 em; mesma área, paleta e ficha.
4. **Lente sobreposta:** extrair a primeira célula da geração, isolar pixels escuros com limiar de luminância <100, recortar o limite da silhueta e compor preto sobre branco de tela; centralizar em (310,235,634,590); inserir “Mirage” com Hanken 500 e tracking −0,05 em; adicionar prova de 32 px e negativo. Na versão 32 px, remover as lâminas internas e manter dois círculos com interseção vazada, construídos em máscara Pillow a 10× e reduzidos com Lanczos.
5. **Perfil sonoro:** extrair a segunda célula; aplicar o mesmo isolamento, posicionamento, paleta, “Mirage” tipográfico, negativo e prova de 32 px.
6. **Três bipes:** extrair a terceira célula; aplicar o mesmo isolamento, posicionamento, paleta, “Mirage” tipográfico, negativo e prova de 32 px.
7. **M em sincronia:** extrair a quarta célula; aplicar o mesmo isolamento, posicionamento, paleta, “Mirage” tipográfico, negativo e prova de 32 px.
8. **Versão brasileira:** extrair a quinta célula; aplicar o mesmo isolamento e posicionamento; incluir “Versão brasileira” com Hanken 400 e “Mirage” com Hanken 500; na redução de 32 px usar só o símbolo da película/eco, sem o texto; adicionar negativo.
9. **Dois rostos:** extrair a sexta célula; aplicar o mesmo isolamento, posicionamento, paleta, “Mirage” tipográfico, negativo e prova de 32 px.
10. **Lockups:** para cada fundo #0B0B0C, #EDEAE3, #D7261E e #E1AC10, compor seis linhas com símbolo à esquerda e wordmark 1 à direita; legenda em Hanken 400. Usar #EDEAE3 sobre preto e vermelho e #0B0B0C sobre branco e mostarda.
11. **Comparativa:** criar JPEG 3000 × 4160 em #EDEAE3; nove miniaturas quadradas, sem distorção, em três colunas; número de opção, nome e legenda em Hanken; quatro folhas dos lockups ao fim; não acrescentar conteúdo de portfólio ou material fictício.

## Fontes e referências

- [Especificação do projeto](../../docs/design/2026-10-29-site-bruno-azevedo.md), seção 2: cores e tipografia.
- Fonte oficial [Hanken Grotesk, Google Fonts](https://github.com/google/fonts/tree/main/ofl/hankengrotesk), arquivo [HankenGrotesk[wght].ttf](https://raw.githubusercontent.com/google/fonts/main/ofl/hankengrotesk/HankenGrotesk%5Bwght%5D.ttf), sob [SIL Open Font License 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/hankengrotesk/OFL.txt).
- Fonte variável oficial baixada para `C:/Users/Miguel/AppData/Local/Temp/bruno-marca-ctx_9a057a376594/`; pesos 400/500 instanciados com fontTools e renderizados com Pillow. Nenhuma fonte ou script temporário foi adicionado ao repositório.
- SHA-256 do TTF variável: `813b3f8fa0965405669a89b38e51bbefd95eef6b8e20d1cb2d8c10cce062662f`.
- Referências locais examinadas: `brand/referencias/trabalho-the-silent-hour.png` e `brand/referencias/trabalho-the-brutalist.png`, fornecidas pelo projeto. O círculo do Bruno sobre o cartaz motivou a lente sobreposta. Os cartazes e rostos de Joel Kinnaman e Joe Alwyn pertencem aos respectivos titulares e não foram reproduzidos na entrega.
- Método de trabalho: sessão do cérebro “2026-10-28 codex exploracoes de marca”, projeto gabriela-dias-advocacia: pesquisa de símbolo por geração e composição final com fonte oficial.

## Leitura crítica e próximos passos

As opções 5, 6 e 7 têm massas mais simples na prova de 32 px; 5 liga mais diretamente voz e pessoa, 6 liga cinema e contagem, 7 liga o handle a uma forma compacta. A 4 conta a origem no cartaz, mas usa uma versão óptica simplificada no favicon. A 8 funciona como cartela/carimbo e usa apenas o ícone a 32 px. Na 9 os dois perfis continuam reconhecíveis, mas detalhes pequenos de nariz e boca precisarão de ajuste óptico no futuro desenho vetorial.

Nenhuma marca foi escolhida. Depois da escolha do Miguel: desenho vetorial, refinamento de curvas/espaços, busca de similaridade de marca e testes reais de favicon no navegador. Busca de marca registrada e exclusividade comercial não foram feitas neste escopo.

## Verificação

- Pillow `Image.verify()`: 21 imagens sem erro.
- Nove explorações e quatro folhas de lockup: 1254 × 1254.
- Seis PNG transparentes: 32 × 32.
- Folha comparativa e prova de redução abertas e revistas visualmente; composição corrigida para baseline tipográfica comum.
- Nenhum servidor, navegador, commit, push, deploy ou kit vetorial iniciado.

