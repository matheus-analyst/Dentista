export function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Equipamentos digitais", "Radiografia panorâmica digital de baixa radiação."],
                ["Esterilização total", "Protocolos rígidos de biossegurança."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
                  <p className="text-sm font-bold text-brand-700">{t}</p>
                  <p className="mt-1 text-xs text-slate-500">{d}</p>
                </div>
              ))}
              <div className="col-span-2 rounded-2xl bg-gradient-to-r from-brand-600 to-mint-500 p-6 text-white shadow-soft">
                <p className="text-3xl font-extrabold">+12.000</p>
                <p className="mt-1 text-sm text-brand-50">
                  sorrisos transformados desde 2009
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-mint-600">
              Sobre nós
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Uma clínica feita para fazer você perder o medo do dentista
            </h2>
            <p className="mt-4 text-slate-600">
              Na OdontoVida, acreditamos que ir ao dentista deve ser uma
              experiência leve. Combinamos tecnologia de ponta, protocolos
              rigorosos de esterilização e um time acolhedor para que cada
              visita seja tranquila — da recepção à cadeira odontológica.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Atendimento_humanizado e sem dor",
                "Orçamento transparente antes de qualquer procedimento",
                " agendas flexíveis, incluindo horários no fim do dia",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint-100 text-mint-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
