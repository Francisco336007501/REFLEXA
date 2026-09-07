<div align="center">

# 🪞 REFLEXA

### Plataforma interactiva de toma de decisiones y análisis con IA

REFLEXA presenta **dilemas bajo presión** para explorar cómo una persona toma decisiones ante distintos contextos, con un enfoque especial en **Recursos Humanos, reclutamiento y entornos organizacionales**.

[🌐 **Probar REFLEXA**](https://iareflexa.netlify.app/)

<br>

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?logo=netlify&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-F55036)

</div>

---

## ¿Qué es REFLEXA? 🧠

REFLEXA es una aplicación web diseñada para presentar **situaciones y dilemas donde el contexto importa tanto como la decisión**.

Presión por resultados, tiempo limitado, incertidumbre, jerarquía o conflictos entre intereses personales y organizacionales pueden modificar la forma en que una persona responde ante una misma situación.

En lugar de funcionar como un cuestionario tradicional, REFLEXA construye una experiencia interactiva en la que el usuario debe **interpretar escenarios y tomar decisiones**.

Al terminar una sesión, las respuestas son procesadas mediante inteligencia artificial para generar una **retroalimentación basada en el conjunto de decisiones realizadas**.

> REFLEXA no busca reducir una decisión a “correcta” o “incorrecta”.  
> Busca observar qué ocurre cuando una persona tiene que decidir dentro de un contexto.

---

## Recursos Humanos y reclutamiento 💼

Uno de los principales enfoques de REFLEXA es su aplicación en **Recursos Humanos y entornos organizacionales**.

Una entrevista o cuestionario convencional puede mostrar qué responde un candidato cuando tiene tiempo para construir una respuesta.

REFLEXA propone algo diferente: colocar al usuario frente a **situaciones concretas**, limitar el tiempo disponible y observar cómo responde cuando existen tensiones entre diferentes alternativas.

Puede funcionar como herramienta complementaria en procesos relacionados con:

- Reclutamiento y selección
- Capacitación
- Desarrollo organizacional
- Ética profesional
- Pensamiento crítico
- Toma de decisiones
- Simulación de situaciones laborales
- Retroalimentación individual

REFLEXA también contempla una experiencia general fuera del contexto empresarial, utilizando el mismo sistema de dilemas desde una perspectiva personal.

---

## ¿Cómo funciona? ⚡

La experiencia está diseñada como un recorrido. El usuario no entra directamente a una batería de preguntas: primero conoce la plataforma, selecciona el contexto y la modalidad de la experiencia y después comienza a enfrentarse a los dilemas.

### El punto de entrada

Después del onboarding, el usuario llega al menú principal de REFLEXA.

Desde aquí puede comenzar una experiencia, conocer más sobre la plataforma o modificar sus ajustes.

<p align="center">
  <img src="./public/menú.png" width="620" alt="Menú principal de REFLEXA">
</p>

La interfaz busca mantener la navegación sencilla y concentrar la atención en el recorrido que está por comenzar.

---

### Hollow: el guía de REFLEXA

Durante la experiencia aparece **Hollow**, el personaje encargado de acompañar al usuario y explicar las diferentes etapas de la plataforma.

<p align="center">
  <img src="./public/hollow.png" width="360" alt="Hollow, guía de REFLEXA">
</p>

Hollow introduce los modos, contextualiza diferentes partes de la experiencia y ayuda a que el usuario comprenda qué está por ocurrir antes de enfrentarse a los dilemas.

No funciona como evaluador ni determina si una decisión es correcta. Es el vínculo narrativo entre el usuario y REFLEXA.

---

### Un mismo sistema, diferentes contextos

Antes de iniciar una sesión, el usuario puede decidir desde qué contexto quiere enfrentarse a las situaciones.

<p align="center">
  <img src="./public/modo.png" width="620" alt="Selección de contexto en REFLEXA">
</p>

El **modo normal** utiliza escenarios generales y permite experimentar REFLEXA desde una perspectiva individual.

