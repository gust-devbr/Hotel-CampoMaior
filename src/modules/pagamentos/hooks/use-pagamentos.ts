import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Pagamento } from "@/modules/pagamentos/types";

export function usePagamentos() {
  return useQuery({
    queryKey: queryKeys.pagamentos.all,
    queryFn: () => apiClient.get<Pagamento[]>("/api/pagamentos"),
  });
}

export function useRegistrarPagamento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.patch<Pagamento>(`/api/pagamentos/${id}`, { acao: "registrar" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pagamentos.all });
    },
  });
}

export function useEstornarPagamento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.patch<Pagamento>(`/api/pagamentos/${id}`, { acao: "estornar" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pagamentos.all });
    },
  });
}
