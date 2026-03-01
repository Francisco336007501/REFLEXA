import { useTheme } from "../context/ThemeContext";
import { useT } from "../context/UserContext";

// Fondos por modo — rebajados, menos brillantes
const MODE_THEMES = {
  image: {
    bg: "linear-gradient(165deg, #1a1525 0%, #2a2340 40%, #352a4a 70%, #3d3255 100%)",
    orb: "rgba(255,255,255,0.04)",
    accent: "#8b7fb8",
    className: "play-mode-intro-bg-image",
  },
  text: {
    bg: "linear-gradient(165deg, #151a22 0%, #1e2836 40%, #243044 70%, #2a3650 100%)",
    orb: "rgba(255,255,255,0.04)",
    accent: "#64748b",
    className: "play-mode-intro-bg-text",
  },
  audio: {
    bg: "linear-gradient(165deg, #1c1828 0%, #2a2540 40%, #35304a 70%, #3d3855 100%)",
    orb: "rgba(255,255,255,0.04)",
    accent: "#7c7aa0",
    className: "play-mode-intro-bg-audio",
  },
};

/**
 * Pantalla tras Echo — Empezar + Volver al menú. Diseño con personalidad.
 */
export function PlayModeIntro({ mode = "text", onStart, onBack, disabled = false, errorMessage }) {
  const { theme } = useTheme();
  const t = useT();
  const modeTheme = MODE_THEMES[mode] ?? MODE_THEMES.text;

  return (
    <div
      className={`play-mode-intro ${modeTheme.className}`}
      style={{
        position: "relative",
        minHeight: "min(72vh, 480px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "56px 40px 72px",
        overflow: "hidden",
      }}
    >
      {/* Fondo con gradiente del modo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: modeTheme.bg,
          zIndex: 0,
        }}
      />

      {/* Orbes decorativos — muy sutiles */}
      <div className="play-mode-intro-orb play-mode-intro-orb-1" aria-hidden />
      <div className="play-mode-intro-orb play-mode-intro-orb-2" aria-hidden />
      <div className="play-mode-intro-orb play-mode-intro-orb-3" aria-hidden />
      <div className="play-mode-intro-orb play-mode-intro-orb-4" aria-hidden />
      <div className="play-mode-intro-orb play-mode-intro-orb-5" aria-hidden />

      {/* Niebla misteriosa — no deja ver tan claro */}
      <div className="play-mode-intro-mist" aria-hidden />

      {/* Contenido */}
      <div
        className="play-mode-intro-content"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          maxWidth: 520,
          width: "100%",
        }}
      >
        {/* Echo — solo el personaje, sin contenedor ni marco ni overlay */}
        <div className="play-mode-intro-echo-wrap" tabIndex={-1}>
          <img
            src="/imagenes/ECHO.png"
            alt=""
            tabIndex={-1}
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Frase de traspaso */}
        <p
          style={{
            margin: "20px 0 28px",
            fontSize: 18,
            fontWeight: 700,
            color: "rgba(255,255,255,0.88)",
            textAlign: "center",
            lineHeight: 1.35,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {t("playHandoff")}
        </p>

        {errorMessage && (
          <p
            style={{
              fontSize: 13,
              color: "#fecaca",
              margin: "0 0 20px",
              textAlign: "center",
              lineHeight: 1.45,
            }}
          >
            {errorMessage}
          </p>
        )}

        {/* Botón Empezar */}
        <button
          type="button"
          onClick={onStart}
          disabled={disabled}
          className="play-mode-intro-btn"
          style={{
            width: "100%",
            padding: "24px 40px",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.25)",
            background: "rgba(255,255,255,0.92)",
            color: "#1a1b26",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 0.02,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
            boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          {t("playStart")}
        </button>

        {/* Volver al menú — sin flecha */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="play-mode-intro-back"
            style={{
              marginTop: 28,
              padding: "12px 24px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 16,
              color: "rgba(255,255,255,0.85)",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
            }}
          >
            {t("backToMenu")}
          </button>
        )}
      </div>
    </div>
  );
}
