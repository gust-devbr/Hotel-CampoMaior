import { NextResponse } from "next/server";
import { pagamentosRepository } from "@/lib/repositories/pagamentos-repository";

export async function GET() {
  const dados = await pagamentosRepository.listar();
  return NextResponse.json(dados);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.hospedagemId || !body?.hospedeId || !body?.valor || !body?.forma) {
    return NextResponse.json(
      { message: "Hospedagem, hóspede, valor e forma de pagamento são obrigatórios." },
      { status: 400 }
    );
  }

  const novo = await pagamentosRepository.criar({
    hospedagemId: body.hospedagemId,
    hospedeId: body.hospedeId,
    valor: Number(body.valor),
    forma: body.forma,
    dataVencimento: body.dataVencimento ?? new Date().toISOString().slice(0, 10),
  });

  return NextResponse.json(novo, { status: 201 });
}
