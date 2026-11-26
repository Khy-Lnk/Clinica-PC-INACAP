export type Rol = 'profesor' | 'recepcionista' | 'alumno';
export interface Tecnico { id: string; nombre: string; }
export type TipoEquipo = 'notebook' | 'escritorio';
export type Servicio = 'formateo' | 'logica' | 'fisica';
export type Estado = 'registrado' | 'recepcionado' | 'asignado' | 'en_mantenimiento' | 'revision' | 'listo' | 'notificado' | 'entregado' | 'anulado';
export type ResultadoChecklist = '' | 'si' | 'no' | 'no_aplica';
export interface RespuestaChecklist {
  id: string;
  servicio: Servicio | 'basico' | 'personalizado';
  tarea: string;
  resultado: ResultadoChecklist;
  observacion: string;
}
export interface Propietario {
  id: string;
  nombre: string;
  rut: string;
  telefono: string;
  correo: string;
  registradoEn: string;
  consentimiento: boolean;
  origenRegistro?: 'publico' | 'recepcion';
}
export interface EventoAtencion { fecha: string; actor: string; descripcion: string; }
export interface SimulacionCorreo {
  destinatario: string;
  fecha: string;
  asunto: string;
  mensaje: string;
  encuestaUrl: string;
  canal: 'correo_simulado' | 'sin_correo';
}
export interface Equipo {
  id: string;
  propietarioId: string;
  tipo: TipoEquipo;
  marca: string;
  modelo: string;
  serie: string;
  servicio: Servicio; // campo legacy para migrar la versión 4
  serviciosSolicitados: Servicio[];
  serviciosTecnicos: Servicio[];
  detalle: string;
  estado: Estado;
  creadoEn: string;
  tecnicoId: string | null;
  checklist: string[]; // campo legacy
  completadas: number[]; // campo legacy
  respuestas: RespuestaChecklist[];
  relatoCliente: string;
  observaciones: string;
  historial: EventoAtencion[];
  correoSimulado?: SimulacionCorreo;
  encuestaToken?: string;
  encuestaRespondida?: { fecha: string; calificacion: number; comentario: string };
}
export interface DatosClinica {
  propietarios: Propietario[];
  equipos: Equipo[];
  plantillas: Record<Servicio, string[]>;
}
export interface UsuarioSesion { id: string; nombre: string; rol: Rol; }
export interface EquipoBorrador {
  tipo: TipoEquipo | '';
  marca: string;
  modelo: string;
  serie: string;
  servicios: Servicio[];
  tecnicoId?: string;
  detalle: string;
}
