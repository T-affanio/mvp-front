// usado SOMENTE no formulário
export type FormVariation = {
  name: string;
  price: number;
};

// usado para enviar para a API
export type CreateVariationDTO = {
  name: string;
  price: number;
};

// usado quando vem do backend
export type Variation = {
  id?: number;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  variations: Variation[];
};
