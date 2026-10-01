import type {
  Hospedagem,
  Hospede,
  Pagamento,
  Quarto,
  Reserva,
} from "@/lib/types";

/**
 * "Banco de dados" em memória, usado apenas para fins de demonstração.
 *
 * Este arquivo é o ÚNICO lugar que precisa mudar quando um banco de dados
 * real (Postgres, MySQL, SQLite, etc.) for adotado: os repositórios em
 * `src/lib/repositories` importam os arrays abaixo, então basta trocar essas
 * funções por chamadas ao Prisma/Drizzle/SQL mantendo as mesmas assinaturas.
 *
 * Os dados existem apenas no processo do servidor Next.js e são reiniciados
 * a cada reinício do servidor (`npm run dev`).
 */

export const quartos: Quarto[] = [
  { id: "q-101", numero: "101", andar: 1, tipo: "Standard", capacidade: 2, valorDiaria: 180, status: "Ocupado" },
  { id: "q-102", numero: "102", andar: 1, tipo: "Standard", capacidade: 2, valorDiaria: 180, status: "Disponível" },
  { id: "q-103", numero: "103", andar: 1, tipo: "Standard", capacidade: 3, valorDiaria: 210, status: "Reservado" },
  { id: "q-104", numero: "104", andar: 1, tipo: "Standard", capacidade: 2, valorDiaria: 180, status: "Disponível" },
  { id: "q-201", numero: "201", andar: 2, tipo: "Luxo", capacidade: 2, valorDiaria: 280, status: "Ocupado" },
  { id: "q-202", numero: "202", andar: 2, tipo: "Luxo", capacidade: 3, valorDiaria: 320, status: "Disponível" },
  { id: "q-203", numero: "203", andar: 2, tipo: "Luxo", capacidade: 2, valorDiaria: 280, status: "Reservado" },
  { id: "q-301", numero: "301", andar: 3, tipo: "Suíte", capacidade: 4, valorDiaria: 450, status: "Disponível" },
  { id: "q-302", numero: "302", andar: 3, tipo: "Suíte", capacidade: 2, valorDiaria: 420, status: "Ocupado" },
  { id: "q-303", numero: "303", andar: 3, tipo: "Suíte", capacidade: 4, valorDiaria: 470, status: "Disponível" },
];

export const hospedes: Hospede[] = [
  { id: "h-1", nome: "Maria Eduarda Sousa Lima", documento: "045.812.663-10", email: "maria.lima@exemplo.com", telefone: "(86) 99911-2233", cidade: "Campo Maior - PI", criadoEm: "2026-08-02T10:00:00Z" },
  { id: "h-2", nome: "João Pedro Rêgo Alencar", documento: "128.334.902-77", email: "joao.alencar@exemplo.com", telefone: "(86) 99822-1145", cidade: "Teresina - PI", criadoEm: "2026-08-05T14:30:00Z" },
  { id: "h-3", nome: "Francisca das Chagas Nunes", documento: "331.556.240-08", email: "fran.nunes@exemplo.com", telefone: "(86) 99733-8820", cidade: "Piripiri - PI", criadoEm: "2026-08-11T09:15:00Z" },
  { id: "h-4", nome: "Antônio Carlos Bezerra Filho", documento: "509.771.334-56", email: "antonio.bezerra@exemplo.com", telefone: "(86) 99644-7701", cidade: "Campo Maior - PI", criadoEm: "2026-08-14T16:45:00Z" },
  { id: "h-5", nome: "Luciana Ferreira dos Anjos", documento: "672.219.845-33", email: "luciana.anjos@exemplo.com", telefone: "(86) 99555-3390", cidade: "Parnaíba - PI", criadoEm: "2026-08-20T11:20:00Z" },
  { id: "h-6", nome: "Raimundo Nonato Carvalho", documento: "784.902.117-90", email: "raimundo.carvalho@exemplo.com", telefone: "(86) 99466-2214", cidade: "Campo Maior - PI", criadoEm: "2026-09-01T08:05:00Z" },
  { id: "h-7", nome: "Camila Rodrigues Torres", documento: "895.043.226-64", email: "camila.torres@exemplo.com", telefone: "(86) 99377-6689", cidade: "Teresina - PI", criadoEm: "2026-09-06T13:40:00Z" },
  { id: "h-8", nome: "Pedro Henrique Moura Sales", documento: "912.664.578-21", email: "pedro.sales@exemplo.com", telefone: "(86) 99288-0057", cidade: "Barras - PI", criadoEm: "2026-09-12T17:10:00Z" },
];

