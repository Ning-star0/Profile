"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GrowthKind = "leaf" | "moss" | "sprout";

type Growth = {
  id: number;
  distance: number;
  x: number;
  y: number;
  angle: number;
  size: number;
  scale: number;
  kind: GrowthKind;
  life: number;
};

type Glow = {
  x: number;
  y: number;
  active: boolean;
};

type InteractiveBranchProps = {
  branchImageSrc?: string;
};

const MAX_GROWTH = 120;

function curveY(x: number, width: number, height: number) {
  const t = Math.min(1, Math.max(0, x / Math.max(width, 1)));
  const slope = height * (0.78 - 0.48 * t);
  const wave = Math.sin(t * Math.PI * 2.2 - 0.58) * height * 0.105;
  return slope + wave;
}

function isNearBranch(x: number, y: number, width: number, height: number) {
  const mainY = curveY(x, width, height);
  const mainRadius = Math.max(68, Math.min(142, width * 0.088));
  const lowerY = height * 0.73 + Math.sin((x / width) * Math.PI * 2.35) * 34;
  const lowerRadius = mainRadius * 0.62;

  return Math.abs(y - mainY) < mainRadius || (x < width * 0.44 && Math.abs(y - lowerY) < lowerRadius);
}

function branchDistance(x: number, y: number, width: number, height: number) {
  const mainDistance = Math.abs(y - curveY(x, width, height));
  const lowerY = height * 0.73 + Math.sin((x / width) * Math.PI * 2.35) * 34;
  const lowerDistance = x < width * 0.44 ? Math.abs(y - lowerY) : Number.POSITIVE_INFINITY;

  return Math.min(mainDistance, lowerDistance);
}

function randomKind(isSlowPointer: boolean): GrowthKind {
  const roll = Math.random();
  const sproutThreshold = isSlowPointer ? 0.86 : 0.9;
  const leafThreshold = isSlowPointer ? 0.5 : 0.6;

  if (roll > sproutThreshold) return "sprout";
  if (roll > leafThreshold) return "leaf";
  return "moss";
}

function sizeForKind(kind: GrowthKind) {
  if (kind === "moss") return 2 + Math.random() * 4;
  if (kind === "sprout") return 14 + Math.random() * 14;
  return 10 + Math.random() * 14;
}

