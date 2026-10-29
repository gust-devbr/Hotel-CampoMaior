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
import { useCriarHospede } from "@/modules/hospedes/hooks/use-hospedes";

const initialState = {
  nome: "",
  documento: "",
  email: "",
  telefone: "",
  cidade: "",
};

export function NovoHospedeDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const criarHospede = useCriarHospede();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    criarHospede.mutate(form, {
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
          <Plus /> Novo hóspede
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cadastrar hóspede</DialogTitle>
            <DialogDescription>
              Preencha os dados básicos do hóspede. Os campos podem evoluir após
              a entrevista com o cliente.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="documento">Documento (CPF)</Label>
              <Input
                id="documento"
                required
                value={form.documento}
                onChange={(e) =>
                  setForm({ ...form, documento: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={form.telefone}
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={criarHospede.isPending}>
              {criarHospede.isPending ? "Salvando..." : "Salvar hóspede"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
