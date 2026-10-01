"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { useHospedes } from "@/hooks/use-hospedes";
import { useQuartos } from "@/hooks/use-quartos";
import { useAtualizarReserva } from "@/hooks/use-reservas";
import type { Reserva } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ReservaRow extends Reserva {
  hospedeNome: string;
  quartoNumero: string;
}

export function ReservasTable({ reservas }: { reservas: Reserva[] }) {
  const { data: hospedes } = useHospedes();
  const { data: quartos } = useQuartos();
  const atualizarReserva = useAtualizarReserva();

  const rows: ReservaRow[] = useMemo(() => {
    return reservas.map((r) => ({
      ...r,
      hospedeNome: hospedes?.find((h) => h.id === r.hospedeId)?.nome ?? r.hospedeId,
      quartoNumero: quartos?.find((q) => q.id === r.quartoId)?.numero ?? r.quartoId,
    }));
  }, [reservas, hospedes, quartos]);

  const columns: ColumnDef<ReservaRow>[] = [
    { accessorKey: "hospedeNome", header: "Hóspede" },
    { accessorKey: "quartoNumero", header: "Quarto" },
    {
      accessorKey: "dataCheckinPrevista",
      header: "Check-in previsto",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    {
      accessorKey: "dataCheckoutPrevista",
      header: "Check-out previsto",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    { accessorKey: "hospedes", header: "Hóspedes" },
    {
      accessorKey: "status",
      header: "Situação",
      cell: ({ getValue }) => <StatusBadge status={getValue<string>()} />,
    },
    {
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => {
        const reserva = row.original;
        if (reserva.status !== "Pendente") return null;
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => atualizarReserva.mutate({ id: reserva.id, dados: { status: "Confirmada" } })}
            >
              Confirmar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => atualizarReserva.mutate({ id: reserva.id, dados: { status: "Cancelada" } })}
            >
              Cancelar
            </Button>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={rows} searchPlaceholder="Buscar por hóspede ou quarto..." />;
}
