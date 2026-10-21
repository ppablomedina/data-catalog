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
    ebike:
      '<circle cx="5" cy="17" r="3.5"/><circle cx="19" cy="17" r="3.5"/><path d="m5 17 5-10 5 10H5m3-10h5m3-4h3l3 14M12 9l-2 4h3l-2 4"/>',
    scooter:
      '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 19h7a4 4 0 0 0 4-4V6m-3 0h6M8 9h5l2 7"/>',
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
  const { departments, sources } = window.CATALOG;
  const apiLibrary = window.API_LIBRARY || [];
  const main = document.getElementById("main");
  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.getElementById("theme-color");
  const themeStorageKey = "atlas-theme";
  let query = "",
    filter = "all",
    tab = "overview";
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
  document
    .querySelectorAll("[data-icon]")
    .forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  document.getElementById("department-nav").innerHTML = departments
    .map(
      (d) =>
        `<a class="nav-item department" data-route="${esc(d.id)}" href="#/${esc(d.id)}">${icon("layers")}${esc(d.name)}${d.services.length ? '<span class="nav-chevron">⌄</span>' : ""}</a>${d.services.length ? `<div class="service-nav">${d.services.map((s) => `<a href="#/${esc(d.id)}/${esc(s.id)}" data-route="${esc(s.id)}"><span class="service-dot ${esc(s.color)}"></span>${esc(s.name)}</a>`).join("")}</div>` : ""}`,
    )
    .join("");
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
    const preview = s.datasets
      .slice(0, 2)
      .map((x) => `<span>${icon(x.icon)}${esc(x.name)}</span>`)
      .join("");
    const remaining = s.datasets.length - 2;
    return `<a class="source-card" href="#/${esc(departmentId)}/fuente/${esc(s.id)}"><div class="source-card-top">${sourceLogo(s)}<span class="card-open">${icon("arrow")}</span></div><div class="source-name">${esc(s.name)}<span class="category">${esc(s.category)}</span></div><p>${esc(s.description)}</p><div class="data-labels">${preview}${remaining > 0 ? `<span>+${remaining} ${esc(s.itemLabel || "conjuntos")}</span>` : ""}</div><div class="source-card-bottom">${badge(s)}<span>${s.datasets.length} ${esc(s.itemLabel || "conjuntos de datos")}</span></div></a>`;
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
    main.innerHTML = `${crumbs(d, service)}<div class="page-heading"><div><div class="eyebrow">${service ? "SUBTIPO · " + esc(d.name.toUpperCase()) : "TU DIRECTORIO DE CONOCIMIENTO"}</div><h1>${esc(service ? service.name : d.name)}<span class="heading-dot">.</span></h1><p>${esc(service ? service.description : d.description)}</p></div><span class="department-chip">${icon(service ? service.icon : "layers")}${service ? "Subtipo" : "Departamento"}</span></div>
      <div class="stats"><div class="stat"><span class="stat-icon blue">${icon("database")}</span><div><strong>${scoped.length.toString().padStart(2, "0")}</strong><span>Fuentes de datos</span></div></div><div class="stat"><span class="stat-icon green">${icon("code")}</span><div><strong>${scoped
        .filter((s) => s.api.status === "available")
        .length.toString()
        .padStart(
          2,
          "0",
        )}</strong><span>API confirmadas</span></div></div><div class="stat"><span class="stat-icon orange">${icon("folder")}</span><div><strong>${scoped
        .filter((s) => s.repository)
        .length.toString()
        .padStart(
          2,
          "0",
        )}</strong><span>Repositorios enlazados</span></div></div><div class="stat"><span class="stat-icon yellow">${icon("clock")}</span><div><strong>${scoped
        .filter((s) => s.api.status === "pending")
        .length.toString()
        .padStart(
          2,
          "0",
        )}</strong><span>API por confirmar</span></div></div></div>
      ${!service && d.services.length ? `<section class="services-section"><div class="section-heading"><div><h2>Explora por subtipo</h2><p>Cada subtipo, su información en un mismo lugar.</p></div><span class="section-count">${d.services.length} subtipos</span></div><div class="services">${d.services.map((s) => `<a class="service-card ${esc(s.color)}" href="#/${esc(d.id)}/${esc(s.id)}"><span class="service-art">${icon(s.icon)}</span><div><h3>${esc(s.name)}</h3><p>${sources.filter((x) => belongsToDepartment(x, d.id) && x.serviceIds.includes(s.id)).length} fuentes asignadas</p></div><span class="service-arrow">${icon("arrow")}</span></a>`).join("")}</div></section>` : ""}
      <section class="sources-section"><div class="section-heading"><div><h2>${service ? "Fuentes del subtipo" : "Fuentes de datos"} <span class="count-pill">${scoped.length}</span></h2><p>${service ? "Información vinculada específicamente a este subtipo." : `Proveedores, integraciones y datos que forman parte de ${esc(d.name)}.`}</p></div><span class="section-kicker">EXPLORAR EL CATÁLOGO</span></div><div class="search-toolbar"><label class="search">${icon("search")}<input id="search" type="search" placeholder="Buscar fuente, dato o proveedor…" aria-label="Buscar fuentes de datos" value="${esc(query)}"><kbd>/</kbd></label><label class="filter">${icon("code")}<select id="api-filter" aria-label="Filtrar por tipo de acceso"><option value="all">Todas las fuentes</option><option value="available">API disponible</option><option value="direct">Acceso directo</option><option value="pending">API por confirmar</option></select></label></div><div id="source-results" class="source-grid" aria-live="polite"></div><div class="results-footer"><span id="result-count"></span><span>${icon("info")}Información en construcción</span></div></section>
      <div class="notice">${icon("info")}<div><strong>Un catálogo que crece contigo</strong><p>${service ? (scoped.length ? `Esta vista reúne las fuentes vinculadas a ${esc(service.name)}. Se añadirán más a medida que crezca el catálogo.` : `Todavía no hay fuentes asignadas a ${esc(service.name)}. Consulta el departamento para ver la información disponible.`) : d.services.length ? (unassignedCount ? `Algunas fuentes permanecen a nivel de ${esc(d.name)} hasta confirmar su relación con los subtipos.` : `Todas las fuentes registradas están vinculadas a los tres subtipos de ${esc(d.name)}.`) : `${scoped.length} ${scoped.length === 1 ? "fuente registrada" : "fuentes registradas"} a nivel del departamento de ${esc(d.name)}.`}</p></div>${service ? `<a href="#/${esc(d.id)}">Ver ${esc(d.name)} ${icon("arrow")}</a>` : '<span class="notice-tag">PRIMERA VERSIÓN</span>'}</div>`;
    const input = document.getElementById("search");
    const select = document.getElementById("api-filter");
    select.value = filter;
    const update = () => {
      const normalize = (str) =>
        str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      const results = scoped.filter(
        (s) =>
          (filter === "all" || s.api.status === filter) &&
          normalize(
            [
              s.name,
              s.category,
              s.description,
              ...s.datasets.map((x) => x.name),
            ].join(" "),
          ).includes(normalize(query.trim())),
      );
      document.getElementById("source-results").innerHTML = results.length
        ? results.map((source) => sourceCard(source, d.id)).join("")
        : `<div class="empty">${icon("search")}<h3>${scoped.length ? "No hay resultados" : "Aún no hay fuentes asignadas"}</h3><p>${scoped.length ? "Prueba con otra búsqueda o cambia el filtro." : "Las fuentes se mostrarán aquí cuando se confirme su relación con este servicio."}</p>${scoped.length ? '<button id="clear-search" class="text-button">Limpiar búsqueda y filtros</button>' : `<a href="#/${esc(d.id)}" class="text-button">Explorar las fuentes de ${esc(d.name)} ${icon("arrow")}</a>`}</div>`;
      document.getElementById("result-count").textContent =
        `${results.length} de ${scoped.length} fuentes`;
      document.getElementById("clear-search")?.addEventListener("click", () => {
        query = "";
        filter = "all";
        input.value = "";
        select.value = "all";
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
    update();
  }
  function accessItem(label, url, note, ico) {
    // Only explicitly configured HTTPS/HTTP links become clickable.
    const safe = url && /^https?:\/\//i.test(url);
    return `<div class="access-row"><span class="access-icon">${icon(ico)}</span><div><h3>${esc(label)}</h3><p>${esc(note)}</p></div>${safe ? `<a class="access-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Abrir ${icon("external")}</a>` : '<span class="badge neutral">Enlace pendiente</span>'}</div>`;
  }
  function detail(d, s) {
    const applicableServices = s.serviceIds
      .map((id) => d.services.find((service) => service.id === id))
      .filter(Boolean);
    main.innerHTML = `${crumbs(d, null, s)}<a class="back-link" href="#/${esc(d.id)}">← Volver a las fuentes</a><div class="detail-heading">${sourceLogo(s, true)}<div><div class="eyebrow">FUENTE DE DATOS · ${esc(d.name.toUpperCase())}</div><h1>${esc(s.name)}<span class="heading-dot">.</span></h1><p>${esc(s.description)}</p></div>${badge(s)}</div><div class="tabs" role="tablist" aria-label="Información de la fuente">${[
      ["overview", "Información general"],
      ["data", s.contentTitle || "Conjuntos de datos"],
      ["access", "API y accesos"],
      ["responsibilities", "Responsabilidades"],
    ]
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
      if (tab === "overview")
        el.innerHTML = `<div class="detail-columns"><section class="panel"><h2>Acerca de esta fuente</h2><p>${esc(s.description)}</p><dl><div><dt>Departamento</dt><dd>${esc(d.name)}</dd></div><div><dt>${d.services.length ? "Subtipos" : "Alcance"}</dt><dd>${applicableServices.length ? esc(applicableServices.map((service) => service.name).join(", ")) : "Todo el departamento"}</dd></div><div><dt>Tipo de información</dt><dd>${esc(s.category)}</dd></div><div><dt>Responsable</dt><dd>${esc(s.owner || "Por documentar")}</dd></div><div><dt>Tipo de acceso</dt><dd>${badge(s)}</dd></div></dl></section><section class="panel pending-panel"><span class="stat-icon yellow">${icon("tasks")}</span><h2>Por completar</h2><p>Próximos pasos para conectar esta fuente.</p><ul>${s.pending.map((p) => `<li>${icon("clock")}<span>${esc(p)}</span></li>`).join("")}</ul><div class="small-note">La información pendiente no implica que el recurso no exista.</div></section></div>`;
      if (tab === "data")
        el.innerHTML = `<section class="panel"><h2>${esc(s.contentTitle || "Conjuntos de datos")}</h2><p>${esc(s.contentDescription || "Información identificada en esta fuente. El esquema, formato y frecuencia de actualización están pendientes de documentar.")}</p>${s.datasets
          .map((x) => {
            const safeUrl = x.url && /^https?:\/\//i.test(x.url);
            return `<div class="dataset-row"><span class="stat-icon blue">${icon(x.icon)}</span><div>${x.queryNumber ? `<span class="query-number">Consulta ${esc(x.queryNumber)}</span>` : ""}<h3>${esc(x.name)}</h3><p>${esc(x.description)}</p></div><div class="dataset-actions">${x.status ? `<span class="badge pending"><i></i>${esc(x.status)}</span>` : ""}${safeUrl ? `<a class="access-link" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.linkLabel || "Abrir consulta")} ${icon("external")}</a>` : s.apiLibraryId ? `<a class="access-link" href="#/apis/${esc(s.apiLibraryId)}">Ver documentación ${icon("arrow")}</a>` : '<span class="badge neutral">Esquema pendiente</span>'}</div></div>`;
          })
          .join("")}</section>`;
      if (tab === "access")
        el.innerHTML = `<section class="panel"><h2>API y puntos de acceso</h2><p>Accesos directos a la documentación, repositorios y ubicación de los datos.</p>${s.apiLibraryId ? `<div class="access-row"><span class="access-icon">${icon("code")}</span><div><h3>Documentación técnica</h3><p>Esquemas, campos, convenciones y documento original de la API.</p></div><a class="access-link" href="#/apis/${esc(s.apiLibraryId)}">Abrir biblioteca ${icon("arrow")}</a></div>` : ""}${s.api.status === "direct" ? "" : accessItem("API", s.api.url, s.api.note, "code")}${accessItem(s.accessLabel || "Portal del proveedor", s.website, s.websiteNote || "Dirección del portal pendiente de documentar.", "external")}${accessItem("Repositorio", s.repository, "Repositorio y permisos pendientes de documentar.", "folder")}${accessItem("Ubicación de los datos", s.storage, "Almacenamiento y condiciones de acceso pendientes de documentar.", "database")}</section><div class="notice">${icon("info")}<div><strong>Acceso seguro</strong><p>Documenta el procedimiento para solicitar permisos. No guardes contraseñas, tokens ni claves en el catálogo.</p></div></div>`;
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
    document.querySelectorAll("[data-route]").forEach((el) => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });
    document.getElementById("api-nav").classList.remove("active");
    document.getElementById("api-nav").removeAttribute("aria-current");
    document.getElementById("overview-nav").classList.add("active");
    document
      .getElementById("overview-nav")
      .setAttribute("aria-current", "page");
    document.title = "Vista general · Atlas";
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><span>Catálogo</span>${icon("chevron")}<span>Vista general</span></nav>
      <div class="page-heading overview-heading"><div><div class="eyebrow">DIRECTORIO CORPORATIVO</div><h1>Explora el catálogo<span class="heading-dot">.</span></h1><p>Accede a los datos de cada departamento y consulta la documentación técnica de las APIs de la organización.</p></div><span class="department-chip">${icon("grid")}Vista general</span></div>
      <div class="stats overview-stats"><div class="stat"><span class="stat-icon blue">${icon("layers")}</span><div><strong>${String(departments.length).padStart(2, "0")}</strong><span>Departamentos</span></div></div><div class="stat"><span class="stat-icon green">${icon("database")}</span><div><strong>${String(sources.length).padStart(2, "0")}</strong><span>Fuentes registradas</span></div></div><div class="stat"><span class="stat-icon orange">${icon("code")}</span><div><strong>${String(apiLibrary.length).padStart(2, "0")}</strong><span>API documentadas</span></div></div><div class="stat"><span class="stat-icon yellow">${icon("link")}</span><div><strong>${String(endpointCount).padStart(2, "0")}</strong><span>Endpoints definidos</span></div></div></div>
      <section class="directory-section"><div class="section-heading"><div><h2>Departamentos <span class="count-pill">${departments.length}</span></h2><p>Selecciona un área para consultar sus fuentes, servicios y accesos.</p></div><span class="section-kicker">EXPLORAR POR ÁREA</span></div><div class="directory-grid">${departments
        .map((department) => {
          const departmentSources = sources.filter((source) =>
            belongsToDepartment(source, department.id),
          );
          return `<a class="directory-card" href="#/${esc(department.id)}"><div class="directory-card-head"><span class="directory-icon">${icon("layers")}</span><span class="card-open">${icon("arrow")}</span></div><div><span class="eyebrow">DEPARTAMENTO</span><h2>${esc(department.name)}</h2><p>${esc(department.description)}</p></div><div class="directory-card-meta"><span>${icon("database")}${departmentSources.length} ${departmentSources.length === 1 ? "fuente" : "fuentes"}</span><span>${icon("layers")}${department.services.length} ${department.services.length === 1 ? "subtipo" : "subtipos"}</span><strong>Entrar ${icon("arrow")}</strong></div></a>`;
        })
        .join("")}</div></section>
      <section class="api-access-section"><div class="section-heading"><div><h2>Documentación técnica</h2><p>Contratos, esquemas, campos y requisitos de integración.</p></div></div><a class="library-access-card" href="#/apis"><span class="library-access-icon">${icon("code")}</span><div><span class="eyebrow">BIBLIOTECA DE APIs</span><h2>Consulta todas las APIs</h2><p>${apiLibrary.length} ${apiLibrary.length === 1 ? "API documentada" : "APIs documentadas"} · ${endpointCount} endpoints definidos</p></div><span class="library-access-action">Abrir biblioteca ${icon("arrow")}</span></a></section>`;
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
      <div class="stats api-stats"><div class="stat"><span class="stat-icon blue">${icon("code")}</span><div><strong>${String(apiLibrary.length).padStart(2, "0")}</strong><span>API documentadas</span></div></div><div class="stat"><span class="stat-icon green">${icon("database")}</span><div><strong>${String(endpointCount).padStart(2, "0")}</strong><span>Endpoints definidos</span></div></div><div class="stat"><span class="stat-icon orange">${icon("layers")}</span><div><strong>${String(departmentCount).padStart(2, "0")}</strong><span>Departamentos conectados</span></div></div></div>
      <section><div class="section-heading"><div><h2>APIs disponibles <span class="count-pill">${apiLibrary.length}</span></h2><p>Selecciona una API para consultar su documentación.</p></div></div><div class="api-library-grid">${apiLibrary
        .map(
          (api) =>
            `<a class="api-library-card" href="#/apis/${esc(api.id)}"><div class="api-card-head">${apiLogo(api)}<span class="badge available"><i></i>Documentada</span></div><div><span class="eyebrow">DESARROLLADA POR ${esc(api.provider.toUpperCase())}</span><h2>${esc(api.name)}</h2><p>${esc(api.description)}</p></div><div class="api-card-meta"><span>${icon("database")}${apiEndpointCount(api)} endpoints</span><span>${icon("layers")}${api.groups.length} departamentos</span><span class="api-card-arrow">Ver documentación ${icon("arrow")}</span></div></a>`,
        )
        .join("")}</div></section>`;
  }
  function renderApiDocumentation(api) {
    const endpointCount = apiEndpointCount(api);
    main.innerHTML = `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/overview">Catálogo</a>${icon("chevron")}<a href="#/apis">Biblioteca de APIs</a>${icon("chevron")}<span>${esc(api.name)}</span></nav>
      <a class="back-link" href="#/apis">← Volver a la biblioteca</a>
      <div class="detail-heading api-detail-heading">${apiLogo(api, true)}<div><div class="eyebrow">API REST · ${esc(api.provider.toUpperCase())}</div><h1>${esc(api.name)}<span class="heading-dot">.</span></h1><p>${esc(api.description)}</p></div><span class="badge available"><i></i>Especificación disponible</span></div>
      <div class="api-summary-grid"><section class="panel api-overview"><h2>Resumen técnico</h2><dl><div><dt>Desarrollador</dt><dd>${esc(api.provider)}</dd></div><div><dt>URL base</dt><dd><span class="badge pending"><i></i>Por documentar</span></dd></div><div><dt>Autenticación</dt><dd><span class="badge pending"><i></i>Por documentar</span></dd></div><div><dt>Versionado</dt><dd>${esc(api.versioning)}</dd></div><div><dt>Frecuencia prevista</dt><dd>${esc(api.refreshFrequency)}</dd></div><div><dt>Endpoints</dt><dd>${endpointCount}</dd></div></dl></section><section class="panel api-document"><span class="stat-icon blue">${icon("folder")}</span><h2>Documento original</h2><p>Especificación recibida de ${esc(api.document.pages)} páginas. Se conserva junto al código para que la documentación no dependa de enlaces externos.</p><a class="document-link" href="${esc(api.document.url)}" target="_blank" rel="noopener">${icon("external")}Abrir ${esc(api.document.name)}</a></section></div>
      <section class="panel api-conventions"><h2>Convenciones generales</h2><div class="convention-grid">${api.conventions.map((item) => `<div>${icon("check")}<span>${esc(item)}</span></div>`).join("")}</div></section>
      <section class="api-reference"><div class="section-heading"><div><h2>Referencia de endpoints <span class="count-pill">${endpointCount}</span></h2><p>Campos publicados, columnas de origen, tipos y obligatoriedad.</p></div></div>${api.groups
        .map(
          (group) =>
            `<section class="api-group"><div class="api-group-heading"><div><span class="eyebrow">DEPARTAMENTO</span><h2>${esc(group.name)}</h2><p>${esc(group.scope)}</p></div><a href="#/${esc(group.departmentId)}">Ver departamento ${icon("arrow")}</a></div><div class="endpoint-list">${group.endpoints
              .map(
                (endpoint, index) =>
                  `<details class="endpoint-card"${index === 0 ? " open" : ""}><summary><span class="endpoint-icon">${icon("code")}</span><span><strong>${esc(endpoint.name)}</strong><small>Tabla de origen: ${esc(endpoint.sourceTable)}</small></span><span class="endpoint-field-count">${endpoint.fields.length} campos</span><span class="badge pending"><i></i>Ruta pendiente</span><span class="endpoint-chevron">⌄</span></summary><div class="endpoint-body"><p>${esc(endpoint.description)}</p>${endpoint.notes?.length ? `<div class="endpoint-notes">${endpoint.notes.map((note) => `<span>${icon("info")}${esc(note)}</span>`).join("")}</div>` : ""}<div class="schema-table-wrap"><table class="schema-table"><thead><tr><th>Campo API</th><th>Columna origen</th><th>Tipo</th><th>Obligatorio</th><th>Descripción y observaciones</th></tr></thead><tbody>${endpoint.fields
                    .map(
                      (fieldInfo) =>
                        `<tr><td><code>${esc(fieldInfo.name)}</code></td><td><code>${esc(fieldInfo.source)}</code></td><td>${esc(fieldInfo.type)}</td><td><span class="badge ${fieldInfo.required ? "available" : "neutral"}">${fieldInfo.required ? "Sí" : "No"}</span></td><td>${fieldInfo.description ? esc(fieldInfo.description) : '<span class="muted">Sin descripción adicional</span>'}${fieldInfo.note ? `<small class="field-note">${esc(fieldInfo.note)}</small>` : ""}</td></tr>`,
                    )
                    .join("")}</tbody></table></div></div></details>`,
              )
              .join("")}</div></section>`,
        )
        .join("")}</section>
      <div class="api-notes-grid"><section class="panel pending-panel"><span class="stat-icon yellow">${icon("clock")}</span><h2>Pendiente de completar</h2><ul>${api.unresolved.map((item) => `<li>${icon("clock")}<span>${esc(item)}</span></li>`).join("")}</ul></section><section class="panel"><span class="stat-icon blue">${icon("info")}</span><h2>Notas de alcance</h2><ul class="plain-notes">${api.notes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section></div>`;
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
      document.getElementById("api-nav").classList.add("active");
      document.getElementById("api-nav").setAttribute("aria-current", "page");
      document.title = `${api?.name || "Biblioteca de APIs"} · Atlas`;
      api ? renderApiDocumentation(api) : renderApiLibrary();
      return;
    }
    const d = departments.find((x) => x.id === route[0]);
    const source =
      d && route[1] === "fuente"
        ? sources.find((s) => s.id === route[2] && belongsToDepartment(s, d.id))
        : null;
    const service = d?.services.find((x) => x.id === route[1]);
    if (
      !d ||
      (route[1] && !service && !source) ||
      route.length > (source ? 3 : service ? 2 : 1)
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
    document.getElementById("overview-nav").classList.remove("active");
    document.getElementById("overview-nav").removeAttribute("aria-current");
    document.title = `${source?.name || service?.name || d.name} · Atlas`;
    source ? detail(d, source) : listing(d, service);
  }
  window.addEventListener("hashchange", () => {
    query = "";
    filter = "all";
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
