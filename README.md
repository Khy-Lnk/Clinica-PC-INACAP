# Clínica del PC — INACAP · Prototipo frontend (v6)

Proyecto académico desarrollado con **React 19, TypeScript y Vite**. Identidad visual negro/rojo/blanco. Continuación de la v5 entregada: tres roles con inicio de sesión, asignación directa, checklist básico extensible y comunicaciones de demostración. No incorpora backend ni requiere servicios externos para sus flujos locales.

## Requisitos y cómo ejecutar

- Node.js 20.19+ o 22.12+ (compatible con Vite 6; recomendado Node 22).
- VS Code y navegador actualizado.
- Descomprimir el ZIP, abrir **la carpeta `clinica-pc-inacap`** (la que contiene `package.json`) y ejecutar:

```powershell
npm install
npm run dev
```

Abrir la dirección local que muestre la terminal, normalmente `http://127.0.0.1:5173/`.

Para pruebas automáticas, ejecutar `npm test`. Para comprobar el bundle localmente, `npm run build`.

**IMPORTANTE:** el login, almacenamiento, roles, notificaciones y encuesta son *simulados* porque este proyecto es solo frontend. No debe utilizarse con datos reales de clientes. Todo lo que se introduce se almacena en el `localStorage` del navegador; una URL distinta, otro navegador o un teléfono **no comparten datos** con este equipo.

## Credenciales de demostración

| Rol | Usuario | Contraseña de demostración |
|---|---|---|
| Profesor / Administrador | `profesor@demo.local` | `ClinicaDemo2026!` |
| Recepcionista | `recepcion@demo.local` | `RecepcionDemo2026!` |
| Alumna 1 (Alexandra) | `al-01` | `AlumnoDemo01!` |
| Alumno 2 (Alejandro) | `al-02` | `AlumnoDemo02!` |
| Alumno 3 (Alexis) | `al-03` | `AlumnoDemo03!` |
| Alumna 4 (Camila) | `al-04` | `AlumnoDemo04!` |
| Alumno 5 (Matías) | `al-05` | `AlumnoDemo05!` |
| Alumna 6 (Fernanda) | `al-06` | `AlumnoDemo06!` |

Un **único formulario de login** detecta el rol a partir de las credenciales. No hay botones de ingreso automático por perfil. Las claves están visibles en el código porque es una demostración; **no es autenticación real segura**.

## Vistas y funcionalidades nuevas

### Público / Propietario
- Formulario público abierto desde la página principal o desde el enlace `/?registro=1` (el destino del QR).
- RUT verificado con dígito módulo 11, teléfono y correo validado.
- **Múltiples mantenimientos simultáneos** por equipo, mediante *checkboxes* (Formateo, lógica, física).
- Permite registrar varios equipos en una sesión, generando una orden por equipo.
- La casilla de consentimiento informativo aparece solo en el **formulario público** (para esta demostración académica), sin autorizar por sí sola intervenciones técnicas ni acceso a archivos privados.
- Consulta de estado por RUT y código de orden.
- Encuesta de satisfacción pública de prueba mediante enlace con token (sin identidad del propietario); el enlace funciona únicamente donde exista el registro local.

### Recepcionista
- **Login de recepcionista** con pantalla propia.
- **Mostrar QR**: genera una imagen QR real en el navegador que dirige a `/?registro=1`, además de copiar enlace e imprimir.
- **Registro presencial** manual sin casilla pública de aceptación. Contiene aviso para explicar que se debe informar al propietario y documentar las autorizaciones adecuadas; la falta de casilla **no elimina** obligaciones sobre los datos personales.
- Búsqueda de cliente por nombre y RUT, incluso con o sin puntos/guion, y cinco filtros agrupados por estado.
- Asigna un estudiante **en el mismo registro presencial**, por equipo, o registra sin asignar. Si la inscripción fue pública, usa **Recibir y asignar** directamente en la tabla y confirma la entrega física. También se conserva la ficha completa. Los equipos nuevos aparecen primero.
- La recepcionista no tiene acceso a cambiar checklists del alumno ni a anular registros por su cuenta.

### Estudiante
- **Login del estudiante** con identificador y contraseña ficticios.
- Solo ve las órdenes que tienen su identificador como técnico asignado; no ve RUT, teléfono ni correo del propietario directamente en su panel. Las acciones externas de contacto preparan el destinatario en el programa elegido, por lo que podrían revelar su número o correo.
- Registra **observación inicial con lo que relató el cliente** antes de comenzar.
- Al iniciar, carga un **checklist básico de seis verificaciones**. Puede seleccionar checklists especializados opcionales según su diagnóstico, independientemente de lo solicitado. Las pestañas Mis equipos, Ficha y checklist e Historial organizan el trabajo.
- Botón **Agregar actividad** debajo del checklist: escribe el texto y pulsa Enter o el botón. La nueva actividad se agrega al final con Sí / No / N/A y observación. Puede editar o eliminar las actividades personalizadas antes de finalizar. La edición del título reinicia la evaluación de ese punto; no modifica las plantillas generales.
- El guardado de cada respuesta se realiza localmente. Guardar y volver permite continuar posteriormente.
- Cada actividad del checklist tiene: `Sí`, `No` o `N/A` y una **observación obligatoria de al menos 5 caracteres**.
- Informe final obligatorio de al menos 15 caracteres: realizado, pendiente y recomendaciones.
- Puede preparar consultas de WhatsApp o correo, copiar el borrador y registrar el contacto simulado. Opcionalmente, abrir un compositor externo con texto preparado exige confirmación y no envía automáticamente. Durante la evaluación utiliza la simulación y no direcciones o números reales. No solicitar contraseñas por estos canales.
- Finaliza las actividades y puede **registrar notificación al propietario**. Se crea el *borrador* de un aviso y el **enlace de encuesta**; **no se envían emails**. Si no se registró correo, el sistema muestra que se requiere otra vía de contacto.

