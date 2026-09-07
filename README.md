# OdontoVida — Clínica Odontológica (Next.js SPA)

Aplicação com **Área Pública** (institucional + agendamento) e **Painel Admin** (`/admin`), construída com Next.js App Router, TypeScript e Tailwind CSS. Pronta para deploy na Vercel.

## Acesso ao admin
- Usuário: `admin` · Senha: `admin123`

## Estrutura
- `app/page.tsx` — página pública (Header, Hero, Serviços, Sobre, Formulário)
- `app/admin/page.tsx` — dashboard protegido (métricas, filtros, aceitar/recusar, agenda)
- `app/api/appointments/route.ts` — `GET` (listar) e `POST` (criar)
- `app/api/appointments/update/route.ts` — `PUT` (atualizar status + justificativa)
- `lib/db.ts` — camada de persistência serverless com seed mock inicial
- `lib/types.ts` — schema dos agendamentos

## Schema do agendamento
`id, nomePaciente, telefone, email, data, horario, servico (Limpeza | Canal | Aparelho | Consulta Geral), status (pendente | confirmado | recusado), justificativa?, createdAt`

## Integração com banco real (opcional)
Substitua as funções em `lib/db.ts` por consultas ao Vercel Postgres (ex.: `@vercel/postgres`) ou Prisma — as rotas de API já estão desacopladas.

## Rodar localmente
```bash
npm install
npm run dev
```

## Deploy
Importe o repositório na Vercel — zero configuração adicional necessária.
