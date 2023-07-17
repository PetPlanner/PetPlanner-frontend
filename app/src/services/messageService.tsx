import { HttpMethod, request } from "./HTTP";

export async function findByRecieverId(id: number) {
  return await request("/message/receiverId/" + id);
}

export async function create(dto: any) {
  return await request("/message", dto, HttpMethod.POST);
}

export async function findById(id: number) {
  return await request("/message/" + id);
}
