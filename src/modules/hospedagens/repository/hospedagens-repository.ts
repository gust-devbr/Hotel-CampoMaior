import { hospedagens, quartos, reservas } from "@/lib/data/mock-db";
import { generateId, simulateLatency } from "@/lib/data/helpers";
import type { Hospedagem } from "@/modules/hospedagens/types";

/**
 * Camada de acesso a dados de hospedagens (jornada de check-in/check-out).
 *
 * Além do CRUD básico, expõe operações de negócio (`registrarCheckin` e
 * `registrarCheckout`) que também atualizam o status do quarto envolvido,
 * simulando a regra descrita no Documento de Visão (item 6.1 — jornada
 * conceitual da hospedagem). Quando o banco real for adotado, essas
 * operações devem virar transações no banco.
 */
export const hospedagensRepository = {
  async listar(): Promise<Hospedagem[]> {
    await simulateLatency();
    return [...hospedagens].sort(
      (a, b) => new Date(b.dataCheckin).getTime() - new Date(a.dataCheckin).getTime()
    );
  },

  async buscarPorId(id: string): Promise<Hospedagem | undefined> {
    await simulateLatency(150);
    return hospedagens.find((h) => h.id === id);
  },

  async registrarCheckin(dados: {
    reservaId?: string;
    hospedeId: string;
    quartoId: string;
    dataCheckoutPrevista: string;
  }): Promise<Hospedagem> {
    await simulateLatency();
    const nova: Hospedagem = {
      id: generateId("ho"),
      reservaId: dados.reservaId,
      hospedeId: dados.hospedeId,
      quartoId: dados.quartoId,
      dataCheckin: new Date().toISOString(),
      dataCheckoutPrevista: dados.dataCheckoutPrevista,
      status: "Em andamento",
    };
    hospedagens.push(nova);

    const quarto = quartos.find((q) => q.id === dados.quartoId);
    if (quarto) quarto.status = "Ocupado";

    if (dados.reservaId) {
      const reserva = reservas.find((r) => r.id === dados.reservaId);
      if (reserva) reserva.status = "Confirmada";
    }

    return nova;
  },

  async registrarCheckout(id: string): Promise<Hospedagem | undefined> {
    await simulateLatency();
    const index = hospedagens.findIndex((h) => h.id === id);
    if (index === -1) return undefined;

    hospedagens[index] = {
      ...hospedagens[index],
      status: "Finalizada",
      dataCheckoutReal: new Date().toISOString(),
    };

    const quarto = quartos.find((q) => q.id === hospedagens[index].quartoId);
    if (quarto) quarto.status = "Disponível";

    return hospedagens[index];
  },
};
