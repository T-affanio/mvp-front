"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { useCategories } from "@/admin/hooks/Products-Categories/useCategories";
import { useVariations } from "@/admin/hooks/Products-Categories/useVariations";
import { useCreateProduct } from "@/admin/hooks/Products-Categories/useCreateProduct";

import { CategorySelect } from "./CategorySelect";
import { CreateCategoryForm } from "./CreateCategoryForm";
import { ImageUpload } from "./ImageUpload";

import { CreateVariationDTO } from "@/admin/types/product";

type Props = {
  onClose?: () => void;
};

export default function ProductForm({ onClose }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);

  const { categories, setCategories, creating, setCreating } = useCategories();
  const { variations, update, add, remove } = useVariations();
  const { createProduct } = useCreateProduct();

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!name || !categoryId) return;

  setLoading(true);

  try {
    // 🔥 conversão correta
    const formattedVariations: CreateVariationDTO[] = variations.map((v) => ({
      name: v.name,
      price: Number(v.price),
    }));

    await createProduct({
      name,
      description,
      categoryId,
      variations: formattedVariations,
      images: image ? [image] : [],
      onSuccess: () => {
        alert("Produto criado com sucesso ✅");
        onClose?.();
      },
    });
  } catch (err) {
    console.error(err);
    alert("Erro ao criar produto ❌");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="
          relative 
          w-full 
          max-w-2xl 
          bg-white 
          rounded-2xl 
          shadow-lg 
          p-8 
          space-y-4 
          text-black
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black"
          >
            <X size={20} />
          </button>
        )}

        <div>
          <h1 className="text-2xl font-semibold">Novo Produto</h1>
          <p className="text-sm text-gray-500">
            Cadastre um novo item no cardápio
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Nome do produto</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tamanhos / Variações</label>

          {variations.map((v, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="flex-1 rounded-lg border px-3 py-2"
                placeholder="Ex: Médio, 500g"
                value={v.name}
                onChange={(e) => update(index, "name", e.target.value)}
              />

              <input
                className="w-32 rounded-lg border px-3 py-2"
                placeholder="Preço"
                value={v.price}
                onChange={(e) => update(index, "price", e.target.value)}
                required
              />

              {variations.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={add}
            className="text-sm text-[#C01212] font-semibold underline"
          >
            + Adicionar variação
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Descrição</label>
          <textarea
            className="w-full rounded-lg border px-3 py-2 min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Categoria</label>

          <CategorySelect
            categories={categories}
            value={categoryId}
            onChange={setCategoryId}
            onCreateClick={() => setCreating(true)}
          />

          {creating && (
            <CreateCategoryForm
              onCancel={() => setCreating(false)}
              onCreated={(cat) => {
                setCategories((prev) => [...prev, cat]);
                setCategoryId(cat.id);
                setCreating(false);
              }}
            />
          )}
        </div>

        <ImageUpload image={image} onChange={setImage} />

        <div className="pt-4 flex justify-end gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border"
            >
              Cancelar
            </button>
          )}

          <button
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Criar produto"}
          </button>
        </div>
      </form>
    </div>
  );
}
