import { useEffect, useRef, useState } from "react";
import { useTheme, VIEWS } from "../context/ThemeContext";
import { playTimeout } from "../utils/sounds";
import { getReflexionFromAI, isReflexionConfigured } from "../utils/feedbackAI";

const TIME_LIMIT_IMAGEN = 12;

// Morados finos y profesionales (suaves, menos saturados)
const COLOR_FONDO_OPCION_A = "#8b7fb8";
const COLOR_FONDO_OPCION_B = "#a89ec9";

// Contenedor cuadrado: recorte centrado + fondo. dimmed = la opción no elegida (se oscurece ~3 s)
function OpcionImage({ src, alt, label, theme, selected, backgroundColor, dimmed }) {
  const [error, setError] = useState(false);
  const bg = backgroundColor || theme.panel;

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "100%",
          background: bg,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {!error ? (
          <img
            key={src}
            src={src}
            alt={alt}
            onError={() => setError(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              display: "block",
              pointerEvents: "none",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.sub,
              fontSize: 14,
              fontWeight: 700,
              padding: 12,
              textAlign: "center",
            }}
          >
            Añade la imagen en public/imagenes/
          </div>
        )}
        {dimmed && <div className="opcion-dimmed-overlay" aria-hidden />}
        {selected && (
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: theme.accent,
              color: theme.bg,
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 16,
            }}
          >
            ✓
          </span>
        )}
      </div>
      <span
        style={{
          padding: "10px 12px",
          fontSize: 13,
          fontWeight: 700,
          color: theme.text,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {label}
      </span>
    </>
  );
}

