export type AppointmentStatus = "pendente" | "confirmado" | "recusado";

export type ServiceType =
  | "Limpeza"
  | "Canal"
  | "Aparelho"
  | "Consulta Geral";

export interface Appointment {
  id: string;
  nomePaciente: string;
  telefone: string;
  email: string;
  data: string; // YYYY-MM-DD
  justificativa?: string;
  servico: ServiceType;
  status: AppointmentStatus;
 Justificativa?: string;
  createdAt: string;
}

export interface CreateAppointmentInput {
  nomePaciente: string;
  telefone: string;
  email: string;
  data: string;
  horario: string;
  servico: ServiceType;
}

export interface UpdateAppointmentInput {
  status: AppointmentStatus;
  justificativa?: string;
}

export const SERVICES: ServiceType[] = [
  "Consulta Geral",
  "Limpeza",
  "Canal",
  "Aparelho",
];

/** Intervalos de 1 hora, das 08:00 às 17:00 */
export const HORARIOS: string[] = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
