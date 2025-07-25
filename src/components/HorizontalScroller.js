"use client";

import React, { useRef } from "react";

export default function HorizontalScroller({ videos }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 220; // width + gap approx
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="Scroll Left"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-3/4 z-10 rounded-full bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-80 transition"
        style={{ userSelect: "none" }}
      >
        ◀
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap flex gap-4 scrollbar-hide scroll-smooth"
      >
        {videos.map((video, index) => (
          <a
            key={index}
            href={video.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block min-w-[200px] max-w-[220px] flex-shrink-0"
          >
            <div className="w-full rounded-lg overflow-hidden group aspect-video">
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title || "Untitled Video"}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:brightness-80 group-hover:shadow-lg"
                />
              ) : (
                <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
                  <p className="text-center px-3 text-sm font-semibold truncate">
                    {video.title || "Untitled Video"}
                  </p>
                </div>
              )}
            </div>
            <p className="text-center mt-2 text-sm font-semibold w-full truncate">
              {video.title || "Untitled Video"}
            </p>
          </a>
        ))}
      </div>

      <button
        aria-label="Scroll Right"
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-3/4 z-10 rounded-full bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-80 transition"
        style={{ userSelect: "none" }}
      >
        ▶
      </button>
    </div>
  );
}
