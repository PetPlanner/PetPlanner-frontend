import { HttpMethod, request } from "./HTTP";

export async function findUserById(id: number) {
  return await request(`/user/${id}`);
}
