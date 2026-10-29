export type { Hospede } from "@/modules/hospedes/types";
export type { Quarto, QuartoStatus, QuartoTipo } from "@/modules/quartos/types";
export type { Reserva, ReservaStatus } from "@/modules/reservas/types";
export type { Hospedagem, HospedagemStatus } from "@/modules/hospedagens/types";
export type {
  Pagamento,
  PagamentoForma,
  PagamentoStatus,
} from "@/modules/pagamentos/types";

/** Formato padrão de erro retornado pelas rotas de API. */
export interface ApiError {
  message: string;
}
