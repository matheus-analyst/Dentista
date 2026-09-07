"use client";

import { useMemo, useState } from "react";
import { formatDateBR } from "@/lib/admin-utils";
import { statusBadgeCls, statusLabel } from "@/lib/admin-utils";
import { HORARIOS, type Appointment } from "@/lib/types";

interface Props {
  appointments: Appointment[];
  selectedDate: string;
  onSelectDate: (d: string) => void;
  filterDate: string;
}

function isoDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function DayCalendar({
  appointments,
  selectedDate,
  onSelectDate,
  filterDate,
}: Props) {
  // Gera um grid de 14 dias (7 anteriores + hoje + 6 seguintes) para navegação
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i - 7);
      return isoDay(d);
    });
  }, []);

  const dayApps = appointments.filter((a) => a.data === selectedDate);

  // Horários ocupados de acordos com status
  const slotStatus = (h: string) => {
    const appt = dayApps.find((a) => a.horario === h && a.status !== "recusado");
    if (!appt) return null;
    return appt;
  };

  const [monthLabel] = useState(
    () =>
      new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(
        new Date(),
      ),
  );

  return (
    <aside className="rounded-3xl border border-brand-100 bg-white p-5 shadow-soft">
      <h3 className="font-bold text-slate-900">Agenda do dia</h3>
      <p className="mt-0.5 text-xs text-slate-500 capitalize">{monthLabel}</p>

      {/* Seletor de dias */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {days.map((d) => {
          const [y, m, dd] = d.split("-");
          const weekday = new Date(`${d}T12:00:00`).toLocaleDateString("pt-BR", {
            weekday: "short",
          });
          const isSel = d === selectedDate;
          const hasPending = appointments.some(
            (a) => a.data === d && a.status === "pendente",
          );
          return (
            <button
              key={d}
              onClick={() => onSelectDate(d)}
              className={`flex min-w-[62px] flex-col items-center rounded-xl border px-2 py-2 transition ${
                isSel
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
              }`}
            >
              <span className="text-[10px] uppercase">{weekday}</span>
              <span className="text-sm font-bold">{dd}</span>
              {hasPending && (
                <span
                  className={`mt-1 h-1.5 w-1.5 rounded-full ${
                    isSel ? "bg-white" : "bg-amber-500"
                  }`}
                />
              )}
              <span className="sr-only">{`${dd}/${m}/${y}`}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-brand-50/60 p-4">
        <p className="text-sm font-semibold text-brand-800">
          {formatDateBR(selectedDate)}
        </p>
        <p className="text-xs text-slate-500">
          {dayApps.length} agendamento(s) neste dia
        </p>

        <ul className="mt-3 space-y-1.5">
          {HORARIOS.map((h) => {
            const appt = slotStatus(h);
            return (
              <li
                key={h}
                className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs ${
                  appt
                    ? appt.status === "confirmado"
                      ? "bg-mint-100 text-mint-700"
                      : "bg-amber-100 text-amber-700"
                    : "bg-white/60 text-slate-400"
                }`}
              >
                <span className="font-mono font-semibold">{h}</span>
                <span className="truncate pl-2 text-right">
                  {appt
                    ? `${appt.nomePaciente} · ${statusLabel(appt.status)}`
                    : "Livre"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
