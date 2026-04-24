# Kanban para Desarrollo de Software — Presentación Interactiva

Presentación completa sobre Kanban, orientada al desarrollo de software y al trabajo del conocimiento. Incluye teoría, principios, prácticas y ejemplos visuales.

## Stack Técnico y Arquitectura

Este proyecto está construido para ser rápido, modular y sin dependencias pesadas de frameworks de UI (como React o Vue), manteniendo la simplicidad del DOM estándar pero aprovechando las ventajas del ecosistema moderno:

* **Vite**: Usado como empaquetador (bundler) y servidor de desarrollo para tener Hot Module Replacement (HMR) y compilación ultrarrápida.
* **TypeScript**: Para garantizar la consistencia en la estructura de los datos (diapositivas) y la lógica de navegación, evitando errores de tipado.
* **CSS Vanilla**: Estilos estructurados usando variables CSS y animaciones fluidas, sin librerías externas.
* **HTML5 Canvas API**: Se utiliza para la renderización de la animación interactiva de la portada.

### Estructura de Directorios

```text
├── index.html            ← Punto de entrada. Estructura básica de la UI.
├── package.json          ← Dependencias y scripts (Vite, TypeScript).
├── src/
│   ├── main.ts           ← Controlador de estado: navegación de slides y teclado/touch.
│   ├── slides.ts         ← Los datos. Aquí se define el contenido y tipo de cada diapositiva.
│   ├── renderer.ts       ← Funciones que transforman los datos de `slides.ts` en HTML.
│   ├── introAnimation.ts ← Motor de la animación Canvas interactiva (Kanban Kanji).
│   └── style.css         ← Todos los estilos globales y por cada tipo de slide.
└── public/               ← Archivos estáticos como el audio de la presentación.
```

## Instalación y Uso Local

Asegúrate de tener [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/) instalados.

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar el servidor de desarrollo local
pnpm run dev

# 3. Construir para producción (genera la carpeta dist/)
pnpm run build
```

Una vez que ejecutes `pnpm run dev`, Vite te indicará la URL (por ejemplo, `http://localhost:5173`) para abrir la presentación en tu navegador.

## Contribuir (Agregar o Modificar Slides)

El contenido de las diapositivas está totalmente separado de la UI. Para modificar el texto, ve a `src/slides.ts` y edita el objeto correspondiente dentro del array `slides`. 

El motor (`renderer.ts`) se encargará automáticamente de aplicarle los estilos y las animaciones según el `type` de la diapositiva (ej. `history`, `board`, `metrics`).
