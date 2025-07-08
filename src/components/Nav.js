"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Get auth context with try-catch to handle errors more gracefully
  let user = null;
  let userProfile = null;
  let signOut = null;

  try {
    const auth = useAuth();
    user = auth.user;
    userProfile = auth.userProfile;
    signOut = auth.signOut;
  } catch (error) {
    console.error("Auth context error:", error);
    // Fallback: Show login/signup buttons if auth context fails
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      if (signOut) {
        const { error } = await signOut();
        if (error) {
          console.error("Sign out error:", error);
          return;
        }

        // Force refresh the page after sign out to ensure state is reset
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign out exception:", error);
    }
  };

  // Get username for display - with fallback to email or anonymous
  const displayName =
    userProfile?.username || (user?.email ? user.email.split("@")[0] : "User");

  return (
    <nav className="bg-[#0B0B12] text-white px-6 py-4 shadow-md sticky top-0 z-50 font-['DM Sans']">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-4">
          <Image src="/images/PFRlogo.jpg" alt="Logo" width={48} height={48} />
          <div className="text-white uppercase leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-['montage']">
            <div>PRO FOOTBALL REPORT</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex space-x-2 ml-4">
          {["Teams", "Standings", "Fantasy", "Sportsbooks", "Fanzone"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="bg-[#ECCE8B] text-black px-4 py-2 text-sm rounded-md font-['DM Sans'] transition-all duration-200 hover:bg-black hover:text-[#ECCE8B] hover:border hover:border-[#ECCE8B] whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Side Buttons */}
        <div className="hidden lg:flex items-center space-x-2">
          {user ? (
            <>
              <button
                onClick={handleSignOut}
                className="bg-[#087994] text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition-all duration-200 font-['DM Sans'] text-base"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-[#087994] text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition-all duration-200 font-['DM Sans'] text-base">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-[#087994] text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition-all duration-200 font-['DM Sans'] text-base">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
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
        <div className="lg:hidden mt-4 grid grid-cols-3 gap-3 place-items-center">
          {["Teams", "Standings", "Fantasy", "Sportsbooks", "Fanzone"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="w-36 text-center bg-[#ECCE8B] text-black px-4 py-2 text-sm rounded-md font-['DM Sans'] transition-all duration-200 hover:bg-black hover:text-[#ECCE8B] hover:border hover:border-[#ECCE8B]"
            >
              {item}
            </Link>
          ))}
          {user ? (
            <>
              <button
                onClick={handleSignOut}
                className="w-36 bg-[#087994] text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition-all duration-200"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="w-36 bg-[#087994] text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition-all duration-200">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-36 bg-[#087994] text-white px-4 py-2 text-sm rounded-md hover:opacity-90 transition-all duration-200">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
