"use client";

import { useState } from "react";

interface Props {
  onCancel: () => void;
  onConfirm: (justificativa: string) => void;
  paciente: string;
}

export function RejectModal({ onCancel, onConfirm, paciente }: Props) {
  const [texto, setTexto] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-slate-900">
          Recusar agendamento
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Solicitação de <span className="font-semibold">{paciente}</span>.
          Informe uma justificativa (opcional):
        </p>
        <textarea
          className="mt-4 h-28 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          placeholder="Ex.: horário em conflito, falta de confirmação…"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(texto.trim())}
            className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Confirmar recusa
          </button>
        </div>
      </div>
    </div>
  );
}
