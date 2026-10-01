/**
 * Modelo de domínio do Sistema de Reservas do Hotel Campo Maior.
 *
 * Os tipos abaixo refletem os conceitos definidos no Documento de Visão
 * (Hóspede, Quarto, Reserva, Hospedagem, Pagamento). Eles são a "fonte da
 * verdade" usada tanto pelos dados fictícios quanto pelas futuras rotas de
 * API e pelo modelo de banco de dados — quando o back-end real for
 * implementado, um schema Prisma/SQL pode ser gerado diretamente a partir
 * destas interfaces, sem precisar redesenhar o front-end.
 */

export type QuartoTipo = "Standard" | "Luxo" | "Suíte";
export type QuartoStatus = "Disponível" | "Ocupado" | "Reservado";

export interface Quarto {
  id: string;
  numero: string;
  andar: number;
  tipo: QuartoTipo;
  capacidade: number;
  valorDiaria: number;
  status: QuartoStatus;
  observacoes?: string;
}

export interface Hospede {
  id: string;
  nome: string;
  documento: string; // CPF
  email: string;
  telefone: string;
  cidade: string;
  criadoEm: string; // ISO date
}

export type ReservaStatus = "Pendente" | "Confirmada" | "Cancelada";

export interface Reserva {
  id: string;
  hospedeId: string;
  quartoId: string;
  dataCheckinPrevista: string; // ISO date
  dataCheckoutPrevista: string; // ISO date
  hospedes: number;
  status: ReservaStatus;
  observacoes?: string;
  criadaEm: string; // ISO date
}

export type HospedagemStatus = "Em andamento" | "Finalizada";

export interface Hospedagem {
  id: string;
  reservaId?: string;
  hospedeId: string;
  quartoId: string;
  dataCheckin: string; // ISO datetime
  dataCheckoutPrevista: string; // ISO date
  dataCheckoutReal?: string; // ISO datetime
  status: HospedagemStatus;
}

export type PagamentoForma = "Pix" | "Cartão de crédito" | "Cartão de débito" | "Dinheiro" | "Transferência";
export type PagamentoStatus = "Pendente" | "Pago" | "Estornado";

export interface Pagamento {
  id: string;
  hospedagemId: string;
  hospedeId: string;
  valor: number;
  forma: PagamentoForma;
  status: PagamentoStatus;
  dataVencimento: string; // ISO date
  dataPagamento?: string; // ISO datetime
}

/** Formato padrão de erro retornado pelas rotas de API. */
export interface ApiError {
  message: string;
}
