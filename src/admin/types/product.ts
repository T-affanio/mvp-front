export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  variations: Variation[];
  categoryId: string; // ajuste se o backend usar outro nome

  images?: {
    url: string;
  }[];
};
export type Category = {
  id: string;
  name: string;
};

export type CreateVariationDTO = {
  name: string;
  price: number;
};

export type Variation = {
  id: number;
  name: string;
  price: number;
};
// types/FormVariation.ts
export type FormVariation = {
  id: number
  name: string;
  price: number;
};
