import { Resend } from "resend";

export async function sendQuestionAlert(question: string, turn: number) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Abdisalan AI <onboarding@resend.dev>",
    to: "abdisalan@asalmediacorp.com",
    subject: "New visitor question on Abdisalan AI",
    text: `A visitor just asked:\n\n"${question}"\n\n(Turn ${turn} of the conversation)\n\nView live site: https://abdisalan-ai.vercel.app`,
  });
}
