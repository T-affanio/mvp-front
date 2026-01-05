import { useEffect, useState } from "react";
import { Promotion } from "@/admin/types/Promotion";
import { PromotionApi } from "@/admin/services/promotion.service";

type DiscountType = "FIXED" | "PERCENT";

type FormState = {
  name: string;
  discountType: DiscountType;
  discountValue: number;
  productIds: string[];
};

const emptyForm: FormState = {
  name: "",
  discountType: "PERCENT",
  discountValue: 10,
  productIds: [],
};

export function usePromotionForm(
  promotion: Promotion | null,
  onSaved: () => void
) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(promotion);

  useEffect(() => {
    if (!promotion) return;

   if (promotion?.type === "PRODUCT") {
  setForm({
    name: promotion.name,
    discountType: promotion.discountType,
    discountValue: promotion.discountValue,
    productIds: promotion.products.map(p => p.product.id),
  });
}
  }, [promotion]);

  function update<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleProduct(id: string) {
    setForm((prev) => ({
      ...prev,
      productIds: prev.productIds.includes(id)
        ? prev.productIds.filter((p) => p !== id)
        : [...prev.productIds, id],
    }));
  }

  async function save() {
    if (!form.name.trim()) throw new Error("Nome obrigatório");
    if (form.productIds.length === 0)
      throw new Error("Selecione ao menos um produto");
    if (form.discountValue <= 0)
      throw new Error("Desconto inválido");

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        active: true,
        discountType: form.discountType,
        discountValue: form.discountValue,
        productIds: form.productIds,
      };

      isEdit && promotion
        ? await PromotionApi.update(promotion.id, payload)
        : await PromotionApi.createProduct(payload);

      onSaved();
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    isEdit,
    update,
    toggleProduct,
    save,
  };
}

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await PromotionApi.list();
    setPromotions(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    promotions,
    loading,
    reload: load,
  };
}
