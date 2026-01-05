"use client";

import { StoreSettingsProvider } from "@/admin/hooks/settings/StoreSettingsContext";
import { CartDrawer } from "@/client/components/cart/cartDrawer";
import { CartProvider } from "@/client/context/cartContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreSettingsProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    
    </StoreSettingsProvider>
  );
}
