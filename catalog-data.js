/* Añade áreas, servicios y fuentes aquí. Los identificadores deben ser únicos.
   null significa información pendiente. No incluyas credenciales ni tokens. */
window.CATALOG = {
  departments: [
    {
      id: "moxsi",
      name: "Moxsi",
      emoji: "🚲",
      accent: "#619E2E",
      description:
        "Un punto de encuentro para los datos que mueven Moxsi. Explora los servicios, descubre sus fuentes y encuentra la información que necesitas.",
      services: [
        {
          id: "sitycleta-mecanica",
          name: "Sítycleta Mecánica",
          icon: "bike",
          description:
            "Fuentes de datos vinculadas a las bicicletas mecánicas de Sítycleta.",
          color: "green",
        },
        {
          id: "sitycleta-electrica",
          name: "Sítycleta Eléctrica",
          icon: "ebike",
          description:
            "Fuentes de datos vinculadas a las bicicletas eléctricas de Sítycleta.",
          color: "electric",
        },
        {
          id: "sityneta",
          name: "Sítyneta",
          icon: "scooter",
          description:
            "Fuentes de datos vinculadas a los patinetes eléctricos de Sítyneta.",
          color: "orange",
        },
      ],
    },
    {
      id: "aparcamientos",
      name: "Aparcamientos",
      emoji: "🅿️",
      accent: "#0B537F",
      description:
        "Fuentes de datos de los aparcamientos gestionados por SAGULPA, incluidos su inventario y sus usos.",
      services: [],
    },
    {
      id: "ser",
      name: "S.E.R.",
      emoji: "🅿️",
      accent: "#E9761F",
      description:
        "Fuentes del Servicio de Estacionamiento Regulado: horarios, calles, zonas, tiques y parquímetros.",
      services: [],
    },
    {
      id: "centro-incidencias-operativas",
      name: "Centro de Incidencias Operativas",
      emoji: "🚨",
      accent: "#E9761F",
      description:
        "Llamadas, tickets, facturación e incidencias operativas para facilitar la atención y el análisis de recurrencias.",
      services: [],
    },
    {
      id: "movilidad-trafico",
      name: "Movilidad y Tráfico",
      emoji: "🚦",
      accent: "#619E2E",
      description:
        "Proyectos, instalaciones, activos monitorizados y documentación técnica de movilidad y tráfico.",
      services: [],
    },
    {
      id: "oficina-dato",
      name: "Oficina del Dato",
      emoji: "📊",
      accent: "#0B537F",
      description:
        "Calidad, preparación, cruce y análisis de datos corporativos y de movilidad.",
      services: [],
    },
    {
      id: "financiero",
      name: "Financiero",
      emoji: "💶",
      accent: "#FEC735",
      description:
        "Contabilidad, recaudación, nóminas, ingresos, gastos y control económico.",
      services: [],
    },
    {
      id: "personas-talento",
      name: "Personas y Talento",
      emoji: "👥",
      accent: "#E9761F",
      description:
        "Información laboral, desarrollo, formación, igualdad, salud y analítica de personas.",
      services: [],
    },
    {
      id: "sistemas",
      name: "Sistemas",
      emoji: "🖥️",
      accent: "#0B537F",
      description:
        "Aplicaciones corporativas, soporte, monitorización, ciberseguridad e integraciones.",
      services: [],
    },
    {
      id: "juridico",
      name: "Jurídico",
      emoji: "⚖️",
      accent: "#E9761F",
      description:
        "Expedientes, contratación, licitaciones, pliegos y documentación jurídica.",
      services: [],
    },
    {
      id: "tecnico",
      name: "Técnico",
      emoji: "🏗️",
      accent: "#FEC735",
      description:
        "Obras, proyectos, mantenimiento, instalaciones y documentación técnica.",
      services: [],
    },
    {
      id: "seguridad-salud-calidad",
      name: "Seguridad, Salud y Calidad",
      emoji: "🛡️",
      accent: "#619E2E",
      description:
        "Prevención, salud laboral, riesgos, requisitos legales y gestión de calidad.",
      services: [],
    },
    {
      id: "financiacion-externa",
      name: "Financiación Externa",
      emoji: "🎯",
      accent: "#E9761F",
      description:
        "Convocatorias, subvenciones, justificaciones y repositorio de proyectos financiados.",
      services: [],
    },
    {
      id: "sostenibilidad-energia",
      name: "Sostenibilidad y Energía",
      emoji: "🌱",
      accent: "#619E2E",
      description:
        "Producción energética, instalaciones fotovoltaicas y documentación de sostenibilidad.",
      services: [],
    },
    {
      id: "atencion",
      name: "Atención",
      emoji: "🎧",
      accent: "#0B537F",
      description:
        "Datos de contacto y atención vinculados a residentes y servicios operativos.",
      services: [],
    },
    {
      id: "transversal",
      name: "Transversal",
      emoji: "🔄",
      accent: "#0B537F",
      description:
        "Fuentes compartidas para reuniones, tareas, proyectos y colaboración entre áreas.",
      services: [],
    },
  ],
  sources: [
    {
      id: "4gflota",
      departmentId: "moxsi",
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "4gflota",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWODonxayRRN55aa2_UCCcodlZbYcS_clekJ_Ak-iyPA&s=10",
      initials: "4g",
      color: "blue",
      category: "Telemetría",
      icon: "pin",
      description:
        "Información de geolocalización de vehículos y batería (Docubi).",
      datasets: [
        {
          name: "Geolocalización de vehículos",
          description: "Información sobre la ubicación de los vehículos.",
          icon: "pin",
        },
        {
          name: "Batería (Docubi)",
          description:
            "Información de batería. Alcance y relación con Docubi pendientes de concretar.",
          icon: "battery",
        },
      ],
      api: {
        status: "pending",
        url: null,
        note: "Preguntar a Javi por la disponibilidad y el acceso a la API.",
      },
      website: null,
      repository: null,
      storage: null,
      owner: null,
      pending: [
        "Consultar con Javi la disponibilidad de la API.",
        "Documentar ubicaciones, responsable y enlaces de acceso.",
      ],
    },
    {
      id: "qucit",
      departmentId: "moxsi",
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "qucit",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8My9gR1_uqj_toj6dd4gunB-DRkrNgrCF2_LPCD-Vw&s=10",
      initials: "q",
      color: "purple",
      category: "Operaciones",
      icon: "tasks",
      description:
        "Evaluación del desempeño y seguimiento de las tareas del equipo de logística en calle.",
      datasets: [
        {
          name: "Evaluación del desempeño",
          description:
            "Información para evaluar el desempeño del equipo de logística en calle.",
          icon: "chart",
        },
        {
          name: "Tareas de logística",
          description:
            "Tareas que realizan los compañeros de logística en calle.",
          icon: "tasks",
        },
      ],
      api: {
        status: "available",
        url: null,
        note: "La fuente dispone de API. Falta documentar su URL, autenticación y condiciones de acceso.",
      },
      website: null,
      repository: null,
      storage: null,
      owner: null,
      pending: [
        "Añadir la documentación y la URL de la API.",
        "Documentar ubicaciones, responsable y enlaces de acceso.",
      ],
    },
    {
      id: "nextbike",
      departmentId: "moxsi",
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "Nextbike",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFuylFKHT4KfRZiCLQR3IywJ48OncuGjps8swfhNkP4w&s=10",
      initials: "nb",
      color: "blue",
      category: "Bicicleta compartida",
      icon: "bike",
      description:
        "Consultas operativas de estaciones, vehículos, alquileres, clientes, membresías y transacciones para los tres subtipos de Moxsi.",
      itemLabel: "consultas",
      contentTitle: "Consultas disponibles",
      contentDescription:
        "Consultas del portal de Nextbike traducidas al español. El acceso puede requerir iniciar sesión con una cuenta autorizada.",
      datasets: [
        {
          queryNumber: 1,
          name: "Estaciones: bicicletas disponibles",
          description:
            "Lista las bicicletas disponibles en las estaciones oficiales de una ciudad durante el periodo seleccionado. Para periodos largos se recomienda comenzar con pocos días.",
          icon: "bike",
          url: "https://my.nextbike.net/office/queries/view/66",
        },
        {
          queryNumber: 2,
          name: "Alquileres con datos de clientes por ciudad",
          description:
            "Muestra los alquileres con fecha, lugar, cliente y canal. Para periodos superiores a 60 días debe ejecutarse sobre el archivo histórico; los resultados pueden contener duplicados.",
          icon: "tasks",
          url: "https://my.nextbike.net/office/queries/view/129",
        },
        {
          queryNumber: 3,
          name: "Bloqueos de cuadro y ordenadores de bicicleta por ciudad",
          description:
            "Consulta interna que lista por ciudad las bicicletas conectadas a un bloqueo de cuadro o a un ordenador de bicicleta.",
          icon: "bike",
          url: "https://my.nextbike.net/office/queries/view/305",
        },
        {
          queryNumber: 4,
          name: "Clientes registrados",
          description:
            "Muestra todos los clientes registrados para cada marca.",
          icon: "tasks",
          url: "https://my.nextbike.net/office/queries/view/410",
        },
        {
          queryNumber: 5,
          name: "Clientes por marca con último alquiler y suscripciones",
          description:
            "Lista los clientes de la marca seleccionada e incluye sus suscripciones vigentes y la fecha de su último alquiler.",
          icon: "tasks",
          url: "https://my.nextbike.net/office/queries/view/424",
        },
        {
          queryNumber: 6,
          name: "Transacciones",
          description:
            "Lista las transacciones de los clientes de una marca, incluidos alquileres y pagos. La consulta está temporalmente desactivada por carga del servidor.",
          icon: "chart",
          url: "https://my.nextbike.net/office/queries/view/525",
          status: "Temporalmente desactivada",
        },
        {
          queryNumber: 7,
          name: "Bicicletas con coordenadas por ciudad",
          description:
            "Permite consultar las bicicletas y sus coordenadas para una o varias ciudades seleccionadas.",
          icon: "pin",
          url: "https://my.nextbike.net/office/queries/view/585",
        },
        {
          queryNumber: 8,
          name: "Clientes con membresías por marca",
          description:
            "Lista los clientes con membresía, abono o suscripción por marca, incluido el precio pagado, el correo electrónico, la suscripción al boletín y el estado.",
          icon: "tasks",
          url: "https://my.nextbike.net/office/queries/view/639",
        },
        {
          queryNumber: 9,
          name: "Alquileres sin vales",
          description:
            "Lista los alquileres de pago por uso realizados sin vale, membresía, cupón, billete o suscripción, incluido su precio. Para periodos superiores a 60 días debe usarse el archivo histórico.",
          icon: "bike",
          url: "https://my.nextbike.net/office/queries/view/640",
        },
        {
          queryNumber: 10,
          name: "Alquileres con vales",
          description:
            "Lista los alquileres de pago por uso realizados con vale, membresía, cupón, billete o suscripción, incluido su precio. Para periodos superiores a 60 días debe usarse el archivo histórico.",
          icon: "bike",
          url: "https://my.nextbike.net/office/queries/view/641",
        },
        {
          queryNumber: 11,
          name: "Detalles de clientes",
          description:
            "Muestra los datos de los clientes que se registraron con un dominio determinado durante el periodo seleccionado.",
          icon: "tasks",
          url: "https://my.nextbike.net/office/queries/view/730",
        },
      ],
      api: {
        status: "pending",
        url: null,
        note: "Se han documentado las consultas del portal de Nextbike; la disponibilidad de una API independiente está pendiente de confirmar.",
      },
      website: "https://my.nextbike.net/office/queries",
      repository: null,
      storage: null,
      owner: "Nextbike",
      pending: [
        "Confirmar si existe una API independiente de las consultas del portal.",
        "Documentar la frecuencia de actualización y los permisos necesarios.",
        "Revisar cuándo vuelve a estar disponible la consulta de transacciones.",
      ],
    },
    {
      id: "moxsi-vmp-revisar",
      departmentId: "moxsi",
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "VMP para revisar",
      logoIcon: "sheet",
      initials: "VR",
      color: "green",
      category: "Mantenimiento",
      icon: "sheet",
      description:
        "Hoja de seguimiento de los VMP que debe revisar el personal de taller.",
      itemLabel: "documento",
      contentTitle: "Documento de trabajo",
      contentDescription:
        "Hoja de Google Sheets utilizada por el personal de taller para registrar y seguir las revisiones de los VMP.",
      datasets: [
        {
          name: "VMP para revisar",
          description:
            "Registro operativo de matrículas, fechas, operarios y estado de las revisiones de los VMP.",
          icon: "sheet",
          url: "https://docs.google.com/spreadsheets/d/1vR6_0pA_3rbWeWCxtM-ohkNpxzoVW0i0rqwuQbxhDJQ/edit?gid=0#gid=0",
          linkLabel: "Abrir hoja",
        },
      ],
      api: {
        status: "direct",
        url: null,
        note: "El acceso se realiza directamente mediante Google Sheets.",
      },
      accessLabel: "Hoja de Google Sheets",
      website:
        "https://docs.google.com/spreadsheets/d/1vR6_0pA_3rbWeWCxtM-ohkNpxzoVW0i0rqwuQbxhDJQ/edit?gid=0#gid=0",
      websiteNote:
        "Documento operativo de seguimiento de VMP pendientes de revisión.",
      repository: null,
      storage: null,
      owner: "Personal de taller",
      responsibilityHistory: [
        {
          role: "Personal de taller",
          from: null,
          to: null,
          status: "current",
          note: "Responsable actual de completar la hoja. La fecha de inicio está pendiente de confirmar.",
        },
      ],
      pending: [
        "Confirmar la fecha de inicio de la responsabilidad del personal de taller.",
        "Documentar la frecuencia de actualización y los permisos de acceso.",
      ],
    },
    {
      id: "moxsi-control-almacen",
      departmentId: "moxsi",
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "Control de almacén",
      logoIcon: "sheet",
      initials: "CA",
      color: "green",
      category: "Inventario",
      icon: "sheet",
      description:
        "Hoja de control del almacén de Moxsi, con referencias, compras, consumos y existencias.",
      itemLabel: "documento",
      contentTitle: "Documento de trabajo",
      contentDescription:
        "Hoja de Google Sheets mantenida actualmente por el Jefe de Servicio de Moxsi y cuyo traspaso a SOS está previsto.",
      datasets: [
        {
          name: "Control de almacén",
          description:
            "Control de referencias, descripción, unidades, compras, utilización y stock del almacén.",
          icon: "sheet",
          url: "https://docs.google.com/spreadsheets/d/1l3I5eWfOWsOfYdnaXwOhyI6ii4QAs572Q-c8B0zk_No/edit?gid=908360502#gid=908360502",
          linkLabel: "Abrir hoja",
        },
      ],
      api: {
        status: "direct",
        url: null,
        note: "El acceso se realiza directamente mediante Google Sheets.",
      },
      accessLabel: "Hoja de Google Sheets",
      website:
        "https://docs.google.com/spreadsheets/d/1l3I5eWfOWsOfYdnaXwOhyI6ii4QAs572Q-c8B0zk_No/edit?gid=908360502#gid=908360502",
      websiteNote: "Documento operativo para el control del almacén de Moxsi.",
      repository: null,
      storage: null,
      owner: "Jefe de Servicio de Moxsi",
      responsibilityHistory: [
        {
          role: "Jefe de Servicio de Moxsi",
          from: null,
          to: null,
          status: "current",
          note: "Responsable actual de completar la hoja. Las fechas de inicio y finalización están pendientes de confirmar.",
        },
        {
          role: "Soporte operativo de servicios (SOS)",
          from: null,
          to: null,
          status: "planned",
          note: "Traspaso de responsabilidad previsto. La fecha de inicio está pendiente de confirmar.",
        },
      ],
      pending: [
        "Confirmar desde qué fecha mantiene la hoja el Jefe de Servicio de Moxsi.",
        "Registrar la fecha efectiva del traspaso a SOS cuando se produzca.",
        "Documentar la frecuencia de actualización y los permisos de acceso.",
      ],
    },
    {
      id: "moxsi-inventario-vmp-historico",
      departmentId: "moxsi",
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "Inventario VMP histórico",
      logoIcon: "sheet",
      initials: "IH",
      color: "green",
      category: "Inventario histórico",
      icon: "sheet",
      description:
        "Inventario histórico de VMP generado a partir de la consulta 305 de Nextbike.",
      itemLabel: "recursos",
      contentTitle: "Documento y origen",
      contentDescription:
        "La hoja conserva el inventario histórico y la consulta de Nextbike documenta su fuente de origen.",
      datasets: [
        {
          name: "Inventario VMP histórico",
          description:
            "Hoja histórica con información de inventario de los VMP de Moxsi.",
          icon: "sheet",
          url: "https://docs.google.com/spreadsheets/d/1-8FirPp5tr0Coiwe3BgR0f_5i0ypjiQp9C9KwCY_zpM/edit?gid=1473311831#gid=1473311831",
          linkLabel: "Abrir hoja",
        },
        {
          name: "Consulta Nextbike 305",
          description:
            "Consulta de Nextbike utilizada como origen para generar el inventario histórico.",
          icon: "database",
          url: "https://my.nextbike.net/office/queries/view/305",
          linkLabel: "Abrir consulta",
        },
      ],
      api: {
        status: "direct",
        url: null,
        note: "El acceso se realiza mediante Google Sheets y la consulta 305 de Nextbike.",
      },
      accessLabel: "Hoja de Google Sheets",
      website:
        "https://docs.google.com/spreadsheets/d/1-8FirPp5tr0Coiwe3BgR0f_5i0ypjiQp9C9KwCY_zpM/edit?gid=1473311831#gid=1473311831",
      websiteNote:
        "Documento histórico generado a partir de datos consultados en Nextbike.",
      repository: null,
      storage: null,
      owner: null,
      responsibilityHistory: [],
      pending: [
        "Documentar quién genera y mantiene el inventario histórico.",
        "Confirmar la periodicidad de generación desde Nextbike.",
        "Registrar las fechas de responsabilidad cuando se identifique al equipo responsable.",
      ],
    },
    {
      id: "moxsi-incidencias",
      departmentId: "moxsi",
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "Incidencias",
      logoIcon: "sheet",
      initials: "MI",
      color: "green",
      category: "Incidencias operativas",
      icon: "sheet",
      description:
        "Registro anual de incidencias gestionado por los equipos SIO y SOS.",
      itemLabel: "archivos anuales",
      contentTitle: "Archivos por año",
      contentDescription:
        "Se crea una hoja de Google Sheets por año para registrar las incidencias y su actividad asociada.",
      datasets: [
        {
          name: "Incidencias 2025",
          description:
            "Registro de incidencias de 2025, incluidos datos operativos, correos y llamadas.",
          icon: "sheet",
          url: "https://docs.google.com/spreadsheets/d/1Z6C4g_Ke8pejjSDZHw9ENkBV5ho6JaRY7yhKvDaGOkw/edit?gid=868944632#gid=868944632",
          linkLabel: "Abrir hoja 2025",
        },
        {
          name: "Incidencias 2026",
          description:
            "Registro de incidencias de 2026 mantenido como continuación anual del histórico.",
          icon: "sheet",
          url: "https://docs.google.com/spreadsheets/d/1JDEAfGl4danYesLPRm2bogu-REnbpD3tbg7Ccn54nvI/edit?gid=1074201808#gid=1074201808",
          linkLabel: "Abrir hoja 2026",
        },
      ],
      api: {
        status: "direct",
        url: null,
        note: "El acceso se realiza directamente mediante las hojas anuales de Google Sheets.",
      },
      accessLabel: "Hoja del año actual",
      website:
        "https://docs.google.com/spreadsheets/d/1JDEAfGl4danYesLPRm2bogu-REnbpD3tbg7Ccn54nvI/edit?gid=1074201808#gid=1074201808",
      websiteNote:
        "Acceso directo al archivo de incidencias de 2026. Los años anteriores están disponibles en la pestaña de archivos.",
      repository: null,
      storage: null,
      owner: "SIO y SOS",
      responsibilityHistory: [
        {
          role: "Soporte de Incidencias Operativas (SIO)",
          from: null,
          to: null,
          status: "current",
          note: "Equipo responsable de completar los archivos anuales. La fecha de inicio está pendiente de confirmar.",
        },
        {
          role: "Soporte operativo de servicios (SOS)",
          from: null,
          to: null,
          status: "current",
          note: "Equipo responsable de completar los archivos anuales. La fecha de inicio está pendiente de confirmar.",
        },
      ],
      pending: [
        "Confirmar desde qué fecha participan SIO y SOS en el mantenimiento de los archivos.",
        "Documentar el proceso de creación de cada archivo anual.",
        "Registrar los cambios de responsabilidad futuros con sus fechas efectivas.",
      ],
    },
    {
      id: "api-sagulpa",
      departmentIds: ["moxsi", "aparcamientos", "ser"],
      serviceIds: ["sitycleta-mecanica", "sitycleta-electrica", "sityneta"],
      name: "API SAGULPA",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-qqhMc65g-1hR5rrPlEpZyaWI71kNisFuGKv0k_DNeA&s=10",
      initials: "K",
      color: "blue",
      category: "API REST",
      icon: "code",
      description:
        "API desarrollada por Kubo para compartir datos de Moxsi, Aparcamientos y el Servicio de Estacionamiento Regulado.",
      itemLabel: "endpoints",
      contentTitle: "Endpoints documentados",
      contentDescription:
        "La especificación funcional describe once endpoints. Las rutas definitivas y la URL base no figuran en el documento recibido.",
      datasets: [
        {
          name: "Recorridos de Sítycleta",
          description: "Tabla Track con recorridos, geometría y distancias.",
          icon: "pin",
          status: "Ruta pendiente",
        },
        {
          name: "Alquileres de Sítycleta",
          description:
            "Tabla Rental con alquileres, bicicletas, usuarios, importes y métricas.",
          icon: "bike",
          status: "Ruta pendiente",
        },
        {
          name: "Estaciones de Sítycleta",
          description: "Inventario y localización de estaciones de Sítycleta.",
          icon: "pin",
          status: "Ruta pendiente",
        },
        {
          name: "Aparcamientos",
          description:
            "Listado de aparcamientos, localización y número de plazas.",
          icon: "database",
          status: "Ruta pendiente",
        },
        {
          name: "Usos de aparcamientos",
          description:
            "Estacionamientos de vehículos con entrada, salida y tipo de usuario.",
          icon: "vehicle",
          status: "Ruta pendiente",
        },
        {
          name: "Horarios del S.E.R.",
          description:
            "Franjas horarias de estacionamiento regulado por zona y día.",
          icon: "clock",
          status: "Ruta pendiente",
        },
        {
          name: "Oferta horaria por calles",
          description: "Oferta por calle, plazas, periodo y horario del S.E.R.",
          icon: "clock",
          status: "Ruta pendiente",
        },
        {
          name: "Calles de LPAPark",
          description:
            "Calles de LPAPark relacionadas con el callejero municipal.",
          icon: "pin",
          status: "Ruta pendiente",
        },
        {
          name: "Zonas del S.E.R.",
          description: "Zonas de estacionamiento regulado y su tipo de área.",
          icon: "pin",
          status: "Ruta pendiente",
        },
        {
          name: "Tiques del S.E.R.",
          description:
            "Operaciones y periodos de servicio de los tiques de estacionamiento.",
          icon: "tasks",
          status: "Ruta pendiente",
        },
        {
          name: "Parquímetros",
          description:
            "Inventario, localización, zona y estado de los parquímetros.",
          icon: "database",
          status: "Ruta pendiente",
        },
      ],
      api: {
        status: "available",
        url: null,
        note: "La especificación está documentada, pero falta registrar la URL base, las rutas definitivas y el mecanismo de autenticación.",
      },
      apiLibraryId: "sagulpa",
      website: null,
      repository: null,
      storage: null,
      owner: "Kubo (desarrollo)",
      responsibilityHistory: [],
      pending: [
        "Registrar la URL base y las rutas definitivas de los once endpoints.",
        "Documentar el mecanismo de autenticación y los permisos.",
        "Resolver la diferencia funcional entre tenant_id y user_id en Rental.",
        "Confirmar la puesta en producción y la periodicidad mensual prevista.",
      ],
    },
  ],
};
