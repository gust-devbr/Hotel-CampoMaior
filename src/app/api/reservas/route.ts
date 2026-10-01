import { NextResponse } from "next/server";
import { reservasRepository } from "@/lib/repositories/reservas-repository";

export async function GET() {
  const dados = await reservasRepository.listar();
  return NextResponse.json(dados);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.hospedeId || !body?.quartoId || !body?.dataCheckinPrevista || !body?.dataCheckoutPrevista) {
    return NextResponse.json(
      { message: "Hóspede, quarto e datas previstas são obrigatórios." },
      { status: 400 }
    );
  }

  const nova = await reservasRepository.criar({
    hospedeId: body.hospedeId,
    quartoId: body.quartoId,
    dataCheckinPrevista: body.dataCheckinPrevista,
    dataCheckoutPrevista: body.dataCheckoutPrevista,
    hospedes: Number(body.hospedes) || 1,
    observacoes: body.observacoes,
  });

  return NextResponse.json(nova, { status: 201 });
}
