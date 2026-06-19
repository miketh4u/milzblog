"use client";

import { useState } from "react";
import { PostCard } from "@/components/ui/PostCard";
import type { City, PostCard as PostCardType } from "@/types";

export function CountryCityFilter({
  cities,
  posts,
  countryName,
}: {
  cities: City[];
  posts: PostCardType[];
  countryName: string;
}) {
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const filteredPosts =
    selectedCity === "all"
      ? posts
      : posts.filter((p) => p.city?.slug.current === selectedCity);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedCity("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[40px] ${
            selectedCity === "all"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"
          }`}
        >
          All
        </button>
        {cities.map((city) => (
          <button
            key={city._id}
            onClick={() => setSelectedCity(city.slug.current)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[40px] ${
              selectedCity === city.slug.current
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map((post, i) => (
            <PostCard key={post._id} post={post} priority={i === 0} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <p>
            No posts yet for{" "}
            {selectedCity === "all"
              ? countryName
              : cities.find((c) => c.slug.current === selectedCity)?.name || selectedCity}
            .
          </p>
        </div>
      )}
    </>
  );
}
