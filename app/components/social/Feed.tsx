"use client";
import { useState, useEffect, useCallback } from "react";
import { useSocial } from "../../hooks/useSocial";
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";
import type { Post } from "../../types";

interface FeedProps {
  userId: string | null;
}

export function Feed({ userId }: FeedProps) {
  const { fetchFeed, createPost, likePost, unlikePost } = useSocial(userId);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loadFeed = useCallback(
    async (pageNum: number, append = false) => {
      setLoading(true);
      try {
        const data = await fetchFeed(pageNum);
        if (append) {
          setPosts((prev) => [...prev, ...data]);
        } else {
          setPosts(data);
        }
        setHasMore(data.length === 20);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    },
    [fetchFeed]
  );

  useEffect(() => {
    loadFeed(0);
  }, [loadFeed]);

  const handlePost = async (content: string) => {
    try {
      const newPost = await createPost(content);
      if (newPost) {
        setPosts((prev) => [newPost, ...prev]);
      }
    } catch {
      // silently fail
    }
  };

  const handleLike = async (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked_by_me: true, likes_count: p.likes_count + 1 }
          : p
      )
    );
    try {
      await likePost(postId);
    } catch {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, liked_by_me: false, likes_count: p.likes_count - 1 }
            : p
        )
      );
    }
  };

  const handleUnlike = async (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked_by_me: false, likes_count: p.likes_count - 1 }
          : p
      )
    );
    try {
      await unlikePost(postId);
    } catch {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, liked_by_me: true, likes_count: p.likes_count + 1 }
            : p
        )
      );
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadFeed(nextPage, true);
  };

  return (
    <div>
      <CreatePost onPost={handlePost} />

      {posts.length === 0 && !loading && (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e8e0e4",
            borderRadius: 16,
            padding: 32,
            textAlign: "center",
            color: "#8a7e92",
            fontSize: 14,
            marginTop: 12,
          }}
        >
          Follow some users to see posts here!
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            userId={userId}
            onLike={handleLike}
            onUnlike={handleUnlike}
          />
        ))}
      </div>

      {loading && (
        <div
          style={{
            textAlign: "center",
            color: "#8a7e92",
            fontSize: 13,
            padding: 20,
          }}
        >
          Loading...
        </div>
      )}

      {!loading && hasMore && posts.length > 0 && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            onClick={handleLoadMore}
            style={{
              background: "white",
              color: "#c2255c",
              border: "1.5px solid #e8e0e4",
              borderRadius: 10,
              padding: "10px 24px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
