import { HttpMethod, request } from "./HTTP";

export async function searchHotel(dto: any) {
  return await request("/hotel/search", dto, HttpMethod.POST);
}

export async function createHotel(dto: any) {
  return await request("/hotel", dto, HttpMethod.POST);
}
