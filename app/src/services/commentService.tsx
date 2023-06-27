import { HttpMethod, request } from "./HTTP";

export async function create(dto: any) {
  return await request("/comment", dto, HttpMethod.POST);
}

export async function findByObjectIdAndStatus(id: number, status: string) {
  return await request(`/comment/object/${id}/status/${status}`);
}
