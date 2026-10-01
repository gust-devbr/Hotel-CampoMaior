"use client";

import { DataTable } from "@/components/data-table/data-table";
import { quartosColumns } from "@/components/entities/quartos/columns";
import { NovoQuartoDialog } from "@/components/entities/quartos/novo-quarto-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuartos } from "@/hooks/use-quartos";

export default function QuartosPage() {
  const { data, isLoading, isError, error } = useQuartos();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Quartos</h1>
          <p className="text-sm text-muted-foreground">
            Cadastro e situação dos quartos (Disponível, Ocupado ou Reservado).
          </p>
        </div>
        <NovoQuartoDialog />
      </div>

      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : isError ? (
        <p className="text-sm text-destructive">
          Erro ao carregar quartos: {(error as Error).message}
        </p>
      ) : (
        <DataTable
          columns={quartosColumns}
          data={data ?? []}
          searchPlaceholder="Buscar por número ou tipo..."
        />
      )}
    </div>
  );
}
