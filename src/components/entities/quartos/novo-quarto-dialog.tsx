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
import { useCriarQuarto } from "@/hooks/use-quartos";
import type { QuartoTipo } from "@/lib/types";

const initialState = {
  numero: "",
  andar: "1",
  tipo: "Standard" as QuartoTipo,
  capacidade: "2",
  valorDiaria: "",
};

export function NovoQuartoDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const criarQuarto = useCriarQuarto();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    criarQuarto.mutate(
      {
        numero: form.numero,
        andar: Number(form.andar),
        tipo: form.tipo,
        capacidade: Number(form.capacidade),
        valorDiaria: Number(form.valorDiaria),
        status: "Disponível",
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
          <Plus /> Novo quarto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cadastrar quarto</DialogTitle>
            <DialogDescription>
              Tipos, capacidade e critérios de ocupação ainda serão validados com o
              cliente; estes campos representam a hipótese inicial.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  required
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="andar">Andar</Label>
                <Input
                  id="andar"
                  type="number"
                  min={1}
                  value={form.andar}
                  onChange={(e) => setForm({ ...form, andar: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label>Tipo</Label>
              <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v as QuartoTipo })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Luxo">Luxo</SelectItem>
                  <SelectItem value="Suíte">Suíte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="capacidade">Capacidade</Label>
                <Input
                  id="capacidade"
                  type="number"
                  min={1}
                  value={form.capacidade}
                  onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="valorDiaria">Valor da diária (R$)</Label>
                <Input
                  id="valorDiaria"
                  type="number"
                  min={0}
                  step="0.01"
                  required
                  value={form.valorDiaria}
                  onChange={(e) => setForm({ ...form, valorDiaria: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={criarQuarto.isPending}>
              {criarQuarto.isPending ? "Salvando..." : "Salvar quarto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
