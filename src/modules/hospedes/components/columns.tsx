"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Hospede } from "@/modules/hospedes/types";
import { formatDate } from "@/lib/utils";

export const hospedesColumns: ColumnDef<Hospede>[] = [
  { accessorKey: "nome", header: "Nome" },
  { accessorKey: "documento", header: "Documento" },
  { accessorKey: "email", header: "E-mail" },
  { accessorKey: "telefone", header: "Telefone" },
  { accessorKey: "cidade", header: "Cidade" },
  {
    accessorKey: "criadoEm",
    header: "Cadastrado em",
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
];
