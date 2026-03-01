import { useTheme } from "../context/ThemeContext";
import { Toggle, VolumeSlider } from "../pages/Settings";

export function PlaySettingsOverlay({ onClose }) {
  const { theme, bigText, setBigText, highContrast, setHighContrast, soundVolume, setSoundVolume } = useTheme();

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 10,
          backdropFilter: "blur(2px)",
        }}
        aria-label="Cerrar ajustes"
      />
      <div
        style={{
          position: "fixed",
          top: "calc(env(safe-area-inset-top, 0) + 80px)",
          right: "max(16px, env(safe-area-inset-right))",
          left: "max(16px, env(safe-area-inset-left))",
          maxWidth: 320,
          marginLeft: "auto",
          padding: 18,
          borderRadius: 20,
          border: `2px solid ${theme.border}`,
          background: theme.panel,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          zIndex: 11,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
        role="dialog"
        aria-label="Ajustes durante el juego"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontWeight: 800, fontSize: 15 }}>Ajustes</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${theme.border}`,
              background: theme.panel2,
              color: theme.sub,
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <Toggle
          label="Texto grande"
          desc="Mejor lectura"
          value={bigText}
          onChange={setBigText}
        />
        <Toggle
          label="Tema alto contraste"
          desc={highContrast ? "Azul claro" : "Violeta suave"}
          value={highContrast}
          onChange={setHighContrast}
        />
        <VolumeSlider
          label="Volumen"
          desc="Feedback de audio"
          value={soundVolume}
          onChange={setSoundVolume}
        />
      </div>
    </>
  );
}
