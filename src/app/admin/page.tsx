"use client";
import { DashboardSummary } from "@/admin/components/adminHome/Dashboard-Smuary";
import MenuListHome from "@/admin/components/adminHome/menu";
import RecentOrders from "@/admin/components/adminHome/Recent-Orders";
import { RecentOrdersMobile } from "@/admin/components/adminHome/RecentOrderMobile";
import { useRecentOrders } from "@/admin/hooks/order/useRecentOrders";
import { Order } from "@/admin/types/Orders";
import { HeaderTable } from "@/shared/components/table/Header";
import Link from "next/link";
import { useState } from "react";

export default function AdminPage() {
  const [notification, setNotification] = useState<Order | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { orders, loading, highlightIds } = useRecentOrders(setNotification);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <div className="space-y-6 w-full px-4">
      <div className="mx-auto">
        <div className="space-y-8">
          <section>
            <DashboardSummary />
          </section>

          {notification && (
            <div
              onClick={() => {
                setSelectedOrder(notification);
                setNotification(null);
              }}
              className="fixed top-5 right-5 z-50 bg-black texxt-white px-5 py-4 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition"
            >
              <p className="text-sm opacity-80">Novo Pedido</p>
              <p className="font-semibold text-lg">
                {notification.customerName}
              </p>
              <p className="text-sm opacity-80">
                R$ {notification.total.toFixed(2)}
              </p>
              <p className="text-xs mt-1 opacity-70">
                Clique para ver detalhes
              </p>
            </div>
          )}
          <RecentOrdersMobile />
          {/* RECENT ORDERS */}
          <section>
            <div className="flex justify-between mb-2">
              <h2 className="text-3xl text-black font-semibold tracking-tight ">
                Pedidos recentes
              </h2>
              <Link
                href={"/admin/orders"}
                className="text-sm text-[#6C6A6A] cursor-pointer hover:underline"
              >
                Ver todos
              </Link>
            </div>

            <div className="overflow-hidden w-full">
              <table className="w-full">
                <HeaderTable />
                <RecentOrders onNewOrder={setNotification} />
              </table>
            </div>
          </section>

          {/* MENU */}
          <section>
            <div className="flex-col mb-2 border-b-2 border-[#989595] gap-4">
              <h2 className="text-black text-3xl font-semibold tracking-tight">
                Cardapio
              </h2>
              <div className="flex justify-between pt-4">
                <p className="text-[#B00E0E] font-semibold  md:text-lg">
                  + vendidos
                </p>
                <Link
                  href={"/admin/menu"}
                  className="text-sm text-[#6C6A6A] cursor-pointer hover:underline"
                >
                  Ver todos
                </Link>
              </div>
            </div>
          <MenuListHome categoryId={activeCategory} />
          </section>
        </div>
      </div>
    </div>
  );
}
