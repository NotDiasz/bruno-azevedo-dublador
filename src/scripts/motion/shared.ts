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

// As entradas disparam quando o gatilho passa de 90% da altura da tela.
export const INICIO = "top 90%";

const reclamados = new WeakSet<Element>();

/** Marca elementos cuja entrada uma seção faz por conta própria. */
export function reclamar(...elementos: Element[]) {
  elementos.forEach((el) => reclamados.add(el));
}

/**
 * Só ganha entrada o que ainda está abaixo da tela: esse começa escondido e
 * aparece ao chegar. O que já está à vista (ou já passou, quando a página abre
 * no meio) fica como está. Esconder só no instante do gatilho fazia o elemento
 * aparecer, sumir e entrar de novo: o piscar dos títulos.
 */
export function aindaAbaixo(el: Element) {
  return el.getBoundingClientRect().top > window.innerHeight;
}

/** Linha do tempo de entrada, disparada uma vez quando o gatilho chega. */
export function aoEntrar(gatilho: Element, inicio = INICIO) {
  return gsap.timeline({
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
  const todos = [...alvos].filter(Boolean);
  reclamar(...todos);
  const lista = todos.filter(aindaAbaixo);
  if (!lista.length) return;
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
