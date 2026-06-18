import MotionWrapper from "@/components/MotionWrapper";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
};

export default function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <MotionWrapper>
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-sage">{eyebrow}</p>
      <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
        {title}
      </h2>
    </MotionWrapper>
  );
}
