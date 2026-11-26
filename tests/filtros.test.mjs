import test from 'node:test';
import assert from 'node:assert/strict';
import {FILTROS_DISPOSITIVOS, coincideFiltroEstado,contarPorFiltro} from '../src/filtros.ts';
const estados=['registrado','recepcionado','asignado','en_mantenimiento','revision','listo','notificado','entregado','anulado'];
test('la interfaz utiliza cinco categorías',()=>{assert.deepEqual(FILTROS_DISPOSITIVOS.map(x=>x.id),['todos','pendientes','en_atencion','listos','cerrados']);});
test('estados incluidos por categoría',()=>{assert.equal(contarPorFiltro(estados,'todos'),9);assert.equal(contarPorFiltro(estados,'pendientes'),2);assert.equal(contarPorFiltro(estados,'en_atencion'),3);assert.equal(contarPorFiltro(estados,'listos'),2);assert.equal(contarPorFiltro(estados,'cerrados'),2);});
test('anulados solo se muestran en cerrados o todos',()=>{assert.equal(coincideFiltroEstado('anulado','en_atencion'),false);assert.equal(coincideFiltroEstado('anulado','cerrados'),true);});
