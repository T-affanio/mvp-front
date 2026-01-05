export type CreateOrderItemDTO = {
  productId: string;
  quantity: number;
};



export type CreateOrderDTO = {
  customerName: string;
  customerPhone?: string;
  deliveryType: "DELIVERY" | "PICKUP";
  paymentMethod?: "CASH" | "PIX" | "CARD";
  address?: string;
  items: CreateOrderItemDTO[];
};
