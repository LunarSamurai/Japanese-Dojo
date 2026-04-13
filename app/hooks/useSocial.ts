"use client";
import { useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import type { Post, Comment, UserProfile } from "../types";

export function useSocial(userId: string | null) {
  const supabase = createClient();

  const fetchFeed = useCallback(
    async (page: number): Promise<Post[]> => {
      if (!userId) return [];

      const limit = 20;
      const offset = page * limit;

      // Get list of users we follow
      const { data: followRows } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", userId);

      const followedIds = followRows?.map((r) => r.following_id) ?? [];
      const feedUserIds = [...followedIds, userId];

      const { data: posts, error } = await supabase
        .from("posts")
        .select("*, author:profiles!posts_author_id_fkey(*)")
        .in("author_id", feedUserIds)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Check which posts the current user liked
      const postIds = (posts ?? []).map((p) => p.id);
      let likedSet = new Set<string>();

      if (postIds.length > 0) {
        const { data: likes } = await supabase
          .from("likes")
          .select("post_id")
          .eq("user_id", userId)
          .in("post_id", postIds);

        likedSet = new Set((likes ?? []).map((l) => l.post_id));
      }

      return (posts ?? []).map((p) => ({
        id: p.id,
        author_id: p.author_id,
        content: p.content,
        image_url: p.image_url ?? null,
        likes_count: p.likes_count ?? 0,
        comments_count: p.comments_count ?? 0,
        created_at: p.created_at,
        author: p.author
          ? {
              id: p.author.id,
              display_name: p.author.display_name ?? "",
              bio: p.author.bio ?? "",
              avatar_url: p.author.avatar_url ?? null,
              country: p.author.country ?? "",
              region: p.author.region ?? "",
              social_links: p.author.social_links ?? {},
              privacy: p.author.privacy ?? {
                profile_public: true,
                show_stats: true,
                show_guild: true,
              },
            }
          : undefined,
        liked_by_me: likedSet.has(p.id),
      }));
    },
    [userId, supabase]
  );

  const createPost = useCallback(
    async (content: string): Promise<Post | null> => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("posts")
        .insert({ author_id: userId, content })
        .select("*, author:profiles!posts_author_id_fkey(*)")
        .single();

      if (error) throw error;

      return {
        id: data.id,
        author_id: data.author_id,
        content: data.content,
        image_url: data.image_url ?? null,
        likes_count: 0,
        comments_count: 0,
        created_at: data.created_at,
        author: data.author
          ? {
              id: data.author.id,
              display_name: data.author.display_name ?? "",
              bio: data.author.bio ?? "",
              avatar_url: data.author.avatar_url ?? null,
              country: data.author.country ?? "",
              region: data.author.region ?? "",
              social_links: data.author.social_links ?? {},
              privacy: data.author.privacy ?? {
                profile_public: true,
                show_stats: true,
                show_guild: true,
              },
            }
          : undefined,
        liked_by_me: false,
      };
    },
    [userId, supabase]
  );

  const likePost = useCallback(
    async (postId: string) => {
      if (!userId) return;
      await supabase.from("likes").insert({ user_id: userId, post_id: postId });
    },
    [userId, supabase]
  );

  const unlikePost = useCallback(
    async (postId: string) => {
      if (!userId) return;
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", userId)
        .eq("post_id", postId);
    },
    [userId, supabase]
  );

  const fetchComments = useCallback(
    async (postId: string): Promise<Comment[]> => {
      const { data, error } = await supabase
        .from("comments")
        .select("*, author:profiles!comments_author_id_fkey(*)")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return (data ?? []).map((c) => ({
        id: c.id,
        post_id: c.post_id,
        author_id: c.author_id,
        content: c.content,
        created_at: c.created_at,
        author: c.author
          ? {
              id: c.author.id,
              display_name: c.author.display_name ?? "",
              bio: c.author.bio ?? "",
              avatar_url: c.author.avatar_url ?? null,
              country: c.author.country ?? "",
              region: c.author.region ?? "",
              social_links: c.author.social_links ?? {},
              privacy: c.author.privacy ?? {
                profile_public: true,
                show_stats: true,
                show_guild: true,
              },
            }
          : undefined,
      }));
    },
    [supabase]
  );

  const createComment = useCallback(
    async (postId: string, content: string): Promise<Comment | null> => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from("comments")
        .insert({ post_id: postId, author_id: userId, content })
        .select("*, author:profiles!comments_author_id_fkey(*)")
        .single();

      if (error) throw error;

      return {
        id: data.id,
        post_id: data.post_id,
        author_id: data.author_id,
        content: data.content,
        created_at: data.created_at,
        author: data.author
          ? {
              id: data.author.id,
              display_name: data.author.display_name ?? "",
              bio: data.author.bio ?? "",
              avatar_url: data.author.avatar_url ?? null,
              country: data.author.country ?? "",
              region: data.author.region ?? "",
              social_links: data.author.social_links ?? {},
              privacy: data.author.privacy ?? {
                profile_public: true,
                show_stats: true,
                show_guild: true,
              },
            }
          : undefined,
      };
    },
    [userId, supabase]
  );

  const followUser = useCallback(
    async (targetUserId: string) => {
      if (!userId) return;
      await supabase
        .from("follows")
        .insert({ follower_id: userId, following_id: targetUserId });
    },
    [userId, supabase]
  );

  const unfollowUser = useCallback(
    async (targetUserId: string) => {
      if (!userId) return;
      await supabase
        .from("follows")
        .delete()
        .eq("follower_id", userId)
        .eq("following_id", targetUserId);
    },
    [userId, supabase]
  );

  const searchUsers = useCallback(
    async (query: string): Promise<UserProfile[]> => {
      if (!query.trim()) return [];

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .ilike("display_name", `%${query}%`)
        .limit(20);

      if (error) throw error;

      return (data ?? []).map((p) => ({
        id: p.id,
        display_name: p.display_name ?? "",
        bio: p.bio ?? "",
        avatar_url: p.avatar_url ?? null,
        country: p.country ?? "",
        region: p.region ?? "",
        social_links: p.social_links ?? {},
        privacy: p.privacy ?? {
          profile_public: true,
          show_stats: true,
          show_guild: true,
        },
      }));
    },
    [supabase]
  );

  const fetchFollowCounts = useCallback(
    async (
      targetUserId: string
    ): Promise<{ followers: number; following: number }> => {
      const [{ count: followers }, { count: following }] = await Promise.all([
        supabase
          .from("follows")
          .select("*", { count: "exact", head: true })
          .eq("following_id", targetUserId),
        supabase
          .from("follows")
          .select("*", { count: "exact", head: true })
          .eq("follower_id", targetUserId),
      ]);

      return { followers: followers ?? 0, following: following ?? 0 };
    },
    [supabase]
  );

  return {
    fetchFeed,
    createPost,
    likePost,
    unlikePost,
    fetchComments,
    createComment,
    followUser,
    unfollowUser,
    searchUsers,
    fetchFollowCounts,
  };
}
