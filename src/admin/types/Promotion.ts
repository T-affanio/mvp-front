export type PromotionType = "PRODUCT" | "COMBO";
export type DiscountType = "FIXED" | "PERCENT";

type BasePromotion = {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
};

export type ProductPromotion = BasePromotion & {
  type: "PRODUCT";
  discountType: DiscountType;
  discountValue: number;
  products: {
    product: {
      id: string;
      name: string;
      priceFrom: number;
    };
  }[];
};

export type ComboPromotion = BasePromotion & {
  type: "COMBO";
  combos: {
    price: number;
    items: {
      product: {
        id: string;
        name: string;
      };
      quantity: number;
    }[];
  }[];
};

export type Promotion = ProductPromotion | ComboPromotion;
