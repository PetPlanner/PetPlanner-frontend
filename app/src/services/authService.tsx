import { HttpMethod, request } from "./HTTP";

export async function login(loginDto: any) {
  return await request("/auth/login", loginDto as any, HttpMethod.POST);
}
