(() => {
  "use strict";

  const linked = (name, href, relation, status = "proposed") => ({
    name,
    href,
    relation,
    status,
  });
  const pending = (name, relation) => ({
    name,
    href: null,
    relation,
    status: "pending",
  });
  const nextbike = (relation, query) =>
    linked(
      query ? `Nextbike · Consulta ${query}` : "Nextbike",
      query
        ? `#/moxsi/fuente/nextbike${query === 11 ? "/consulta/11" : "/consultas"}`
        : "#/moxsi/fuente/nextbike",
      relation,
      "proposed",
    );
  const apiNextbike = (relation) =>
    linked("API de Nextbike", "#/apis/nextbike", relation, "proposed");
  const incidents = (relation) =>
    linked("Incidencias", "#/moxsi/fuente/moxsi-incidencias", relation, "proposed");
  const inventory = (relation) =>
    linked(
      "Inventario VMP histórico",
      "#/moxsi/fuente/moxsi-inventario-vmp-historico",
      relation,
      "proposed",
    );
  const qucit = (relation) => linked("qucit", "#/moxsi/fuente/qucit", relation, "proposed");
  const navision = (relation) =>
    linked(
      "Navision (ERP contable)",
      "#/financiero/fuente/inventario-1-navision-erp-contable",
      relation,
      "proposed",
    );

  const metric = (name, formula, period, sources, options = {}) => ({
    name,
    formula,
    period,
    sources,
    description: options.description || "",
    note: options.note || "",
    pending: options.pending || [],
  });

  window.DOCUMENT_LIBRARY = [
    {
      id: "atuc-dimensionamiento-demanda",
      areaId: "moxsi",
      areaName: "Moxsi",
      organization: "ATUC",
      type: "Encuesta",
      title: "Dimensionamiento y demanda",
      icon: "📐",
      color: "blue",
      description:
        "Inventario anual del tamaño del servicio, disponibilidad, usuarios, viajes, estaciones y anclajes.",
      referencePeriod: "Año 2025 · proyección de datos 2026",
      frequency: "Anual",
      owner: null,
      classification: null,
      template: {
        name: "Plantilla ATUC · Dimensionamiento y demanda 2026",
        url: "docs/templates/ATUC_dimensionamiento-demanda_2026.xlsx",
      },
      archive: [
        {
          year: "2026",
          label: "Encuesta cumplimentada",
          url: null,
          status: "pending",
          note: "Pendiente de indicar el objeto y la ruta en Cloud Storage.",
        },
      ],
      pending: [
        "Confirmar la persona responsable de preparar, revisar y remitir la encuesta.",
        "Confirmar la clasificación y los permisos de acceso.",
        "Añadir la ruta de Cloud Storage de cada entrega anual.",
      ],
      sections: [
        {
          title: "Información del servicio",
          metrics: [
            metric("Empresa / Entidad", "Valor declarado", "A 31/12", [pending("Ficha corporativa de Moxsi", "Nombre legal de la empresa o entidad")], { pending: ["Confirmar la razón social que debe declararse a ATUC."] }),
            metric("Sistema que opera", "Valor declarado", "A 31/12", [pending("Ficha del servicio", "Nombre comercial y tipología del sistema")], { pending: ["Confirmar el texto oficial del sistema."] }),
            metric("Municipio o área en la que opera", "Valor declarado", "A 31/12", [pending("Ficha del servicio", "Ámbito geográfico cubierto")], { pending: ["Confirmar si se declara municipio, isla o área concesional."] }),
          ],
        },
        {
          title: "Flota",
          note: "La plantilla indica que no debe incluirse la flota en stock.",
          metrics: [
            metric("Número de bicicletas eléctricas", "Conteo de bicicletas eléctricas en servicio, sin stock", "A 31/12", [inventory("Inventario y tipo de vehículo"), apiNextbike("Estado de flota en la fecha de corte")], { pending: ["Validar qué estados de vehículo se consideran «en servicio»."] }),
            metric("Número medio de bicicletas eléctricas operativas", "Media de los conteos diarios de bicicletas eléctricas operativas", "Media anual", [apiNextbike("Estados diarios de la flota"), inventory("Clasificación de bicicleta eléctrica")], { pending: ["Confirmar estados operativos y frecuencia exacta del muestreo."] }),
            metric("Número de bicicletas mecánicas", "Conteo de bicicletas mecánicas en servicio, sin stock", "A 31/12", [inventory("Inventario y tipo de vehículo"), apiNextbike("Estado de flota en la fecha de corte")], { pending: ["Validar qué estados de vehículo se consideran «en servicio»."] }),
            metric("Número medio de bicicletas mecánicas operativas", "Media de los conteos diarios de bicicletas mecánicas operativas", "Media anual", [apiNextbike("Estados diarios de la flota"), inventory("Clasificación de bicicleta mecánica")], { pending: ["Confirmar estados operativos y frecuencia exacta del muestreo."] }),
          ],
        },
        {
          title: "Indisponibilidad",
          note: "La plantilla indica que no debe incluirse la flota en stock.",
          metrics: [
            metric("Indisponibilidad media mensual máxima", "Máximo de las 12 medias mensuales de indisponibilidad", "Máxima media/mes del año", [apiNextbike("Estados y bloqueos de vehículos"), linked("Estado de batería / bloqueos / alquileres activos", "#/moxsi/fuente/inventario-54-estado-de-bateria-bloqueos-alquileres-activos", "Estados no disponibles", "proposed")], { pending: ["Definir numerador, denominador y estados que computan como indisponibles."] }),
            metric("Indisponibilidad media mensual mínima", "Mínimo de las 12 medias mensuales de indisponibilidad", "Mínima media/mes del año", [apiNextbike("Estados y bloqueos de vehículos")], { pending: ["Definir numerador, denominador y estados que computan como indisponibles."] }),
            metric("Indisponibilidad media anual", "Media anual del porcentaje de flota indisponible", "Media anual", [apiNextbike("Estados y bloqueos de vehículos")], { pending: ["Definir la granularidad temporal y el tratamiento de datos ausentes."] }),
          ],
        },
        {
          title: "Usuarios/as",
          metrics: [
            metric("Usuarios/as únicos", "Conteo distinto de usuarios con al menos un uso durante el año", "Total anual", [nextbike("Alquileres con cliente", 2)], { pending: ["Confirmar la clave de usuario que se utilizará para deduplicar."] }),
            metric("Abonados/as", "Media de usuarios con abono o suscripción vigente", "Media anual", [nextbike("Clientes, suscripciones y último alquiler", 5), nextbike("Membresías por marca", 8)], { pending: ["Definir fechas de corte y qué productos cuentan como abono."] }),
            metric("Usuarios/as activos", "Media de cuentas con active = 1 en cada fecha de corte", "Media anual", [nextbike("Estado active calculado al ejecutar la consulta", 11)], { pending: ["Definir la periodicidad de las consultas que formarán la media anual."] }),
            metric("Usuarios/as bloqueados", "Conteo de cuentas bloqueadas", "A 31/12", [pending("Nextbike · estado de cliente", "Bloqueos de cuenta en la fecha de corte")], { pending: ["Identificar el campo o endpoint que representa el bloqueo."] }),
            metric("Usuarios/as de baja", "Conteo de bajas registradas durante el año", "Total anual", [pending("Nextbike · bajas de clientes", "Fecha y estado de baja")], { pending: ["Confirmar si Nextbike conserva fecha de baja y cómo se extrae."] }),
            metric("Usuarios/as ocasionales", "Media de usuarios sin abono que realizan usos", "Media anual", [nextbike("Alquileres sin vales", 9), nextbike("Clientes y suscripciones", 5)], { pending: ["Acordar la definición de usuario ocasional y la ventana de cálculo."] }),
            metric("Usuarios/as pertenecientes a colectivos", "Media de usuarios asociados a productos o colectivos definidos", "Media anual", [nextbike("Membresías y productos por marca", 8)], { pending: ["Identificar los códigos de producto que representan colectivos."] }),
            metric("Usuarios/as registrados", "Conteo de clientes registrados hasta la fecha de corte", "A 31/12", [nextbike("Registros en un intervalo", 11)], { pending: ["Confirmar si se cuentan todos los registros o solo cuentas válidas."] }),
          ],
        },
        {
          title: "Viajes",
          metrics: [
            metric("Viajes realizados por bicicletas eléctricas", "Conteo de alquileres finalizados de bicicletas eléctricas", "Total anual", [nextbike("Alquileres del periodo", 2), inventory("Tipo de vehículo")], { pending: ["Confirmar el campo que identifica el tipo de bicicleta y estados de alquiler válidos."] }),
            metric("Viajes realizados por bicicletas mecánicas", "Conteo de alquileres finalizados de bicicletas mecánicas", "Total anual", [nextbike("Alquileres del periodo", 2), inventory("Tipo de vehículo")], { pending: ["Confirmar el campo que identifica el tipo de bicicleta y estados de alquiler válidos."] }),
          ],
        },
        {
          title: "Otros ratios",
          metrics: [
            metric("Estaciones", "Conteo distinto de estaciones activas", "A 31/12", [nextbike("Estaciones y bicicletas disponibles", 1), apiNextbike("Detalle de estaciones")], { pending: ["Definir si se excluyen estaciones temporales o fuera de servicio."] }),
            metric("Anclajes", "Suma de anclajes disponibles en estaciones activas", "A 31/12", [apiNextbike("Capacidad y detalle de estaciones")], { pending: ["Confirmar el endpoint y el campo de capacidad total."] }),
          ],
        },
      ],
    },
    {
      id: "atuc-kpis",
      areaId: "moxsi",
      areaName: "Moxsi",
      organization: "ATUC",
      type: "Encuesta",
      title: "KPIs",
      icon: "📊",
      color: "green",
      description:
        "Indicadores anuales de avisos, accidentes, vandalismo, rebalanceo, vehículos y bajas de bicicletas.",
      referencePeriod: "Año natural",
      frequency: "Anual",
      owner: null,
      classification: null,
      template: {
        name: "Plantilla ATUC · KPIs 2026",
        url: "docs/templates/ATUC_KPIs_2026.xlsx",
      },
      archive: [{ year: "2026", label: "Encuesta cumplimentada", url: null, status: "pending", note: "Pendiente de indicar el objeto y la ruta en Cloud Storage." }],
      pending: [
        "Confirmar responsable, revisión y fecha límite de entrega.",
        "Validar con ATUC las fórmulas señaladas como incoherentes en la plantilla.",
        "Añadir la ruta de Cloud Storage de cada entrega anual.",
      ],
      sections: [
        {
          title: "Indicadores operativos",
          metrics: [
            metric("Ratio de avisos por cada 1.000 usos", "Total de avisos ÷ (total de usos ÷ 1.000)", "Anual", [incidents("Avisos de recogida registrados durante el año"), nextbike("Total anual de alquileres", 2)], { note: "La plantilla define aviso como cualquier aviso de recogida, independientemente del motivo.", pending: ["Identificar qué tipos de incidencia cuentan como aviso de recogida."] }),
            metric("Accidentes", "Accidentes con bicicletas del servicio ÷ total de viajes × 100.000", "Anual", [incidents("Incidencias clasificadas como accidente"), nextbike("Total anual de viajes", 2)], { pending: ["Confirmar la categoría de accidente y si se cuentan sucesos o bicicletas implicadas."] }),
            metric("Vandalismo", "Bicicletas sustraídas o vandalizadas ÷ flota", "Anual", [incidents("Incidencias de sustracción y vandalismo"), inventory("Tamaño de la flota")], { pending: ["Definir el valor de flota que actúa como denominador."] }),
            metric("Vandalismo de estaciones", "Incidencias de vandalismo en tótem o bases ÷ número de estaciones", "Anual", [incidents("Incidencias sobre tótems y bases"), nextbike("Número de estaciones", 1)], { pending: ["Acordar la taxonomía de vandalismo de estación."] }),
            metric("Ratio de rebalanceo por operario-hora", "Total de rebalanceos ÷ (horas de rebalanceo × operarios de rebalanceo)", "Anual", [qucit("Tareas, operarios y tiempos de logística"), nextbike("Movimientos o cambios de estación", 2)], { pending: ["Confirmar cómo se identifica un rebalanceo y la unidad de horas trabajadas."] }),
            metric("Ratio de rebalanceo respecto a usos", "Total de rebalanceos ÷ total de usos", "Anual", [qucit("Tareas de rebalanceo"), nextbike("Total anual de usos", 2)], { pending: ["Confirmar cómo se identifica un rebalanceo."] }),
            metric("Vehículos asignados a avisos respecto a usos", "Total de usos del año ÷ total de vehículos", "Anual", [nextbike("Total anual de usos", 2), pending("Planificación de vehículos operativos", "Vehículos asignados a avisos")], { note: "La fórmula se transcribe literalmente de la plantilla, pero no parece corresponder con el nombre del indicador.", pending: ["Validar la fórmula con ATUC antes de calcular."] }),
            metric("Vehículos asignados a rebalanceo respecto a usos", "Total de usos del año ÷ total de vehículos", "Anual", [nextbike("Total anual de usos", 2), qucit("Vehículos y tareas de rebalanceo")], { note: "La fórmula se transcribe literalmente de la plantilla.", pending: ["Validar con ATUC si el numerador y el denominador están invertidos o incompletos."] }),
            metric("Porcentaje de bicicletas de baja", "Bicicletas dadas de baja ÷ total de bicicletas × 100", "Anual", [inventory("Estado histórico de la flota"), apiNextbike("Estados de vehículo")], { pending: ["Definir qué estado representa una baja definitiva y el denominador anual."] }),
            metric("Porcentaje de bicicletas deslocalizadas", "Bicicletas sin uso y sin emisión durante más de 2 meses ÷ total de viajes × 100.000", "Anual", [apiNextbike("Telemetría, última actividad y estado"), linked("Telemetría e IoT de vehículos", "#/moxsi/fuente/inventario-53-telemetria-e-iot-de-vehiculos", "Última emisión y estado del vehículo", "proposed"), nextbike("Total anual de viajes", 2)], { note: "La plantilla pide contar las bicicletas que entran en estado de pérdida o localización durante el año.", pending: ["Definir el estado exacto y cómo tratar reapariciones dentro del mismo año."] }),
            metric("Porcentaje de bicicletas perdidas", "Bicicletas fuera de estación con viaje cerrado ÷ total de viajes × 100", "Anual", [apiNextbike("Estado, ubicación y alquiler cerrado"), nextbike("Coordenadas de bicicletas", 7), nextbike("Total anual de viajes", 2)], { note: "La observación de la plantilla indica × 100.000, mientras que la fórmula principal indica × 100.", pending: ["Validar con ATUC si el multiplicador correcto es 100 o 100.000."] }),
          ],
        },
      ],
    },
    {
      id: "atuc-economico-financiera",
      areaId: "moxsi",
      areaName: "Moxsi",
      organization: "ATUC",
      type: "Encuesta",
      title: "Económico-financiera",
      icon: "💶",
      color: "orange",
      description:
        "Información de contrato, ingresos, costes operativos e inversiones del servicio, sin IVA.",
      referencePeriod: "Ejercicios 2024 y 2025 en la plantilla recibida",
      frequency: "Anual",
      owner: null,
      classification: "Confidencial",
      template: {
        name: "Plantilla ATUC · Económico-financiera 2026",
        url: "docs/templates/ATUC_economico-financiera_2026.xlsx",
      },
      archive: [{ year: "2026", label: "Encuesta cumplimentada", url: null, status: "pending", note: "Pendiente de indicar el objeto y la ruta en Cloud Storage." }],
      pending: [
        "Confirmar responsables de Moxsi y Financiero para elaboración y validación.",
        "Definir cuentas contables, centros de coste y reglas de conciliación.",
        "Añadir la ruta de Cloud Storage de cada entrega anual.",
      ],
      sections: [
        {
          title: "Datos generales",
          metrics: [
            metric("Servicio", "Valor declarado", "Por entrega", [pending("Ficha contractual del servicio", "Nombre del servicio informado")], { pending: ["Confirmar denominación contractual."] }),
            metric("Modalidad del contrato", "Con CAPEX / sin CAPEX / gestión directa", "Vigencia del contrato", [linked("Pliegos y expedientes históricos", "#/juridico/fuente/inventario-11-pliegos-y-expedientes-historicos", "Condiciones del contrato", "proposed")], { pending: ["Confirmar expediente y modalidad aplicable a Moxsi."] }),
            metric("Inicio del contrato", "Año de inicio", "Vigencia del contrato", [linked("Pliegos y expedientes históricos", "#/juridico/fuente/inventario-11-pliegos-y-expedientes-historicos", "Fecha de formalización o inicio", "proposed")], { pending: ["Confirmar el hito contractual que debe utilizarse."] }),
            metric("Duración del contrato", "Años, sin incluir prórrogas", "Vigencia del contrato", [linked("Pliegos y expedientes históricos", "#/juridico/fuente/inventario-11-pliegos-y-expedientes-historicos", "Plazo contractual", "proposed")], { pending: ["Confirmar duración inicial y exclusión de prórrogas."] }),
          ],
        },
        {
          title: "Ingresos",
          note: "Todos los importes deben informarse sin IVA.",
          metrics: [
            metric("Ingresos por abonos", "Suma anual sin IVA de altas, renovaciones y cuotas periódicas", "Por ejercicio", [nextbike("Membresías y precio pagado", 8), navision("Ingreso contable conciliado")], { pending: ["Definir cuentas contables y tratamiento de devengos, devoluciones y descuentos."] }),
            metric("Ingresos por uso (viajes)", "Suma anual sin IVA de pago por uso y exceso de tiempo", "Por ejercicio", [nextbike("Alquileres con y sin vales", 9), nextbike("Alquileres con vales", 10), navision("Ingreso contable conciliado")], { pending: ["Confirmar dónde se obtiene el importe final y cómo se concilia con Navision."] }),
            metric("Otros ingresos de usuarios", "Suma de ingresos directos de utilización no incluidos en abonos o viajes", "Por ejercicio", [nextbike("Transacciones de clientes", 6), navision("Ingreso contable conciliado")], { pending: ["La consulta 6 está temporalmente desactivada; identificar alternativa y conceptos incluidos."] }),
            metric("Sponsorización del servicio", "Suma anual sin IVA de patrocinios", "Por ejercicio", [navision("Ingresos por patrocinio")], { pending: ["Identificar cuentas, contratos y centro de coste."] }),
            metric("Publicidad del servicio", "Suma anual sin IVA de publicidad", "Por ejercicio", [navision("Ingresos por publicidad")], { pending: ["Identificar cuentas, contratos y centro de coste."] }),
            metric("Subvenciones", "Importe imputado al ejercicio sin IVA", "Por ejercicio", [navision("Registro contable"), linked("Repositorio de proyectos (Drive)", "#/financiacion-externa/fuente/inventario-31-repositorio-de-proyectos-drive", "Expedientes y justificación de subvenciones", "proposed")], { pending: ["Definir criterio de imputación y subvenciones atribuibles al servicio."] }),
            metric("Otros ingresos atribuibles", "Suma de cualquier otro ingreso atribuible al sistema", "Por ejercicio", [navision("Ingresos del centro de coste")], { note: "La plantilla repite la etiqueta «Otros ingresos usuarios»; aquí se distingue como otros ingresos atribuibles.", pending: ["Especificar conceptos y validar la denominación con ATUC."] }),
          ],
        },
        {
          title: "OPEX",
          note: "Todos los importes deben informarse sin IVA.",
          metrics: [
            metric("Operador privado", "Coste anual sin IVA del operador privado", "Por ejercicio", [navision("Facturas y costes imputados"), linked("Pliegos y expedientes históricos", "#/juridico/fuente/inventario-11-pliegos-y-expedientes-historicos", "Condiciones económicas del contrato", "proposed")], { pending: ["Definir proveedor, cuentas y criterio de imputación."] }),
            metric("Operador público propio", "Coste anual sin IVA de gestión pública propia", "Por ejercicio", [navision("Costes internos imputados")], { pending: ["Definir costes directos, indirectos y reparto de personal."] }),
            metric("Dirección", "Coste anual sin IVA de dirección del servicio", "Por ejercicio", [navision("Costes imputados a dirección")], { pending: ["Definir puestos, porcentajes de dedicación y cuentas."] }),
            metric("Otros costes", "Resto de costes operativos atribuibles, detallados por concepto", "Por ejercicio", [navision("Costes del centro de coste")], { pending: ["Definir conceptos incluidos y evitar duplicidades con las partidas anteriores."] }),
          ],
        },
        {
          title: "CAPEX",
          note: "Todos los importes deben informarse sin IVA.",
          metrics: [
            metric("Inversión inicial en activos del servicio", "Inversión inicial activada y atribuible al servicio", "Por ejercicio", [navision("Altas de inmovilizado y proyectos de inversión"), linked("Pliegos y expedientes históricos", "#/juridico/fuente/inventario-11-pliegos-y-expedientes-historicos", "Inversión prevista contractualmente", "proposed")], { pending: ["Definir perímetro de activos y año de imputación."] }),
            metric("Reinversiones previstas", "Reinversiones incluidas en la cuota del operador o contratadas en paralelo", "Por ejercicio", [navision("Inversión contabilizada"), linked("Pliegos y expedientes históricos", "#/juridico/fuente/inventario-11-pliegos-y-expedientes-historicos", "Plan de reinversión contractual", "proposed")], { pending: ["Separar reinversión incluida en cuota de la contratada en paralelo."] }),
            metric("Otros CAPEX", "Otras inversiones atribuibles al servicio", "Por ejercicio", [navision("Altas de inmovilizado y proyectos")], { pending: ["Definir conceptos y criterio de atribución."] }),
          ],
        },
      ],
      confidentialityNote:
        "La plantilla indica que la información se solicita para un análisis confidencial del sector y no se divulgarán datos individuales sin autorización.",
    },
  ];
})();
