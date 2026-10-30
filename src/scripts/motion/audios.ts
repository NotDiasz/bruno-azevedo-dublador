import {
  aindaAbaixo,
  aoEntrar,
  curva,
  gsap,
  reclamar,
  type Opcoes,
} from "./shared";

/**
 * Áudios: o mergulho no microfone. Com o palco preso na tela, a rolagem leva a
 * câmera para dentro da grade (a imagem cresce em direção a ela), uma grade
 * desenhada assume e se abre até o preto, a linha de som se desenha e o título
 * sobe. Depois as faixas entram uma a uma e as ondas crescem do centro.
 * Tudo em transform e opacity: nada repinta a tela durante a rolagem.
 */
export function audios(_: Opcoes) {
  const secao = document.querySelector<HTMLElement>("[data-audios]");
  if (!secao) return;
  const mergulho = secao.querySelector("[data-audios-mergulho]");
  const microfone = secao.querySelector("[data-audios-microfone]");
  const grade = secao.querySelector("[data-audios-grade]");
  const onda = secao.querySelector("[data-audios-onda]");
  const titulo = secao.querySelector("[data-audios-titulo]");
  const lead = secao.querySelector("[data-audios-lead]");
  if (!mergulho || !microfone || !grade || !onda) return;

  // Microfone e malha ficam centrados pelo próprio GSAP (dono do transform).
  gsap.set([microfone, grade], { xPercent: -50, yPercent: -50 });

  // O microfone novo surge enquanto o de Serviços sai por cima.
  const chegada = gsap.fromTo(
    microfone,
    { autoAlpha: 0, scale: 0.86 },
    {
      autoAlpha: 1,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: mergulho,
        start: "top 85%",
        end: "top top",
        scrub: true,
      },
    },
  );

  const linha = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: mergulho,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
  linha
    // A grade do microfone vem para o centro e cresce até tomar a tela.
    .fromTo(
      microfone,
      { scale: 1, xPercent: -50, yPercent: -50 },
      {
        scale: 16,
        xPercent: -53.3,
        yPercent: -25,
        duration: 0.5,
        ease: "power2.in",
      },
      0,
    )
    .to(microfone, { autoAlpha: 0, duration: 0.08 }, 0.46)
    // A malha desenhada assume no lugar da imagem, que já não tem resolução.
    // Ela cresce na mesma curva do microfone, com as células do tamanho das
    // da grade dele, e só aparece quando a grade do microfone já cobre a tela. Só a opacidade
    // muda (sem visibility): a malha é rasterizada uma vez, antes de aparecer.
    .fromTo(
      grade,
      { scale: 1 / 2.1 },
      { scale: 16 / 2.1, duration: 0.5, ease: "power2.in" },
      0,
    )
    .to(grade, { scale: 15, duration: 0.22, ease: "power1.in" }, 0.5)
    .fromTo(grade, { opacity: 0 }, { opacity: 0.85, duration: 0.08 }, 0.42)
    .to(grade, { opacity: 0, duration: 0.1 }, 0.62)
    // No preto, a linha de som se desenha da esquerda para a direita.
    .fromTo(
      onda,
      { strokeDasharray: 1, strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.22 },
      0.64,
    )
    .fromTo(
      titulo,
      { yPercent: 115 },
      { yPercent: 0, duration: 0.14, ease: curva.entrada },
      0.8,
    )
    .fromTo(
      lead,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.12, ease: curva.entrada },
      0.86,
    )
    .to({}, { duration: 0.04 });

  // Faixas: cada uma sobe ao chegar, e a onda dela cresce a partir do meio.
  const faixas = [...secao.querySelectorAll<HTMLElement>("[data-faixa]")];
  const entradas = faixas.map((faixa) => {
    const barras = faixa.querySelectorAll("[data-faixa-onda] span");
    reclamar(faixa);
    if (!aindaAbaixo(faixa)) return undefined;
    return aoEntrar(faixa)
      .fromTo(
        faixa,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: curva.saida },
      )
      .fromTo(
        barras,
        { scaleY: 0.08 },
        {
          scaleY: 1,
          duration: 0.7,
          ease: curva.saida,
          stagger: { each: 0.008, from: "center" },
        },
        0.1,
      );
  });

  return () => {
    [chegada, linha, ...entradas].forEach((t) => {
      t?.scrollTrigger?.kill();
      t?.revert();
    });
  };
}
