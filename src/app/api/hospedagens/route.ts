import { NextResponse } from "next/server";
import { hospedagensRepository } from "@/modules/hospedagens/repository/hospedagens-repository";

/**
 * GET /api/hospedagens — lista as hospedagens (jornada de check-in/check-out).
 * POST /api/hospedagens — registra um novo check-in.
 */
export async function GET() {
  const dados = await hospedagensRepository.listar();
  return NextResponse.json(dados);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.hospedeId || !body?.quartoId || !body?.dataCheckoutPrevista) {
    return NextResponse.json(
      { message: "Hóspede, quarto e data de checkout prevista são obrigatórios." },
      { status: 400 }
    );
  }

  const nova = await hospedagensRepository.registrarCheckin({
    reservaId: body.reservaId,
    hospedeId: body.hospedeId,
    quartoId: body.quartoId,
    dataCheckoutPrevista: body.dataCheckoutPrevista,
  });

  return NextResponse.json(nova, { status: 201 });
}