El **modo laboral** traslada el sistema hacia situaciones relacionadas con organizaciones y Recursos Humanos. Los escenarios pueden involucrar presión por resultados, jerarquía, responsabilidad profesional, conflictos entre compañeros, incertidumbre o tensiones entre intereses personales y organizacionales.

De esta manera, la lógica de REFLEXA permanece, pero cambia el contexto en el que se toman las decisiones.

---

### No todos los dilemas se presentan igual

Después de seleccionar el contexto, REFLEXA permite cambiar la forma en la que se recibe la situación.

<p align="center">
  <img src="./public/modo2.png" width="620" alt="Modalidades disponibles en REFLEXA">
</p>

Los dilemas pueden construirse mediante **imagen, texto o audio**.

En el modo imagen, la información principal se comunica visualmente. En texto, la situación se desarrolla mediante una descripción escrita. En audio, parte de la información debe ser interpretada de forma auditiva antes de elegir.

Cambiar el medio permite variar también la manera en que el usuario recibe e interpreta la información antes de tomar una decisión.

---

### El momento de decidir

Cuando comienza una prueba, REFLEXA presenta un escenario y diferentes alternativas.

El usuario dispone de un **tiempo limitado para tomar una decisión**.

<p align="center">
  <img src="./public/prueba.png" width="650" alt="Ejemplo de dilema interactivo en REFLEXA">
</p>

La presión temporal forma parte de la experiencia. El objetivo no es únicamente conocer qué opción fue seleccionada, sino observar las decisiones dentro de las condiciones en las que fueron tomadas.

Durante la sesión, REFLEXA conserva las respuestas para utilizarlas posteriormente como contexto de la retroalimentación.

---

## Del dilema a la reflexión 🔄

El recorrido completo puede representarse así:

```text
Inicio
  │
  ▼
Onboarding
  │
  ▼
Nombre / Idioma
  │
  ▼
Menú principal
  │
  ▼
Selección de contexto
  │
  ├──────────────┐
  ▼              ▼
Normal         Laboral
  │              │
  └──────┬───────┘
         ▼
Selección de modalidad
  │
  ├── Imagen
  ├── Texto
  └── Audio
         │
         ▼
      Dilemas
         │
         ▼
 Decisiones bajo tiempo
         │
         ▼
 Registro de la sesión
         │
         ▼
 Análisis mediante IA
         │
         ▼
Reflexión personalizada
```

REFLEXA no analiza únicamente una elección aislada. El conjunto de respuestas permite proporcionar más contexto al momento de generar la reflexión final.

---

## Funcionalidades 🎯

### Experiencia

- Dilemas interactivos
- Decisiones con tiempo limitado
- Modo normal
- Modo laboral
- Dilemas mediante imagen
- Dilemas mediante texto
- Dilemas mediante audio
- Registro de decisiones durante la sesión

### Interfaz

- Onboarding
- Personalización mediante nombre
- Español e inglés
- Ajustes de accesibilidad
- Control de volumen
- Sistema de temas
- Hollow como guía de la experiencia

### Inteligencia Artificial

- Procesamiento del contexto de la sesión
- Análisis del conjunto de elecciones
- Generación de retroalimentación
- Comunicación mediante backend independiente
- API key protegida fuera del frontend

---

## Inteligencia Artificial 🤖

La inteligencia artificial aparece al final del recorrido como una capa de análisis.

Las decisiones realizadas durante la sesión se convierten en contexto para generar una reflexión que busca identificar **relaciones, tensiones, coincidencias o contrastes entre las elecciones**.

La intención no es producir una puntuación automática sobre la persona.

REFLEXA utiliza la IA para enriquecer la retroalimentación y ayudar a observar el conjunto de decisiones desde otra perspectiva.

### Arquitectura de IA

```text
┌──────────────────────┐
│       Usuario        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       REFLEXA        │
│    React + Vite      │
│       Netlify        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Cloudflare Worker   │
│       Backend        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Groq API       │
│    GPT-OSS 20B       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Reflexión       │
│    personalizada     │
└──────────────────────┘
```

