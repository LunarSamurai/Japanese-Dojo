"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import { uploadAvatar as uploadAvatarStorage } from "../lib/storage";
import type { UserProfile } from "../types";

export function useProfile(userId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError) throw fetchError;

      const parsed: UserProfile = {
        id: data.id,
        display_name: data.display_name ?? "",
        bio: data.bio ?? "",
        avatar_url: data.avatar_url ?? null,
        country: data.country ?? "",
        region: data.region ?? "",
        social_links: data.social_links ?? {},
        privacy: data.privacy ?? {
          profile_public: true,
          show_stats: true,
          show_guild: true,
        },
      };

      setProfile(parsed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load profile";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      if (!userId) return;

      setError(null);
      try {
        const supabase = createClient();
        const { error: updateError } = await supabase
          .from("profiles")
          .update(data)
          .eq("id", userId);

        if (updateError) throw updateError;

        setProfile((prev) =>
          prev ? { ...prev, ...data } : null
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to update profile";
        setError(msg);
        throw err;
      }
    },
    [userId]
  );

  const uploadAvatarFn = useCallback(
    async (file: File) => {
      if (!userId) return;

      setError(null);
      try {
        const publicUrl = await uploadAvatarStorage(file, userId);

        const supabase = createClient();
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar_url: publicUrl })
          .eq("id", userId);

        if (updateError) throw updateError;

        setProfile((prev) =>
          prev ? { ...prev, avatar_url: publicUrl } : null
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to upload avatar";
        setError(msg);
        throw err;
      }
    },
    [userId]
  );

  return { profile, loading, error, updateProfile, uploadAvatar: uploadAvatarFn };
}
