<div align="center">

# REFLEXA

### Piensa. Decide. Reflexiona.

Una experiencia interactiva que plantea dilemas bajo presión y utiliza inteligencia artificial para generar una reflexión basada en las decisiones tomadas.

[🌐 Probar REFLEXA](https://iareflexa.netlify.app/)

</div>

---

## 🪞 ¿Qué es REFLEXA?

**REFLEXA** es una aplicación web interactiva diseñada para explorar cómo tomamos decisiones ante diferentes situaciones.

A través de dilemas presentados en distintos formatos, el usuario debe elegir entre diferentes alternativas mientras REFLEXA registra sus respuestas.

Al finalizar, una inteligencia artificial analiza el conjunto de decisiones y genera una **reflexión personalizada**, buscando tensiones, patrones y contrastes entre las elecciones realizadas.

REFLEXA no busca calificar decisiones como correctas o incorrectas.

Busca crear un espacio para **pensar sobre ellas**.

---

## 📸 Experiencia

<p align="center">
  <img src="./docs/images/welcome.png" width="800" alt="Pantalla de bienvenida de REFLEXA">
</p>

<p align="center">
  <img src="./docs/images/hollow.png" width="800" alt="Hollow">
</p>

<p align="center">
  <img src="./docs/images/context.png" width="800" alt="Selección de contexto">
</p>

<p align="center">
  <img src="./docs/images/modes.png" width="800" alt="Modos de REFLEXA">
</p>

<p align="center">
  <img src="./docs/images/dilemma.png" width="800" alt="Dilema interactivo">
</p>

---

## ✨ Características

- 🧠 Dilemas interactivos
- ⏱️ Decisiones bajo tiempo limitado
- 🖼️ Modo imagen
- 📝 Modo texto
- 🔊 Modo audio
- 💼 Contexto laboral
- 👤 Contexto personal
- 🤖 Reflexiones generadas con inteligencia artificial
- 🌎 Soporte de idiomas
- ⚙️ Ajustes de accesibilidad
- 🔊 Control de volumen
- 🌓 Sistema de temas
- 👤 Experiencia personalizada con nombre del usuario
- 🧙 Hollow como guía dentro de la experiencia

---

## 🎮 Modos

REFLEXA permite experimentar los dilemas de diferentes maneras.

### 🖼️ Imagen

Situaciones representadas visualmente donde el usuario debe interpretar el contexto y tomar una decisión.

### 📝 Texto

Dilemas planteados mediante escenarios escritos y diferentes alternativas.

### 🔊 Audio

Situaciones construidas alrededor de contenido auditivo para cambiar la forma en que se percibe el dilema.

### 💼 Laboral

Escenarios enfocados en decisiones y tensiones que pueden aparecer dentro de un entorno profesional.

---

## 🤖 Reflexión con IA

Al terminar una sesión, las decisiones son enviadas al backend de REFLEXA.

La IA no analiza cada respuesta de manera aislada. Busca relaciones entre las decisiones para generar una reflexión breve basada en el comportamiento observado durante la sesión.

La arquitectura utilizada es:

```text
Usuario
   │
   ▼
REFLEXA
Netlify
   │
   ▼
Cloudflare Worker
   │
   ▼
Groq API
   │
   ▼
GPT-OSS 20B
   │
   ▼
Reflexión
```

La API key permanece fuera del frontend y las solicitudes hacia Groq son gestionadas mediante un **Cloudflare Worker**.

---

## 🛠️ Tecnologías

<p>

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?logo=netlify&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-F55036)

</p>

### Frontend

- React 18
- Vite 6
- JavaScript
- CSS
- Context API

### Backend / IA

- Cloudflare Workers
- Groq API
- OpenAI GPT-OSS 20B

### Deployment

- Netlify
- Cloudflare

---

## 🧩 Flujo de la aplicación

```text
Inicio
   ↓
Onboarding
   ↓
Nombre / Idioma
   ↓
Selección de contexto
   ├── Personal
   └── Laboral
          ↓
    Selección de modo
    ├── Imagen
    ├── Texto
    └── Audio
          ↓
       Dilemas
          ↓
      Decisiones
          ↓
    Reflexión con IA
```

---

## 📁 Estructura

```text
src/
│
├── components/
├── context/
├── data/
├── hooks/
├── i18n/
├── pages/
├── styles/
├── utils/
│
├── App.jsx
└── main.jsx
```

La navegación principal funciona como una SPA mediante el estado de la aplicación y renderizado condicional de las diferentes vistas.

---

## 🚀 Instalación

Clona el repositorio:

```bash
git clone URL-DE-TU-REPOSITORIO
```

Entra al proyecto:

```bash
cd REFLEXA
```

Instala las dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Vite mostrará la dirección local donde se está ejecutando REFLEXA.

---

## 🔐 Variables de entorno

El frontend utiliza una variable para definir el endpoint encargado de generar las reflexiones.

Crea un archivo `.env`:

```env
VITE_REFLEXION_API_URL=https://TU-WORKER.workers.dev
```

> La API key de Groq **no debe almacenarse en el frontend ni publicarse en GitHub**.

La clave se configura como variable de entorno dentro del Worker.

---

## 🧠 Hollow

<p align="center">
  <img src="./docs/images/hollow.png" width="650" alt="Hollow REFLEXA">
</p>

**Hollow** acompaña al usuario durante la experiencia.

No está diseñado como juez de las decisiones, sino como parte de la identidad narrativa de REFLEXA y como guía hacia la reflexión final.

---

## 🌐 Demo

REFLEXA se encuentra disponible en:

### 👉 [iareflexa.netlify.app](https://iareflexa.netlify.app/)

No es necesario instalar nada para probar la experiencia.

---

## 🎯 Objetivo

REFLEXA explora una pregunta sencilla:

> **¿Qué pueden mostrar nuestras decisiones cuando dejamos de observarlas de forma aislada?**

El proyecto combina desarrollo web, diseño de experiencia e inteligencia artificial para convertir una serie de elecciones en una experiencia de reflexión.

---

<div align="center">

**REFLEXA**

*El espejo es el mismo.*

</div><
