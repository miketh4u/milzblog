import { type NextRequest, NextResponse } from "next/server";
import { safeFetch } from "@/sanity/lib/client";
import { recentPostsQuery } from "@/sanity/lib/queries";
import Fuse from "fuse.js";
import type { PostCard } from "@/types";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q?.trim()) return NextResponse.json({ results: [] });

  const posts = await safeFetch<PostCard[]>(recentPostsQuery, { limit: 300 }, []);

  const fuse = new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "excerpt", weight: 0.15 },
      { name: "country.name", weight: 0.25 },
      { name: "city.name", weight: 0.15 },
      { name: "category.name", weight: 0.05 },
    ],
    threshold: 0.35,
  });

  const results = fuse.search(q).map((r) => r.item);
  return NextResponse.json({ results });
}
