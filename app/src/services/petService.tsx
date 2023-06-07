import { request, HttpMethod } from "./HTTP";

export async function findPetsByUserId(id: Number) {
  return await request(`/pet/user/${id}`);
}

export async function createPet(dto: any) {
  return await request("/pet", dto, HttpMethod.POST);
}
