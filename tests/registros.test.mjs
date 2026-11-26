import test from 'node:test';
import assert from 'node:assert/strict';
import {puedeAnular, puedeEditar, anularOrden} from '../src/registros.ts';
const base={id:'OT-A',estado:'registrado',historial:[{fecha:'2026-11-19',actor:'Inscripción',descripcion:'Registro creado'}],marca:'HP'};
test('editar solo antes de la asignación y anular hasta antes de comenzar',()=>{
 for(const s of ['registrado','recepcionado']) {assert.equal(puedeEditar(s),true);assert.equal(puedeAnular(s),true);}
 assert.equal(puedeEditar('asignado'),false);assert.equal(puedeAnular('asignado'),true);
 for(const s of ['en_mantenimiento','revision','listo','notificado','entregado','anulado'])assert.equal(puedeAnular(s),false);
});
test('anulación conserva la orden, información previa y el motivo de auditoría',()=>{
 const x=anularOrden(base,'Solicitud duplicada','Profesor administrador','2026-11-19T20:00:00.000Z');
 assert.equal(x.estado,'anulado');assert.equal(x.marca,'HP');assert.equal(x.historial.length,2);
 assert.match(x.historial[1].descripcion,/Solicitud duplicada/);
 assert.equal(x.historial[1].actor,'Profesor administrador');assert.equal(base.estado,'registrado');
});
test('se requiere motivo y no se puede anular una atención finalizada',()=>{
 assert.throws(()=>anularOrden(base,'corto','Profesor','hoy'));
 assert.throws(()=>anularOrden({...base,estado:'entregado'},'Duplicado por error','Profesor','hoy'));
});
