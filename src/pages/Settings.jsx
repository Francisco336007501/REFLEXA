import { styles } from "../styles/ui";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { useT } from "../context/UserContext";
import { playSelect } from "../utils/sounds";

export function Toggle({ label, desc, value, onChange }) {
  const { theme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      style={{ ...styles.toggle, borderColor: "rgba(167, 139, 250, 0.2)", background: "rgba(167, 139, 250, 0.04)", color: theme.text }}
      aria-pressed={value}
    >
      <div>
        <div style={{ fontWeight: 800, color: theme.text }}>{label}</div>
        <div style={{ color: "rgba(167, 139, 250, 0.7)", fontSize: 13 }}>{desc}</div>
      </div>

      <div
        style={{
          ...styles.pill,
          background: value ? theme.accent : "rgba(167, 139, 250, 0.2)",
          borderColor: value ? theme.accent : "rgba(167, 139, 250, 0.3)",
        }}
      >
        <div style={{ ...styles.dot, transform: value ? "translateX(18px)" : "translateX(0px)" }} />
      </div>
    </button>
  );
}

export function VolumeSlider({ label, desc, value, onChange, mutedLabel }) {
  const { theme } = useTheme();

  const handleChange = (e) => {
    const newVal = Number(e.target.value);
    onChange(newVal);
  };

  const handleMouseUp = () => {
    if (value > 0) playSelect(value);
  };

  const volumeLabel = value === 0 ? (mutedLabel ?? "Silenciado") : `${value}%`;

  return (
    <div
      style={{
        ...styles.toggle,
        borderColor: "rgba(167, 139, 250, 0.2)",
        background: "rgba(167, 139, 250, 0.04)",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 12,
        cursor: "default",
        color: theme.text,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 800, color: theme.text }}>{label}</div>
          <div style={{ color: "rgba(167, 139, 250, 0.7)", fontSize: 13 }}>{desc}</div>
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: value > 0 ? theme.accent : "rgba(167, 139, 250, 0.6)",
            minWidth: 60,
            textAlign: "right",
          }}
        >
          {volumeLabel}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16 }}>🔇</span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={value}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          style={{
            flex: 1,
            height: 6,
            accentColor: theme.accent,
            cursor: "pointer",
          }}
          aria-label="Volumen de sonido"
        />
        <span style={{ fontSize: 16 }}>🔊</span>
      </div>
    </div>
  );
}

export function Settings({ setView }) {
  const { theme, bigText, setBigText, highContrast, setHighContrast, soundVolume, setSoundVolume } = useTheme();
  const { language, setLanguage, LANGS } = useUser();
  const t = useT();

  return (
    <div>
      <button
        type="button"
        onClick={() => setView(VIEWS.HOME)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 20,
          padding: "10px 14px",
          borderRadius: 14,
          border: `1px solid rgba(167, 139, 250, 0.25)`,
          background: "rgba(167, 139, 250, 0.06)",
          color: "rgba(167, 139, 250, 0.85)",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {t("backToHome")}
      </button>
      <h2 style={{ ...styles.h2, color: theme.text }}>{t("settingsTitle")}</h2>
      <p style={{ ...styles.p, color: "rgba(255,255,255,0.7)" }}>
        {t("settingsDesc")}
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <div
          style={{
            ...styles.toggle,
            borderColor: "rgba(167, 139, 250, 0.2)",
            background: "rgba(167, 139, 250, 0.04)",
            padding: "16px 18px",
            borderRadius: 16,
          }}
        >
          <div style={{ fontWeight: 800, color: theme.text, marginBottom: 8 }}>{t("language")}</div>
          <div style={{ color: "rgba(167, 139, 250, 0.7)", fontSize: 13, marginBottom: 14 }}>{t("languageDesc")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {Object.entries(LANGS).map(([code, { label, flag }]) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: `2px solid ${language === code ? theme.accent : "rgba(167, 139, 250, 0.25)"}`,
                  background: language === code ? "rgba(167, 139, 250, 0.18)" : "rgba(167, 139, 250, 0.04)",
                  color: theme.text,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 22 }}>{flag}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
        <Toggle
          label={t("bigText")}
          desc={t("bigTextDesc")}
          value={bigText}
          onChange={setBigText}
        />
        <Toggle
          label={t("highContrast")}
          desc={highContrast ? t("highContrastOn") : t("highContrastOff")}
          value={highContrast}
          onChange={setHighContrast}
        />
        <VolumeSlider
          label={t("volume")}
          desc={t("volumeDesc")}
          value={soundVolume}
          onChange={setSoundVolume}
          mutedLabel={t("muted")}
        />
      </div>
    </div>
  );
}

