import { gsap, type Opcoes } from "./shared";
import { estadoCena, atualizarCena } from "./cena";
export function hero(_: Opcoes) {
  const secao = document.querySelector<HTMLElement>("[data-hero]");
  if (!secao) return;
  const media = secao.querySelector("[data-hero-midia]");
  const foto = secao.querySelector("[data-hero-midia] .figura");
  const pausa = secao.querySelector<HTMLButtonElement>("[data-hero-pausa]");
  const video = secao.querySelector<HTMLVideoElement>("[data-hero-video]");
  const conexao = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (video && !conexao?.saveData) {
    video
      .querySelectorAll<HTMLSourceElement>("source[data-src]")
      .forEach((s) => {
        s.src = s.dataset.src!;
      });
    video.load();
  }
  let pausado = false;
  const nevoa = gsap.to(".hero__nevoa", {
    xPercent: 3,
    yPercent: -2,
    duration: 18,
    ease: "sine.inOut",
    paused: true,
  });
  const deriva = gsap.to(foto, {
    scale: 1.065,
    xPercent: -1.2,
    duration: 14,
    ease: "sine.inOut",
    paused: true,
  });
  const observador = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !pausado) {
      deriva.play();
      nevoa.play();
      video?.play().catch(() => {});
    } else {
      deriva.pause();
      nevoa.pause();
      video?.pause();
    }
  });
  observador.observe(secao);
  const alternar = () => {
    pausado = !pausado;
    pausa?.setAttribute("aria-pressed", String(pausado));
    if (pausa) pausa.textContent = pausado ? "Retomar imagem" : "Pausar imagem";
    if (pausado) {
      deriva.pause();
      nevoa.pause();
      video?.pause();
    } else {
      deriva.play();
      nevoa.play();
      video?.play().catch(() => {});
    }
  };
  pausa?.addEventListener("click", alternar);
  const linha = gsap.timeline({
    scrollTrigger: {
      trigger: secao,
      start: "top top",
      end: "bottom bottom",
      // O Lenis já suaviza a rolagem; um atraso a mais aqui deixa tudo arrastado.
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  // O diafragma 3D encolhe até o centro e sai; no lugar dele as duas lentes
  // (anel renderizado + foto, um elemento só) se abrem para os lados.
  linha
    .to(
      estadoCena,
      { hero: 1, duration: 1, ease: "none", onUpdate: atualizarCena },
      0,
    )
    .fromTo(
      "[data-hero-objeto]",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.14, ease: "none" },
      0.08,
    )
    .to("[data-hero-objeto]", { autoAlpha: 0, duration: 0.12, ease: "none" }, 0.34)
    .to(
      ".hero__conteudo",
      { yPercent: -12, autoAlpha: 0, duration: 0.28, ease: "none" },
      0,
    )
    .to("[data-hero-ui]", { autoAlpha: 0, duration: 0.18, ease: "none" }, 0)
    .to(media, { autoAlpha: 0, scale: 0.87, duration: 0.5, ease: "none" }, 0.1)
    .fromTo(
      "[data-hero-dupla]",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.14, ease: "none" },
      0.32,
    )
    .fromTo(
      '[data-lente="esq"]',
      { xPercent: 52, scale: 0.82 },
      { xPercent: 0, scale: 1, duration: 0.4, ease: "power2.out" },
      0.32,
    )
    .fromTo(
      '[data-lente="dir"]',
      { xPercent: -52, scale: 0.82 },
      { xPercent: 0, scale: 1, duration: 0.4, ease: "power2.out" },
      0.32,
    )
    .fromTo(
      ".lente__anel",
      { rotation: -24 },
      { rotation: 18, duration: 0.68, ease: "none" },
      0.32,
    )
    .fromTo(
      "[data-lente-legenda]",
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.18, ease: "none", stagger: 0.04 },
      0.62,
    );
  const visibilidade = () => {
    if (document.hidden) {
      deriva.pause();
      nevoa.pause();
      video?.pause();
    }
  };
  document.addEventListener("visibilitychange", visibilidade);
  return () => {
    linha.scrollTrigger?.kill();
    linha.kill();
    deriva.kill();
    nevoa.kill();
    observador.disconnect();
    pausa?.removeEventListener("click", alternar);
    document.removeEventListener("visibilitychange", visibilidade);
  };
}
