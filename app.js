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
  const main = document.getElementById("main");
  let query = "",
    filter = "all",
    tab = "overview";
  let route;
  document.querySelector(".area-label span").textContent = String(
    departments.length,
  ).padStart(2, "0");
  document.getElementById("overview-nav").href = `#/${departments[0].id}`;
  document.querySelector(".brand").href = `#/${departments[0].id}`;
  document
    .querySelectorAll("[data-icon]")
    .forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
  document.getElementById("department-nav").innerHTML = departments
    .map(
      (d) =>
        `<a class="nav-item department" data-route="${esc(d.id)}" href="#/${esc(d.id)}">${icon("layers")}${esc(d.name)}<span class="nav-chevron">⌄</span></a><div class="service-nav">${d.services.map((s) => `<a href="#/${esc(d.id)}/${esc(s.id)}" data-route="${esc(s.id)}"><span class="service-dot ${esc(s.color)}"></span>${esc(s.name)}</a>`).join("")}</div>`,
    )
    .join("");
  function badge(s) {
    return s.api.status === "available"
      ? '<span class="badge available"><i></i>API disponible</span>'
      : '<span class="badge pending"><i></i>API por confirmar</span>';
  }
  function crumbs(d, service, source) {
    return `<nav class="breadcrumbs" aria-label="Ruta de navegación"><a href="#/${esc(d.id)}">Catálogo</a>${icon("chevron")}<a href="#/${esc(d.id)}">${esc(d.name)}</a>${service ? `${icon("chevron")}<span>${esc(service.name)}</span>` : ""}${source ? `${icon("chevron")}<span>${esc(source.name)}</span>` : ""}</nav>`;
  }
  function sourceLogo(source, large = false) {
    const size = large ? " large" : "";
    if (source.logo && source.logo.startsWith("assets/")) {
      return `<span class="source-logo image-logo${size}"><img src="${esc(source.logo)}" alt="Logotipo de ${esc(source.name)}"></span>`;
    }
    return `<span class="source-logo ${esc(source.color)}${size}">${esc(source.initials)}</span>`;
  }
  function sourceCard(s) {
    return `<a class="source-card" href="#/${esc(s.departmentId)}/fuente/${esc(s.id)}"><div class="source-card-top">${sourceLogo(s)}<span class="card-open">${icon("arrow")}</span></div><div class="source-name">${esc(s.name)}<span class="category">${esc(s.category)}</span></div><p>${esc(s.description)}</p><div class="data-labels">${s.datasets.map((x) => `<span>${icon(x.icon)}${esc(x.name)}</span>`).join("")}</div><div class="source-card-bottom">${badge(s)}<span>${s.datasets.length} conjuntos de datos</span></div></a>`;
  }
  function listing(d, service) {
    const scoped = sources.filter(
      (s) =>
        s.departmentId === d.id &&
        (!service || s.serviceIds.includes(service.id)),
    );
    main.innerHTML = `${crumbs(d, service)}<div class="page-heading"><div><div class="eyebrow">${service ? "SERVICIO · " + esc(d.name.toUpperCase()) : "TU DIRECTORIO DE CONOCIMIENTO"}</div><h1>${esc(service ? service.name : d.name)}<span class="heading-dot">.</span></h1><p>${esc(service ? service.description : d.description)}</p></div><span class="department-chip">${icon(service ? service.icon : "layers")}${service ? "Servicio" : "Departamento"}</span></div>
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
      ${!service ? `<section class="services-section"><div class="section-heading"><div><h2>Explora por servicio</h2><p>Cada servicio, su información en un mismo lugar.</p></div><span class="section-count">${d.services.length} servicios</span></div><div class="services">${d.services.map((s) => `<a class="service-card ${esc(s.color)}" href="#/${esc(d.id)}/${esc(s.id)}"><span class="service-art">${icon(s.icon)}</span><div><h3>${esc(s.name)}</h3><p>${sources.filter((x) => x.departmentId === d.id && x.serviceIds.includes(s.id)).length} fuentes asignadas</p></div><span class="service-arrow">${icon("arrow")}</span></a>`).join("")}</div></section>` : ""}
      <section class="sources-section"><div class="section-heading"><div><h2>${service ? "Fuentes del servicio" : "Fuentes de datos"} <span class="count-pill">${scoped.length}</span></h2><p>${service ? "Información vinculada específicamente a este servicio." : `Proveedores, integraciones y datos que forman parte de ${esc(d.name)}.`}</p></div><span class="section-kicker">EXPLORAR EL CATÁLOGO</span></div><div class="search-toolbar"><label class="search">${icon("search")}<input id="search" type="search" placeholder="Buscar fuente, dato o proveedor…" aria-label="Buscar fuentes de datos" value="${esc(query)}"><kbd>/</kbd></label><label class="filter">${icon("code")}<select id="api-filter" aria-label="Filtrar por disponibilidad de API"><option value="all">Todas las fuentes</option><option value="available">API disponible</option><option value="pending">API por confirmar</option></select></label></div><div id="source-results" class="source-grid" aria-live="polite"></div><div class="results-footer"><span id="result-count"></span><span>${icon("info")}Información en construcción</span></div></section>
      <div class="notice">${icon("info")}<div><strong>Un catálogo que crece contigo</strong><p>${service ? `Las fuentes de ${esc(d.name)} todavía no se han asignado a los servicios. Consulta el departamento para ver la información disponible.` : `Las fuentes están registradas a nivel de ${esc(d.name)}. Su relación con los servicios está pendiente de confirmar.`}</p></div>${service ? `<a href="#/${esc(d.id)}">Ver ${esc(d.name)} ${icon("arrow")}</a>` : '<span class="notice-tag">PRIMERA VERSIÓN</span>'}</div>`;
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
        ? results.map(sourceCard).join("")
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
    main.innerHTML = `${crumbs(d, null, s)}<a class="back-link" href="#/${esc(d.id)}">← Volver a las fuentes</a><div class="detail-heading">${sourceLogo(s, true)}<div><div class="eyebrow">FUENTE DE DATOS · ${esc(d.name.toUpperCase())}</div><h1>${esc(s.name)}<span class="heading-dot">.</span></h1><p>${esc(s.description)}</p></div>${badge(s)}</div><div class="tabs" role="tablist" aria-label="Información de la fuente">${[
      ["overview", "Información general"],
      ["data", "Conjuntos de datos"],
      ["access", "API y accesos"],
    ]
      .map(
        ([id, label]) =>
          `<button role="tab" id="tab-${id}" aria-controls="detail-panel" aria-selected="${tab === id}" tabindex="${tab === id ? "0" : "-1"}" data-tab="${id}">${label}${id === "data" ? `<span>${s.datasets.length}</span>` : ""}</button>`,
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
        el.innerHTML = `<div class="detail-columns"><section class="panel"><h2>Acerca de esta fuente</h2><p>${esc(s.description)}</p><dl><div><dt>Departamento</dt><dd>${esc(d.name)}</dd></div><div><dt>Servicio</dt><dd>${s.serviceIds.length ? esc(s.serviceIds.map((id) => d.services.find((v) => v.id === id)?.name || id).join(", ")) : "Pendiente de asignar"}</dd></div><div><dt>Tipo de información</dt><dd>${esc(s.category)}</dd></div><div><dt>Responsable</dt><dd>${esc(s.owner || "Por documentar")}</dd></div><div><dt>Disponibilidad de API</dt><dd>${badge(s)}</dd></div></dl></section><section class="panel pending-panel"><span class="stat-icon yellow">${icon("tasks")}</span><h2>Por completar</h2><p>Próximos pasos para conectar esta fuente.</p><ul>${s.pending.map((p) => `<li>${icon("clock")}<span>${esc(p)}</span></li>`).join("")}</ul><div class="small-note">La información pendiente no implica que el recurso no exista.</div></section></div>`;
      if (tab === "data")
        el.innerHTML = `<section class="panel"><h2>Conjuntos de datos</h2><p>Información identificada en esta fuente. El esquema, formato y frecuencia de actualización están pendientes de documentar.</p>${s.datasets.map((x) => `<div class="dataset-row"><span class="stat-icon blue">${icon(x.icon)}</span><div><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p></div><span class="badge neutral">Esquema pendiente</span></div>`).join("")}</section>`;
      if (tab === "access")
        el.innerHTML = `<section class="panel"><h2>API y puntos de acceso</h2><p>Accesos directos a la documentación, repositorios y ubicación de los datos.</p>${accessItem("API", s.api.url, s.api.note, "code")}${accessItem("Portal del proveedor", s.website, "Dirección del portal pendiente de documentar.", "external")}${accessItem("Repositorio", s.repository, "Repositorio y permisos pendientes de documentar.", "folder")}${accessItem("Ubicación de los datos", s.storage, "Almacenamiento y condiciones de acceso pendientes de documentar.", "database")}</section><div class="notice">${icon("info")}<div><strong>Acceso seguro</strong><p>Documenta el procedimiento para solicitar permisos. No guardes contraseñas, tokens ni claves en el catálogo.</p></div></div>`;
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
  function render() {
    route = location.hash.replace(/^#\/?/, "").split("/");
    const d =
      departments.find((x) => x.id === route[0]) ||
      (!route[0] ? departments[0] : null);
    const source =
      d && route[1] === "fuente"
        ? sources.find((s) => s.id === route[2] && s.departmentId === d.id)
        : null;
    const service = d?.services.find((x) => x.id === route[1]);
    if (
      !d ||
      (route[1] && !service && !source) ||
      route.length > (source ? 3 : service ? 2 : 1)
    ) {
      main.innerHTML = `<div class="empty"><h1>Página no encontrada</h1><p>Esta ruta no pertenece al catálogo.</p><a href="#/${esc(departments[0].id)}" class="text-button">Volver al catálogo</a></div>`;
      return;
    }
    document.querySelectorAll("[data-route]").forEach((el) => {
      const selected = el.dataset.route === (service?.id || d.id);
      el.classList.toggle("active", selected);
      if (selected) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
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
  render();
})();
