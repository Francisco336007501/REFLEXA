import { useTheme, VIEWS } from "../context/ThemeContext";
import { useT } from "../context/UserContext";

export function ModeRoot({ setView, setModeTier }) {
  const { theme } = useTheme();
  const t = useT();

  return (
    <div className="mode-root-shell">
      <div className="mode-root-header">
        <p className="mode-root-header-eyebrow">{t("entryChooseMode")}</p>
        <h1
          className="mode-root-header-title"
          style={{ fontSize: "clamp(1.6rem, 6vw, 2rem)", color: theme.text }}
        >
          {t("entryHowToEnter")}
        </h1>
        <p className="mode-root-header-sub">{t("entryNoRightAnswers")}</p>
      </div>

      <div className="mode-root-grid">
        {/* Modo normal */}
        <button
          type="button"
          onClick={() => {
            setModeTier?.("normal");
            setView(VIEWS.MODE_SELECT);
          }}
          className="mode-root-card"
          style={{ borderColor: theme.border }}
        >
          <div className="mode-root-card-main">
            <div className="mode-root-card-title">{t("entryNormalLabel")}</div>
          </div>
          <span className="mode-root-card-chevron" aria-hidden>
            ›
          </span>
        </button>

        {/* Modo laboral */}
        <button
          type="button"
          onClick={() => {
            setModeTier?.("pro");
            setView(VIEWS.MODE_SELECT);
          }}
          className="mode-root-card mode-root-card--pro"
        >
          <div className="mode-root-card-main">
            <div className="mode-root-card-title">{t("entryWorkLabel")}</div>
          </div>
          <span className="mode-root-card-chevron" aria-hidden>
            ›
          </span>
        </button>
      </div>
    </div>
  );
}

