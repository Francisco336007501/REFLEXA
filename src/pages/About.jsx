import { useState } from "react";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { useT } from "../context/UserContext";

const HOLLOW_STEPS = 8;

export function About({ setView }) {
  const { theme } = useTheme();
  const t = useT();
  const [step, setStep] = useState(1);

  const isLastStep = step >= HOLLOW_STEPS;
  const text = t(`narrator${step}`);

  const handleTap = () => {
    if (isLastStep) {
      setView(VIEWS.HOME);
    } else {
      setStep((s) => Math.min(s + 1, HOLLOW_STEPS));
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px 56px",
        cursor: "pointer",
        position: "relative",
        background: "transparent",
      }}
      aria-label={text}
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

      {/* Salir — invisible, solo accesible por teclado/focus */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setView(VIEWS.HOME);
        }}
        className="hollow-close-ghost"
        aria-label={t("backToHome")}
      />

      {/* Círculo de energía — reacciona al tacto */}
      <div className="hollow-energy-ring" aria-hidden />

      {/* Hollow — flotando, halo, única presencia */}
      <div className="hollow-float-wrap">
        <img
          src={!isLastStep ? "/imagenes/Hollow.png" : "/imagenes/NARRADOR.png"}
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

      {/* Texto — emerge del espacio, altura fija para que el marco no se ajuste */}
      <div key={step} className="hollow-text-emerge" style={{ minHeight: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="hollow-verse">{text}</p>
      </div>

      {/* Indicador sutil — clic para continuar */}
      {!isLastStep && (
        <div style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
        }}>
          <div className="hollow-pulse" aria-hidden />
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.32)",
              letterSpacing: 0.06,
              fontWeight: 500,
            }}
          >
            {t("narratorTapHint")}
          </span>
        </div>
      )}
    </div>
  );
}
