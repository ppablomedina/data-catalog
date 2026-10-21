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
  ],
};
