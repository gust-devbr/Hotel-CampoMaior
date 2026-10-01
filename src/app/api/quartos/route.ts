import { NextResponse } from "next/server";
import { quartosRepository } from "@/lib/repositories/quartos-repository";

export async function GET() {
  const dados = await quartosRepository.listar();
  return NextResponse.json(dados);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.numero || !body?.tipo) {
    return NextResponse.json(
      { message: "Número e tipo do quarto são obrigatórios." },
      { status: 400 }
    );
  }

  const novo = await quartosRepository.criar({
    numero: body.numero,
    andar: Number(body.andar) || 1,
    tipo: body.tipo,
    capacidade: Number(body.capacidade) || 2,
    valorDiaria: Number(body.valorDiaria) || 0,
    status: body.status ?? "Disponível",
    observacoes: body.observacoes,
  });

  return NextResponse.json(novo, { status: 201 });
}
