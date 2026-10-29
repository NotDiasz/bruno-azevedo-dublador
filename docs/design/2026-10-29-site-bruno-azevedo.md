# Site Bruno Azevedo — especificação (2026-10-29)

Branding e site de portfólio de Bruno Azevedo, dublador, diretor de dublagem e narrador
(@brunomirage, "a voz da internet"). Direção aprovada pelo Miguel em 2026-10-29.

## 1. Inventário do assunto (de onde vem a ideia)

- Nome profissional **Bruno Azevedo**; handle **@brunomirage** (miragem: você vê o ator, ouve o Bruno).
- Trabalhos reais (cartazes em `brand/referencias/`):
  - *The Silent Hour* — Frank Shawn, interpretado por Joel Kinnaman.
  - *Terror em Crescent City* — Padre Victor, interpretado por Michael Sirow.
  - *The Brutalist* — Harry Lee Van Buren, interpretado por Joe Alwyn.
  - Narrador do *DLS 2026* (Dream League Soccer).
- Estúdio onde aparece: Atma Entretenimento. Podcast: @podescontrair_.
- Bio: diretor de cinema; dublador/diretor; roteirista, cineasta, ator; dirigente espiritual.
- Objetos do ofício: o "loop" de dublagem, o timecode (TC 00:01:12:08), o bipe de sincronia, a
  contagem de película 3·2·1, a cartela "Versão brasileira", o microfone com pop filter, o fone,
  a luz de REC, o cartaz com o círculo do dublador sobre o rosto do ator.
- Personalidade nas fotos: sorridente, bem-humorado, boné, barba grisalha.

**A ideia:** neste site, *os rostos que o Bruno dubla* viram *o pôster fixo cujo conteúdo muda*:
o nome fica, os rostos passam por baixo e o último rosto é o dele. "Os rostos mudam. A voz é a mesma."

**A coisa viva (live thing):** em cada personagem, um controle "Original ↔ Versão brasileira"
(arrastar com o polegar ou tocar) que troca o rosto do ator pelo do Bruno no mesmo enquadramento,
com o crédito mudando junto ("Joel Kinnaman" → "Bruno Azevedo"). Sem script: os dois créditos
aparecem lado a lado.

## 2. Marca

- Título: **Bruno Azevedo** (wordmark em Hanken Grotesk 500, tracking -0.05em).
- Símbolo: **selo Mirage** (a definir nas explorações de `brand/exploracoes/`, aprovado pelo Miguel
  antes do kit vetorial). Usos: favicon, intro, rodapé, carimbo do card do hero.
- Paleta (tokens):

| Token | Valor | Papel |
| --- | --- | --- |
| `--bg` | `#0B0B0C` | preto de sala de projeção, fundo do site |
| `--surface` | `#17171A` | degrau de tom para painéis |
| `--ink` | `#EDEAE3` | branco de tela, texto |
| `--muted` | `#A8A39A` | notas secundárias (nunca texto corrido) |
| `--accent` | `#D7261E` | vermelho REC: ação principal e a luz de REC, só isso |
| `--field` | `#E1AC10` | mostarda de película: contagem da intro, card do hero, contato (com `--bg` como tinta) |

- Tipo: Hanken Grotesk 400/500, self-hosted. Uma família só. Escala da ficha da taste-skill
  (`--step-small`, `--step-body`, `--step-lead`, `--step-head`) mais o tamanho do título fixo
  (10–14vw).
- Regras da casa da taste-skill valem inteiras: sem eyebrow, sem monoespaçada (o timecode usa
  algarismos tabulares da própria Hanken), sem 01/02/03, sem fio fino, sem gradiente, sem sombra,
  sem glass, sem emoji, título em até duas linhas.

## 3. Seções (ordem do argumento)

| # | Seção | Afirmação | Prova | Composição (ficha `pinned-poster`, seed 161085216) |
| - | --- | --- | --- | --- |
| 0 | Intro | Isto é cinema dublado | contagem 3·2·1 + cartela "Versão brasileira" | tela mostarda, círculo de varredura preto, bipe; ≤ 3,5 s; "Pular" e Esc |
| 1 | Hero `#inicio` | Bruno Azevedo é dublador, diretor e narrador | foto de estúdio escuro + card | *Card over a dim room*: card mostarda sticky que encolhe para um canhoto no canto inferior esquerdo |
| 2 | Os rostos `#rostos` | Os rostos mudam, a voz é a mesma | personagens reais 4:5 | *Pinned poster*: BRUNO AZEVEDO fixo; Frank Shawn, Padre Victor, Harry Lee, Narrador DLS passam; o último painel é o Bruno |
| 3 | Trabalhos `#trabalhos` (portfólio) | Ele tem trabalhos em cinema, série e jogo | coleção de conteúdo | *Names passing a held square*: nomes dos personagens enormes, quadrado fixo mostra o cartaz; a coisa viva fica no quadrado |
| 4 | Ofícios `#oficios` | Dubla, dirige e narra | close-ups | *Close-up with column card*: três telas cheias (microfone, mesa/roteiro, estádio), card anda uma coluna por tela |
| 5 | Sobre `#sobre` | Por trás da voz há um cineasta | fotos reais + IA aprovada | *Pinned title, portraits pass*: título "Por trás da voz" fixo, retratos passam com legenda (roteirista, cineasta, ator, podcast) |
| 6 | Filmografia `#filmografia` | A lista completa | tabela gerada da coleção | *Line-up at one type size*: título, personagem, ator original, ano |
| 7 | Contato `#contato` | Fale com ele para dublagem, direção e narração | e-mail em display | *Email as display type* em campo mostarda |
| 8 | Rodapé | — | close do Bruno + menu | *Photograph half, menu half*, selo Mirage |

