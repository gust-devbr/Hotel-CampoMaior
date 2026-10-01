/**
 * Chaves de query centralizadas. Manter isso em um só lugar facilita
 * invalidar caches relacionados (ex.: check-in afeta hospedagens E quartos)
 * de forma consistente à medida que o app cresce.
 */
export const queryKeys = {
  hospedes: {
    all: ["hospedes"] as const,
    detail: (id: string) => ["hospedes", id] as const,
  },
  quartos: {
    all: ["quartos"] as const,
    detail: (id: string) => ["quartos", id] as const,
  },
  reservas: {
    all: ["reservas"] as const,
    detail: (id: string) => ["reservas", id] as const,
  },
  hospedagens: {
    all: ["hospedagens"] as const,
    detail: (id: string) => ["hospedagens", id] as const,
  },
  pagamentos: {
    all: ["pagamentos"] as const,
    detail: (id: string) => ["pagamentos", id] as const,
  },
};
