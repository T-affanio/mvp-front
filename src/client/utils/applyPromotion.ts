export function applyPromotion(
  price: number,
  promo?: {
    discountType: "FIXED" | "PERCENT";
    discountValue: number;
  }
) {
  if (!promo) return price;

  if (promo.discountType === "PERCENT") {
    return Math.max(price - price * (promo.discountValue / 100), 0);
  }

  return Math.max(price - promo.discountValue, 0);
}
