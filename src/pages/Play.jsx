import { useEffect, useState } from "react";
import { styles } from "../styles/ui";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { playSelect, playTimeout, playComplete } from "../utils/sounds";
import { getReflexionFromAI, isReflexionConfigured } from "../utils/feedbackAI";
import { DILEMMAS_LABORALES_TEXTO } from "../data/dilemasLaboralTexto";

const DILEMMAS = [
  {
    id: 1,
    text: "Amas a tu pareja. Una noche eres infiel, pero no sentiste nada emocional. Sabes que confesar destruiría algo que funciona.",
    options: ["Confiesas.", "Lo guardas para siempre."],
  },
  {
    id: 2,
    text: "Un médico te confirma que te quedan 2 años de vida. Tu familia cree que solo es una enfermedad tratable.",
    options: [
      "Les dices la verdad y cambias su mundo.",
      "Los dejas vivir tranquilos hasta que ya no puedas ocultarlo.",
    ],
  },
  {
    id: 3,
    text: "Estás con alguien que te trata increíble, te respeta y te da estabilidad. Pero no te apasiona. Sabes que probablemente nunca sentirás algo más intenso.",
    options: [
      "Te quedas porque es \"lo correcto\".",
      "Lo dejas buscando algo que quizá no exista.",
    ],
  },
  {
    id: 4,
    text: "Tu hijo adolescente comete un delito grave. Hay evidencia clara, pero si testificas honestamente lo enviarán a prisión.",
    options: ["Dices la verdad.", "Mientes para protegerlo."],
  },
  {
    id: 5,
    text: "Después de 20 años juntos, ya no amas a tu pareja, pero tampoco hay conflicto. Separarte la rompería emocionalmente.",
    options: ["Te quedas por estabilidad.", "Te vas por honestidad."],
  },
  {
    id: 6,
    text: "Descubres que tu compañero de trabajo está falsificando cifras para un bono.",
    options: [
      "Lo denuncias y arriesgas tu reputación en el equipo.",
      "Guardas silencio y te beneficias indirectamente.",
    ],
  },
  {
    id: 7,
    text: "Tienes la oportunidad de salvar a un conocido de la cárcel, pero debes mentir y traicionar tu ética.",
    options: ["Lo ayudas y te arriesgas.", "No haces nada y aceptas las consecuencias."],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Play({ setView, onFocusModeChange, laboral = false }) {
  const { theme, soundVolume } = useTheme();
  const pool = laboral ? DILEMMAS_LABORALES_TEXTO : DILEMMAS;

  const TIME_LIMIT = 12;
  const CONTEXT_MS = 5000;      // cuánto dura “solo contexto”
  const STAGGER_MS = 1200;
  const CHOOSE_FEEDBACK_MS = 380;

  const [started, setStarted] = useState(false);
  const [sessionDilemmas, setSessionDilemmas] = useState([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  // controla “cuántas opciones ya se pueden ver”
  const [revealedCount, setRevealedCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackText, setFeedbackText] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);

  // Modo foco: activar cuando estamos en dilema (started, no finished, hay dilemas)
  useEffect(() => {
    const inFocus = started && !finished && sessionDilemmas.length > 0;
    onFocusModeChange?.(inFocus);
    return () => onFocusModeChange?.(false);
  }, [started, finished, sessionDilemmas.length, onFocusModeChange]);

  // Cuando cambia el dilema:
  // 1) muestra solo contexto (revealedCount=0)
  // 2) después de CONTEXT_MS empieza a revelar opciones una por una
  useEffect(() => {
    if (!started || finished) return;

    setRevealedCount(0);
    setTimeLeft(TIME_LIMIT);

    const t1 = setTimeout(() => setRevealedCount(1), CONTEXT_MS);
    const t2 = setTimeout(() => setRevealedCount(2), CONTEXT_MS + STAGGER_MS);
    const t3 = setTimeout(() => setRevealedCount(3), CONTEXT_MS + STAGGER_MS * 2);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [index, started, finished]);

  // ⏱️ El timer empieza cuando ya se revelaron todas las opciones (primero opciones, luego tiempo)
  useEffect(() => {
    if (!started) return;
    if (finished) return;
    if (revealedCount < 3) return;

    if (timeLeft === 0) {
      playTimeout(soundVolume);
      saveAnswer("NO_RESPONDIO");
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished, started, revealedCount]);

  const resetGame = () => {
    setStarted(false);
    setSessionDilemmas([]);
    setIndex(0);
    setTimeLeft(TIME_LIMIT);
    setAnswers([]);
    setFinished(false);
    setRevealedCount(0);
    setSelectedOption(null);
    setFeedbackText(null);
    setFeedbackError(null);
  };

  const DILEMAS_POR_SESION = 10;

  const startGame = () => {
    const mezclados = shuffle([...pool]);
    setSessionDilemmas(mezclados.slice(0, DILEMAS_POR_SESION));
    setStarted(true);
    setIndex(0);
    setTimeLeft(TIME_LIMIT);
    setFinished(false);
    setAnswers([]);
    setRevealedCount(0);
    setSelectedOption(null);
  };

  const pedirReflexion = async () => {
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const text = await getReflexionFromAI(laboral ? "texto_laboral" : "texto", answers);
      setFeedbackText(text);
    } catch (e) {
      setFeedbackError(
        e.message === "NO_CONFIG"
          ? "Configura VITE_REFLEXION_API_URL en .env para ver la reflexión."
          : "No se pudo obtener la reflexión. " + (e.message || "Revisa tu API.")
      );
    } finally {
      setFeedbackLoading(false);
    }
  };

  const saveAnswer = (answer) => {
    if (sessionDilemmas.length === 0) return;
    const dilemma = sessionDilemmas[index];
    const record = {
      dilemmaId: dilemma.id,
      answer,
      timeUsed: TIME_LIMIT - timeLeft,
      context: dilemma.text,
    };

    setAnswers((prev) => [...prev, record]);

    if (index + 1 < sessionDilemmas.length) {
      setIndex((i) => i + 1);
    } else {
      playComplete(soundVolume);
      setFinished(true);
    }
  };

  const chooseOption = (optionText) => {
    if (selectedOption) return;
    playSelect(soundVolume);
    setSelectedOption(optionText);
    setTimeout(() => {
      saveAnswer(optionText);
      setSelectedOption(null);
    }, CHOOSE_FEEDBACK_MS);
  };

  // Pantalla antes de iniciar — estilo premium similar a Modo imagen
  if (!started) {
    return (
      <div className="play-screen mode-image-intro">
        <div className="mode-image-intro-card" style={{ color: theme.text }}>
          <div className="mode-image-intro-icon-wrap">
            <span className="mode-image-intro-icon">📝</span>
          </div>
          <h2
            className="mode-image-intro-title"
            style={{ color: theme.text }}
          >
            {laboral ? "Modo texto laboral" : "Modo texto"}
          </h2>
          <p
            className="mode-image-intro-sub"
            style={{ color: theme.sub }}
          >
            {pool.length} dilemas escritos. Elige palabra a palabra.
          </p>
          <button
            type="button"
            onClick={startGame}
            className="mode-image-intro-primary"
            style={{ background: theme.accent, color: theme.bg }}
          >
            Empezar
          </button>
          <button
            type="button"
            onClick={() => setView(VIEWS.MODE_SELECT)}
            className="mode-image-intro-secondary"
            style={{ borderColor: theme.border, color: theme.sub }}
          >
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  // 🧾 Resultados — solo retroalimentación, deluxe (botón siempre visible)
  if (finished) {
    return (
      <div className="play-screen play-results play-results--deluxe">
        <div className="play-results__header">
          <span className="play-results__icon" aria-hidden>🪞</span>
          <h2 className="play-results__title">Tu reflexión</h2>
          <p className="play-results__subtitle">Sin juicio. Solo para que te mires.</p>
        </div>

        <div className="play-results__feedback-wrap">
          {!feedbackText && !feedbackLoading && !feedbackError && (
            <button type="button" className="play-results__cta" onClick={pedirReflexion}>
              Ver retroalimentación
            </button>
          )}
          {feedbackLoading && (
            <div className="play-results__loading">
              <div className="play-results__loading-dots">
                <span className="play-results__loading-dot" />
                <span className="play-results__loading-dot" />
                <span className="play-results__loading-dot" />
              </div>
              <p>Generando tu reflexión…</p>
            </div>
          )}
          {feedbackError && (
            <p className="play-results__error">{feedbackError}</p>
          )}
          {feedbackText && (
            <div className="play-results__card" style={{ borderColor: theme.accent }}>
              <div className="play-results__card-inner" style={{ color: theme.text }}>
                {feedbackText}
              </div>
            </div>
          )}
        </div>

        <div className="play-results__actions">
          <button type="button" className="play-results__btn play-results__btn--primary" style={{ background: theme.accent }} onClick={resetGame}>
            Volver a jugar
          </button>
          <button type="button" className="play-results__btn play-results__btn--secondary" style={{ borderColor: theme.border, color: theme.text }} onClick={() => setView(VIEWS.HOME)}>
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  if (sessionDilemmas.length === 0) {
    return (
      <div style={{ color: theme.sub, padding: 12 }}>Preparando…</div>
    );
  }

  const dilemma = sessionDilemmas[index];
  const options = dilemma.options;

  const optionStyle = (pos, optionText) => {
    const visible = revealedCount >= pos;
    const selected = selectedOption === optionText;
    return {
      ...styles.choice,
      borderColor: selected ? theme.accent : theme.border,
      background: selected ? theme.accent : theme.panel2,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(10px)",
      transition: "opacity 220ms ease, transform 220ms ease",
      pointerEvents: visible && !selectedOption ? "auto" : "none",
      minHeight: 56,
      padding: "16px 18px",
      borderRadius: 18,
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      textAlign: "left",
    };
  };

  const contextOnly = revealedCount === 0;

  return (
    <div className="play-screen play-game">
      <div key={index} className="dilema-fade">
        {/* CONTEXTO */}
        <div
          style={{
            padding: 18,
            borderRadius: 22,
            border: `2px solid ${theme.border}`,
            background: theme.panel2,
          }}
        >
          <div style={{ fontSize: 11, color: theme.sub, fontWeight: 900, letterSpacing: 0.5, marginBottom: 8 }}>
            CONTEXTO
          </div>
          <h2 style={{ ...styles.h2, marginTop: 0, fontSize: "clamp(1.05rem, 4vw, 1.2rem)", lineHeight: 1.4 }}>
            {dilemma.text}
          </h2>
          {contextOnly && (
            <p style={{ marginTop: 12, color: theme.sub, fontSize: 14 }}>
              Piensa… luego aparecen las opciones 👇
            </p>
          )}
        </div>

        {/* DECISIÓN */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 11, color: theme.sub, fontWeight: 900, letterSpacing: 0.5, marginBottom: 12 }}>
            ELIGE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {options[0] && (
              <button
                type="button"
                onClick={() => chooseOption(options[0])}
                style={optionStyle(1, options[0])}
              >
                {selectedOption === options[0] ? "✓ " : ""}{options[0]}
              </button>
            )}
            {options[1] && (
              <button
                type="button"
                onClick={() => chooseOption(options[1])}
                style={optionStyle(2, options[1])}
              >
                {selectedOption === options[1] ? "✓ " : ""}{options[1]}
              </button>
            )}
            {options[2] && (
              <button
                type="button"
                onClick={() => chooseOption(options[2])}
                style={optionStyle(3, options[2])}
              >
                {selectedOption === options[2] ? "✓ " : ""}{options[2]}
              </button>
            )}
          </div>

          {/* ⏱️ Timer y progreso — móvil (aparece después de las opciones) */}
          {revealedCount >= 3 && (
            <div
              className="timer-entrada"
              style={{
                marginTop: 20,
                padding: 16,
                borderRadius: 22,
                border: `2px solid ${theme.border}`,
                background: theme.panel,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: theme.sub, fontWeight: 900 }}>
                  ⏱️ {timeLeft}s
                </span>
                <span style={{ fontSize: 13, color: theme.sub }}>
                  Dilema {index + 1} de {sessionDilemmas.length}
                </span>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.12)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(timeLeft / TIME_LIMIT) * 100}%`,
                    background: theme.danger,
                    borderRadius: 999,
                    transition: "width 1s linear",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14 }}>
                {sessionDilemmas.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: i === index ? theme.accent : "rgba(255,255,255,0.25)",
                      transition: "background 0.2s ease",
                    }}
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          )}

      </div>
      </div>
    </div>
  );
}
