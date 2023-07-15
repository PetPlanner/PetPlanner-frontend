import axios from "axios";
import { HttpMethod, request } from "./HTTP";

export async function login(loginDto: any) {
  return await request("/auth/login", loginDto as any, HttpMethod.POST);
}

export async function register(registerDto: any) {
  return await request("/auth/register", registerDto as any, HttpMethod.POST);
}

export async function getCords(dto: any) {
  let query: string = "";
  for (let word of dto.street.split(" ")) {
    query += word + "%20";
  }
  for (let word of dto.city.split(" ")) {
    query += word + "%20";
  }
  for (let word of dto.country.split(" ")) {
    query += word + "%20";
  }

  axios.create();
  return axios.get(
    `https://nominatim.openstreetmap.org/search.php?q=${query.substring(
      0,
      query.length - 3
    )}&polygon_geojson=1&format=jsonv2`
  );
}
