"use client";
// src/app/login/page.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  const { signIn, user } = useAuth();

  // Check if already logged in and redirect
  useEffect(() => {
    if (user) {
      router.push("/");
      router.refresh();
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        setError(error.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Set login success state
      setLoginSuccess(true);

      // Redirect to homepage on success
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500); // Small delay to allow the state to update
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loginSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Login successful! Redirecting to home page...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || loginSuccess}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || loginSuccess}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md transition duration-300 ${
              loading || loginSuccess
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#087994] text-white hover:bg-[#065f74]"
            }`}
            disabled={loading || loginSuccess}
          >
            {loading
              ? "Logging in..."
              : loginSuccess
              ? "Redirecting..."
              : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
