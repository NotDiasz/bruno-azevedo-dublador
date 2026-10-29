# Site Bruno Azevedo

Site de portfólio do dublador Bruno Azevedo. Astro + React (ilhas), TypeScript, GSAP +
ScrollTrigger, Lenis, three.js (React Three Fiber). Especificação: `docs/design/2026-10-29-site-v2-luxo-minimal.md` (v2, vale sobre a v1 `2026-10-29-site-bruno-azevedo.md`).

## Regras

- Português do Brasil no texto do site, nos comentários e nos commits.
- Trabalhos do portfólio vêm de `src/content/trabalhos/`; não escreva trabalho direto em componente.
- Nunca inventar trabalho, prêmio, cliente ou número. Conteúdo de exemplo leva `exemplo: true`.
- Rosto de ator: só cartaz ou still oficial de divulgação, sem alteração, com crédito
  (`brand/referencias/oficiais/creditos.md`). Imagem gerada do Bruno só vai ao ar com aprovação dele.
- Animação mora em `src/scripts/motion/`, uma seção por arquivo, com fallback de movimento reduzido.
- Regras da casa da taste-skill (sem eyebrow, monoespaçada, numeração 01/02, fio fino, gradiente,
  sombra, glass, emoji).

## Comandos

- `npm ci`, `npm run dev` (http://127.0.0.1:4321), `npm run build` (inclui `astro check`).
