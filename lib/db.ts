import type {
  Appointment,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "./types";

/**
 * Camada de persistência "serverless-friendly".
 *
 * Em um ambiente real com Vercel Postgres/Supabase, este módulo seria
 * substituído por consultas via `@vercel/postgres` ou `@prisma/client`.
 * Aqui usamos um armazenamento em memória + SEMENTES (seed) mockadas,
 * garantindo que a aplicação funcione imediatamente após o build,
 * mesmo em ambientes mais frios (serverless sem disco).
 */

declare global {
  // eslint-disable-next-line no-var
  var __appointmentsStore: Appointment[] | undefined;
}

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function isoNow(offsetMinutes = 0): string {
  return new Date(Date.now() + offsetMinutes * 60_000).toISOString();
}

/** Mock inicial de dados (seed) — usado em /api/appointments e no admin. */
export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-001",
    nomePaciente: "Mariana Costa",
    telefone: "(11) 98123-4567",
    email: "mariana.costa@email.com",
    data: addDays(new Date(), 1),
    horario: "09:00",
    servico: "Limpeza",
    status: "confirmado",
    createdAt: isoNow(-2880),
  },
  {
    id: "apt-002",
    nomePaciente: "João Pedro Almeida",
    telefone: "(21) 99555-1010",
    email: "joao.almeida@email.com",
    data: addDays(new Date(), 0),
    horario: "10:00",
    servico: "Consulta Geral",
    status: "pendente",
    createdAt: isoNow(-1440),
  },
  {
    id: "apt-003",
    nomePaciente: "Ana Beatriz Lima",
    telefone: "(31) 98988-7777",
    email: "ana.lima@email.com",
    data: addDays(new Date(), 0),
    horario: "14:00",
    servico: "Canal",
    status: "pendente",
    createdAt: isoNow(-720),
  },
  {
    id: "apt-004",
    nomePaciente: "Carlos Eduardo Souza",
    telefone: "(41) 97666-3322",
    email: "carlos.souza@email.com",
    data: addDays(new Date(), 3),
    horario: "16:00",
    servico: "Aparelho",
    status: "pendente",
    createdAt: isoNow(-300),
  },
  {
    id: "apt-005",
    nomePaciente: "Paula Regina Nunes",
    telefone: "(51) 98222-1212",
    email: "paula.nunes@email.com",
    data: addDays(new Date(), -2),
    horario: "11:00",
    servico: "Limpeza",
    status: "confirmado",
    createdAt: isoNow(-7200),
  },
  {
    id: "apt-006",
    nomePaciente: "Rafael Monteiro",
    telefone: "(85) 98111-9090",
    email: "rafael.monteiro@email.com",
    data: addDays(new Date(), -2),
    horario: "15:00",
    servico: "Consulta Geral",
    createdAt: isoNow(-7200),
    justificativa: "Cliente não confirmou presença após dois contatos.",
    createdAt: isoNow(-7200, ),
  },
];

function store(): Appointment[] {
  if (!globalThis.__appointmentsStore) {
    globalThis.__appointmentsStore = [...SEED_APPOINTMENTS];
  }
  return globalThis.__appointmentsStore;
}

function isValidDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function isValidHorario(horario: string): boolean {
  return /^([01]\d|2[0-3]):00$/.test(horario) &&
    horario >= "08:00" &&
    horario <= "17:00";
}

export async function listAppointments(): Promise<Appointment[]> {
  return store().sort((a, b) => {
    const key = (x: Appointment) => `${x.data}T${x.horario}`;
    return key(a).localeCompare(key(b));
  });
}

export async function findAppointment(
  id: string,
): Promise<Appointment | undefined> {
  return store().find((a) => a.id === id);
}

export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  const { nomePaciente, telefone, email, data, horario, servico } = input;

  if (!nomePaciente?.trim()) throw new Error("Nome é obrigatório.");
  if (!telefone?.trim()) throw new Error("Telefone é obrigatório.");
  if (!email?.includes("@")) throw new Error("E-mail inválido.");
  if (nomePaciente && !isValidDate(data)) throw new Error("Data inválida.");
  if (!isValidHorario(horario))
    throw new Error("Horário deve estar entre 08:00 e 17:00.");

  const day = new Date(`${data}T12:00:00`);
  const dow = day.getDay();
  if (dow === 0 || dow === 6) throw new Error("Clínica fechada aos fins de semana.");
  if (data < new Date().toISOString().slice(0, 10))
    throw new Error("Não é possível agendar em datas passadas.");

  const alreadyTaken = store().some(
    (a) => a.data === data && a.horario === horario && a.status !== "recusado",
  );
  if (alreadyTaken)
    throw new Error("Horário já ocupado para esta data.");

  const appt: Appointment = {
    id: `apt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    nomePaciente: nomePaciente.trim(),
    telefone,
    email,
    data,
    horario,
    servico,
    status: "pendente",
    createdAt: new Date().toISOString(),
  };
  store().push(appt);
  return appt;
}

export async function updateAppointment(
  id: string,
  input: UpdateAppointmentInput,
): Promise<Appointment> {
  const appt = await findAppointment(id);
  if (!appt) throw new Error("Agendamento não encontrado.");
  if (!["pendente", "confirmado", "recusado"].includes(input.status))
    throw new Error("Status inválido.");
  appt.status = input.status;
  appt.justificativa = input.justificativa ?? appt.justificativa;
  return appt;
}
