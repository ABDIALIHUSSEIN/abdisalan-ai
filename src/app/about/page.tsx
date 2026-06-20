import Link from "next/link";
import { profile } from "@/lib/profile";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold">
            AA
          </div>
          <h1 className="text-sm font-semibold">Abdisalan AI</h1>
        </div>
        <Link
          href="/"
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Back to chat
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">{profile.name}</h2>
        <p className="mt-1 text-zinc-400">{profile.contact.title} · {profile.contact.company}</p>
        <p className="mt-0.5 text-sm text-zinc-600">{profile.contact.location}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a href={`https://${profile.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition">{profile.contact.website}</a>
          <a href={`mailto:${profile.contact.email}`} className="text-zinc-400 hover:text-zinc-200 transition">{profile.contact.email}</a>
        </div>

        <Section title="Experience">
          <div className="space-y-6">
            {profile.experience.map((e) => (
              <div key={e.org}>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="font-semibold text-zinc-100">{e.org}</span>
                  <span className="text-xs text-zinc-600">{e.location}</span>
                </div>
                <div className="space-y-3 border-l border-zinc-800 pl-4">
                  {e.roles.map((r) => (
                    <div key={r.title} className="pb-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-zinc-200">{r.title}</span>
                        <span className="shrink-0 text-xs text-zinc-600">{r.period}</span>
                      </div>
                      {"type" in r && <div className="text-xs text-zinc-600">{r.type}</div>}
                      <p className="mt-1 text-xs text-zinc-500">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-6">
            {profile.projects.map((cat) => (
              <div key={cat.category}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigo-400">{cat.category}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-4">
            {profile.education.map((e) => (
              <div key={e.institution} className="border-b border-zinc-900 pb-4">
                <div className="font-medium text-zinc-200">{e.institution}</div>
                <div className="mt-0.5 text-sm text-zinc-400">{e.degree}</div>
                <div className="mt-1 flex gap-3 text-xs text-zinc-600">
                  <span>{e.years}</span>
                  {"grade" in e && <span>{e.grade}</span>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <div className="space-y-2">
            {profile.certifications.map((c) => (
              <div key={c.name} className="flex items-start justify-between gap-4 border-b border-zinc-900 pb-2">
                <div>
                  <div className="text-sm text-zinc-200">{c.name}</div>
                  <div className="text-xs text-zinc-500">{c.issuer}</div>
                </div>
                <span className="shrink-0 text-xs text-zinc-600">{c.issued}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Interests">
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </Section>

        <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center">
          <p className="text-sm text-zinc-400">Want the full picture, conversationally?</p>
          <Link
            href="/"
            className="mt-3 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Chat with Abdisalan AI
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">{title}</h3>
      {children}
    </section>
  );
}
