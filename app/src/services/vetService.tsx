import { HttpMethod, request } from "./HTTP";

export async function searchVet(dto: any) {
  return await request("/vet-station/search", dto, HttpMethod.POST);
}
