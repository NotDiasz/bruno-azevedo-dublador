import { gsap, entrar, type Opcoes } from "./shared";
import { estadoCena, atualizarCena } from "./cena";
export function oficios(_: Opcoes) {
  const secao = document.querySelector("[data-oficios]");
  if (!secao) return;
  const animacao = gsap.to(estadoCena, {
    oficios: 1,
    ease: "none",
    scrollTrigger: {
      trigger: secao,
      start: "top 75%",
      end: "bottom top",
      scrub: true,
    },
    onUpdate: atualizarCena,
  });
  const entradas = [...secao.querySelectorAll("[data-oficio]")].map((el) =>
    entrar(el.querySelectorAll("[data-entra]"), el, { y: 32, intervalo: 0.08 }),
  );
  return () => {
    animacao.scrollTrigger?.kill();
    animacao.kill();
    entradas.forEach((t) => {
      t?.scrollTrigger?.kill();
      t?.revert();
    });
  };
}
