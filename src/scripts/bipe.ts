// Bipe de sincronia da contagem, sintetizado na hora. O navegador só libera
// áudio depois de um gesto do visitante: até lá, `tocar` não faz nada.
export type Bipe = { liberar: () => void; tocar: (agudo?: boolean) => void; encerrar: () => void };

export function criarBipe(): Bipe {
  let contexto: AudioContext | undefined;
  return {
    liberar() {
      if (contexto) return;
      const Contexto = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Contexto) return;
      contexto = new Contexto();
      contexto.resume().catch(() => {});
    },
    tocar(agudo = false) {
      if (!contexto || contexto.state !== "running") return;
      const agora = contexto.currentTime;
      const oscilador = contexto.createOscillator();
      const volume = contexto.createGain();
      oscilador.type = "sine";
      oscilador.frequency.value = agudo ? 1320 : 1000;
      volume.gain.setValueAtTime(0, agora);
      volume.gain.linearRampToValueAtTime(0.16, agora + 0.008);
      volume.gain.setValueAtTime(0.16, agora + 0.11);
      volume.gain.linearRampToValueAtTime(0, agora + 0.13);
      oscilador.connect(volume).connect(contexto.destination);
      oscilador.start(agora);
      oscilador.stop(agora + 0.15);
    },
    encerrar() {
      contexto?.close().catch(() => {});
      contexto = undefined;
    },
  };
}
