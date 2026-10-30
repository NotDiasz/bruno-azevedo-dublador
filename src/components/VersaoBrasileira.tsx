import { useEffect, useState, type CSSProperties } from "react";
import type { Figura } from "../lib/midia";

export type ItemVersao = {
  id: string;
  titulo: string;
  personagem: string;
  atorOriginal: string | null;
  obra: string;
  cartaz: Figura;
  original: Figura | null;
  exemplo: boolean;
};

type Props = {
  itens: ItemVersao[];
  bruno: Figura;
};

function Imagem({ figura, className }: { figura: Figura; className?: string }) {
  if (!figura.src)
    return (
      <span
        className={`figura figura--reserva ${className ?? ""}`}
        role="img"
        aria-label={figura.alt}
      />
    );
  return (
    <img
      className={`figura ${className ?? ""}`}
      src={figura.src}
      srcSet={figura.srcset}
      sizes="(max-width: 760px) 90vw, 42vw"
      width={figura.width}
      height={figura.height}
      alt={figura.alt}
      loading="lazy"
      decoding="async"
      style={figura.posicao ? { objectPosition: figura.posicao } : undefined}
    />
  );
}

// A coisa viva: no quadro fixo da seção Trabalhos, o polegar arrasta a divisa
// entre o rosto do ator original e o do Bruno, e o crédito acompanha. O quadro
// mostra o trabalho cujo nome está cruzando o meio da tela.
export default function VersaoBrasileira({ itens, bruno }: Props) {
  const [atual, setAtual] = useState(0);
  // Posição da divisa, de 0 (só a versão brasileira) a 100 (só o original).
  const [divisa, setDivisa] = useState(50);
  const item = itens[atual];

  // O quadro troca de imagem enquanto os nomes passam; sem pré-carga, a metade
  // do original aparece vazia até o arquivo chegar.
  useEffect(() => {
    for (const { original, cartaz } of itens) {
      const figura = original ?? cartaz;
      if (!figura.src) continue;
      const img = new Image();
      img.sizes = "(max-width: 760px) 90vw, 42vw";
      if (figura.srcset) img.srcset = figura.srcset;
      img.src = figura.src;
    }
  }, [itens]);

  useEffect(() => {
    const nomes = [
      ...document.querySelectorAll<HTMLElement>("[data-trabalho-nome]"),
    ];
    if (!nomes.length) return;
    // Vale o nome mais perto do meio da tela, entre os que estão à vista. A
    // conta roda a cada rolagem (um quadro por vez) e logo ao montar: assim a
    // página aberta no meio da seção, ou um salto por âncora, já mostra o
    // trabalho certo.
    let pedido = 0;
    const escolher = () => {
      pedido = 0;
      const meio = window.innerHeight / 2;
      let melhor = -1;
      let distancia = Infinity;
      nomes.forEach((nome, indice) => {
        const r = nome.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const d = Math.abs(r.top + r.height / 2 - meio);
        if (d < distancia) [melhor, distancia] = [indice, d];
      });
      const escolhido = Number(nomes[melhor]?.dataset.trabalhoNome);
      if (melhor >= 0 && !Number.isNaN(escolhido)) setAtual(escolhido);
    };
    const aoRolar = () => {
      if (!pedido) pedido = requestAnimationFrame(escolher);
    };
    escolher();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  if (!item) return null;
  const temOriginal = Boolean(item.original && item.atorOriginal);
  const estilo = { "--divisa": `${divisa}%` } as CSSProperties;

  return (
    <div className="vb" data-com-original={temOriginal ? "" : undefined}>
      <div className="vb__quadro" style={estilo}>
        {itens.map((it, indice) => (
          <div
            className="vb__camada"
            data-ativa={indice === atual ? "" : undefined}
            key={it.id}
            aria-hidden={indice !== atual}
          >
            {it.original && it.atorOriginal ? (
              <>
                <Imagem figura={bruno} className="vb__bruno" />
                <div className="vb__original">
                  <Imagem figura={it.original} />
                </div>
              </>
            ) : (
              <Imagem figura={it.cartaz} />
            )}
          </div>
        ))}
        <span className="vb__veu" aria-hidden="true" />
        {temOriginal && (
          <>
            <span className="vb__linha" aria-hidden="true" />
            <input
              className="vb__controle"
              type="range"
              min={0}
              max={100}
              step={1}
              value={divisa}
              onChange={(evento) => setDivisa(Number(evento.target.value))}
              aria-label={`Divisa entre ${item.atorOriginal} no original e Bruno Azevedo na versão brasileira`}
              aria-valuetext={
                divisa >= 66
                  ? `Mais original: ${item.atorOriginal}`
                  : divisa <= 34
                    ? "Mais versão brasileira: Bruno Azevedo"
                    : "Metade original, metade versão brasileira"
              }
            />
          </>
        )}
      </div>

      {temOriginal ? (
        <>
          <button
            type="button"
            className="vb__credito vb__credito--original"
            aria-pressed={divisa === 100}
            onClick={() => setDivisa(100)}
          >
            <span className="vb__papel">Original</span>
            <span className="vb__quem">{item.atorOriginal}</span>
          </button>
          <button
            type="button"
            className="vb__credito vb__credito--versao"
            aria-pressed={divisa === 0}
            onClick={() => setDivisa(0)}
          >
            <span className="vb__papel">Versão brasileira</span>
            <span className="vb__quem">Bruno Azevedo</span>
          </button>
        </>
      ) : (
        <>
          <p className="vb__credito vb__credito--original">
            <span className="vb__papel">Função</span>
            <span className="vb__quem">{item.personagem}</span>
          </p>
          <p className="vb__credito vb__credito--versao">
            <span className="vb__papel">Na voz de</span>
            <span className="vb__quem">Bruno Azevedo</span>
          </p>
        </>
      )}
      <p className="vb__obra" aria-live="polite">
        {item.obra}
        {item.exemplo && <span className="etiqueta-exemplo">Exemplo</span>}
      </p>
      <label className="vb__selecionar">
        Escolher trabalho
        <select
          value={atual}
          onChange={(evento) => setAtual(Number(evento.target.value))}
        >
          {itens.map((it, indice) => (
            <option value={indice} key={it.id}>
              {it.personagem}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
