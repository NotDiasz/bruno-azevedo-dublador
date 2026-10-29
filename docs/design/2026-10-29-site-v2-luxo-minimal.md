# Site Bruno Azevedo — v2 luxo minimal (2026-10-29)

Substitui `2026-10-29-site-bruno-azevedo.md` (v1) onde houver conflito. A v1 foi reprovada pelo
Miguel: fonte ruim, mobile ruim, imagens sem qualidade, hero mal pensada (card mostarda), partes
vazias, "site anos 90". Do que existe, **ficam**: a coleção `src/content/trabalhos/` (esquema e README),
o pôster fixo dos rostos (o trigger foi aprovado, mas precisa de imagens melhores), o selo Lente
(`brand/logo/`) e a ideia "os rostos mudam, a voz é a mesma".

## 1. Clima

Luxo minimal de estúdio de cinema: preto profundo, muito ar, tipografia enorme e precisa,
imagens em alta com luz de recorte, motion graphics e objetos 3D metálicos que respondem ao
scroll. Referências de nível Awwwards (site of the day de estúdios, marcas de relojoaria, lentes
de cinema). Nada de cartão chapado colorido, nada de foto de banco genérica (estádio, bola),
nada de bloco de texto pequeno perdido no meio de uma tela vazia.

## 2. Marca e tokens

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#070708` | preto profundo, fundo |
| `--surface` | `#101012` | degrau de tom |
| `--ink` | `#EEEAE2` | marfim, texto |
| `--muted` | `#8E8A83` | notas secundárias |
| `--rec` | `#E0261B` | o "ponto de luz" REC: um ponto pequeno, ação principal, nunca área grande |
| `--metal` | `#1A1B1E` → reflexos | material dos objetos 3D (metal escuro anodizado, PBR) |
| `--nevoa` | azul-noite `#0B1C38`–`#102A52` | atmosfera de névoa/fumaça atrás do Bruno na hero e nas seções escuras (nunca gradiente linear chapado) |

Referência de estilo do Miguel (2026-10-29): `brand/referencias/estilo-hero.png`. Luz baixa de
recorte lateral, rosto meio na sombra, névoa azul-noite, pose pensativa de perfil 3/4, roupa
escura elegante, um único acento vermelho pequeno, grão de filme. Só luz, atmosfera, paleta e pose:
a pessoa é sempre o Bruno.

- Fonte: **Satoshi** (Fontshare, licença gratuita para uso comercial), self-hosted em
  `public/fonts/` (woff2: 300, 400, 500, 700 e itálicos se usados). Uma família só. Título em 300/400
  muito grande, tracking negativo; texto em 400, 17–19 px no desktop, 16–17 px no celular.
- Selo Lente (`src/components/SeloMirage.astro`, já integrado) e wordmark em duas linhas.
- Mostarda e Hanken Grotesk saem do site.

## 3. Roteiro da página

| Seção | O que acontece |
| --- | --- |
| **Intro** | Tela preta. O selo Lente se desenha em traço marfim; as lâminas do diafragma (3D, metal) giram e abrem; pela abertura aparece o vídeo do Bruno na cabine. O nome entra em máscara letra a letra. ≤ 4 s, pulável (Esc, rolar, botão), sem portão de clique; som só depois de interação. A intro É o começo da hero (continuidade, sem corte). |
| **Hero** | Vídeo do Bruno em tela cheia (Flow; até chegar, o still `public/media/v2/hero-poster.webp` com deriva lenta), escurecido nas bordas; "Bruno / Azevedo" enorme em Satoshi 300; uma frase ("A voz brasileira de cinema, séries e jogos."); um ponto REC pulsando ao lado de "Falar com o Bruno". No scroll, a lente 3D se divide em dois círculos (ator e dublador) que conduzem para a próxima seção. |
| **Os rostos** (pinned) | Mantém o pôster fixo da v1, com stills oficiais em alta; transição entre rostos por máscara circular (a lente) em vez de corte seco; último rosto é o Bruno IA. |
| **Trabalhos** | Portfólio da coleção. Lista de personagens enorme, quadro fixo com o still oficial e a coisa viva "Original ↔ Versão brasileira" (arrastar). Créditos nunca embaixo de texto passando. Link para `/trabalhos/`. |
| **Ofícios** | Dublagem, Direção, Narração. Microfone condensador 3D (procedural, metal e malha) gira e se aproxima com o scroll; cada ofício entra como cartela de texto grande ao lado. Sem estádio nem bola. |
| **Sobre** | Retrato IA grande + texto curto em colunas; roteirista, cineasta, ator, podcast @podescontrair_. Fotos reais pequenas só como "bastidores", se couberem. |
| **Filmografia** | Tabela tipográfica enxuta da coleção. Sem faixa vazia acima. |
| **Contato** | E-mail em display gigante sobre preto, ponto REC, Instagram @brunomirage. |
| **Rodapé** | Wordmark enorme de borda a borda, selo, menu. |

