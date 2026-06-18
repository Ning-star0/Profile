# Ning Personal Portfolio Design Document

## 1. Product Positioning

**Site name:** Ning Personal Portfolio  
**Theme:** Ning · Growing Systems

This is a long-term maintainable personal homepage, not a one-screen demo. The site should feel like a living digital portfolio: bright, natural, quiet, technical, and artistic.

The central visual metaphor is a large branch crossing the page. The branch represents the underlying structure of computer systems. Moss, leaves, and sprouts represent projects, ideas, and capabilities growing over time. Pointer interaction makes the homepage feel participatory: the viewer helps the digital space grow.

Core sentence:

**A bright portfolio where ideas grow into systems.**

Rules:
- Use `Ning` everywhere.
- Do not display the name `白星`.
- Do not display Learning Map.
- Do not display a learning roadmap.
- Use static local data first. No backend or real API calls.

## 2. Visual Direction

**Background:**
- Cloud white
- Mist white
- Soft gray white

**Primary colors:**
- Moss green
- Olive green
- Deep gray black

**Supporting colors:**
- Pale blue
- Pale green
- Warm ivory

**Accent color:**
- Natural green

**Style:**
- Bright and clean
- Large negative space
- Glass cards
- Soft shadows
- Rounded corners
- Gentle blur
- Natural texture
- No dark mode
- No starry sky

## 3. Typography

**Display title:**
- Cormorant Garamond
- Playfair Display
- Georgia fallback

Use a refined serif display font for the large `Ning` hero title and section headings.

**Body:**
- Inter
- system-ui fallback

Use a clean sans-serif for readable portfolio content.

**Small labels:**
- Inter
- JetBrains Mono optional

Use uppercase small labels for card metadata and section eyebrows.

## 4. Information Architecture

### Global Navigation

Left:
- Small star-shaped icon
- Ning
- CS Student

Center:
- About
- Projects
- Vision
- Contact

Right:
- Circular menu button with three horizontal lines

The navigation should be fixed at the top, translucent, and lightweight.

### Home Hero

Left content:
- Large title: `Ning`
- Subtitle: `Computer Science Student · AI Infra Learner`
- Body: `Building the future, one line of code, one system at a time.`
- Primary CTA: `View Projects`
- Secondary CTA: `About Me`

Right content:
- Glass card: `CURRENT FOCUS`
- Glass card: `RECENT PROJECT`

Main visual:
- A large branch moving from lower-left to upper-right
- Moss, leaves, and sprouts on the branch
- Dynamic growth around the pointer

Bottom dock:
- About Me
- Projects
- Vision
- Life
- Contact

## 5. Pages

Required routes:
- `/`
- `/about`
- `/projects`
- `/vision`
- `/life`
- `/contact`

Home page sections:
- Hero
- Interactive Branch
- Floating Info Cards
- Bottom Dock
- About preview
- Featured Projects preview
- Vision preview
- Life preview
- Contact preview

Standalone pages should reuse the same data and visual language, with clear section titles and static content.

## 6. Content Model

Content must live in `data/` instead of being hardcoded in visual components.

Files:
- `data/profile.ts`: profile, hero copy, focus card, recent project, page copy, dock content
- `data/projects.ts`: project list
- `data/nav.ts`: global navigation items

This keeps future edits low-risk and avoids scattering portfolio content across components.

## 7. Component Architecture

Required components:
- `TopNav.tsx`: fixed global navigation
- `Hero.tsx`: home hero composition
- `InteractiveBranch.tsx`: branch image/fallback and growth interaction
- `FloatingCards.tsx`: right-side glass cards
- `BottomDock.tsx`: bottom feature navigation
- `ProjectCard.tsx`: reusable project card
- `SectionTitle.tsx`: reusable section heading
- `Footer.tsx`: global footer
- `MotionWrapper.tsx`: reusable lightweight scroll/entry animation wrapper

Components should stay presentation-focused and consume data from `data/`.

## 8. Branch Growth Interaction

`InteractiveBranch` is the signature interaction.

Requirements:
- The branch crosses the hero from lower-left to upper-right.
- Use `/public/branch.png` if available.
- If no branch image exists, render a CSS/SVG branch fallback.
- The branch layer and growth layer must be separate.
- Growth elements use `pointer-events: none`.
- Only generate growth when the pointer is near the branch.
- Show a soft green glow near the pointer when it is close to the branch.
- Generate three kinds of elements:
  - `moss`: small green particles
  - `leaf`: small leaf shapes
  - `sprout`: two-leaf sprouts
- Recommended probabilities:
  - `moss`: 60%
  - `leaf`: 30%
  - `sprout`: 10%
- Generate 1-3 elements per spawn cycle.
- Scatter elements within 40px-90px near the pointer.
- Slower pointer movement can slightly increase `leaf` and `sprout` probability.
- Growth elements animate from small to large with fade-in and slight rotation.
- Elements live for 4-8 seconds, then fade out naturally.
- The longer the pointer stays in one area, the denser that area becomes.
- Maximum live elements: 120.
- Use `requestAnimationFrame` throttling.
- Reduce spawn rate and quantity on mobile.
- Respect `prefers-reduced-motion`.

## 9. Responsive Behavior

Desktop:
- Preserve reference-like layout.
- Hero title on the left.
- Floating cards on the right.
- Branch crosses the lower half of the viewport.
- Bottom dock appears over the lower visual area.

Tablet:
- Floating cards stack or compress.
- Branch scales down.
- Dock remains readable.

Mobile:
- `Ning` title appears first.
- Branch becomes a background visual accent.
- Floating cards become vertical.
- Bottom dock becomes two-column or compact.
- Animations and generated growth count are reduced.

## 10. Accessibility

Requirements:
- Interactive buttons and menu button have `aria-label`.
- Decorative elements use `aria-hidden`.
- Growth particles do not capture pointer events.
- Text contrast remains readable on bright backgrounds.
- `prefers-reduced-motion` reduces animation intensity.
- Navigation links use semantic anchors.

## 11. Deployment Requirements

The project should remain deployable as a normal Next.js app:
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`

No backend is required. All content is static and local.

SEO requirements:
- Page title: `Ning — Personal Portfolio`
- Description: `A bright interactive portfolio about computer science, AI infrastructure, projects, and ideas.`
- Open Graph metadata should be configured.
- Favicon should exist.
- Avoid console errors and unnecessary large dependencies.

## 12. Acceptance Criteria

- First screen visually follows the reference: bright background, large branch, moss, leaves, glass cards.
- Every visible name uses `Ning`.
- No `白星`.
- No Learning Map.
- No learning roadmap.
- Homepage feels like a real portfolio, not a static screenshot.
- `/about`, `/projects`, `/vision`, `/life`, and `/contact` exist.
- Project, profile, and navigation data live in `data/`.
- Branch interaction generates moss, leaves, sprouts, and glow only near the branch.
- Maximum growth elements are capped for performance.
- Desktop, tablet, and mobile layouts work.
- `npm run build` passes.