// Concepto: imagen BASE = "solo hay uno". Luego dos imágenes: ¿a quién se lo das?
// Si contextOnly: una sola imagen de contexto (todo en una); opciones = solo botones Izq/Der (sin imágenes).
// label = texto visible. contextForAI = etiqueta para la IA.
const DILEMAS_IMAGEN = [
  {
    id: 1,
    baseImage: "DONA_SALVAVIDAS.png",
    optionA: {
      image: "CACHORRO_LUCHANDO_AGUA.png",
      label: "Opción A",
      contextForAI: "cachorro_intentando_no_ahogarse",
    },
    optionB: {
      image: "BEBE_LUCHANDO_AGUA.png",
      label: "Opción B",
      contextForAI: "bebe_intentando_no_ahogarse",
    },
  },
  {
    id: 2,
    baseImage: "DONA_SALVAVIDAS.png",
    optionA: {
      image: "CACHORRO_LUCHANDO_AGUA.png",
      label: "Opción A",
      contextForAI: "cachorro_intentando_no_ahogarse",
    },
    optionB: {
      image: "ABUELA_LUCHANDO_AGUA.png",
      label: "Opción B",
      contextForAI: "abuela_intentando_no_ahogarse",
    },
  },
  {
    id: 3,
    baseImage: "DONA_SALVAVIDAS.png",
    optionA: {
      image: "MADRE_E_HIJO_LUCHANDO_AGUA.png",
      label: "Opción A",
      contextForAI: "madre_e_hijo_intentando_no_ahogarse",
    },
    optionB: {
      image: "MADRE_EMBARAZADA_LUCHANDO_AGUA.png",
      label: "Opción B",
      contextForAI: "madre_embarazada_intentando_no_ahogarse",
    },
  },
  {
    id: 4,
    baseImage: "MANOS_COMIDA.png",
    optionA: {
      image: "NIÑO_CON_HAMBRE.png",
      label: "Opción A",
      contextForAI: "nino_con_hambre",
    },
    optionB: {
      image: "PERROS_CON_HAMBRE.png",
      label: "Opción B",
      contextForAI: "perros_con_hambre",
    },
  },
  {
    id: 5,
    baseImage: "DONA_SALVAVIDAS.png",
    optionA: {
      image: "PERSONA_TES_BLANCA_LUCHANDO_AGUA.png",
      label: "Opción A",
      contextForAI: "persona_tez_blanca_luchando_agua",
    },
    optionB: {
      image: "PERSONA_TES_MORENA_LUCHANDO_AGUA.png",
      label: "Opción B",
      contextForAI: "persona_tez_morena_luchando_agua",
    },
  },
  // Un solo lugar disponible: izquierda = vagabundo, derecha = persona LGBT (imagen completa, solo botones)
  {
    id: 6,
    contextOnly: true,
    contextImage: "TRANSPORTE_BUS_VAGABUNDO_Y_PERSONA_COMUNIDAD.png",
    optionA: { label: "Izquierda", contextForAI: "lado_izquierdo_vagabundo" },
    optionB: { label: "Derecha", contextForAI: "lado_derecho_persona_lgbt" },
  },
  // Un solo puesto de trabajo: ¿a quién contratas? Izq = persona sobrepeso, Der = persona deportiva tez morena.
  {
    id: 7,
    contextOnly: true,
    contextImage: "CONTRATO_TRABAJO_PERSONA_SOBREPESO_Y_PERSONA_DEPORTIVA_TES_MORENA.png",
    optionA: { label: "Izquierda", contextForAI: "persona_sobrepeso_camisa_blanca" },
    optionB: { label: "Derecha", contextForAI: "persona_deportiva_tez_morena" },
  },
  // Bombero solo puede salvar a uno: Izq = abuelo/adulto mayor, Der = joven.
  {
    id: 8,
    contextOnly: true,
    contextImage: "BOMBERO_SALVA_UNO_ABUELO_Y_JOVEN.png",
    optionA: { label: "Izquierda", contextForAI: "abuelo_adulto_mayor" },
    optionB: { label: "Derecha", contextForAI: "joven" },
  },
  // Bombero solo puede salvar a uno: Izq = pareja gay, Der = pareja lesbiana.
  {
    id: 9,
    contextOnly: true,
    contextImage: "BOMBERO_PAREJA_GAY_PAREJA_LESBIANA.png",
    optionA: { label: "Izquierda", contextForAI: "pareja_gay" },
    optionB: { label: "Derecha", contextForAI: "pareja_lesbiana" },
  },
  // Avión cayendo, paracaidista solo salva a uno: Izq = mujer afroamericana con sobrepeso, Der = joven blanco con tatuajes.
  {
    id: 10,
    contextOnly: true,
    contextImage: "AVION_CAYENDO_PARACAIDISTA_MUJER_AFRO_SOBREPESO_JOVEN_BLANCO_TATUAJES.png",
    optionA: { label: "Izquierda", contextForAI: "mujer_afroamericana_sobrepeso" },
    optionB: { label: "Derecha", contextForAI: "joven_blanco_tatuajes" },
  },
  // Avión cayendo, paracaidista solo salva a uno: Izq = niño afroamericano, Der = niña blanca rubia.
  {
    id: 11,
    contextOnly: true,
    contextImage: "AVION_CAYENDO_PARACAIDISTA_NIÑO_AFRO_NIÑA_BLANCA_RUBIA.png",
    optionA: { label: "Izquierda", contextForAI: "nino_afroamericano" },
    optionB: { label: "Derecha", contextForAI: "nina_blanca_rubia" },
  },
];

