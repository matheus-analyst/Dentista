export function statusFilterMatch(filter: StatusFilter) {
  return (a: Appointment) => filter === "todos" || a.status === filter;
}

import type { Appointment } from "@/lib/types";

export type StatusFilter = "todos" | "pendente" | "confirmado" | "recusado";

/** Ordena por data + horário (cronológico). */
export function sortByDateTime(list: Appointment[]): Appointment[] {
  return [...list].sort((a, b) =>
    `${a.data}T${a.horario}`.localeCompare(`${b.data}T${b.horario}`),
  );
}

export function toArrayLocal(date: string): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function statusBadgeCls(status: Appointment["status"]): string {
  switch (status) {
    case "confirmado":
      return "bg-mint-100 text-mint-600";
    case "recusado":
      return "bg-red-100 text-red-600";
    default:
      return "bg-amber-100 text-amber-600";
  }
}

export function statusLabel(status: Appointment["status"]): string {
  return { pendente: "Pendente", confirmado: "Confirmado", recusado: "Recusado" }[
    status
  ];
}
