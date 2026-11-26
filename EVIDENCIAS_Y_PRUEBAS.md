# Plan de pruebas y evidencias — Clínica PC v6

**No rellenar resultados sin ejecutar las pruebas.** Marca el resultado real y adjunta captura fechada.

| Prueba | Acción | Resultado esperado | Resultado real | Evidencia |
|---|---|---|---|---|
| P01 | Login profesor correcto | Dashboard de profesor | Pendiente | Captura |
| P02 | Login recepcionista correcto | Dashboard de recepción | Pendiente | Captura |
| P03 | Login alumno correcto | Solo órdenes asignadas | Pendiente | Captura |
| P04 | Contraseña errónea | No permite ingreso | Pendiente | Captura |
| P05 | Registrar equipo por formulario público | Solicitud y orden generadas | Pendiente | Captura |
| P06 | Marcar 2 servicios solicitados | Se registran ambos | Pendiente | Captura |
| P07 | Registro presencial | No aparece casilla de consentimiento público, sí aviso | Pendiente | Captura |
| P08 | Mostrar código QR | Enlace QR a formulario; probar en entorno accesible | Pendiente | Captura |
| P09 | Recepcionar y asignar alumno | Orden aparece en su cuenta | Pendiente | Captura |
| P10 | Buscar cliente por RUT sin puntos | Encuentra orden registrada | Pendiente | Captura |
| P11 | Alumno cambia selección de checklist | Guarda actividades elegidas | Pendiente | Captura |
| P12 | Checklist incompleto | No permite finalizar | Pendiente | Captura |
| P13 | Cada paso con Sí/No/No aplica y nota | Permite finalizar con todo completo | Pendiente | Captura |
| P14 | Aviso y encuesta del alumno | Genera borrador; no envía correo real | Pendiente | Captura |
| P15 | Profesor confirma prueba y entrega | Estado entregado e historial actualizado | Pendiente | Captura |
| P16 | Anulación con motivo | Conserva registro anulado | Pendiente | Captura |
| P17 | Encuesta por enlace simulado | Se registra respuesta local | Pendiente | Captura |

## Pruebas técnicas ejecutables

`npm test` para validaciones de lógica; `npm run build` para compilar en un equipo con dependencias instaladas.

## Evidencias recomendadas

- Capturas del formulario público, el QR y el registro presencial.
- Tres capturas de login con cada uno de los roles y permisos visibles.
- Checklist con sus tres tipos de respuesta y observaciones por tarea.
- Filtro de nombre y RUT, antes/después de buscar.
- Pantalla de borrador de aviso y encuesta; no afirmar que se envió correo.
- Relación RF → componente (`FormRegistro`, `QrRegistro`, `App` panel por rol, `clinica.ts`) → caso de prueba → evidencia.

## Nuevos casos de prueba v6

| Prueba | Acción | Resultado esperado | Resultado real |
|---|---|---|---|
| P18 | Registro presencial con alumno seleccionado | Orden asignada sin buscar ficha | Pendiente de prueba visual |
| P19 | Registrar dos equipos con distintos técnicos | Cada orden tiene su alumno | Pendiente de prueba visual |
| P20 | Registro público, Recibir y asignar en tabla | Orden asignada e historial de recepción | Pendiente de prueba visual |
| P21 | Iniciar mantenimiento | Seis tareas básicas disponibles | Pendiente de prueba visual |
| P22 | Agregar actividad con Enter | Nueva fila al final con Sí/No/N/A y observación | Pendiente de prueba visual |
| P23 | Seleccionar/desmarcar especialidades | Se preservan básicos y personalizados | Pendiente de prueba visual |
| P24 | Editar/quitar tarea personalizada | Actualización solo de la orden | Pendiente de prueba visual |
| P25 | Guardar y volver; abrir ficha | Respuestas conservadas | Pendiente de prueba visual |
| P26 | Simular contacto WhatsApp o correo | Evento en historial, sin envío | Pendiente de prueba visual |
| P27 | Simular aviso de retiro | Aviso local, encuesta e historial, sin envío real | Pendiente de prueba visual |
| P28 | Profesor consulta ficha e historial | Tareas personalizadas visibles | Pendiente de prueba visual |

## Verificación técnica de esta entrega

- 31 pruebas unitarias correctas (incluye 9 nuevas en `tests/v6.test.mjs`).
- `tsc -b`: sin errores con las declaraciones reales de React, TypeScript y Vite del ZIP de origen.
- Compilación Vite pendiente: las dependencias nativas del ZIP de origen son para Windows, y faltan los binarios Linux en el entorno de revisión.
- Prueba visual de navegador pendiente: las políticas del navegador del entorno impidieron abrir la dirección local de prueba. No se afirma que el recorrido completo haya sido comprobado visualmente.
