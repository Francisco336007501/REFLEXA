import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useT } from "../context/UserContext";

const STEP_KEYS = {
  image: ["hollowPostImageStep1", "hollowPostImageStep2", "hollowPostImageStep3"],
  text: ["hollowPostTextStep1", "hollowPostTextStep2", "hollowPostTextStep3"],
  audio: ["hollowPostAudioStep1", "hollowPostAudioStep2", "hollowPostAudioStep3"],
};

/** Hollow aparece al terminar un modo — 3 toques interactivos antes de mostrar resultados */
export function HollowPostMode({ mode = "text", onContinue }) {
  const { theme } = useTheme();
  const t = useT();
  const [step, setStep] = useState(1);

  const keys = STEP_KEYS[mode] ?? STEP_KEYS.text;
  const message = t(keys[step - 1]);
  const isLastStep = step >= 3;

  const handleTap = () => {
    if (isLastStep) {
      onContinue?.();
    } else {
      setStep((s) => Math.min(s + 1, 3));
    }
  };

  return (
    <div
      className="hollow-tap-zone"
      role="button"
      tabIndex={0}
      onClick={handleTap}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTap()}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px 56px",
        cursor: "pointer",
        background: theme.bg,
        zIndex: 100,
      }}
      aria-label={message}
    >
      {/* Neblina espectral */}
      <div className="hollow-mist hollow-mist-base" aria-hidden />
      <div className="hollow-mist hollow-mist-1" aria-hidden />
      <div className="hollow-mist hollow-mist-2" aria-hidden />
      <div className="hollow-mist hollow-mist-3" aria-hidden />
      <div className="hollow-mist hollow-mist-4" aria-hidden />
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={`hollow-mote hollow-mote-${i}`} aria-hidden />
      ))}

      {/* Círculo de energía */}
      <div className="hollow-energy-ring" aria-hidden />

      {/* Hollow */}
      <div className="hollow-float-wrap">
        <img
          src="/imagenes/Hollow.png"
          alt=""
          className="hollow-char"
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
            filter: "drop-shadow(0 0 60px rgba(167, 139, 250, 0.25)) drop-shadow(0 0 120px rgba(139, 92, 246, 0.12))",
          }}
        />
      </div>

      {/* Texto — el comentario de Hollow (cambia en cada toque) */}
      <div key={step} className="hollow-text-emerge" style={{ minHeight: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="hollow-verse">{message}</p>
      </div>

      {/* Indicador sutil — toque 1, 2 o 3 para continuar */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
        }}
      >
        <div className="hollow-pulse" aria-hidden />
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.32)",
            letterSpacing: 0.06,
            fontWeight: 500,
          }}
        >
          {isLastStep ? t("narratorTapHint") : `${step} / 3`}
        </span>
      </div>
    </div>
  );
}
