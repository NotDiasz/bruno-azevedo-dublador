import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Um arquivo .md por trabalho em src/content/trabalhos/. O README.md da pasta
// explica como acrescentar um. As imagens são caminhos relativos ao .md
// (./cartazes/..., ./rostos/...) ou caminhos de public/ (/media/...); se o
// arquivo ainda não existe, o site mostra um retângulo no lugar.
const trabalhos = defineCollection({
  loader: glob({ pattern: ["*.md", "!README.md"], base: "./src/content/trabalhos" }),
  schema: z.object({
    titulo: z.string(),
    personagem: z.string(),
    atorOriginal: z.string().nullable().optional(),
    tipo: z.enum(["filme", "serie", "animacao", "jogo", "publicidade", "narracao", "direcao"]),
    ano: z.number().int().min(1900).max(2100).nullable().optional(),
    funcao: z.enum(["dublagem", "direcao", "narracao"]),
    cartaz: z.string(),
    original: z.string().nullable().optional(),
    audio: z.string().nullable().optional(),
    destaque: z.boolean().default(false),
    exemplo: z.boolean().default(false),
    ordem: z.number().default(100),
  }),
});

export const collections = { trabalhos };
