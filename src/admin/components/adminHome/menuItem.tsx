import { FlameKindling, Pencil } from "lucide-react";
import { Product } from "../../types/product";

type Props = {
  product: Product;
  highlight?: boolean;
};

export function MenuItem({ product, highlight }: Props) {
  return (
    <div
      className="
        flex items-start gap-3 sm:gap-6
        py-4 px-3 
        
        border-b border-[#989595]
      "
    >
      {/* IMAGEM */}
      <div
        className="
          w-20 h-20
          sm:w-24 sm:h-24
          overflow-hidden
          rounded-lg
          
          shrink-0
        "
      >
        {product.images?.[0]?.url ? (
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-base md:text-lg  text-gray-900 truncate">
              {product.name}
            </p>

            {highlight && (
              <FlameKindling className="w-4 h-4 md:w-10 md:h-7 text-[#B00E0E] shrink-0" />
            )}
          </div>

          <p className="text-sm md:text-md text-gray-500 leading-snug line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <p className="text-base md:text-md font-semibold text-gray-900">
            R$ {product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* AÇÃO */}
      <button
        className="
          w-9 h-9
          sm:w-10 sm:h-10
          flex items-center justify-center
          rounded-lg
          hover:bg-gray-100
          active:bg-gray-200
          transition
        "
        title="Editar produto"
      >
        <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </button>
    </div>
  );
}
