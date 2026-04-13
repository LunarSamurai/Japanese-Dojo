"use client";
import { useState, useEffect } from "react";
import { useSocial } from "../../hooks/useSocial";
import type { Comment } from "../../types";

interface CommentListProps {
  postId: string;
  userId: string | null;
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

export function CommentList({ postId, userId }: CommentListProps) {
  const { fetchComments, createComment } = useSocial(userId);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchComments(postId);
        if (!cancelled) setComments(data);
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [postId, fetchComments]);

  const handleSubmit = async () => {
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);
    try {
      const comment = await createComment(postId, newComment.trim());
      if (comment) {
        setComments((prev) => [...prev, comment]);
        setNewComment("");
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (loading) {
    return (
      <div style={{ color: "#8a7e92", fontSize: 12, padding: "8px 0" }}>
        Loading comments...
      </div>
    );
  }

  return (
    <div>
      {comments.length === 0 && (
        <div style={{ color: "#8a7e92", fontSize: 12, marginBottom: 10 }}>
          No comments yet. Be the first!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {comments.map((c) => {
          const name = c.author?.display_name || "Anonymous";
          const initial = name.charAt(0).toUpperCase();
          const avatarUrl = c.author?.avatar_url;

          return (
            <div
              key={c.id}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#c2255c,#7e3794)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 11,
                    flexShrink: 0,
                  }}
                >
                  {initial}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span
                    style={{
                      color: "#1a1523",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {name}
                  </span>
                  <span style={{ color: "#8a7e92", fontSize: 10 }}>
                    {relativeTime(c.created_at)}
                  </span>
                </div>
                <div
                  style={{
                    color: "#564a5e",
                    fontSize: 13,
                    lineHeight: 1.5,
                    marginTop: 2,
                  }}
                >
                  {c.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add comment input */}
      {userId && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
            maxLength={300}
            style={{
              flex: 1,
              border: "1.5px solid #e8e0e4",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 13,
              color: "#1a1523",
              fontFamily: "inherit",
              outline: "none",
              background: "#faf7f5",
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim() || submitting}
            style={{
              background:
                newComment.trim() && !submitting
                  ? "linear-gradient(135deg,#c2255c,#7e3794)"
                  : "#e8e0e4",
              color:
                newComment.trim() && !submitting ? "white" : "#8a7e92",
              border: "none",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor:
                newComment.trim() && !submitting
                  ? "pointer"
                  : "not-allowed",
              fontFamily: "inherit",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {submitting ? "..." : "Send"}
          </button>
        </div>
      )}
    </div>
  );
}