El frontend no almacena la API key utilizada para comunicarse con Groq.

Las solicitudes pasan primero por un **Cloudflare Worker**, que funciona como intermediario entre REFLEXA y el servicio de inteligencia artificial.

---

## Aplicación en Recursos Humanos 🧩

REFLEXA está pensada como una herramienta que puede complementar procesos donde interesa observar la toma de decisiones dentro de situaciones contextualizadas.

### Reclutamiento y selección

Los candidatos pueden enfrentarse a escenarios relacionados con situaciones laborales en lugar de limitar la interacción a preguntas directas.

### Capacitación

Los dilemas pueden utilizarse para trabajar situaciones relacionadas con ética, responsabilidad, comunicación o toma de decisiones.

### Desarrollo organizacional

La plataforma permite construir experiencias alrededor de problemas y tensiones que pueden existir dentro de una organización.

### Consultoría

El sistema puede utilizarse como base para experiencias interactivas desarrolladas alrededor de necesidades específicas de una organización.

REFLEXA no pretende sustituir el criterio profesional de Recursos Humanos. Su función es ofrecer **otra fuente de contexto** dentro de una evaluación o experiencia de desarrollo.

---

## Stack tecnológico 🛠️

| Tecnología | Función |
| --- | --- |
| **React 18** | Construcción de la interfaz |
| **Vite 6** | Desarrollo y build |
| **JavaScript ES Modules** | Lógica de la aplicación |
| **CSS** | Diseño visual |
| **Context API** | Estado compartido |
| **Cloudflare Workers** | Backend intermediario |
| **Groq API** | Inferencia de IA |
| **GPT-OSS 20B** | Generación de reflexión |
| **Netlify** | Hosting y deployment |

---

## Arquitectura del proyecto 🏗️

REFLEXA funciona como una **Single Page Application (SPA)**.

La navegación entre las diferentes pantallas se gestiona mediante el estado de la aplicación y renderizado condicional.

```text
REFLEXA/
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── i18n/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── vite.config.js
```

La estructura separa componentes, pantallas, datos de los dilemas, traducciones, estado global, estilos y funciones auxiliares.

---

## Internacionalización 🌎

REFLEXA contempla soporte para:

**🇲🇽 Español · 🇺🇸 English**

El idioma seleccionado se conserva durante la experiencia y modifica los elementos correspondientes de la interfaz.

---

## Instalación 📥

### 1. Clonar el repositorio

```bash
git clone https://github.com/Francisco336007501/REFLEXA.git
```

### 2. Entrar al proyecto

```bash
cd REFLEXA
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el entorno de desarrollo

```bash
npm run dev
```

### Build de producción

```bash
npm run build
```

### Probar el build

```bash
npm run preview
```

---

## Configuración de IA 🔐

El endpoint utilizado para generar las reflexiones puede configurarse mediante una variable de entorno:

```env
VITE_REFLEXION_API_URL=https://TU-WORKER.workers.dev
```

La clave privada utilizada para acceder a Groq debe permanecer únicamente en el backend.

```text
Frontend
   │
   ▼
Cloudflare Worker
   │
   │  GROQ_API_KEY
   ▼
Groq API
```

> ⚠️ Las claves privadas nunca deben publicarse dentro del repositorio ni incluirse directamente en el frontend.

---

## Demo 🌐

REFLEXA está disponible directamente desde el navegador:

### 👉 [iareflexa.netlify.app](https://iareflexa.netlify.app/)

La versión publicada puede utilizarse sin instalar el proyecto localmente.

---

## Objetivo 🎯

REFLEXA explora una idea central:

> **Una decisión no existe aislada del contexto en el que fue tomada.**

El proyecto combina **desarrollo web, experiencia de usuario, simulación de dilemas, Recursos Humanos e inteligencia artificial** para construir una forma diferente de explorar la toma de decisiones.

---

<div align="center">

# REFLEXA

### Decide · Duda · Obsérvate

**El espejo es el mismo.**

[🌐 **Probar REFLEXA**](https://iareflexa.netlify.app/)

</div>