export const reservas: Reserva[] = [
  { id: "r-1", hospedeId: "h-1", quartoId: "q-101", dataCheckinPrevista: "2026-09-24", dataCheckoutPrevista: "2026-09-28", hospedes: 2, status: "Confirmada", criadaEm: "2026-09-10T10:00:00Z" },
  { id: "r-2", hospedeId: "h-5", quartoId: "q-201", dataCheckinPrevista: "2026-09-25", dataCheckoutPrevista: "2026-09-27", hospedes: 2, status: "Confirmada", criadaEm: "2026-09-12T09:30:00Z" },
  { id: "r-3", hospedeId: "h-4", quartoId: "q-302", dataCheckinPrevista: "2026-09-26", dataCheckoutPrevista: "2026-10-01", hospedes: 2, status: "Confirmada", criadaEm: "2026-09-14T15:00:00Z" },
  { id: "r-4", hospedeId: "h-3", quartoId: "q-103", dataCheckinPrevista: "2026-09-29", dataCheckoutPrevista: "2026-10-03", hospedes: 3, status: "Pendente", criadaEm: "2026-09-20T11:00:00Z" },
  { id: "r-5", hospedeId: "h-7", quartoId: "q-203", dataCheckinPrevista: "2026-09-30", dataCheckoutPrevista: "2026-10-02", hospedes: 2, status: "Pendente", criadaEm: "2026-09-22T08:20:00Z" },
  { id: "r-6", hospedeId: "h-2", quartoId: "q-104", dataCheckinPrevista: "2026-09-18", dataCheckoutPrevista: "2026-09-20", hospedes: 1, status: "Cancelada", criadaEm: "2026-09-05T10:00:00Z", observacoes: "Hóspede cancelou por motivo pessoal." },
  { id: "r-7", hospedeId: "h-8", quartoId: "q-303", dataCheckinPrevista: "2026-10-03", dataCheckoutPrevista: "2026-10-06", hospedes: 4, status: "Confirmada", criadaEm: "2026-09-23T12:00:00Z" },
];

export const hospedagens: Hospedagem[] = [
  { id: "ho-1", reservaId: "r-1", hospedeId: "h-1", quartoId: "q-101", dataCheckin: "2026-09-24T14:10:00Z", dataCheckoutPrevista: "2026-09-28", status: "Em andamento" },
  { id: "ho-2", reservaId: "r-2", hospedeId: "h-5", quartoId: "q-201", dataCheckin: "2026-09-25T13:40:00Z", dataCheckoutPrevista: "2026-09-27", status: "Em andamento" },
  { id: "ho-3", reservaId: "r-3", hospedeId: "h-4", quartoId: "q-302", dataCheckin: "2026-09-26T15:05:00Z", dataCheckoutPrevista: "2026-10-01", status: "Em andamento" },
  { id: "ho-4", hospedeId: "h-6", quartoId: "q-104", dataCheckin: "2026-09-15T14:00:00Z", dataCheckoutPrevista: "2026-09-18", dataCheckoutReal: "2026-09-18T11:20:00Z", status: "Finalizada" },
  { id: "ho-5", hospedeId: "h-2", quartoId: "q-202", dataCheckin: "2026-09-10T13:30:00Z", dataCheckoutPrevista: "2026-09-13", dataCheckoutReal: "2026-09-13T10:45:00Z", status: "Finalizada" },
];

export const pagamentos: Pagamento[] = [
  { id: "p-1", hospedagemId: "ho-1", hospedeId: "h-1", valor: 720, forma: "Pix", status: "Pago", dataVencimento: "2026-09-24", dataPagamento: "2026-09-24T14:15:00Z" },
  { id: "p-2", hospedagemId: "ho-2", hospedeId: "h-5", valor: 560, forma: "Cartão de crédito", status: "Pago", dataVencimento: "2026-09-25", dataPagamento: "2026-09-25T13:45:00Z" },
  { id: "p-3", hospedagemId: "ho-3", hospedeId: "h-4", valor: 2100, forma: "Cartão de crédito", status: "Pendente", dataVencimento: "2026-10-01" },
  { id: "p-4", hospedagemId: "ho-4", hospedeId: "h-6", valor: 540, forma: "Dinheiro", status: "Pago", dataVencimento: "2026-09-18", dataPagamento: "2026-09-18T11:25:00Z" },
  { id: "p-5", hospedagemId: "ho-5", hospedeId: "h-2", valor: 960, forma: "Pix", status: "Pago", dataVencimento: "2026-09-13", dataPagamento: "2026-09-13T10:50:00Z" },
  { id: "p-6", hospedagemId: "ho-1", hospedeId: "h-1", valor: 90, forma: "Dinheiro", status: "Pendente", dataVencimento: "2026-09-28" },
  { id: "p-7", hospedagemId: "ho-2", hospedeId: "h-5", valor: 120, forma: "Pix", status: "Estornado", dataVencimento: "2026-09-26" },
];
