"use client";

import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { getMostOrderedProducts } from "../../services/product-categories.service";
import { MenuItem } from "./menuItem";

type Props = {
  categoryId: string;
};
export default function MenuListHome({ categoryId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getMostOrderedProducts();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-gray-400 animate-pulse">
        Carregando mais pedidos...
      </div>
    );
  }

if (products.length === 0) {
  return (
    <div className="flex h-full min-h-[300] items-center justify-center text-gray-400 p-4">
      Nenhum produto com pedidos ainda
    </div>
  );
}



  return (
    <div className="space-y-4">
      <div className=" rounded-xl  ">
        {products.map((product, index) => (
          <MenuItem
            key={product.id}
            product={product}
            highlight={index < 3} // 🔥 top 3
          />
        ))}
      </div>
    </div>
  );
}
