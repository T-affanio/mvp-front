"use client";

type Props = {
  onAddClick: () => void;
};

export default function HeaderMenu({ onAddClick }: Props) {
  return (
    <div className="flex items-center justify-end  ">
      <button
        onClick={onAddClick}
        className="bg-[#C01212] px-4 py-2 rounded text-sm text-white cursor-pointer"
      >
        + Adicionar modelo
      </button>
    </div>
  );
}
