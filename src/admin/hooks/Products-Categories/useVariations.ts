"use client";

import { FormVariation } from "@/admin/types/product";
import { useState } from "react";

export function useVariations() {
  const [variations, setVariations] = useState<FormVariation[]>([
    { name: "", price: 0 },
  ]);

  function update(
    index: number,
    field: keyof FormVariation,
    value: string | number
  ) {
    setVariations(vs =>
      vs.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      )
    );
  }

  function add() {
    setVariations(vs => [...vs, { name: "", price: 0 }]);
  }

  function remove(index: number) {
    setVariations(vs => vs.filter((_, i) => i !== index));
  }

  return { variations, update, add, remove };
}
