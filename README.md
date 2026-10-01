# Hotel Campo Maior — Sistema de Reservas (protótipo)

Protótipo funcional do sistema de reservas descrito no *Documento de Visão*
do Hotel Campo Maior (BytePower). Usa **dados fictícios** e foi estruturado
para que um back-end real (API externa e/ou banco de dados) possa ser
plugado depois, sem redesenhar o front-end.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- Componentes no estilo **shadcn/ui** (Radix UI + class-variance-authority)
- **TanStack Query v5** — cache e chamadas de dados
- **TanStack Table v8** — tabelas com ordenação, busca e paginação

## Como rodar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

Também é possível gerar um build de produção:

```bash
npm run build
npm run start
```

## Domínio coberto

De acordo com o escopo inicial do Documento de Visão (seção 5.1), o
protótipo cobre as seis áreas confirmadas pelo cliente:

- **Hóspedes** — cadastro e listagem.
- **Quartos** — cadastro, tipo, capacidade, diária e situação (Disponível /
  Ocupado / Reservado).
- **Reservas** — registro da intenção de ocupação, com confirmação/
  cancelamento.
- **Check-in / Check-out** — jornada da hospedagem; registrar check-in muda
  o quarto para "Ocupado", registrar check-out libera o quarto.
- **Pagamentos** — registro e acompanhamento de pagamentos vinculados à
  hospedagem (pendente / pago / estornado).
- **Painel** — indicadores gerais (hóspedes, quartos disponíveis, reservas
  pendentes, hospedagens em andamento, pagamentos pendentes).

Itens explicitamente fora do escopo inicial (app para hóspedes, reservas
públicas, integrações externas, módulos de restaurante/lavanderia,
relatórios avançados etc. — seção 5.2 do documento) **não** foram
implementados neste protótipo.

## Estrutura do projeto (pensada para crescer)

```
src/
  app/
    api/<entidade>/route.ts          # GET (lista) + POST (cria)
    api/<entidade>/[id]/route.ts     # GET/PATCH/DELETE de um registro
    <entidade>/page.tsx              # páginas de cada módulo
    page.tsx                         # painel (dashboard)
    layout.tsx                       # layout raiz (sidebar + header)
    globals.css                      # tema Tailwind v4 (shadcn tokens)

  components/
    ui/                              # componentes shadcn (button, table, dialog...)
    data-table/data-table.tsx        # tabela genérica (TanStack Table)
    layout/                          # sidebar e header
    entities/<entidade>/             # colunas, tabelas e diálogos por entidade
    dashboard/                       # cards de indicadores
    providers/query-provider.tsx     # QueryClientProvider

  hooks/
    use-hospedes.ts, use-quartos.ts, use-reservas.ts,
    use-hospedagens.ts, use-pagamentos.ts    # hooks do React Query (query + mutation)

  lib/
    types.ts                         # modelo de domínio (fonte da verdade)
    api-client.ts                    # wrapper de fetch usado pelos hooks
    query-keys.ts                    # chaves de cache centralizadas
    utils.ts                         # helpers (cn, formatCurrency, formatDate...)
    data/
      mock-db.ts                     # "banco de dados" em memória (dados fictícios)
      helpers.ts                     # latência simulada + geração de ids
    repositories/
      hospedes-repository.ts
      quartos-repository.ts
      reservas-repository.ts
      hospedagens-repository.ts
      pagamentos-repository.ts
```

### Como plugar uma API/banco de dados real no futuro

O projeto já está dividido em camadas justamente para isolar essa mudança:

1. **Camada de dados (`src/lib/data/mock-db.ts`)** — hoje são arrays em
   memória. Quando houver um banco (Postgres, MySQL, SQLite...), esse
   arquivo deixa de existir.
2. **Camada de repositório (`src/lib/repositories/*`)** — é a **única**
   camada que precisa ser reescrita. Cada função (`listar`, `criar`,
   `atualizar`, `registrarCheckin`, etc.) mantém a mesma assinatura, mas
   passa a chamar um ORM (Prisma/Drizzle) ou um cliente SQL em vez do array
   em memória.
3. **Rotas de API (`src/app/api/**`)** — já seguem o contrato REST
   convencional (GET/POST/PATCH/DELETE, corpo JSON, códigos de status) e não
   precisam mudar, pois só chamam o repositório.
4. **Front-end (hooks do React Query + páginas)** — não precisa mudar em
   nada, pois só conversa com `/api/...` através de `src/lib/api-client.ts`.

Se no futuro o front-end passar a consumir uma **API externa** (em vez das
rotas internas do Next.js), basta apontar `NEXT_PUBLIC_API_BASE_URL` (usada
em `src/lib/api-client.ts`) para a nova URL-base — nenhum hook ou componente
precisa ser alterado.

Os tipos em `src/lib/types.ts` já refletem o modelo conceitual descrito no
Documento de Visão (Hóspede, Quarto, Reserva, Hospedagem, Pagamento) e podem
servir de base direta para um schema Prisma/SQL.

## Observações

- Os dados são reiniciados a cada `npm run dev`/`npm run start` (armazenados
  apenas em memória no processo do servidor).
- Este é um protótipo acadêmico de front-end; regras de negócio (cobrança,
  cancelamento, permissões por perfil etc.) ainda dependem da entrevista com
  o cliente, conforme registrado no próprio Documento de Visão.
