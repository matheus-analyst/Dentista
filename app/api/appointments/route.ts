import { NextResponse } from "next/server";
import {
  createAppointment,
  listAppointments,
} from "@/lib/db";
import type { CreateAppointmentInput } from "@/lib/types";

export const dynamic = "force-dynamic";

/** GET /api/appointments — lista de agendamentos ordenada por data/hora */
export async function GET() {
  const appointments = await listAppointments();
  return NextResponse.json({ appointments }, { status: 200 });
}

/** POST /api/appointments — cria novo agendamento (status inicial: pendente) */
export async function POST(request: Request) {
  try {
    const body: CreateAppointmentInput = await request.json();
    const appointment = await createAppointment(body);
    return NextResponse.json(
      {
        message: "Agendamento enviado para análise do administrador.",
        appointment,
      },
      { status: 201 },
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao criar agendamento.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
