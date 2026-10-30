import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei/core/Environment";
import * as THREE from "three";
import {
  abrirDiafragma,
  criarAmbiente,
  criarDiafragma,
  criarMicrofone,
  descartarObjeto,
} from "../lib/objetos3d";
import {
  escalaDiafragma,
  estadoCena,
  EVENTO_CENA,
} from "../scripts/motion/cena";

// Resolução da cena: reduzida enquanto as lâminas tomam a tela inteira no meio
// da intro, onde a resolução não aparece e cada pixel a mais custa um quadro
// perdido. A troca realoca o canvas (um quadro longo), por isso só acontece na
// intro e a volta fica para o fim dela, com a tela parada; na rolagem, nunca.
const DPR_CHEIO = 1.25;
const DPR_TELA_CHEIA = 0.75;

declare global {
  interface Window {
    __bruno3d?: Record<
      string,
      {
        quadros: number;
        ultimo: number;
        intervalos: number[];
        drawCalls: number;
        triangulos: number;
        visivel: boolean;
      }
    >;
  }
}
function Objeto({
  tipo,
  visivel,
  pronto,
}: {
  tipo: "diafragma" | "microfone";
  visivel: boolean;
  pronto: () => void;
}) {
  const { gl, invalidate } = useThree();
  const setDpr = useThree((estado) => estado.setDpr);
  const telaCheia = useRef(false);
  const ambiente = useMemo(() => criarAmbiente(gl), [gl]);
  const grupo = useMemo(() => new THREE.Group(), []);
  const principal = useMemo(
    () => (tipo === "diafragma" ? criarDiafragma() : criarMicrofone()),
    [tipo],
  );
  const inicial = useRef(true);
  useEffect(() => {
    grupo.add(principal);
    // O primeiro quadro sai já, mesmo fora da tela: é nele que os shaders
    // compilam, durante a espera antes da intro, e não no meio da rolagem.
    invalidate();
    return () => {
      descartarObjeto(principal);
      ambiente.dispose();
    };
  }, [principal, grupo, ambiente, invalidate]);
  useEffect(() => {
    const atualizar = () => {
      if (visivel && !document.hidden) invalidate();
    };
    document.addEventListener(EVENTO_CENA, atualizar);
    document.addEventListener("visibilitychange", atualizar);
    if (visivel) invalidate();
    return () => {
      document.removeEventListener(EVENTO_CENA, atualizar);
      document.removeEventListener("visibilitychange", atualizar);
    };
  }, [visivel, invalidate]);
  useFrame(() => {
    const s = estadoCena;
    if (tipo === "diafragma") {
      const t = s.hero;
      const celular = gl.domElement.clientWidth < 761;
      const escala = escalaDiafragma(celular);
      grupo.scale.setScalar(escala);
      const cheia = escala > 2.2 && s.intro < 1;
      if (cheia !== telaCheia.current) {
        telaCheia.current = cheia;
        setDpr(cheia ? DPR_TELA_CHEIA : DPR_CHEIO);
      }
      grupo.rotation.set(0.06 * t, 0.13 * Math.sin(t * Math.PI), -0.08 * t);
      abrirDiafragma(principal, Math.min(1, 0.02 + s.intro * 0.98 + t * 0.1));
    } else {
      const p = s.oficios;
      grupo.rotation.set(
        0.12 + Math.sin(p * Math.PI) * 0.12,
        -0.6 + p * Math.PI * 1.2,
        -0.18 + p * 0.27,
      );
      grupo.scale.setScalar(0.91 + 0.17 * Math.sin(p * Math.PI));
      grupo.position.y = Math.sin(p * Math.PI) * 0.08;
    }
    const agora = performance.now();
    window.__bruno3d ??= {};
    const info = (window.__bruno3d[tipo] ??= {
      quadros: 0,
      ultimo: 0,
      intervalos: [],
      drawCalls: 0,
      triangulos: 0,
      visivel,
    });
    if (info.ultimo && agora - info.ultimo < 200) {
      info.intervalos.push(agora - info.ultimo);
      if (info.intervalos.length > 600) info.intervalos.shift();
    }
    info.quadros++;
    info.ultimo = agora;
    info.drawCalls = gl.info.render.calls;
    info.triangulos = gl.info.render.triangles;
    info.visivel = visivel;
    if (inicial.current) {
      inicial.current = false;
      requestAnimationFrame(pronto);
    }
  });
  return (
    <>
      <Environment map={ambiente.texture} environmentIntensity={1.35} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[2, 4, 6]} intensity={3} color="#fff8e9" />
      <directionalLight position={[-4, 1, 2]} intensity={1.3} color="#dce7ef" />
      <primitive object={grupo} />
    </>
  );
}
export default function CenaEstudio({
  tipo,
  visivel,
  pronto,
  falhou,
}: {
  tipo: "diafragma" | "microfone";
  visivel: boolean;
  pronto: () => void;
  falhou: () => void;
}) {
  const celular =
    typeof matchMedia !== "undefined" &&
    matchMedia("(max-width:760px)").matches;
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, celular || tipo === "diafragma" ? DPR_CHEIO : 1.6]}
      camera={{ position: [0, 0, 6.8], fov: 38, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
        gl.domElement.addEventListener("webglcontextlost", falhou, {
          once: true,
        });
      }}
      fallback={null}
    >
      <Objeto tipo={tipo} visivel={visivel} pronto={pronto} />
    </Canvas>
  );
}
