<div align="center">

# REFLEXA

### Simulación de decisiones · Análisis de comportamiento · Inteligencia Artificial

Plataforma web interactiva orientada a explorar **cómo cambia la toma de decisiones ante presión, incertidumbre, dilemas éticos e influencia del contexto**, con aplicaciones especialmente enfocadas en **Recursos Humanos, capacitación y entornos organizacionales**. :contentReference[oaicite:0]{index=0}

[🌐 Probar REFLEXA](https://iareflexa.netlify.app/)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?logo=netlify&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-AI-F55036)

</div>

---

## 🪞 ¿Qué es REFLEXA?

Las decisiones no ocurren en condiciones ideales.

La presión por resultados, la incertidumbre, el tiempo disponible, los valores personales y organizacionales o la presencia de una figura de autoridad pueden modificar la manera en que una persona responde ante una situación.

**REFLEXA** parte de ese problema.

La plataforma presenta dilemas interactivos en los que el usuario debe tomar decisiones dentro de diferentes contextos. El objetivo es observar las elecciones realizadas y utilizar inteligencia artificial para encontrar tendencias y generar retroalimentación personalizada. :contentReference[oaicite:1]{index=1}

A diferencia de una prueba tradicional, REFLEXA **no está diseñada para declarar una respuesta como correcta o incorrecta**. Su propuesta utiliza los dilemas como una herramienta para explorar el comportamiento, fomentar la autorreflexión y obtener información sobre la forma en que una persona responde ante diferentes escenarios. :contentReference[oaicite:2]{index=2}

---

## 💼 REFLEXA en Recursos Humanos

Uno de los principales campos de aplicación de REFLEXA es el **entorno laboral y organizacional**.

La plataforma puede utilizarse como complemento en procesos relacionados con:

- Selección de personal
- Capacitación
- Desarrollo organizacional
- Pensamiento crítico
- Ética profesional
- Análisis de decisiones y comportamiento
- Identificación de tendencias
- Retroalimentación personalizada

El proyecto contempla un enfoque B2B dirigido a **empresas pequeñas, medianas y grandes, departamentos de Recursos Humanos y consultoras especializadas**, además de aplicaciones educativas y de uso individual. :contentReference[oaicite:3]{index=3}

La intención no es sustituir una evaluación profesional de Recursos Humanos, sino ofrecer una experiencia digital adicional donde sea posible observar cómo responde una persona ante situaciones más cercanas a conflictos reales.

---

## ⚡ Más que responder un cuestionario

REFLEXA utiliza **dilemas** porque una decisión aislada dice poco sin conocer el contexto en el que fue tomada.

Los escenarios pueden incorporar:

- Presión por resultados
- Tiempo limitado
- Incertidumbre
- Conflictos éticos
- Influencia de autoridad
- Conflictos entre valores personales y organizacionales

Esto permite construir situaciones donde ninguna alternativa necesariamente representa una respuesta completamente correcta o incorrecta. :contentReference[oaicite:4]{index=4}

---

# 🧭 Cómo funciona

La experiencia está organizada como un recorrido.

```text
Inicio
   ↓
Onboarding
   ↓
Nombre + Idioma
   ↓
Menú principal
   ↓
Selección de contexto
   ├── Modo normal
   └── Modo laboral
          ↓
    Selección de experiencia
    ├── Imagen
    ├── Texto
    └── Audio
          ↓
       Dilemas
          ↓
   Decisiones bajo tiempo
          ↓
   Registro de respuestas
          ↓
   Análisis mediante IA
          ↓
   Reflexión personalizada
```

El flujo implementado contempla onboarding, selección de modo, presentación de dilemas, decisiones bajo tiempo limitado y registro de respuestas. :contentReference[oaicite:5]{index=5}

---

## 01 — Menú principal

Después del onboarding, REFLEXA presenta el **menú central de la aplicación**.

Desde aquí comienza la navegación hacia la experiencia, además de permitir acceder a información del proyecto y ajustes.

<p align="center">
  <img src="./public/menú.png" width="700" alt="Menú principal de REFLEXA">
</p>

El sistema también permite personalizar elementos como idioma, accesibilidad, volumen y asistencia durante la experiencia.

---

## 02 — Hollow

REFLEXA incorpora a **Hollow**, el personaje que acompaña al usuario durante el recorrido.

<p align="center">
  <img src="./public/hollow.png" width="400" alt="Hollow - guía de REFLEXA">
</p>

Hollow introduce y explica diferentes partes de la experiencia antes de que el usuario avance hacia los dilemas.

Su función forma parte de la presentación narrativa de REFLEXA: la interacción no comienza directamente con una batería de preguntas, sino con una interfaz que prepara al usuario para comprender qué está haciendo y cómo avanzar.

---

## 03 — Selección de contexto

REFLEXA permite cambiar el contexto desde el cual se presentan las situaciones.

<p align="center">
  <img src="./public/modo.png" width="700" alt="Selección entre modo normal y laboral">
</p>

### Modo normal

Presenta dilemas desde un contexto general y permite utilizar REFLEXA como una experiencia individual de reflexión y toma de decisiones.

### Modo laboral

Traslada la experiencia hacia situaciones relacionadas con el **entorno profesional y organizacional**.

Este modo permite trabajar con escenarios donde pueden existir presión por resultados, jerarquías, incertidumbre o conflictos entre intereses personales y organizacionales.

El código de REFLEXA contempla explícitamente la separación entre **Modo normal y Modo laboral** dentro de su navegación. :contentReference[oaicite:6]{index=6}

---

## 04 — Tipos de experiencia

Una vez elegido el contexto, REFLEXA permite seleccionar la forma en la que se presentarán los dilemas.

<p align="center">
  <img src="./public/modo2.png" width="700" alt="Selección de modos de REFLEXA">
</p>

### 🖼️ Imagen

El escenario se comunica principalmente mediante información visual.

### 📝 Texto

La situación se presenta mediante una descripción escrita y diferentes alternativas.

### 🔊 Audio

El usuario recibe información mediante contenido auditivo antes de tomar una decisión.

La aplicación dispone de vistas específicas para dilemas de texto, imagen y audio dentro de su arquitectura. :contentReference[oaicite:7]{index=7}

---

## 05 — La prueba

Aquí ocurre la parte central de REFLEXA.

<p align="center">
  <img src="./public/prueba.png" width="700" alt="Ejemplo de prueba interactiva de REFLEXA">
</p>

El usuario recibe una situación y debe elegir entre las alternativas disponibles dentro de un **tiempo limitado**.

REFLEXA registra las decisiones realizadas durante la sesión para posteriormente utilizarlas como contexto de la retroalimentación.

El interés no está únicamente en **qué opción fue elegida**, sino en observar el conjunto de decisiones dentro de los escenarios presentados.

---

# 🤖 Inteligencia Artificial

La IA funciona como la última capa de la experiencia.

REFLEXA puede utilizar las decisiones registradas para **identificar tendencias y generar retroalimentación personalizada**, enriqueciendo la reflexión sin convertir el resultado en una calificación rígida. :contentReference[oaicite:8]{index=8}

Actualmente el flujo técnico de generación funciona así:

```text
┌─────────────────────┐
│       Usuario       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       REFLEXA       │
│   React + Vite      │
│      Netlify        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Cloudflare Worker  │
│      Backend        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Groq API       │
│    GPT-OSS 20B      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Reflexión       │
│    personalizada    │
└─────────────────────┘
```

La comunicación con IA se realiza mediante un backend independiente para evitar exponer la clave secreta en el cliente. El proyecto utiliza `VITE_REFLEXION_API_URL` para configurar ese servicio. :contentReference[oaicite:9]{index=9}

---

# 🧠 Principios del proyecto

### Decisiones en contexto

Una misma persona puede responder de forma diferente dependiendo de las condiciones que rodean una decisión.

### Sin respuestas absolutas

Los dilemas permiten enfrentar alternativas donde la solución no necesariamente puede reducirse a “bien” o “mal”.

### Reflexión antes que juicio

REFLEXA busca proporcionar información sobre las decisiones tomadas sin convertir la experiencia en una sentencia sobre el usuario.

### Tecnología como complemento

La inteligencia artificial procesa el contexto de la sesión para producir retroalimentación, pero la propuesta mantiene la reflexión del usuario como elemento central.

---

# 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| **React 18** | Construcción de interfaz mediante componentes y hooks |
| **Vite 6** | Desarrollo, empaquetado y build |
| **JavaScript** | Lógica principal de la aplicación |
| **CSS** | Diseño y estilos de interfaz |
| **Context API** | Estado compartido de usuario y tema |
| **Cloudflare Workers** | Backend intermediario para IA |
| **Groq API** | Generación de retroalimentación |
| **GPT-OSS 20B** | Modelo utilizado actualmente |
| **Netlify** | Hosting de la aplicación |

El núcleo documentado del frontend utiliza React 18, Vite 6, JavaScript ES Modules y CSS. :contentReference[oaicite:10]{index=10}

---

# 🏗️ Arquitectura del frontend

REFLEXA es una **Single Page Application (SPA)**.

No utiliza `react-router`. La navegación se controla internamente mediante el estado `view` en `App.jsx`, renderizando la pantalla correspondiente según el punto del recorrido en el que se encuentra el usuario. :contentReference[oaicite:11]{index=11}

```text
REFLEXA/
│
├── public/
│   └── assets e imágenes
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
│   ├── main.jsx
│   └── index.css
│
├── vite.config.js
└── package.json
```

La estructura separa componentes, pantallas, datos de dilemas, traducciones, hooks, estilos y utilidades para mantener la lógica organizada. :contentReference[oaicite:12]{index=12}

---

# 🌎 Internacionalización

REFLEXA cuenta con soporte para:

**🇲🇽 Español · 🇺🇸 Inglés**

El sistema utiliza un diccionario propio de traducciones y mantiene el idioma seleccionado dentro del contexto del usuario, sin depender de una biblioteca externa de internacionalización. :contentReference[oaicite:13]{index=13}

---

# 🚀 Ejecutar localmente

### 1. Clonar el repositorio

```bash
git clone URL-DE-TU-REPOSITORIO
```

### 2. Entrar al proyecto

```bash
cd REFLEXA
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar Vite

```bash
npm run dev
```

Los scripts documentados también incluyen:

```bash
npm run build
npm run preview
```

`npm run build` genera `dist/`, mientras que `npm run preview` permite probar localmente el build de producción. :contentReference[oaicite:14]{index=14}

---

# 🔐 Configuración de IA

El frontend puede utilizar:

```env
VITE_REFLEXION_API_URL=https://TU-WORKER.workers.dev
```

La clave privada de Groq **no debe almacenarse en el frontend**.

```text
Frontend
   │
   │  petición
   ▼
Cloudflare Worker
   │
   │  GROQ_API_KEY
   ▼
Groq
```

De esta forma, la credencial permanece del lado del backend y no queda expuesta dentro del código enviado al navegador.

---

# 🎯 Aplicaciones

REFLEXA contempla dos enfoques principales:

**B2B**

Empresas, departamentos de Recursos Humanos, capacitación, desarrollo organizacional y consultoras.

**B2C**

Estudiantes, profesionistas y usuarios interesados en pensamiento crítico, ética y toma de decisiones.

El proyecto también contempla posibles integraciones con universidades, plataformas educativas y programas empresariales. :contentReference[oaicite:15]{index=15}

---

# 🔭 Visión

REFLEXA combina **simulación, dilemas, desarrollo web e inteligencia artificial** para construir una experiencia donde una decisión no se observa de forma aislada.

El proyecto parte de una idea sencilla:

> **El contexto también forma parte de una decisión.**

---

<div align="center">

## REFLEXA

**Decide · Duda · Obsérvate**

[🌐 Abrir REFLEXA](https://iareflexa.netlify.app/)

</div>
