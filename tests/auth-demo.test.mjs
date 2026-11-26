import test from 'node:test';
import assert from 'node:assert/strict';
import {autenticar, CUENTAS_DEMO} from '../src/auth-demo.ts';
test('tres roles con una sola pantalla de login',async()=>{
 assert.equal((await autenticar('profesor@demo.local','ClinicaDemo2026!')).rol,'profesor');
 assert.equal((await autenticar('recepcion@demo.local','RecepcionDemo2026!')).rol,'recepcionista');
 assert.equal((await autenticar('al-01','AlumnoDemo01!')).rol,'alumno');
});
test('no se concede rol sin credenciales',async()=>{
 await assert.rejects(autenticar('profesor@demo.local','clave-incorrecta'));
 await assert.rejects(autenticar('al-01','AlumnoDemo02!'));
 await assert.rejects(autenticar('al-99','AlumnoDemo01!'));
});
test('estudiantes ficticios tienen claves de demostración individualizadas',()=>{
 const estudiantes=CUENTAS_DEMO.filter(x=>x.rol==='alumno');
 assert.equal(new Set(estudiantes.map(x=>x.clave)).size,estudiantes.length);
});
