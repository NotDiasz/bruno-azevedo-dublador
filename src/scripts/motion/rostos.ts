import { gsap, type Opcoes } from "./shared";
/** Um único pôster fixo; cada rosto abre pela lente e o scroll de volta recompõe a máscara. */
export function rostos(_: Opcoes) {
  const secao = document.querySelector<HTMLElement>("[data-rostos]");
  if (!secao) return;
  const paineis = [
    ...secao.querySelectorAll<HTMLElement>("[data-rostos-painel]"),
  ];
  const linha = gsap.timeline({
    scrollTrigger: {
      trigger: secao,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
  paineis.forEach((painel, i) => {
    if (i === 0) return;
    const quadro = painel.querySelector("[data-rostos-quadro]");
    const legenda = painel.querySelector("figcaption");
    const em = i - 0.45;
    linha
      .set(painel, { visibility: "visible" }, em)
      .fromTo(
        quadro,
        { clipPath: "circle(0% at 50% 50%)" },
        {
          clipPath: "circle(85% at 50% 50%)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        em,
      )
      .fromTo(
        legenda,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" },
        // Só depois que a lente abriu quase toda: antes disso o rosto anterior ainda domina o quadro.
        em + 0.5,
      )
      .to(
        paineis[i - 1].querySelector("figcaption"),
        { autoAlpha: 0, duration: 0.2 },
        em,
      );
  });
  linha.to({}, { duration: 0.4 });
  return () => {
    linha.scrollTrigger?.kill();
    linha.revert();
  };
}
