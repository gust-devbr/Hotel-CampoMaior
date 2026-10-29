import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Hospede } from "@/modules/hospedes/types";

export function useHospedes() {
  return useQuery({
    queryKey: queryKeys.hospedes.all,
    queryFn: () => apiClient.get<Hospede[]>("/api/hospedes"),
  });
}

export function useCriarHospede() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: Omit<Hospede, "id" | "criadoEm">) =>
      apiClient.post<Hospede>("/api/hospedes", dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hospedes.all });
    },
  });
}
