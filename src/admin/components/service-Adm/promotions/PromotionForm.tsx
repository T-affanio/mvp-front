"use client";

import { useProducts } from "@/admin/hooks/Products-Categories/useProducts";
import { usePromotionForm } from "@/admin/hooks/promotion/usePromotionForm";
import { Promotion } from "@/admin/types/Promotion";

type Props = {
  promotion?: Promotion | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function PromotionForm({
  promotion,
  onClose,
  onSaved,
}: Props) {
  const { products, loading: loadingProducts } = useProducts();
  const { form, loading, update, toggleProduct, save } =
    usePromotionForm(promotion ?? null, onSaved);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-5">
        <h3 className="text-lg font-semibold text-[#B00E0E]">
          {promotion ? "Editar promoção" : "Nova promoção"}
        </h3>

        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Nome da promoção"
          className="w-full border rounded-lg p-3 text-black opacity-70"
        />

        <div className="flex gap-3">
          <select
            value={form.discountType}
            onChange={(e) =>
              update("discountType", e.target.value as any)
            }
            className="border rounded-lg p-2 text-black opacity-70 cursor-pointer"
          >
            <option value="PERCENT">%</option>
            <option value="FIXED">R$</option>
          </select>

          <input
            type="number"
            value={form.discountValue}
            onChange={(e) =>
              update("discountValue", Number(e.target.value))
            }
            className="border rounded-lg p-2 flex-1 text-black opacity-70"
          />
        </div>

        <div className="max-h-60 overflow-auto border-t border-black opacity-90">
          {loadingProducts && <p className="p-3">Carregando...</p>}

          {!loadingProducts &&
            products.map((product) => (
              <label
                key={product.id}
                className="flex items-center gap-3 p-3 border-b cursor-pointer text-black "
              >
                <input
                  type="checkbox"
                  checked={form.productIds.includes(product.id)}
                  onChange={() => toggleProduct(product.id)}
                />
                <span>{product.name}</span>
                <span className="ml-auto text-black">
                  R$ {Number(product.price).toFixed(2)}
                </span>
              </label>
            ))}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-[#B00E0E] cursor-pointer">Cancelar</button>
          <button
            onClick={save}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            {loading ? "Salvando..." : "Salvar promoção"}
          </button>
        </div>
      </div>
    </div>
  );
}
