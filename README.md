# Atlas · Catálogo de datos

Portal estático en español para consultar los datos utilizados y generados por la empresa. Incluye los departamentos **Moxsi**, **Aparcamientos** y **S.E.R.**, además de una biblioteca de documentación de APIs. Moxsi se organiza en los subtipos **Sítycleta Mecánica**, **Sítycleta Eléctrica** y **Sítyneta — Patinetes Eléctricos**.

La barra superior permite elegir entre modo claro y modo oscuro. La preferencia se conserva en el navegador; en la primera visita se respeta la configuración del sistema.

## Abrir el portal

Abre `index.html` directamente en el navegador. No necesita instalación, compilación, base de datos ni credenciales.

También puedes servirlo por HTTP:

```bash
cd /workspace/data-catalog
python3 -m http.server 8000
```

Las tipografías se solicitan a Google Fonts; si no hay conexión se usan las fuentes locales de reserva. La funcionalidad del catálogo no depende de servicios externos.

## Organización

- `index.html`: estructura y navegación principal.
- `styles.css`: diseño adaptable y colores corporativos.
- `catalog-data.js`: departamentos, servicios y fuentes; punto de entrada para ampliar el catálogo.
- `api-library.js`: documentación estructurada de APIs, endpoints y esquemas.
- `app.js`: navegación por rutas hash, búsqueda, filtros y fichas con pestañas.
- `docs/`: documentos técnicos originales enlazados desde la biblioteca.

## Añadir información

1. Añade un departamento con un `id` único y sus `services` a `CATALOG.departments`.
2. Añade fuentes a `CATALOG.sources`, vinculadas mediante `departmentId`.
3. Usa `serviceIds` para asociar una fuente a uno o varios servicios del departamento. Un array vacío indica que aún no hay asignación confirmada.
4. Documenta sus `datasets`, el estado de la API (`available` o `pending`), responsable, tareas pendientes y enlaces. Los campos `api.url`, `website`, `repository` y `storage` admiten URLs HTTP/HTTPS o `null` para información pendiente.

El menú, la vista general y las fichas se generan desde los datos. La portada `#/overview` ofrece acceso directo a todos los departamentos y a la biblioteca de APIs. Las rutas de contenido siguen `#/departamento`, `#/departamento/servicio` y `#/departamento/fuente/id`. La búsqueda abarca nombres, categorías, descripciones y conjuntos de datos, sin distinguir mayúsculas o acentos.

## Información inicial

**4gflota:** geolocalización de vehículos y batería (Docubi). Consultar con Javi la disponibilidad de API.

**qucit:** evaluación del desempeño y tareas del equipo de logística en calle. Tiene API; URL y autenticación pendientes de documentar.

**Nextbike:** once consultas operativas de Sítycleta traducidas al español, con acceso directo a cada consulta del portal de Nextbike.

**Google Sheets de Moxsi:** VMP para revisar, control de almacén, inventario VMP histórico e incidencias anuales. Cada ficha incluye accesos directos y un histórico de responsabilidades con periodos confirmados o pendientes.

**API SAGULPA:** API desarrollada por Kubo y compartida por Moxsi, Aparcamientos y S.E.R. La biblioteca documenta sus once endpoints, campos, tipos, convenciones y asuntos pendientes. El PDF original se conserva en `docs/API Sagulpa.pdf`.

Las dos fuentes pertenecen a Moxsi. No se presupone su relación con Sítycleta o Sítyneta. No se han inventado URLs, responsables, repositorios, esquemas ni ubicaciones.

## Alcance

Esta versión es un catálogo de consulta: no conecta con las API, no descarga datos y no ofrece edición desde el navegador. Los cambios se realizan en el archivo de datos. «Uso interno» es una etiqueta, no un mecanismo de autenticación; si el contenido es privado, sirve el portal detrás del control de acceso corporativo. Nunca guardes claves o tokens en los archivos estáticos.

Los colores corporativos se centralizan en las variables CSS `--primary`, `--orange`, `--yellow` y `--green`. Para modificar el nombre del portal, edita la marca y el título en `index.html` y los títulos en `app.js`.
