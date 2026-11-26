import type { Estado, Equipo } from './types.ts';

/** Estas reglas protegen la coherencia del prototipo, no constituyen autorización segura. */
export function puedeEditar(estado: Estado): boolean {
  return estado==='registrado' || estado==='recepcionado';
}
export function puedeAnular(estado: Estado): boolean {
  return puedeEditar(estado) || estado==='asignado';
}
export function anularOrden(equipo: Equipo, motivo: string, actor: string, fecha: string): Equipo {
  const descripcion = motivo.trim();
  if (!puedeAnular(equipo.estado)) throw new Error('No se puede anular una atención que ya comenzó o terminó.');
  if (descripcion.length<8 || descripcion.length>200) throw new Error('El motivo debe tener entre 8 y 200 caracteres.');
  return {
    ...equipo, estado:'anulado', historial:[...(equipo.historial||[]),{
      fecha,actor,descripcion:`Registro anulado. Motivo: ${descripcion}`
    }],
  };
}
