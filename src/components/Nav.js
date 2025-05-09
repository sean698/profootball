"use client"
import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';

const Nav = () => {

    console.log("Nav component is rendering"); // Add this log to track rendering

    const [isOpen, setIsOpen] = useState(false);

      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    return (
    <nav className="bg-[#0B0B12] text-white px-6 py-4 shadow-md sticky top-0 z-50 font-['DM Sans']">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-4">
          <Image src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <div className="text-white uppercase leading-tight text-2xl font-['montage']">
            <div>Pro Football</div>
            <div>Report</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {["Teams", "Fantasy", "Sportsbook", "Fanzone"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white hover:text-[#ECCE8B] transition-colors duration-200 font-['DM Sans'] text-lg"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <button className="bg-[#087994] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 font-['DM Sans'] text-base">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="border border-white text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200 font-['DM Sans'] text-base">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {["Teams", "Fantasy", "Sportsbook", "Fanzone"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block text-white hover:text-[#ECCE8B] transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
          <Link href="/login" className="block text-white">
            <button className="w-full bg-[#087994] text-white px-4 py-2 rounded-md mt-2">Login</button>
          </Link>
          <Link href="/signup" className="block text-white">
            <button className="w-full text-white px-4 py-2 rounded-md mt-2 border border-white">Sign Up</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
