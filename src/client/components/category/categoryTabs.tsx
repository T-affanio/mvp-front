"use client";

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
};

export default function CategoryTabs({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      className="
        sticky top-[72] z-20
        bg-white border-b
        px-3 p-2
      "
    >
      <div
        className="
          flex gap-2 overflow-x-auto
          no-scrollbar
        "
      >
        {/* TODOS */}
        <button
          onClick={() => onSelect("all")}
          className={`
            px-4 py-3
            text-sm font-semibold whitespace-nowrap
            rounded-full
            transition
            ${
              selected === "all"
                ? "bg-[#E10600] text-white"
                : "bg-gray-100 text-gray-600"
            }
          `}
        >
          Todos
        </button>

        {categories.map(cat => {
          const isPromo = cat.id === "promo";
          const isActive = selected === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`
                px-4 py-3
                text-sm font-semibold whitespace-nowrap
                rounded-full
                transition
                ${
                  isActive
                    ? isPromo
                      ? "bg-black text-white"
                      : "bg-[#E10600] text-white"
                    : isPromo
                    ? "bg-red-100 text-[#E10600]"
                    : "bg-gray-100 text-gray-600"
                }
              `}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
