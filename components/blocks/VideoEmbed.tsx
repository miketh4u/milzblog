"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  videoId: string;
  caption?: string;
}

export function VideoEmbed({ videoId, caption }: Props) {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
        {loaded ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full group"
            aria-label="Play video"
          >
            <Image src={thumbnailUrl} alt="Video thumbnail" fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
      {caption && <figcaption className="text-center text-sm text-[var(--color-text-muted)] mt-3">{caption}</figcaption>}
    </figure>
  );
}
