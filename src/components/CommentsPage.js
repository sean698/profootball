"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/contexts/AuthContext";

// Dynamically import TinyMCE Editor for SSR compatibility
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

export default function CommentsPage({ title }) {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const decodedTitle = decodeURIComponent(title);

  // You can remove this test query unless you specifically need it for debugging.
  // useEffect(() => {
  //   const testQuery = async () => {
  //     const { data, error } = await supabase
  //       .from("comments") // <--- REMOVED .schema("membership")
  //       .select("*")
  //       .limit(1);
  //     if (error) console.error("Test Query Error:", error);
  //     else console.log("Test Query Data:", data);
  //   };
  //   testQuery();
  // }, []);

  // Fetch comments from Supabase when component mounts or title changes
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments") // <--- REMOVED .schema("membership")
        .select(
          `
          *,
          users (
            first_name,
            last_name
          )
        `
        )
        .eq("newsletter_title", decodedTitle)
        .order("created_at", { ascending: true }); // Order ascending to match insertion logic

      console.log("Fetched Comments:", data);

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data);
      }
    };

    fetchComments();

    // Setup real-time listener for new comments if you want them to appear automatically
    const commentsChannel = supabase
      .channel("comments_changes")
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for all changes (INSERT, UPDATE, DELETE)
          schema: "public", // Specify the schema
          table: "comments",
          filter: `newsletter_title=eq.${decodedTitle}`, // Only listen for changes related to this title
        },
        (payload) => {
          console.log("Change received!", payload);
          // Refetch all comments for simplicity, or handle specific payload types
          fetchComments(); // Re-fetch to ensure order and full data
        }
      )
      .subscribe();

    // Clean up on component unmount
    return () => {
      commentsChannel.unsubscribe();
    };
  }, [decodedTitle]); // Depend on decodedTitle

  const handleSubmit = async () => {
    if (
      commentContent.trim() === "" ||
      commentContent === "<p><br></p>" ||
      commentContent === "<p></p>"
    )
      return alert("Please enter a comment.");

    let currentUser = user;

    if (!currentUser) {
      if (email.trim() === "") return alert("Please enter an email.");
      if (password.trim() === "") return alert("Please enter a password.");

      // Ensure that signIn also returns data and error correctly.
      // Assuming signIn in AuthContext handles Supabase login and updates the user state.
      const { user: signedInUser, error: loginError } = await signIn(
        email,
        password
      );

      if (loginError) {
        return alert("Login failed: " + loginError.message);
      }

      if (!signedInUser) {
        // Check if user object is directly returned or nested
        alert("User not found after login. Please try again.");
        return;
      }

      currentUser = signedInUser; // Assign the directly returned user object
    }

    const newCommentPayload = {
      // Renamed to avoid confusion with newComment object
      user_id: currentUser.id,
      newsletter_title: decodedTitle,
      content: commentContent,
      // created_at and updated_at are handled by database defaults
      // votes_up and votes_down are handled by database defaults
    };

    // Insert new comment into Supabase
    const { data, error } = await supabase
      .from("comments") // <--- REMOVED .schema("membership")
      .insert([newCommentPayload]) // Use the payload object
      .select(
        `
        *,
        users (
          first_name,
          last_name
        )
      `
      );

    if (error) {
      alert("Error adding comment: " + error.message);
      console.error(error);
    } else {
      // If using real-time subscriptions (recommended), you might not need to manually update state here.
      // The real-time listener will trigger a fetch and update the comments.
      // If not using real-time, ensure you add the new comment in the correct order.
      // Since fetchComments orders ascending, newly added should go at the end.
      // For immediate display, you can insert it and then let the real-time update sync.
      // For now, let's keep it simple and rely on the fetchComments in useEffect.
      // setComments((prevComments) => [...prevComments, data[0]]); // Add to end for ascending order
      // If you implement real-time, just clear the content:
      if (!rememberMe) {
        setEmail("");
        setPassword("");
      }
      setCommentContent("");
    }
  };

  const handleVote = async (index, type) => {
    const comment = comments[index];
    const updatedVotes = {
      votes_up: type === "up" ? comment.votes_up + 1 : comment.votes_up,
      votes_down: type === "down" ? comment.votes_down + 1 : comment.votes_down,
    };

    // Update votes in Supabase
    const { data, error } = await supabase
      .from("comments") // <--- REMOVED .schema("membership")
      .update(updatedVotes)
      .eq("comment_id", comment.comment_id)
      .select(); // Select the updated row

    if (error) {
      alert("Error updating vote: " + error.message);
      console.error(error);
    } else {
      // Update local state, ensuring user info is preserved
      // Supabase .update().select() will return the updated row, but won't include joined data.
      // So, we manually preserve the user info from the original comment object.
      const updatedCommentData = {
        ...data[0], // The updated comment data from Supabase
        users: comment.users, // Preserve the nested user object
      };

      setComments((prevComments) =>
        prevComments.map((c) =>
          c.comment_id === updatedCommentData.comment_id
            ? updatedCommentData
            : c
        )
      );
    }
  };

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto mt-10 p-4 mb-50 rounded shadow bg-gray-100">
        {/* Title */}
        <h3 className="text-2xl font-bold mb-4">
          Title: {decodeURIComponent(title)}
        </h3>

        {/* Comments List */}
        <section className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Comments</h4>
          {comments.length > 0 ? (
            <ul className="border p-2 rounded bg-gray-50">
              {comments.map((c, index) => (
                <li key={c.comment_id} className="border-b p-2 last:border-0 ">
                  {" "}
                  {/* Use unique ID for key */}
                  <div className="flex frontusername justify-between items-center bg-[#f5da9f] border">
                    <div className="ml-5 font-bold">
                      {c.users?.first_name} {c.users?.last_name}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote(index, "up")}
                        className="text-green-500"
                        type="button"
                      >
                        👍 ({c.votes_up ?? 0})
                      </button>
                      <button
                        onClick={() => handleVote(index, "down")}
                        className="text-red-500"
                        type="button"
                      >
                        👎 ({c.votes_down ?? 0})
                      </button>
                      <span className="text-xs pr-5 text-gray-500">
                        {new Date(c.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <div
                    className="mt-2"
                    dangerouslySetInnerHTML={{ __html: c.content }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </section>

        {/* Login and Comment Section */}
        {!user ? (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 border border-black p-4 rounded bg-gray-50"
          >
            <div className="flex flex-wrap items-center space-x-4 mb-4">
              <label className="font-bold">Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="border border-black px-2 py-1 rounded flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="font-bold ml-4">Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="border border-black px-2 py-1 rounded flex-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a
                href="/forgot-password"
                className="text-blue-500 text-sm ml-2 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="ml-2">
                Remember me
              </label>
              <div className="mt-2">
                <a
                  href="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Create an account to make comments
                </a>
              </div>
            </div>

            <div className="border border-gray-300 rounded p-2 bg-white">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={commentContent}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: ["image", "link", "lists", "media", "table"],
                  toolbar:
                    "undo redo | fontfamily fontsize formatselect fontselect fontsizeselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media",
                  font_family_formats:
                    "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier; Times New Roman=times new roman,times; Verdana=verdana,geneva;",
                  fontsize_formats: "10px 12px 14px 16px 18px 24px 36px",
                  file_picker_types: "image media",
                  images_upload_handler: (blobInfo) => {
                    return new Promise((resolve, reject) => {
                      try {
                        const base64 = blobInfo.base64();
                        const mimeType = blobInfo.blob().type;
                        const dataUrl = `data:${mimeType};base64,${base64}`;
                        resolve(dataUrl);
                      } catch (err) {
                        reject("Failed to upload image");
                      }
                    });
                  },
                  file_picker_callback: (callback, value, meta) => {
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");

                    if (meta.filetype === "image") {
                      input.setAttribute("accept", "image/*");
                    } else if (meta.filetype === "media") {
                      input.setAttribute("accept", "video/*"); // accepts video
                    }

                    input.onchange = function () {
                      const file = this.files[0];
                      const reader = new FileReader();

                      reader.onload = function () {
                        // This will embed the video as a base64 blob
                        callback(reader.result, { title: file.name });
                      };

                      reader.readAsDataURL(file);
                    };

                    input.click();
                  },
                  content_style:
                    "body { font-family:Arial,sans-serif; font-size:14px }",
                  placeholder: "Write your comments here...",
                }}
                onEditorChange={(newValue) => setCommentContent(newValue)}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#f5da9f] text-black rounded hover:bg-black hover:text-yellow-400 transition"
                type="button"
              >
                Add Comment
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 border border-black p-4 rounded bg-gray-50"
          >
            <p className="mb-4">Logged in as {user.email}</p>

            <div className="border border-gray-300 rounded p-2 bg-white">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={commentContent}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: ["image", "link", "lists", "media", "table"],
                  toolbar:
                    "undo redo | fontfamily fontsize formatselect fontselect fontsizeselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media",
                  font_family_formats:
                    "Arial=arial,helvetica,sans-serif; Courier New=courier new,courier; Times New Roman=times new roman,times; Verdana=verdana,geneva;",
                  fontsize_formats: "10px 12px 14px 16px 18px 24px 36px",
                  automatic_uploads: true,
                  file_picker_types: "image media",
                  images_upload_handler: (blobInfo) => {
                    return new Promise((resolve, reject) => {
                      try {
                        const base64 = blobInfo.base64();
                        const mimeType = blobInfo.blob().type;
                        const dataUrl = `data:${mimeType};base64,${base64}`;
                        resolve(dataUrl);
                      } catch (err) {
                        reject("Failed to upload image");
                      }
                    });
                  },
                  file_picker_callback: (callback, value, meta) => {
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");

                    if (meta.filetype === "image") {
                      input.setAttribute("accept", "image/*");
                    } else if (meta.filetype === "media") {
                      input.setAttribute("accept", "video/*"); // accepts video
                    }

                    input.onchange = function () {
                      const file = this.files[0];
                      const reader = new FileReader();

                      reader.onload = function () {
                        // This will embed the video as a base64 blob
                        callback(reader.result, { title: file.name });
                      };

                      reader.readAsDataURL(file);
                    };

                    input.click();
                  },
                  content_style:
                    "body { font-family:Arial,sans-serif; font-size:14px }",
                  placeholder: "Write your comments here...",
                }}
                onEditorChange={(newValue) => setCommentContent(newValue)}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#f5da9f] text-black rounded hover:bg-black hover:text-yellow-400 transition"
                type="button"
              >
                Add Comment
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}
