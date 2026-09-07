const SERVICES = [
  {
    name: "Clínica Geral",
    desc: "Diagnóstico, prevenção e tratamento completo para toda a família em um só lugar.",
    icon: (
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    ),
    tag: "Consulta Geral",
  },
  {
    name: "Ortodontia",
    desc: "Aparelhos fixos, estéticos e alinhadores transparentes para alinhar seu sorriso.",
    icon: <path d="M4 8h16v5a6 6 0 01-6 6h-4a6 6 0 01-6-6V8z" strokeLinejoin="round" />,
    tag: "Aparelho",
  },
  {
    name: "Estética Dental",
    desc: "Clareamento, facetas e lentes de contato dental para um sorriso impecável.",
    icon: (
      <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L4.2 8.7l5.4-.8L12 3z" strokeLinejoin="round" />
    ),
    tag: "Limpeza",
  },
  {
    name: "Odontopediatria",
    desc: "Atendimento lúdico e acolhedor, pensado especialmente para os pequenos.",
    icon: (
      <path d="M9 6h.01M15 6h.01M8 14a4 4 0 008 0" strokeLinecap="round" />
    ),
    tag: "Canal",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-brand-50/60 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-mint-600">
            Nossos serviços
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Especialidades que cuidam de você
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Do Check-up de rotina aos tratamentos mais complexos, com estrutura
            moderna e profissionais experientes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <a
              key={s.name}
              href="#booking"
              className="group rounded-2xl border border-brand-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                Agendar
                <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
