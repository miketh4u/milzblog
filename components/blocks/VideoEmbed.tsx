"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  videoId: string;
  caption?: string;
}

// The Sanity field asks for a bare video ID, but editors often paste a full
// link — accept watch/share/embed/Shorts URLs as well as the plain ID.
function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : trimmed;
}

export function VideoEmbed({ videoId, caption }: Props) {
  const [loaded, setLoaded] = useState(false);
  const id = extractYouTubeId(videoId);
  // maxresdefault 404s for videos without an HD thumbnail; hqdefault always exists
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  );

  return (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
        {loaded ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
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
            <Image
              src={thumbnailUrl}
              alt="Video thumbnail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              onError={() => setThumbnailUrl(`https://img.youtube.com/vi/${id}/hqdefault.jpg`)}
            />
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
