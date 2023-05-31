import { HttpMethod, request } from "./HTTP";

export async function login(loginDto: any) {
  return await request("/auth/login", loginDto as any, HttpMethod.POST);
}

export async function register(registerDto: any) {
  return await request("/auth/register", registerDto as any, HttpMethod.POST);
}
