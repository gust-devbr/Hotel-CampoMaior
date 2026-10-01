import { NextResponse } from "next/server";
import { pagamentosRepository } from "@/lib/repositories/pagamentos-repository";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const pagamento = await pagamentosRepository.buscarPorId(id);
  if (!pagamento) {
    return NextResponse.json({ message: "Pagamento não encontrado." }, { status: 404 });
  }
  return NextResponse.json(pagamento);
}

/**
 * Corpo esperado: { "acao": "registrar" | "estornar" }
 */
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const atualizado =
    body?.acao === "estornar"
      ? await pagamentosRepository.estornar(id)
      : await pagamentosRepository.registrarPagamento(id);

  if (!atualizado) {
    return NextResponse.json({ message: "Pagamento não encontrado." }, { status: 404 });
  }
  return NextResponse.json(atualizado);
}
