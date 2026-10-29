# Entrega de mídia

Feito: 18 arquivos do contrato da seção 5, oito variantes de Bruno (duas por uso), seleção final, folhas de comparação e validação e registro integral dos prompts.

Arquivos:
- `public/media/`: hero, cinco arquivos Bruno (PNG e WebP do recorte), três ofícios, narrador DLS e duas fotos reais tratadas.
- `src/content/trabalhos/cartazes/`: `the-silent-hour.webp`, `crescent-city.webp`, `the-brutalist.webp`.
- `src/content/trabalhos/rostos/`: `frank-shawn.webp`, `padre-victor.webp`, `harry-lee.webp`.
- `brand/midia-gerada/bruno/`: oito variantes PNG em 1600×2000 e `comparacao.jpg` com fotos reais.
- `brand/midia-gerada/`: `prompts.md`, `validacao.jpg`, `validar-dimensoes.py`, `dimensoes.txt` e esta entrega.

Verificado: `python brand/midia-gerada/validar-dimensoes.py` → **Contrato: 18/18 arquivos corretos; 8/8 variantes corretas**, saída completa em `dimensoes.txt`. PNG e WebP do recorte têm alpha real 0..255 e cantos superiores transparentes; vistos ampliados sobre #0B0B0C e #E1AC10, sem halo visível. Todas as imagens finais foram vistas na folha de validação, todas as variantes na comparação, e as duas fotos/fontes de cada ator foram inspecionadas antes dos recortes. A folha final tem duas passagens, uma em cada cor de fundo.

Verificado: `C:/Program Files/Git/bin/bash.exe .../ferramentas/rastro.sh C:/Users/Miguel/Documents/site-bruno-dublador` → saída 0; relatou somente pastas preexistentes do Orca de outros projetos (IAImobiBackend, aimob-front, azcarrousel, gaby-advogada e tagservice), não tocadas. Nenhum servidor, navegador, worktree, processo persistente ou link foi criado nesta tarefa. O alias `bash` tentou WSL e falhou por disco ausente; a execução por Git Bash explícito completou.

Não verificado: integração do site, build e auditorias de interface pertencem ao trabalhador de implementação; não modifiquei componentes nem os `.md` da coleção. Aprovação da semelhança pelo Bruno ainda não foi recebida e não houve publicação.

Dúvidas / riscos: os cartazes têm resolução baixa (700–723 px de largura) e os recortes exigem ampliação de aproximadamente 3,3–5,4×; a suavidade/granulação foi preservada sem inventar traços. Crescent City conserva parte da borda circular do ator e The Brutalist conserva o contorno branco da montagem original, mas os círculos do Bruno e os textos sobrepostos principais ficam fora. Os créditos dos filmes e atores estão em `prompts.md` e devem aparecer nos dados/interface pelo trabalhador responsável. A foto real de estúdio foi recortada acima do letreiro, ficando horizontal em 1600×896, com detalhe limitado pela fonte de 257×341. A atualização do Estado atual da nota principal do projeto fica com o coordenador para não disputar o arquivo compartilhado.
