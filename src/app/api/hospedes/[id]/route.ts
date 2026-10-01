import { NextResponse } from "next/server";
import { hospedesRepository } from "@/lib/repositories/hospedes-repository";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const hospede = await hospedesRepository.buscarPorId(id);
  if (!hospede) {
    return NextResponse.json({ message: "Hóspede não encontrado." }, { status: 404 });
  }
  return NextResponse.json(hospede);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const atualizado = await hospedesRepository.atualizar(id, body);
  if (!atualizado) {
    return NextResponse.json({ message: "Hóspede não encontrado." }, { status: 404 });
  }
  return NextResponse.json(atualizado);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const removido = await hospedesRepository.remover(id);
  if (!removido) {
    return NextResponse.json({ message: "Hóspede não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
