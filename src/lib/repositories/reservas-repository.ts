import { reservas } from "@/lib/data/mock-db";
import { generateId, simulateLatency } from "@/lib/data/helpers";
import type { Reserva } from "@/lib/types";

export const reservasRepository = {
  async listar(): Promise<Reserva[]> {
    await simulateLatency();
    return [...reservas].sort(
      (a, b) => new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime()
    );
  },

  async buscarPorId(id: string): Promise<Reserva | undefined> {
    await simulateLatency(150);
    return reservas.find((r) => r.id === id);
  },

  async criar(dados: Omit<Reserva, "id" | "criadaEm" | "status"> & { status?: Reserva["status"] }): Promise<Reserva> {
    await simulateLatency();
    const nova: Reserva = {
      ...dados,
      status: dados.status ?? "Pendente",
      id: generateId("r"),
      criadaEm: new Date().toISOString(),
    };
    reservas.push(nova);
    return nova;
  },

  async atualizar(id: string, dados: Partial<Omit<Reserva, "id">>): Promise<Reserva | undefined> {
    await simulateLatency();
    const index = reservas.findIndex((r) => r.id === id);
    if (index === -1) return undefined;
    reservas[index] = { ...reservas[index], ...dados };
    return reservas[index];
  },

  async remover(id: string): Promise<boolean> {
    await simulateLatency();
    const index = reservas.findIndex((r) => r.id === id);
    if (index === -1) return false;
    reservas.splice(index, 1);
    return true;
  },
};
