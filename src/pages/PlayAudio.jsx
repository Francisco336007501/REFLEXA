import { useEffect, useState } from "react";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { useT } from "../context/UserContext";
import { HollowPostMode } from "../components/HollowPostMode";
import { PlayModeIntro } from "../components/PlayModeIntro";

// Modo Audio — Contexto 1 (voz calmada, neutra, sin dramatizar)
const DILEMA_AUDIO = {
  titulo: "Contexto 1",
  segmentos: [
    { text: "Estás solo. Frente a ti hay un panel de control. No sabes quién lo diseñó. Solo sabes que funciona.", pause: 480 },
    { text: "En la pantalla aparece una alerta. Un sistema automático va a fallar en segundos.", pause: 420 },
    { text: "Si no haces nada, el fallo afectará a cinco personas que no conoces. No las verás. No sabrás quiénes son.", pause: 620 },
    { text: "Si intervienes, el sistema redirige el fallo. El daño cae sobre una sola persona. La conoces. Has hablado con ella antes.", pause: 800 },
    { text: "No hay tercera opción. El daño va a ocurrir.", pause: 600 },
    { text: "Tienes pocos segundos. El sistema espera tu decisión.", pause: 700 },
    { text: "Opción A: Intervenir. Redirigir el daño hacia una sola persona conocida.", pause: 750 },
    { text: "Opción B: No intervenir. Dejar que el sistema siga su curso.", pause: 0 },
  ],
  opcionA: "Intervenir. Redirigir el daño hacia una sola persona conocida.",
  opcionB: "No intervenir. Dejar que el sistema siga su curso.",
  cierreA: "Elegiste intervenir. No hay respuesta correcta. Solo tú sabes por qué.",
  cierreB: "Elegiste no intervenir. No hay respuesta correcta. Solo tú sabes por qué.",
};

/** Prioriza voces LATAM (es-MX, es-AR, etc.) y luego cualquier español */
const LATAM_CODES = ["es-MX", "es-AR", "es-CO", "es-CL", "es-PE", "es-VE", "es-419"];
function getSpanishVoice() {
  const voices = typeof window !== "undefined" ? window.speechSynthesis?.getVoices() ?? [] : [];
  const es = voices.filter((v) => v.lang.startsWith("es"));
  if (es.length === 0) return null;
  const cloud = es.filter((v) => !v.localService);
  const pool = cloud.length > 0 ? cloud : es;
  const latam = pool.find((v) => LATAM_CODES.some((code) => v.lang.startsWith(code)));
  return latam ?? pool.find((v) => v.lang.startsWith("es")) ?? pool[0];
}

let pendingTimeout = null;
let aborted = false;

function stopSpeaking() {
  aborted = true;
  if (pendingTimeout) {
    clearTimeout(pendingTimeout);
    pendingTimeout = null;
  }
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

/** Narra por segmentos (Web Speech API) */
function speakDilema(dilema, { onEnd }) {
  if (!window.speechSynthesis) return null;
  stopSpeaking();
  aborted = false;
  const synth = window.speechSynthesis;
  const voice = getSpanishVoice();
  const u = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-MX";
    utterance.rate = 0.78;
    utterance.pitch = 0.96;
    if (voice) utterance.voice = voice;
    return utterance;
  };
  let idx = 0;
  const segments = dilema.segmentos;
  function next() {
    if (aborted || idx >= segments.length) {
      if (idx >= segments.length && !aborted) onEnd?.();
      return;
    }
    const { text, pause } = segments[idx];
    idx++;
    const utterance = u(text);
    utterance.onend = () => {
      if (aborted) return;
      if (pause > 0 && idx < segments.length) {
        pendingTimeout = setTimeout(next, pause);
      } else {
        next();
      }
    };
    synth.speak(utterance);
  }
  pendingTimeout = setTimeout(next, 650);
}

function speak(text, { onEnd } = {}) {
  if (!window.speechSynthesis) return null;
  stopSpeaking();
  aborted = false;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-MX";
  u.rate = 0.78;
  u.pitch = 0.96;
  const voice = getSpanishVoice();
  if (voice) u.voice = voice;
  u.onend = () => onEnd?.();
  window.speechSynthesis.speak(u);
  return u;
}

