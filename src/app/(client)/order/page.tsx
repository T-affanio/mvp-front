"use client";

import { useStore } from "@/admin/hooks/settings/StoreSettingsContext";
import { CartBar } from "@/client/components/cart/cartBar";
import CategoryTabs from "@/client/components/category/categoryTabs";
import ProductCard from "@/client/components/product/productCard";
import { useMenu } from "@/client/hooks/useMenu";

export default function MenuPage() {
  const {
    categories,
    selected,
    setSelected,
    products,
    getPromotion,
  } = useMenu();

  const { data: store, loading } = useStore();

  // 🎨 status apenas para UI
  const uiStatus = !store?.isOpen
    ? {
        label: "Fechada",
        color: "text-red-600",
        dot: "bg-red-600",
        description: "fora do horário definido",
      }
    : store.acceptOrders
    ? {
        label: "Aberto",
        color: "text-green-600",
        dot: "bg-green-600",
        description: "aceitando pedidos",
      }
    : {
        label: "Pausado",
        color: "text-yellow-600",
        dot: "bg-yellow-500",
        description: "pedidos pausados",
      };

  const canOrder =
    !loading && !!store?.isOpen && !!store?.acceptOrders;

  return (
    <div className="min-h-screen bg-[#F4F4F4] pb-28">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-[#0F0F0F] text-white ">
        <div className="p-4 space-y-2">
          <h1 className="text-xl font-bold tracking-wide">
            Hood<span className="text-[#E10600]">Food</span>
          </h1>

          {!loading && store && (
            <div>
              <div
                className={`
                  inline-flex items-center gap-2
                  border rounded-md px-3 py-1.5 text-sm bg-white
                  ${uiStatus.color}
                `}
              >
                <span
                  className={`w-2 h-2 rounded-full ${uiStatus.dot} animate-pulse`}
                />
                <span className="font-semibold">
                  {uiStatus.label}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                {uiStatus.description}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* 🚨 AVISO LOJA FECHADA / PAUSADA */}
      {!canOrder && !loading && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
          A loja não está aceitando pedidos no momento 😕
        </div>
      )}

      <CategoryTabs
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />

      <main className="space-y-4 p-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              promotion: getPromotion(product.id),
            }}
          />
        ))}

        {products.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-10">
            Nenhum item encontrado 😕
          </p>
        )}
      </main>

      {/* 🛒 só mostra carrinho se puder pedir */}
      {canOrder && <CartBar />}
    </div>
  );
}