Nenhuma tela do desktop é majoritariamente vazia: cada uma tem um elemento dominante (vídeo,
3D, rosto ou tipografia gigante). No celular, composição própria (não desktop encolhido): títulos
14–18vw, 3D mais leve, pins mais curtos.

## 4. 3D (obrigatório, com qualidade)

- three.js via React Three Fiber (`@react-three/fiber`, `@react-three/drei`) em ilhas Astro
  (`client:visible`/`client:idle`), dirigido por ScrollTrigger (progresso → rotação, abertura,
  posição). Modelos procedurais em código (sem GLB pesado):
  - **Diafragma/lente**: anel externo usinado, 9 lâminas curvas sobrepostas com espessura, vidro
    com leve refração, metal escuro com reflexo de HDRI de estúdio (drei `Environment` com
    preset local, sem buscar arquivo externo em produção). Abre/fecha com o scroll.
  - **Microfone condensador**: corpo torneado (Lathe), grade de malha, suporte aranha. Gira e
    aproxima com o scroll em Ofícios.
- Qualidade: PBR, tone mapping ACES, antialias, DPR limitado a 2 (1,5 no celular), sombras
  suaves só onde fazem diferença. 60 fps em desktop médio; no celular, DPR 1–1,5 e menos lâminas
  de geometria se precisar.
- Fallback: sem WebGL ou com movimento reduzido → imagem estática renderizada do mesmo objeto
  (`public/media/v2/3d/*.webp`), nunca espaço vazio.

## 5. Movimento

GSAP + ScrollTrigger + Lenis (já no projeto). Motion graphics de verdade: máscaras, linhas que se
desenham, texto em máscara por linha, números/timecode que correm, transições por lente. Cada
seção com coreografia própria em `src/scripts/motion/`. Reduced motion: sem pin, sem 3D animado,
tudo visível. Sem JS: tudo visível.

## 6. Mídia v2 (contrato)

| Caminho | O quê |
| --- | --- |
| `public/media/v2/hero-poster.webp` | 2560×1440, Bruno IA na cabine, luz de recorte, primeiro quadro do vídeo |
| `public/media/v2/hero.mp4` + `hero.webm` | vídeo do Flow (o Miguel gera; prompts em `brand/midia-gerada/v2/flow-prompts.md`), 6–8 s em loop, mudo, ≤ 4 MB |
| `public/media/v2/bruno/*.webp` | série IA v2 em alta (retrato, perfil, close, microfone), 2000×2500 |
| `public/media/v2/3d/diafragma.webp`, `microfone.webp` | fallback estático dos objetos 3D (renderizados do próprio código) |
| `src/content/trabalhos/cartazes/*.webp`, `rostos/*.webp` | stills/cartazes oficiais em alta (≥ 1600 px no lado menor), substituindo os recortes ampliados |
| `brand/referencias/oficiais/` | originais baixados + `creditos.md` (obra, distribuidora, URL de origem) |

## 7. Pronto quando

Build limpo; Lighthouse mobile ≥ 80 desempenho e ≥ 95 acessibilidade; sem erro de console; sem
rolagem horizontal; 3D a ≥ 50 fps no desktop (medido); capturas 1440 e 390 de cada seção, descendo
e subindo, olhadas; reduced-motion e sem WebGL conferidos; taste-skill `lint.mjs` sem FAIL (a
inspeção de composição da v1 não vale mais como critério).
