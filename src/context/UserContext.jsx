import { createContext, useContext, useState } from "react";
import { translate } from "../i18n/translations";

const STORAGE_KEY = "reflexa_user";
// Banderas de países + nombre nativo del idioma (español = LATAM)
const LANGS = {
  es: { label: "Español", flag: "🇲🇽", country: "Latinoamérica" },
  en: { label: "English", flag: "🇺🇸", country: "USA" },
};

const UserCtx = createContext(null);

// Por ahora NO guardamos (práctica). Después activamos persistencia.
const PERSIST_DATA = false;

function loadStored() {
  if (!PERSIST_DATA) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveStored(data) {
  if (!PERSIST_DATA) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

const SUPPORTED_LANGS = ["es", "en"];

function getInitialState() {
  const stored = loadStored();
  if (!PERSIST_DATA) {
    return { language: "es", userName: "", step: "language" };
  }
  const lang = stored?.language || "es";
  return {
    language: SUPPORTED_LANGS.includes(lang) ? lang : "es",
    userName: stored?.userName || "",
    step: "language",
  };
}

const initial = typeof window !== "undefined" ? getInitialState() : { language: "es", userName: "", step: "language" };

export function UserProvider({ children }) {
  const [language, setLanguageState] = useState(initial.language);
  const [userName, setUserNameState] = useState(initial.userName);
  const [onboardingStep, setOnboardingStep] = useState(initial.step);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    const stored = loadStored() || {};
    saveStored({ ...stored, language: lang });
  };

  const setUserName = (name) => {
    const trimmed = (name || "").trim();
    setUserNameState(trimmed);
    const stored = loadStored() || {};
    saveStored({ ...stored, userName: trimmed });
  };

  const finishLanguageStep = () => {
    const stored = loadStored() || {};
    setOnboardingStep(stored?.userName ? "done" : "name");
  };
  const finishNameStep = () => {
    setOnboardingStep("done");
  };

  const value = {
    language,
    setLanguage,
    userName,
    setUserName,
    onboardingStep,
    finishLanguageStep,
    finishNameStep,
    LANGS,
  };

  return <UserCtx.Provider value={value}>{children}</UserCtx.Provider>;
}

export function useUser() {
  const ctx = useContext(UserCtx);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}

export function useT() {
  const { language } = useUser();
  return (key, vars) => translate(language, key, vars);
}
