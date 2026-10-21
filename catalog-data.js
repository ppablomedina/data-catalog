/* Añade departamentos, servicios y fuentes aquí. Los identificadores deben ser únicos.
   null significa información pendiente. No incluyas credenciales ni tokens. */
window.CATALOG = {
  departments: [
    {
      id: "moxsi",
      name: "Moxsi",
      description:
        "Un punto de encuentro para los datos que mueven Moxsi. Explora los servicios, descubre sus fuentes y encuentra la información que necesitas.",
      services: [
        {
          id: "sitycleta",
          name: "Sítycleta",
          icon: "bike",
          description:
            "Explora la información y las fuentes de datos de Sítycleta.",
          color: "green",
        },
        {
          id: "sityneta",
          name: "Sítyneta",
          icon: "vehicle",
          description:
            "Explora la información y las fuentes de datos de Sítyneta.",
          color: "orange",
        },
      ],
    },
  ],
  sources: [
    {
      id: "4gflota",
      departmentId: "moxsi",
      serviceIds: [],
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
        "Confirmar la relación con Sítycleta y Sítyneta.",
        "Documentar ubicaciones, responsable y enlaces de acceso.",
      ],
    },
    {
      id: "qucit",
      departmentId: "moxsi",
      serviceIds: [],
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
        "Confirmar la relación con Sítycleta y Sítyneta.",
        "Documentar ubicaciones, responsable y enlaces de acceso.",
      ],
    },
    {
      id: "nextbike",
      departmentId: "moxsi",
      serviceIds: ["sitycleta"],
      name: "Nextbike",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFuylFKHT4KfRZiCLQR3IywJ48OncuGjps8swfhNkP4w&s=10",
      initials: "nb",
      color: "blue",
      category: "Bicicleta compartida",
      icon: "bike",
      description:
        "Consultas operativas de estaciones, bicicletas, alquileres, clientes, membresías y transacciones de Sítycleta.",
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
      serviceIds: ["sitycleta"],
      name: "Moxsi - VMP para revisar",
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
          name: "Moxsi - VMP para revisar",
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
      serviceIds: ["sitycleta"],
      name: "Moxsi - Control de almacén",
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
          name: "Moxsi - Control de almacén",
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
      serviceIds: ["sitycleta"],
      name: "Moxsi - Inventario VMP histórico",
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
          name: "Moxsi - Inventario VMP histórico",
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
      serviceIds: ["sitycleta"],
      name: "Moxsi - Incidencias",
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
          name: "2025 - Moxsi incidencias",
          description:
            "Registro de incidencias de 2025, incluidos datos operativos, correos y llamadas.",
          icon: "sheet",
          url: "https://docs.google.com/spreadsheets/d/1Z6C4g_Ke8pejjSDZHw9ENkBV5ho6JaRY7yhKvDaGOkw/edit?gid=868944632#gid=868944632",
          linkLabel: "Abrir hoja 2025",
        },
        {
          name: "2026 - Moxsi incidencias",
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
  ],
};
