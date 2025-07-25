"use client";

import React, { useRef, useState, useEffect } from "react";

export default function HorizontalScroller({ videos }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollability();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollability);
      return () => scrollElement.removeEventListener('scroll', checkScrollability);
    }
  }, [videos]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 240; // width + gap approx
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative group">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          aria-label="Scroll Left"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-3/4 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex gap-4 px-2 py-2">
          {videos.map((video, index) => (
            <a
              key={index}
              href={video.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[220px] group/item"
            >
              <div className="w-full rounded-xl overflow-hidden aspect-video bg-gray-100 relative">
                {video.thumbnail ? (
                  <>
                    <img
                      src={video.thumbnail}
                      alt={video.title || "Untitled Video"}
                      className="w-full h-full object-cover transition-all duration-300 ease-out group-hover/item:scale-[1.02]"
                    />
                    {/* Subtle overlay for better text contrast */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover/item:opacity-10 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-full w-full flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gray-300 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-600 line-clamp-2">
                        {video.title || "Untitled Video"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-3 px-1">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover/item:text-blue-600 transition-colors duration-200">
                  {video.title || "Untitled Video"}
                </h3>
                {video.duration && (
                  <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          aria-label="Scroll Right"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-3/4 z-20 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Gradient overlays for visual continuity */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}