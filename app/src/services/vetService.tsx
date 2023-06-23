import { HttpMethod, request } from "./HTTP";

export async function searchVet(dto: any) {
  return await request("/vet-station/search", dto, HttpMethod.POST);
}

export async function createVetStation(dto: any) {
  return await request("/vet-station", dto, HttpMethod.POST);
}
