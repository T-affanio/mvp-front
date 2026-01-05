"use client";

import { useState } from "react";
import { useDeliveryAreas } from "@/admin/hooks/deliveryArea/useDeliveryAreas";
import { DeliveryArea } from "@/admin/types/Delivery";
import DeliveryAreaForm from "./DeliveryAreaForm";

export default function DeliveryAreaList() {
  const { areas, reload } = useDeliveryAreas();
  const [editing, setEditing] = useState<DeliveryArea | null>(null);
  const [open, setOpen] = useState(false);

  function openNew() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(area: DeliveryArea) {
    setEditing(area);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setEditing(null);
  }

  function handleSaved() {
    reload();
    close();
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-[#989595] pt-2">
        <div>
          <h2 className="text-xl font-semibold text-black">Frete por área</h2>
          <p className="text-sm text-gray-500 pt-2">
            Configure o valor de entrega por região
          </p>
        </div>

        <button
          onClick={openNew}
          className="bg-[#B00E0E] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold cursor-pointer"
        >
          + Nova área
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-[#989595]">
            <tr className="border-b border-[#989595] text-[#313131]">
              <th className="text-left p-3">Área</th>
              <th className="text-center p-3">Frete</th>
              <th className="text-right p-3 pr-12">Ações</th>
            </tr>
          </thead>

          <tbody>
            {areas.map((area) => (
              <tr key={area.id} className="border-b border-[#989595]">
                <td className="p-3 font-semibold text-[#636363]">
                  {area.name}
                </td>
                <td className="p-3 text-center text-[#636363]">
                  R$ {area.fee.toFixed(2)}
                </td>
                <td className="p-3 pr-12 text-right">
                  <button
                    onClick={() => openEdit(area)}
                    className="text-[#B00E0E] text-sm hover:underline font-semibold  cursor-pointer"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}

            {areas.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-400">
                  Nenhuma área cadastrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <DeliveryAreaForm
          area={editing}
          onClose={close}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
