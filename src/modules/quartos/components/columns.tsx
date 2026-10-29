"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Quarto } from "@/modules/quartos/types";
import { StatusBadge } from "@/components/status-badge";
import { formatCurrency } from "@/lib/utils";

export const quartosColumns: ColumnDef<Quarto>[] = [
  { accessorKey: "numero", header: "Número" },
  { accessorKey: "andar", header: "Andar" },
  { accessorKey: "tipo", header: "Tipo" },
  { accessorKey: "capacidade", header: "Capacidade" },
  {
    accessorKey: "valorDiaria",
    header: "Diária",
    cell: ({ getValue }) => formatCurrency(getValue<number>()),
  },
  {
    accessorKey: "status",
    header: "Situação",
    cell: ({ getValue }) => <StatusBadge status={getValue<string>()} />,
  },
];
