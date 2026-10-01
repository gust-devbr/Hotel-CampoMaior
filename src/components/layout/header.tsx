import { BedDouble } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-3 border-b bg-card px-4">
      <div className="flex items-center gap-2 font-semibold">
        <BedDouble className="size-5 text-primary" />
        <span>Hotel Campo Maior</span>
      </div>
      <span className="text-xs text-muted-foreground">
        Sistema de Reservas — protótipo BytePower
      </span>
    </header>
  );
}
