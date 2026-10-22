# Atlas · Catálogo de datos

Portal estático en español para consultar las fuentes de datos utilizadas y generadas por SAGULPA. El catálogo reúne **16 áreas**, **80 registros del inventario del Plan de Implantación de IA**, las fuentes operativas de Moxsi y una biblioteca de APIs. Moxsi se organiza en **Sítycleta Mecánica**, **Sítycleta Eléctrica** y **Sítyneta — Patinetes Eléctricos**.

La interfaz ofrece navegación por capas, búsqueda, modo claro y oscuro y filtros de gobierno del dato. La preferencia de tema se conserva en el navegador.

## Abrir el portal

Abre `index.html` directamente en el navegador. No necesita instalación, compilación, base de datos ni credenciales.

También puedes servirlo por HTTP:

```bash
cd /workspace/data-catalog
python3 -m http.server 8000
```

Después abre `http://localhost:8000`. Las tipografías se solicitan a Google Fonts; si no hay conexión se usan fuentes locales de reserva. La funcionalidad del catálogo no depende de servicios externos.

## Contenido

- **Vista general:** accesos directos a las 16 áreas, la Biblioteca de APIs y el Plan de IA.
- **Áreas:** fuentes propias y compartidas, búsqueda y filtros por formato o vía de acceso, frecuencia, histórico, calidad, datos personales, categoría RGPD, clasificación y criticidad.
- **Fichas de fuente:** datos aportados, casos de uso, acceso, gobierno, bloqueos y porcentaje de documentación. Los campos pendientes aparecen como **Por completar**.
- **Plan de IA:** 20 casos de uso, 18 gaps y peticiones, criterios de calidad, sensibilidad y reglas del conjunto mínimo viable.
- **Biblioteca de APIs:** documentación técnica de la API SAGULPA desarrollada por Kubo, compartida por Moxsi, Aparcamientos y S.E.R.

Las áreas actuales son Moxsi, Aparcamientos, S.E.R., Centro de Incidencias Operativas, Movilidad y Tráfico, Oficina del Dato, Financiero, Personas y Talento, Sistemas, Jurídico, Técnico, Seguridad, Salud y Calidad, Financiación Externa, Sostenibilidad y Energía, Atención y Transversal.

## Organización

- `index.html`: estructura y navegación principal.
- `styles.css`: diseño adaptable, temas y colores corporativos.
- `catalog-data.js`: áreas, servicios y fuentes operativas.
- `inventory-data.js`: inventario completo generado a partir del Excel.
- `api-library.js`: documentación estructurada de APIs, endpoints y esquemas.
- `app.js`: navegación, búsqueda, filtros, fichas y panel del Plan de IA.
- `scripts/import_inventory.py`: importador reproducible del Excel al catálogo.
- `docs/SAGULPA_inventario-fuentes-datos-minimos_revYSS1310.xlsx`: inventario original conservado como referencia.
- `docs/API Sagulpa.pdf`: documentación técnica original de la API SAGULPA.

## Actualizar el inventario desde Excel

El archivo `inventory-data.js` es generado y no debe editarse a mano. Para incorporar una nueva revisión del libro:

```bash
python3 scripts/import_inventory.py ruta/al/inventario.xlsx inventory-data.js
```

El importador lee las cuatro hojas del libro: mapa de casos y fuentes, inventario, gaps y peticiones, y criterios y leyenda. Valida que cada área del Excel tenga una correspondencia en el catálogo y calcula la completitud de cada fuente.

## Añadir información manual

1. Añade un área con un `id` único y sus `services` a `CATALOG.departments`. Se conserva ese nombre interno por compatibilidad con las rutas y los datos existentes.
2. Añade fuentes operativas a `CATALOG.sources`, vinculadas mediante `departmentId`.
3. Usa `serviceIds` para asociar una fuente a uno o varios servicios del área. Un array vacío indica que no tiene subtipo o que la asignación está pendiente.
4. Documenta sus conjuntos de datos, acceso, responsable, tareas pendientes y enlaces. Los campos `api.url`, `website`, `repository` y `storage` admiten URLs HTTP/HTTPS o `null`.

La portada está en `#/overview`; las áreas usan `#/id-area`; las fichas, `#/id-area/fuente/id`; la biblioteca, `#/apis`; y el inventario transversal, `#/plan-ia`.

## Fuentes operativas iniciales

- **4gflota:** geolocalización de vehículos y batería Docubi; API pendiente de confirmar.
- **qucit:** evaluación del desempeño y tareas del equipo de logística en calle; API disponible con detalles por documentar.
- **Nextbike:** once consultas operativas traducidas al español, cada una con acceso directo.
- **Google Sheets de Moxsi:** VMP para revisar, control de almacén, inventario VMP histórico e incidencias anuales, con accesos e histórico de responsabilidades.
- **API SAGULPA:** once endpoints, campos, tipos, convenciones y asuntos pendientes extraídos de su PDF.

## Alcance y privacidad

Esta versión es un catálogo de consulta: no conecta con las APIs, no descarga datos y no permite editar desde el navegador. «Uso interno» es una etiqueta y no un mecanismo de autenticación. Si el contenido debe mantenerse privado, sirve el portal detrás del acceso corporativo y no guardes claves ni tokens en los archivos estáticos.

Los colores corporativos se centralizan en las variables CSS `--primary`, `--orange`, `--yellow` y `--green`.
