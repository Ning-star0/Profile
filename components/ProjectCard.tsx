import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="glass-panel group block rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(70,77,55,0.16)]"
      href={project.href}
      id={project.slug}
    >
      <h3 className="font-display text-3xl leading-tight text-ink">{project.title}</h3>
      <p className="mt-5 text-sm leading-6 text-ink/60">{project.description}</p>
      <div className="mt-7 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span className="rounded-full bg-ink/[0.045] px-3 py-1.5 text-xs text-ink/60" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
