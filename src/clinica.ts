import type { Estado, Equipo, Servicio, RespuestaChecklist, DatosClinica, SimulacionCorreo } from './types.ts';
import { limpiarRut } from './rut.ts';
export const SERVICIOS: Servicio[] = ['formateo','logica','fisica'];
export function nombreServicios(arr:Servicio[]):string {return arr.map(s=>({formateo:'Formateo',logica:'Mantención lógica',fisica:'Mantención física'}[s])).join(' + ');}
export function filtrarEquipos(datos:DatosClinica,busqueda:string,etapa:string):Equipo[] {
  const q=busqueda.trim().toLocaleLowerCase('es'); const rutQ=limpiarRut(busqueda);
  return datos.equipos.filter(e=>{
    const p=datos.propietarios.find(x=>x.id===e.propietarioId);
    const texto=[p?.nombre,e.id,e.marca,e.modelo,e.serie].join(' ').toLocaleLowerCase('es');
    const okBusqueda=!q || texto.includes(q) || (rutQ.length>=2 && limpiarRut(p?.rut||'').includes(rutQ));
    const categorias:Record<string,Estado[]>={todos:['registrado','recepcionado','asignado','en_mantenimiento','revision','listo','notificado','entregado','anulado'],pendientes:['registrado','recepcionado'],en_atencion:['asignado','en_mantenimiento','revision'],listos:['listo','notificado'],cerrados:['entregado','anulado']};
    return okBusqueda && (categorias[etapa]||categorias.todos).includes(e.estado);
  });
}
export function crearRespuestas(servicios:Servicio[],plantillas:DatosClinica['plantillas']):RespuestaChecklist[] {
  return servicios.flatMap(s=>plantillas[s].map((tarea,i)=>({id:`${s}-${i}-${tarea}`,servicio:s,tarea,resultado:'' as const,observacion:''})));
}
export function respuestasValidas(r:RespuestaChecklist[]):boolean {
  return r.length>0 && r.every(x=>['si','no','no_aplica'].includes(x.resultado)&&x.observacion.trim().length>=5);
}
export function evento(e:Equipo,actor:string,descripcion:string,estado:Estado=e.estado,cambios:Partial<Equipo>={}):Equipo {
  return {...e,...cambios,estado,historial:[...(e.historial||[]),{fecha:new Date().toISOString(),actor,descripcion}]};
}
export function puedeAnular(e:Equipo) {return ['registrado','recepcionado','asignado'].includes(e.estado);}
export function crearCorreoDemo(e:Equipo,correo:string):SimulacionCorreo {
  const url=`https://ejemplo.invalid/encuesta?orden=${encodeURIComponent(e.id)}`;
  return { destinatario:correo||'Sin correo registrado',fecha:new Date().toISOString(),asunto:`Clínica del PC: atención ${e.id} lista`,mensaje:`Su equipo ${e.marca} ${e.modelo} se encuentra listo para retiro. Gracias por participar. Encuesta de satisfacción (simulada): ${url}`,encuestaUrl:url,canal:correo?'correo_simulado':'sin_correo' };
}

// El checklist básico se copia por orden, nunca modifica las plantillas del profesor.
export const TAREAS_BASICAS = [
  '¿Se comprobó el encendido y arranque?',
  '¿Se revisó el estado externo y las conexiones?',
  '¿Se verificaron teclado, pantalla y periféricos disponibles?',
  '¿Se comprobó el estado del almacenamiento?',
  '¿Se revisó la ventilación y temperatura?',
  '¿Se comprobó el funcionamiento al finalizar?'
];
export function asegurarBasico(respuestas:RespuestaChecklist[]):RespuestaChecklist[] {
  if(respuestas.some(r=>r.servicio==='basico'))return respuestas;
  return [...TAREAS_BASICAS.map((tarea,i):RespuestaChecklist=>({id:`basico-${i}`,servicio:'basico',tarea,resultado:'',observacion:''})),...respuestas];
}
export function actualizarEspecializados(previas:RespuestaChecklist[],servicios:Servicio[],plantillas:DatosClinica['plantillas']):RespuestaChecklist[] {
  const base=asegurarBasico(previas);
  const grupos=servicios.flatMap(s=>{const existentes=base.filter(r=>r.servicio===s);return existentes.length?existentes:crearRespuestas([s],plantillas);});
  return [...base.filter(r=>r.servicio==='basico'),...grupos,...base.filter(r=>r.servicio==='personalizado')];
}
export function agregarActividad(previas:RespuestaChecklist[],titulo:string,id:string):RespuestaChecklist[] {
  const tarea=titulo.trim().replace(/\s+/g,' ');
  if(tarea.length<5||tarea.length>140)throw new Error('Escribe una actividad de 5 a 140 caracteres.');
  if(previas.some(r=>r.tarea.toLocaleLowerCase('es')===tarea.toLocaleLowerCase('es')))throw new Error('Esta actividad ya existe en el checklist.');
  return [...previas,{id,servicio:'personalizado',tarea,resultado:'',observacion:''}];
}
export function editarActividad(previas:RespuestaChecklist[],id:string,titulo:string):RespuestaChecklist[] {
  const original=previas.find(r=>r.id===id&&r.servicio==='personalizado');
  if(!original)throw new Error('Solo se pueden editar actividades personalizadas.');
  const nuevo=agregarActividad(previas.filter(r=>r.id!==id),titulo,id).at(-1)!;
  return previas.map(r=>r.id===id?{...r,tarea:nuevo.tarea,resultado:'',observacion:''}:r);
}
export function quitarActividad(previas:RespuestaChecklist[],id:string):RespuestaChecklist[] {
  return previas.filter(r=>r.id!==id||r.servicio!=='personalizado');
}
export function asignarOrden(e:Equipo,tecnico:{id:string;nombre:string},actor:string):Equipo {
  if(!['registrado','recepcionado'].includes(e.estado)||e.tecnicoId)throw new Error('La orden ya no está disponible para asignación.');
  const recibida=e.estado==='registrado'?evento(e,actor,'Recepción presencial confirmada','recepcionado'):e;
  return evento(recibida,actor,`Atención asignada a ${tecnico.nombre}`,'asignado',{tecnicoId:tecnico.id});
}
export function enlaceContacto(canal:'WhatsApp'|'Correo',destino:string,mensaje:string,orden:string):string|null {
  if(canal==='WhatsApp'){
    const digitos=destino.replace(/\D/g,'');const numero=digitos.length===9?'56'+digitos:digitos;
    return /^569\d{8}$/.test(numero)?`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`:null;
  }
  if(!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(destino))return null;
  return `mailto:${encodeURIComponent(destino).replace(/%40/g,'@')}?subject=${encodeURIComponent(`Clínica del PC - ${orden}`)}&body=${encodeURIComponent(mensaje)}`;
}
