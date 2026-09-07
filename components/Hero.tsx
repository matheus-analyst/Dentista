export function Hero() {
  return (
    <section id="home" className="bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full bg-mint-100 px-4 py-1.5 text-xs font-semibold text-mint-600">
            <span className="h-2 w-2 rounded-full bg-mint-500" />
            Equipe certificada · Ambiente esterilizado
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Seu sorriso saudável é a nossa{" "}
            <span className="bg-gradient-to-r from-brand-600 to-mint-500 bg-clip-text text-transparent">
              maior recompensa
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-slate-600">
            Cuidado odontológico completo para toda a família, com tecnologia
            moderna e atendimento humanizado. Agende online em menos de 1 minuto.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#booking"
              className="rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
            >
              Agendar Agora
            </a>
            <a
              href="#services"
              className="rounded-full border border-brand-200 bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              Ver Serviços
            </a>
          </div>
          <dl className="mt-10 flex gap-10">
            {[
              ["12k+", "Pacientes felizes"],
              ["15 anos", "De experiência"],
              ["4.9★", "Avaliação média"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-2xl font-bold text-brand-700">{v}</dt>
                <dd className="text-sm text-slate-500">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fadeUp">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-brand-100 to-mint-100 blur-2xl" />
          {/* Foto profissional (avatares vetoriais, sem dependência externa) */}
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-400 to-mint-400 p-1 shadow-soft">
            <div className="flex flex-col items-center justify-center gap-4 rounded-[1.9rem] bg-white px-6 py-10 text-center">
              <svg viewBox="0 0 24 24" className="h-24 w-24 text-brand-400" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 15a7.5 7.5 0 01-5.9-2.9c.2-1.8 2-3.1 5.9-3.1 3.8 0 5.7 1.3 5.9 3.1A7.5 7.5 0 0112 20z" />
              </svg>
              <p className="text-xl font-bold text-slate-900">Dra. Camila Ferreira</p>
              <p className="text-sm text-slate-500">CRO-SP 000.000 · Odontologia Geral e Estética</p>
              <div className="flex gap-2">
                {["Plano de saúde facilitado", "Emergências no mesmo dia", "Financiamento em até 12x"].map((t) => (
                  <span key={t} className="rounded-full bg-mint-50 px-3 py-1 text-[11px] font-medium text-mint-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
