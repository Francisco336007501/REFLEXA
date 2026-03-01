import { useState } from "react";
import { useT } from "../context/UserContext";
const ECHO_STEPS = { image: 5, text: 5, audio: 5, laboral: 5 };

export function EchoModeIntro({ mode, onContinue }) {
  const t = useT();
  const [step, setStep] = useState(1);

  const totalSteps = ECHO_STEPS[mode] ?? 5;
  const isLastStep = step >= totalSteps;
  const text = t(`echo${mode}${step}`);

  const handleTap = () => {
    if (isLastStep) {
      onContinue?.();
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  return (
    <div
      className="echo-tap-zone"
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
        background: "transparent",
      }}
      aria-label={text}
    >
      <div className="echo-mist echo-mist-base" aria-hidden />
      <div className="echo-mist echo-mist-1" aria-hidden />
      <div className="echo-mist echo-mist-2" aria-hidden />
      <div className="echo-mist echo-mist-3" aria-hidden />
      <div className="echo-mist echo-mist-4" aria-hidden />
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={`echo-mote echo-mote-${i}`} aria-hidden />
      ))}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onContinue?.();
        }}
        className="hollow-close-ghost"
        aria-label={t("backToHome")}
      />

      <div className="echo-energy-ring" aria-hidden />

      <div className="hollow-float-wrap">
        <img
          src="/imagenes/ECHO.png"
          alt=""
          className="hollow-char"
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
            filter: "drop-shadow(0 0 60px rgba(59, 130, 246, 0.2)) drop-shadow(0 0 120px rgba(37, 99, 235, 0.1))",
          }}
        />
      </div>

      <div key={step} className="hollow-text-emerge" style={{ minHeight: 110, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="hollow-verse">{text}</p>
      </div>

      {!isLastStep && (
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
          <div className="echo-pulse" aria-hidden />
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
