/**
 * SOLO DEMOSTRACIÓN LOCAL. Credenciales visibles en el frontend.
 * Prohibido utilizar con información personal real.
 * Para producción: identidad centralizada/backend y control de acceso de servidor.
 */
import type { UsuarioSesion } from './types.ts';
import { ALUMNOS } from './data.ts';
export const CUENTAS_DEMO = [
  { usuario: 'profesor@demo.local', clave: 'ClinicaDemo2026!', nombre: 'Profesor administrador', id: 'prof-01', rol: 'profesor' as const },
  { usuario: 'recepcion@demo.local', clave: 'RecepcionDemo2026!', nombre: 'Recepción Clínica PC', id: 'recep-01', rol: 'recepcionista' as const },
  ...ALUMNOS.map((a,i) => ({ usuario: a.id, clave: `AlumnoDemo${String(i+1).padStart(2,'0')}!`, nombre: a.nombre, id: a.id, rol: 'alumno' as const }))
];
export async function autenticar(usuario: string, clave: string): Promise<UsuarioSesion> {
  const cuenta = CUENTAS_DEMO.find(c=>c.usuario.toLowerCase()===usuario.trim().toLowerCase() && c.clave===clave);
  if (!cuenta) throw new Error('Usuario o contraseña incorrectos.');
  return { id: cuenta.id, nombre: cuenta.nombre, rol: cuenta.rol };
}
