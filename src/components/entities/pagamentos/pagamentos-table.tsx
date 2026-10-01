"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { useHospedes } from "@/hooks/use-hospedes";
import { useRegistrarPagamento, useEstornarPagamento } from "@/hooks/use-pagamentos";
import type { Pagamento } from "@/lib/types";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

interface PagamentoRow extends Pagamento {
  hospedeNome: string;
}

export function PagamentosTable({ pagamentos }: { pagamentos: Pagamento[] }) {
  const { data: hospedes } = useHospedes();
  const registrarPagamento = useRegistrarPagamento();
  const estornarPagamento = useEstornarPagamento();

  const rows: PagamentoRow[] = useMemo(() => {
    return pagamentos.map((p) => ({
      ...p,
      hospedeNome: hospedes?.find((h) => h.id === p.hospedeId)?.nome ?? p.hospedeId,
    }));
  }, [pagamentos, hospedes]);

  const columns: ColumnDef<PagamentoRow>[] = [
    { accessorKey: "hospedeNome", header: "Hóspede" },
    {
      accessorKey: "valor",
      header: "Valor",
      cell: ({ getValue }) => formatCurrency(getValue<number>()),
    },
    { accessorKey: "forma", header: "Forma" },
    {
      accessorKey: "dataVencimento",
      header: "Vencimento",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    {
      accessorKey: "dataPagamento",
      header: "Pago em",
      cell: ({ getValue }) => {
        const value = getValue<string | undefined>();
        return value ? formatDateTime(value) : "—";
      },
    },
    {
      accessorKey: "status",
      header: "Situação",
      cell: ({ getValue }) => <StatusBadge status={getValue<string>()} />,
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => {
        const pagamento = row.original;
        if (pagamento.status !== "Pendente") return null;
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => registrarPagamento.mutate(pagamento.id)}
              disabled={registrarPagamento.isPending}
            >
              Registrar pagamento
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => estornarPagamento.mutate(pagamento.id)}
              disabled={estornarPagamento.isPending}
            >
              Estornar
            </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={rows} searchPlaceholder="Buscar por hóspede..." />;
}
