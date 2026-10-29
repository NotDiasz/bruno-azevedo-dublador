import { gsap, entrar, type Opcoes } from "./shared";
export function sobre(_: Opcoes) {
  const secao = document.querySelector("[data-sobre]");
  if (!secao) return;
  const foto = secao.querySelector("[data-sobre-quadro] .figura");
  const movimento = gsap.fromTo(
    foto,
    { scale: 1.12, yPercent: -3 },
    {
      scale: 1.12,
      yPercent: 3,
      ease: "none",
      scrollTrigger: {
        trigger: secao,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );
  const entrada = entrar(secao.querySelectorAll("[data-entra]"), secao, {
    y: 32,
    intervalo: 0.1,
  });
  return () => {
    movimento.scrollTrigger?.kill();
    movimento.revert();
    entrada?.scrollTrigger?.kill();
    entrada?.revert();
  };
}
