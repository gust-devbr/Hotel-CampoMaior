import { NextResponse } from "next/server";
import { quartosRepository } from "@/lib/repositories/quartos-repository";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const quarto = await quartosRepository.buscarPorId(id);
  if (!quarto) {
    return NextResponse.json({ message: "Quarto não encontrado." }, { status: 404 });
  }
  return NextResponse.json(quarto);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const atualizado = await quartosRepository.atualizar(id, body);
  if (!atualizado) {
    return NextResponse.json({ message: "Quarto não encontrado." }, { status: 404 });
  }
  return NextResponse.json(atualizado);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const removido = await quartosRepository.remover(id);
  if (!removido) {
    return NextResponse.json({ message: "Quarto não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
