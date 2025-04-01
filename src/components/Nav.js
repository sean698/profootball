"use client"
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Single color scheme for the navbar (light theme)
  const colorScheme = {
    bg: "bg-[#0B0B12]",  // Background color
    text: "text-gray-900",  // Text color
    hover: "",  // Hover effect for links
    button: "bg-[#f5da9f] border border-[#f5da9f] p-4 text-black hover:text-[#f5da9f] hover:bg-[#0B0B12] py-2 px-4 rounded-md",  // Button styles
    border: "border-gray-300",  // Border color
  };

  // Toggle mobile menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} shadow-md px-6 py-1 mb-3 sticky top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white">
          <span className="navtitle">ProFootball News</span> 
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={`${colorScheme.hover} ${colorScheme.button} transition-all duration-200 py-2 px-4 rounded-md`}>
            Teams
          </Link>
          <Link href="/about" className={`${colorScheme.hover} ${colorScheme.button} transition-all duration-200 py-2 px-4 rounded-md`}>
            Fantasy
          </Link>
          <Link href="/contact" className={`${colorScheme.hover} ${colorScheme.button} transition-all duration-200 py-2 px-4 rounded-md`}>
            Betting
          </Link>
          <Link href="/contact" className={`${colorScheme.hover} ${colorScheme.button} transition-all duration-200 py-2 px-4 rounded-md`}>
            Fanzone
          </Link>
        </div>

        {/* Mobile Menu Icon (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-between items-center w-8 h-6 space-y-1"
          >
            {/* Hamburger Bars */}
            <div
              className={`h-1 w-8 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 absolute" : ""
              }`}
            />
            <div
              className={`h-1 w-8 bg-white transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`h-1 w-8 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 absolute" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
         <div
         className={`md:hidden mt-4 space-y-4 px-4 pb-4 transition-all duration-100 ease-in-out ${
           isOpen ? "translate-y-0" : "-translate-y-full"
         }`}
       >
          <Link href="/" className={`${colorScheme.hover} ${colorScheme.button} block transition-all duration-200 py-2 px-4 rounded-md`}>
            Teams
          </Link>
          <Link href="/about" className={`${colorScheme.hover} ${colorScheme.button} block transition-all duration-200 py-2 px-4 rounded-md`}>
            Fantasy
          </Link>
          <Link href="/contact" className={`${colorScheme.hover} ${colorScheme.button} block transition-all duration-200 py-2 px-4 rounded-md`}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
