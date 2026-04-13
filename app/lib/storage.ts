import { createClient } from "./supabase/client";

export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const supabase = createClient();
  const timestamp = Date.now();
  const path = `${userId}/${timestamp}.jpg`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return data.publicUrl;
}

export function getAvatarUrl(path: string | null): string | null {
  if (!path) return null;

  // If it's already a full URL, return as-is
  if (path.startsWith("http")) return path;

  const supabase = createClient();
  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return data.publicUrl;
}
