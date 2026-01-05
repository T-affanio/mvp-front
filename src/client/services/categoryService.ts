import { api } from "../../shared/api/api";

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}
