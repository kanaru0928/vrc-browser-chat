import { InferType, object, Schema, string } from "yup";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Endpoint<T extends Method> {
  url: string;
  method: T;
  body?: T extends "POST" | "PUT" ? Schema : never;
}

export const statusEndpoint = {
  url: "/api",
  method: "GET",
} satisfies Endpoint<"GET">;

export const chatboxEndpoint = {
  url: "/api/chatbox",
  method: "POST",
  body: object({
    text: string(),
  }),
} satisfies Endpoint<"POST">;

export async function fetcher<T extends Method, E extends Endpoint<T>>(
  endpoint: E,
  body: E["body"] extends Schema ? InferType<E["body"]> : never
) {
  const response = await fetch(endpoint.url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
