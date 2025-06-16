import { Schema } from "yup";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface Endpoint<T extends Method> {
  url: string;
  method: T;
  query: Schema;
  body?: T extends "POST" | "PUT" ? Schema : never;
}


export async function fetcher<T extends Method>(endpoint: Endpoint<T>) {
  const response = await fetch(endpoint.url, {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: endpoint.body ? JSON.stringify(endpoint.body) : undefined,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
