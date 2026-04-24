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
  avatars?: string[];
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
      body: "A diferencia de metodologías pesadas o marcos ágiles prescriptivos (como Scrum), Kanban <b>no es un ciclo de vida de desarrollo de software ni un proceso con etapas definidas</b>.",
      bullets: [
        "No te dice cómo desarrollar software (no prescribe fases de diseño, código o QA).",
        "Es un <b>método de gestión visual</b> y de <b>mejora continua</b>.",
        "Se aplica como un «lente» <b>sobre tu proceso actual</b> (sea cual sea) para hacerlo visible y optimizarlo.",
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
          color: "#FFE4E6",
          rotate: -2,
          author: "Sistemas Push",
        },
        {
          text: "1953 — Toyota crea tarjetas para señalar demanda. Las partes no se fabrican hasta que la siguiente estación lo pide.",
          color: "#FEF3C7",
          rotate: 1.5,
          author: "Manufactura",
        },
        {
          text: "El sistema Pull: El equipo «jala» (pull) una nueva tarea del Backlog SOLO cuando tiene capacidad (WIP) disponible.",
          color: "#DCFCE7",
          rotate: -1,
          author: "Sistemas Pull",
        },
        {
          text: "2007 — Kanban Method: Adaptación para el «trabajo del conocimiento» (Software) donde el inventario es invisible (código).",
          color: "#E0E7FF",
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
        "4️⃣ Hacer las políticas de proceso explícitas (¿qué significa que algo está «Hecho»?).",
        "5️⃣ Implementar bucles de feedback (reuniones operativas, revisiones de entrega).",
        "6️⃣ Mejorar colaborativamente, evolucionar experimentalmente (método científico).",
      ],
      note: "Un tablero en Trello sin límites WIP no es Kanban, es solo una lista visual (Proto-Kanban).",
    },
  },
  {
    id: 6,
    type: "text",
    title: "Upstream vs Downstream",
    content: {
      subtitle: "Dos zonas con naturalezas distintas dentro del sistema",
      body: "En Kanban, <i>upstream</i> y <i>downstream</i> no son solo «antes/después». La frontera entre ambos es el <b>Punto de Compromiso</b> (Commitment Point): el momento en que el equipo acuerda que una idea está lista para construirse.",
      bullets: [
        "🧭 <b>Upstream (Exploración):</b> Ideas, análisis, validación de oportunidades. Hay alta incertidumbre y no todo lo que entra aquí se llegará a desarrollar. Se filtra y refina la demanda.",
        "⚙️ <b>Downstream (Ejecución):</b> Desarrollo, pruebas, despliegue. Flujo más estable y predecible. Aquí entra únicamente el trabajo que ya está listo (Ready) para ejecutarse.",
        "🎯 <b>¿Por qué importa la distinción?</b> Si tratas el upstream como downstream, fuerzas precisión donde aún hay incertidumbre. Si no filtras el upstream, el downstream se inunda de trabajo mal definido y bloqueos."
      ],
      highlight: "¿Qué deberíamos hacer? (Upstream) ➡️ ¿Cómo lo hacemos? (Downstream)",
    },
  },
  {
    id: 7,
    type: "text",
    title: "Dinámica del Tablero (Sistema Pull)",
    content: {
      subtitle: "¿Cómo se asigna el trabajo? ¿Qué pasa si alguien está libre?",
      body: "En Kanban <b>no hay un jefe asignando tareas</b> (eso sería Push). El trabajo fluye mediante reglas claras y auto-organización del equipo.",
      bullets: [
        "👤 <b>La tarjeta no tiene dueño previo:</b> Una tarjeta en el backlog no tiene un desarrollador asignado. Cuando alguien se libera, <b>«jala»</b> (pull) la tarjeta con mayor prioridad a su columna.",
        "🤝 <b>Trabajo en equipo:</b> Los avatares en una tarjeta muestran quién la está trabajando <i>en este momento</i>. Si se atasca, más personas pueden sumarse a esa tarjeta (Pair/Mob programming) para destrabarla.",
        "🛑 <b>¿Qué pasa si no tengo nada que hacer?</b> Primero miras a tu <b>derecha</b> (Downstream). ¿Alguien necesita ayuda en Pruebas o Despliegue? El objetivo es mover las tarjetas hacia «Terminado», NO arrancar cosas nuevas y saturar el WIP."
      ],
      note: "Regla de oro: «Ayuda a terminar antes de empezar a trabajar en algo nuevo»."
    }
  },
  {
    id: 8,
    type: "board",
    title: "El Flujo de Valor (Tablero Real)",
    content: {
      subtitle: "Visualizando Upstream, Downstream, Puntos de Compromiso y Responsables",
      columns: [
        {
          name: "💡 Discovery (Upstream)",
          color: "#F3E8FF",
          cards: [
            { text: "Validar Chat IA", tag: "Research", tagColor: "#9333EA", rotate: -1.5, avatars: ["PM", "UX"] },
          ],
        },
        {
          name: "📋 Ready (Compromiso)",
          color: "#FFFBEB",
          wip: undefined,
          cards: [
            { text: "API de Pagos", tag: "Backend", tagColor: "#2563EB", rotate: 1 },
            { text: "Filtros Catálogo", tag: "Fullstack", tagColor: "#D97706", rotate: 0 },
          ],
        },
        {
          name: "⚡ Desarrollo (Downstream)",
          color: "#EFF6FF",
          wip: 2,
          cards: [
            { text: "Login con Google", tag: "Frontend", tagColor: "#059669", rotate: 1.5, avatars: ["JD", "MS"] },
          ],
        },
        {
          name: "🔍 QA / Review",
          color: "#F0FDF4",
          wip: 2,
          cards: [
            { text: "Bugs Carrito", tag: "QA", tagColor: "#E11D48", rotate: 0.5, avatars: ["LV"] },
          ],
        },
        {
          name: "✅ Desplegado",
          color: "#F8FAFC",
          wip: undefined,
          cards: [
            { text: "Optimización DB", tag: "Backend", tagColor: "#2563EB", rotate: -1, avatars: ["JD"] },
          ],
        },
      ],
    },
  },
  {
    id: 9,
    type: "wip",
    title: "¿Qué significa concretamente limitar el WIP?",
    content: {
      subtitle: "Work In Progress (Trabajo en Progreso)",
      body: "Limitar el WIP significa establecer un <b>tope máximo estricto</b> de tarjetas que pueden existir simultáneamente en una columna específica del tablero.",
      bullets: [
        "🚧 Tope estricto: Si la columna «Desarrollo» tiene un WIP de 3, y ya hay 3 tarjetas, los programadores NO pueden jalar una nueva tarea desde «Ready».",
        "🤝 Colaboración forzada: El límite provoca que el equipo deba colaborar para terminar el trabajo actual antes de aceptar más carga.",
        "🧠 Menos «Context Switching»: Evita que el cerebro del desarrollador salte entre 5 tareas, reduciendo la fatiga mental y los bugs causados por desconcentración.",
      ],
      highlight: "Deja de empezar, comienza a terminar.",
      note: "El objetivo es maximizar la entrega de valor final, no mantener a la gente ocupada escribiendo código que no se despliega.",
    },
  },
  {
    id: 10,
    type: "metrics",
    title: "Métricas y la Ley de Little",
    content: {
      subtitle: "Dejamos de estimar en horas y empezamos a medir probabilidad de entrega",
      metrics: [
        {
          name: "Lead Time",
          value: "Días/Semanas",
          desc: "Tiempo transcurrido desde que un cliente hace la petición (o cruza el punto de compromiso) hasta su entrega.",
          icon: "⏱️",
          color: "#F56A00",
        },
        {
          name: "Cycle Time",
          value: "Días/Horas",
          desc: "Tiempo de trabajo activo en un ítem de trabajo (desde que empieza a desarrollarse).",
          icon: "🔄",
          color: "#0070F3",
        },
        {
          name: "Throughput",
          value: "Tarjetas/Semana",
          desc: "Tasa de entrega. Cuántas tarjetas terminamos por periodo. Permite predecir fechas con simulaciones de Monte Carlo.",
          icon: "📦",
          color: "#10B981",
        },
        {
          name: "Ley de Little",
          value: "Lead Time = WIP / Throughput",
          desc: "La demostración matemática de que si reduces el Trabajo en Progreso, tu tiempo de entrega baja automáticamente.",
          icon: "🧮",
          color: "#7928CA",
        },
      ],
    },
  },
  {
    id: 11,
    type: "vsscrum",
    title: "Kanban vs Scrum",
    content: {
      subtitle: "Diferentes enfoques para contextos diferentes",
      comparison: [
        { aspect: "Iteraciones", kanban: "Flujo continuo (sin Sprints fijos)", scrum: "Sprints fijos (1–4 semanas)" },
        { aspect: "Roles", kanban: "No impone roles (se empieza con los que hay)", scrum: "Scrum Master, Product Owner, Developers" },
        { aspect: "Priorización", kanban: "Se puede cambiar el orden de la columna «Ready» en cualquier momento", scrum: "El Sprint Backlog se congela durante el Sprint" },
        { aspect: "Estimaciones", kanban: "Opcional (se proyecta mediante métricas de flujo)", scrum: "Requeridas (Story points o similar)" },
        { aspect: "Reuniones", kanban: "A demanda (Replenishment, Standup centrado en el tablero)", scrum: "Eventos prescriptivos (Planning, Daily, Retro, Review)" },
      ],
    },
  },
  {
    id: 12,
    type: "closing",
    title: "¿Por dónde empezar?",
    content: {
      subtitle: "La vía evolutiva hacia la agilidad",
      bullets: [
        "1️⃣ Visualiza tu flujo actual, tal y como es (sin idealizarlo).",
        "2️⃣ Acuerda políticas explícitas: ¿Qué significa exactamente que algo esté «En Pruebas»?",
        "3️⃣ Implementa un límite WIP muy suave al principio y observa dónde se atasca el trabajo.",
        "4️⃣ Realiza reuniones regulares frente al tablero para debatir cómo mejorar el flujo (Retrospectivas).",
      ],
      highlight: "Evolución, no revolución",
      note: "El verdadero Kanban requiere paciencia y voluntad de descubrir los cuellos de botella estructurales de tu organización.",
    },
  },
];
