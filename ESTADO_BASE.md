# REFLEXA — Estado Base

> Resumen completo del proyecto para continuar con contexto ligero.

---

## Qué es Reflexa

App de reflexión psicológica basada en dilemas morales. El usuario elige entre opciones en distintos modos (texto, imagen, audio). Al final recibe retroalimentación generada por IA que invita a reflexionar sin juzgar. **Sin respuestas correctas. Solo reflexión.**

**Eslogan:** *Decide · Duda · Obsérvate.*

---

## Stack técnico

- **React 18** + **Vite 6**
- Sin backend propio; la IA usa `VITE_REFLEXION_API_URL` (endpoint externo)
- Modo audio: Web Speech API (voz del navegador)

---

## Flujo de la app

1. **Onboarding:** Idioma (es/en) → Nombre → "Toca para entrar"
2. **Carga:** ~5s con frases aleatorias
3. **Home:** Bienvenida, botón "Entrar", enlaces a "¿Qué es esto?" y Ajustes
4. **ModeSelect:** 3 modos — Texto, Imagen, Audio
5. **Modo Play:** dilemas según el modo elegido
6. **Feedback:** texto de reflexión (IA si está configurada)

---

## Vistas (VIEWS)

| Clave       | Componente      | Descripción                    |
|------------|-----------------|--------------------------------|
| home       | Home            | Menú principal                 |
| mode_select| ModeSelect      | Elección de modo               |
| play       | Play            | Modo texto                     |
| play_image | PlayImage       | Modo imagen                    |
| play_audio | PlayAudio       | Modo audio (narración)         |
| about      | About           | Hollow, 8 pasos, overlay fullscreen |
| settings   | Settings        | Idioma, texto grande, contraste, volumen |

---

## Contextos

### UserContext
- `language` (es/en), `userName`, `onboardingStep`
- `LANGS`: solo `es` y `en`
- `PERSIST_DATA = false` → no persiste en localStorage

### ThemeContext
- `theme`: colores (bg, panel, accent `#a78bfa`, etc.)
- `bigText`, `highContrast`, `soundVolume` (0–100, default 50)
- Tema alto contraste: azul `#38bdf8`

---

## Modos de juego

### Modo Texto (Play.jsx)
- 3 dilemas (tren, botón, sistema)
- Flujo: contexto 5s → opciones reveladas escalonadas (1.2s) → timer 12s
- Opciones: A, B, o "No respondió" si acaba el tiempo
- `playSelect`, `playTimeout`, `playComplete` en `utils/sounds.js`

### Modo Imagen (PlayImage.jsx)
- Dilemas en `DILEMAS_IMAGEN`: baseImage + optionA/optionB con `image`, `label`, `contextForAI`
- Imágenes en `public/imagenes/` (DONA_SALVAVIDAS, CACHORRO_LUCHANDO_AGUA, etc.)
- Timer 12s, colores morados (#8b7fb8, #a89ec9)

### Modo Audio (PlayAudio.jsx)
- Un dilema fijo (DILEMA_AUDIO): "Contexto 1" (panel de control, 5 vs 1 conocida)
- Web Speech API, voz ES, rate 0.78, pitch 0.96
- Fases: intro → playing → options → chosen
- Opciones A/B grandes ("deluxe")

---

## Hollow / About

- **Overlay fullscreen** (`position: fixed`, z-index 50) cuando `view === ABOUT`
- 8 pasos con `narrator1`–`narrator8`
- Hollow.png (pasos 1–7) y NARRADOR.png (paso 8)
- Neblina espectral, motes de luz, círculo de energía
- "Clic para continuar" sutil
- Clases CSS: `hollow-tap-zone`, `hollow-mist`, `hollow-mote`, `hollow-verse`, etc.

---

## i18n

- `src/i18n/translations.js`: `t.es`, `t.en` (fr, pt, it aún definidos pero no seleccionables)
- `translate(lang, key, vars)` con fallback a `t.es`
- `useT()` devuelve `(key, vars) => translate(language, key, vars)`

---

## Feedback IA

- `utils/feedbackAI.js`: `getReflexionFromAI(mode, answers)`, `buildPromptForReflexion`, `isReflexionConfigured`
- POST a `VITE_REFLEXION_API_URL` con `{ mode, choices, prompt }`
- Respuesta esperada: `{ text: "..." }`
- Si no hay API: mensaje alternativo sin IA

---

## Estilo y componentes

- **Cursor custom:** `CanvasCursor`, `useCanvasCursor` (cursor oculto en `.canvas-cursor-active`)
- **Settings:** toques morados (`rgba(167, 139, 250, ...)`), no grises
- **Header:** logo REFLEXA, fade cuando About
- **Card:** borde y sombra; transparente en About

---

## Archivos clave

```
src/
├── App.jsx              # Flujo, vistas, overlay About
├── context/
│   ├── ThemeContext.jsx # VIEWS, tema, volumen
│   └── UserContext.jsx  # idioma, nombre, LANGS
├── i18n/translations.js
├── pages/
│   ├── About.jsx        # Hollow, 8 pasos
│   ├── Home.jsx
│   ├── ModeSelect.jsx
│   ├── Play.jsx         # Modo texto
│   ├── PlayImage.jsx    # Modo imagen
│   ├── PlayAudio.jsx    # Modo audio
│   └── Settings.jsx     # Toggle, VolumeSlider
├── components/
│   ├── CanvasCursor.jsx
│   ├── Header.jsx
│   └── PlaySettingsOverlay.jsx
├── utils/
│   ├── feedbackAI.js
│   └── sounds.js
└── index.css            # hollow-*, app-about-*, etc.
```

---

## Imágenes en public/imagenes/

Hollow.png, NARRADOR.png, DONA_SALVAVIDAS.png, CACHORRO_LUCHANDO_AGUA.png, BEBE_LUCHANDO_AGUA.png, ABUELA_LUCHANDO_AGUA.png, MADRE_E_HIJO_LUCHANDO_AGUA.png, MADRE_EMBARAZADA_LUCHANDO_AGUA.png, NIÑO_CON_HAMBRE.png, PERROS_CON_HAMBRE.png, MANOS_COMIDA.png, interrogacion.png

---

*Última actualización: estado base fijado para trabajo con contexto ligero.*
