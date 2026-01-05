import { api } from "../api/api";

export type LoginResponse = {
  token: string;
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return data;
}
