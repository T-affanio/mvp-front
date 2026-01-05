import { getProducts } from "@/admin/services/product-categories.service";
import { Product } from "@/admin/types/product";
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return {
    products,
    loading,
  };
}
