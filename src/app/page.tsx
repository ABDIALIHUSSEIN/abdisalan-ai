"use client";

import dynamic from "next/dynamic";

const ChatApp = dynamic(() => import("@/components/chat-app"), {
  ssr: false,
  loading: () => <div className="h-screen bg-zinc-950" />,
});

export default function Home() {
  return <ChatApp />;
}
