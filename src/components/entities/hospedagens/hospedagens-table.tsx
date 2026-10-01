"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { useHospedes } from "@/hooks/use-hospedes";
import { useQuartos } from "@/hooks/use-quartos";
import { useRegistrarCheckout } from "@/hooks/use-hospedagens";
import type { Hospedagem } from "@/lib/types";
import { formatDate, formatDateTime } from "@/lib/utils";

interface HospedagemRow extends Hospedagem {
  hospedeNome: string;
  quartoNumero: string;
}

export function HospedagensTable({ hospedagens }: { hospedagens: Hospedagem[] }) {
  const { data: hospedes } = useHospedes();
  const { data: quartos } = useQuartos();
  const registrarCheckout = useRegistrarCheckout();

  const rows: HospedagemRow[] = useMemo(() => {
    return hospedagens.map((h) => ({
      ...h,
      hospedeNome: hospedes?.find((x) => x.id === h.hospedeId)?.nome ?? h.hospedeId,
      quartoNumero: quartos?.find((x) => x.id === h.quartoId)?.numero ?? h.quartoId,
    }));
  }, [hospedagens, hospedes, quartos]);

  const columns: ColumnDef<HospedagemRow>[] = [
    { accessorKey: "hospedeNome", header: "Hóspede" },
    { accessorKey: "quartoNumero", header: "Quarto" },
    {
      accessorKey: "dataCheckin",
      header: "Check-in",
      cell: ({ getValue }) => formatDateTime(getValue<string>()),
    },
    {
      accessorKey: "dataCheckoutPrevista",
      header: "Check-out previsto",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    {
      accessorKey: "dataCheckoutReal",
      header: "Check-out real",
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
        const hospedagem = row.original;
        if (hospedagem.status !== "Em andamento") return null;
        return (
          <Button
            size="sm"
            variant="outline"
            onClick={() => registrarCheckout.mutate(hospedagem.id)}
            disabled={registrarCheckout.isPending}
          >
            Registrar check-out
          </Button>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={rows} searchPlaceholder="Buscar por hóspede ou quarto..." />;
}
