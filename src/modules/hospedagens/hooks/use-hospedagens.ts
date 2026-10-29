import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Hospedagem } from "@/modules/hospedagens/types";

export function useHospedagens() {
  return useQuery({
    queryKey: queryKeys.hospedagens.all,
    queryFn: () => apiClient.get<Hospedagem[]>("/api/hospedagens"),
  });
}

export type NovoCheckin = {
  reservaId?: string;
  hospedeId: string;
  quartoId: string;
  dataCheckoutPrevista: string;
};

export function useRegistrarCheckin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: NovoCheckin) => apiClient.post<Hospedagem>("/api/hospedagens", dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hospedagens.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.quartos.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
    },
  });
}

export function useRegistrarCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.patch<Hospedagem>(`/api/hospedagens/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hospedagens.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.quartos.all });
    },
  });
}
