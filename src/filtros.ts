import type { Estado } from './types';
export type FiltroDispositivos = 'todos' | 'pendientes' | 'en_atencion' | 'listos' | 'cerrados';
export const FILTROS_DISPOSITIVOS:{id:FiltroDispositivos;nombre:string}[]=[
 {id:'todos',nombre:'Todos'}, {id:'pendientes',nombre:'Pendientes'},
 {id:'en_atencion',nombre:'En atención'}, {id:'listos',nombre:'Listos para retirar'},
 {id:'cerrados',nombre:'Cerrados y anulados'}];
export function coincideFiltroEstado(e:Estado,f:FiltroDispositivos):boolean{
 switch(f){case'todos':return true;case'pendientes':return ['registrado','recepcionado'].includes(e);case'en_atencion':return ['asignado','en_mantenimiento','revision'].includes(e);case'listos':return ['listo','notificado'].includes(e);case'cerrados':return ['entregado','anulado'].includes(e);}
}
export function contarPorFiltro(estados:Estado[],f:FiltroDispositivos):number{return estados.filter(e=>coincideFiltroEstado(e,f)).length;}
