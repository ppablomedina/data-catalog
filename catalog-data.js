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
      logo: "assets/4gflota.svg",
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
      logo: "assets/qucit.svg",
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
  ],
};
