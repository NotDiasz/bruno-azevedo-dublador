import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export type Opcoes = { celular: boolean };
export type Limpeza = (() => void) | void;

// Curvas da casa (references/motion.md da taste-skill) em formato GSAP.
export const curva = {
  saida: "expo.out",
  entrada: "power3.out",
  vai: "power3.inOut",
};

// As entradas disparam quando o elemento encosta na borda de baixo da tela.
// Até lá ele fica visível: o estado escondido só é aplicado no instante em que
// a entrada começa (immediateRender: false), então nada que ainda não foi
// rolado fica invisível para quem pula direto para lá ou para quem mede a página.
export const INICIO = "top bottom-=40";

const reclamados = new WeakSet<Element>();

/** Marca elementos cuja entrada uma seção faz por conta própria e tira o esconderijo do CSS. */
export function reclamar(...elementos: Element[]) {
  elementos.forEach((el) => reclamados.add(el));
  gsap.set(elementos, { autoAlpha: 1, y: 0 });
}

/** Linha do tempo de entrada que só aplica o estado inicial quando dispara. */
export function aoEntrar(gatilho: Element, inicio = INICIO) {
  return gsap.timeline({
    defaults: { immediateRender: false },
    scrollTrigger: { trigger: gatilho, start: inicio, once: true },
  });
}

/**
 * Entrada de uma seção: as partes chegam em ordem de leitura, subindo e
 * aparecendo, uma vez, quando o gatilho entra na tela.
 */
export function entrar(
  alvos: Element[] | NodeListOf<Element>,
  gatilho: Element,
  { y = 24, intervalo = 0.075, duracao = 0.8, inicio = INICIO } = {},
) {
  const lista = [...alvos].filter(Boolean);
  if (!lista.length) return;
  reclamar(...lista);
  return aoEntrar(gatilho, inicio).fromTo(
    lista,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: duracao,
      ease: curva.saida,
      stagger: intervalo,
    },
  );
}

/** O que nenhuma seção pegou para si ganha a entrada padrão, para nada ficar escondido. */
export function entradasRestantes() {
  const sobra = [...document.querySelectorAll("[data-entra]")].filter(
    (el) => !reclamados.has(el),
  );
  return sobra.map((el) => entrar([el], el));
}
