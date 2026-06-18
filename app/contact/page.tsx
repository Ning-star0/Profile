import SectionTitle from "@/components/SectionTitle";
import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-36 sm:px-8 lg:px-14">
      <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.52fr_1fr]">
        <SectionTitle eyebrow="Contact" title="Connect and build something practical." />
        <div className="glass-panel rounded-[2rem] p-8 text-lg leading-8 text-ink/68">
          <p>{profile.contact}</p>
          <a
            aria-label="Email Ning"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#5d6f41] via-[#71894b] to-[#4f5f36] px-6 py-3 text-base text-white shadow-soft transition hover:-translate-y-0.5"
            href="mailto:hello@example.com"
          >
            Email Ning
          </a>
        </div>
      </section>
    </main>
  );
}
