export interface Slide {
  id: number;
  type:
    | "intro"
    | "cover"
    | "history"
    | "principles"
    | "board"
    | "wip"
    | "metrics"
    | "example"
    | "vsscrum"
    | "tools"
    | "text"
    | "closing";
  title: string;
  content: SlideContent;
}

export interface SlideContent {
  subtitle?: string;
  body?: string;
  bullets?: string[];
  columns?: KanbanColumn[];
  metrics?: Metric[];
  comparison?: ComparisonRow[];
  postits?: Postit[];
  tools?: Tool[];
  highlight?: string;
  note?: string;
}

export interface KanbanColumn {
  name: string;
  color: string;
  cards: KanbanCard[];
  wip?: number;
}

export interface KanbanCard {
  text: string;
  tag: string;
  tagColor: string;
  rotate: number;
}

export interface Metric {
  name: string;
  value: string;
  desc: string;
  icon: string;
  color: string;
}

export interface ComparisonRow {
  aspect: string;
  kanban: string;
  scrum: string;
}

export interface Postit {
  text: string;
  color: string;
  rotate: number;
  author: string;
}

export interface Tool {
  name: string;
  type: string;
  logo: string;
  color: string;
  desc: string;
}

export const slides: Slide[] = [
  {
    id: 0,
    type: "intro",
    title: "Intro Animation",
    content: {},
  },
  {
    id: 1,
    type: "cover",
    title: "KANBAN",
    content: {
      subtitle: "Para el Desarrollo de Software 💻",
      body: "Un enfoque evolutivo para la gestión del trabajo del conocimiento, enfocado en la entrega de valor continua y la reducción del caos.",
      highlight: "看板",
      note: "Usa ← → para navegar entre slides",
    },
  },
  {
    id: 2,
    type: "text",
    title: "¿Qué es Kanban?",
    content: {
      subtitle: "¿Es un ciclo de vida? ¿Una metodología?",
      body: "A diferencia de metodologías pesadas o marcos ágiles prescriptivos (como Scrum), Kanban **no es un ciclo de vida de desarrollo de software ni un proceso con etapas definidas**.",
      bullets: [
        "No te dice cómo desarrollar software (no prescribe fases de diseño, código o QA).",
        "Es un **método de gestión visual** y de **mejora continua**.",
        "Se aplica como un «lente» **sobre tu proceso actual** (sea cual sea) para hacerlo visible y optimizarlo.",
      ],
      highlight: "Start with what you do now.",
      note: "Por eso es tan fácil de adoptar: no requiere reestructurar al equipo desde el día 1.",
    },
  },
  {
    id: 3,
    type: "history",
    title: "Del Push al Pull",
    content: {
      subtitle: "De la línea de montaje de Toyota al desarrollo de software moderno",
      postits: [
        {
          text: "El problema clásico (Push): Jefes empujando tareas infinitas a un equipo saturado. Resultado: Estrés y cuellos de botella.",
          color: "#FFCDD2",
          rotate: -2,
          author: "Sistemas Push",
        },
        {
          text: "1953 — Toyota crea tarjetas para señalar demanda. Las partes no se fabrican hasta que la siguiente estación lo pide.",
          color: "#FFF176",
          rotate: 1.5,
          author: "Manufactura",
        },
        {
          text: "El sistema Pull: El equipo 'jala' (pull) una nueva tarea del Backlog SOLO cuando tiene capacidad (WIP) disponible.",
          color: "#C8E6C9",
          rotate: -1,
          author: "Sistemas Pull",
        },
        {
          text: "2007 — Kanban Method: Adaptación para el 'trabajo del conocimiento' (Software) donde el inventario es invisible (código).",
          color: "#BBDEFB",
          rotate: 2,
          author: "David J. Anderson",
        },
      ],
    },
  },
  {
    id: 4,
    type: "principles",
    title: "Principios Fundamentales",
    content: {
      subtitle: "La filosofía base del Método Kanban se divide en dos enfoques:",
      bullets: [
        "🔄 Gestión del Cambio: Empieza con lo que haces hoy.",
        "🔄 Gestión del Cambio: Acuerda buscar mejoras evolutivas e incrementales.",
        "🔄 Gestión del Cambio: Fomenta el liderazgo en todos los niveles.",
        "🛠️ Prestación de Servicios: Comprende las necesidades del cliente (foco en el valor).",
        "🛠️ Prestación de Servicios: Gestiona el trabajo, permite a la gente auto-organizarse.",
        "🛠️ Prestación de Servicios: Revisa periódicamente tu red de servicios.",
      ],
      note: "No gestionar a las personas, sino gestionar el flujo de trabajo a través del sistema.",
    },
  },
  {
    id: 5,
    type: "principles",
    title: "Las 6 Prácticas Generales",
    content: {
      subtitle: "Si no haces esto, solo tienes un tablero de post-its, no Kanban.",
      bullets: [
        "1️⃣ Visualizar el flujo de trabajo (hacer visible el trabajo invisible).",
        "2️⃣ Limitar el Trabajo en Progreso (WIP) para habilitar el sistema Pull.",
        "3️⃣ Gestionar el flujo (identificar cuellos de botella y bloqueos).",
        "4️⃣ Hacer las políticas de proceso explícitas (¿qué significa que algo está 'Hecho'?).",
        "5️⃣ Implementar bucles de feedback (reuniones operativas, revisiones de entrega).",
        "6️⃣ Mejorar colaborativamente, evolucionar experimentalmente (método científico).",
      ],
      note: "Un tablero en Trello sin límites WIP no es Kanban, es solo una lista visual (Proto-Kanban).",
    },
  },
  {
    id: 6,
    type: "board",
    title: "El Flujo de Valor Real",
    content: {
      subtitle: "Modelando el proceso, incluyendo el Upstream (Discovery) y Downstream (Delivery)",
      columns: [
        {
          name: "💡 Upstream (Ideas)",
          color: "#E1BEE7",
          cards: [
            { text: "Feature de Chat", tag: "Idea", tagColor: "#AB47BC", rotate: -1.5 },
          ],
        },
        {
          name: "📋 Backlog Refinado",
          color: "#FFE0B2",
          wip: undefined,
          cards: [
            { text: "API de Pagos", tag: "Backend", tagColor: "#1976D2", rotate: 1 },
          ],
        },
        {
          name: "⚡ Desarrollo",
          color: "#FFF9C4",
          wip: 2,
          cards: [
            { text: "Login con Google", tag: "Frontend", tagColor: "#F57C00", rotate: 1.5 },
          ],
        },
        {
          name: "🔍 Code Review / QA",
          color: "#E8F5E9",
          wip: 2,
          cards: [
            { text: "Bugs Carrito", tag: "QA", tagColor: "#388E3C", rotate: 0.5 },
          ],
        },
        {
          name: "✅ Desplegado",
          color: "#E3F2FD",
          wip: undefined,
          cards: [
            { text: "Optimización DB", tag: "Backend", tagColor: "#1976D2", rotate: -1 },
          ],
        },
      ],
    },
  },
  {
    id: 7,
    type: "wip",
    title: "¿Qué significa concretamente limitar el WIP?",
    content: {
      subtitle: "Work In Progress (Trabajo en Progreso)",
      body: "Limitar el WIP significa establecer un **tope máximo estricto** de tarjetas que pueden existir simultáneamente en una columna específica del tablero.",
      bullets: [
        "🚧 Tope estricto: Si la columna 'Desarrollo' tiene un WIP de 3, y ya hay 3 tarjetas, los programadores NO pueden empezar una nueva tarea.",
        "🤝 Colaboración forzada: ¿Qué hacen entonces? Deben ayudar a QA, hacer pair programming, o destrabar dependencias para mover las tarjetas existentes a 'Hecho'.",
        "🧠 Menos 'Context Switching': Evita que el cerebro del desarrollador salte entre 5 tareas, reduciendo la fatiga mental y los bugs.",
      ],
      highlight: "Deja de empezar, comienza a terminar.",
      note: "El objetivo es maximizar la entrega de valor, no mantener a la gente ocupada el 100% del tiempo.",
    },
  },
  {
    id: 8,
    type: "metrics",
    title: "Métricas y la Ley de Little",
    content: {
      subtitle: "Dejamos de estimar en horas y empezamos a medir probabilidad",
      metrics: [
        {
          name: "Lead Time (Cliente)",
          value: "Días/Semanas",
          desc: "Tiempo total desde que el cliente hace la petición hasta que la recibe en producción.",
          icon: "⏱️",
          color: "#FF7043",
        },
        {
          name: "Cycle Time (Equipo)",
          value: "Días/Horas",
          desc: "Tiempo que el equipo realmente tarda trabajando en el ítem (desde que entra a 'En Progreso').",
          icon: "🔄",
          color: "#29B6F6",
        },
        {
          name: "Throughput",
          value: "Items por Sprint/Semana",
          desc: "Tasa de entrega. Permite predecir (mediante Monte Carlo) cuándo estará listo un proyecto.",
          icon: "📦",
          color: "#66BB6A",
        },
        {
          name: "Ley de Little",
          value: "Tiempo = WIP / Throughput",
          desc: "Matemáticamente, si mantienes tu tasa de entrega igual pero reduces tu WIP a la mitad, tu tiempo de entrega se reduce a la mitad.",
          icon: "🧮",
          color: "#AB47BC",
        },
      ],
    },
  },
  {
    id: 9,
    type: "vsscrum",
    title: "Kanban vs Scrum",
    content: {
      subtitle: "Ideal para equipos maduros o soporte técnico (Mantenimiento continuo)",
      comparison: [
        { aspect: "Iteraciones", kanban: "Flujo continuo (sin Sprints fijos)", scrum: "Sprints fijos (1–4 semanas)" },
        { aspect: "Roles", kanban: "Se respetan los roles actuales", scrum: "Scrum Master, Product Owner, Devs" },
        { aspect: "Cambios de prioridad", kanban: "En cualquier momento (mientras haya WIP disponible)", scrum: "No se permiten durante el Sprint activo" },
        { aspect: "Estimaciones", kanban: "Opcional (se usa métricas históricas de flujo)", scrum: "Obligatorias (Story points)" },
        { aspect: "Reuniones", kanban: "Según necesidad (reabastecimiento, delivery)", scrum: "Eventos estrictos (Planning, Daily, Retro)" },
        { aspect: "Aplicación típica", kanban: "Soporte, Mantenimiento, Equipos de Alto Rendimiento, Ops", scrum: "Desarrollo de nuevos productos o features complejas" },
      ],
    },
  },
  {
    id: 10,
    type: "closing",
    title: "¿Por dónde empezar?",
    content: {
      subtitle: "Tu hoja de ruta en 4 pasos para implementar STATIK (Systems Thinking Approach to Introducing Kanban)",
      bullets: [
        "1️⃣ Entiende a tu cliente y los servicios que provees.",
        "2️⃣ Mapea el flujo de valor actual: ¿Cómo viaja el trabajo desde la idea hasta producción?",
        "3️⃣ Crea un tablero y define las políticas explícitas y los WIP Limits iniciales.",
        "4️⃣ Mide, aprende y ajusta en el tiempo usando Lead Time y CFD.",
      ],
      highlight: "Evolución, no revolución",
      note: "Kanban no requiere cambiar tus títulos de puesto, requiere cambiar tu forma de gestionar el trabajo.",
    },
  },
];
