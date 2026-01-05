import { api } from "../../shared/api/api";

export async function getProducts() {
  const { data } = await api.get("/products");
  return data;
}
