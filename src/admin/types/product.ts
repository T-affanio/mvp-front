export type FormVariation = {
  id?: number; // ✅ opcional
  name: string;
  price: number;
};

export type CreateVariationDTO = {
  name: string;
  price: number;
};

export type Variation = {
  id: number; // ✅ obrigatório (backend)
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  variations: Variation[];
  categoryId: string;
  images?: {
    url: string;
  }[];
};

export type Category = {
  id: string;
  name: string;
};
