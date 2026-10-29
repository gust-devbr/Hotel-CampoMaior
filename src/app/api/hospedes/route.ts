import { NextResponse } from "next/server";
import { hospedesRepository } from "@/modules/hospedes/repository/hospedes-repository";

/**
 * GET /api/hospedes — lista todos os hóspedes.
 * POST /api/hospedes — cadastra um novo hóspede.
 *
 * Estas rotas hoje delegam para o repositório em memória. Quando o back-end
 * real existir, o contrato HTTP (verbos, corpo, status codes) pode
 * permanecer o mesmo, bastando trocar a implementação por chamadas a um
 * serviço externo, um ORM ou um cliente de banco de dados.
 */
export async function GET() {
  const dados = await hospedesRepository.listar();
  return NextResponse.json(dados);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.nome || !body?.documento) {
    return NextResponse.json(
      { message: "Nome e documento são obrigatórios." },
      { status: 400 }
    );
  }

  const novo = await hospedesRepository.criar({
    nome: body.nome,
    documento: body.documento,
    email: body.email ?? "",
    telefone: body.telefone ?? "",
    cidade: body.cidade ?? "",
  });

  return NextResponse.json(novo, { status: 201 });
}
