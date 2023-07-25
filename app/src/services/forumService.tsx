import { request } from "./HTTP";

export async function findAllByStatus(status: string) {
  return await request("/topic/accepted");
}
