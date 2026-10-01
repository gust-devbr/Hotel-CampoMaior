import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Reserva } from "@/lib/types";

export function useReservas() {
  return useQuery({
    queryKey: queryKeys.reservas.all,
    queryFn: () => apiClient.get<Reserva[]>("/api/reservas"),
  });
}

export type NovaReserva = {
  hospedeId: string;
  quartoId: string;
  dataCheckinPrevista: string;
  dataCheckoutPrevista: string;
  hospedes: number;
  observacoes?: string;
};

export function useCriarReserva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: NovaReserva) => apiClient.post<Reserva>("/api/reservas", dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.quartos.all });
    },
  });
}

export function useAtualizarReserva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: Partial<Reserva> }) =>
      apiClient.patch<Reserva>(`/api/reservas/${id}`, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservas.all });
    },
  });
}
