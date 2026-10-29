import { entrar, type Opcoes } from "./shared";
export function trabalhos(_: Opcoes) {
  const secao = document.querySelector("[data-trabalhos]");
  if (!secao) return;
  const alvos = [...secao.querySelectorAll("[data-entra]")];
  const entradas = alvos.map((el) => entrar([el], el, { y: 30, duracao: 0.8 }));
  return () =>
    entradas.forEach((t) => {
      t?.scrollTrigger?.kill();
      t?.revert();
    });
}
