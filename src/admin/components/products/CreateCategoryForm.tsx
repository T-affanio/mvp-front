"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Category } from "@/admin/types/product";
import { createCategory } from "@/admin/services/product-categories.service";


type Props = {
  onCreated: (category: Category) => void;
  onCancel: () => void;
};

export function CreateCategoryForm({ onCreated, onCancel }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const category = await createCategory(name);
      onCreated(category);
      setName("");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao criar categoria"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative bg-gray-50 border rounded-xl p-4 space-y-3">
      {/* ❌ Fechar */}
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
      >
        <X size={18} />
      </button>

      <h3 className="text-sm font-medium">Nova categoria</h3>

      <input
        className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-black outline-none"
        placeholder="Nome da categoria"
        value={name}
        onChange={e => setName(e.target.value)}
        autoFocus
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      <div className="flex gap-2 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleCreate}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-lg bg-black text-white disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar"}
        </button>
      </div>
    </div>
  );
}
