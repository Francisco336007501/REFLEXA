import { styles } from "../styles/ui";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { useT } from "../context/UserContext";

export function Header({ view, setView, playSettingsOpen, onPlaySettingsToggle, focusMode }) {
  const { theme, titleFont } = useTheme();
  const t = useT();
  const inPlay = view === VIEWS.PLAY;

  const inAbout = view === VIEWS.ABOUT;

  return (
    <div
      style={{
        ...styles.header,
        borderColor: theme.border,
        opacity: focusMode ? 0.2 : inAbout ? 0.15 : 1,
        transition: "opacity 0.4s ease, border-color 0.5s ease",
      }}
    >
      <button
        type="button"
        onClick={() => setView(VIEWS.HOME)}
        style={{
          ...styles.brand,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
          color: "inherit",
        }}
        aria-label={t("backToHomeAria")}
      >
        <div style={{ ...styles.logo, background: theme.panel2, borderColor: theme.border }}>🪞</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 800, letterSpacing: 0.2, fontSize: titleFont, textTransform: "uppercase" }}>Reflexa</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 0.08,
                padding: "2px 6px",
                borderRadius: 6,
                background: theme.panel2,
                border: `1px solid ${theme.border}`,
                color: theme.sub,
              }}
            >
              BETA
            </span>
          </div>
          <div style={{ color: theme.sub, fontSize: 13, textTransform: "uppercase" }}>{t("headerTagline")}</div>
        </div>
      </button>

      {inPlay && (
        <button
          type="button"
          onClick={onPlaySettingsToggle}
          aria-expanded={playSettingsOpen}
          style={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            background: theme.panel2,
            color: theme.sub,
            fontSize: 20,
            cursor: "pointer",
          }}
          aria-label={t("settingsAria")}
        >
          ⚙️
        </button>
      )}
    </div>
  );
}
