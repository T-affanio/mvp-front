"use client";

import { Variation } from "@/admin/types/product";
import { api } from "@/shared/api/api";
import axios from "axios";

type Params = {
  name: string;
  description: string;
  categoryId: string;
  variations: Variation[];
  images: File[];
  onSuccess?: () => void;
};

export function useCreateProduct() {
  async function createProduct({
    name,
    description,
    categoryId,
    variations,
    images,
    onSuccess,
  }: Params) {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    formData.append(
      "variations",
      JSON.stringify(
        variations.map(v => ({
          name: v.name,
          price: Number(v.price),
        }))
      )
    );

    if (categoryId) {
      formData.append("categoryId", categoryId);
    }

    images.forEach(img => formData.append("images", img));

    await api.post("/products", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    onSuccess?.();
  }

  return { createProduct };
}
