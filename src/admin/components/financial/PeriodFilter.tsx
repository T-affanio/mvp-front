"use client";

import { PeriodConfig } from "@/admin/types/Finance";

type Props = {
  value: PeriodConfig;
  onChange: (v: PeriodConfig) => void;
};

export function PeriodFilter({ value, onChange }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl border space-y-4">

      {/* QUICK */}
      <div className="flex gap-2">
        {[
          { id: "today", label: "Hoje" },
          { id: "week", label: "7 dias" },
          { id: "month", label: "Mês" },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() =>
              onChange({ mode: "quick", value: p.id as any })
            }
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition cursor-pointer
              ${
                value.mode === "quick" && value.value === p.id
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* DIA ESPECÍFICO */}
      <div>
        <label className="text-sm text-black block mb-1">
          Dia específico
        </label>
        <input
          type="date"
          value={value.mode === "day" ? value.date : ""}
          onChange={(e) =>
            onChange({ mode: "day", date: e.target.value })
          }
          className="border rounded-lg px-3 py-2  text-black opacity-75 cursor-pointer"
        />
      </div>

      {/* INTERVALO */}
      <div>
        <label className="text-sm text-black block mb-1">
          Intervalo
        </label>
        <div className="flex gap-3">
          <input
            type="date"
            value={value.mode === "range" ? value.from : ""}
            onChange={(e) =>
              onChange({
                mode: "range",
                from: e.target.value,
                to:
                  value.mode === "range"
                    ? value.to
                    : e.target.value,
              })
            }
            className="border rounded-lg px-3 py-2 text-black opacity-75 cursor-pointer"
          />

          <input
            type="date"
            value={value.mode === "range" ? value.to : ""}
            onChange={(e) =>
              onChange({
                mode: "range",
                from:
                  value.mode === "range"
                    ? value.from
                    : e.target.value,
                to: e.target.value,
              })
            }
            className="border rounded-lg px-3 py-2  text-black opacity-75 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