Pins: no máximo dois palcos fixos longos (seções 2 e 5), cada um ≤ 3 telas no celular e ≤ 5 no
desktop, com conteúdo em toda tela. Nada passa por cima de texto fixo; o título fixo usa tinta
sólida que lê em todo painel (não `difference`).

## 4. Portfólio que ele alimenta depois

Coleção de conteúdo do Astro em `src/content/trabalhos/<slug>.md`, uma por trabalho. Esquema
(Zod) em `src/content.config.ts`:

```yaml
titulo: "The Silent Hour"          # obra
personagem: "Frank Shawn"
atorOriginal: "Joel Kinnaman"
tipo: filme                        # filme | serie | animacao | jogo | publicidade | narracao | direcao
ano: 2024                          # opcional
funcao: dublagem                   # dublagem | direcao | narracao
cartaz: ./cartazes/the-silent-hour.webp    # imagem 4:5 do personagem/cartaz
original: ./rostos/frank-shawn.webp        # rosto do ator, 4:5 (opcional; ativa a coisa viva)
audio: null                        # opcional, caminho em public/media/audio/; player só aparece se houver
destaque: true                     # entra na seção "Os rostos"
exemplo: false                     # true = conteúdo de exemplo, etiqueta visível "Exemplo"
ordem: 1
```

Página `/trabalhos/` com todos os trabalhos e filtro por tipo; seção 3 e tabela 6 leem a mesma
coleção. `README.md` da pasta explica em português como acrescentar um trabalho (copiar um `.md`,
trocar texto e imagem, rodar `npm run build`). Dados reais: os três filmes e o DLS; o resto,
se houver, vai com `exemplo: true`.

## 5. Contrato de mídia (`public/media/` e `src/content/trabalhos/`)

| Caminho | O quê | Formato |
| --- | --- | --- |
| `public/media/hero-estudio.webp` | estúdio de dublagem escuro, tela acesa, sem pessoas | 2400×1350 |
| `public/media/bruno/retrato-poster.webp` | Bruno IA, retrato de cartaz, fundo escuro | 1600×2000 (4:5) |
| `public/media/bruno/retrato-microfone.webp` | Bruno IA no microfone, com fone | 1600×2000 (4:5) |
| `public/media/bruno/retrato-recorte.png` + `.webp` | recorte transparente, peito para cima | 1600×2000 |
| `public/media/bruno/close-rodape.webp` | close forte do rosto, para o rodapé | 1600×2000 |
| `public/media/oficios/microfone.webp` | microfone condensador com pop filter, close | 2400×1350 |
| `public/media/oficios/direcao.webp` | mesa de som e roteiro com timecode, close | 2400×1350 |
| `public/media/oficios/narracao.webp` | estádio de futebol à noite, sem marcas | 2400×1350 |
| `public/media/fotos/bruno-atma.webp`, `bruno-estudio.webp` | fotos reais tratadas (só melhora de qualidade) | lado maior 1600 |
| `src/content/trabalhos/cartazes/*.webp` | cartaz/still de cada trabalho recortado de `brand/referencias/` | 1200×1500 (4:5) |
| `src/content/trabalhos/rostos/*.webp` | rosto do ator original recortado do cartaz | 1200×1500 (4:5) |
| `public/media/narrador-dls.webp` | campo/bola em luz de jogo, sem logo do DLS | 1200×1500 |

Arquivo ausente: o site mostra um retângulo `--surface` no mesmo tamanho, nunca quebra.
Imagem gerada do Bruno: fiel às fotos de `brand/fotos/` e só publica com aprovação dele.
Rosto de ator: só recorte do cartaz real, nunca gerado nem alterado.

## 6. Movimento

GSAP + ScrollTrigger + Lenis, um arquivo por seção em `src/scripts/motion/`. Assinatura: o pôster
fixo (seção 2). Em volta: entrada escalonada por seção (60–90 ms, 16–32 px), resposta em todo
controle, uma imagem que se move (deriva lenta no hero). Só transform e opacity.
`prefers-reduced-motion`: sem pin, sem Lenis, conteúdo inteiro visível. Sem JS: tudo visível.
Intro: aparece já no HTML (script inline no `<head>` marca `html.js`), roda em toda carga,
pulável; o bipe só toca depois de interação do usuário (sem portão de clique).

## 7. Pronto quando

`npm run build` limpo; taste-skill `lint.mjs`, `inspect.mjs` e `scenes.mjs` com 0 FAIL em
1440/768/390; capturas rolando para baixo e para cima; console sem erro; sem rolagem horizontal;
axe sem violação A/AA; Lighthouse mobile ≥ 85 desempenho e ≥ 95 acessibilidade.