const IMAGENES_BASE = "/imagenes";
const IMAGEN_BASE_MAX_ANCHO = 320;
// Fondo serio para PNG del salvavidas (neutro, sobrio)
const COLOR_FONDO_SALVAVIDAS = "#2d3748";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PlayImage({ setView, onFocusModeChange }) {
  const { theme, soundVolume } = useTheme();
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_IMAGEN);
  const [transitionOut, setTransitionOut] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [feedbackText, setFeedbackText] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);
  const timeoutHandledRef = useRef(false);
  const timerIdRef = useRef(null);

  const startGame = () => {
    setSession(shuffle([...DILEMAS_IMAGEN]));
    setStarted(true);
    setIndex(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
    setTimeLeft(TIME_LIMIT_IMAGEN);
    setTransitionOut(false);
    setShowOptions(false);
    setShowTimer(false);
    setFeedbackText(null);
    setFeedbackError(null);
  };

  const resetAndGoMenu = () => {
    setStarted(false);
    setSession([]);
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setTimeLeft(TIME_LIMIT_IMAGEN);
    setView(VIEWS.MODE_SELECT);
  };

  const saveAnswerNoRespondio = () => {
    if (session.length === 0) return;
    const item = session[index];
    setAnswers((a) => [
      ...a,
      { dilemmaId: item.id, choice: "NO_RESPONDIO", optionContext: null },
    ]);
    if (index + 1 >= session.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(TIME_LIMIT_IMAGEN);
      setShowOptions(false);
      setShowTimer(false);
    }
  };

  // Modo foco: activar cuando estamos en dilema (started, no finished)
  useEffect(() => {
    const inFocus = started && !finished && session.length > 0;
    onFocusModeChange?.(inFocus);
    return () => onFocusModeChange?.(false);
  }, [started, finished, session.length, onFocusModeChange]);

  useEffect(() => {
    if (!started || finished || session.length === 0) return;
    setTimeLeft(TIME_LIMIT_IMAGEN);
    setShowOptions(false);
    setShowTimer(false);
    timeoutHandledRef.current = false;
    const t1 = setTimeout(() => setShowOptions(true), 2500);
    const t2 = setTimeout(() => setShowTimer(true), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [index, started, finished, session.length]);

  useEffect(() => {
    if (!started || finished || selected || !showOptions || !showTimer) return;
    if (timeLeft === 0) {
      if (!timeoutHandledRef.current) {
        timeoutHandledRef.current = true;
        playTimeout(soundVolume);
        saveAnswerNoRespondio();
      }
      return;
    }
    timerIdRef.current = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    };
  }, [timeLeft, started, finished, selected, showOptions, showTimer, index, session.length]);

  const choose = (optionKey) => {
    if (selected || session.length === 0) return;
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    setSelected(optionKey);
    const item = session[index];
    const option = optionKey === "A" ? item.optionA : item.optionB;
    setAnswers((a) => [
      ...a,
      {
        dilemmaId: item.id,
        choice: optionKey,
        optionContext: option.contextForAI,
      },
    ]);
    setTimeout(() => {
      setTransitionOut(true);
      setTimeout(() => {
        if (index + 1 >= session.length) {
          setFinished(true);
        } else {
          setIndex((i) => i + 1);
          setSelected(null);
          setTimeLeft(TIME_LIMIT_IMAGEN);
          setShowOptions(false);
          setShowTimer(false);
        }
        setTransitionOut(false);
      }, 450);
    }, 1500);
  };

  const current = session[index];
  const hasDilemas = DILEMAS_IMAGEN.length > 0;

  // Sin imágenes configuradas
  if (!hasDilemas) {
    return (
      <div
        className="play-screen"
        style={{
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 20 }}>🖼️</div>
        <h2
          style={{
            margin: "0 0 12px",
            fontSize: "clamp(1.25rem, 5vw, 1.5rem)",
            fontWeight: 800,
            color: theme.text,
          }}
        >
          Modo imagen
        </h2>
        <p style={{ margin: 0, color: theme.sub, fontSize: 15, lineHeight: 1.5, marginBottom: 24 }}>
          Añade imágenes en la carpeta <code style={{ background: theme.panel2, padding: "2px 6px", borderRadius: 6 }}>public/imagenes/</code> y
          configura la lista <code style={{ background: theme.panel2, padding: "2px 6px", borderRadius: 6 }}>DILEMAS_IMAGEN</code> en <code style={{ background: theme.panel2, padding: "2px 6px", borderRadius: 6 }}>PlayImage.jsx</code>.
        </p>
        <p style={{ margin: 0, color: theme.sub, fontSize: 13, lineHeight: 1.5, marginBottom: 32 }}>
          Si me mandas las imágenes por el chat, te indico cómo guardarlas y qué nombres poner aquí.
        </p>
        <button
          type="button"
          onClick={() => setView(VIEWS.MODE_SELECT)}
          style={{
            padding: "16px 24px",
            borderRadius: 18,
            border: `2px solid ${theme.border}`,
            background: theme.panel2,
            color: theme.text,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Volver al menú
        </button>
      </div>
    );
  }

  // Pantalla "¿Listo?"
  if (!started) {
    return (
      <div className="play-screen mode-image-intro">
        <div className="mode-image-intro-card" style={{ color: theme.text }}>
          <div className="mode-image-intro-icon-wrap">
            <span className="mode-image-intro-icon">🖼️</span>
          </div>
          <h2 className="mode-image-intro-title" style={{ color: theme.text }}>
            Modo imagen
          </h2>
          <p
            className="mode-image-intro-sub"
            style={{ color: theme.sub }}
          >
            {DILEMAS_IMAGEN.length} escenario(s). Elige con qué te identificas más.
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

  const pedirReflexion = async () => {
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const text = await getReflexionFromAI("imagen", answers);
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

  // Resultados: solo retroalimentación, deluxe (botón siempre visible)
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
          <button type="button" className="play-results__btn play-results__btn--primary" style={{ background: theme.accent }} onClick={startGame}>
            Volver a jugar
          </button>
          <button type="button" className="play-results__btn play-results__btn--secondary" style={{ borderColor: theme.border, color: theme.text }} onClick={resetAndGoMenu}>
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  // Ronda: imagen BASE ("solo hay uno") + dos imágenes para elegir; o contextOnly = una imagen + botones Izq/Der.
  const isContextOnly = current.contextOnly === true;
  const baseSrc = isContextOnly
    ? `${IMAGENES_BASE}/${current.contextImage}`
    : `${IMAGENES_BASE}/${current.baseImage}`;
  const srcA = isContextOnly ? null : `${IMAGENES_BASE}/${current.optionA.image}`;
  const srcB = isContextOnly ? null : `${IMAGENES_BASE}/${current.optionB.image}`;

  if (isContextOnly) {
    return (
      <div className="play-screen" style={{ padding: "16px 12px 32px" }}>
        <div className={transitionOut ? "dilema-salida" : "dilema-fade"} style={{ minHeight: 1 }}>
          <div style={{ marginBottom: showOptions ? 20 : 12, maxWidth: IMAGEN_BASE_MAX_ANCHO, marginLeft: "auto", marginRight: "auto" }}>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
                position: "relative",
                width: "100%",
                paddingBottom: "85%",
                background: COLOR_FONDO_SALVAVIDAS,
              }}
            >
              <img
                src={baseSrc}
                alt="Contexto"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </div>
            {showOptions && (
              <p style={{ margin: "12px 0 0", fontSize: 12, fontWeight: 800, color: theme.sub, textTransform: "uppercase", letterSpacing: 0.08, textAlign: "center" }}>
                Solo un lugar disponible.
              </p>
            )}
          </div>
          {showOptions && (
            <div className="opciones-entrada">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: showTimer ? 20 : 24 }}>
                <button
                  type="button"
                  onClick={() => choose("A")}
                  disabled={!!selected}
                  style={{
                    padding: "18px 16px",
                    border: `3px solid ${selected === "A" ? theme.accent : theme.border}`,
                    borderRadius: 18,
                    background: COLOR_FONDO_OPCION_A,
                    color: theme.text,
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: selected ? "default" : "pointer",
                    touchAction: "manipulation",
                  }}
                >
                  {current.optionA.label}
                </button>
                <button
                  type="button"
                  onClick={() => choose("B")}
                  disabled={!!selected}
                  style={{
                    padding: "18px 16px",
                    border: `3px solid ${selected === "B" ? theme.accent : theme.border}`,
                    borderRadius: 18,
                    background: COLOR_FONDO_OPCION_B,
                    color: theme.text,
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: selected ? "default" : "pointer",
                    touchAction: "manipulation",
                  }}
                >
                  {current.optionB.label}
                </button>
              </div>
              {showTimer && (
                <div className="timer-entrada" style={{ marginBottom: 20, padding: 14, borderRadius: 18, border: `2px solid ${theme.border}`, background: theme.panel }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: theme.sub, fontWeight: 900 }}>⏱️ {timeLeft}s</span>
                    <span style={{ fontSize: 13, color: theme.sub }}>{index + 1} de {session.length}</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 999, overflow: "hidden", background: "rgba(255,255,255,0.12)" }}>
                    <div style={{ height: "100%", width: `${(timeLeft / TIME_LIMIT_IMAGEN) * 100}%`, background: theme.danger, borderRadius: 999, transition: "width 1s linear" }} />
                  </div>
                </div>
              )}
              <div style={{ marginBottom: 16, fontSize: 13, color: theme.sub }}>{index + 1} / {session.length}</div>
              <button type="button" onClick={resetAndGoMenu} style={{ display: "block", margin: "0 auto", padding: "12px 20px", borderRadius: 14, border: `1px solid ${theme.border}`, background: "transparent", color: theme.sub, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Salir al menú
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="play-screen" style={{ padding: "16px 12px 32px" }}>
      <div
        className={transitionOut ? "dilema-salida" : "dilema-fade"}
        style={{ minHeight: 1 }}
      >
      {/* Imagen base + texto debajo, centrado */}
      <div style={{ marginBottom: showOptions ? 20 : 12, maxWidth: IMAGEN_BASE_MAX_ANCHO, marginLeft: "auto", marginRight: "auto" }}>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
            position: "relative",
            width: "100%",
            paddingBottom: "85%",
            background: COLOR_FONDO_SALVAVIDAS,
          }}
        >
          <img
            src={baseSrc}
            alt="Solo hay uno"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </div>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 11,
            fontWeight: 800,
            color: theme.sub,
            textTransform: "uppercase",
            letterSpacing: 0.08,
            textAlign: "center",
          }}
        >
          Solo hay uno.
        </p>
        {showOptions && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 700,
              color: theme.text,
              textAlign: "center",
            }}
          >
            ¿A quién se lo das?
          </p>
        )}
      </div>
      {showOptions && (
        <div className="opciones-entrada">
      {/* Primero las dos opciones */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: showTimer ? 20 : 24 }}>
        <button
          type="button"
          onClick={() => choose("A")}
          disabled={!!selected}
          style={{
            padding: 0,
            border: `3px solid ${selected === "A" ? theme.accent : theme.border}`,
            borderRadius: 18,
            overflow: "hidden",
            background: COLOR_FONDO_OPCION_A,
            cursor: selected ? "default" : "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            minHeight: 120,
            touchAction: "manipulation",
          }}
        >
          <OpcionImage
            key={`${index}-A`}
            src={srcA}
            alt={current.optionA.label}
            label={current.optionA.label}
            theme={theme}
            selected={selected === "A"}
            dimmed={selected !== null && selected !== "A"}
            backgroundColor={COLOR_FONDO_OPCION_A}
          />
        </button>

        <button
          type="button"
          onClick={() => choose("B")}
          disabled={!!selected}
          style={{
            padding: 0,
            border: `3px solid ${selected === "B" ? theme.accent : theme.border}`,
            borderRadius: 18,
            overflow: "hidden",
            background: COLOR_FONDO_OPCION_B,
            cursor: selected ? "default" : "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            minHeight: 120,
            touchAction: "manipulation",
          }}
        >
          <OpcionImage
            key={`${index}-B`}
            src={srcB}
            alt={current.optionB.label}
            label={current.optionB.label}
            theme={theme}
            selected={selected === "B"}
            dimmed={selected !== null && selected !== "B"}
            backgroundColor={COLOR_FONDO_OPCION_B}
          />
        </button>
      </div>

      {/* Después el reloj (timer) */}
      {showTimer && (
      <div
        className="timer-entrada"
        style={{
          marginBottom: 20,
          padding: 14,
          borderRadius: 18,
          border: `2px solid ${theme.border}`,
          background: theme.panel,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: theme.sub, fontWeight: 900 }}>
            ⏱️ {timeLeft}s
          </span>
          <span style={{ fontSize: 13, color: theme.sub }}>
            {index + 1} de {session.length}
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
              width: `${(timeLeft / TIME_LIMIT_IMAGEN) * 100}%`,
              background: theme.danger,
              borderRadius: 999,
              transition: "width 1s linear",
            }}
          />
        </div>
      </div>
      )}

      <div style={{ marginBottom: 16, fontSize: 13, color: theme.sub }}>
        {index + 1} / {session.length}
      </div>
      <button
        type="button"
        onClick={resetAndGoMenu}
        style={{
          display: "block",
          margin: "0 auto",
          padding: "12px 20px",
          borderRadius: 14,
          border: `1px solid ${theme.border}`,
          background: "transparent",
          color: theme.sub,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Salir al menú
      </button>
        </div>
      )}
      </div>
    </div>
  );
}
