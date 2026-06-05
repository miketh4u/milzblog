import Fuse from "fuse.js";
import type { PostCard } from "@/types";

let fuse: Fuse<PostCard> | null = null;

export function initSearch(posts: PostCard[]) {
  fuse = new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "excerpt", weight: 0.2 },
      { name: "country.name", weight: 0.2 },
      { name: "city.name", weight: 0.15 },
      { name: "category.name", weight: 0.05 },
    ],
    threshold: 0.3,
    includeScore: true,
  });
}

export function searchPosts(query: string): PostCard[] {
  if (!fuse || !query.trim()) return [];
  return fuse.search(query).map((r) => r.item);
}
