"use client";

import { useState } from "react";
import { usePromotions } from "@/admin/hooks/promotion/usePromotionForm";
import { Promotion } from "@/admin/types/Promotion";
import { PromotionApi } from "@/admin/services/promotion.service";
import PromotionForm from "./PromotionForm";

export default function PromotionList() {
  const { promotions, reload } = usePromotions();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Promotion | null>(null);

  async function toggle(promo: Promotion) {
    await PromotionApi.toggle(promo.id, !promo.active);
    reload();
  }

  async function remove(promo: Promotion) {
    if (!confirm(`Excluir promoção "${promo.name}"?`)) return;
    await PromotionApi.delete(promo.id);
    reload();
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-[#989595] ">
        <div>
          <h2 className="text-xl font-semibold text-black">Promoções</h2>
          <p className="text-sm text-gray-500 pt-2">
            Ofertas, combos e descontos ativos
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#B00E0E] text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-600 transition font-semibold"
        >
          + Nova promoção
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="border border-[#989595] rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-black">{promo.name}</h3>
              <p className="text-sm text-gray-500">
                {promo.type === "PRODUCT" ? "Oferta em produto" : "Combo"}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <span
                className={`text-sm font-semibold cursor-pointer ${
                  promo.active ? "text-green-600" : "text-gray-400"
                }`}
              >
                {promo.active ? "Ativa" : "Inativa"}
              </span>

              <button
                onClick={() => toggle(promo)}
                className="text-[#B00E0E] text-sm hover:underline font-semibold cursor-pointer"
              >
                {promo.active ? "Desativar" : "Ativar"}
              </button>

              <button
                onClick={() => {
                  setEditing(promo);
                  setOpen(true);
                }}
                className="text-[#B00E0E] text-sm hover:underline font-semibold cursor-pointer"
              >
                Editar
              </button>

              <button
                onClick={() => remove(promo)}
                className="text-red-600 text-sm hover:underline font-semibold cursor-pointer"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

        {promotions.length === 0 && (
          <div className="text-center text-gray-400 py-6">
            Nenhuma promoção cadastrada
          </div>
        )}
      </div>

      {/* MODAL */}
      {open && (
        <PromotionForm
          promotion={editing}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSaved={() => {
            reload();
            setOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
