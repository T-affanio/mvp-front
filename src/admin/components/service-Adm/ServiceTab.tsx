"use client";

import { useState } from "react";
import DeliveryAreaList from "./delivery-Area/DeliveryAreaList";
import PromotionList from "./promotions/PromotionList";

const tabs = [
  { id: "delivery", label: "Frete por Área" },
  { id: "promotion", label: "Promoções" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ServiceTab() {
  const [tab, setTab] = useState<TabId>("delivery");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex gap-6 border-b border-[#989595]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 font-semibold cursor-pointer transition ${
              tab === t.id
                ? "text-[#B00E0E] border-b-2 border-[#B00E0E] scale-110"
                : "text-[#6c6b6b] hover:text-black"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div>
        {tab === "delivery" && <DeliveryAreaList />}
        {tab === "promotion" && <PromotionList />}
      </div>
    </div>
  );
}
