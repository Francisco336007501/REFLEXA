import { useEffect, useRef, useState } from "react";
import { ThemeProvider, useTheme, VIEWS } from "./context/ThemeContext";
import { UserProvider, useUser, useT } from "./context/UserContext";
import { styles } from "./styles/ui";
import { Header } from "./components/Header";
import { PlaySettingsOverlay } from "./components/PlaySettingsOverlay";
import { CanvasCursor } from "./components/CanvasCursor";
import { Home } from "./pages/Home";
import { ModeRoot } from "./pages/ModeRoot";
import { ModeSelect } from "./pages/ModeSelect";
import { Play } from "./pages/Play";
import { PlayImage } from "./pages/PlayImage";
import { PlayAudio } from "./pages/PlayAudio";
import { PlayWork } from "./pages/PlayWork";
import { About } from "./pages/About";
import { EchoModeIntro } from "./pages/EchoModeIntro";
import { Settings } from "./pages/Settings";
import { OnboardingLanguage } from "./pages/OnboardingLanguage";
import { OnboardingName } from "./pages/OnboardingName";

const LOADING_PHRASES = [
  "¿Esto que haces hoy te acerca o te distrae?",
  "¿Cuándo fue la última vez que fuiste honesto contigo?",
  "Si nadie te juzgara, ¿qué cambiarías?",
  "¿Estás viviendo o solo cumpliendo?",
  "¿Qué estás evitando pensar ahora mismo?",
  "¿Esto es una decisión… o una costumbre?",
  "¿Lo haces por ti o para encajar?",
  "¿Es miedo o es flojera?",
  "¿Es amor propio o autosabotaje?",
  "¿Te estás escuchando o solo reaccionando?",
  "No todo lo urgente es importante.",
  "Pensar también es actuar.",
  "El silencio también responde.",
  "Cambiar duele. No cambiar, más.",
  "Lo normal no siempre es sano.",
  "Todo empieza con una pregunta incómoda.",
  "Reflexionar también es avanzar.",
  "No cargamos la página, cargamos ideas.",
  "Un segundo de pausa puede cambiar todo.",
  "Aquí no hay respuestas rápidas.",
  "¿Quién serías sin expectativas ajenas?",
  "¿Te reconoces en la vida que llevas?",
  "A veces perderse es necesario.",
  "No todo lo que brilla te conviene.",
  "La incomodidad también enseña.",
  "Cargando conciencia…",
  "Inicializando reflexión…",
  "Procesando pensamientos…",
  "Analizando decisiones recientes…",
  "Preparando preguntas difíciles…",
];

