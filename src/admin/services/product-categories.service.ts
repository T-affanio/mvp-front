import { api } from "../../shared/api/api";
import { Category, Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

export async function getMostOrderedProducts(): Promise<Product[]> {
  const { data } = await api.get("/products/most-ordered");
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/categories");
  return data;
}
export async function createCategory(
  name: string
): Promise<Category> {
  const { data } = await api.post<Category>("/categories", { name });
  return data;
}