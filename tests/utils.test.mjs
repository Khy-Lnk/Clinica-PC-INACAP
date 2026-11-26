import test from 'node:test';
import assert from 'node:assert/strict';
import { limpiarRut, rutValido, formatearRut } from '../src/rut.ts';
import { generarCodigo, PLANTILLAS_BASE } from '../src/store.ts';

test('RUT chileno: acepta dígito verificador correcto', () => {
  assert.equal(rutValido('12.345.678-5'), true);
  assert.equal(rutValido('12345678-5'), true);
});
test('RUT chileno: rechaza dígito verificador incorrecto y entrada vacía', () => {
  assert.equal(rutValido('12.345.678-9'), false);
  assert.equal(rutValido(''), false);
  assert.equal(rutValido('abc'), false);
});
test('RUT: normalización y presentación', () => {
  assert.equal(limpiarRut('12.345.678-5'), '123456785');
  assert.equal(formatearRut('123456785'), '12.345.678-5');
});
test('Cada orden recibe un código identificable', () => {
  const a = generarCodigo();
  const b = generarCodigo();
  assert.match(a, /^OT-[0-9A-F]{12}$/);
  assert.notEqual(a,b);
});
test('Los tres servicios tienen checklists iniciales', () => {
  assert.ok(PLANTILLAS_BASE.formateo.length >= 3);
  assert.ok(PLANTILLAS_BASE.logica.length >= 3);
  assert.ok(PLANTILLAS_BASE.fisica.length >= 3);
});
