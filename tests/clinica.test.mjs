import test from 'node:test';
import assert from 'node:assert/strict';
import {crearRespuestas,filtrarEquipos,respuestasValidas,evento,puedeAnular} from '../src/clinica.ts';
import {PLANTILLAS_BASE} from '../src/store.ts';
const datos={propietarios:[{id:'p1',nombre:'Alejandra Gómez',rut:'12.345.678-5',correo:'demo@test.cl'}],plantillas:PLANTILLAS_BASE,equipos:[
 {id:'OT-AAA',propietarioId:'p1',marca:'HP',modelo:'Pavilion',estado:'registrado',servicio:'logica',serviciosSolicitados:['logica','fisica'],tecnicoId:null,historial:[]},
 {id:'OT-BBB',propietarioId:'p1',marca:'Lenovo',modelo:'IdeaPad',estado:'asignado',servicio:'fisica',serviciosSolicitados:['fisica'],tecnicoId:'al-01',historial:[]},
 {id:'OT-CCC',propietarioId:'p1',marca:'ASUS',modelo:'VivoBook',estado:'notificado',servicio:'logica',serviciosSolicitados:['logica'],tecnicoId:'al-02',historial:[]},
]};
test('filtro de profesor por nombre de cliente y RUT con o sin puntos',()=>{
 assert.equal(filtrarEquipos(datos,'Alejandra','todos').length,3);
 assert.equal(filtrarEquipos(datos,'12.345.678-5','todos').length,3);
 assert.equal(filtrarEquipos(datos,'123456785','todos').length,3);
 assert.equal(filtrarEquipos(datos,'5678','todos').length,3);
 assert.equal(filtrarEquipos(datos,'otra persona','todos').length,0);
});
test('filtros de cinco etapas agrupan estados correctamente',()=>{
 assert.equal(filtrarEquipos(datos,'','pendientes').length,1);
 assert.equal(filtrarEquipos(datos,'','en_atencion').length,1);
 assert.equal(filtrarEquipos(datos,'','listos').length,1);
 assert.equal(filtrarEquipos(datos,'','cerrados').length,0);
});
test('alumno puede seleccionar varios checklists distintos de lo pedido por cliente',()=>{
 const r=crearRespuestas(['formateo','fisica'],PLANTILLAS_BASE);
 assert.equal(r.length,PLANTILLAS_BASE.formateo.length+PLANTILLAS_BASE.fisica.length);
 assert.ok(r.some(x=>x.servicio==='formateo'));
 assert.ok(r.some(x=>x.servicio==='fisica'));
 assert.equal(r.some(x=>x.servicio==='logica'),false);
});
test('checklist exige Sí/No/No aplica y comentario mínimo por cada tarea',()=>{
 const r=crearRespuestas(['fisica'],PLANTILLAS_BASE);
 assert.equal(respuestasValidas(r),false);
 r.forEach((x,i)=>{x.resultado=['si','no','no_aplica'][i%3];x.observacion='Prueba realizada';});
 assert.equal(respuestasValidas(r),true);
 r[0].observacion='ok';assert.equal(respuestasValidas(r),false);
 r[0].observacion='Prueba realizada';r[1].resultado='';assert.equal(respuestasValidas(r),false);
});
test('eventos conservan la trazabilidad de un equipo',()=>{
 const original=datos.equipos[0];const nuevo=evento(original,'Recepción','Se asignó alumno','asignado',{tecnicoId:'al-01'});
 assert.equal(original.estado,'registrado');assert.equal(nuevo.estado,'asignado');assert.equal(nuevo.historial.length,1);
 assert.equal(nuevo.tecnicoId,'al-01');
});
test('un registro cerrado no se puede anular',()=>{
 assert.equal(puedeAnular(datos.equipos[0]),true);
 assert.equal(puedeAnular({...datos.equipos[0],estado:'entregado'}),false);
});
