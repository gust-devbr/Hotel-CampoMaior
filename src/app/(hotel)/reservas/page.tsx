"use client";

import { NovaReservaDialog } from "@/modules/reservas/components/nova-reserva-dialog";
import { ReservasTable } from "@/modules/reservas/components/reservas-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useReservas } from "@/modules/reservas/hooks/use-reservas";

export default function ReservasPage() {
  const { data, isLoading, isError, error } = useReservas();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Reservas</h1>
          <p className="text-sm text-muted-foreground">
            Registro da intenção de ocupação de um quarto em determinado período.
          </p>
        </div>
        <NovaReservaDialog />
      </div>

      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : isError ? (
        <p className="text-sm text-destructive">
          Erro ao carregar reservas: {(error as Error).message}
        </p>
      ) : (
        <ReservasTable reservas={data ?? []} />
      )}
    </div>
  );
}
