"use client";

import { formatDateBR, statusBadgeCls, statusLabel } from "@/lib/admin-utils";
import type { Appointment } from "@/lib/types";

interface Props {
  appt: Appointment;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  busy?: boolean;
}

export function AppointmentRow({ appt, onAccept, onReject, busy }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft sm:flex-row sm:items-center">
      <div className="flex items-center gap-4 sm:w-40">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <span className="text-xs font-bold uppercase">{formatDateBR(appt.data).slice(0, 5)}</span>
          <span className="text-sm font-extrabold">{appt.horario}</span>
        </div>
        <div>
          <p className="font-bold text-slate-900">{appt.nomePaciente}</p>
          <p className="text-xs text-slate-500">{appt.telefone}</p>
        </div>
      </div>

      <div className="sm:flex-1">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Serviço:</span> {appt.servico}
        </p>
        <p className="text-xs text-slate-400">{appt.email}</p>
        {appt.justificativa && (
          <p className="mt-1 text-xs italic text-red-500">
            Justificativa: {appt.justificativa}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeCls(appt.status)}`}
        >
          {statusLabel(appt.status)}
        </span>

        {appt.status === "pendente" && (
          <div className="flex gap-2">
            <button
              onClick={() => onAccept(appt.id)}
              disabled={busy}
              className="rounded-full bg-mint-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-mint-600 disabled:opacity-50"
            >
              Aceitar
            </button>
            <button
              onClick={() => onReject(appt.id)}
              disabled={busy}
              className="rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
            >
              Recusar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
