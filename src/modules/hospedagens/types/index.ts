export type HospedagemStatus = "Em andamento" | "Finalizada";

export interface Hospedagem {
  id: string;
  reservaId?: string;
  hospedeId: string;
  quartoId: string;
  dataCheckin: string;
  dataCheckoutPrevista: string;
  dataCheckoutReal?: string;
  status: HospedagemStatus;
}
