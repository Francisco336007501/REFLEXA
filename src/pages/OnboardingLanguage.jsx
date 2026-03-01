import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

// Pregunta para la pantalla de idioma (antes de elegir)
const LANG_PROMPTS = {
  es: "¿Qué idioma prefieres?",
  en: "Which language do you prefer?",
};

export function OnboardingLanguage() {
  const { theme } = useTheme();
  const { LANGS, setLanguage, finishLanguageStep } = useUser();

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        padding: "32px 24px 48px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          margin: "0 0 28px",
          fontSize: "clamp(1.1rem, 4vw, 1.35rem)",
          fontWeight: 700,
          color: theme.text,
          lineHeight: 1.4,
        }}
      >
        {LANG_PROMPTS.es} / {LANG_PROMPTS.en}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {Object.entries(LANGS).map(([code, { label, flag, country }]) => (
          <button
            key={code}
            type="button"
            onClick={() => {
              setLanguage(code);
              finishLanguageStep();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "22px 24px",
              borderRadius: 20,
              border: `2px solid ${theme.border}`,
              background: theme.panel2,
              color: theme.text,
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accent;
              e.currentTarget.style.boxShadow = `0 4px 20px ${theme.accent}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              style={{
                fontSize: 48,
                lineHeight: 1,
                display: "block",
                borderRadius: 8,
                overflow: "hidden",
              }}
              aria-hidden
            >
              {flag}
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "block", marginBottom: 2 }}>{label}</span>
              <span style={{ fontSize: 13, color: theme.sub, fontWeight: 500 }}>{country}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
