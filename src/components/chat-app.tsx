"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "abdisalan-ai-chat";

const SUGGESTED_PROMPTS = [
  "Who is Abdisalan?",
  "What's his tech setup?",
  "Quiz me on AI",
  "Quiz me on Project Management",
];

function loadStoredMessages(): Message[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>(loadStoredMessages);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const streamBufferRef = useRef("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0 || isStreaming) return;
    const timer = setTimeout(() => {
      setMessages([]);
      window.localStorage.removeItem(STORAGE_KEY);
    }, 2 * 60 * 1000);
    return () => clearTimeout(timer);
  }, [messages, isStreaming]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [input]);

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || isStreaming) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);
    streamBufferRef.current = "";

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.body) throw new Error("No response stream from server.");

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "The AI backend returned an error.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        streamBufferRef.current += decoder.decode(value, { stream: true });
        const text = streamBufferRef.current;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: text };
          return updated;
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: `⚠️ ${message}` };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      textareaRef.current?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function clearChat() {
    setMessages([]);
    window.localStorage.removeItem(STORAGE_KEY);
    textareaRef.current?.focus();
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header
        className="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur-sm"
        style={{ paddingTop: `calc(0.75rem + var(--safe-top))` }}
      >
        <div className="flex items-center gap-3">
          <img
            src="/avatar.jpg"
            alt="Abdisalan Ali"
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-indigo-500/30"
          />
          <div>
            <h1 className="text-sm font-semibold leading-tight">Abdisalan AI</h1>
            <p className="text-[11px] leading-tight text-zinc-500">Digital twin · ask me anything</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="min-h-[44px] min-w-[44px] rounded-xl border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-400 transition active:scale-95 hover:border-red-500/50 hover:text-red-400"
            >
              Clear
            </button>
          )}
          <Link
            href="/about"
            className="min-h-[44px] flex items-center rounded-xl border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-300 transition active:scale-95 hover:border-zinc-500 hover:text-white"
          >
            About
          </Link>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-6 pt-8 text-center sm:pt-12">
              <div className="flex flex-col items-center gap-3">
                <img
                  src="/avatar.jpg"
                  alt="Abdisalan Ali"
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-indigo-500/20 sm:h-20 sm:w-20"
                />
                <div>
                  <h2 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
                    Hey, I&apos;m Abdisalan AI 👋
                  </h2>
                  <p className="mt-1.5 text-sm text-zinc-500 sm:text-base">
                    A digital version of Abdisalan Ali — ask about his experience, skills, or projects.
                  </p>
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="min-h-[52px] rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-left text-sm text-zinc-300 transition active:scale-[0.98] hover:border-zinc-600 hover:bg-zinc-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[80%] sm:text-sm ${
                  message.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-100"
                }`}
              >
                {message.content || (
                  <span className="inline-flex gap-1.5 py-0.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:0.2s]" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-zinc-800 bg-zinc-950/90 px-3 py-3 backdrop-blur-sm sm:px-4"
        style={{ paddingBottom: `calc(0.75rem + var(--safe-bottom))` }}
      >
        <div className="mx-auto flex max-w-2xl items-end gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-3 py-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Abdisalan AI something..."
            rows={1}
            className="flex-1 resize-none bg-transparent py-2 text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none sm:text-sm"
            style={{ maxHeight: "120px" }}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition active:scale-95 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-2xl text-center text-[11px] text-zinc-700">
          Grounded in Abdisalan&apos;s profile · not invented
        </p>
      </form>
    </div>
  );
}
