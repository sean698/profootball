"use client";
import { useRef } from "react";

export default function HorizontalScroller({ children }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-10 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 flex items-center justify-center w-12 h-12"
        aria-label="Scroll Left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 stroke-2 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Scroller */}
      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap flex gap-4 mb-4 px-8"
      >
        {children}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-10 z-10 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 flex items-center justify-center w-12 h-12"
        aria-label="Scroll Right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 stroke-2 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
