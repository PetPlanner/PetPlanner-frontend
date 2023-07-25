import { request } from "./HTTP";

export async function findAllByStatus(status: string) {
  return await request("/topic/accepted");
}

export async function findAllByTopicId(id: number) {
  return await request("/answer/topic/" + id);
}

export async function findByTopicId(id: number) {
  return await request("/topic/" + id);
}
