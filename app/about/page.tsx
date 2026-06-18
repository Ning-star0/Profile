import SectionTitle from "@/components/SectionTitle";
import { profile } from "@/data/profile";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-36 sm:px-8 lg:px-14">
      <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.52fr_1fr]">
        <SectionTitle eyebrow="About" title="Ning builds from systems, software, and quiet curiosity." />
        <div className="glass-panel rounded-[2rem] p-8 text-lg leading-8 text-ink/68">
          <p>{profile.about}</p>
        </div>
      </section>
    </main>
  );
}
