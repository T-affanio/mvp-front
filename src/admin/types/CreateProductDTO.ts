import { CreateVariationDTO } from "./product";

// Usado no formulário e no create
type CreateProductDTO = {
  name: string;
  description?: string;
  categoryId: string;
  variations: CreateVariationDTO[]; // ✅ CERTO
  images?: File[];
  onSuccess?: () => void;
};
