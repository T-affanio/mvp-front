"use client";

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
  value: string;
  onChange: (id: string) => void;
  onCreateClick: () => void;
};

export function CategorySelect({
  categories,
  value,
  onChange,
  onCreateClick,
}: Props) {
  return (
    <div className="space-y-2">
      <select
        className="w-full border p-3 cursor-pointer rounded-md "
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" >Sem categoria</option>

        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onCreateClick}
        className="text-sm text-[#C01212] underline cursor-pointer pt-2 font-semibold "
      >
        + Criar nova categoria
      </button>
    </div>
  );
}
