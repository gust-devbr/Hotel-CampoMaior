import { pagamentos } from "@/lib/data/mock-db";
import { generateId, simulateLatency } from "@/lib/data/helpers";
import type { Pagamento } from "@/modules/pagamentos/types";

export const pagamentosRepository = {
  async listar(): Promise<Pagamento[]> {
    await simulateLatency();
    return [...pagamentos].sort(
      (a, b) => new Date(b.dataVencimento).getTime() - new Date(a.dataVencimento).getTime()
    );
  },

  async buscarPorId(id: string): Promise<Pagamento | undefined> {
    await simulateLatency(150);
    return pagamentos.find((p) => p.id === id);
  },

  async criar(dados: Omit<Pagamento, "id" | "status" | "dataPagamento"> & { status?: Pagamento["status"] }): Promise<Pagamento> {
    await simulateLatency();
    const novo: Pagamento = {
      ...dados,
      id: generateId("p"),
      status: dados.status ?? "Pendente",
    };
    pagamentos.push(novo);
    return novo;
  },

  async registrarPagamento(id: string): Promise<Pagamento | undefined> {
    await simulateLatency();
    const index = pagamentos.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    pagamentos[index] = {
      ...pagamentos[index],
      status: "Pago",
      dataPagamento: new Date().toISOString(),
    };
    return pagamentos[index];
  },

  async estornar(id: string): Promise<Pagamento | undefined> {
    await simulateLatency();
    const index = pagamentos.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    pagamentos[index] = { ...pagamentos[index], status: "Estornado" };
    return pagamentos[index];
  },
};
