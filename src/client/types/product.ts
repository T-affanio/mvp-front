import { Promotion } from "../hooks/useActivePromotion";

export type ProductImage = {
  url: string;
};

export type ProductVariation = {
  id: string;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  images?: ProductImage[];
  variations?: ProductVariation[];
  promotion?: Promotion ;
};
