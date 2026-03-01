/**
 * Retroalimentación con IA para Reflexa
 *
 * Cómo usarlo:
 * 1. Crea un backend (Node/Express, Vercel Function, etc.) que reciba POST con
 *    { mode, choices } y llame a OpenAI/Anthropic con tu API key (en env).
 * 2. En .env pon: VITE_REFLEXION_API_URL=https://tu-dominio.com/api/reflexion
 * 3. El backend debe devolver { text: "..." } con la reflexión en español.
 *
 * No pongas la API key en el frontend. Solo en el backend.
 */

const API_URL = import.meta.env.VITE_REFLEXION_API_URL || "";

function formatContext(ctx) {
  if (!ctx) return "";
  return ctx.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Construye el texto de elecciones para el prompt (Modo Imagen)
 */
export function buildChoicesTextImage(answers) {
  return answers
    .map((a, i) => {
      const num = i + 1;
      if (a.choice === "NO_RESPONDIO") return `${num}. No respondió.`;
      const ctx = a.optionContext ? formatContext(a.optionContext) : `Opción ${a.choice}`;
      return `${num}. Eligió: ${ctx}`;
    })
    .join("\n");
}

/**
 * Construye el texto de elecciones para el prompt (Modo Texto)
 */
export function buildChoicesTextMode(answers) {
  return answers
    .map((a, i) => {
      const num = i + 1;
      if (a.answer === "NO_RESPONDIO") return `${num}. No respondió.`;
      return `${num}. Eligió: ${a.answer}`;
    })
    .join("\n");
}

/**
 * Construye el prompt que enviarás a la IA (para que tu backend lo use)
 */
export function buildPromptForReflexion(mode, answers) {
  const choicesText =
    mode === "imagen" ? buildChoicesTextImage(answers) : buildChoicesTextMode(answers);
  return `Eres un asistente de reflexión, sin juzgar. El usuario acaba de completar unos dilemas en la app Reflexa (modo ${mode}). Sus elecciones fueron:

${choicesText}

Responde en 2-4 frases breves, en español. No des consejos morales ni digas si está bien o mal. Solo invita a reflexionar sobre lo que eligió, con calidez y sin juicio.`;
}

/**
 * Llama a tu API de retroalimentación. Tu backend debe:
 * - Recibir POST con body: { mode: "imagen"|"texto", choices: array de respuestas }
 * - Llamar a OpenAI/Anthropic con buildPromptForReflexion(mode, choices)
 * - Devolver JSON: { text: "La reflexión en español" }
 */
export async function getReflexionFromAI(mode, answers) {
  if (!API_URL) {
    throw new Error("NO_CONFIG");
  }

  // Formato que espera tu Worker: responses[] con { choice, time, context }
  const responses =
    mode === "imagen"
      ? answers.map((a) => ({
          choice: a.choice === "NO_RESPONDIO" ? "No respondió" : (a.optionContext ? formatContext(a.optionContext) : a.choice),
          time: 0,
          context: a.optionContext ? formatContext(a.optionContext) : "",
        }))
      : answers.map((a) => ({
          choice: a.answer === "NO_RESPONDIO" ? "No respondió" : a.answer,
          time: Number(a.timeUsed) || 0,
          context: a.context || "",
        }));

  let res;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responses }),
    });
  } catch (err) {
    throw new Error("RED: " + (err.message || "No se pudo conectar. ¿CORS en tu Worker?"));
  }

  if (!res.ok) {
    let detail = res.status + " " + res.statusText;
    try {
      const body = await res.text();
      if (body) detail += " — " + body.slice(0, 150);
    } catch (_) {}
    throw new Error("API_ERROR: " + detail);
  }

  const data = await res.json().catch(() => ({}));
  const text = data.text ?? data.reflexion ?? data.feedback ?? "";
  if (!text) {
    throw new Error("API_ERROR: El Worker no devolvió feedback. Recibido: " + JSON.stringify(data).slice(0, 120));
  }
  return text;
}

export function isReflexionConfigured() {
  return Boolean(API_URL);
}
