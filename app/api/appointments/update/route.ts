import { NextResponse } from "next/server";
import { updateAppointment } from "@/lib/db";
import type { UpdateAppointmentInput } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * PUT /api/appointments — atualiza o status de um agendamento.
 * Body esperado: `{ id, status: "confirmado" | "recusado", justificativa? }`
 */
export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { id?: string } & UpdateAppointmentInput;
    if (!body.id) {
      return NextResponse.json(
        { message: "Campo 'id' é obrigatório." },
        { status: 400 },
      );
    }
    const appointment = await updateAppointment(body.id, {
      status: body.status,
      justificativa: body.justificativa,
    });
    return NextResponse.json(
      { message: "Agendamento atualizado com sucesso.", appointment },
      { status: 200 },
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao atualizar agendamento.";
    return NextResponse.json({ message }, { status: 400 });
  }
}
