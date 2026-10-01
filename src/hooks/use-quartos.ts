import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Quarto } from "@/lib/types";

export function useQuartos() {
  return useQuery({
    queryKey: queryKeys.quartos.all,
    queryFn: () => apiClient.get<Quarto[]>("/api/quartos"),
  });
}

export function useCriarQuarto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: Omit<Quarto, "id">) =>
      apiClient.post<Quarto>("/api/quartos", dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quartos.all });
    },
  });
}
