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
