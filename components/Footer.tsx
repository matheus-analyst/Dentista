export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-brand-50/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-bold text-brand-800">OdontoVida</p>
          <p className="text-sm text-slate-500">
            Rua dos Sorrisos, 123 · São Paulo, SP · (11) 4002-8922
          </p>
        </div>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} OdontoVida. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
