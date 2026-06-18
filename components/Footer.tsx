import Link from "next/link";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-sage/10 px-5 py-10 text-sm text-ink/52 sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-display text-2xl text-ink" aria-label="Ning home">
          {profile.name}
        </Link>
        <nav className="flex flex-wrap gap-5" aria-label="Footer navigation">
          {navItems.map((item) => (
            <Link className="transition hover:text-ink" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="transition hover:text-ink" href="/life">
            Life
          </Link>
        </nav>
        <p>Growing systems, quietly.</p>
      </div>
    </footer>
  );
}
