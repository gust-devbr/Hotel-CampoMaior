"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BedDouble,
  CalendarRange,
  DoorOpen,
  LayoutDashboard,
  ReceiptText,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Painel", icon: LayoutDashboard },
  { href: "/hospedes", label: "Hóspedes", icon: Users },
  { href: "/quartos", label: "Quartos", icon: BedDouble },
  { href: "/reservas", label: "Reservas", icon: CalendarRange },
  { href: "/hospedagens", label: "Check-in / Check-out", icon: DoorOpen },
  { href: "/pagamentos", label: "Pagamentos", icon: ReceiptText },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
