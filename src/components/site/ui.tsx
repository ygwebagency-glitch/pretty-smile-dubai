import { cva, type VariantProps } from "class-variance-authority";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronsLeftRight, Plus } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const luxButton = cva(
  "group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ivory hover:bg-ink-2 hover:shadow-[var(--shadow-gold)]",
        gold: "bg-gold text-ink hover:bg-gold-soft hover:shadow-[var(--shadow-gold)]",
        outline: "border border-ink/80 text-ink hover:bg-ink hover:text-ivory",
        outlineGold: "border border-gold text-ivory hover:bg-gold hover:text-ink",
        glass: "glass text-ink",
      },
      size: { md: "", sm: "h-11 px-5 text-sm" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
export type LuxButtonProps = VariantProps<typeof luxButton>;

export function Arrow() {
  return <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />;
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cn("mb-5 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em]", dark ? "text-gold-soft" : "text-muted-foreground")}>
      <span className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ArchFrame({ src, alt, className, position = "50% 30%", eager }: { src: string; alt: string; className?: string; position?: string; eager?: boolean }) {
  return (
    <motion.div
      className={cn("arch relative bg-sand shadow-card", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover"
        style={{ objectPosition: position }}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </motion.div>
  );
}

export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setVal(to);
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{val.toLocaleString("en-US")}</span>;
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className="animate-marquee flex w-max gap-12 py-5">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap text-sm font-medium tracking-wide text-ink">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const [hold, setHold] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      className="relative h-full w-full touch-none select-none overflow-hidden"
      onPointerDown={(e) => { setHold(true); (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
      onPointerMove={(e) => hold && move(e.clientX)}
      onPointerUp={() => setHold(false)}
    >
      <img src={after} alt="After treatment, real patient photo" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <img src={before} alt="Before treatment, real patient photo" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} loading="lazy" />
      <span className="glass absolute bottom-6 left-6 rounded-full px-3 py-1 text-xs font-medium text-ink">Before</span>
      <span className="glass absolute bottom-6 right-6 rounded-full px-3 py-1 text-xs font-medium text-ink">After</span>
      <div className="absolute inset-y-0 w-px bg-paper" style={{ left: `${pos}%` }} />
      <button
        type="button"
        role="slider"
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
        className={cn("absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-gold text-ink shadow-card transition-transform", hold && "scale-110")}
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </div>
  );
}

export function Accordion({ items, dark }: { items: { q: string; a: string }[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3 className="text-lg lg:text-xl">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn("flex w-full items-center justify-between gap-6 py-6 text-left font-display", dark ? "text-ivory" : "text-ink")}
              >
                {it.q}
                <Plus className={cn("h-5 w-5 shrink-0 text-gold transition-transform duration-500", isOpen && "rotate-45")} strokeWidth={1.5} />
              </button>
            </h3>
            <motion.div
              id={`faq-${i}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-6 text-muted-foreground">{it.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text, dark, center }: { eyebrow: string; title: ReactNode; text?: string; dark?: boolean; center?: boolean }) {
  return (
    <Reveal className={cn("mb-14 max-w-2xl", center && "mx-auto text-center [&>p:first-child]:justify-center")}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={cn("h2-lux", dark && "text-ivory")}>{title}</h2>
      {text && <p className={cn("mt-5", dark ? "text-ivory/75" : "text-muted-foreground")}>{text}</p>}
    </Reveal>
  );
}

export function Accent({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <em className={cn("font-light", dark ? "text-gold-soft" : "text-aqua")}>{children}</em>;
}
