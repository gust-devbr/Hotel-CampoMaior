/**
 * Simula a latência de uma consulta real a um banco de dados. Mantém a UI e
 * as chamadas do React Query realistas mesmo usando dados em memória, e
 * pode ser removido sem impacto quando o acesso real ao banco for plugado.
 */
export function simulateLatency(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
