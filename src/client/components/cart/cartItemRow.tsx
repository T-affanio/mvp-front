import { CartItem } from "@/client/types/cart";

type Props = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="flex gap-3 border-b p-4 bg-white">
      {/* INFO */}
      <div className="flex-1">
        <p className="text-black font-semibold leading-tight">
          {item.name}
        </p>

        <p className="text-sm text-gray-600 mt-0.5">
          R$ {item.price.toFixed(2)}
        </p>

        {/* CONTROLES */}
        <div className="flex items-center gap-4 mt-3">
          <button
            onClick={onDecrease}
            className="
              w-8 h-8 rounded-full
              border border-gray-300
              flex items-center justify-center
              text-lg font-bold text-black
              active:scale-90 transition
            "
          >
            −
          </button>

          <span className="font-semibold text-black">
            {item.quantity}
          </span>

          <button
            onClick={onIncrease}
            className="
              w-8 h-8 rounded-full
              bg-[#E10600] text-white
              flex items-center justify-center
              text-lg font-bold
              active:scale-90 transition
            "
          >
            +
          </button>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="flex flex-col items-end justify-between">
        <span className="text-sm font-semibold text-black">
          R$ {(item.price * item.quantity).toFixed(2)}
        </span>

        <button
          onClick={onRemove}
          className="
            text-sm font-medium
            text-[#C01212]
            active:scale-95 transition
          "
        >
          Remover
        </button>
      </div>
    </div>
  );
}
