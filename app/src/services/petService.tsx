import { request, HttpMethod } from "./HTTP";

export async function findPetsByUserId(id: Number) {
  return await request(`/pet/user/${id}`);
}
