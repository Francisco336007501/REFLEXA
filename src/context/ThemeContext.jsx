import { createContext, useContext, useMemo, useState } from "react";

const ThemeCtx = createContext(null);

export const VIEWS = {
  HOME: "home",
  MODE_ROOT: "mode_root",
  MODE_SELECT: "mode_select",
  ECHO_INTRO: "echo_intro",
  PLAY: "play",
  PLAY_IMAGE: "play_image",
  PLAY_AUDIO: "play_audio",
  PLAY_WORK: "play_work",
  ABOUT: "about",
  SETTINGS: "settings",
};

export function ThemeProvider({ children }) {
  const [bigText, setBigText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [soundVolume, setSoundVolume] = useState(50); // 0-100

  const theme = useMemo(() => {
    // Tema por defecto: oscuro pero cálido, violeta suave
    const defaultTheme = {
      bg: "#1a1b26",
      panel: "rgba(255,255,255,0.07)",
      panel2: "rgba(255,255,255,0.10)",
      text: "rgba(255,255,255,0.94)",
      sub: "rgba(255,255,255,0.72)",
      border: "rgba(255,255,255,0.15)",
      accent: "#a78bfa",
      danger: "#fb7185",
    };

    if (highContrast) {
      return {
        bg: "#0f172a",
        panel: "#1e293b",
        panel2: "#334155",
        text: "#f1f5f9",
        sub: "#94a3b8",
        border: "#64748b",
        accent: "#38bdf8",
        danger: "#f87171",
      };
    }

    return defaultTheme;
  }, [highContrast]);

  const value = {
    theme,
    bigText,
    setBigText,
    highContrast,
    setHighContrast,
    soundVolume,
    setSoundVolume,
    fontSize: bigText ? 18 : 16,
    titleFont: bigText ? 34 : 30,
  };

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
