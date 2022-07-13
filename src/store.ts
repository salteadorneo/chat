import { writable } from "svelte/store";

type User = {
  name: string,
  token: string
}

export const activeConversation = writable<any>(null)
export const user = writable<User|null>(null)
