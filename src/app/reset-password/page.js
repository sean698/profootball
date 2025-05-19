"use client";
// src/app/reset-password/page.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasResetToken, setHasResetToken] = useState(false);
  const router = useRouter();

  // Check if the URL contains the reset token
  useEffect(() => {
    const checkHashParams = () => {
      // Access the hash part of the URL (after #)
      const hash = window.location.hash;
      if (hash && hash.includes("type=recovery")) {
        setHasResetToken(true);
      } else {
        setError(
          "Invalid or missing reset token. Please request a new password reset link."
        );
      }
    };

    checkHashParams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw error;
      }

      setMessage("Password successfully reset! Redirecting to login...");

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
      console.error("Error updating password:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Set New Password
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        {hasResetToken ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#087994] text-white py-2 px-4 rounded-md hover:bg-[#065f74] transition duration-300"
              disabled={loading}
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="mb-4">
              Invalid or expired reset link. Please request a new password
              reset.
            </p>
            <Link href="/forgot-password">
              <button className="bg-[#087994] text-white py-2 px-4 rounded-md hover:bg-[#065f74] transition duration-300">
                Request New Reset Link
              </button>
            </Link>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-500 hover:text-blue-700">
            Back to Login
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
