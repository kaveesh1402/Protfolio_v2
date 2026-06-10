"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ZapIcon, TrendingUpIcon, CodeIcon, LayersIcon, AwardIcon } from "lucide-react";

/* ─────────────────────────────────────────────
   Count-up hook
───────────────────────────────────────────── */
function useCountUp(end: number, duration = 1800, start = 0) {
  const [count, setCount] = useState(start);
  const frameRef = useRef<number>(0);

  const startAnimation = () => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return { count, startAnimation };
}

/* ─────────────────────────────────────────────
   Metrics data
───────────────────────────────────────────── */
const metrics = [
  {
    icon: ZapIcon,
    value: 100,
    suffix: "k+",
    label: "Events / Minute",
    sublabel: "Apache Kafka throughput in production",
    color: "oklch(0.68 0.22 264)",
    colorBg: "oklch(0.68 0.22 264 / 0.1)",
  },
  {
    icon: TrendingUpIcon,
    value: 40,
    suffix: "%",
    label: "API Latency Reduced",
    sublabel: "Inter-service REST communication improvement",
    color: "oklch(0.68 0.18 170)",
    colorBg: "oklch(0.68 0.18 170 / 0.1)",
  },
  {
    icon: LayersIcon,
    value: 5,
    suffix: "+",
    label: "Production Projects",
    sublabel: "Shipped across backend, full-stack, and AI",
    color: "oklch(0.7 0.2 290)",
    colorBg: "oklch(0.7 0.2 290 / 0.1)",
  },
  {
    icon: CodeIcon,
    value: 2,
    suffix: ".5+",
    label: "Years Experience",
    sublabel: "In enterprise-grade software engineering",
    color: "oklch(0.72 0.18 60)",
    colorBg: "oklch(0.72 0.18 60 / 0.1)",
  },
];

/* ─────────────────────────────────────────────
   Highlights / Certifications
───────────────────────────────────────────── */
const highlights = [
  {
    icon: "🏆",
    title: "Cognizant GenC Elite",
    subtitle: "Top performer designation — Cognizant Technology Solutions, 2025",
  },
  {
    icon: "☁️",
    title: "Cloud & Microservices",
    subtitle: "Spring Boot, Kafka, Kubernetes in production at scale",
  },
  {
    icon: "🤖",
    title: "Generative AI",
    subtitle: "Built RAG systems, LangChain pipelines, and OpenAI-powered applications",
  },
  {
    icon: "🔬",
    title: "Research & Innovation",
    subtitle: "ACIC — identified rural pain points impacting 90% of target communities",
  },
];

/* ─────────────────────────────────────────────
   Animated metric card
───────────────────────────────────────────── */
function MetricCard({
  metric,
  index,
}: {
  metric: (typeof metrics)[0];
  index: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const { count, startAnimation } = useCountUp(metric.value, 1600);
  const [started, setStarted] = useState(false);
  const Icon = metric.icon;

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      startAnimation();
    }
  }, [inView, started, startAnimation]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative p-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ background: metric.colorBg }}
      />

      <div className="relative">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: metric.colorBg }}
        >
          <Icon className="h-5 w-5" style={{ color: metric.color }} />
        </div>

        <div className="flex items-end gap-0.5 mb-1">
          <span className="text-4xl font-bold" style={{ color: metric.color }}>
            {count}
          </span>
          <span className="text-2xl font-bold pb-1" style={{ color: metric.color }}>
            {metric.suffix}
          </span>
        </div>

        <div className="font-semibold text-foreground text-sm mb-1">{metric.label}</div>
        <div className="text-xs text-muted-foreground leading-relaxed">{metric.sublabel}</div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export function Achievements() {
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [highlightsRef, highlightsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">Impact</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            By the <span className="gradient-text">numbers.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Measurable impact across production systems, research, and leadership.
          </p>
        </motion.div>

        {/* Metric cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Section divider */}
        <div className="section-divider mb-16" />

        {/* Highlights */}
        <motion.div
          ref={highlightsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <AwardIcon className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold tracking-tight">Highlights & Recognitions</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                animate={highlightsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/20 transition-colors"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="font-semibold text-foreground text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
