import { DeliveryService } from "@/admin/services/delivery.service";
import { DeliveryArea } from "@/admin/types/Delivery";
import { useEffect, useState } from "react";


type FormState = {
  name: string;
  fee: string;
  estimatedTime: string;
  active: boolean;
};

const emptyForm: FormState = {
  name: "",
  fee: "",
  estimatedTime: "",
  active: true,
};

export function useDeliveryAreaForm(
  area: DeliveryArea | null,
  onSaved: () => void
) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(area);

  useEffect(() => {
    if (!area) return;
    setForm({
      name: area.name,
      fee: String(area.fee),
      estimatedTime: String(area.estimatedTime ?? ""),
      active: area.active ?? true,
    });
  }, [area]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    if (!form.name || !form.fee) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        fee: Number(form.fee),
        estimatedTime: Number(form.estimatedTime),
        active: form.active,
      };

      isEdit && area
        ? await DeliveryService.update(area.id, payload)
        : await DeliveryService.create(payload);

      onSaved();
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!area) return;
    if (!confirm("Tem certeza que deseja excluir esta área?")) return;

    setLoading(true);
    try {
      await DeliveryService.delete(area.id);
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
    save,
    remove,
  };
}
