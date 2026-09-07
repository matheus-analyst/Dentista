"use client";

import { useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Serviços" },
  { href: "#about", label: "Sobre" },
  { href: "#booking", label: "Agendar" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/#home" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-mint-500 text-white shadow-soft">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M12 2C8.5 2 6.5 4.2 6.5 7c0 2 .6 3.2 1.2 4.6.5 1.2.9 2.5.9 4.6 0 2.6.7 5.8 2 5.8 1.2 0 1.4-2.3 1.4-4.2 0-1 .4-1.8 1-1.8s1 .8 1 1.8c0 1.9.2 4.2 1.4 4.2 1.3 0 2-3.2 2-5.8 0-2.1.4-3.4.9-4.6.6-1.4 1.2-2.6 1.2-4.6C17.5 4.2 15.5 2 12 2z" />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight text-brand-800">
            OdontoVida
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#booking"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
          >
            Marcar Consulta
          </a>
        </div>

        <button
          aria-label="Abrir menu"
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="h-7 w-7 text-brand-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-brand-100 bg-white px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand-600 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Marcar Consulta
          </a>
        </nav>
      )}
    </header>
  );
}
