import { useEffect, useState } from "react";

type Tipo = { valor: string; rotulo: string; quantidade: number };

type Props = {
  tipos: Tipo[];
  total: number;
};

// Filtro por tipo da página /trabalhos/. Sem JS ele não aparece e a lista
// inteira fica à vista; com JS, esconde as linhas de outros tipos.
export default function FiltroTrabalhos({ tipos, total }: Props) {
  const [montado, setMontado] = useState(false);
  const [escolhido, setEscolhido] = useState("todos");

  useEffect(() => {
    setMontado(true);
    const doEndereco = new URLSearchParams(location.search).get("tipo");
    if (doEndereco && tipos.some((t) => t.valor === doEndereco)) setEscolhido(doEndereco);
  }, [tipos]);

  useEffect(() => {
    if (!montado) return;
    document.querySelectorAll<HTMLElement>("[data-tipo]").forEach((linha) => {
      linha.hidden = escolhido !== "todos" && linha.dataset.tipo !== escolhido;
    });
    const url = new URL(location.href);
    if (escolhido === "todos") url.searchParams.delete("tipo");
    else url.searchParams.set("tipo", escolhido);
    history.replaceState(history.state, "", url);
  }, [escolhido, montado]);

  if (!montado || tipos.length < 2) return null;
  const opcoes = [{ valor: "todos", rotulo: "Todos", quantidade: total }, ...tipos];
  const visiveis = opcoes.find((o) => o.valor === escolhido)?.quantidade ?? total;

  return (
    <div className="filtro" role="group" aria-label="Filtrar trabalhos por tipo">
      {opcoes.map((opcao) => (
        <button
          key={opcao.valor}
          type="button"
          className="filtro__opcao"
          aria-pressed={escolhido === opcao.valor}
          onClick={() => setEscolhido(opcao.valor)}
        >
          {opcao.rotulo} <span className="filtro__quantidade">{opcao.quantidade}</span>
        </button>
      ))}
      <p className="sr-only" aria-live="polite">
        {visiveis} {visiveis === 1 ? "trabalho" : "trabalhos"} na lista
      </p>
    </div>
  );
}
