import { asegurarBasico } from './clinica.ts';
import type { DatosClinica, UsuarioSesion, Servicio, Equipo } from './types';
// Misma clave de datos de la V4: se conservan registros anteriores en el mismo origen del navegador.
export const DATA_KEY = 'clinica-pc-demo-v2';
const SESSION_KEY = 'clinica-pc-sesion-demo-v5';
export const PLANTILLAS_BASE: Record<Servicio, string[]> = {
  formateo: ['Comprobar encendido y estado inicial', 'Verificar autorización del propietario y respaldo', 'Preparar instalación del sistema operativo', 'Instalar controladores y actualizaciones', 'Comprobar encendido y funciones al finalizar'],
  logica: ['Comprobar encendido y estado inicial', 'Evaluar software y almacenamiento', 'Revisar programas y errores del sistema', 'Aplicar mantención lógica autorizada', 'Verificar funcionamiento posterior'],
  fisica: ['Comprobar estado externo y funcionamiento inicial', 'Inspeccionar carcasa, puertos y conexiones', 'Verificar autorización para abrir el equipo', 'Realizar limpieza autorizada', 'Comprobar ventilación y funcionamiento posterior']
};
function migrarEquipo(e: Equipo): Equipo {
  const solicitado = Array.isArray(e.serviciosSolicitados) && e.serviciosSolicitados.length ? e.serviciosSolicitados : [e.servicio || 'logica'];
  const tecnico = Array.isArray(e.serviciosTecnicos) ? e.serviciosTecnicos : e.checklist?.length ? [e.servicio || 'logica'] : [];
  const respuestas = Array.isArray(e.respuestas) ? e.respuestas : (e.checklist || []).map((tarea, i) => ({ id: `${e.servicio || 'logica'}-${i}`, servicio: e.servicio || 'logica', tarea, resultado: e.completadas?.includes(i) ? 'si' as const : '' as const, observacion: '' }));
  return { ...e,serviciosSolicitados:solicitado,serviciosTecnicos:tecnico,respuestas:e.estado==='en_mantenimiento'?asegurarBasico(respuestas):respuestas,relatoCliente:e.relatoCliente || '',historial:Array.isArray(e.historial)?e.historial:[],observaciones:e.observaciones||'',completadas:e.completadas||[],checklist:e.checklist||[] };
}
export function leerDatos(): DatosClinica {
  const vacio: DatosClinica = { propietarios: [], equipos: [], plantillas: structuredClone(PLANTILLAS_BASE) };
  try {
    const raw = localStorage.getItem(DATA_KEY); if(!raw) return vacio;
    const p: unknown = JSON.parse(raw); if (!p || typeof p!=='object') return vacio;
    const d = p as Partial<DatosClinica>;
    if (!Array.isArray(d.propietarios) || !Array.isArray(d.equipos)) return vacio;
    const pl = d.plantillas || PLANTILLAS_BASE;
    return { propietarios:d.propietarios.map(x=>({...x,origenRegistro:x.origenRegistro||'publico'})),equipos:d.equipos.map(migrarEquipo),plantillas:{...PLANTILLAS_BASE,...pl} };
  } catch { return vacio; }
}
export function guardarDatos(d: DatosClinica): boolean { try {localStorage.setItem(DATA_KEY,JSON.stringify(d));return true;} catch{return false;} }
export function leerSesion(): UsuarioSesion | null {
  try { const s:unknown=JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null'); if(!s||typeof s!=='object')return null;
    const u=s as Partial<UsuarioSesion>; if(!['profesor','recepcionista','alumno'].includes(u.rol||'') || !u.id || !u.nombre) return null;
    return {id:u.id,nombre:u.nombre,rol:u.rol!}; } catch{return null;}
}
export function guardarSesion(s: UsuarioSesion | null) { if(s)sessionStorage.setItem(SESSION_KEY,JSON.stringify(s));else sessionStorage.removeItem(SESSION_KEY); }
export function generarCodigo(): string {const b=new Uint8Array(6);crypto.getRandomValues(b);return 'OT-'+Array.from(b).map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();}
