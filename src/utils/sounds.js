// Sonidos sintéticos con Web Audio API (sin archivos externos)
// volume: 0-100

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

// Beep suave al elegir opción
export function playSelect(volume = 50) {
  if (volume <= 0) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const vol = (volume / 100) * 0.2;
    osc.type = "sine";
    osc.frequency.value = 520;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Silenciar errores si el navegador no soporta audio
  }
}

// Tono grave cuando se acaba el tiempo
export function playTimeout(volume = 50) {
  if (volume <= 0) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const vol = (volume / 100) * 0.25;
    osc.type = "sine";
    osc.frequency.value = 220;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Silenciar errores
  }
}

// Sonido de "completado" al terminar todos los dilemas
export function playComplete(volume = 50) {
  if (volume <= 0) return;
  try {
    const ctx = getAudioContext();
    const vol = (volume / 100) * 0.18;

    const notes = [523, 659, 784]; // Do - Mi - Sol
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = freq;

      const startTime = ctx.currentTime + i * 0.12;
      gain.gain.setValueAtTime(vol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  } catch (e) {
    // Silenciar errores
  }
}
