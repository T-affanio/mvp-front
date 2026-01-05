"use client";

import { useState } from "react";

export type CartStep = "cart" | "checkout";

export function useCartDrawer() {
  const [step, setStep] = useState<CartStep>("cart");

  function goToCheckout() {
    setStep("checkout");
  }

  function goToCart() {
    setStep("cart");
  }

  return {
    step,
    goToCheckout,
    goToCart,
    isCheckout: step === "checkout",
  };
}
