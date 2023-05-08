import axios from "axios";
import { HttpMethod, request } from "./HTTP";

export async function startTaxi(cordinates: any) {
  return await request("/taxi/start", cordinates, HttpMethod.POST);
}

export async function getCordinates(
  startLon: String,
  startLat: String,
  endLon: String,
  endLat: String
) {
  const res = await axios.request({
    method: "get",
    url: `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624847230978143c41d597c2dedd48e5737b&start=${startLon},${startLat}&end=${endLon},${endLat}`,
  });
  return res.data.features[0].geometry.coordinates;
}
