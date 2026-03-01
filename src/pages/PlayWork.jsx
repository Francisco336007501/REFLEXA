import { useEffect, useState } from "react";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { styles } from "../styles/ui";

// Dilemas laborales placeholder — estructura mínima { contexto, opciones[] }
const DILEMAS_LABORALES = [
  {
    id: 1,
    contexto:
      "Te ascienden a una posición de liderazgo. Sabes que uno de tus amigos en el equipo no está rindiendo bien desde hace meses.",
    opciones: [
      "Hablas con él a solas y retrasas cualquier decisión formal.",
      "Reportas la situación tal cual a RH aunque afecte la relación.",
    ],
  },
];

export function PlayWork({ setView, onFocusModeChange }) {
  const { theme, titleFont } = useTheme();
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState([]);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const inFocus = started && !finished && session.length > 0;
    onFocusModeChange?.(inFocus);
    return () => onFocusModeChange?.(false);
  }, [started, finished, session.length, onFocusModeChange]);

  const startSession = () => {
    setSession([...DILEMAS_LABORALES]);
    setIndex(0);
    setFinished(false);
    setSelectedOption(null);
    setAnswers([]);
    setStarted(true);
  };

  const resetToMenu = () => {
    setStarted(false);
    setSession([]);
    setIndex(0);
    setFinished(false);
    setSelectedOption(null);
    setAnswers([]);
    setView(VIEWS.MODE_SELECT);
  };

  const current = session[index];

  const handleChoose = (optionText) => {
    if (!current || selectedOption) return;
    setSelectedOption(optionText);
    const record = {
      dilemmaId: current.id,
      contexto: current.contexto,
      respuesta: optionText,
    };
    setAnswers((prev) => [...prev, record]);

    // Por ahora, sesión mínima de un solo dilema
    setTimeout(() => {
      setFinished(true);
    }, 350);
  };

  const optionStyle = (optionText) => {
    const selected = selectedOption === optionText;
    return {
      ...styles.choice,
      borderWidth: 2,
      borderColor: selected ? theme.accent : theme.border,
      background: selected
        ? `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`
        : "rgba(15,23,42,0.94)",
      color: selected ? theme.bg : theme.text,
      padding: "16px 18px",
      borderRadius: 20,
      fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
      textAlign: "left",
      boxShadow: selected
        ? `0 10px 34px ${theme.accent}55, 0 0 0 1px rgba(255,255,255,0.18) inset`
        : "0 6px 22px rgba(0,0,0,0.45)",
      display: "block",
      width: "100%",
      cursor: selectedOption ? "default" : "pointer",
    };
  };

  // Pantalla de inicio del modo — deluxe, sobria
  if (!started) {
    return (
      <div className="play-screen play-screen--mode-intro">
        <div
          style={{
            borderRadius: 28,
            padding: "28px 22px 24px",
            border: "1px solid rgba(148, 163, 184, 0.6)",
            background:
              "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(167,139,250,0.2), transparent 55%), rgba(15,23,42,0.96)",
            boxShadow:
              "0 20px 60px rgba(15,23,42,0.9), 0 0 0 1px rgba(15,23,42,0.8) inset",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid rgba(148, 163, 184, 0.6)",
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))",
              fontSize: 11,
              letterSpacing: 0.12,
              textTransform: "uppercase",
              color: "rgba(226,232,240,0.88)",
              marginBottom: 18,
            }}
          >
            <span style={{ fontSize: 14 }}>💼</span>
            <span>MODO LABORAL · DELUXE</span>
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              fontSize: titleFont,
              letterSpacing: -0.03,
              lineHeight: 1.2,
              color: theme.text,
            }}
          >
            Dilemas de trabajo
          </h2>

          <p
            style={{
              margin: "0 0 18px",
              fontSize: 14,
              color: theme.sub,
              lineHeight: 1.6,
            }}
          >
            Escenarios incómodos del entorno laboral. Sin juicios. Sin
            respuestas correctas.
          </p>

          <div
            style={{
              marginBottom: 20,
              padding: 12,
              borderRadius: 18,
              border: `1px dashed ${theme.border}`,
              background: "rgba(15,23,42,0.9)",
              fontSize: 12,
              color: theme.sub,
            }}
          >
            No es capacitación corporativa ni asesoría legal. Solo un espacio
            para observar tus decisiones.
          </div>

          <button
            type="button"
            onClick={startSession}
            style={{
              ...styles.primary,
              width: "100%",
              borderRadius: 22,
              background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}ee 50%, #38bdf8 100%)`,
              color: "#0b1120",
              fontSize: 16,
              marginTop: 4,
              boxShadow:
                "0 12px 40px rgba(56,189,248,0.45), 0 0 0 1px rgba(255,255,255,0.12) inset",
            }}
          >
            Comenzar
          </button>

          <button
            type="button"
            onClick={() => setView(VIEWS.MODE_SELECT)}
            style={{
              ...styles.secondary,
              marginTop: 12,
              width: "100%",
              borderRadius: 18,
              borderColor: theme.border,
              background: "transparent",
              color: theme.sub,
              fontSize: 14,
            }}
          >
            Volver a modos
          </button>
        </div>
      </div>
    );
  }

  // Resultados mínimos — placeholder para futura reflexión IA
  if (finished) {
    return (
      <div className="play-screen play-results">
        <div
          style={{
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: 32,
              marginBottom: 8,
              filter: "drop-shadow(0 4px 18px rgba(56,189,248,0.4))",
            }}
            aria-hidden
          >
            🪟
          </span>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
              fontWeight: 800,
              letterSpacing: -0.02,
              color: theme.text,
            }}
          >
            Sesión laboral lista
          </h2>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 14,
              color: theme.sub,
            }}
          >
            Aquí se mostrará tu reflexión laboral final.
          </p>
        </div>

        <div
          style={{
            borderRadius: 24,
            padding: 2,
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.4), rgba(56,189,248,0.06))",
            boxShadow: "0 10px 36px rgba(15,23,42,0.9)",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              borderRadius: 22,
              padding: "18px 18px 20px",
              background: "rgba(15,23,42,0.98)",
              color: theme.sub,
              fontSize: 14,
              lineHeight: 1.7,
              minHeight: 80,
            }}
          >
            Placeholder de reflexión. El modo laboral usará el sistema de IA de
            Reflexa para devolver un texto sobre tus decisiones en próximas
            iteraciones.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={startSession}
            style={{
              ...styles.primary,
              borderRadius: 20,
              background: theme.accent,
              color: "#0b1120",
              fontSize: 15,
            }}
          >
            Volver a jugar este modo
          </button>

          <button
            type="button"
            onClick={resetToMenu}
            style={{
              ...styles.secondary,
              borderRadius: 18,
              borderColor: theme.border,
              background: "transparent",
              color: theme.sub,
              fontSize: 14,
            }}
          >
            Volver a modos
          </button>
        </div>
      </div>
    );
  }

  // Dilema activo
  if (!current) {
    return (
      <div className="play-screen">
        <p style={{ color: theme.sub, fontSize: 14 }}>Preparando dilema…</p>
      </div>
    );
  }

  return (
    <div className="play-screen play-game">
      <div className="dilema-fade">
        <div
          style={{
            padding: 18,
            borderRadius: 24,
            border: `1px solid ${theme.border}`,
            background:
              "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.14), transparent 55%), rgba(15,23,42,0.96)",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: theme.sub,
              fontWeight: 900,
              letterSpacing: 0.5,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            Contexto laboral
          </div>
          <h2
            style={{
              ...styles.h2,
              marginTop: 0,
              fontSize: "clamp(1.02rem, 4vw, 1.2rem)",
              lineHeight: 1.5,
            }}
          >
            {current.contexto}
          </h2>
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              color: theme.sub,
              fontWeight: 900,
              letterSpacing: 0.5,
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            Elige cómo actuarías
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {current.opciones.map((opcion) => (
              <button
                key={opcion}
                type="button"
                onClick={() => handleChoose(opcion)}
                style={optionStyle(opcion)}
              >
                {selectedOption === opcion ? "✓ " : ""}
                {opcion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

