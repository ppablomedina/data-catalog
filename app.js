(() => {
  "use strict";
  const paths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    layers:
      '<path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    database:
      '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
    link: '<path d="m10 13 4-4m-6 6-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 14a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-1 1"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    bike: '<circle cx="5" cy="16" r="4"/><circle cx="19" cy="16" r="4"/><path d="m5 16 5-10 5 10H5m3-10h5m2-3h3l3 13"/>',
    scooter:
      '<circle cx="5" cy="18" r="2.25"/><circle cx="19" cy="18" r="2.25"/><path d="M5 18h8.2a3.5 3.5 0 0 0 3.4-2.7L18.8 6M16 6h5M8 15h7"/>',
    vehicle:
      '<path d="m5 7 2-4h10l2 4 2 3v8H3v-8l2-3Zm-2 3h18M5 18v3m14-3v3M6 14h2m8 0h2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    battery:
      '<rect x="2" y="6" width="18" height="12" rx="2"/><path d="M23 10v4M6 10v4m4-4v4m4-4v4"/>',
    tasks:
      '<rect x="5" y="4" width="15" height="18" rx="2"/><path d="M9 4V2h7v2m-7 7 1 1 2-2m2 1h3m-8 6 1 1 2-2m2 1h3"/>',
    chart: '<path d="M4 3v17h17M8 15v-4m5 4V7m5 8V4"/>',
    folder: '<path d="M3 7V4h7l3 3h8v13H3V7Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    external: '<path d="M14 3h7v7m0-7L10 14m0-10H3v17h17v-7"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sheet:
      '<path d="M6 2h9l5 5v15H6z"/><path d="M15 2v6h5M9 12h8M9 16h8M12 9v10"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z"/>',
  };
  const icon = (name) =>
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.folder}</svg>`;
  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const { departments, sources: catalogSources } = window.CATALOG;
  const sources = [...catalogSources, ...(window.DATA_INVENTORY || [])];
  const inventoryMeta = window.INVENTORY_META || {
    useCases: [],
    gaps: [],
    criteria: {},
  };
  const apiLibrary = window.API_LIBRARY || [];
  const documentLibrary = window.DOCUMENT_LIBRARY || [];
  const main = document.getElementById("main");
  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.getElementById("theme-color");
  const themeStorageKey = "atlas-theme";
  const sourceColumnsStorageKey = "atlas-source-columns";
  const savedSourceColumns = (() => {
    try {
      return Number(localStorage.getItem(sourceColumnsStorageKey));
    } catch (_) {
      return 0;
    }
  })();
  let query = "",
    filter = "all",
    tab = "overview";
  let facetFilters = {};
  let sourceColumns = [2, 3, 4].includes(savedSourceColumns)
    ? savedSourceColumns
    : 2;
  let route;
  const selectedTheme = () =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  function updateThemeControl() {
    const dark = selectedTheme() === "dark";
    const action = dark ? "Activar modo claro" : "Activar modo oscuro";
    themeToggle.setAttribute("aria-label", action);
    themeToggle.title = action;
    themeToggle.querySelector(".theme-toggle-icon").innerHTML = icon(
      dark ? "sun" : "moon",
    );
    themeToggle.querySelector(".theme-toggle-label").textContent = dark
      ? "Modo claro"
      : "Modo oscuro";
    themeColor.content = dark ? "#0c1922" : "#0B537F";
  }
  function setTheme(theme, persist = true) {
    document.documentElement.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem(themeStorageKey, theme);
      } catch (_) {}
    }
    updateThemeControl();
  }
  themeToggle.addEventListener("click", () => {
    setTheme(selectedTheme() === "dark" ? "light" : "dark");
  });
  const colorScheme = matchMedia("(prefers-color-scheme: dark)");
  colorScheme.addEventListener?.("change", (event) => {
    let hasSavedTheme = false;
    try {
      hasSavedTheme = ["light", "dark"].includes(
        localStorage.getItem(themeStorageKey),
      );
    } catch (_) {}
    if (!hasSavedTheme) setTheme(event.matches ? "dark" : "light", false);
  });
  updateThemeControl();
  document.querySelector(".area-label span").textContent = String(
    departments.length,
  ).padStart(2, "0");
  document.getElementById("overview-nav").href = "#/overview";
  document.querySelector(".brand").href = "#/overview";
  const sourceDepartments = (source) =>
    source.departmentIds || [source.departmentId];
  const belongsToDepartment = (source, departmentId) =>
    sourceDepartments(source).includes(departmentId);
  const normalizeText = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const areaStyle = (area) =>
    /^#[0-9a-f]{6}$/i.test(area.accent || "")
      ? ` style="--area-accent:${esc(area.accent)}"`
      : "";
  document
    .querySelectorAll("[data-icon]")
    .forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  document.getElementById("department-nav").innerHTML = departments
    .map(
      (d) =>
        `<a class="nav-item department" data-route="${esc(d.id)}" href="#/${esc(d.id)}"${areaStyle(d)}><span class="area-emoji" aria-hidden="true">${esc(d.emoji || "📁")}</span>${esc(d.name)}${d.services.length ? '<span class="nav-chevron">⌄</span>' : ""}</a>${d.services.length ? `<div class="service-nav">${d.services.map((s) => `<a href="#/${esc(d.id)}/${esc(s.id)}" data-route="${esc(s.id)}"><span class="service-dot ${esc(s.color)}"></span>${esc(s.name)}</a>`).join("")}</div>` : ""}`,
    )
    .join("");
  const facetConfigs = [
    { key: "access", label: "Formato / vía de acceso", emoji: "🔌" },
    { key: "frequency", label: "Frecuencia", emoji: "⏱️" },
    { key: "history", label: "Histórico", emoji: "🕘" },
    { key: "quality", label: "Calidad", emoji: "✨" },
    { key: "personalData", label: "Datos personales", emoji: "👤" },
    { key: "rgpdCategory", label: "Categoría RGPD", emoji: "🔐" },
    { key: "classification", label: "Clasificación", emoji: "🏷️" },
    { key: "criticality", label: "Criticidad", emoji: "⚠️" },
  ];
  function facetValue(source, key) {
    const governance = source.governance || {};
    const raw = String(governance[key] || "").trim();
    const value = normalizeText(raw);
    if (!raw) return "Sin documentar";
    if (key === "access") {
      if (value.includes("api") || value.includes("soap"))
        return "API / servicios web";
      if (value.includes("bbdd") || value.includes("base de datos"))
        return "Base de datos";
      if (/excel|csv|dbf|mpp/.test(value)) return "Excel / CSV / ficheros";
      if (/pdf|document|word|pliego|informe/.test(value))
        return "Documentos / PDF";
      if (/drive|repositorio|cloud/.test(value)) return "Repositorio / nube";
      if (/gmail|correo/.test(value)) return "Correo";
      if (/web|publica/.test(value)) return "Web pública";
      if (/aplicacion|plataforma|software/.test(value))
        return "Aplicación / plataforma";
      if (/consola|monitorizacion/.test(value))
        return "Consola / monitorización";
      if (/proveedor externo/.test(value)) return "Proveedor externo";
      return "Otros accesos";
    }
    if (key === "frequency") {
      if (value.includes("pendiente")) return "Por completar";
      if (/tiempo real|continua/.test(value)) return "Continua / tiempo real";
      if (/diaria|diario|1h/.test(value)) return "Diaria / intradía";
      if (/semanal|mensual|anual/.test(value)) return "Periódica";
      if (/por evento|por proyecto|por obra|por licitacion/.test(value))
        return "Por evento / proyecto";
      if (value.includes("variable")) return "Variable";
      return raw;
    }
    if (key === "history") {
      if (value.includes("pendiente")) return "Por completar";
      if (/^no\b|se puede empezar/.test(value)) return "No disponible";
      if (/max\.|meses|menos de|1 mes|ultimo mes/.test(value))
        return "Limitado";
      return "Disponible";
    }
    if (key === "quality") {
      if (value.includes("pendiente")) return "Por completar";
      if (/mala|baja/.test(value)) return "Baja";
      if (/media|variable|depende|error/.test(value)) return "Media / variable";
      if (/alta|buena|fuente original/.test(value)) return "Alta / buena";
      return raw;
    }
    if (key === "personalData") {
      if (value.includes("pendiente")) return "Por completar";
      if (/^no\b/.test(value)) return "No";
      if (/posible|depende/.test(value)) return "Posible / depende";
      if (/^si\b/.test(value)) return "Sí";
      return raw;
    }
    if (key === "rgpdCategory") {
      if (raw === "—") return "No aplica";
      if (value.includes("pendiente")) return "Por completar";
      if (/salud|especial/.test(value)) return "Salud / categoría especial";
      if (/laboral|econom|fiscal|financier/.test(value))
        return "Laborales / económicos";
      if (/identific|contacto|matricula|tecnico|indirecto/.test(value))
        return "Identificativos / indirectos";
      return raw;
    }
    if (key === "classification") {
      if (/especial/.test(value)) return "Especialmente protegido";
      if (value.includes("ens")) return "Confidencial / ENS";
      if (value.includes("confidencial")) return "Confidencial";
      if (value.includes("public")) return "Público";
      if (/interno|uso interno/.test(value)) return "Uso interno";
      return raw;
    }
    return raw;
  }
  function badge(s) {
    if (s.api.status === "available")
      return '<span class="badge available"><i></i>API disponible</span>';
    if (s.api.status === "direct")
      return '<span class="badge direct"><i></i>Acceso directo</span>';
    return '<span class="badge pending"><i></i>API por confirmar</span>';
  }
  function crumbs(d, service, source) {
    return `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<a href="#/${esc(d.id)}">${esc(d.name)}</a>${service ? `${icon("chevron")}<span>${esc(service.name)}</span>` : ""}${source ? `${icon("chevron")}<span>${esc(source.name)}</span>` : ""}</nav>`;
  }
  function sourceLogo(source, large = false) {
    const size = large ? " large" : "";
    if (source.logo && /^(assets\/|https:\/\/)/.test(source.logo)) {
      return `<span class="source-logo image-logo${size}"><img src="${esc(source.logo)}" alt="Logotipo de ${esc(source.name)}"><span class="logo-fallback" aria-hidden="true">${esc(source.initials)}</span></span>`;
    }
    if (source.logoIcon) {
      return `<span class="source-logo icon-logo ${esc(source.color)}${size}" aria-hidden="true">${icon(source.logoIcon)}</span>`;
    }
    return `<span class="source-logo ${esc(source.color)}${size}">${esc(source.initials)}</span>`;
  }
  function sourceCard(s, departmentId) {
    const preview = s.governance
      ? [
          ["access", "link"],
          ["frequency", "clock"],
        ]
          .map(
            ([key, iconName]) =>
              `<span>${icon(iconName)}${esc(facetValue(s, key))}</span>`,
          )
          .join("")
      : s.datasets
          .slice(0, 2)
          .map((x) => `<span>${icon(x.icon)}${esc(x.name)}</span>`)
          .join("");
    const remaining = s.governance ? 0 : s.datasets.length - 2;
    const completion = s.completeness
      ? `<span class="completion-mini ${s.completeness.percent === 100 ? "complete" : "review"}">${s.completeness.percent}% documentado</span>`
      : `<span>${s.datasets.length} ${esc(s.itemLabel || "conjuntos de datos")}</span>`;
    return `<a class="source-card" href="#/${esc(departmentId)}/fuente/${esc(s.id)}"><div class="source-card-top">${sourceLogo(s)}<span class="card-open">${icon("arrow")}</span></div><div class="source-name">${esc(s.name)}<span class="category">${esc(s.category)}</span></div><p>${esc(s.description)}</p><div class="data-labels">${preview}${remaining > 0 ? `<span>+${remaining} ${esc(s.itemLabel || "conjuntos")}</span>` : ""}</div><div class="source-card-bottom">${badge(s)}${completion}</div></a>`;
  }
  function listing(d, service) {
    const scoped = sources.filter(
      (s) =>
        belongsToDepartment(s, d.id) &&
        (!service || s.serviceIds.includes(service.id)),
    );
    const unassignedCount = sources.filter(
      (s) => belongsToDepartment(s, d.id) && !s.serviceIds.length,
    ).length;
    const personalCount = scoped.filter(
      (s) => facetValue(s, "personalData") === "Sí",
    ).length;
    const criticalCount = scoped.filter((s) =>
      ["Alta", "Muy alta"].includes(facetValue(s, "criticality")),
    ).length;
    const incompleteCount = scoped.filter(
      (s) => s.completeness && s.completeness.percent < 100,
    ).length;
    const relatedDocuments = documentLibrary.filter(
      (document) => document.areaId === d.id,
    );
    const filterMarkup = facetConfigs
      .map((config) => {
        const options = [
          ...new Set(scoped.map((s) => facetValue(s, config.key))),
        ].sort((a, b) => a.localeCompare(b, "es"));
        return `<label class="facet-filter"><span>${config.emoji} ${esc(config.label)}</span><select data-facet="${esc(config.key)}"><option value="">Todos</option>${options.map((option) => `<option value="${esc(option)}">${esc(option)}</option>`).join("")}</select></label>`;
      })
      .join("");
    main.innerHTML = `${crumbs(d, service)}<div class="page-heading"><div><div class="eyebrow">${service ? "SUBTIPO · " + esc(d.name.toUpperCase()) : "ÁREA · CATÁLOGO CORPORATIVO"}</div><h1>${service ? icon(service.icon) : `<span class="heading-emoji" aria-hidden="true">${esc(d.emoji || "📁")}</span>`}${esc(service ? service.name : d.name)}<span class="heading-dot">.</span></h1><p>${esc(service ? service.description : d.description)}</p></div><span class="department-chip">${service ? icon(service.icon) : `<span aria-hidden="true">${esc(d.emoji || "📁")}</span>`}${service ? "Subtipo" : "Área"}</span></div>
      <div class="stats"><div class="stat"><span class="stat-icon blue">${icon("database")}</span><div><strong>${scoped.length.toString().padStart(2, "0")}</strong><span>Fuentes de datos</span></div></div><div class="stat"><span class="stat-icon orange">${icon("info")}</span><div><strong>${personalCount.toString().padStart(2, "0")}</strong><span>Con datos personales</span></div></div><div class="stat"><span class="stat-icon yellow">${icon("clock")}</span><div><strong>${criticalCount.toString().padStart(2, "0")}</strong><span>Criticidad alta o muy alta</span></div></div><div class="stat"><span class="stat-icon green">${icon("tasks")}</span><div><strong>${incompleteCount.toString().padStart(2, "0")}</strong><span>Fichas por completar</span></div></div></div>
      ${!service && d.services.length ? `<section class="services-section"><div class="section-heading"><div><h2>Explora por subtipo</h2><p>Cada subtipo, su información en un mismo lugar.</p></div><span class="section-count">${d.services.length} subtipos</span></div><div class="services">${d.services.map((s) => `<a class="service-card ${esc(s.color)}" href="#/${esc(d.id)}/${esc(s.id)}"><span class="service-art">${icon(s.icon)}</span><div><h3>${esc(s.name)}</h3><p>${sources.filter((x) => belongsToDepartment(x, d.id) && x.serviceIds.includes(s.id)).length} fuentes asignadas</p></div><span class="service-arrow">${icon("arrow")}</span></a>`).join("")}</div></section>` : ""}
      ${!service && relatedDocuments.length ? `<section class="area-documents-section"><div class="section-heading"><div><h2>Informes y encuestas <span class="count-pill">${relatedDocuments.length}</span></h2><p>Documentos del área conectados con sus métricas y fuentes de datos.</p></div><a class="section-link" href="#/documents">Ver biblioteca ${icon("arrow")}</a></div><div class="area-document-grid">${relatedDocuments.map((document) => `<a href="#/documents/${esc(document.id)}" class="area-document-card"><span class="document-card-icon ${esc(document.color)}">${esc(document.icon)}</span><div><span class="eyebrow">${esc(document.organization)} · ${esc(document.type)}</span><h3>${esc(document.title)}</h3><p>${documentMetricCount(document)} métricas · ${esc(document.frequency)}</p></div><span class="card-open">${icon("arrow")}</span></a>`).join("")}</div></section>` : ""}
      <section class="sources-section"><div class="section-heading"><div><h2>${service ? "Fuentes del subtipo" : "Fuentes de datos"} <span class="count-pill">${scoped.length}</span></h2><p>${service ? "Información vinculada específicamente a este subtipo." : `Sistemas, ficheros e integraciones que forman parte de ${esc(d.name)}.`}</p></div><div class="source-view-options"><span>Columnas</span><div class="column-switcher" role="group" aria-label="Número de columnas de tarjetas">${[2, 3, 4].map((columns) => `<button type="button" data-columns="${columns}" aria-pressed="${sourceColumns === columns}" title="Mostrar ${columns} columnas"><span class="column-preview" aria-hidden="true">${Array.from({ length: columns }, () => "<i></i>").join("")}</span><b>${columns}</b></button>`).join("")}</div></div></div><div class="search-toolbar"><label class="search">${icon("search")}<input id="search" type="search" placeholder="Buscar fuente, dato o caso de uso…" aria-label="Buscar fuentes de datos" value="${esc(query)}"><kbd>/</kbd></label><label class="filter">${icon("code")}<select id="api-filter" aria-label="Filtrar por tipo de acceso"><option value="all">Todos los accesos</option><option value="available">API disponible</option><option value="direct">Acceso directo</option><option value="pending">Acceso por confirmar</option></select></label></div><details class="facet-panel" open><summary><span>${icon("layers")}Filtros de gobierno</span><small>Formato, frecuencia, calidad, sensibilidad y criticidad</small><strong id="active-filter-count">Sin filtros</strong></summary><div class="facet-grid">${filterMarkup}</div><button class="clear-facets" id="clear-facets" type="button">Limpiar filtros</button></details><div id="source-results" class="source-grid" data-columns="${sourceColumns}" aria-live="polite"></div><div class="results-footer"><span id="result-count"></span><span>${icon("info")}Inventario vivo</span></div></section>
      <div class="notice">${icon("info")}<div><strong>Un catálogo que crece contigo</strong><p>${service ? (scoped.length ? `Esta vista reúne las fuentes vinculadas a ${esc(service.name)}. Se añadirán más a medida que crezca el catálogo.` : `Todavía no hay fuentes asignadas a ${esc(service.name)}. Consulta el área para ver la información disponible.`) : d.services.length ? (unassignedCount ? `Algunas fuentes permanecen a nivel de ${esc(d.name)} hasta confirmar su relación con los subtipos.` : `Todas las fuentes registradas están vinculadas a los tres subtipos de ${esc(d.name)}.`) : `${scoped.length} ${scoped.length === 1 ? "fuente registrada" : "fuentes registradas"} en el área ${esc(d.name)}.`}</p></div>${service ? `<a href="#/${esc(d.id)}">Ver ${esc(d.name)} ${icon("arrow")}</a>` : '<a href="#/plan-ia">Ver mapa del Plan de IA</a>'}</div>`;
    const input = document.getElementById("search");
    const select = document.getElementById("api-filter");
    const sourceGrid = document.getElementById("source-results");
    const columnButtons = [
      ...document.querySelectorAll(".column-switcher [data-columns]"),
    ];
    const facetSelects = [...document.querySelectorAll("[data-facet]")];
    select.value = filter;
    facetSelects.forEach((facetSelect) => {
      facetSelect.value = facetFilters[facetSelect.dataset.facet] || "";
    });
    const update = () => {
      const activeFacets = Object.entries(facetFilters).filter(
        ([, value]) => value,
      );
      const results = scoped.filter(
        (s) =>
          (filter === "all" || s.api.status === filter) &&
          activeFacets.every(([key, value]) => facetValue(s, key) === value) &&
          normalizeText(
            [
              s.name,
              s.category,
              s.description,
              ...s.datasets.map((x) => x.name),
              ...Object.values(s.governance || {}),
            ].join(" "),
          ).includes(normalizeText(query.trim())),
      );
      document.getElementById("source-results").innerHTML = results.length
        ? results.map((source) => sourceCard(source, d.id)).join("")
        : `<div class="empty">${icon("search")}<h3>${scoped.length ? "No hay resultados" : "Aún no hay fuentes asignadas"}</h3><p>${scoped.length ? "Prueba con otra búsqueda o cambia el filtro." : "Las fuentes se mostrarán aquí cuando se confirme su relación con este servicio."}</p>${scoped.length ? '<button id="clear-search" class="text-button">Limpiar búsqueda y filtros</button>' : `<a href="#/${esc(d.id)}" class="text-button">Explorar las fuentes de ${esc(d.name)} ${icon("arrow")}</a>`}</div>`;
      document.getElementById("result-count").textContent =
        `${results.length} de ${scoped.length} fuentes`;
      document.getElementById("active-filter-count").textContent =
        activeFacets.length
          ? `${activeFacets.length} ${activeFacets.length === 1 ? "filtro activo" : "filtros activos"}`
          : "Sin filtros";
      document.getElementById("clear-search")?.addEventListener("click", () => {
        query = "";
        filter = "all";
        facetFilters = {};
        input.value = "";
        select.value = "all";
        facetSelects.forEach((facetSelect) => (facetSelect.value = ""));
        update();
      });
    };
    input.addEventListener("input", () => {
      query = input.value;
      update();
    });
    select.addEventListener("change", () => {
      filter = select.value;
      update();
    });
    columnButtons.forEach((button) => {
      button.addEventListener("click", () => {
        sourceColumns = Number(button.dataset.columns);
        sourceGrid.dataset.columns = String(sourceColumns);
        columnButtons.forEach((option) =>
          option.setAttribute("aria-pressed", String(option === button)),
        );
        try {
          localStorage.setItem(sourceColumnsStorageKey, String(sourceColumns));
        } catch (_) {}
      });
    });
    facetSelects.forEach((facetSelect) => {
      facetSelect.addEventListener("change", () => {
        facetFilters[facetSelect.dataset.facet] = facetSelect.value;
        update();
      });
    });
    document.getElementById("clear-facets").addEventListener("click", () => {
      facetFilters = {};
      facetSelects.forEach((facetSelect) => (facetSelect.value = ""));
      update();
    });
    update();
  }
  function accessItem(label, url, note, ico) {
    // Only explicitly configured HTTPS/HTTP links become clickable.
    const safe = url && /^https?:\/\//i.test(url);
    return `<div class="access-row"><span class="access-icon">${icon(ico)}</span><div><h3>${esc(label)}</h3><p>${esc(note)}</p></div>${safe ? `<a class="access-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Abrir ${icon("external")}</a>` : '<span class="badge neutral">Enlace pendiente</span>'}</div>`;
  }
  function querySampleCell(value, column, guide) {
    if (value === null || value === undefined || value === "") {
      return '<span class="sample-null">NULL</span>';
    }
    let renderedValue;
    if (column.key === "active") {
      renderedValue = `<span class="active-value ${value === 1 ? "enabled" : "disabled"}">${esc(value)}</span>`;
    } else if (column.key === "channel") {
      const channelName = guide.channelMap[value] || "Otros";
      renderedValue = `<span class="channel-value"><strong>${esc(value)}</strong><small>${esc(channelName)}</small></span>`;
    } else if (
      ["registrationDate", "uid", "customerId", "membershipId"].includes(
        column.key,
      )
    ) {
      renderedValue = `<code>${esc(value)}</code>`;
    } else {
      renderedValue = esc(value);
    }
    return `<span class="sample-cell-value">${renderedValue}</span>`;
  }
  function displayedFrequentValues(guide, columnKey) {
    const hiddenColumns = ["uid", "registrationDate", "lastName", "firstName"];
    return hiddenColumns.includes(columnKey)
      ? []
      : guide.frequentValues?.[columnKey] || [];
  }
  function formatFieldReferences(value, guide) {
    let output = esc(value);
    const fields = [
      ...new Set(guide.columns.flatMap((column) => [column.label, column.key])),
    ].sort((a, b) => b.length - a.length);
    fields.forEach((field) => {
      const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matcher = new RegExp(
        `(?<![A-Za-z0-9_])(${escapedField})(?![A-Za-z0-9_])`,
        "gi",
      );
      output = output.replace(
        matcher,
        '<strong class="field-reference">$1</strong>',
      );
    });
    return output;
  }
  function renderMembershipQueryGuide(guide, expanded = false) {
    const estimatedPercentage = (value) => {
      const percentage = Number(value);
      return percentage > 0 && percentage < 1
        ? "<1%"
        : `≈${Math.round(percentage)}%`;
    };
    const frequentCounts = (column) => {
      const values = guide.frequentValues?.[column.key] || [];
      return values.length
        ? `<div class="frequent-values membership-frequencies"><em>Valores más repetidos · estimación</em><div>${values.map((item) => `<span><b>${esc(item.value)}</b><small>${esc(estimatedPercentage(item.share))}</small></span>`).join("")}</div></div>`
        : '<div class="frequent-values-empty">Sin distribución de valores facilitada</div>';
    };
    const membershipCutoff = "2025-12-31";
    const availableMembershipTotal = guide.membershipCatalog
      .filter((membership) => membership.date >= membershipCutoff)
      .reduce((total, membership) => total + membership.count, 0);
    const sortedMembershipCatalog = [...guide.membershipCatalog].sort((a, b) =>
      a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
    );
    const formatCount = (value) =>
      new Intl.NumberFormat("es-ES").format(Number(value));
    const sampleTable = `<div class="sample-table-wrap membership-sample-table"><table class="sample-data-table"><thead><tr>${guide.columns.map((column) => `<th>${esc(column.label)}</th>`).join("")}</tr></thead><tbody>${guide.sampleRows.map((row) => `<tr>${guide.columns.map((column) => `<td>${querySampleCell(row[column.key], column, guide)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    return `<details class="query-guide membership-query-guide"${expanded ? " open" : ""}><summary><span class="query-guide-icon">${icon("database")}</span><span><strong>Ejemplo de datos y perfil de membresías</strong><small>Parámetros, 10 registros sintéticos, valores frecuentes y campos pendientes de interpretar</small></span><span class="badge available"><i></i>Documentado</span><span class="endpoint-chevron">⌄</span></summary><div class="query-guide-body"><details class="query-guide-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>01</span><div><h3>Parámetros de entrada</h3><p>La consulta delimita el periodo mediante fecha y hora.</p></div></div><span class="section-chevron">⌄</span></summary><div class="query-input-grid">${guide.inputs.map((input) => `<div><span>${icon("clock")}</span><strong>${esc(input.name)}</strong><p>${esc(input.description)}</p></div>`).join("")}</div></details><details class="query-guide-section pending-interpretation-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>02</span><div><h3>Cómo interpretar ${formatFieldReferences("is deleted", guide)} y ${formatFieldReferences("status", guide)}</h3><p>La distribución está documentada; su significado funcional debe validarse.</p></div></div><span class="badge pending"><i></i>Pendiente</span><span class="section-chevron">⌄</span></summary><div class="interpretation-pending-grid">${guide.interpretationPending.map((item) => `<article><div><strong>${formatFieldReferences(item.field, guide)}</strong><span class="badge pending"><i></i>Por confirmar</span></div><code>${esc(item.values)}</code><p>${formatFieldReferences(item.description, guide)}</p></article>`).join("")}</div></details><details class="query-guide-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>03</span><div><h3>Vista de ejemplo</h3><p>Consulta simulada desde ${esc(guide.samplePeriod.from)} hasta ${esc(guide.samplePeriod.to)}.</p></div></div><span class="section-chevron">⌄</span></summary><div class="sample-disclaimer">${icon("info")}<div><strong>Muestra sintética, no clientes reales</strong><p>Los registros combinan de forma ficticia los valores frecuentes suministrados y únicamente representan la estructura de la consulta.</p></div></div>${sampleTable}<p class="table-scroll-hint">Desplázate horizontalmente para consultar todas las columnas.</p></details><details class="query-guide-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>04</span><div><h3>Catálogo de ${formatFieldReferences("membership_name", guide)}</h3><p>Abonos disponibles y modalidades descatalogadas, ordenados alfabéticamente.</p></div></div><strong class="query-section-count">${sortedMembershipCatalog.length} valores</strong><span class="section-chevron">⌄</span></summary><div class="membership-catalog-list">${sortedMembershipCatalog.map((membership) => { const available = membership.date >= membershipCutoff; const availableShare = (membership.count / availableMembershipTotal) * 100; return `<article class="${available ? "available" : "retired"}"><div><strong>${esc(membership.name)}</strong><small>Última fecha: ${esc(membership.date)}</small></div><div><span class="membership-status">${available ? "Disponible" : "Descatalogado"}</span><b>${available ? `${esc(estimatedPercentage(availableShare))} de los abonos disponibles` : `${formatCount(membership.count)} compras`}</b></div></article>`; }).join("")}</div></details><details class="column-dictionary"><summary><span>${icon("layers")}Diccionario, tipos y nulos</span><strong>${guide.columns.length} columnas</strong></summary><div class="estimate-note">${icon("info")}Los porcentajes de nulos y de valores frecuentes son estimaciones y se muestran redondeados a la unidad.</div><div class="column-profile-grid membership-column-grid">${guide.columns.map((column) => `<article><div><strong>${esc(column.label)}</strong><span>≈${Math.round(Number(column.nullRate))}% nulos</span></div><div class="column-data-type"><code>${esc(column.dataType)}</code></div><p>${formatFieldReferences(column.note, guide)}</p><div class="coverage-track" title="≈${Math.round(100 - column.nullRate)}% con dato"><i style="width:${100 - column.nullRate}%"></i></div>${frequentCounts(column)}</article>`).join("")}</div></details></div></details>`;
  }
  function renderQueryGuide(guide, expanded = false) {
    if (guide.kind === "memberships") {
      return renderMembershipQueryGuide(guide, expanded);
    }
    const roundedPercentage = (value) => Math.round(Number(value));
    const frequentValues = (column) => {
      const values = displayedFrequentValues(guide, column.key);
      return values.length
        ? `<div class="frequent-values"><em>Valores frecuentes · estimación</em><div>${values.map((item) => `<span><b>${esc(item.value)}</b><small>≈${roundedPercentage(item.share)}%</small></span>`).join("")}</div></div>`
        : "";
    };
    return `<details class="query-guide"${expanded ? " open" : ""}><summary><span class="query-guide-icon">${icon("database")}</span><span><strong>Ejemplo de datos y reglas de uso</strong><small>Parámetros, cálculo de usuarios activos, 10 registros sintéticos y calidad de columnas</small></span><span class="badge available"><i></i>Documentado</span><span class="endpoint-chevron">⌄</span></summary><div class="query-guide-body"><details class="query-guide-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>01</span><div><h3>Parámetros de entrada</h3><p>La consulta filtra por la fecha en que se registró cada cuenta.</p></div></div><span class="section-chevron">⌄</span></summary><div class="query-input-grid">${guide.inputs.map((input) => `<div><span>${icon("clock")}</span><strong>${esc(input.name)}</strong><p>${esc(input.description)}</p></div>`).join("")}</div></details><details class="query-guide-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>02</span><div><h3>Cómo interpretar ${formatFieldReferences("active", guide)}</h3><p>Regla utilizada actualmente para el seguimiento de usuarios.</p></div></div><span class="section-chevron">⌄</span></summary><div class="active-rule-grid"><article><span class="active-value enabled">1</span><div><strong>Cuenta activada</strong><p>Tiene un método de usuario activado.</p></div></article><article><span class="active-value disabled">0</span><div><strong>Cuenta no activada</strong><p>No tiene un método de usuario activado.</p></div></article></div><div class="calculation-callout"><div><span class="eyebrow">TOTAL DE USUARIOS ACTIVOS EN UNA FECHA</span><strong>06/03/2018 → fecha de evaluación</strong><p>${formatFieldReferences(guide.currentUsersRule, guide)}</p></div><code>contar(${formatFieldReferences("active", guide)} = 1)</code></div><p class="rule-note">${icon("info")}<span>${formatFieldReferences(`${guide.activeRule} ${guide.activeCaveat}`, guide)}</span></p>${guide.retentionRule ? `<div class="query-retention-warning">${icon("clock")}<div><strong>Conservar cada extracción</strong><p>${formatFieldReferences(guide.retentionRule, guide)}</p></div></div>` : ""}<div class="active-timeline">${guide.activeExample.map((step) => `<div><span>${esc(step.date)}</span><p>${formatFieldReferences(step.text, guide)}</p></div>`).join("")}</div></details><details class="query-guide-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>03</span><div><h3>Vista de ejemplo</h3><p>Consulta simulada desde ${esc(guide.samplePeriod.from)} hasta ${esc(guide.samplePeriod.to)}.</p></div></div><span class="section-chevron">⌄</span></summary><div class="sample-disclaimer">${icon("info")}<div><strong>Muestra sintética, no clientes reales</strong><p>La muestra combina de forma ficticia los valores frecuentes suministrados y datos de ejemplo. Cada fila se ha construido para representar la estructura y distribución aproximada; no corresponde a un cliente real.</p></div></div><div class="sample-table-wrap"><table class="sample-data-table"><thead><tr>${guide.columns.map((column) => `<th>${esc(column.label)}</th>`).join("")}</tr></thead><tbody>${guide.sampleRows.map((row) => `<tr>${guide.columns.map((column) => `<td>${querySampleCell(row[column.key], column, guide)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="table-scroll-hint">Desplázate horizontalmente para consultar todas las columnas.</p></details><details class="query-guide-section"><summary class="query-guide-section-summary"><div class="query-guide-heading"><span>04</span><div><h3>Canales de alta</h3><p>Traducción operativa del campo ${formatFieldReferences("channel", guide)}.</p></div></div><span class="section-chevron">⌄</span></summary><div class="channel-map">${Object.entries(
      guide.channelMap,
    )
      .map(
        ([code, name]) =>
          `<span><strong>${esc(code)}</strong>${esc(name)}</span>`,
      )
      .join(
        "",
      )}<span><strong>Resto</strong>Otros</span></div></details><details class="column-dictionary"><summary><span>${icon("layers")}Diccionario y estimación de nulos</span><strong>${guide.columns.length} columnas</strong></summary><div class="estimate-note">${icon("info")}Los porcentajes de nulos y de valores frecuentes son estimaciones y se muestran redondeados a la unidad.</div><div class="column-profile-grid">${guide.columns.map((column) => `<article><div><strong>${esc(column.label)}</strong><span>≈${roundedPercentage(column.nullRate)}% nulos</span></div><p>${formatFieldReferences(column.note, guide)}</p><div class="coverage-track" title="≈${roundedPercentage(100 - column.nullRate)}% con dato"><i style="width:${100 - column.nullRate}%"></i></div>${frequentValues(column)}</article>`).join("")}</div></details><div class="future-improvement"><span>💡</span><div><strong>Línea futura de mejora</strong><p>${formatFieldReferences(guide.futureImprovement, guide)}</p></div></div></div></details>`;
  }
  function renderQueryDocumentation(d, s, dataset) {
    const queryLabel = `Consulta ${dataset.queryNumber}`;
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<a href="#/${esc(d.id)}">${esc(d.name)}</a>${icon("chevron")}<a href="#/${esc(d.id)}/fuente/${esc(s.id)}/consultas">${esc(s.name)}</a>${icon("chevron")}<span>${esc(queryLabel)}</span></nav><a class="back-link" href="#/${esc(d.id)}/fuente/${esc(s.id)}/consultas">← Volver a consultas disponibles</a><div class="page-heading query-documentation-heading"><div><div class="eyebrow">${esc(s.name.toUpperCase())} · ${esc(queryLabel.toUpperCase())}</div><h1>${esc(dataset.name)}<span class="heading-dot">.</span></h1><p>${formatFieldReferences(dataset.description, dataset.queryGuide)}</p></div><a class="access-link" href="${esc(dataset.url)}" target="_blank" rel="noopener noreferrer">Abrir consulta ${icon("external")}</a></div><section class="query-documentation-page">${renderQueryGuide(dataset.queryGuide, true)}</section>`;
  }
  function detail(d, s) {
    const applicableServices = s.serviceIds
      .map((id) => d.services.find((service) => service.id === id))
      .filter(Boolean);
    const applicableAreas = sourceDepartments(s)
      .map((id) => departments.find((area) => area.id === id)?.name)
      .filter(Boolean);
    const detailTabs = [
      ["overview", "Información general"],
      ["data", s.contentTitle || "Conjuntos de datos"],
      ["access", "API y accesos"],
      ...(s.governance ? [["governance", "Gobierno y calidad"]] : []),
      ["responsibilities", "Responsabilidades"],
    ];
    main.innerHTML = `${crumbs(d, null, s)}<a class="back-link" href="#/${esc(d.id)}">← Volver a las fuentes</a><div class="detail-heading">${sourceLogo(s, true)}<div><div class="eyebrow">FUENTE DE DATOS · ${esc(d.name.toUpperCase())}</div><h1>${esc(s.name)}<span class="heading-dot">.</span></h1><p>${esc(s.description)}</p></div>${badge(s)}</div><div class="tabs" role="tablist" aria-label="Información de la fuente">${detailTabs
      .map(
        ([id, label]) =>
          `<button role="tab" id="tab-${id}" aria-controls="detail-panel" aria-selected="${tab === id}" tabindex="${tab === id ? "0" : "-1"}" data-tab="${id}">${label}${id === "data" ? `<span>${s.datasets.length}</span>` : id === "responsibilities" && s.responsibilityHistory?.length ? `<span>${s.responsibilityHistory.length}</span>` : ""}</button>`,
      )
      .join(
        "",
      )}</div><div id="detail-panel" role="tabpanel" tabindex="0"></div>`;
    function panel() {
      document.querySelectorAll("[data-tab]").forEach((btn) => {
        btn.setAttribute("aria-selected", String(btn.dataset.tab === tab));
        btn.tabIndex = btn.dataset.tab === tab ? 0 : -1;
      });
      const el = document.getElementById("detail-panel");
      el.setAttribute("aria-labelledby", `tab-${tab}`);
      if (tab === "overview") {
        const completion = s.completeness
          ? `<div class="completion-block"><div><strong>${s.completeness.percent}%</strong><span>${s.completeness.filled} de ${s.completeness.total} campos documentados</span></div><div class="completion-track"><i style="width:${s.completeness.percent}%"></i></div></div>`
          : "";
        el.innerHTML = `<div class="detail-columns"><section class="panel"><h2>Acerca de esta fuente</h2><p>${esc(s.description)}</p><dl><div><dt>${applicableAreas.length === 1 ? "Área" : "Áreas"}</dt><dd>${esc(applicableAreas.join(", ") || d.name)}</dd></div><div><dt>${d.services.length ? "Subtipos" : "Alcance"}</dt><dd>${applicableServices.length ? esc(applicableServices.map((service) => service.name).join(", ")) : "Toda el área"}</dd></div><div><dt>Tipo de información</dt><dd>${esc(s.category)}</dd></div><div><dt>Responsable</dt><dd>${esc(s.owner || "Por documentar")}</dd></div><div><dt>Tipo de acceso</dt><dd>${badge(s)}</dd></div></dl></section><section class="panel pending-panel"><span class="stat-icon yellow">${icon("tasks")}</span><h2>Por completar</h2><p>Campos y validaciones necesarios para dejar la ficha completa.</p>${completion}<ul>${s.pending.map((p) => `<li>${icon("clock")}<span>${esc(p)}</span></li>`).join("")}</ul><div class="small-note">La información pendiente no implica que el recurso no exista.</div></section></div>`;
      }
      if (tab === "data")
        el.innerHTML = `<section class="panel"><h2>${esc(s.contentTitle || "Conjuntos de datos")}</h2><p>${esc(s.contentDescription || "Información identificada en esta fuente. El esquema, formato y frecuencia de actualización están pendientes de documentar.")}</p>${s.datasets
          .map((x) => {
            const safeUrl = x.url && /^https?:\/\//i.test(x.url);
            const queryHref = x.queryGuide
              ? `#/${esc(d.id)}/fuente/${esc(s.id)}/consulta/${esc(x.queryNumber)}`
              : null;
            return `<div class="dataset-row"><span class="stat-icon blue">${icon(x.icon)}</span><div>${queryHref ? `<a class="dataset-detail-link" href="${queryHref}"><span class="query-number">Consulta ${esc(x.queryNumber)}</span><h3>${esc(x.name)}</h3></a>` : `${x.queryNumber ? `<span class="query-number">Consulta ${esc(x.queryNumber)}</span>` : ""}<h3>${esc(x.name)}</h3>`}<p>${x.queryGuide ? formatFieldReferences(x.description, x.queryGuide) : esc(x.description)}</p></div><div class="dataset-actions">${x.status ? `<span class="badge pending"><i></i>${esc(x.status)}</span>` : ""}${queryHref ? `<a class="access-link" href="${queryHref}">Ver detalles ${icon("arrow")}</a>` : ""}${safeUrl ? `<a class="access-link" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.linkLabel || "Abrir consulta")} ${icon("external")}</a>` : s.apiLibraryId ? `<a class="access-link" href="#/apis/${esc(s.apiLibraryId)}">Ver documentación ${icon("arrow")}</a>` : '<span class="badge neutral">Esquema pendiente</span>'}</div></div>`;
          })
          .join("")}</section>`;
      if (tab === "access") {
        if (s.governance) {
          el.innerHTML = `<section class="panel"><h2>Formato y vía de acceso</h2><p>Canal de acceso identificado durante las entrevistas por área.</p><div class="access-row"><span class="access-icon">${icon("link")}</span><div><h3>${esc(facetValue(s, "access"))}</h3><p>${esc(s.governance.access || "Por completar")}</p></div><span class="badge ${s.governance.access ? "direct" : "pending"}"><i></i>${s.governance.access ? "Inventariado" : "Por completar"}</span></div><div class="access-row"><span class="access-icon">${icon("tasks")}</span><div><h3>Validación pendiente</h3><p>${esc(s.governance.blocker || "Confirmar si existen bloqueos o tareas pendientes.")}</p></div></div></section><div class="notice">${icon("info")}<div><strong>Acceso seguro</strong><p>Antes de conectar la fuente, confirma permisos, trazabilidad, retención y protección de datos. No guardes credenciales en el catálogo.</p></div></div>`;
        } else {
          el.innerHTML = `<section class="panel"><h2>API y puntos de acceso</h2><p>Accesos directos a la documentación, repositorios y ubicación de los datos.</p>${s.apiLibraryId ? `<div class="access-row"><span class="access-icon">${icon("code")}</span><div><h3>Documentación técnica</h3><p>Esquemas, campos, convenciones y documento original de la API.</p></div><a class="access-link" href="#/apis/${esc(s.apiLibraryId)}">Abrir biblioteca ${icon("arrow")}</a></div>` : ""}${s.api.status === "direct" ? "" : accessItem("API", s.api.url, s.api.note, "code")}${accessItem(s.accessLabel || "Portal del proveedor", s.website, s.websiteNote || "Dirección del portal pendiente de documentar.", "external")}${accessItem("Repositorio", s.repository, "Repositorio y permisos pendientes de documentar.", "folder")}${accessItem("Ubicación de los datos", s.storage, "Almacenamiento y condiciones de acceso pendientes de documentar.", "database")}</section><div class="notice">${icon("info")}<div><strong>Acceso seguro</strong><p>Documenta el procedimiento para solicitar permisos. No guardes contraseñas, tokens ni claves en el catálogo.</p></div></div>`;
        }
      }
      if (tab === "governance" && s.governance) {
        const governance = s.governance;
        const fields = [
          ["ID del inventario", governance.inventoryId],
          ["Área propietaria", governance.ownerArea],
          ["Frecuencia", governance.frequency],
          ["Histórico", governance.history],
          ["Calidad", governance.quality],
          ["Datos personales", governance.personalData],
          ["Categoría RGPD", governance.rgpdCategory],
          ["Clasificación", governance.classification],
          ["Criticidad", governance.criticality],
        ];
        const governanceValue = (value) =>
          value && !normalizeText(value).includes("(pendiente)")
            ? esc(value)
            : '<span class="field-pending">Por completar</span>';
        const criticality = governance.criticality || "Por completar";
        el.innerHTML = `<section class="panel governance-panel"><div class="governance-heading"><div><span class="eyebrow">REGISTRO ${esc(governance.inventoryId)}</span><h2>Gobierno, calidad y sensibilidad</h2><p>Información extraída del inventario de fuentes para los casos de uso priorizados.</p></div><span class="criticality-badge ${esc(normalizeText(criticality).replaceAll(" ", "-"))}">${esc(criticality)}</span></div><div class="governance-grid">${fields.map(([label, value]) => `<div class="governance-field"><span>${esc(label)}</span><strong>${governanceValue(value)}</strong></div>`).join("")}<div class="governance-field wide"><span>Datos que aporta</span><strong>${governanceValue(governance.data)}</strong></div><div class="governance-field wide"><span>Casos de uso que alimenta</span><strong>${governanceValue(governance.useCases)}</strong></div><div class="governance-field wide"><span>Formato y vía de acceso</span><strong>${governanceValue(governance.access)}</strong></div><div class="governance-field wide blocker"><span>Bloqueos y pendientes</span><strong>${governanceValue(governance.blocker)}</strong></div></div></section>`;
      }
      if (tab === "responsibilities") {
        const history = s.responsibilityHistory || [];
        el.innerHTML = `<section class="panel"><h2>Histórico de responsabilidades</h2><p>Personas o equipos responsables de mantener esta fuente. Las fechas pendientes se completarán cuando estén confirmadas.</p>${
          history.length
            ? `<div class="responsibility-list">${history
                .map((entry) => {
                  const statusLabel =
                    entry.status === "current"
                      ? "Responsabilidad actual"
                      : entry.status === "planned"
                        ? "Traspaso previsto"
                        : "Responsabilidad finalizada";
                  const periodStart = entry.from || "Inicio pendiente";
                  const periodEnd =
                    entry.to ||
                    (entry.status === "current"
                      ? "Actualidad"
                      : entry.status === "planned"
                        ? "Inicio pendiente"
                        : "Fin pendiente");
                  const period =
                    entry.status === "planned" && !entry.from
                      ? "Fecha de inicio pendiente"
                      : `${periodStart} → ${periodEnd}`;
                  return `<article class="responsibility-item"><span class="responsibility-marker ${esc(entry.status || "ended")}"></span><div class="responsibility-content"><div class="responsibility-top"><div><span class="responsibility-status ${esc(entry.status || "ended")}">${esc(statusLabel)}</span><h3>${esc(entry.role)}</h3></div><span class="responsibility-period">${icon("clock")}${esc(period)}</span></div>${entry.note ? `<p>${esc(entry.note)}</p>` : ""}</div></article>`;
                })
                .join("")}</div>`
            : '<div class="empty responsibility-empty"><h3>Histórico pendiente</h3><p>Aún no se han documentado responsables para esta fuente.</p></div>'
        }</section>`;
      }
    }
    document.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        tab = btn.dataset.tab;
        panel();
      });
      btn.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        const tabs = [...document.querySelectorAll("[data-tab]")];
        const index =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : (tabs.indexOf(btn) +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  tabs.length) %
                tabs.length;
        tabs[index].click();
        tabs[index].focus();
      });
    });
    panel();
  }
  function apiLogo(api, large = false) {
    return sourceLogo(
      {
        name: api.name,
        logo: api.logo,
        initials: api.provider?.slice(0, 1) || "API",
        color: "blue",
      },
      large,
    );
  }
  function apiEndpointCount(api) {
    return api.groups.reduce(
      (total, group) => total + group.endpoints.length,
      0,
    );
  }
  function renderOverview() {
    const endpointCount = apiLibrary.reduce(
      (total, api) => total + apiEndpointCount(api),
      0,
    );
    const documentMetricCount = documentLibrary.reduce(
      (total, document) =>
        total + document.sections.reduce((sum, section) => sum + section.metrics.length, 0),
      0,
    );
    document.querySelectorAll("[data-route]").forEach((el) => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });
    document.getElementById("api-nav").classList.remove("active");
    document.getElementById("api-nav").removeAttribute("aria-current");
    document.getElementById("inventory-nav").classList.remove("active");
    document.getElementById("inventory-nav").removeAttribute("aria-current");
    document.getElementById("document-nav").classList.remove("active");
    document.getElementById("document-nav").removeAttribute("aria-current");
    document.getElementById("overview-nav").classList.add("active");
    document
      .getElementById("overview-nav")
      .setAttribute("aria-current", "page");
    document.title = "Vista general · Atlas";
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><span>Catálogo</span>${icon("chevron")}<span>Vista general</span></nav>
      <div class="page-heading overview-heading"><div><div class="eyebrow">DIRECTORIO CORPORATIVO</div><h1>Explora el catálogo<span class="heading-dot">.</span></h1><p>Accede a fuentes de datos, APIs, informes, encuestas, estudios y documentación corporativa.</p></div><span class="department-chip">${icon("grid")}Vista general</span></div>
      <div class="stats overview-stats"><div class="stat"><span class="stat-icon blue">${icon("layers")}</span><div><strong>${String(departments.length).padStart(2, "0")}</strong><span>Áreas</span></div></div><div class="stat"><span class="stat-icon green">${icon("database")}</span><div><strong>${String(sources.length).padStart(2, "0")}</strong><span>Fuentes registradas</span></div></div><div class="stat"><span class="stat-icon orange">${icon("tasks")}</span><div><strong>${String(inventoryMeta.useCases.length).padStart(2, "0")}</strong><span>Casos de uso priorizados</span></div></div><div class="stat"><span class="stat-icon yellow">${icon("link")}</span><div><strong>${String(endpointCount).padStart(2, "0")}</strong><span>Endpoints definidos</span></div></div></div>
      <section class="directory-section"><div class="section-heading"><div><h2>Áreas <span class="count-pill">${departments.length}</span></h2><p>Selecciona un área para consultar sus fuentes, filtros de gobierno y accesos.</p></div><span class="section-kicker">EXPLORAR POR ÁREA</span></div><div class="directory-grid">${departments
        .map((department) => {
          const departmentSources = sources.filter((source) =>
            belongsToDepartment(source, department.id),
          );
          return `<a class="directory-card" href="#/${esc(department.id)}"${areaStyle(department)}><div class="directory-card-head"><span class="directory-icon"><span aria-hidden="true">${esc(department.emoji || "📁")}</span></span><span class="card-open">${icon("arrow")}</span></div><div><span class="eyebrow">ÁREA</span><h2>${esc(department.name)}</h2><p>${esc(department.description)}</p></div><div class="directory-card-meta"><span>${icon("database")}${departmentSources.length} ${departmentSources.length === 1 ? "fuente" : "fuentes"}</span>${department.services.length ? `<span>${icon("layers")}${department.services.length} ${department.services.length === 1 ? "subtipo" : "subtipos"}</span>` : ""}<strong>Entrar ${icon("arrow")}</strong></div></a>`;
        })
        .join("")}</div></section>
      <section class="api-access-section"><div class="section-heading"><div><h2>Recursos transversales</h2><p>Documentación técnica, entregables corporativos, casos de uso y criterios del inventario.</p></div></div><div class="overview-access-grid"><a class="library-access-card" href="#/apis"><span class="library-access-icon">${icon("code")}</span><div><span class="eyebrow">BIBLIOTECA DE APIs</span><h2>Consulta todas las APIs</h2><p>${apiLibrary.length} ${apiLibrary.length === 1 ? "API documentada" : "APIs documentadas"} · ${endpointCount} endpoints definidos</p></div><span class="library-access-action">Abrir ${icon("arrow")}</span></a><a class="library-access-card document-access-card" href="#/documents"><span class="library-access-icon">${icon("folder")}</span><div><span class="eyebrow">INFORMES Y ENCUESTAS</span><h2>Biblioteca documental</h2><p>${documentLibrary.length} documentos · ${documentMetricCount} métricas trazadas</p></div><span class="library-access-action">Explorar ${icon("arrow")}</span></a><a class="library-access-card plan-access-card" href="#/plan-ia"><span class="library-access-icon">🎯</span><div><span class="eyebrow">PLAN DE IMPLANTACIÓN DE IA</span><h2>Mapa de datos mínimos viables</h2><p>${inventoryMeta.useCases.length} casos de uso · ${inventoryMeta.gaps.length} gaps y peticiones</p></div><span class="library-access-action">Explorar ${icon("arrow")}</span></a></div></section>`;
  }
  function renderInventoryPlan() {
    const inventorySources = window.DATA_INVENTORY || [];
    const completionAverage = inventorySources.length
      ? Math.round(
          inventorySources.reduce(
            (total, source) => total + source.completeness.percent,
            0,
          ) / inventorySources.length,
        )
      : 0;
    document.querySelectorAll("[data-route]").forEach((el) => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });
    ["overview-nav", "api-nav", "document-nav"].forEach((id) => {
      document.getElementById(id).classList.remove("active");
      document.getElementById(id).removeAttribute("aria-current");
    });
    document.getElementById("inventory-nav").classList.add("active");
    document
      .getElementById("inventory-nav")
      .setAttribute("aria-current", "page");
    document.title = "Plan de IA · Atlas";
    const criteriaGroups = [
      [
        "Semáforo de calidad y disponibilidad",
        "🚦",
        inventoryMeta.criteria.qualityLegend || [],
      ],
      [
        "Criterios para valorar la calidad",
        "✨",
        inventoryMeta.criteria.qualityCriteria || [],
      ],
      [
        "Clasificación de sensibilidad",
        "🔐",
        inventoryMeta.criteria.sensitivity || [],
      ],
      [
        "Datos mínimos viables",
        "🎯",
        inventoryMeta.criteria.minimumViable || [],
      ],
    ];
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<span>Plan de IA</span></nav><div class="page-heading"><div><div class="eyebrow">SAGULPA · PLAN DE IMPLANTACIÓN DE IA</div><h1>Mapa de datos mínimos viables<span class="heading-dot">.</span></h1><p>${esc(inventoryMeta.scope || "Inventario de fuentes que alimentan los casos de uso priorizados.")}</p></div><span class="department-chip">🎯 Plan de IA</span></div><div class="stats"><div class="stat"><span class="stat-icon blue">${icon("database")}</span><div><strong>${String(inventorySources.length).padStart(2, "0")}</strong><span>Fuentes inventariadas</span></div></div><div class="stat"><span class="stat-icon green">${icon("tasks")}</span><div><strong>${String(inventoryMeta.useCases.length).padStart(2, "0")}</strong><span>Casos priorizados</span></div></div><div class="stat"><span class="stat-icon orange">${icon("clock")}</span><div><strong>${String(inventoryMeta.gaps.length).padStart(2, "0")}</strong><span>Gaps y peticiones</span></div></div><div class="stat"><span class="stat-icon yellow">${icon("check")}</span><div><strong>${completionAverage}%</strong><span>Campos documentados</span></div></div></div><div class="plan-jump-nav"><a href="#plan-cases">🎯 Casos de uso</a><a href="#plan-gaps">🧩 Gaps</a><a href="#plan-criteria">📐 Criterios</a><a href="docs/SAGULPA_inventario-fuentes-datos-minimos_revYSS1310.xlsx" target="_blank" rel="noopener">📗 Excel original</a></div><section id="plan-cases" class="plan-section"><div class="section-heading"><div><h2>Casos de uso priorizados <span class="count-pill">${inventoryMeta.useCases.length}</span></h2><p>Relación entre cada caso y las fuentes mínimas que necesita.</p></div></div><div class="use-case-grid">${inventoryMeta.useCases.map((item, index) => `<article class="use-case-card"><div class="use-case-number">${String(index + 1).padStart(2, "0")}</div><div><span class="eyebrow">${esc(item.area)}</span><h3>${esc(item.name)}</h3><p>${esc(item.sources)}</p></div><div class="use-case-footer"><span>${icon("database")}${item.sourceCount} fuentes</span><span class="badge pending"><i></i>${esc(item.minimumDataAvailable || "Pendiente")}</span></div></article>`).join("")}</div></section><section id="plan-gaps" class="plan-section"><div class="section-heading"><div><h2>Gaps y peticiones <span class="count-pill">${inventoryMeta.gaps.length}</span></h2><p>Preguntas que deben resolver Sistemas, la Oficina del Dato y la revisión legal.</p></div></div><div class="gap-list">${inventoryMeta.gaps.map((gap) => `<details class="gap-card"><summary><span class="gap-id">${gap.id}</span><span><strong>${esc(gap.question)}</strong><small>${esc(gap.source)}</small></span><span class="priority-badge ${normalizeText(gap.priority)}">${esc(gap.priority)}</span><span class="endpoint-chevron">⌄</span></summary><div class="gap-body"><div><span>Dirigido a</span><strong>${esc(gap.directedTo)}</strong></div><div><span>Fuente afectada</span><strong>${esc(gap.source)}</strong></div><div><span>Respuesta</span><strong>${gap.response ? esc(gap.response) : '<span class="field-pending">Por completar</span>'}</strong></div></div></details>`).join("")}</div></section><section id="plan-criteria" class="plan-section"><div class="section-heading"><div><h2>Criterios y leyenda</h2><p>Reglas utilizadas para valorar disponibilidad, calidad, sensibilidad y prioridad.</p></div></div><div class="criteria-groups">${criteriaGroups.map(([title, emoji, items]) => `<article class="criteria-group"><div class="criteria-title"><span>${emoji}</span><h3>${esc(title)}</h3></div><div>${items.map((item) => `<div class="criterion ${normalizeText(item.name)}"><strong>${esc(item.name)}</strong><p>${esc(item.description)}</p></div>`).join("")}</div></article>`).join("")}</div></section>`;
  }
  function renderApiLibrary() {
    const endpointCount = apiLibrary.reduce(
      (total, api) => total + apiEndpointCount(api),
      0,
    );
    const departmentCount = new Set(
      apiLibrary.flatMap((api) =>
        api.groups.map((group) => group.departmentId),
      ),
    ).size;
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<span>Biblioteca de APIs</span></nav>
      <div class="page-heading"><div><div class="eyebrow">DOCUMENTACIÓN TÉCNICA</div><h1>Biblioteca de APIs<span class="heading-dot">.</span></h1><p>Contratos, esquemas y requisitos de las APIs que conectan los datos de la organización.</p></div><span class="department-chip">${icon("code")}Biblioteca</span></div>
      <div class="stats api-stats"><div class="stat"><span class="stat-icon blue">${icon("code")}</span><div><strong>${String(apiLibrary.length).padStart(2, "0")}</strong><span>API documentadas</span></div></div><div class="stat"><span class="stat-icon green">${icon("database")}</span><div><strong>${String(endpointCount).padStart(2, "0")}</strong><span>Endpoints definidos</span></div></div><div class="stat"><span class="stat-icon orange">${icon("layers")}</span><div><strong>${String(departmentCount).padStart(2, "0")}</strong><span>Áreas conectadas</span></div></div></div>
      <section><div class="section-heading"><div><h2>APIs disponibles <span class="count-pill">${apiLibrary.length}</span></h2><p>Selecciona una API para consultar su documentación.</p></div></div><div class="api-library-grid">${apiLibrary
        .map(
          (api) =>
            `<a class="api-library-card" href="#/apis/${esc(api.id)}"><div class="api-card-head">${apiLogo(api)}<span class="badge available"><i></i>Documentada</span></div><div><span class="eyebrow">DESARROLLADA POR ${esc(api.provider.toUpperCase())}</span><h2>${esc(api.name)}</h2><p>${esc(api.description)}</p></div><div class="api-card-meta"><span>${icon("database")}${apiEndpointCount(api)} endpoints</span><span>${icon("layers")}${api.groups.length} ${esc(api.groupLabel || "áreas")}</span><span class="api-card-arrow">Ver documentación ${icon("arrow")}</span></div></a>`,
        )
        .join("")}</div></section>`;
  }
  function apiSummaryValue(value) {
    return value
      ? `<code>${esc(value)}</code>`
      : '<span class="badge pending"><i></i>Por documentar</span>';
  }
  function renderTechnicalTable(table) {
    const headers = table.headers || [];
    return `<section class="endpoint-table-section"><h4>${esc(table.title || "Parámetros")}</h4><div class="schema-table-wrap"><table class="schema-table technical-table"><thead><tr>${headers.map((header) => `<th>${esc(header)}</th>`).join("")}</tr></thead><tbody>${(table.rows || []).map((row) => `<tr>${row.map((cell, index) => `<td>${index === 0 ? `<code>${esc(cell)}</code>` : esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`;
  }
  function renderEndpointCard(api, endpoint, index) {
    const tables = endpoint.tables || [];
    const parameterCount =
      endpoint.fields?.length ||
      tables.reduce((total, table) => total + (table.rows?.length || 0), 0);
    const countLabel = endpoint.fields
      ? parameterCount === 1
        ? "campo"
        : "campos"
      : parameterCount === 1
        ? "elemento"
        : "elementos";
    const subtitle =
      endpoint.title ||
      (endpoint.sourceTable
        ? `Tabla de origen: ${endpoint.sourceTable}`
        : "Operación documentada");
    const searchText = normalizeText(
      [endpoint.name, endpoint.title, endpoint.description, endpoint.route]
        .filter(Boolean)
        .join(" "),
    );
    const routeMarkup = endpoint.route
      ? `<div class="endpoint-route"><span>Ruta documentada</span><code>${esc(endpoint.route)}</code></div>`
      : "";
    const tablesMarkup = endpoint.fields
      ? `<section class="endpoint-table-section"><h4>Campos publicados</h4><div class="schema-table-wrap"><table class="schema-table"><thead><tr><th>Campo API</th><th>Columna origen</th><th>Tipo</th><th>Obligatorio</th><th>Descripción y observaciones</th></tr></thead><tbody>${endpoint.fields
          .map(
            (fieldInfo) =>
              `<tr><td><code>${esc(fieldInfo.name)}</code></td><td><code>${esc(fieldInfo.source)}</code></td><td>${esc(fieldInfo.type)}</td><td><span class="badge ${fieldInfo.required ? "available" : "neutral"}">${fieldInfo.required ? "Sí" : "No"}</span></td><td>${fieldInfo.description ? esc(fieldInfo.description) : '<span class="muted">Sin descripción adicional</span>'}${fieldInfo.note ? `<small class="field-note">${esc(fieldInfo.note)}</small>` : ""}</td></tr>`,
          )
          .join("")}</tbody></table></div></section>`
      : tables.map(renderTechnicalTable).join("");
    const payloads = [
      ...(endpoint.schemas || []),
      ...(endpoint.examples || []),
    ];
    const payloadMarkup = payloads.length
      ? `<div class="endpoint-payloads">${payloads
          .map(
            (payload) =>
              `<details class="payload-card"><summary>${icon("code")}<strong>${esc(payload.title)}</strong><span class="endpoint-chevron">⌄</span></summary><pre><code>${esc(payload.content)}</code></pre></details>`,
          )
          .join("")}</div>`
      : "";
    const open = api.defaultEndpointOpen !== false && index === 0;
    return `<details class="endpoint-card" data-search="${esc(searchText)}"${open ? " open" : ""}><summary><span class="endpoint-icon">${icon("code")}</span><span><strong>${esc(endpoint.name)}</strong><small>${esc(subtitle)}</small></span><span class="endpoint-field-count">${parameterCount} ${countLabel}</span><span class="badge ${endpoint.route ? "available" : "pending"}"><i></i>${endpoint.route ? "Ruta documentada" : "Ruta pendiente"}</span><span class="endpoint-chevron">⌄</span></summary><div class="endpoint-body"><p>${esc(endpoint.description)}</p>${routeMarkup}${endpoint.notes?.length ? `<div class="endpoint-notes">${endpoint.notes.map((note) => `<span>${icon("info")}${esc(note)}</span>`).join("")}</div>` : ""}${tablesMarkup}${payloadMarkup}</div></details>`;
  }
  function renderApiDocumentation(api) {
    const endpointCount = apiEndpointCount(api);
    const documentDescription =
      api.document.format === "HTML"
        ? "Documento HTML original conservado junto al código para consulta y trazabilidad."
        : `Especificación recibida de ${esc(api.document.pages)} páginas. Se conserva junto al código para que la documentación no dependa de enlaces externos.`;
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<a href="#/apis">Biblioteca de APIs</a>${icon("chevron")}<span>${esc(api.name)}</span></nav>
      <a class="back-link" href="#/apis">← Volver a la biblioteca</a>
      <div class="detail-heading api-detail-heading">${apiLogo(api, true)}<div><div class="eyebrow">${esc(api.protocol || "API REST")} · ${esc(api.provider.toUpperCase())}</div><h1>${esc(api.name)}<span class="heading-dot">.</span></h1><p>${esc(api.description)}</p></div><span class="badge available"><i></i>Especificación disponible</span></div>
      <div class="api-summary-grid"><section class="panel api-overview"><h2>Resumen técnico</h2><dl><div><dt>Desarrollador</dt><dd>${esc(api.provider)}</dd></div><div><dt>URL base</dt><dd>${apiSummaryValue(api.baseUrl)}</dd></div><div><dt>Autenticación</dt><dd>${api.authentication ? esc(api.authentication) : '<span class="badge pending"><i></i>Por documentar</span>'}</dd></div><div><dt>Versionado</dt><dd>${esc(api.versioning)}</dd></div><div><dt>Frecuencia prevista</dt><dd>${esc(api.refreshFrequency)}</dd></div><div><dt>Endpoints</dt><dd>${endpointCount}</dd></div></dl></section><section class="panel api-document"><span class="stat-icon blue">${icon("folder")}</span><h2>Documento original</h2><p>${documentDescription}</p><a class="document-link" href="${esc(api.document.url)}" target="_blank" rel="noopener">${icon("external")}Abrir ${esc(api.document.name)}</a></section></div>
      <section class="panel api-conventions"><h2>Convenciones generales</h2><div class="convention-grid">${api.conventions.map((item) => `<div>${icon("check")}<span>${esc(item)}</span></div>`).join("")}</div></section>
      <section class="api-reference"><div class="section-heading"><div><h2>Referencia de endpoints <span class="count-pill">${endpointCount}</span></h2><p>Rutas, parámetros, esquemas y ejemplos disponibles en la especificación.</p></div></div>${endpointCount > 15 ? `<label class="api-endpoint-search">${icon("search")}<input id="api-endpoint-search" type="search" placeholder="Buscar endpoint o descripción…" autocomplete="off"><span>${endpointCount} operaciones</span></label><div class="api-search-empty" id="api-search-empty" hidden>${icon("search")}<strong>Sin resultados</strong><span>Prueba con otro nombre o término técnico.</span></div>` : ""}${api.groups
        .map(
          (group) =>
            `<section class="api-group"><div class="api-group-heading"><div><span class="eyebrow">${esc(api.groupType || "ÁREA")}</span><h2>${esc(group.name)}</h2><p>${esc(group.scope)}</p></div><a href="#/${esc(group.departmentId)}">Ver área ${icon("arrow")}</a></div><div class="endpoint-list">${group.endpoints.map((endpoint, index) => renderEndpointCard(api, endpoint, index)).join("")}</div></section>`,
        )
        .join("")}</section>
      <div class="api-notes-grid"><section class="panel pending-panel"><span class="stat-icon yellow">${icon("clock")}</span><h2>Pendiente de completar</h2><ul>${api.unresolved.map((item) => `<li>${icon("clock")}<span>${esc(item)}</span></li>`).join("")}</ul></section><section class="panel"><span class="stat-icon blue">${icon("info")}</span><h2>Notas de alcance</h2><ul class="plain-notes">${api.notes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section></div>`;
    const endpointSearch = document.getElementById("api-endpoint-search");
    endpointSearch?.addEventListener("input", () => {
      const term = normalizeText(endpointSearch.value);
      let visibleCount = 0;
      main.querySelectorAll(".endpoint-card").forEach((card) => {
        card.hidden = Boolean(term) && !card.dataset.search.includes(term);
        if (!card.hidden) visibleCount += 1;
      });
      main.querySelectorAll(".api-group").forEach((group) => {
        group.hidden = !group.querySelector(".endpoint-card:not([hidden])");
      });
      document.getElementById("api-search-empty").hidden = visibleCount > 0;
    });
  }
  function documentMetricCount(document) {
    return document.sections.reduce(
      (total, section) => total + section.metrics.length,
      0,
    );
  }
  function documentPendingCount(document) {
    return (
      document.pending.length +
      document.sections.reduce(
        (sectionTotal, section) =>
          sectionTotal +
          section.metrics.reduce(
            (metricTotal, metric) =>
              metricTotal +
              metric.pending.length +
              metric.sources.filter((source) => source.status === "pending")
                .length,
            0,
          ),
        0,
      ) +
      document.archive.filter((file) => !file.url).length
    );
  }
  function setDocumentNavigation(active) {
    document.querySelectorAll("[data-route]").forEach((el) => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });
    ["overview-nav", "api-nav", "inventory-nav", "document-nav"].forEach(
      (id) => {
        const item = document.getElementById(id);
        item.classList.toggle("active", active && id === "document-nav");
        if (active && id === "document-nav")
          item.setAttribute("aria-current", "page");
        else item.removeAttribute("aria-current");
      },
    );
  }
  function renderDocumentLibrary() {
    setDocumentNavigation(true);
    const metricCount = documentLibrary.reduce(
      (total, document) => total + documentMetricCount(document),
      0,
    );
    const pendingCount = documentLibrary.reduce(
      (total, document) => total + documentPendingCount(document),
      0,
    );
    const areas = [...new Set(documentLibrary.map((item) => item.areaName))];
    const types = [...new Set(documentLibrary.map((item) => item.type))];
    document.title = "Informes y encuestas · Atlas";
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<span>Informes y encuestas</span></nav>
      <div class="page-heading"><div><div class="eyebrow">BIBLIOTECA DOCUMENTAL</div><h1>Informes y encuestas<span class="heading-dot">.</span></h1><p>Entregables, estudios y archivos conectados con sus métricas, cálculos y fuentes de datos.</p></div><span class="department-chip">${icon("folder")}Documentos</span></div>
      <div class="stats document-stats"><div class="stat"><span class="stat-icon blue">${icon("folder")}</span><div><strong>${String(documentLibrary.length).padStart(2, "0")}</strong><span>Documentos</span></div></div><div class="stat"><span class="stat-icon green">${icon("chart")}</span><div><strong>${String(metricCount).padStart(2, "0")}</strong><span>Métricas trazadas</span></div></div><div class="stat"><span class="stat-icon orange">${icon("layers")}</span><div><strong>${String(areas.length).padStart(2, "0")}</strong><span>Áreas</span></div></div><div class="stat"><span class="stat-icon yellow">${icon("clock")}</span><div><strong>${String(pendingCount).padStart(2, "0")}</strong><span>Pendientes identificados</span></div></div></div>
      <section class="document-toolbar panel"><label class="document-search">${icon("search")}<input id="document-search" type="search" placeholder="Buscar informe, encuesta o entidad…" autocomplete="off"></label><label><span>Área</span><select id="document-area"><option value="">Todas</option>${areas.map((area) => `<option>${esc(area)}</option>`).join("")}</select></label><label><span>Tipo</span><select id="document-type"><option value="">Todos</option>${types.map((type) => `<option>${esc(type)}</option>`).join("")}</select></label></section>
      <section><div class="section-heading"><div><h2>Documentos disponibles <span class="count-pill" id="document-result-count">${documentLibrary.length}</span></h2><p>Selecciona un documento para revisar sus métricas y consultar las entregas anuales.</p></div><span class="section-kicker">ESCALABLE POR ÁREA Y TIPO</span></div><div class="document-library-grid">${documentLibrary.map((document) => `<a class="document-library-card" href="#/documents/${esc(document.id)}" data-area="${esc(document.areaName)}" data-type="${esc(document.type)}" data-search="${esc(normalizeText(`${document.title} ${document.organization} ${document.areaName} ${document.description}`))}"><div class="document-card-head"><span class="document-card-icon ${esc(document.color)}">${esc(document.icon)}</span><span class="badge available"><i></i>${esc(document.type)}</span></div><div><span class="eyebrow">${esc(document.organization)} · ${esc(document.areaName)}</span><h2>${esc(document.title)}</h2><p>${esc(document.description)}</p></div><div class="document-card-tags"><span>${icon("clock")}${esc(document.frequency)}</span><span>${icon("chart")}${documentMetricCount(document)} métricas</span><span class="pending-tag">${icon("info")}${documentPendingCount(document)} pendientes</span></div><div class="document-card-footer"><span>${esc(document.referencePeriod)}</span><strong>Ver detalle ${icon("arrow")}</strong></div></a>`).join("")}</div><div class="empty document-empty" id="document-empty" hidden><h2>Sin resultados</h2><p>Prueba con otros términos o filtros.</p></div></section>`;
    const applyFilters = () => {
      const search = normalizeText(document.getElementById("document-search").value);
      const area = document.getElementById("document-area").value;
      const type = document.getElementById("document-type").value;
      let visible = 0;
      main.querySelectorAll(".document-library-card").forEach((card) => {
        card.hidden =
          (search && !card.dataset.search.includes(search)) ||
          (area && card.dataset.area !== area) ||
          (type && card.dataset.type !== type);
        if (!card.hidden) visible += 1;
      });
      document.getElementById("document-result-count").textContent = visible;
      document.getElementById("document-empty").hidden = visible > 0;
    };
    ["document-search", "document-area", "document-type"].forEach((id) =>
      document.getElementById(id).addEventListener("input", applyFilters),
    );
  }
  function renderMetricSource(source) {
    const statusLabel =
      source.status === "confirmed"
        ? "Fuente confirmada"
        : source.status === "pending"
          ? "Origen pendiente"
          : "Relación propuesta";
    const content = `<span>${source.status === "pending" ? "?" : icon(source.status === "confirmed" ? "check" : "link")}</span><span><strong>${esc(source.name)}</strong><small>${esc(source.relation)}</small></span><em>${statusLabel}</em>`;
    const external = /^https?:\/\//i.test(source.href || "");
    return source.href
      ? `<a class="metric-source ${esc(source.status)}" href="${esc(source.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${content}${icon(external ? "external" : "arrow")}</a>`
      : `<div class="metric-source ${esc(source.status)}${source.status === "pending" ? " pending-source" : ""}">${content}</div>`;
  }
  function renderDocumentProcessList(processes) {
    return `<div class="document-process-list">${processes
      .map((process) => {
        const repositoryAction = process.repositoryUrl
          ? `<a href="${esc(process.repositoryUrl)}" target="_blank" rel="noopener noreferrer">Ver código ${icon("external")}</a>`
          : `<span class="process-location">${icon("code")}${esc(process.repositoryName)}</span>`;
        const transformation = process.repositoryUrl
          ? `<a href="${esc(process.repositoryUrl)}" target="_blank" rel="noopener noreferrer"><span>${icon("code")}</span><div><small>TRANSFORMACIÓN</small><strong>${esc(process.repositoryName)}</strong></div>${icon("external")}</a>`
          : `<div class="process-lineage-item"><span>${icon("code")}</span><div><small>TRANSFORMACIÓN</small><strong>${esc(process.repositoryName)}</strong></div></div>`;
        const codeBlock = process.code
          ? `<div class="process-code-block"><div><span>${esc(process.codeLanguage || "Código")}</span><strong>Medida completa</strong></div><pre><code>${esc(process.code)}</code></pre></div>`
          : "";
        return `<article class="document-process-card"><div class="process-card-heading"><span class="process-code-icon">${icon("code")}</span><div><span class="eyebrow">FUNCIÓN DOCUMENTADA</span><h3>${esc(process.title)}</h3><code>${esc(process.functionName)}</code></div>${repositoryAction}</div><p>${esc(process.description)}</p><div class="process-lineage"><a href="${esc(process.sourceUrl)}"><span>${icon("database")}</span><div><small>FUENTE UTILIZADA</small><strong>${esc(process.sourceName)}</strong></div>${icon("arrow")}</a>${transformation}</div><div class="process-formulas">${process.formulas.map((formula) => `<div><span>${esc(formula.name)}</span><code>${esc(formula.expression)}</code></div>`).join("")}</div>${codeBlock}<div class="process-pending">${icon("clock")}<div><strong>${esc(process.pendingTitle || "Pendiente de unificación")}</strong><p>${esc(process.pending)}</p></div></div></article>`;
      })
      .join("")}</div>`;
  }
  function renderDocumentDetail(document) {
    setDocumentNavigation(true);
    window.document.title = `${document.title} · Atlas`;
    const metricCount = documentMetricCount(document);
    const sourceCount = new Set(
      document.sections.flatMap((section) =>
        section.metrics.flatMap((metric) => metric.sources.map((source) => source.name)),
      ),
    ).size;
    const templateAction = document.template.actionLabel || "Abrir plantilla";
    const templateEyebrow =
      document.template.eyebrow || "PLANTILLA DE TRABAJO";
    const templateDescription =
      document.template.description ||
      "Copia original recibida, disponible para consulta o descarga.";
    const exampleMarkup = document.exampleView
      ? `<section id="document-example" class="document-detail-section document-example-section"><div class="section-heading"><div><h2>${esc(document.exampleView.title)}</h2><p>${esc(document.exampleView.description)}</p></div><span class="section-kicker">VISTA DE DATOS</span></div><div class="document-example-note">${icon("info")}<span>${esc(document.exampleView.note)}</span></div><div class="document-example-table-wrap"><table class="document-example-table"><thead><tr>${document.exampleView.columns.map((column) => `<th><small>${esc(column.group)}</small>${esc(column.label)}</th>`).join("")}</tr></thead><tbody>${document.exampleView.rows.map((row) => `<tr>${document.exampleView.columns.map((column) => `<td>${esc(row[column.key])}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="table-scroll-hint">Desplázate horizontalmente para consultar todas las columnas.</p></section>`
      : "";
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<a href="#/documents">Informes y encuestas</a>${icon("chevron")}<span>${esc(document.title)}</span></nav>
      <a class="back-link" href="#/documents">← Volver a informes y encuestas</a>
      <div class="document-detail-heading"><span class="document-hero-icon ${esc(document.color)}">${esc(document.icon)}</span><div><div class="eyebrow">${esc(document.organization)} · ${esc(document.type)} · ${esc(document.areaName)}</div><h1>${esc(document.title)}<span class="heading-dot">.</span></h1><p>${esc(document.description)}</p></div><a class="primary-document-link" href="${esc(document.template.url)}" target="_blank" rel="noopener">${icon("sheet")}${esc(templateAction)}</a></div>
      ${document.confidentialityNote ? `<div class="document-confidentiality">🔐 <span>${esc(document.confidentialityNote)}</span></div>` : ""}
      <div class="document-facts"><div><span>📅 Periodo</span><strong>${esc(document.referencePeriod)}</strong></div><div><span>🔁 Frecuencia</span><strong>${esc(document.frequency)}</strong></div><div><span>👤 Responsable</span>${document.owner ? `<strong>${esc(document.owner)}</strong>` : '<strong class="field-pending">Por completar</strong>'}</div><div><span>🔐 Clasificación</span>${document.classification ? `<strong>${esc(document.classification)}</strong>` : '<strong class="field-pending">Por completar</strong>'}</div></div>
      <div class="document-jump-nav">${document.exampleView ? `<button type="button" data-scroll-target="document-example">${icon("database")}Vista de ejemplo</button>` : ""}${document.processes?.length ? `<button type="button" data-scroll-target="document-processes">${icon("code")}Procesos de cálculo</button>` : ""}<button type="button" data-scroll-target="document-metrics">${icon("chart")}${metricCount} métricas y cálculos</button><button type="button" data-scroll-target="document-archive">${icon("folder")}Histórico anual</button><a href="${esc(document.template.url)}" target="_blank" rel="noopener">${icon("sheet")}${esc(templateAction)}</a></div>
      ${exampleMarkup}
      <section id="document-metrics" class="document-detail-section"><div class="section-heading"><div><h2>Métricas, cálculos y fuentes <span class="count-pill">${metricCount}</span></h2><p>Cada indicador conserva la fórmula documentada y muestra de dónde debe obtenerse.</p></div><span class="section-kicker">${sourceCount} FUENTES RELACIONADAS</span></div><div class="metric-legend"><span><i class="legend-dot confirmed"></i>Fuente confirmada</span><span><i class="legend-dot proposed"></i>Relación propuesta para validar</span><span><i class="legend-dot missing"></i>Origen todavía sin identificar</span></div>${document.sections.map((section) => `<section class="document-metric-group"><div class="document-metric-group-heading"><div><h3>${esc(section.title)}</h3>${section.note ? `<p>${esc(section.note)}</p>` : ""}</div><span>${section.metrics.length} ${section.metrics.length === 1 ? "campo" : "campos"}</span></div><div class="document-metric-list">${section.metrics.map((metric, index) => `<details class="document-metric"><summary><span class="metric-number">${String(index + 1).padStart(2, "0")}</span><span><strong>${esc(metric.name)}</strong><small>${esc(metric.period)}</small></span>${metric.value ? `<span class="metric-value-preview">${esc(metric.value)}</span>` : `<span class="metric-source-count">${metric.sources.length} ${metric.sources.length === 1 ? "fuente" : "fuentes"}</span>`}<span class="endpoint-chevron">⌄</span></summary><div class="document-metric-body">${metric.description ? `<p>${esc(metric.description)}</p>` : ""}${metric.value ? `<div class="metric-result"><span>Dato de la encuesta</span><strong>${esc(metric.value)}</strong></div>` : ""}<div class="metric-formula"><span>🧮 Cálculo</span><strong>${esc(metric.formula)}</strong></div>${metric.note ? `<div class="metric-note">${icon("info")}<span>${esc(metric.note)}</span></div>` : ""}${metric.processIds?.length ? `<details${section.title === "Indisponibilidad" && index === 0 ? ' id="document-processes"' : ""} class="embedded-processes metric-processes"><summary class="embedded-process-heading"><div><h4>Proceso de cálculo</h4><p>Función, fórmulas y linaje de esta métrica.</p></div><span class="process-summary-meta"><span class="section-kicker">CÓDIGO Y LINAJE</span><span class="endpoint-chevron">⌄</span></span></summary>${renderDocumentProcessList((document.processes || []).filter((process) => metric.processIds.includes(process.id)))}</details>` : ""}<div class="metric-sources"><h4>Fuentes relacionadas</h4>${metric.sources.map(renderMetricSource).join("")}</div>${metric.pending.length ? `<div class="metric-pending"><strong>${icon("clock")}Pendiente de validar</strong><ul>${metric.pending.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>` : ""}</div></details>`).join("")}</div></section>`).join("")}</section>
      <section id="document-archive" class="document-detail-section"><div class="section-heading"><div><h2>Histórico anual</h2><p>Acceso al documento de trabajo y a los archivos cumplimentados o conservados por año.</p></div><span class="section-kicker">ARCHIVO DOCUMENTAL</span></div><div class="document-archive-layout"><article class="template-archive-card"><span class="archive-icon">${icon("sheet")}</span><div><span class="eyebrow">${esc(templateEyebrow)}</span><h3>${esc(document.template.name)}</h3><p>${esc(templateDescription)}</p></div><a href="${esc(document.template.url)}" target="_blank" rel="noopener">${esc(templateAction)} ${icon("external")}</a></article><div class="annual-file-list">${document.archive.map((file) => `<article class="annual-file-card ${file.url ? "available" : "pending"}"><div class="annual-year">${esc(file.year)}</div><div><span class="eyebrow">ENTREGA ANUAL</span><h3>${esc(file.label)}</h3><p>${esc(file.note)}</p></div>${file.url ? `<a class="annual-file-link" href="${esc(file.url)}" target="_blank" rel="noopener">Abrir documento ${icon("external")}</a>` : `<span class="cloud-pending">${icon("clock")}Ruta de Cloud Storage por completar</span>`}</article>`).join("")}</div></div></section>
      <section class="panel document-pending-panel"><div><span class="stat-icon yellow">${icon("clock")}</span><div><h2>Campos generales pendientes</h2><p>Datos, accesos o decisiones que deben confirmarse antes de cerrar la ficha.</p></div></div><ul>${document.pending.map((item) => `<li>${icon("clock")}<span>${esc(item)}</span></li>`).join("")}</ul></section>`;
    main.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = window.document.getElementById(
          button.dataset.scrollTarget,
        );
        let detailScope = target;
        while (detailScope) {
          const parentDetails = detailScope.closest?.("details");
          if (!parentDetails) break;
          parentDetails.open = true;
          detailScope = parentDetails.parentElement;
        }
        requestAnimationFrame(() =>
          target?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      });
    });
  }
  function render() {
    route = location.hash.replace(/^#\/?/, "").split("/");
    if (!route[0] || route[0] === "overview") {
      if (route.length > 1) {
        main.innerHTML = `<div class="empty"><h1>Página no encontrada</h1><p>Esta ruta no pertenece al catálogo.</p><a href="#/overview" class="text-button">Volver a la vista general</a></div>`;
        return;
      }
      renderOverview();
      return;
    }
    if (route[0] === "plan-ia") {
      if (route.length > 1) {
        main.innerHTML = `<div class="empty"><h1>Página no encontrada</h1><p>Esta ruta no pertenece al Plan de IA.</p><a href="#/plan-ia" class="text-button">Volver al Plan de IA</a></div>`;
        return;
      }
      renderInventoryPlan();
      return;
    }
    if (route[0] === "apis") {
      const api = route[1]
        ? apiLibrary.find((item) => item.id === route[1])
        : null;
      if (route.length > 2 || (route[1] && !api)) {
        main.innerHTML = `<div class="empty"><h1>Página no encontrada</h1><p>Esta API no pertenece a la biblioteca.</p><a href="#/apis" class="text-button">Volver a la biblioteca</a></div>`;
        return;
      }
      document.querySelectorAll("[data-route]").forEach((el) => {
        el.classList.remove("active");
        el.removeAttribute("aria-current");
      });
      document.getElementById("overview-nav").classList.remove("active");
      document.getElementById("document-nav").classList.remove("active");
      document.getElementById("document-nav").removeAttribute("aria-current");
      document.getElementById("inventory-nav").classList.remove("active");
      document.getElementById("inventory-nav").removeAttribute("aria-current");
      document.getElementById("api-nav").classList.add("active");
      document.getElementById("api-nav").setAttribute("aria-current", "page");
      document.title = `${api?.name || "Biblioteca de APIs"} · Atlas`;
      api ? renderApiDocumentation(api) : renderApiLibrary();
      return;
    }
    if (route[0] === "documents") {
      const documentItem = route[1]
        ? documentLibrary.find((item) => item.id === route[1])
        : null;
      if (route.length > 2 || (route[1] && !documentItem)) {
        main.innerHTML = `<div class="empty"><h1>Página no encontrada</h1><p>Este documento no pertenece a la biblioteca.</p><a href="#/documents" class="text-button">Volver a informes y encuestas</a></div>`;
        return;
      }
      documentItem
        ? renderDocumentDetail(documentItem)
        : renderDocumentLibrary();
      return;
    }
    const d = departments.find((x) => x.id === route[0]);
    const source =
      d && route[1] === "fuente"
        ? sources.find((s) => s.id === route[2] && belongsToDepartment(s, d.id))
        : null;
    const sourceDataPage = Boolean(
      source && route[3] === "consultas" && route.length === 4,
    );
    const dataset =
      source && route[3] === "consulta" && route.length === 5
        ? source.datasets.find(
            (item) => String(item.queryNumber) === route[4] && item.queryGuide,
          )
        : null;
    const service = d?.services.find((x) => x.id === route[1]);
    if (
      !d ||
      (route[1] && !service && !source) ||
      (source && route.length > 3 && !sourceDataPage && !dataset) ||
      (!source && route.length > (service ? 2 : 1))
    ) {
      main.innerHTML = `<div class="empty"><h1>Página no encontrada</h1><p>Esta ruta no pertenece al catálogo.</p><a href="#/overview" class="text-button">Volver a la vista general</a></div>`;
      return;
    }
    document.querySelectorAll("[data-route]").forEach((el) => {
      const selected = el.dataset.route === (service?.id || d.id);
      el.classList.toggle("active", selected);
      if (selected) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
    document.getElementById("api-nav").classList.remove("active");
    document.getElementById("api-nav").removeAttribute("aria-current");
    document.getElementById("inventory-nav").classList.remove("active");
    document.getElementById("inventory-nav").removeAttribute("aria-current");
    document.getElementById("overview-nav").classList.remove("active");
    document.getElementById("overview-nav").removeAttribute("aria-current");
    document.getElementById("document-nav").classList.remove("active");
    document.getElementById("document-nav").removeAttribute("aria-current");
    document.title = `${dataset?.name || source?.name || service?.name || d.name} · Atlas`;
    if (dataset) {
      renderQueryDocumentation(d, source, dataset);
    } else if (source) {
      if (sourceDataPage) tab = "data";
      detail(d, source);
    } else {
      listing(d, service);
    }
  }
  window.addEventListener("hashchange", () => {
    query = "";
    filter = "all";
    facetFilters = {};
    tab = "overview";
    render();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "/" &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
    ) {
      const search = document.getElementById("search");
      if (search) {
        event.preventDefault();
        search.focus();
      }
    }
  });
  document.addEventListener(
    "error",
    (event) => {
      if (event.target.matches?.(".source-logo img")) {
        event.target.closest(".source-logo")?.classList.add("logo-error");
      }
    },
    true,
  );
  render();
})();
