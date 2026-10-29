// Dados do site num lugar só. O que está marcado [a confirmar] é placeholder:
// trocar pelos dados reais do Bruno antes de publicar.
export const site = {
  name: "Bruno Azevedo",
  title: "Bruno Azevedo, dublador, diretor de dublagem e narrador",
  description:
    "Bruno Azevedo dá voz em português a Joel Kinnaman, Joe Alwyn e Michael Sirow, dirige dublagem e narra o DLS 2026.",
  handle: "@brunomirage",
  // [a confirmar] e-mail de contato
  email: "contato@brunoazevedo.com.br",
  // [a confirmar] telefone com DDD
  telefone: "[a confirmar]",
  // [a confirmar] cidade onde atende
  cidade: "[a confirmar]",
  estudio: "Atma Entretenimento",
  redes: [
    {
      nome: "Instagram",
      rotulo: "@brunomirage",
      href: "https://www.instagram.com/brunomirage/",
    },
    {
      nome: "Podcast",
      rotulo: "@podescontrair_",
      href: "https://www.instagram.com/podescontrair_/",
    },
  ],
  // Liberadas para a prévia local pelo Miguel. A publicação depende da aprovação do Bruno.
  imagensIaAprovadas: true,
} as const;

export const navegacao = [
  { href: "/trabalhos/", rotulo: "Trabalhos" },
  { href: "/#servicos", rotulo: "Serviços" },
  { href: "/#sobre", rotulo: "Sobre" },
  { href: "/#contato", rotulo: "Contato" },
] as const;

export const tipos = {
  filme: "Filme",
  serie: "Série",
  animacao: "Animação",
  jogo: "Jogo",
  publicidade: "Publicidade",
  narracao: "Narração",
  direcao: "Direção",
} as const;

export const funcoes = {
  dublagem: "Dublagem",
  direcao: "Direção de dublagem",
  narracao: "Narração",
} as const;

export function mailto(assunto: string, corpo = "") {
  const query = new URLSearchParams({
    subject: assunto,
    ...(corpo ? { body: corpo } : {}),
  });
  return `mailto:${site.email}?${query.toString().replace(/\+/g, "%20")}`;
}
