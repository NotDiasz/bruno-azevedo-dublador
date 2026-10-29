import fs from "node:fs";
import path from "node:path";
import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../data/site";

// Imagem já resolvida para a página: `src` null quer dizer que o arquivo ainda
// não chegou, e quem desenha mostra o retângulo --surface no mesmo tamanho.
export type Figura = {
  src: string | null;
  srcset?: string;
  width: number;
  height: number;
  alt: string;
  /** object-position do recorte, quando o rosto não está no centro. */
  posicao?: string;
};

// As imagens da coleção que existem no momento do build. Um arquivo que falta
// simplesmente não aparece aqui, sem quebrar o build.
const daColecao = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/trabalhos/{cartazes,rostos}/*.{webp,png,jpg,jpeg,avif}",
  { eager: true },
);
const daMidia = import.meta.glob<{ default: ImageMetadata }>(
  "/public/media/{v2,bruno,fotos}/**/*.{webp,png,jpg}",
  { eager: true },
);

const emPublic = (caminho: string) =>
  path.join(process.cwd(), "public", decodeURI(caminho));

// Largura e altura reais de um .webp ou .png, lidas do cabeçalho, para o
// <img> reservar a proporção certa mesmo quando a mídia é trocada.
function medidas(arquivo: string): [number, number] | null {
  const b = fs.readFileSync(arquivo);
  const tipo = b.toString("ascii", 12, 16);
  if (b.toString("ascii", 0, 4) === "RIFF") {
    if (tipo === "VP8X")
      return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (tipo === "VP8 ")
      return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (tipo === "VP8L") {
      const n = b.readUInt32LE(21);
      return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1];
    }
  }
  if (b[0] === 0x89 && b.toString("ascii", 1, 4) === "PNG")
    return [b.readUInt32BE(16), b.readUInt32BE(20)];
  return null;
}

/** Imagem de public/ (caminho começando em /media/...). Sem o arquivo, volta o retângulo no tamanho pedido. */
export function figuraPublica(
  caminho: string,
  alt: string,
  width: number,
  height: number,
  posicao?: string,
): Figura {
  const arquivo = emPublic(caminho);
  if (!fs.existsSync(arquivo))
    return { src: null, width, height, alt, posicao };
  const [w, h] = medidas(arquivo) ?? [width, height];
  return { src: caminho, width: w, height: h, alt, posicao };
}

/** Imagem referenciada por um .md da coleção: ./cartazes/x.webp ou /media/x.webp. */
export async function figuraDoTrabalho(
  caminho: string | null | undefined,
  alt: string,
  largura = 1200,
): Promise<Figura> {
  const width = largura;
  const height = Math.round((largura * 5) / 4);
  if (!caminho) return { src: null, width, height, alt };
  if (caminho.startsWith("/"))
    return figuraPublica(caminho, alt, width, height);
  const chave = "/src/content/trabalhos/" + caminho.replace(/^\.\//, "");
  const modulo = daColecao[chave];
  if (!modulo) return { src: null, width, height, alt };
  const larguras = [480, 800, largura].filter((w) => w <= modulo.default.width);
  const imagem = await getImage({
    src: modulo.default,
    width,
    height,
    fit: "cover",
    format: "webp",
    widths: larguras.length ? larguras : undefined,
  });
  return {
    src: imagem.src,
    srcset: imagem.srcSet.attribute || undefined,
    width,
    height,
    alt,
  };
}

export type Trabalho = CollectionEntry<"trabalhos">;

export async function trabalhosOrdenados() {
  const todos = await getCollection("trabalhos");
  return todos.sort(
    (a, b) =>
      a.data.ordem - b.data.ordem ||
      a.data.titulo.localeCompare(b.data.titulo, "pt-BR"),
  );
}

export function legendaCartaz(t: Trabalho) {
  const { personagem, titulo, atorOriginal } = t.data;
  return atorOriginal
    ? `${personagem}, de ${atorOriginal}, no cartaz de ${titulo}`
    : `Microfone de estúdio, referência à narração de ${titulo}`;
}

// Retratos do Bruno: o gerado só entra com a aprovação dele (site.imagensIaAprovadas).
export function retratoBruno(
  gerado: string,
  real: string,
  alt: string,
  posicaoReal?: string,
): Figura {
  if (site.imagensIaAprovadas) {
    const figura = figuraPublica(gerado, alt, 1600, 2000);
    if (figura.src) return figura;
  }
  return figuraPublica(real, alt, 1600, 2000, posicaoReal);
}

/** V2 quando disponível; a versão anterior mantém a fotografia durante a produção da mídia. */
export async function imagemBruno(
  uso: "hero" | "heroMobile" | "retrato" | "encaixe" | "perfil" | "close" | "microfone",
): Promise<Figura> {
  const buscas = {
    hero: ["/media/v2/hero-poster.webp", "/media/bruno/retrato-microfone.webp"],
    heroMobile: ["/media/v2/bruno/hero-mobile.webp", "/media/v2/hero-poster.webp", "/media/bruno/retrato-microfone.webp"],
    retrato: [
      "/media/v2/bruno/retrato-poster.webp",
      "/media/v2/bruno/retrato.webp",
      "/media/bruno/retrato-poster.webp",
    ],
    // O enquadramento comum dos rostos (olhos nivelados a 40% da altura, 30% da
    // largura entre eles, nariz no centro): lentes, "Os rostos" e o controle
    // "Original ↔ Versão brasileira". Os rostos dos atores seguem o mesmo.
    encaixe: [
      "/media/v2/bruno/encaixe.webp",
      "/media/v2/bruno/retrato.webp",
    ],
    perfil: [
      "/media/v2/bruno/perfil.webp",
      "/media/bruno/retrato-microfone.webp",
    ],
    close: [
      "/media/v2/bruno/close.webp",
      "/media/v2/bruno/close-rodape.webp",
      "/media/bruno/close-rodape.webp",
    ],
    microfone: [
      "/media/v2/bruno/microfone.webp",
      "/media/v2/bruno/retrato-microfone.webp",
      "/media/bruno/retrato-microfone.webp",
    ],
  };
  const candidatos = site.imagensIaAprovadas
    ? buscas[uso]
    : ["/media/fotos/bruno-estudio.webp"];
  const caminho =
    candidatos.find((p) => fs.existsSync(emPublic(p))) ??
    "/media/fotos/bruno-estudio.webp";
  const alt =
    uso === "hero"
      ? "Bruno Azevedo na cabine de dublagem, com fones e microfone"
      : "Retrato de Bruno Azevedo";
  const fonte = daMidia["/public" + caminho]?.default;
  if (!fonte) return figuraPublica(caminho, alt, 1600, 2000);
  const larguras = (
    uso === "hero" ? [640, 960, 1440, 1920, 2560] : [480, 800, 1200, 1600]
  ).filter((w) => w <= fonte.width);
  const imagem = await getImage({
    src: fonte,
    widths: larguras,
    width: Math.max(...larguras),
    format: "webp",
    quality: 88,
  });
  return {
    src: imagem.src,
    srcset: imagem.srcSet.attribute,
    width: fonte.width,
    height: fonte.height,
    alt,
  };
}

export function videosHero() {
  return ["/media/v2/hero.webm", "/media/v2/hero.mp4"].filter((p) =>
    fs.existsSync(emPublic(p)),
  );
}
