import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useUser, useT } from "../context/UserContext";

export function OnboardingName() {
  const { theme } = useTheme();
  const { setUserName, finishNameStep } = useUser();
  const t = useT();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    setUserName(name);
    finishNameStep();
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "0 auto",
        padding: "32px 24px 48px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          margin: "0 0 24px",
          fontSize: "clamp(1.1rem, 4vw, 1.35rem)",
          fontWeight: 700,
          color: theme.text,
          lineHeight: 1.4,
        }}
      >
        {t("yourName")}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("namePlaceholder")}
          autoFocus
          maxLength={40}
          style={{
            width: "100%",
            padding: "18px 20px",
            marginBottom: 20,
            borderRadius: 16,
            border: `2px solid ${theme.border}`,
            background: theme.panel2,
            color: theme.text,
            fontSize: 17,
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.accent;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = theme.border;
          }}
        />
        <button
          type="submit"
          disabled={!name.trim()}
          style={{
            width: "100%",
            padding: "20px 24px",
            borderRadius: 18,
            border: "none",
            background: name.trim() ? theme.accent : theme.border,
            color: "#fff",
            fontSize: 17,
            fontWeight: 700,
            cursor: name.trim() ? "pointer" : "not-allowed",
            opacity: name.trim() ? 1 : 0.6,
          }}
        >
          {t("continue")}
        </button>
      </form>
    </div>
  );
}
