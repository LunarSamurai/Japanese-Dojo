"use client";
import { useState } from "react";

interface CreatePostProps {
  onPost: (content: string) => void;
}

const MAX_CHARS = 500;

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  const charsLeft = MAX_CHARS - content.length;
  const canPost = content.trim().length > 0 && charsLeft >= 0 && !posting;

  const handleSubmit = async () => {
    if (!canPost) return;
    setPosting(true);
    try {
      await onPost(content.trim());
      setContent("");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8e0e4",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your learning journey..."
        maxLength={MAX_CHARS}
        rows={3}
        style={{
          width: "100%",
          border: "1.5px solid #e8e0e4",
          borderRadius: 12,
          padding: 12,
          fontSize: 14,
          color: "#1a1523",
          fontFamily: "inherit",
          resize: "vertical",
          outline: "none",
          background: "#faf7f5",
          boxSizing: "border-box",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: charsLeft < 50 ? "#c2255c" : "#8a7e92",
            fontWeight: charsLeft < 50 ? 700 : 400,
          }}
        >
          {charsLeft} characters remaining
        </span>

        <button
          onClick={handleSubmit}
          disabled={!canPost}
          style={{
            background: canPost
              ? "linear-gradient(135deg,#c2255c,#7e3794)"
              : "#e8e0e4",
            color: canPost ? "white" : "#8a7e92",
            border: "none",
            borderRadius: 10,
            padding: "8px 20px",
            fontSize: 13,
            fontWeight: 700,
            cursor: canPost ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            transition: "all 0.15s",
          }}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
