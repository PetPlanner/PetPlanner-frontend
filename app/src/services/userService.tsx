import { HttpMethod, request } from "./HTTP";

export async function findUserById(id: number) {
  return await request(`/user/${id}`);
}

export async function findWalkersByCity(city: string) {
  return await request(`/user/city/${city}`);
}
