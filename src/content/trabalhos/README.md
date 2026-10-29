# Como acrescentar um trabalho ao portfólio

Cada trabalho do Bruno é um arquivo `.md` nesta pasta. A seção **Trabalhos** da página
inicial, a **Filmografia** e a página `/trabalhos/` leem todos daqui. Não precisa mexer em
nenhum outro arquivo.

## Passo a passo

1. **Copie um arquivo parecido.** Por exemplo, copie `the-silent-hour.md` e dê ao novo um
   nome curto, sem acento e sem espaço: `nome-da-obra.md`.
2. **Troque o texto** entre as linhas `---` (veja o significado de cada campo abaixo).
3. **Ponha as imagens:**
   - o cartaz ou a cena do personagem em `cartazes/`, em pé (proporção 4:5, de preferência
     1200×1500 px, formato `.webp` ou `.jpg`);
   - se quiser a troca "Original ↔ Versão brasileira", o rosto do ator original, recortado do
     cartaz oficial, em `rostos/`, no enquadramento comum: 800×1000, olhos nivelados a 40% da
     altura e a 30% da largura um do outro, nariz no centro. O script
     `brand/midia-gerada/encaixe.py` faz esse recorte a partir das coordenadas dos olhos.
4. **Confira** rodando `npm run build`. Se faltar algum campo ou algum valor estiver errado,
   o build para e diz qual arquivo e qual campo.
5. Publique como de costume.

## Os campos

```yaml
titulo: "The Silent Hour"          # nome da obra, como saiu no Brasil
personagem: "Frank Shawn"          # quem o Bruno dubla (ou "Narrador")
atorOriginal: "Joel Kinnaman"      # quem faz o papel no original; null se não houver
tipo: filme                        # filme | serie | animacao | jogo | publicidade | narracao | direcao
ano: 2024                          # opcional: deixe null se não souber
funcao: dublagem                   # dublagem | direcao | narracao
cartaz: ./cartazes/the-silent-hour.webp    # imagem 4:5 do personagem ou do cartaz
original: ./rostos/frank-shawn.webp        # rosto do ator, 4:5 (opcional: ativa a troca Original ↔ Versão brasileira)
audio: null                        # opcional: /media/audio/arquivo.mp3 (o arquivo vai em public/media/audio/)
destaque: true                     # true = aparece também na seção "Os rostos" da página inicial
exemplo: false                     # true = conteúdo de exemplo, aparece com a etiqueta "Exemplo"
ordem: 1                           # ordem nas listas: o menor vem primeiro
```

Abaixo das linhas `---` pode ir uma frase sobre o trabalho; ela aparece na página
`/trabalhos/`.

## Regras

- Só trabalho real. Nada de inventar obra, personagem, prêmio ou ano.
- Rosto de ator: só recorte do cartaz oficial, nunca imagem gerada ou alterada.
- Imagem que ainda não existe não quebra o site: aparece um retângulo escuro no lugar até
  o arquivo chegar.
- O player de áudio só aparece quando `audio` tem um arquivo.
