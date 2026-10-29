/** Estado mutável compartilhado: o scroll nunca provoca um render do React. */
export const estadoCena = {
  intro:
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("intro-encerrada")
      ? 1
      : 0,
  hero: 0,
  oficios: 0.08,
};
export const EVENTO_CENA = "bruno:cena";
export function atualizarCena() {
  document.dispatchEvent(new Event(EVENTO_CENA));
}
