"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "../../lib/supabase/client";
import { Avatar } from "../Avatar";

interface Message {
  id: string;
  author_id: string;
  content: string;
  created_at: string;
  profile?: { display_name: string; avatar_url: string | null };
}

interface GuildChatProps {
  guildId: string;
  userId: string | null;
  sendMessage: (content: string) => Promise<void>;
}

function timeAgo(date: string): string {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export function GuildChat({ guildId, userId, sendMessage }: GuildChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Load initial messages
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("guild_messages")
        .select("*, profile:profiles(display_name, avatar_url)")
        .eq("guild_id", guildId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (data) setMessages((data as Message[]).reverse());
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`guild-chat-${guildId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "guild_messages", filter: `guild_id=eq.${guildId}` }, async (payload) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("id", payload.new.author_id)
          .single();
        const msg: Message = { ...payload.new as Message, profile: profile || undefined };
        setMessages((prev) => [...prev, msg]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    await sendMessage(input.trim());
    setInput("");
    setSending(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 400 }}>
      {/* Messages area */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 4 }}>
        {messages.length === 0 && (
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textAlign: "center", padding: 40 }}>
            No messages yet. Say hello!
          </div>
        )}
        {messages.map((m) => {
          const isMe = m.author_id === userId;
          return (
            <div key={m.id} style={{ display: "flex", gap: 8, alignItems: "flex-start", flexDirection: isMe ? "row-reverse" : "row" }}>
              <Avatar url={m.profile?.avatar_url} name={m.profile?.display_name} size={28} />
              <div style={{ maxWidth: "70%" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "baseline", flexDirection: isMe ? "row-reverse" : "row" }}>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 700 }}>
                    {m.profile?.display_name || "Unknown"}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>{timeAgo(m.created_at)}</span>
                </div>
                <div style={{
                  background: isMe ? "rgba(194,37,92,0.2)" : "rgba(255,255,255,0.06)",
                  borderRadius: 10, padding: "8px 12px", marginTop: 2,
                  color: "rgba(255,255,255,0.85)", fontSize: 12, lineHeight: 1.5,
                  border: `1px solid ${isMe ? "rgba(194,37,92,0.15)" : "rgba(255,255,255,0.05)"}`,
                }}>
                  {m.content}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 10,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "white", fontSize: 12, fontFamily: "inherit", outline: "none",
          }}
        />
        <button onClick={handleSend} disabled={sending || !input.trim()} style={{
          background: "linear-gradient(135deg,#c2255c,#7e3794)", color: "white",
          border: "none", padding: "10px 18px", borderRadius: 10,
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          opacity: sending || !input.trim() ? 0.5 : 1,
        }}>
          Send
        </button>
      </div>
    </div>
  );
}
