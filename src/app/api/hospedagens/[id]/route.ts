import { NextResponse } from "next/server";
import { hospedagensRepository } from "@/modules/hospedagens/repository/hospedagens-repository";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const hospedagem = await hospedagensRepository.buscarPorId(id);
  if (!hospedagem) {
    return NextResponse.json({ message: "Hospedagem não encontrada." }, { status: 404 });
  }
  return NextResponse.json(hospedagem);
}

/** Usada para registrar o check-out (a ação principal desta entidade). */
export async function PATCH(_request: Request, { params }: Params) {
  const { id } = await params;
  const atualizada = await hospedagensRepository.registrarCheckout(id);
  if (!atualizada) {
    return NextResponse.json({ message: "Hospedagem não encontrada." }, { status: 404 });
  }
  return NextResponse.json(atualizada);
}
