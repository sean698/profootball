"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { supabase } from "@/utils/supabaseClient";

// Dynamically import TinyMCE Editor for SSR compatibility
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

export default function CommentsPage({ title }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const decodedTitle = decodeURIComponent(title);

  useEffect(() => {
    const testQuery = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .limit(1);
      if (error) console.error("Test Query Error:", error);
      else console.log("Test Query Data:", data);
    };
    testQuery();
  }, []);

  // Fetch comments from Supabase when component mounts or title changes
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("newsletter_title", decodedTitle)
        .order("time", { ascending: false });

      console.log("Fetched Comments:", data);

      if (error) {
        console.error("Error fetching comments:", error);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [decodedTitle]);

  const handleSubmit = async () => {
    if (username.trim() === "") return alert("Please enter a username.");
    if (password.trim() === "") return alert("Please enter a password.");
    if (
      commentContent.trim() === "" ||
      commentContent === "<p><br></p>" ||
      commentContent === "<p></p>"
    )
      return alert("Please enter a comment.");

    const newComment = {
      user_id,
      newsletter_title: title,
      content: commentContent,
      time: new Date().toLocaleString(),
      votesUp: 0,
      votesDown: 0,
    };

    // Insert new comment into Supabase
    const { data, error } = await supabase
      .from("comments")
      .insert([newComment])
      .select();

    if (error) {
      alert("Error adding comment: " + error.message);
      console.error(error);
    } else {
      setComments([data[0], ...comments]);
      if (!rememberMe) {
        setUsername("");
        setPassword("");
      }
      setCommentContent("");
    }
  };

  const handleVote = async (index, type) => {
    const comment = comments[index];
    const updatedComment = { ...comment };

    if (type === "up") updatedComment.votesUp += 1;
    if (type === "down") updatedComment.votesDown += 1;

    // Update votes in Supabase
    const { data, error } = await supabase
      .from("comments")
      .update({
        votesUp: updatedComment.votesUp,
        votesDown: updatedComment.votesDown,
      })
      .eq("id", comment.id)
      .select();

    if (error) {
      alert("Error updating vote: " + error.message);
      console.error(error);
    } else {
      // Update local state
      const updatedComments = [...comments];
      updatedComments[index] = data[0];
      setComments(updatedComments);
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
                <li key={index} className="border-b p-2 last:border-0 ">
                  <div className="flex frontusername justify-between items-center bg-[#f5da9f] border">
                    <div className="ml-5 font-bold">
                      {c.first_name} {c.last_name}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVote(index, "up")}
                        className="text-green-500"
                        type="button"
                      >
                        👍 ({c.votesUp ?? 0})
                      </button>
                      <button
                        onClick={() => handleVote(index, "down")}
                        className="text-red-500"
                        type="button"
                      >
                        👎 ({c.votesDown ?? 0})
                      </button>
                      <span className="text-xs pr-5 text-gray-500">
                        {new Date(c.time).toLocaleString("en-US", {
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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 border border-black p-4 rounded bg-gray-50"
        >
          <div className="flex flex-wrap items-center space-x-4 mb-4">
            <label className="font-bold">Login:</label>
            <input
              type="text"
              placeholder="Username"
              className="border border-black px-2 py-1 rounded flex-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <a href="#" className="text-blue-500 text-sm ml-2 hover:underline">
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
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create an account to make comments
              </a>
            </div>
          </div>

          <div className="border border-gray-300 rounded p-2 bg-white">
            <Editor
              apiKey="ji92wkc82n7s07nh64mrq1e6i8v2h9d4d37cw2r4neyylw3x"
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
                images_upload_handler: (blobInfo, success, failure) => {
                  const base64 = blobInfo.base64();
                  const mimeType = blobInfo.blob().type;
                  const dataUrl = `data:${mimeType};base64,${base64}`;
                  success(dataUrl);
                },
                file_picker_callback: (callback, value, meta) => {
                  const input = document.createElement("input");
                  input.setAttribute("type", "file");
                  if (meta.filetype === "image") {
                    input.setAttribute("accept", "image/*");
                  } else if (meta.filetype === "media") {
                    input.setAttribute("accept", "video/*");
                  }
                  input.onchange = function () {
                    const file = this.files[0];
                    const reader = new FileReader();
                    reader.onload = function () {
                      callback(reader.result, { alt: file.name });
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
      </div>
      <Footer />
    </div>
  );
}
