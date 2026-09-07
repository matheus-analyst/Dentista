"use client";

import { useEffect, useState } from "react";
import { SERVICES, HORARIOS, type ServiceType } from "@/lib/types";

/** Máscara de telefone brasileiro: (99) 99999-9999 */
export function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Data de hoje em YYYY-MM-DD (hora local) */
export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function isWeekend(date: string): boolean {
  const day = new Date(`${date}T12:00:00`).getDay();
  return day === 0 || day === 6;
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100";
const labelCls = "mb-1.5 block text-sm font-medium text-slate-700";

export function AppointmentForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [servico, setServico] = useState<ServiceType>("Consulta Geral");
  const [data, setData] = useState(todayISO());
  const [horario, setHorario] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  // Fecha toast automaticamente
  useEffect(() => {
    if (!sucesso) return;
    const t = setTimeout(() => setSucesso(false), 6000);
    return () => clearTimeout(t);
  }, [sucesso]);

  const dataInvalida = !data || isWeekend(data);
  const minDate = todayISO();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) return setErro("Informe seu nome completo.");
    if (telefone.replace(/\D/g, "").length < 10)
      return setErro("Informe um telefone válido com DDD.");
    if (!email.includes("@")) return setErro("Informe um e-mail válido.");
    if (dataInvalida)
      return setErro("Selecione um dia útil (a clínica fecha aos fins de semana).");
    if (!horario) return setErro("Selecione um horário.");

    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomePaciente: nome,
          telefone,
          email,
          data,
          horario,
          servico,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? "Erro ao agendar.");
      setSucesso(true);
      setNome("");
      setTelefone("");
      setEmail("");
      setServico("Consulta Geral");
      setHorario("");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="booking" className="py-20">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-mint-600">
            Agendamento online
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Marque sua consulta
          </h2>
          <p className="mt-3 text-slate-600">
            Preencha os dados abaixo. Sua solicitação será enviada para análise
            da nossa equipe e você receberá a confirmação em breve.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8"
        >
          {sucesso && (
            <div
              role="status"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-mint-200 bg-mint-50 p-4 animate-fadeUp"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint-500 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-mint-600">
                  Agendamento enviado com sucesso!
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  Sua solicitação foi encaminhada para análise do administrador.
                  Entraremos em contato para confirmar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSucesso(false)}
                className="ml-auto text-slate-400 hover:text-slate-600"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
          )}

          {erro && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {erro}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="nome">Nome completo</label>
              <input
                id="nome"
                className={inputCls}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Maria da Silva"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="tel">Telefone</label>
              <input
                id="tel"
                className={inputCls}
                value={telefone}
                onChange={(e) => setTelefone(maskPhone(e.target.value))}
                placeholder="(11) 98765-4321"
                inputMode="numeric"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                className={inputCls}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="servico">Tipo de serviço</label>
              <select
                id="servico"
                className={inputCls}
                value={servico}
                onChange={(e) => setServico(e.target.value as ServiceType)}
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls} htmlFor="data">Data</label>
              <input
                id="data"
                type="date"
                className={inputCls}
                min={minDate}
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
              {dataInvalida && (
                <p className="mt-1 text-xs text-red-500">
                  A clínica não atende aos finais de semana.
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="horario">Horário</label>
              <select
                id="horario"
                className={inputCls}
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              >
                <option value="">Selecione um horário…</option>
                {HORARIOS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Enviando…" : "Solicitar Agendamento"}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            Atendimento de segunda a sábado, 08h às 17h.
          </p>
        </form>
      </div>
    </section>
  );
}