export function PlayAudio({ setView }) {
  const { theme } = useTheme();
  const t = useT();
  const [phase, setPhase] = useState("intro");
  const [chosen, setChosen] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showHollowPost, setShowHollowPost] = useState(false);

  const playFullDilema = () => {
    if (!window.speechSynthesis) {
      alert(t("noSpeechSupport"));
      return;
    }
    setPhase("playing");
    setSpeaking(true);
    stopSpeaking();
    speakDilema(DILEMA_AUDIO, {
      onEnd: () => {
        setSpeaking(false);
        setPhase("options");
      },
    });
  };

  const handlePauseResume = () => {
    if (!window.speechSynthesis) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const handleRepeat = () => {
    stopSpeaking();
    setChosen(null);
    setPhase("playing");
    setSpeaking(true);
    speakDilema(DILEMA_AUDIO, {
      onEnd: () => {
        setSpeaking(false);
        setPhase("options");
      },
    });
  };

  const chooseOption = (option) => {
    if (chosen) return;
    setChosen(option);
    setPhase("chosen");
    setShowHollowPost(true);
  };

  const onHollowContinue = () => {
    setShowHollowPost(false);
    if (chosen) {
      const cierre = chosen === "A" ? DILEMA_AUDIO.cierreA : DILEMA_AUDIO.cierreB;
      setSpeaking(true);
      speak(cierre, { onEnd: () => setSpeaking(false) });
    }
  };

  useEffect(() => {
    const loadVoices = () => window.speechSynthesis?.getVoices();
    loadVoices();
    window.speechSynthesis?.addEventListener?.("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis?.removeEventListener?.("voiceschanged", loadVoices);
      stopSpeaking();
    };
  }, []);


  const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window;

  // Intro tras Echo — pantalla amplia y espaciosa
  if (phase === "intro") {
    return (
      <div className="play-screen play-screen--mode-intro">
        <PlayModeIntro
          mode="audio"
          onStart={playFullDilema}
          onBack={() => setView(VIEWS.MODE_SELECT)}
          disabled={!hasSpeech}
          errorMessage={!hasSpeech ? t("noSpeechSupport") : null}
        />
      </div>
    );
  }

  // Hollow aparece antes de mostrar el cierre (3 toques)
  if (phase === "chosen" && showHollowPost) {
    return (
      <div
        className="play-screen"
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: "32px 20px 40px",
        }}
      >
        <HollowPostMode mode="audio" onContinue={onHollowContinue} />
      </div>
    );
  }

  return (
    <div
      className="play-screen"
      style={{
        textAlign: "center",
        padding: "32px 20px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 280,
      }}
    >
      {(phase === "playing" || phase === "options") && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          {phase === "playing" && (
            <button
              type="button"
              onClick={handlePauseResume}
              style={{
                padding: "12px 20px",
                borderRadius: 16,
                border: `2px solid ${theme.border}`,
                background: theme.panel2,
                color: theme.text,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {paused ? t("resume") : t("pause")}
            </button>
          )}
          {(phase === "playing" || phase === "options") && (
            <button
              type="button"
              onClick={handleRepeat}
              style={{
                padding: "12px 20px",
                borderRadius: 16,
                border: `2px solid ${theme.border}`,
                background: theme.panel2,
                color: theme.text,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t("repeat")}
            </button>
          )}
        </div>
      )}

      {phase === "options" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
            alignItems: "stretch",
            maxWidth: 560,
            margin: "0 auto 24px",
          }}
        >
          <button
            type="button"
            className="audio-option-deluxe"
            onClick={() => chooseOption("A")}
            style={{
              flex: 1,
              minHeight: 160,
              padding: "32px 24px",
              borderRadius: 24,
              border: `2px solid ${theme.accent}`,
              background: `linear-gradient(145deg, ${theme.accent}12 0%, ${theme.accent}06 50%, transparent 100%)`,
              color: theme.accent,
              fontSize: 20,
              fontWeight: 700,
              cursor: "pointer",
              textAlign: "center",
              lineHeight: 1.45,
            }}
          >
            <span className="audio-option-label">A</span>
            {DILEMA_AUDIO.opcionA}
          </button>
          <button
            type="button"
            className="audio-option-deluxe"
            onClick={() => chooseOption("B")}
            style={{
              flex: 1,
              minHeight: 160,
              padding: "32px 24px",
              borderRadius: 24,
              border: `2px solid ${theme.accent}`,
              background: `linear-gradient(145deg, ${theme.accent}12 0%, ${theme.accent}06 50%, transparent 100%)`,
              color: theme.accent,
              fontSize: 20,
              fontWeight: 700,
              cursor: "pointer",
              textAlign: "center",
              lineHeight: 1.45,
            }}
          >
            <span className="audio-option-label">B</span>
            {DILEMA_AUDIO.opcionB}
          </button>
        </div>
      )}

      {phase === "chosen" && (
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 18,
            border: `2px solid ${theme.accent}`,
            background: `${theme.accent}15`,
            color: theme.text,
            fontSize: 16,
            lineHeight: 1.5,
            marginBottom: 24,
          }}
        >
          {chosen === "A" ? DILEMA_AUDIO.cierreA : DILEMA_AUDIO.cierreB}
        </div>
      )}

      {phase !== "intro" && (
        <button
          type="button"
          onClick={() => setView(VIEWS.MODE_SELECT)}
          style={{
            padding: "12px 24px",
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            background: "transparent",
            color: theme.sub,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t("backToMenuAlt")}
        </button>
      )}
    </div>
  );
}
