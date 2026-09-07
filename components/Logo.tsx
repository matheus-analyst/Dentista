const LOGO_TEXT = "OdontoVida";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/#home" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-mint-500 text-white shadow-soft">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 2C8.5 2 6.5 4.2 6.5 7c0 2 .6 3.2 1.2 4.6.5 1.2.9 2.5.9 4.6 0 2.6.7 5.8 2 5.8 1.2 0 1.4-2.3 1.4-4.2 0-1 .4-1.8 1-1.8s1 .8 1 1.8c0 1.9.2 4.2 1.4 4.2 1.3 0 2-3.2 2-5.8 0-2.1.4-3.4.9-4.6.6-1.4 1.2-2.6 1.2-4.6C17.5 4.2 15.5 2 12 2z" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight text-brand-800">
        {LOGO_TEXT}
      </span>
    </a>
  );
}
