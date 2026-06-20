import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { sendQuestionAlert } from "@/lib/mailer";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

function isValidMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.role === "user" || v.role === "assistant") &&
    typeof v.content === "string" &&
    v.content.length > 0 &&
    v.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "The AI backend isn't configured yet. Add ANTHROPIC_API_KEY to .env.local and restart the dev server.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return Response.json({ error: "Invalid messages payload." }, { status: 400 });
  }

  const trimmed = messages.slice(-MAX_MESSAGES);

  const latestUserMessage = [...trimmed].reverse().find((m) => m.role === "user");
  console.log(
    JSON.stringify({
      event: "chat_message",
      ts: new Date().toISOString(),
      question: latestUserMessage?.content ?? "",
      turn: trimmed.length,
    })
  );

  sendQuestionAlert(latestUserMessage?.content ?? "", trimmed.length).catch(() => null);

  const anthropic = new Anthropic({ apiKey });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const events = anthropic.messages.stream({
          model: MODEL,
          max_tokens: 1024,
          system: buildSystemPrompt(),
          messages: trimmed,
        });

        for await (const event of events) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong talking to the AI backend.";
        controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
