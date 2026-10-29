"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { useCriarReserva } from "@/modules/reservas/hooks/use-reservas";

const initialState = {
  hospedeId: "",
  quartoId: "",
  dataCheckinPrevista: "",
  dataCheckoutPrevista: "",
  hospedes: "1",
};

export function NovaReservaDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const { data: hospedes } = useHospedes();
  const { data: quartos } = useQuartos();
  const criarReserva = useCriarReserva();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    criarReserva.mutate(
      {
        hospedeId: form.hospedeId,
        quartoId: form.quartoId,
        dataCheckinPrevista: form.dataCheckinPrevista,
        dataCheckoutPrevista: form.dataCheckoutPrevista,
        hospedes: Number(form.hospedes),
      },
      {
        onSuccess: () => {
          setForm(initialState);
          setOpen(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Nova reserva
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Registrar reserva</DialogTitle>
            <DialogDescription>
              Regras de disponibilidade, cancelamento e cobrança ainda serão
              validadas com o cliente; este formulário registra apenas a intenção
              de ocupação.
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
              <Label>Quarto</Label>
              <Select value={form.quartoId} onValueChange={(v) => setForm({ ...form, quartoId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o quarto" />
                </SelectTrigger>
                <SelectContent>
                  {quartos?.map((q) => (
                    <SelectItem key={q.id} value={q.id}>
                      {q.numero} — {q.tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="checkin">Check-in previsto</Label>
                <Input
                  id="checkin"
                  type="date"
                  required
                  value={form.dataCheckinPrevista}
                  onChange={(e) => setForm({ ...form, dataCheckinPrevista: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="checkout">Check-out previsto</Label>
                <Input
                  id="checkout"
                  type="date"
                  required
                  value={form.dataCheckoutPrevista}
                  onChange={(e) => setForm({ ...form, dataCheckoutPrevista: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="qtdHospedes">Quantidade de hóspedes</Label>
              <Input
                id="qtdHospedes"
                type="number"
                min={1}
                value={form.hospedes}
                onChange={(e) => setForm({ ...form, hospedes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={criarReserva.isPending || !form.hospedeId || !form.quartoId}>
              {criarReserva.isPending ? "Salvando..." : "Salvar reserva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
