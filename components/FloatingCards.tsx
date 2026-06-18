"use client";

import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { focusCard, recentProjectCard } from "@/data/profile";

export default function FloatingCards() {
  return (
    <motion.aside
      className="relative z-30 grid content-start gap-4 sm:grid-cols-2 lg:pt-1"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
    >
      <motion.article
        className="glass-panel min-h-[238px] rounded-[1.75rem] p-7"
        whileHover={{ y: -8, rotate: -1.4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-ink/55">
          <Leaf size={15} className="text-sage" />
          {focusCard.label}
        </p>
        <h2 className="font-display text-3xl leading-tight">
          {focusCard.title}
        </h2>
        <div className="mt-7 space-y-4 text-sm text-ink/60">
          {focusCard.items.map(({ icon: Icon, label }) => (
            <p className="flex items-center gap-3" key={label}>
              <Icon size={15} className="text-sage" />
              {label}
            </p>
          ))}
        </div>
      </motion.article>

      <motion.article
        className="glass-panel min-h-[238px] rounded-[1.75rem] p-7"
        whileHover={{ y: -8, rotate: 1.4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-ink/55">
          <span className="h-3 w-3 rounded-full bg-sage/80 shadow-[0_0_18px_rgba(159,189,49,0.66)]" />
          {recentProjectCard.label}
        </p>
        <h2 className="font-display text-3xl leading-tight">{recentProjectCard.title}</h2>
        <p className="mt-4 max-w-[250px] text-sm leading-6 text-ink/60">
          {recentProjectCard.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {recentProjectCard.tags.map((tag) => (
            <span
              className="rounded-full bg-ink/[0.045] px-3 py-1.5 text-xs text-ink/60"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </motion.aside>
  );
}
