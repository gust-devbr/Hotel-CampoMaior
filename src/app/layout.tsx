import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";

export const metadata: Metadata = {
  title: "Hotel Campo Maior — Sistema de Reservas",
  description:
    "Protótipo do sistema de reservas do Hotel Campo Maior, desenvolvido pela BytePower.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <QueryProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <aside className="hidden w-56 shrink-0 border-r bg-card md:block">
                <SidebarNav />
              </aside>
              <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
