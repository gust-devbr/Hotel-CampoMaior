"use client";

import { PagamentosTable } from "@/modules/pagamentos/components/pagamentos-table";
import { Skeleton } from "@/components/ui/skeleton";
import { usePagamentos } from "@/modules/pagamentos/hooks/use-pagamentos";

export default function PagamentosPage() {
  const { data, isLoading, isError, error } = usePagamentos();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Pagamentos</h1>
        <p className="text-sm text-muted-foreground">
          Registros financeiros relacionados às hospedagens, com pagamentos
          pendentes, pagos ou estornados.
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : isError ? (
        <p className="text-sm text-destructive">
          Erro ao carregar pagamentos: {(error as Error).message}
        </p>
      ) : (
        <PagamentosTable pagamentos={data ?? []} />
      )}
    </div>
  );
}
