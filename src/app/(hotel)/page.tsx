"use client";

import { BedDouble, CalendarRange, DoorOpen, ReceiptText, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHospedes } from "@/modules/hospedes/hooks/use-hospedes";
import { useQuartos } from "@/modules/quartos/hooks/use-quartos";
import { useReservas } from "@/modules/reservas/hooks/use-reservas";
import { useHospedagens } from "@/modules/hospedagens/hooks/use-hospedagens";
import { usePagamentos } from "@/modules/pagamentos/hooks/use-pagamentos";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const { data: hospedes, isLoading: loadingHospedes } = useHospedes();
  const { data: quartos, isLoading: loadingQuartos } = useQuartos();
  const { data: reservas, isLoading: loadingReservas } = useReservas();
  const { data: hospedagens, isLoading: loadingHospedagens } = useHospedagens();
  const { data: pagamentos, isLoading: loadingPagamentos } = usePagamentos();

  const quartosDisponiveis = quartos?.filter((q) => q.status === "Disponível").length ?? 0;
  const reservasPendentes = reservas?.filter((r) => r.status === "Pendente").length ?? 0;
  const hospedagensAtivas = hospedagens?.filter((h) => h.status === "Em andamento").length ?? 0;
  const pagamentosPendentes = pagamentos?.filter((p) => p.status === "Pendente") ?? [];
  const totalPendente = pagamentosPendentes.reduce((acc, p) => acc + p.valor, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Painel do Hotel Campo Maior</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral da operação com dados fictícios, conforme o escopo inicial do
          Documento de Visão (hóspedes, quartos, reservas, check-in/check-out e
          pagamentos).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Hóspedes cadastrados"
          value={hospedes?.length ?? 0}
          icon={Users}
          loading={loadingHospedes}
        />
        <StatCard
          title="Quartos disponíveis"
          value={quartosDisponiveis}
          icon={BedDouble}
          hint={quartos ? `de ${quartos.length} quartos` : undefined}
          loading={loadingQuartos}
        />
        <StatCard
          title="Reservas pendentes"
          value={reservasPendentes}
          icon={CalendarRange}
          loading={loadingReservas}
        />
        <StatCard
          title="Hospedagens em andamento"
          value={hospedagensAtivas}
          icon={DoorOpen}
          loading={loadingHospedagens}
        />
        <StatCard
          title="Pagamentos pendentes"
          value={formatCurrency(totalPendente)}
          icon={ReceiptText}
          hint={`${pagamentosPendentes.length} pagamento(s)`}
          loading={loadingPagamentos}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sobre este protótipo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Este site consome dados fictícios através de rotas de API internas
            (<code className="rounded bg-muted px-1 py-0.5">/api/hospedes</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5">/api/quartos</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5">/api/reservas</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5">/api/hospedagens</code> e{" "}
            <code className="rounded bg-muted px-1 py-0.5">/api/pagamentos</code>),
            já organizadas em uma camada de repositório separada dos dados em
            memória.
          </p>
          <p>
            Quando um banco de dados real for adotado, basta reescrever os arquivos
            em <code className="rounded bg-muted px-1 py-0.5">src/modules/*/repository</code>{" "}
            — o front-end, os hooks do React Query e as rotas de API não precisam
            mudar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
