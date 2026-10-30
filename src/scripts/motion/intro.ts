import { gsap } from "./shared";
import { estadoCena, atualizarCena, escalaDiafragma, RAIO_ANEL } from "./cena";
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
  const pularBotao = raiz?.querySelector("[data-intro-pular]");
  const fallback = objeto?.querySelector<HTMLElement>(".objeto3d__fallback");
  const celular = matchMedia("(max-width: 760px)").matches;
  /**
   * Um quadro da intro: o 3D (por evento), a imagem estática do diafragma e o
   * recorte da foto saem da mesma escala. A foto só aparece dentro do anel, e
   * o recorte some quando o anel passa das bordas da tela.
   */
  const revelar = () => {
    atualizarCena();
    const escala = escalaDiafragma(celular);
    // Movimento reduzido: a imagem fica parada no canto, como o CSS manda.
    if (fallback && !reduzido)
      gsap.set(fallback, { xPercent: -50, yPercent: -50, scale: escala });
    if (!media) return;
    const tem3d = objeto?.querySelector('[data-renderer="ativo"]');
    const base = tem3d ? window.innerHeight : (fallback?.offsetHeight ?? 0);
    const raio =
      RAIO_ANEL * base * escala * Math.min(1, estadoCena.intro * 12) * 0.97;
    media.style.clipPath =
      raio > Math.hypot(window.innerWidth, window.innerHeight) / 2
        ? "none"
        : `circle(${raio.toFixed(1)}px at 50% 50%)`;
  };
  let encerrada = false;
  let tl: gsap.core.Timeline | undefined;
  const concluir = () => {
    if (encerrada) return;
    encerrada = true;
    tl?.kill();
    document.documentElement.classList.add("intro-encerrada");
    if (raiz) raiz.hidden = true;
    gsap.set(letras, { clearProps: "all" });
    gsap.set(ui, { clearProps: "all" });
    gsap.set(".hero__conteudo", { visibility: "visible" });
    estadoCena.intro = 1;
    revelar();
    gsap.set(media, { clearProps: "clipPath" });
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
    revelar();
    tl = gsap.timeline({ onComplete: concluir });
    (window as any).__introTl = tl;
    tl.to(
      tracos,
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.04,
      },
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
          onUpdate: revelar,
        },
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
      .to(ui, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 2.65)
      .to(pularBotao ?? [], { autoAlpha: 0, duration: 0.3 }, 2.2);
    // Sem 3D (celular), a imagem estática do diafragma não abre as lâminas:
    // ela se dissolve enquanto cresce e a foto aparece por trás.
    if (!objeto?.querySelector('[data-renderer="ativo"]'))
      tl.to(objeto, { autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 1.55);
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
