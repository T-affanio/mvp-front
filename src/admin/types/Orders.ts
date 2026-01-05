// export type OrderDash = {
//   id: number;
//   total: number;
//   deliveryFee: number;
//   createdAt: string;
// };
// export type Period = "today" | "week" | "month";

// export type OrderStatus =
//   | "PENDING"
//   | "CONFIRMED"
//   | "FINISHED"
//   | "CANCELED";

  
// export type DeliveryType =
//   | "DELIVERY"
//   | "PICKUP";

// export type OrderItem = {
//   id: string;
//   productName: string;
//   quantity: number;

//   originalPrice: number;
//   unitPrice: number;
//   subtotal: number;

//   promotionId?: string | null;
// };

// export type OrderAddress = {
//   street: string;
//   number: string;
//   neighborhood: string;
//   complement?: string;
// };

// export type Order = {
//   id: string;
//   customerName: string;
//   customerPhone?: string;

//   deliveryType: DeliveryType; // ✅ AGORA EXISTE

//   address?: OrderAddress; // só quando delivery

//   paymentMethod?: "CASH" | "PIX" | "CARD";
//   changeFor?: number;

//   createdAt: string;
//   total: number;
//   deliveryFee: number;
//   status: OrderStatus;

//   notes?: string;

//   items: OrderItem[];
// };
// ❌ NÃO IMPORTA NADA DE PAGE.TSX

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "FINISHED"
  | "CANCELED";

export type DeliveryType =
  | "DELIVERY"
  | "PICKUP";

export type OrderItem = {
  id: string;
  productName: string;
  quantity: number;

  originalPrice: number;
  unitPrice: number;
  subtotal: number;

  promotionId?: string | null;
};

export type OrderAddress = {
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone?: string;

  deliveryType: DeliveryType; // ✅ AGORA EXISTE

  address?: OrderAddress; // só quando delivery

  paymentMethod?: "CASH" | "PIX" | "CARD";
  changeFor?: number;

  createdAt: string;
  total: number;
  deliveryFee: number;
  status: OrderStatus;

  notes?: string;

  items: OrderItem[];
};
