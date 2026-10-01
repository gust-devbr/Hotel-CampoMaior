"use client";

import { HospedagensTable } from "@/components/entities/hospedagens/hospedagens-table";
import { NovoCheckinDialog } from "@/components/entities/hospedagens/novo-checkin-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useHospedagens } from "@/hooks/use-hospedagens";

export default function HospedagensPage() {
  const { data, isLoading, isError, error } = useHospedagens();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Check-in / Check-out</h1>
          <p className="text-sm text-muted-foreground">
            Jornada da hospedagem: do registro de entrada até o encerramento da
            permanência do hóspede.
          </p>
        </div>
        <NovoCheckinDialog />
      </div>

      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : isError ? (
        <p className="text-sm text-destructive">
          Erro ao carregar hospedagens: {(error as Error).message}
        </p>
      ) : (
        <HospedagensTable hospedagens={data ?? []} />
      )}
    </div>
  );
}
