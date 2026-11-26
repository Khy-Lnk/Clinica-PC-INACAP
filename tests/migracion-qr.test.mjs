import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {leerDatos,DATA_KEY} from '../src/store.ts';
test('la v5 puede leer una orden antigua de v4 y agrega campos nuevos sin perder datos',()=>{
  const previo={propietarios:[{id:'p-1',nombre:'Persona Demo',rut:'12.345.678-5',correo:'demo@example.local',telefono:'912345678',consentimiento:true,registradoEn:'2026-11-19'}],equipos:[{id:'OT-01',propietarioId:'p-1',tipo:'notebook',marca:'HP',modelo:'Pavilion',serie:'',servicio:'logica',detalle:'Falla',estado:'registrado',creadoEn:'2026-11-19',tecnicoId:null,checklist:[],completadas:[],observaciones:'',historial:[]}],plantillas:{formateo:['Formatear'],logica:['Revisar'],fisica:['Limpiar']}};
  const before=globalThis.localStorage;
  globalThis.localStorage={getItem:key=>key===DATA_KEY?JSON.stringify(previo):null};
  try{const d=leerDatos();assert.equal(d.equipos[0].id,'OT-01');assert.equal(d.equipos[0].marca,'HP');assert.deepEqual(d.equipos[0].serviciosSolicitados,['logica']);assert.deepEqual(d.equipos[0].respuestas,[]);assert.equal(d.propietarios[0].origenRegistro,'publico');}
  finally{globalThis.localStorage=before;}
});
test('el generador de QR crea una matriz bidimensional scaneable para el enlace',()=>{
 const context={window:{}};vm.createContext(context);
 vm.runInContext(fs.readFileSync('public/qr-engine.js','utf8'),context);
 const matriz=context.window.ClinicaQr.make('https://clinica-demo.example/?registro=1');
 assert.ok(matriz.length>=21);
 assert.equal(matriz.every(r=>r.length===matriz.length),true);
 assert.equal(typeof matriz[0][0],'boolean');
});
