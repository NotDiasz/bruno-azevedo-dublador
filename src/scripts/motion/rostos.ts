import { gsap, type Opcoes } from "./shared";
/** Um único pôster fixo; cada rosto abre pela lente e o scroll de volta recompõe a máscara. */
export function rostos(_: Opcoes) {
  const secao = document.querySelector<HTMLElement>("[data-rostos]");
  if (!secao) return;
  const paineis = [
    ...secao.querySelectorAll<HTMLElement>("[data-rostos-painel]"),
  ];
  const linha = gsap.timeline({
    defaults: { immediateRender: false },
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
    const anterior = paineis[i - 1].querySelector("figcaption");
    const em = i - 0.45;
    // As legendas trocam no meio da abertura, quando o rosto novo já domina o
    // quadro: uma sai e a outra entra em seguida, sem as duas na tela juntas e
    // sem um trecho longo sem nenhuma.
    gsap.set(legenda, { autoAlpha: 0 });
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
        anterior,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0, y: -8, duration: 0.14, ease: "none" },
        em + 0.2,
      )
      .fromTo(
        legenda,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
        em + 0.36,
      );
  });
  linha.to({}, { duration: 0.4 });
  return () => {
    linha.scrollTrigger?.kill();
    linha.revert();
  };
}
