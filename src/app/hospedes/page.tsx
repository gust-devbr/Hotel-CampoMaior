"use client";

import { DataTable } from "@/components/data-table/data-table";
import { hospedesColumns } from "@/components/entities/hospedes/columns";
import { NovoHospedeDialog } from "@/components/entities/hospedes/novo-hospede-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useHospedes } from "@/hooks/use-hospedes";

export default function HospedesPage() {
  const { data, isLoading, isError, error } = useHospedes();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Hóspedes</h1>
          <p className="text-sm text-muted-foreground">
            Identificação e dados de contato dos hóspedes do Hotel Campo Maior.
          </p>
        </div>
        <NovoHospedeDialog />
      </div>

      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : isError ? (
        <p className="text-sm text-destructive">
          Erro ao carregar hóspedes: {(error as Error).message}
        </p>
      ) : (
        <DataTable
          columns={hospedesColumns}
          data={data ?? []}
          searchPlaceholder="Buscar por nome, documento ou cidade..."
        />
      )}
    </div>
  );
}
