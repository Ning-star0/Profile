"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { dockItems } from "@/data/profile";

const MotionLink = motion.create(Link);

export default function BottomDock() {
  return (
    <motion.nav
      className="relative z-40 mx-auto mt-[29vh] grid max-w-[1380px] grid-cols-1 gap-3 rounded-[2rem] border border-white/58 bg-white/48 p-3 shadow-[0_22px_80px_rgba(78,80,65,0.1)] backdrop-blur-xl sm:grid-cols-2 lg:mt-[33vh] lg:grid-cols-5 lg:gap-0"
      aria-label="Portfolio sections"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {dockItems.map(({ href, icon: Icon, title, body }) => (
        <MotionLink
          href={href}
          className="group flex min-h-28 gap-5 rounded-2xl border border-sage/10 bg-white/45 p-5 transition hover:bg-white/84 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:bg-transparent"
          key={title}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Icon
            className="mt-1 shrink-0 text-sage transition group-hover:text-leaf"
            size={24}
            strokeWidth={1.65}
          />
          <span>
            <span className="block font-display text-2xl leading-none">{title}</span>
            <span className="mt-3 block max-w-[190px] text-sm leading-6 text-ink/56">
              {body}
            </span>
          </span>
        </MotionLink>
      ))}
    </motion.nav>
  );
}
