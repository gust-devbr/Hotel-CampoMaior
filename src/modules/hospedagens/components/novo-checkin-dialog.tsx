"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHospedes } from "@/modules/hospedes/hooks/use-hospedes";
import { useQuartos } from "@/modules/quartos/hooks/use-quartos";
import { useRegistrarCheckin } from "@/modules/hospedagens/hooks/use-hospedagens";

const initialState = { hospedeId: "", quartoId: "", dataCheckoutPrevista: "" };

export function NovoCheckinDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const { data: hospedes } = useHospedes();
  const { data: quartos } = useQuartos();
  const registrarCheckin = useRegistrarCheckin();

  const quartosDisponiveis = quartos?.filter((q) => q.status !== "Ocupado") ?? [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    registrarCheckin.mutate(form, {
      onSuccess: () => {
        setForm(initialState);
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LogIn /> Registrar check-in
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Registrar check-in</DialogTitle>
            <DialogDescription>
              Ao confirmar, o quarto selecionado passa a ficar com situação
              &quot;Ocupado&quot;.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label>Hóspede</Label>
              <Select value={form.hospedeId} onValueChange={(v) => setForm({ ...form, hospedeId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o hóspede" />
                </SelectTrigger>
                <SelectContent>
                  {hospedes?.map((h) => (
                    <SelectItem key={h.id} value={h.id}>
                      {h.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label>Quarto (disponíveis ou reservados)</Label>
              <Select value={form.quartoId} onValueChange={(v) => setForm({ ...form, quartoId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o quarto" />
                </SelectTrigger>
                <SelectContent>
                  {quartosDisponiveis.map((q) => (
                    <SelectItem key={q.id} value={q.id}>
                      {q.numero} — {q.tipo} ({q.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="checkoutPrevisto">Check-out previsto</Label>
              <Input
                id="checkoutPrevisto"
                type="date"
                required
                value={form.dataCheckoutPrevista}
                onChange={(e) => setForm({ ...form, dataCheckoutPrevista: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={registrarCheckin.isPending || !form.hospedeId || !form.quartoId}
            >
              {registrarCheckin.isPending ? "Salvando..." : "Confirmar check-in"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
