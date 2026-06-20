import nodemailer from "nodemailer";

export async function sendQuestionAlert(question: string, turn: number) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Abdisalan AI" <${user}>`,
    to: user,
    subject: `New visitor question on Abdisalan AI`,
    text: `A visitor just asked:\n\n"${question}"\n\n(Turn ${turn} of the conversation)\n\nView live site: https://abdisalan-ai.vercel.app`,
  });
}