### Profesor / Administrador
- **Login de profesor** y dashboard distinto del de recepción.
- Búsqueda de **clientes por nombre o RUT**; también por código, marca y modelo.
- Muestra información del propietario, servicios solicitados, estudiante y resultados de los checklists con observaciones por paso.
- Puede registrar inscripciones presenciales, gestionar plantillas de checklist configurables, ver alumnos y avisos simulados.
- Puede corregir modelo/serie antes de asignar, y anular orden con motivo e historial (no borrar información de intervenciones).
- Confirma la prueba conjunta con el propietario y el cierre de una orden notificada.

## Flujo de demostración recomendado

1. Inicia sesión como `recepcion@demo.local`; ve a **Registro presencial** y usa **datos ficticios**, por ejemplo RUT `12.345.678-5`.
2. Registra un notebook HP y marca **mantención lógica y física**. Guarda su número de orden.
3. En el mismo formulario, escribe `ale` en la sección de asignación y elige **Alexandra Durán**. Pulsa **Registrar y asignar equipos**. No es necesario volver a buscar la ficha.
4. Cierra sesión; ingresa como `al-01` con `AlumnoDemo01!`.
5. En **Mis equipos**, abre la orden. Registra lo que relata el cliente, presiona **Iniciar mantenimiento**.
6. Comprueba los seis puntos básicos. Selecciona opcionalmente checklists adicionales y agrega una actividad propia al final, por ejemplo, «Se realizó limpieza de ventiladores».
7. En cada punto marca **Sí**, **No** o **N/A** y añade una observación breve. Escribe una observación final y finaliza.
8. Presiona **Simular aviso de equipo listo**. Copia el enlace creado; si el registro tiene correo se muestra el destinatario en el panel del profesor.
9. Ingresa como profesor. En **Avisos y encuestas** verifica el aviso simulado, luego en **Dispositivos** busca el nombre o RUT del cliente, confirma la prueba conjunta y entrega el equipo.
10. Abre el enlace de encuesta en **el mismo navegador/origen**, completa el formulario y comprueba que aparece registrada la respuesta.

## QR: qué demuestra y qué falta en producción

El QR contiene una URL estándar de navegador. Se calcula al abrir la vista de recepcionista, sin depender de servicios externos. En un despliegue público, el QR de esa URL enviaría al cliente al mismo formulario. En el proyecto local, una URL que contenga `localhost` o `127.0.0.1` **no abrirá la página en otro móvil** (ese destino apunta al propio celular). Y aunque se abra mediante otra dirección, el frontend **no sincroniza las solicitudes entre dispositivos**. Por eso la demostración integral debe hacerse en el mismo navegador, o con un backend real más adelante.

## Cambios de datos respecto de las versiones anteriores

Se conserva la clave de almacenamiento **`clinica-pc-demo-v2`** para leer los registros de la versión 4 en el mismo navegador/origen. El código aplica una migración en memoria a la nueva estructura: `serviciosSolicitados`, `serviciosTecnicos`, respuestas por ítem, observación inicial y simulación de correo. Se conserva el acceso de los tres roles y los datos de la v5. Los equipos que ya estén en mantenimiento y no tengan checklist básico reciben los seis puntos nuevos al cargarse; las órdenes finalizadas no se modifican.

**Sugerencia de respaldo:** Antes de actualizar, si tienes datos de prueba que no quieres perder, conserva el ZIP anterior. No borres datos del sitio en el navegador.

## Pruebas y seguridad

En esta entrega: **31 pruebas unitarias aprobadas** con Node 22 y comprobación real de TypeScript (`tsc -b`) aprobada utilizando las dependencias del ZIP. El build completo de Vite no se pudo comprobar en este entorno Linux porque el ZIP de origen contiene binarios nativos para Windows. La ejecución gráfica también quedó pendiente por las restricciones del navegador del entorno. Ejecutar `npm install`, `npm run build` y `npm run dev` en el computador de la evaluación.

Ejecutar `npm test`. Se validan los tres roles, error de contraseña, filtro por RUT, agrupación de estados, checklists independientes, validaciones por paso, control de anulación, RUT módulo 11 y códigos de atención. Agregar capturas y resultados al informe; los tests no reemplazan la prueba manual del navegador.

**Limitaciones de seguridad:** al ser una aplicación sin servidor, las claves son públicas en el bundle, el control de acceso es solo visual, cualquiera con herramientas del navegador puede leer/alterar `localStorage`, no hay auditoría inmutable, envío real de correos ni autorización segura. No se puede demostrar el cumplimiento de OWASP, ISO 27001 ni de la legislación únicamente por simular estas pantallas. Para producción se requerirían backend y base de datos, control de acceso y sesiones en el servidor, cifrado de comunicaciones, protección y retención de datos, consentimiento/base legal adecuada y servicio de correo.

## Dependencias

React, React DOM, Vite, TypeScript. Generador QR local basado en QRCode for JavaScript (Kazuhiko Arase, MIT), incluido en `public/qr-engine.js`; ver archivos de licencias QR.
