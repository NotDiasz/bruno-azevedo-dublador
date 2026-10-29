import { gsap } from "./shared";
import { estadoCena, atualizarCena } from "./cena";
export const FIM_DA_INTRO = "bruno:intro-fim";
// Mesmo nome de EVENTO_3D em components/Objeto3D.tsx (a ilha não importa o GSAP).
const EVENTO_3D = "bruno:3d";
declare global {
  interface Window {
    __brunoIntroFim?: boolean;
  }
}
export function intro(reduzido: boolean) {
  const raiz = document.querySelector<HTMLElement>("[data-intro]");
  const media = document.querySelector<HTMLElement>("[data-hero-midia]");
  const objeto = document.querySelector<HTMLElement>("[data-hero-objeto]");
  const letras = document.querySelectorAll("[data-hero-letra]");
  const ui = document.querySelectorAll("[data-hero-ui]");
  const selo = raiz?.querySelector("[data-intro-selo]");
  let encerrada = false;
  let tl: gsap.core.Timeline | undefined;
  const concluir = () => {
    if (encerrada) return;
    encerrada = true;
    tl?.kill();
    document.documentElement.classList.add("intro-encerrada");
    if (raiz) raiz.hidden = true;
    gsap.set(media, { clearProps: "clipPath" });
    gsap.set(letras, { clearProps: "all" });
    gsap.set(ui, { clearProps: "all" });
    gsap.set(".hero__conteudo", { visibility: "visible" });
    estadoCena.intro = 1;
    atualizarCena();
    gsap.set(objeto, { autoAlpha: 0 });
    window.__brunoIntroFim = true;
    document.dispatchEvent(new Event(FIM_DA_INTRO));
    window.removeEventListener("keydown", tecla);
    window.removeEventListener("wheel", pular);
    window.removeEventListener("touchmove", pular);
    window.removeEventListener("scroll", aoRolar);
  };
  const pular = () => concluir();
  const tecla = (e: KeyboardEvent) => {
    if (["Escape", "Tab", " ", "ArrowDown", "PageDown", "End"].includes(e.key))
      concluir();
  };
  const aoRolar = () => {
    if (scrollY > 8) concluir();
  };
  if (
    !raiz ||
    !media ||
    reduzido ||
    document.documentElement.classList.contains("intro-encerrada")
  ) {
    concluir();
    return;
  }
  window.addEventListener("keydown", tecla);
  window.addEventListener("wheel", pular, { passive: true });
  window.addEventListener("touchmove", pular, { passive: true });
  window.addEventListener("scroll", aoRolar, { passive: true });
  raiz
    .querySelector("[data-intro-pular]")
    ?.addEventListener("click", pular, { once: true });
  gsap.set(ui, { autoAlpha: 0 });
  gsap.set(letras, { yPercent: 115, rotation: 3 });
  gsap.set(".hero__conteudo", { visibility: "visible" });
  gsap.set(objeto, { autoAlpha: 0 });
  const caminhos = [...raiz.querySelectorAll<SVGPathElement>("path")];
  const tracos = raiz.querySelectorAll("path,circle");
  caminhos.forEach((p) => {
    const tamanho = p.getTotalLength();
    gsap.set(p, { strokeDasharray: tamanho, strokeDashoffset: tamanho });
  });
  esperarCenas3D(() => {
    if (!encerrada) comecar();
  });
  return concluir;

  function comecar() {
  tl = gsap.timeline({ onComplete: concluir });
  (window as any).__introTl = tl;
  tl.to(
    tracos,
    { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.04 },
    0,
  )
    .to(
      caminhos,
      {
        fill: getComputedStyle(document.documentElement).getPropertyValue(
          "--ink",
        ),
        duration: 0.25,
      },
      0.5,
    )
    .to(
      selo ?? [],
      { autoAlpha: 0, scale: 1.25, duration: 0.45, ease: "power2.in" },
      0.65,
    )
    .to(objeto, { autoAlpha: 1, duration: 0.6 }, 0.65)
    .to(
      estadoCena,
      {
        intro: 1,
        duration: 2.35,
        ease: "power3.inOut",
        onUpdate: atualizarCena,
      },
      0.8,
    )
    .fromTo(
      media,
      { clipPath: "circle(0% at 50% 50%)" },
      {
        clipPath: "circle(150% at 50% 50%)",
        duration: 2.05,
        ease: "power3.inOut",
      },
      0.85,
    )
    .to(
      ".hero__objeto .objeto3d__fallback",
      { scale: 6, duration: 2.35, ease: "power3.inOut" },
      0.8,
    )
    .to(
      letras,
      {
        yPercent: 0,
        rotation: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: "power3.out",
      },
      2.2,
    )
    .to(ui, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 2.65);
  }
}

/**
 * No desktop, as cenas 3D (Objeto3D.tsx) se montam com a tela ainda preta e a
 * intro só começa quando elas avisam; assim a montagem nunca trava a intro nem
 * a rolagem. Passado o limite, elas desistem e ficam as imagens estáticas.
 */
function esperarCenas3D(seguir: () => void) {
  const tipos = ["diafragma", "microfone"] as const;
  const prontas = () => tipos.every((t) => window.__bruno3dEstado?.[t]);
  if (matchMedia("(max-width: 760px)").matches || prontas()) return seguir();
  let feito = false;
  const terminar = () => {
    if (feito) return;
    feito = true;
    clearTimeout(limite);
    document.removeEventListener(EVENTO_3D, conferir);
    seguir();
  };
  const conferir = () => {
    if (prontas()) terminar();
  };
  const limite = setTimeout(() => {
    window.__bruno3dDesistiu = true;
    document.dispatchEvent(new Event(EVENTO_3D));
    terminar();
  }, 2000);
  document.addEventListener(EVENTO_3D, conferir);
}
