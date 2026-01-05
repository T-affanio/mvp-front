export type CartItem = {
  id: string;           // productId
  variationId: string;  // 🔥 tamanho / variação
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};