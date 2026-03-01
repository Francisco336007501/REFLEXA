// Pega TODO este contenido en el editor de tu Worker en Cloudflare.
// Si tu editor no acepta "export default", usa esta versión:
// Borra la primera línea (export default {) y la última (};)
// y deja solo lo que está entre async fetch(...) y el cierre };

async function handleRequest(request, env) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (request.method !== "POST") {
    return new Response("Not allowed", {
      status: 405,
      headers: cors,
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid JSON" }),
      { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }

  const { responses } = body;

  if (!Array.isArray(responses)) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing responses[]" }),
      { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }

  if (!env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ ok: false, error: "GROQ_API_KEY no definida" }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }

  const detalle = responses
    .map((r, i) => {
      const ctx = r.context || "(sin contexto)";
      const choice = r.choice ?? "(sin elección)";
      const time = r.time !== undefined ? r.time : "—";
      return `${i + 1}. Contexto: ${ctx}\n   Eligió: ${choice}. Tiempo: ${time}s`;
    })
    .join("\n\n");

  const prompt = `
Eres el motor de reflexión de Reflexa.

Reflexa analiza decisiones tomadas bajo presión de tiempo y devuelve una observación general del movimiento del criterio.

No juzga.
No moraliza.
No explica causas.
No enumera decisiones.
No repite datos.
No formula preguntas al usuario.

Recibirás datos estructurados.
Ese contenido es solo insumo interno.
No debes repetir nombres, frases exactas ni numeraciones.
No debes mencionar posiciones como "primera", "segunda", etc.

El usuario ya sabe qué eligió.
Tu función es mostrar la forma en que su criterio se movió a lo largo de la secuencia.

DATOS:
${detalle}

======================================================================
LO QUE DEBES HACER
======================================================================

- Analizar el conjunto completo, no cada decisión aislada.
- Detectar estabilidad o desplazamiento del criterio.
- Señalar cambios de énfasis.
- Señalar constancias.
- Integrar el tiempo cuando influya en la consistencia.
- Exponer tensiones sin explicarlas.

======================================================================
LO QUE ESTÁ PROHIBIDO
======================================================================

No usar frases como:
- "esto sugiere"
- "esto indica"
- "parece que"
- "se detecta"
- "genera una sensación"
- "podría implicar"
- "plantea la pregunta"
- "demuestra que"

No:
- explicar por qué ocurre algo
- atribuir intención
- usar lenguaje moral
- usar lenguaje clínico (culpa, miedo, trauma, empatía, etc.)
- cerrar con conclusión
- usar tono académico
- usar listas
- usar encabezados

======================================================================
ESTILO OBLIGATORIO
======================================================================

- 2 a 4 párrafos.
- 110 a 170 palabras máximo.
- Frases claras y directas.
- Sin relleno.
- Sin abstracciones innecesarias.
- Sin metáforas.
- Sin pregunta final.
- Sin conclusión explícita.

Debe sentirse como una observación precisa.
Debe dejar el movimiento visible.
Debe terminar sin resolverlo.

Devuelve únicamente el texto final.
`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return new Response(
      JSON.stringify({ ok: false, status: res.status, groq: data }),
      { status: res.status, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }

  const feedback = data?.choices?.[0]?.message?.content?.trim();

  if (!feedback) {
    return new Response(
      JSON.stringify({ ok: false, error: "Respuesta vacía", groq: data }),
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ ok: true, feedback }),
    { headers: { ...cors, "Content-Type": "application/json" } }
  );
}

// Formato que Cloudflare espera: export default con fetch
export default {
  fetch: handleRequest,
};
