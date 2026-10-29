import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
const Cena = lazy(() => import("./CenaEstudio"));
type Tipo = "diafragma" | "microfone";
declare global {
  interface Window {
    /** Situação de cada cena 3D, lida pela intro (scripts/motion/intro.ts). */
    __bruno3dEstado?: Partial<Record<Tipo, "pronto" | "indisponivel">>;
    /** A intro cansou de esperar: quem não ficou pronto não monta mais. */
    __bruno3dDesistiu?: boolean;
  }
}
export const EVENTO_3D = "bruno:3d";

/**
 * Montar uma cena 3D (three.js, geometria, shaders) segura a thread principal
 * por meio segundo ou mais. Para isso nunca acontecer no meio da intro ou da
 * rolagem, as cenas se montam antes da intro, com a tela ainda preta, e a intro
 * espera por elas. No celular não há 3D: ficam as imagens renderizadas dele.
 */
function avisar(tipo: Tipo, estado: "pronto" | "indisponivel") {
  window.__bruno3dEstado = { ...window.__bruno3dEstado, [tipo]: estado };
  document.dispatchEvent(new Event(EVENTO_3D));
}

class ProtecaoWebGL extends Component<
  { children: ReactNode; falhou: () => void },
  { erro: boolean }
> {
  state = { erro: false };
  static getDerivedStateFromError() {
    return { erro: true };
  }
  componentDidCatch() {
    this.props.falhou();
  }
  render() {
    return this.state.erro ? null : this.props.children;
  }
}

/** A imagem está no HTML; só carregamos o renderer depois de testar as preferências. */
export default function Objeto3D({ tipo }: { tipo: Tipo }) {
  const raiz = useRef<HTMLDivElement>(null);
  const [permitido, setPermitido] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [pronto, setPronto] = useState(false);
  useEffect(() => {
    const reduzido = matchMedia("(prefers-reduced-motion: reduce)");
    const conexao = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const celular = matchMedia("(max-width: 760px)").matches;
    let suportado = false;
    if (!reduzido.matches && !conexao?.saveData && !celular && !window.__bruno3dDesistiu) {
      try {
        const prova = document.createElement("canvas");
        const gl = prova.getContext("webgl2", {
          failIfMajorPerformanceCaveat: true,
        });
        suportado = Boolean(gl);
      } catch {
        suportado = false;
      }
    }
    setPermitido(suportado);
    if (!suportado) avisar(tipo, "indisponivel");
    // A intro desistiu de esperar: se a cena ainda não ficou pronta, não monta mais.
    const desistir = () => {
      if (window.__bruno3dDesistiu && window.__bruno3dEstado?.[tipo] !== "pronto")
        setPermitido(false);
    };
    document.addEventListener(EVENTO_3D, desistir);
    const mudar = () => {
      if (reduzido.matches) {
        setPermitido(false);
        setPronto(false);
      } else setPermitido(suportado && !window.__bruno3dDesistiu);
    };
    reduzido.addEventListener("change", mudar);
    const observer = new IntersectionObserver(
      ([e]) => setVisivel(e.isIntersecting),
      { rootMargin: "100px" },
    );
    if (raiz.current) observer.observe(raiz.current);
    return () => {
      document.removeEventListener(EVENTO_3D, desistir);
      observer.disconnect();
      reduzido.removeEventListener("change", mudar);
    };
  }, [tipo]);
  return (
    <div
      className={`objeto3d objeto3d--${tipo}`}
      ref={raiz}
      data-objeto={tipo}
      data-renderer={pronto ? "ativo" : "estatico"}
      aria-hidden="true"
    >
      <img
        className="objeto3d__fallback"
        src={`/media/v2/3d/${tipo}.webp`}
        alt=""
        width="1200"
        height="1200"
        loading={tipo === "diafragma" ? "eager" : "lazy"}
        style={{ opacity: pronto ? 0 : 1 }}
      />
      {permitido && (
        <ProtecaoWebGL
          falhou={() => {
            setPermitido(false);
            setPronto(false);
            avisar(tipo, "indisponivel");
          }}
        >
          <Suspense fallback={null}>
            <Cena
              tipo={tipo}
              visivel={visivel}
              pronto={() => {
                setPronto(true);
                avisar(tipo, "pronto");
              }}
              falhou={() => {
                setPermitido(false);
                setPronto(false);
                avisar(tipo, "indisponivel");
              }}
            />
          </Suspense>
        </ProtecaoWebGL>
      )}
    </div>
  );
}
