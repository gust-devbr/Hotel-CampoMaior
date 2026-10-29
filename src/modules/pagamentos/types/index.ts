export type PagamentoForma =
  | "Pix"
  | "Cartão de crédito"
  | "Cartão de débito"
  | "Dinheiro"
  | "Transferência";
export type PagamentoStatus = "Pendente" | "Pago" | "Estornado";

export interface Pagamento {
  id: string;
  hospedagemId: string;
  hospedeId: string;
  valor: number;
  forma: PagamentoForma;
  status: PagamentoStatus;
  dataVencimento: string;
  dataPagamento?: string;
}
