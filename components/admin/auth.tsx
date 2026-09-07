"use client";

import { useState } from "react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const KEY = "odontovida_admin_auth";

export function isAuthed(): boolean {
  return typeof window !== "undefined" && sessionStorage.getItem(KEY) === "1";
}

export function login(user: string, pass: string): boolean {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    sessionStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(KEY);
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (login(user, pass)) onLogin();
    else setErro("Credenciais inválidas. Use admin/admin123.");
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-50 via-white to-mint-50 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-brand-100 bg-white p-8 shadow-soft"
      >
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-mint-500 text-white shadow-soft">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 11c0-1.1.9-2 2-2s2 .9 2 2M4 11a8 8 0 0116 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6z" strokeLinecap="round" />
            </svg>
          </span>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Painel Administrativo
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Área restrita à equipe da OdontoVida
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            className={inputCls}
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className={inputCls}
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {erro && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Entrar
        </button>
        <p className="mt-4 text-center text-xs text-slate-400">
          Demo: admin / admin123
        </p>
      </form>
    </div>
  );
}
