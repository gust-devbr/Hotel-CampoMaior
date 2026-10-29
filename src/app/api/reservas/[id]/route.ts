import { NextResponse } from "next/server";
import { reservasRepository } from "@/modules/reservas/repository/reservas-repository";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const reserva = await reservasRepository.buscarPorId(id);
  if (!reserva) {
    return NextResponse.json({ message: "Reserva não encontrada." }, { status: 404 });
  }
  return NextResponse.json(reserva);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const atualizada = await reservasRepository.atualizar(id, body);
  if (!atualizada) {
    return NextResponse.json({ message: "Reserva não encontrada." }, { status: 404 });
  }
  return NextResponse.json(atualizada);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const removida = await reservasRepository.remover(id);
  if (!removida) {
    return NextResponse.json({ message: "Reserva não encontrada." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
