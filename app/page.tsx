import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <Hero />

      <section id="about" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.54fr_1fr]">
          <SectionTitle eyebrow="About" title="Systems thinking with a natural rhythm." />
          <p className="text-lg leading-8 text-ink/66">{profile.about}</p>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Featured Projects" title="Practical projects with visible structure." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.54fr_1fr]">
          <SectionTitle eyebrow="Vision" title="Build strong foundations." />
          <p className="whitespace-pre-line text-lg leading-8 text-ink/66">{profile.vision}</p>
        </div>
      </section>

      <section id="life" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.54fr_1fr]">
          <SectionTitle eyebrow="Life" title="Quiet signals beyond code." />
          <p className="text-lg leading-8 text-ink/66">{profile.life}</p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.54fr_1fr]">
          <SectionTitle eyebrow="Contact" title="Build together." />
          <p className="text-lg leading-8 text-ink/66">{profile.contact}</p>
        </div>
      </section>
    </main>
  );
}
