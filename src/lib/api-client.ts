import type { ApiError } from "@/lib/types";

/**
 * Wrapper fino sobre `fetch` usado por todos os hooks do React Query.
 *
 * Hoje as chamadas vão para as rotas internas do Next.js (`/api/...`), que
 * leem os dados fictícios em memória. Se no futuro o front-end passar a
 * consumir uma API externa (outro serviço, outra URL-base), basta ajustar
 * `resolveUrl` — nenhum hook ou componente precisa mudar.
 */

function resolveUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  return `${base}${path}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(resolveUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const error = (await response
      .json()
      .catch(() => ({}))) as Partial<ApiError>;
    throw new Error(
      error.message ?? `Erro ao chamar ${path} (${response.status})`,
    );
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
