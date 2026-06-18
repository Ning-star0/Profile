"use client";

import { ArrowRight, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import BottomDock from "@/components/BottomDock";
import FloatingCards from "@/components/FloatingCards";
import InteractiveBranch from "@/components/InteractiveBranch";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-grain relative isolate min-h-screen overflow-hidden px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:px-14 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[#ece8de] via-white/76 to-transparent" />

      <div className="relative z-30 mx-auto grid max-w-[1500px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(390px,0.78fr)]">
        <motion.div
          className="max-w-[720px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <h1 className="font-display text-[6.9rem] font-semibold leading-[0.82] tracking-normal text-ink sm:text-[9rem] lg:text-[11.2rem]">
            {profile.hero.title}
          </h1>
          <p className="mt-5 font-display text-2xl text-sage sm:text-3xl">
            {profile.hero.subtitle}
          </p>
          <div className="fine-rule mt-8 h-px w-14" />
          <p className="mt-7 max-w-[440px] whitespace-pre-line text-lg leading-8 text-ink/82">
            {profile.hero.body}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              className="shine-button group relative inline-flex h-14 items-center justify-center gap-4 overflow-hidden rounded-full bg-gradient-to-r from-[#5d6f41] via-[#71894b] to-[#4f5f36] px-8 text-base text-white shadow-soft transition hover:-translate-y-0.5 sm:min-w-56"
              href={profile.hero.primaryCta.href}
              aria-label="View projects"
            >
              <span className="relative z-10">{profile.hero.primaryCta.label}</span>
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full border border-white/42 transition group-hover:translate-x-1">
                <ArrowRight size={17} />
              </span>
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center gap-4 rounded-full border border-sage/32 bg-white/58 px-8 text-base text-ink shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sage/60 hover:bg-white/84 sm:min-w-56"
              href={profile.hero.secondaryCta.href}
              aria-label="Read about Ning"
            >
              {profile.hero.secondaryCta.label}
              <UserRound size={18} strokeWidth={1.8} />
            </Link>
          </div>
        </motion.div>

        <FloatingCards />
      </div>

      <InteractiveBranch />
      <BottomDock />
    </section>
  );
}
