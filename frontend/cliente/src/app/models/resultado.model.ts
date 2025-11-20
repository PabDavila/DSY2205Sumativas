import { Usuario } from './usuario.model';

export interface Resultado {
  id?: number;
  pacienteId: number;
  tipoAnalisis: string;
  resultado: string;
  fecha?: Date;
  laboratorio?: string;
}
