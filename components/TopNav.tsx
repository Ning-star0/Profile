"use client";

import { Menu, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

export default function TopNav() {
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-5 py-5 sm:px-8 lg:px-14"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-full border border-white/40 bg-white/42 px-3 py-2 shadow-[0_18px_70px_rgba(72,74,61,0.08)] backdrop-blur-xl sm:px-4">
        <Link href="/" className="flex items-center gap-3 sm:gap-4" aria-label="Ning home">
          <span className="grid h-8 w-8 place-items-center text-ink">
            <Sparkle size={20} fill="currentColor" strokeWidth={1.6} />
          </span>
          <span className="font-display text-2xl font-semibold tracking-normal sm:text-3xl">
            {profile.name}
          </span>
          <span className="hidden h-7 w-px bg-ink/12 sm:block" />
          <span className="hidden text-sm text-ink/55 sm:inline">{profile.role}</span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm text-ink/56 md:flex lg:gap-14">
          {navItems.map((item) => (
            <Link
              className="group relative py-2 transition hover:text-ink"
              href={item.href}
              key={item.href}
            >
              {item.label}
              {(pathname === item.href || (pathname === "/" && item.label === "About")) ? (
                <span className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink" />
              ) : null}
            </Link>
          ))}
        </nav>

        <button
          className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 bg-white/74 text-ink shadow-ring backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
          aria-label="Open navigation menu"
          type="button"
        >
          <Menu size={22} strokeWidth={1.8} />
        </button>
      </div>
    </motion.header>
  );
}
