import { gsap, type Opcoes } from "./shared";
export function rodape(_: Opcoes) {
  const secao = document.querySelector("[data-rodape]");
  if (!secao) return;
  const linha = gsap.fromTo(
    secao.querySelector(".rodape__wordmark"),
    { yPercent: 18 },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: secao,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    },
  );
  return () => {
    linha.scrollTrigger?.kill();
    linha.revert();
  };
}