const LOADING_DURATION_MS = 5000;
const PHRASE_INTERVAL_MS = 2500; /* 2 frases en 5 s */

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function AppInner() {
  const [view, setView] = useState(VIEWS.HOME);
  const [pendingMode, setPendingMode] = useState(null); // "image" | "text" | "audio" cuando viene de Echo
  const [modeTier, setModeTier] = useState("normal"); // "normal" | "pro"
  const [playSettingsOpen, setPlaySettingsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [loadProgress, setLoadProgress] = useState(0);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const loadStartRef = useRef(null);
  const { theme, fontSize } = useTheme();
  const { onboardingStep } = useUser();
  const t = useT();

  useEffect(() => {
    if (introDone) return;
    const onKey = () => enterApp();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [introDone]);

  const enterApp = () => {
    if (introDone) return;
    setIntroDone(true);
    setLoading(true);
    setCurrentPhrase(pickRandom(LOADING_PHRASES));
    setLoadProgress(0);
    loadStartRef.current = Date.now();
  };

  useEffect(() => {
    if (!loading) return;
    let t2;
    const t = setTimeout(() => {
      setShowCheckmark(true);
      t2 = setTimeout(() => {
        setLoading(false);
        setShowCheckmark(false);
      }, 400);
    }, LOADING_DURATION_MS);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [loading]);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setCurrentPhrase(pickRandom(LOADING_PHRASES)), PHRASE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => {
      if (!loadStartRef.current) return;
      const elapsed = Date.now() - loadStartRef.current;
      setLoadProgress(Math.min(100, (elapsed / LOADING_DURATION_MS) * 100));
    }, 80);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (
      view !== VIEWS.PLAY &&
      view !== VIEWS.PLAY_IMAGE &&
      view !== VIEWS.PLAY_WORK
    ) {
      setFocusMode(false);
    }
  }, [view]);

  // 1. Idioma
  if (onboardingStep === "language") {
    return (
      <div style={{ ...styles.page, background: theme.bg, color: theme.text, fontSize, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CanvasCursor />
        <OnboardingLanguage />
      </div>
    );
  }

  // 2. Nombre
  if (onboardingStep === "name") {
    return (
      <div style={{ ...styles.page, background: theme.bg, color: theme.text, fontSize, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CanvasCursor />
        <OnboardingName />
      </div>
    );
  }

  // 3. Toca para entrar
  if (!introDone) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={enterApp}
        onKeyDown={(e) => e.key && enterApp()}
        style={{
          ...styles.page,
          background: theme.bg,
          color: theme.text,
          fontSize,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          padding: "max(24px, env(safe-area-inset-top)) 24px max(24px, env(safe-area-inset-bottom))",
          paddingLeft: "max(24px, env(safe-area-inset-left))",
          paddingRight: "max(24px, env(safe-area-inset-right))",
        }}
        aria-label="Entrar a Reflexa"
      >
        <div
          style={{
            fontSize: 56,
            filter: "drop-shadow(0 4px 20px rgba(167, 139, 250, 0.25))",
          }}
        >
          🪞
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(1.75rem, 6vw, 2rem)",
            fontWeight: 800,
            letterSpacing: -0.03,
            lineHeight: 1.1,
          }}
        >
          Reflexa
        </h1>
        <p
          style={{
            margin: 0,
            color: theme.sub,
            fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
            textAlign: "center",
            maxWidth: 280,
            animation: "intro-hint 2s ease-in-out infinite",
          }}
        >
          {t("tapToEnter")}
        </p>
        <div
          style={{
            fontSize: 12,
            color: theme.sub,
            opacity: 0.7,
            marginTop: 8,
          }}
        >
          {t("decideDoubtObserve")}
        </div>
      </div>
    );
  }

  // 4. Carga
  if (loading) {
    return (
      <div
        style={{
          ...styles.page,
          background: theme.bg,
          color: theme.text,
          fontSize,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "max(32px, env(safe-area-inset-top)) 24px max(32px, env(safe-area-inset-bottom))",
          paddingLeft: "max(24px, env(safe-area-inset-left))",
          paddingRight: "max(24px, env(safe-area-inset-right))",
        }}
        aria-live="polite"
        aria-busy="true"
      >
        <p
          key={currentPhrase}
          className="loading-phrase"
          style={{
            margin: 0,
            maxWidth: 420,
            textAlign: "center",
            fontSize: "clamp(1rem, 4vw, 1.25rem)",
            lineHeight: 1.5,
            color: theme.text,
          }}
        >
          {currentPhrase}
        </p>
        <div style={{ marginTop: 48, position: "relative" }}>
          <svg
            width={88}
            height={88}
            viewBox="0 0 88 88"
            style={{ display: "block" }}
            aria-hidden
          >
            <circle
              cx={44}
              cy={44}
              r={40}
              fill="none"
              stroke={theme.panel2}
              strokeWidth={6}
            />
            <circle
              cx={44}
              cy={44}
              r={40}
              fill="none"
              stroke={theme.accent}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - loadProgress / 100)}
              style={{ transition: "stroke-dashoffset 0.1s linear", transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
            {showCheckmark && (
              <path
                d="M28 44 L38 54 L60 32"
                fill="none"
                stroke={theme.accent}
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="loading-check"
              />
            )}
          </svg>
        </div>
      </div>
    );
  }

  const isAbout = view === VIEWS.ABOUT;
  const isEchoIntro = view === VIEWS.ECHO_INTRO;
  const pageBg = isAbout ? "#0d0b12" : isEchoIntro ? "#0c1220" : theme.bg;

  return (
    <div
      style={{
        ...styles.page,
        background: pageBg,
        color: theme.text,
        fontSize,
        position: "relative",
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      <CanvasCursor />
      <div style={{ position: "relative", zIndex: 1, minHeight: "100%", display: "flex", flexDirection: "column", visibility: isAbout || isEchoIntro ? "hidden" : undefined }}>
      <Header
        view={view}
        setView={setView}
        playSettingsOpen={playSettingsOpen}
        onPlaySettingsToggle={() => setPlaySettingsOpen((o) => !o)}
        focusMode={focusMode}
      />

      <div style={{ ...styles.shell, ...(focusMode && styles.shellFocus) }}>
        <div
          style={{
            ...styles.card,
            ...(focusMode && styles.cardFocus),
            background: isAbout ? "transparent" : theme.panel,
            borderColor: isAbout ? "rgba(167, 139, 250, 0.06)" : theme.border,
            boxShadow: isAbout ? "none" : undefined,
            padding: "clamp(18px, 4vw, 24px)",
            transition: "background 0.5s ease, border-color 0.5s ease",
          }}
        >
          {view === VIEWS.HOME && <Home setView={setView} />}
          {view === VIEWS.MODE_ROOT && (
            <ModeRoot
              setView={setView}
              setModeTier={setModeTier}
            />
          )}
          {view === VIEWS.MODE_SELECT && (
            <ModeSelect
              setView={setView}
              showText
              showAudio={modeTier === "pro"}
              onSelectMode={(mode) => {
                setPendingMode(mode);
                setView(VIEWS.ECHO_INTRO);
              }}
            />
          )}
          {view === VIEWS.PLAY && <Play setView={setView} onFocusModeChange={setFocusMode} laboral={modeTier === "pro"} />}
          {view === VIEWS.PLAY_IMAGE && <PlayImage setView={setView} onFocusModeChange={setFocusMode} />}
          {view === VIEWS.PLAY_AUDIO && <PlayAudio setView={setView} />}
          {view === VIEWS.PLAY_WORK && (
            <PlayWork setView={setView} onFocusModeChange={setFocusMode} />
          )}
          {view === VIEWS.ABOUT && <div />}
          {view === VIEWS.SETTINGS && <Settings setView={setView} />}
        </div>

        <div
          style={{
            ...styles.footer,
            color: theme.sub,
            ...(focusMode && styles.footerFocus),
            opacity: isAbout ? 0.12 : undefined,
            transition: "opacity 0.4s ease",
          }}
        >
          <span>REFLEXA</span>
          <span>•</span>
          <span>{t("footerBeta")}</span>
          <span>•</span>
          <span>{t("footerTagline")}</span>
        </div>
      </div>

      {view === VIEWS.PLAY && playSettingsOpen && (
        <PlaySettingsOverlay onClose={() => setPlaySettingsOpen(false)} />
      )}
      </div>

      {isAbout && (
        <div
          className="about-fullscreen-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            overflow: "hidden",
          }}
          aria-hidden={false}
        >
          <div className="app-about-spatial-bg" aria-hidden />
          <div className="app-about-mist" aria-hidden />
          <About setView={setView} />
        </div>
      )}

      {isEchoIntro && pendingMode && (
        <div
          className="about-fullscreen-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            overflow: "hidden",
          }}
          aria-hidden={false}
        >
          <div className="app-echo-spatial-bg" aria-hidden />
          <div className="app-echo-mist" aria-hidden />
          <EchoModeIntro
            mode={pendingMode}
            onContinue={() => {
              const nextView = pendingMode === "image" ? VIEWS.PLAY_IMAGE : pendingMode === "text" ? VIEWS.PLAY : VIEWS.PLAY_AUDIO;
              setPendingMode(null);
              setView(nextView);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppInner />
      </UserProvider>
    </ThemeProvider>
  );
}
