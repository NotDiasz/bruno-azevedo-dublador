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

/**
 * Raio externo do anel do diafragma, como fração da altura da cena: câmera de
 * fov 38 a 6,8 de distância e anel de raio 1,85. Vale para o 3D (altura da
 * tela) e para a imagem renderizada dele (altura da imagem).
 */
export const RAIO_ANEL = 0.395;

/**
 * Escala do diafragma: cresce na intro (a câmera atravessa a lente) e encolhe
 * até o centro na rolagem da hero. O 3D e a imagem estática usam a mesma conta,
 * para os dois e o recorte da foto andarem juntos.
 */
export function escalaDiafragma(celular: boolean) {
  const { intro, hero } = estadoCena;
  const inicio = 1 + Math.pow(intro, 3) * 5.2;
  const fim = celular ? 0.24 : 0.67;
  return inicio + (fim - inicio) * Math.min(1, hero * 1.7);
}
