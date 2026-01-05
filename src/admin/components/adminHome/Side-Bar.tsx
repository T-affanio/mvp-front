"use client";

import { useStore } from "@/admin/hooks/settings/StoreSettingsContext";
import { useStoreSettings } from "@/admin/hooks/settings/useStoreSettings";
import {
  BadgeDollarSign,
  BookOpen,
  Home,
  ReceiptText,
  Settings,
  UserCircle2,
  Wrench,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="
        flex items-center gap-4
        px-4 py-3
        md:px-3 md:py-2
        rounded-xl
        cursor-pointer
        hover:bg-[#dad9d9]
        text-black
        transition
      "
    >
      <div className="text-black flex items-center justify-center">{icon}</div>

      <span className="text-base md:text-sm font-medium">{label}</span>
    </div>
  );
}
const iconClass = "w-7 h-7 md:w-7 md:h-10";

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { data: settings, loading } = useStore();
  const status = !settings?.isOpen
    ? {
        label: "Fechada",
        color: "text-red-600",
        dot: "bg-red-600",
        description: "fora do horário definido",
      }
    : settings.acceptOrders
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

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-2 right-3 z-50  p-2 rounded-lg shadow-md bg-gray-300 "
      >
        <Menu size={24} className="text-black" />
      </button>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    fixed md:static top-0 left-0 z-50
    h-screen w-64 md:w-72
    bg-[#E9E9E9] border-r
    flex flex-col
    transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    overflow-y-auto
    md:shadow-[19px_0_23px_rgba(186,186,186,0.6)]
  `}
      >
        {/* HEADER */}
        <div className="p-7 flex items-start justify-between">
          <div>
            {!loading && settings && (
              <>
                <div
                  className={`
        flex items-center gap-2 border rounded px-3 py-2 text-sm bg-white
        ${status.color}
      `}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}
                  />
                  {status.label}
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {status.description}
                </p>
              </>
            )}
          </div>

          {/* FECHAR MOBILE */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={24} className="text-black" />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 md:px-4 space-y-2 md:space-y-1">
          <Link href="/admin" onClick={() => setOpen(false)}>
            <MenuItem icon={<Home className={iconClass} />} label="Início" />
          </Link>

          <Link href="/admin/financial" onClick={() => setOpen(false)}>
            <MenuItem
              icon={<BadgeDollarSign className={iconClass} />}
              label="Financeiro"
            />
          </Link>

          <Link href="/admin/orders" onClick={() => setOpen(false)}>
            <MenuItem
              icon={<ReceiptText className={iconClass} />}
              label="Pedidos"
            />
          </Link>

          <Link href="/admin/menu" onClick={() => setOpen(false)}>
            <MenuItem
              icon={<BookOpen className={iconClass} />}
              label="Cardápio"
            />
          </Link>

          <Link href="/admin/services" onClick={() => setOpen(false)}>
            <MenuItem
              icon={<Wrench className={iconClass} />}
              label="Serviços"
            />
          </Link>

          <Link href="/admin/settings" onClick={() => setOpen(false)}>
            <MenuItem
              icon={<Settings className={iconClass} />}
              label="Configurações"
            />
          </Link>
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t flex items-center gap-3 text-black">
  <UserCircle2 className="w-9 h-9 md:w-8 md:h-8" />

  <span className="font-semibold text-base md:text-sm">
    {loading ? "Carregando..." : settings?.storeName ?? "Minha Loja"}
  </span>
</div>

      </aside>
    </>
  );
};
