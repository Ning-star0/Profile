import SectionTitle from "@/components/SectionTitle";
import { profile } from "@/data/profile";

export default function LifePage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-36 sm:px-8 lg:px-14">
      <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.52fr_1fr]">
        <SectionTitle eyebrow="Life" title="A quieter archive of ideas and moments." />
        <div className="glass-panel rounded-[2rem] p-8 text-lg leading-8 text-ink/68">
          <p>{profile.life}</p>
        </div>
      </section>
    </main>
  );
}
