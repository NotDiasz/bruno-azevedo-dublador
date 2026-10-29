import { entrar, type Opcoes } from "./shared";

/** Filmografia: o título e depois as linhas, uma a uma, como uma ficha sendo lida. */
export function filmografia(_: Opcoes) {
  const secao = document.querySelector<HTMLElement>("[data-filmografia]");
  if (!secao) return;
  const titulo = entrar(secao.querySelectorAll(".filmografia__titulo"), secao, {
    y: 20,
  });
  const linhas = entrar(
    secao.querySelectorAll("tr[data-entra]"),
    secao.querySelector("table") ?? secao,
    {
      y: 16,
      intervalo: 0.06,
      duracao: 0.6,
    },
  );
  return () =>
    [titulo, linhas].forEach((t) => {
      t?.scrollTrigger?.kill();
      t?.kill();
    });
}
