"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LoginScreen, isAuthed, logout } from "./auth";
import { AppointmentRow } from "@/components/admin/AppointmentRow";
import { RejectModal } from "@/components/admin/RejectModal";
import { DayCalendar } from "@/components/admin/DayCalendar";
import { Logo } from "@/components/Logo";
import type { Appointment } from "@/lib/types";
import { sortByDateTime, statusFilterMatch } from "@/lib/admin-utils";
import type { StatusFilter } from "@/lib/admin-utils";

const FILTERS: { key: StatusFilter; label: string; cls: string }[] = [
  { key: "todos", label: "Todos", cls: "bg-brand-600 text-white" },
  {
    key: "pendente",
    label: "Pendentes",
    cls: "bg-amber-500 text-white",
  },
  {
    key: "confirmado",
    label: "Confirmados",
    cls: "bg-mint-500 text-white",
  },
  { key: "recusado", label: "Recusados", cls: "bg-red-500 text-white" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("todos");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [rejecting, setRejecting] = useState<Appointment | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setAuthed(isAuthed());
    setChecked(true);
  }, []);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/appointments", { cache: "no-store" });
    const json = await res.json();
    setAppointments(json.appointments ?? []);
  }, []);

  useEffect(() => {
    if (authed) refresh();
  }, [authed, refresh]);

  async function updateStatus(
    id: string,
    status: "confirmado" | "recusado",
    justificativa?: string,
  ) {
    setBusyId(id);
    try {
      const res = await fetch("/api/appointments/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, justificativa }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message ?? "Erro ao atualizar.");
      }
      setToast(
        status === "confirmado"
          ? "Consulta confirmada com sucesso!"
          : "Cliente recusado.",
      );
      await refresh();
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleAccept(id: string) {
    await updateStatus(id, "confirmado");
  }
  async function handleReject(just: string) {
    if (!rejecting) return;
    await updateStatus(rejecting.id, "recusado", just);
    setRejecting(null);
  }

  const filtered = useMemo(
    () => sortByDateTime(appointments.filter(statusFilterMatch(filter))),
    [appointments, filter],
  );
  const todayISO = useMemo(
    () => new Date().toISOString().slice(0, 10),
    [],
  );
  const agendadosHoje = useMemo(
    () =>
      appointments.filter(
        (a) => a.data === todayISO && a.status !== "recusado",
      ).length,
    [appointments, todayISO],
  );
  const pendentes = useMemo(
    () => appointments.filter((a) => a.status === "pendente").length,
    [appointments],
  );
  const confirmados = useMemo(
    () => appointments.filter((a) => a.status === "confirmado").length,
    [appointments],
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  if (!checked) return null;

  if (!authed)
    return (
      <>
        <LoginScreen onLogin={() => setAuthed(true)} />
      </>
    );

  const metrics = [
    { label: "Agendamentos hoje", value: agendadosHoje, icon: "📅", cls: "from-brand-500 to-brand-600" },
    { label: "Consultas pendentes", value: pendentes, icon: "⏳", cls: "from-amber-400 to-amber-500" },
    { label: "Consultas confirmadas", value: confirmados, icon: "✅", cls: "from-mint-400 to-mint-500" },
    { label: "Total na base", value: appointments.length, icon: "🗂️", cls: "from-slate-400 to-slate-500" },
  ];

  return (
    <div className="min-h-screen bg-brand-50/40">
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Logo />
            <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:inline">
              Painel Administrativo
            </span>
          </div>
          <button
            onClick={() => {
              logout();
              setAuthed(false);
            }}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Bem-vindo(a)! 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Gerencie as solicitações de agendamento da clínica.
        </p>

        {/* Métricas */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft"
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-lg text-white ${m.cls}`}
              >
                {m.icon}
              </span>
              <p className="mt-3 text-2xl font-extrabold text-slate-900">
                {m.value}
              </p>
              <p className="text-xs text-slate-500">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section>
            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    filter === f.key
                      ? f.cls
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Lista */}
            <div className="mt-4 space-y-3">
              {filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-400">
                  Nenhum agendamento encontrado para este filtro.
                </div>
              )}
              {filtered.map((a) => (
                <AppointmentRow
                  key={a.id}
                  appt={a}
                  busy={busyId === a.id}
                  onAccept={handleAccept}
                  onReject={(id) =>
                    setRejecting(appointments.find((x) => x.id === id) ?? null)
                  }
                />
              ))}
            </div>
          </section>

          <DayCalendar
            appointments={appointments}
            selectedDate={selectedDate}
            filterDate={todayISO}
            onSelectDate={setSelectedDate}
          />
        </div>
      </main>

      {rejecting && (
        <RejectModal
          paciente={rejecting.nomePaciente}
          onCancel={() => setRejecting(null)}
          onConfirm={handleReject}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
