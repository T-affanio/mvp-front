"use client";

import { useState } from "react";

import HeaderMenu from "@/admin/components/menu/MenuHeader";
import Tabs from "@/admin/components/menu/MenuTabs";
import MenuList from "@/admin/components/menu/MenuList";
import ProductForm from "@/admin/components/products/ProductForm";

export default function AdminMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6  w-full">
      <h1 className="text-4xl font-semibold text-black">Cardápio</h1>

      <div className="w-[95%] ">
        <HeaderMenu onAddClick={() => setOpen(true)} />

        <Tabs
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
        />

        <div className="">
          <MenuList categoryId={activeCategory} />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="z-10 flex justify-center items-center">
            <ProductForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
