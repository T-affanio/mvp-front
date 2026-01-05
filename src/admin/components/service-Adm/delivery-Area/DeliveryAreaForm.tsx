"use client";

import { useDeliveryAreaForm } from "@/admin/hooks/deliveryArea/useDeliveryAreaForm";
import { DeliveryArea } from "@/admin/types/Delivery";

type Props = {
  area?: DeliveryArea | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function DeliveryAreaForm({ area, onClose, onSaved }: Props) {
  const { form, loading, isEdit, update, save, remove } =
    useDeliveryAreaForm(area ?? null, onSaved);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-xl font-semibold text-black">
          {isEdit ? "Editar área" : "Nova área"}
        </h3>

        <input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Nome da área"
          className="w-full border rounded-lg p-3 text-black opacity-80"
        />

        <input
          type="number"
          value={form.fee}
          onChange={(e) => update("fee", e.target.value)}
          placeholder="Frete"
          className="w-full border rounded-lg p-3 text-black opacity-80"
        />

        {isEdit && (
          <label className="flex items-center gap-2 text-sm text-black opacity-80 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => update("active", e.target.checked)}
            />
            Área ativa
          </label>
        )}

        <div className="flex justify-between pt-4 cursor-pointer">
          {isEdit && (
            <button onClick={remove} className="text-red-600 text-sm">
              Excluir
            </button>
          )}

          <div className="ml-auto flex gap-3">
            <button onClick={onClose} className="text-[#B00E0E] cursor-pointer">Cancelar</button>
            <button
              onClick={save}
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
