export type ReservaStatus = "Pendente" | "Confirmada" | "Cancelada";

export interface Reserva {
  id: string;
  hospedeId: string;
  quartoId: string;
  dataCheckinPrevista: string;
  dataCheckoutPrevista: string;
  hospedes: number;
  status: ReservaStatus;
  observacoes?: string;
  criadaEm: string;
}
