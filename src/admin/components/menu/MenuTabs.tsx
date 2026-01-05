"use client";

import { useCategories } from "@/admin/hooks/Products-Categories/useCategories";

type Props = {
  activeCategory: string | "all";
  onChangeCategory: (id: string | "all") => void;
};

export default function Tabs({
  activeCategory,
  onChangeCategory,
}: Props) {
  const { categories } = useCategories();

  return (
    <div className="flex gap-4 border-b-2 border-[#989595] mb-4">
      {/* TODOS */}
      <button
        onClick={() => onChangeCategory("all")}
        className={` pb-2 text-lg font-semibold  cursor-pointer  ${
          activeCategory === "all"
            ? "text-[#B00E0E] border-b-2  scale-115 "
            : "text-[#6C6B6B] hover:text-black "
        }`}
      >
        Todos
      </button>

      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onChangeCategory(category.id)}
          className={`pb-2 cursor-pointer font-semibold first-letter:uppercase ${
            activeCategory === category.id
              ? "text-[#B00E0E] border-b-2  scale-110  "
              : "text-[#6C6B6B] hover:text-black "
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
