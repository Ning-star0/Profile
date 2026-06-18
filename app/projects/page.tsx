import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-36 sm:px-8 lg:px-14">
      <section className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Projects" title="Built as real surfaces, not isolated screenshots." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </section>
    </main>
  );
}
