import {
  aindaAbaixo,
  aoEntrar,
  curva,
  entrar,
  reclamar,
  type Opcoes,
} from "./shared";

/** Contato: o título, depois o e-mail subindo linha a linha, depois a base. */
export function contato(_: Opcoes) {
  const secao = document.querySelector<HTMLElement>("[data-contato]");
  if (!secao) return;
  const titulo = entrar(
    secao.querySelectorAll(".contato__abertura [data-entra]"),
    secao,
  );
  const email = secao.querySelector<HTMLElement>(".contato__email");
  let subida: ReturnType<typeof aoEntrar> | undefined;
  if (email) {
    reclamar(email);
    if (aindaAbaixo(email))
      subida = aoEntrar(email).fromTo(
        email.children,
        { yPercent: 40, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: curva.saida,
          stagger: 0.1,
        },
        0,
      );
  }
  const base = entrar(
    secao.querySelectorAll(".contato__base [data-entra]"),
    secao.querySelector(".contato__base") ?? secao,
  );
  return () =>
    [titulo, subida, base].forEach((t) => {
      t?.scrollTrigger?.kill();
      t?.revert();
    });
}