export default function InteractiveBranch({ branchImageSrc }: InteractiveBranchProps) {
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);
  const frame = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const lastPointer = useRef({ x: 0, y: 0, time: 0 });
  const timeoutRefs = useRef<number[]>([]);
  const [imageAvailable, setImageAvailable] = useState(Boolean(branchImageSrc));
  const [growth, setGrowth] = useState<Growth[]>([]);
  const [glow, setGlow] = useState<Glow>({ x: 0, y: 0, active: false });

  useEffect(() => {
    return () => {
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
      }

      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, []);

  const spawnGrowth = useCallback(() => {
    frame.current = null;
    const node = sceneRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const { x, y } = pointer.current;
    const active = isNearBranch(x, y, rect.width, rect.height);
    pointer.current.active = active;
    setGlow({ x, y, active });

    if (!active || reduceMotion) return;

    const now = performance.now();
    const isMobile = rect.width < 768;
    const spawnInterval = isMobile ? 128 : 54;
    if (now - lastSpawn.current < spawnInterval) return;

    lastSpawn.current = now;
    const previous = lastPointer.current;
    const elapsed = Math.max(16, now - previous.time);
    const movement = Math.hypot(x - previous.x, y - previous.y);
    const isSlowPointer = movement / elapsed < 0.36;
    lastPointer.current = { x, y, time: now };

    const spawnCount = isMobile ? 1 : 1 + Math.floor(Math.random() * 3);
    const newItems: Growth[] = Array.from({ length: spawnCount }, () => {
      const kind = randomKind(isSlowPointer);
      const scatterRadius = 40 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const itemX = x + Math.cos(theta) * scatterRadius * Math.random();
      const itemY = y + Math.sin(theta) * scatterRadius * Math.random();
      const distance = branchDistance(itemX, itemY, rect.width, rect.height);
      const life = kind === "moss" ? 4 + Math.random() * 3 : 5 + Math.random() * 3;

      return {
        id: nextId.current++,
        distance,
        x: itemX,
        y: itemY,
        angle: -48 + Math.random() * 96,
        size: sizeForKind(kind),
        scale: kind === "moss" ? 0.85 + Math.random() * 0.3 : 0.86 + Math.random() * 0.22,
        kind,
        life,
      };
    }).filter((item) => isNearBranch(item.x, item.y, rect.width, rect.height));

    if (newItems.length === 0) return;

    const maxItems = isMobile ? 56 : MAX_GROWTH;
    setGrowth((items) => [...items, ...newItems].slice(-maxItems));

    newItems.forEach((item) => {
      const timeoutId = window.setTimeout(() => {
        setGrowth((items) => items.filter((growthItem) => growthItem.id !== item.id));
      }, item.life * 1000);
      timeoutRefs.current.push(timeoutId);
    });
  }, [reduceMotion]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = sceneRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      pointer.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: pointer.current.active,
      };

      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(spawnGrowth);
      }
    },
    [spawnGrowth],
  );

  return (
    <div
      ref={sceneRef}
      className="tree-wrap pointer-events-auto absolute inset-x-[-11vw] bottom-[7.2rem] z-10 h-[46vh] min-h-[390px] select-none overflow-visible md:bottom-[5rem] md:h-[52vh] lg:bottom-[4.3rem]"
      onPointerLeave={() => setGlow((current) => ({ ...current, active: false }))}
      onPointerMove={handlePointerMove}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          left: glow.x,
          top: glow.y,
          opacity: glow.active && !reduceMotion ? 1 : 0,
          scale: glow.active ? 1 : 0.72,
        }}
        transition={{ type: "spring", stiffness: 130, damping: 24 }}
        style={{
          background:
            "radial-gradient(circle, rgba(218, 242, 105, 0.42) 0%, rgba(150, 190, 56, 0.24) 34%, rgba(150, 190, 56, 0) 72%)",
          boxShadow: "0 0 82px rgba(156, 193, 64, 0.3)",
        }}
      />

      {branchImageSrc && imageAvailable ? (
        <Image
          alt=""
          aria-hidden="true"
          className="pointer-events-none object-cover object-center"
          fill
          onError={() => setImageAvailable(false)}
          priority
          sizes="100vw"
          src={branchImageSrc}
        />
      ) : (
        <BranchFallback />
      )}

      <MossLayer />

      <div className="pointer-events-none absolute inset-0 z-20">
        {growth.map((item) => (
          <motion.span
            aria-hidden
            className={`growth-item growth-${item.kind}`}
            initial={{ opacity: 0, scale: 0.04, rotate: item.angle - 20 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.04, item.scale, item.scale, item.scale * 0.9], rotate: item.angle }}
            transition={{
              duration: item.life,
              times: [0, 0.16, 0.76, 1],
              ease: "easeOut",
            }}
            key={item.id}
            style={{
              left: item.x - item.size / 2,
              opacity: item.kind === "moss" ? Math.max(0.36, 0.92 - item.distance / 180) : undefined,
              top: item.y - item.size / 2,
              width: item.size,
              height: item.size,
              fontSize: item.size,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-[8vw] bottom-[-2.5rem] z-30 h-36 bg-gradient-to-t from-paper via-paper/82 to-transparent blur-sm" />
    </div>
  );
}

function BranchFallback() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 1440 760"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="barkGradient" x1="0%" x2="100%" y1="68%" y2="24%">
          <stop offset="0%" stopColor="#c8c0ad" />
          <stop offset="22%" stopColor="#8f806c" />
          <stop offset="52%" stopColor="#d6d0c2" />
          <stop offset="78%" stopColor="#756b5d" />
          <stop offset="100%" stopColor="#eee9dc" />
        </linearGradient>
        <linearGradient id="mossGradient" x1="0%" x2="100%" y1="80%" y2="20%">
          <stop offset="0%" stopColor="#455d2c" />
          <stop offset="35%" stopColor="#7fa63a" />
          <stop offset="70%" stopColor="#b8d94b" />
          <stop offset="100%" stopColor="#536b31" />
        </linearGradient>
        <filter id="barkTexture" x="-15%" y="-20%" width="130%" height="150%">
          <feTurbulence baseFrequency="0.024 0.18" numOctaves="4" seed="9" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" scale="18" />
        </filter>
        <filter id="softShadow" x="-20%" y="-30%" width="150%" height="170%">
          <feDropShadow dx="0" dy="24" floodColor="#5b574b" floodOpacity="0.2" stdDeviation="24" />
        </filter>
        <path
          id="mainBranch"
          d="M -120 592 C 150 450 330 650 552 598 C 760 548 906 440 1074 350 C 1228 268 1340 240 1544 160"
        />
        <path
          id="lowerBranch"
          d="M -120 620 C 114 704 252 706 440 650 C 584 606 694 604 830 626 C 1026 658 1195 620 1540 548"
        />
      </defs>

      <g filter="url(#softShadow)">
        <use
          href="#lowerBranch"
          fill="none"
          stroke="#8d806f"
          strokeLinecap="round"
          strokeWidth="118"
          opacity="0.95"
          filter="url(#barkTexture)"
        />
        <use
          href="#mainBranch"
          fill="none"
          stroke="url(#barkGradient)"
          strokeLinecap="round"
          strokeWidth="178"
          filter="url(#barkTexture)"
        />
      </g>

      <use
        href="#mainBranch"
        fill="none"
        stroke="rgba(255,255,255,0.52)"
        strokeDasharray="72 38 18 54"
        strokeLinecap="round"
        strokeWidth="44"
        opacity="0.7"
      />
      <use
        href="#mainBranch"
        fill="none"
        stroke="#5d503f"
        strokeDasharray="8 18"
        strokeLinecap="round"
        strokeWidth="126"
        opacity="0.24"
      />
      <use
        href="#mainBranch"
        fill="none"
        stroke="#31291f"
        strokeDasharray="2 22"
        strokeLinecap="round"
        strokeWidth="150"
        opacity="0.18"
      />
      <use
        href="#lowerBranch"
        fill="none"
        stroke="#f7f1e2"
        strokeDasharray="80 54"
        strokeLinecap="round"
        strokeWidth="26"
        opacity="0.54"
      />
      <use
        href="#mainBranch"
        fill="none"
        stroke="url(#mossGradient)"
        strokeDasharray="230 62 110 46"
        strokeLinecap="round"
        strokeWidth="42"
        opacity="0.82"
      />
      <use
        href="#mainBranch"
        fill="none"
        stroke="#c8ee56"
        strokeDasharray="6 24"
        strokeLinecap="round"
        strokeWidth="92"
        opacity="0.36"
      />
    </svg>
  );
}

function MossLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {Array.from({ length: 64 }).map((_, index) => {
        const left = 9 + ((index * 7.7) % 84);
        const top = 26 + Math.sin(index * 1.41) * 16 + (index % 7) * 4.6;
        const size = 5 + (index % 5) * 3.2;
        return (
          <span
            aria-hidden="true"
            className="absolute rounded-full bg-leaf/60 blur-[0.2px]"
            key={index}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size * 0.58,
              opacity: 0.16 + (index % 5) * 0.08,
              transform: `rotate(${index * 29}deg)`,
              boxShadow: index % 4 === 0 ? "0 0 18px rgba(159, 189, 49, 0.42)" : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
