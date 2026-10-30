import Lenis from "lenis";
import { entradasRestantes, gsap, ScrollTrigger, type Limpeza } from "./shared";
import { intro } from "./intro";
import { hero } from "./hero";
import { rostos } from "./rostos";
import { trabalhos } from "./trabalhos";
import { oficios } from "./oficios";
import { audios } from "./audios";
import { sobre } from "./sobre";
import { filmografia } from "./filmografia";
import { contato } from "./contato";
import { rodape } from "./rodape";

// Avisa ao script inline do <head> que o movimento subiu (senão ele mostra tudo).
const raiz = document.documentElement;
raiz.setAttribute("data-movimento", "");

const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
intro(reduzido);

const midia = gsap.matchMedia();
midia.add(
  {
    celular: "(max-width: 760px)",
    movimento: "(prefers-reduced-motion: no-preference)",
  },
  (contexto) => {
    const { celular, movimento } = contexto.conditions as {
      celular: boolean;
      movimento: boolean;
    };
    // Movimento reduzido: sem Lenis, sem palco fixo, sem rolagem amarrada.
    // O CSS já deixa tudo visível; aqui não há nada a fazer.
    if (!movimento) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (tempo: number) => lenis.raf(tempo * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const opcoes = { celular };
    const limpezas: Limpeza[] = [
      hero,
      rostos,
      trabalhos,
      oficios,
      audios,
      sobre,
      filmografia,
      contato,
      rodape,
    ].map((secao) => secao(opcoes));
    entradasRestantes();

    // Fontes e imagens mudam alturas: medir de novo quando assentarem.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh(), {
      once: true,
    });

    return () => {
      limpezas.reverse().forEach((limpar) => limpar?.());
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  },
);
