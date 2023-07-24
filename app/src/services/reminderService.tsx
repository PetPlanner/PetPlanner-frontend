import { HttpMethod, request } from "./HTTP";

export async function findAllByUserId(id: number) {
  return await request("/reminder/user/" + id);
}

export async function changeStatus(id: number) {
  return await request("/reminder/change-active/id/" + id);
}

export async function deleteById(id: number) {
  return await request("/reminder/" + id, [], HttpMethod.DELETE);
}

export async function create(dto: any) {
  return await request("/reminder", dto, HttpMethod.POST);
}
