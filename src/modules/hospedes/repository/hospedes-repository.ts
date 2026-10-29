import { hospedes } from "@/lib/data/mock-db";
import { generateId, simulateLatency } from "@/lib/data/helpers";
import type { Hospede } from "@/modules/hospedes/types";

/**
 * Camada de acesso a dados dos hóspedes.
 *
 * Hoje lê e escreve no array em memória `hospedes`. No dia em que houver um
 * banco de dados real, esta é a ÚNICA camada que precisa ser reescrita
 * (por exemplo, trocando os corpos das funções por `prisma.hospede.findMany()`,
 * etc.) — as rotas de API, os hooks do React Query e as páginas continuam
 * funcionando sem alterações, pois dependem apenas destas assinaturas.
 */
export const hospedesRepository = {
  async listar(): Promise<Hospede[]> {
    await simulateLatency();
    return [...hospedes].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  },

  async buscarPorId(id: string): Promise<Hospede | undefined> {
    await simulateLatency(150);
    return hospedes.find((h) => h.id === id);
  },

  async criar(dados: Omit<Hospede, "id" | "criadoEm">): Promise<Hospede> {
    await simulateLatency();
    const novo: Hospede = {
      ...dados,
      id: generateId("h"),
      criadoEm: new Date().toISOString(),
    };
    hospedes.push(novo);
    return novo;
  },

  async atualizar(id: string, dados: Partial<Omit<Hospede, "id">>): Promise<Hospede | undefined> {
    await simulateLatency();
    const index = hospedes.findIndex((h) => h.id === id);
    if (index === -1) return undefined;
    hospedes[index] = { ...hospedes[index], ...dados };
    return hospedes[index];
  },

  async remover(id: string): Promise<boolean> {
    await simulateLatency();
    const index = hospedes.findIndex((h) => h.id === id);
    if (index === -1) return false;
    hospedes.splice(index, 1);
    return true;
  },
};
