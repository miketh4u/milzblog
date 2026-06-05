import { PostCard } from "./PostCard";
import type { PostCard as PostCardType } from "@/types";

interface Props {
  posts: PostCardType[];
  title?: string;
}

export function PopularPosts({ posts, title = "Popular Posts" }: Props) {
  if (!posts.length) return null;
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
        {title}
      </h2>
      <div className="space-y-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} variant="horizontal" />
        ))}
      </div>
    </section>
  );
}
