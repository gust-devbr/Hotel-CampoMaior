import { quartos } from "@/lib/data/mock-db";
import { generateId, simulateLatency } from "@/lib/data/helpers";
import type { Quarto } from "@/lib/types";

export const quartosRepository = {
  async listar(): Promise<Quarto[]> {
    await simulateLatency();
    return [...quartos].sort((a, b) => a.numero.localeCompare(b.numero));
  },

  async buscarPorId(id: string): Promise<Quarto | undefined> {
    await simulateLatency(150);
    return quartos.find((q) => q.id === id);
  },

  async criar(dados: Omit<Quarto, "id">): Promise<Quarto> {
    await simulateLatency();
    const novo: Quarto = { ...dados, id: generateId("q") };
    quartos.push(novo);
    return novo;
  },

  async atualizar(id: string, dados: Partial<Omit<Quarto, "id">>): Promise<Quarto | undefined> {
    await simulateLatency();
    const index = quartos.findIndex((q) => q.id === id);
    if (index === -1) return undefined;
    quartos[index] = { ...quartos[index], ...dados };
    return quartos[index];
  },

  async remover(id: string): Promise<boolean> {
    await simulateLatency();
    const index = quartos.findIndex((q) => q.id === id);
    if (index === -1) return false;
    quartos.splice(index, 1);
    return true;
  },
};
