"use client";
import { useState } from "react";
import type { Post } from "../../types";
import { CommentList } from "./CommentList";
import { Avatar } from "../Avatar";
import { ClickableUsername } from "../UserPopup";

interface PostCardProps {
  post: Post;
  userId: string | null;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

export function PostCard({ post, userId, onLike, onUnlike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  const authorName = post.author?.display_name || "Anonymous";
  const avatarUrl = post.author?.avatar_url;
  const initial = authorName.charAt(0).toUpperCase();

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8e0e4",
        borderRadius: 16,
        padding: 18,
        transition: "all 0.2s",
      }}
    >
      {/* Header: avatar, name, time */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <Avatar url={avatarUrl} name={authorName} size={32} />
        <div style={{ flex: 1 }}>
          <ClickableUsername userId={post.author_id} name={authorName} currentUserId={userId} style={{ color: "#1a1523", fontSize: 14 }} />
          <div style={{ color: "#8a7e92", fontSize: 11 }}>
            {relativeTime(post.created_at)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          color: "#1a1523",
          fontSize: 14,
          lineHeight: 1.6,
          marginBottom: 14,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {post.content}
      </div>

      {/* Actions: like + comments */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderTop: "1px solid #e8e0e4",
          paddingTop: 12,
        }}
      >
        <button
          onClick={() =>
            post.liked_by_me ? onUnlike(post.id) : onLike(post.id)
          }
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: post.liked_by_me ? "#c2255c" : "#8a7e92",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            padding: 0,
            transition: "color 0.15s",
          }}
        >
          {post.liked_by_me ? "♥" : "♡"} {post.likes_count}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#8a7e92",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            padding: 0,
            transition: "color 0.15s",
          }}
        >
          💬 {post.comments_count}
        </button>
      </div>

      {/* Expandable comments */}
      {showComments && (
        <div style={{ marginTop: 14 }}>
          <CommentList postId={post.id} userId={userId} />
        </div>
      )}
    </div>
  );
}
