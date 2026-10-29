import { aoEntrar, curva, entrar, reclamar, type Opcoes } from "./shared";

/** Contato: a frase, depois o e-mail subindo linha a linha, depois os cantos. */
export function contato(_: Opcoes) {
  const secao = document.querySelector<HTMLElement>("[data-contato]");
  if (!secao) return;
  const frase = entrar(secao.querySelectorAll(".contato__frase"), secao);
  const email = secao.querySelector<HTMLElement>(".contato__email");
  let subida: ReturnType<typeof aoEntrar> | undefined;
  if (email) {
    reclamar(email);
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
  const cantos = entrar(
    secao.querySelectorAll(".contato__pe > *"),
    secao.querySelector(".contato__pe") ?? secao,
  );
  return () =>
    [frase, subida, cantos].forEach((t) => {
      t?.scrollTrigger?.kill();
      t?.kill();
    });
}
