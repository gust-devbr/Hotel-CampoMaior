import { Badge, type badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";

type Variant = VariantProps<typeof badgeVariants>["variant"];

const statusMap: Record<string, Variant> = {
  // Quartos
  "Disponível": "success",
  "Ocupado": "destructive",
  "Reservado": "warning",
  // Reservas
  "Confirmada": "success",
  "Pendente": "warning",
  "Cancelada": "destructive",
  // Hospedagens
  "Em andamento": "warning",
  "Finalizada": "secondary",
  // Pagamentos
  "Pago": "success",
  "Estornado": "destructive",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={statusMap[status] ?? "outline"}>{status}</Badge>;
}
