import { PostCard } from "./PostCard";
import type { PostCard as PostCardType } from "@/types";

interface Props {
  posts: PostCardType[];
}

export function RelatedPosts({ posts }: Props) {
  if (!posts.length) return null;
  return (
    <section className="mt-16 pt-12 border-t border-[var(--color-border)]">
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
