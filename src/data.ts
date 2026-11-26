import type { Estado, Servicio, UsuarioSesion, Tecnico } from './types';
export const ALUMNOS: Tecnico[] = [
  { id: 'al-01', nombre: 'Alexandra Durán' },
  { id: 'al-02', nombre: 'Alejandro Muñoz' },
  { id: 'al-03', nombre: 'Alexis González' },
  { id: 'al-04', nombre: 'Camila Torres' },
  { id: 'al-05', nombre: 'Matías Soto' },
  { id: 'al-06', nombre: 'Fernanda Rojas' },
];
export const PROFESOR: UsuarioSesion = { id: 'prof-01', nombre: 'Profesor administrador', rol: 'profesor' };
export const NOMBRE_SERVICIO: Record<Servicio, string> = {
  formateo: 'Formateo', logica: 'Mantención lógica', fisica: 'Mantención física'
};
export const NOMBRE_ESTADO: Record<Estado, string> = {
  registrado: 'Registrado', recepcionado: 'Recepcionado', asignado: 'Asignado',
  en_mantenimiento: 'En mantenimiento', revision: 'Pendiente de revisión',
  listo: 'Listo para retirar', notificado: 'Aviso simulado', entregado: 'Entregado', anulado:'Anulado'
};
export function fechaLegible(fecha: string) {
  return new Date(fecha).toLocaleString('es-CL', {dateStyle:'short',timeStyle:'short'});
}
