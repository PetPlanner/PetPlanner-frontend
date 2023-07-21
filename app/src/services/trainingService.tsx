import { request } from "./HTTP";

export async function findByImg(img: string) {
  return await request("/training/img/" + img);
}
