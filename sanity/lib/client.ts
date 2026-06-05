import { createClient } from "next-sanity";
import type { QueryParams } from "next-sanity";

export const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export async function safeFetch<T>(query: string, params: QueryParams = {}, fallback: T = [] as unknown as T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params);
  } catch {
    return fallback;
  }
}
