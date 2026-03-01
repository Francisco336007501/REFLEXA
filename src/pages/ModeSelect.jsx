import { useEffect, useState } from "react";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { useT } from "../context/UserContext";

export function ModeSelect({ setView, onSelectMode, showText = true, showAudio = true }) {
  const { theme } = useTheme();
  const t = useT();
  const [hovered, setHovered] = useState(null); // null | "image" | "text" | "audio"
  const onlyImage = !showText && !showAudio;
  const isNormalTier = !showAudio; // modo normal: solo imagen + texto

  // Al entrar, no marcar ningún modo por defecto (quitar foco para que no parezca seleccionado)
  useEffect(() => {
    if (document.activeElement?.blur) document.activeElement.blur();
  }, []);

  const cardBase = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    padding: 28,
    borderRadius: 28,
    color: theme.text,
    cursor: "pointer",
    textAlign: "center",
    border: "2px solid",
    transition: "all 0.25s ease",
  };

  // Modos: cada uno con paleta clara y distinta
  const MODE_COLORS = {
    image: {
      bg: "linear-gradient(145deg, rgba(88, 28, 135, 0.14) 0%, rgba(59, 7, 100, 0.06) 50%, rgba(26, 26, 32, 0.96) 100%)",
      border: "rgba(126, 34, 206, 0.4)",
      borderHover: "rgba(126, 34, 206, 0.6)",
      glow: "0 12px 40px rgba(88, 28, 135, 0.12)",
      glowHover: "0 16px 48px rgba(88, 28, 135, 0.2)",
      sub: "rgba(167, 139, 250, 0.9)",
    },
    text: {
      bg: "linear-gradient(145deg, rgba(71, 85, 105, 0.14) 0%, rgba(51, 65, 85, 0.08) 50%, rgba(26, 26, 32, 0.96) 100%)",
      border: "rgba(100, 116, 139, 0.45)",
      borderHover: "rgba(100, 116, 139, 0.65)",
      glow: "0 12px 40px rgba(71, 85, 105, 0.1)",
      glowHover: "0 16px 48px rgba(71, 85, 105, 0.18)",
      sub: "rgba(148, 163, 184, 0.95)",
    },
    audio: {
      bg: "linear-gradient(145deg, rgba(167, 139, 250, 0.14) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(26, 26, 32, 0.96) 100%)",
      border: "rgba(196, 181, 253, 0.35)",
      borderHover: "rgba(196, 181, 253, 0.6)",
      glow: "0 12px 40px rgba(167, 139, 250, 0.12)",
      glowHover: "0 16px 48px rgba(167, 139, 250, 0.22)",
      sub: "rgba(221, 214, 254, 0.9)",
    },
  };

  // Vista especial premium para Modo normal (imagen + texto, sin audio)
  if (isNormalTier) {
    return (
      <div
        className="mode-normal-shell"
        style={{
          maxWidth: 540,
          margin: "0 auto",
          padding: "32px 18px 40px",
        }}
      >
        <div className="mode-normal-panel">
          <div className="mode-normal-panel-glow" aria-hidden />
          <div className="mode-normal-panel-inner">
            <p
              className="mode-normal-hint"
              style={{
                color: theme.sub,
              }}
            >
              {t("modeTapHint")}
            </p>

            <div className="mode-normal-modes">
              <button
                type="button"
                className="mode-normal-mode mode-normal-mode--image"
                style={{ color: theme.text }}
                onClick={() =>
                  onSelectMode ? onSelectMode("image") : setView(VIEWS.PLAY_IMAGE)
                }
              >
                <span className="mode-normal-mode-icon">🖼️</span>
                <span className="mode-normal-mode-title">
                  {t("modeImage")}
                </span>
                <span className="mode-normal-mode-sub">
                  {t("modeImageDesc")}
                </span>
              </button>

              {showText && (
                <button
                  type="button"
                  className="mode-normal-mode mode-normal-mode--text"
                  style={{ color: theme.text }}
                  onClick={() =>
                    onSelectMode ? onSelectMode("text") : setView(VIEWS.PLAY)
                  }
                >
                  <span className="mode-normal-mode-icon">📝</span>
                  <span className="mode-normal-mode-title">
                    {t("modeText")}
                  </span>
                  <span className="mode-normal-mode-sub">
                    {t("modeTextDesc")}
                  </span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setView(VIEWS.HOME)}
              className="mode-normal-back"
              style={{
                color: theme.sub,
                borderColor: theme.border,
              }}
            >
              {t("backToMenu")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "24px 16px 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <p style={{ margin: 0, color: theme.sub, fontSize: 14, lineHeight: 1.5 }}>
          {t("modeTapHint")}
        </p>
      </div>

      <div
        className="mode-grid"
        style={{
          marginBottom: 24,
          ...(onlyImage
            ? {
                gridTemplateColumns: "1fr",
                justifyItems: "center",
              }
            : null),
        }}
      >
        {/* MODO IMAGEN — violeta oscuro */}
        <button
          type="button"
          className="mode-card"
          onClick={() => (onSelectMode ? onSelectMode("image") : setView(VIEWS.PLAY_IMAGE))}
          onMouseEnter={() => setHovered("image")}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...cardBase,
            minHeight: onlyImage ? 220 : cardBase.minHeight,
            maxWidth: onlyImage ? 260 : undefined,
            background: MODE_COLORS.image.bg,
            borderColor: hovered === "image" ? MODE_COLORS.image.borderHover : MODE_COLORS.image.border,
            boxShadow: hovered === "image" ? MODE_COLORS.image.glowHover : MODE_COLORS.image.glow,
          }}
        >
          <span className="mode-card-icon" style={{ fontSize: 56, marginBottom: 14, display: "block" }}>🖼️</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 0.02,
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            {t("modeImage")}
          </span>
          <span style={{ fontSize: 13, color: MODE_COLORS.image.sub, lineHeight: 1.4, fontWeight: 600 }}>
            {t("modeImageDesc")}
          </span>
        </button>

        {/* MODO TEXTO — gris pizarra (opcional) */}
        {showText && (
          <button
            type="button"
            className="mode-card"
            onClick={() => (onSelectMode ? onSelectMode("text") : setView(VIEWS.PLAY))}
            onMouseEnter={() => setHovered("text")}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...cardBase,
              background: MODE_COLORS.text.bg,
              borderColor: hovered === "text" ? MODE_COLORS.text.borderHover : MODE_COLORS.text.border,
              boxShadow: hovered === "text" ? MODE_COLORS.text.glowHover : MODE_COLORS.text.glow,
            }}
          >
            <span className="mode-card-icon" style={{ fontSize: 56, marginBottom: 14, display: "block" }}>📝</span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 0.02,
                marginBottom: 8,
                lineHeight: 1.2,
              }}
            >
              {t("modeText")}
            </span>
            <span style={{ fontSize: 13, color: MODE_COLORS.text.sub, lineHeight: 1.4, fontWeight: 600 }}>
              {t("modeTextDesc")}
            </span>
          </button>
        )}

        {/* MODO AUDIO — violeta claro (solo en modo pro) */}
        {showAudio && (
          <button
            type="button"
            className="mode-card"
            onClick={() => (onSelectMode ? onSelectMode("audio") : setView(VIEWS.PLAY_AUDIO))}
            onMouseEnter={() => setHovered("audio")}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...cardBase,
              gridColumn: "1 / -1",
              background: MODE_COLORS.audio.bg,
              borderColor: hovered === "audio" ? MODE_COLORS.audio.borderHover : MODE_COLORS.audio.border,
              boxShadow: hovered === "audio" ? MODE_COLORS.audio.glowHover : MODE_COLORS.audio.glow,
            }}
          >
            <span className="mode-card-icon" style={{ fontSize: 56, marginBottom: 14, display: "block" }}>🔊</span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 0.02,
                marginBottom: 8,
                lineHeight: 1.2,
              }}
            >
              {t("modeAudio")}
            </span>
            <span style={{ fontSize: 13, color: MODE_COLORS.audio.sub, lineHeight: 1.4, fontWeight: 600 }}>
              {t("modeAudioDesc")}
            </span>
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => setView(VIEWS.HOME)}
        style={{
          display: "block",
          margin: "0 auto",
          padding: "12px 20px",
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          background: "transparent",
          color: theme.sub,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {t("backToMenu")}
      </button>
    </div>
  );
}
