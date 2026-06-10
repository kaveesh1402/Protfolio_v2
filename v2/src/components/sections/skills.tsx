"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ServerIcon,
  LayersIcon,
  DatabaseIcon,
  CloudIcon,
  GitBranchIcon,
  BrainCircuitIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Skill data — 6 categories
───────────────────────────────────────────── */
const skillCategories = [
  {
    icon: ServerIcon,
    title: "Backend",
    color: "oklch(0.68 0.22 264)",
    colorBg: "oklch(0.68 0.22 264 / 0.08)",
    colorBorder: "oklch(0.68 0.22 264 / 0.2)",
    skills: [
      { name: "Java 11 / 17", level: 5 },
      { name: "Spring Boot", level: 5 },
      { name: "Spring Security", level: 4 },
      { name: "REST APIs", level: 5 },
      { name: "Microservices", level: 4 },
      { name: "JPA / Hibernate", level: 4 },
    ],
  },
  {
    icon: LayersIcon,
    title: "Frontend",
    color: "oklch(0.7 0.2 290)",
    colorBg: "oklch(0.7 0.2 290 / 0.08)",
    colorBorder: "oklch(0.7 0.2 290 / 0.2)",
    skills: [
      { name: "React / Next.js", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 3 },
      { name: "HTML / CSS", level: 5 },
      { name: "Flutter", level: 3 },
    ],
  },
  {
    icon: DatabaseIcon,
    title: "Databases",
    color: "oklch(0.68 0.18 170)",
    colorBg: "oklch(0.68 0.18 170 / 0.08)",
    colorBorder: "oklch(0.68 0.18 170 / 0.2)",
    skills: [
      { name: "MySQL", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "Redis", level: 4 },
      { name: "Supabase", level: 3 },
      { name: "Prisma ORM", level: 3 },
      { name: "Vector DBs", level: 3 },
    ],
  },
  {
    icon: CloudIcon,
    title: "Cloud & Infrastructure",
    color: "oklch(0.72 0.18 60)",
    colorBg: "oklch(0.72 0.18 60 / 0.08)",
    colorBorder: "oklch(0.72 0.18 60 / 0.2)",
    skills: [
      { name: "Docker", level: 4 },
      { name: "Kubernetes", level: 4 },
      { name: "AWS (EC2, S3)", level: 3 },
      { name: "Firebase", level: 3 },
      { name: "Vercel", level: 4 },
      { name: "Linux / Bash", level: 3 },
    ],
  },
  {
    icon: GitBranchIcon,
    title: "DevOps & Observability",
    color: "oklch(0.7 0.18 210)",
    colorBg: "oklch(0.7 0.18 210 / 0.08)",
    colorBorder: "oklch(0.7 0.18 210 / 0.2)",
    skills: [
      { name: "Apache Kafka", level: 5 },
      { name: "Prometheus", level: 4 },
      { name: "Grafana", level: 3 },
      { name: "GitHub Actions", level: 4 },
      { name: "CI / CD", level: 4 },
      { name: "Maven / Gradle", level: 4 },
    ],
  },
  {
    icon: BrainCircuitIcon,
    title: "AI & Machine Learning",
    color: "oklch(0.65 0.22 320)",
    colorBg: "oklch(0.65 0.22 320 / 0.08)",
    colorBorder: "oklch(0.65 0.22 320 / 0.2)",
    skills: [
      { name: "OpenAI API", level: 4 },
      { name: "LangChain", level: 3 },
      { name: "RAG Systems", level: 3 },
      { name: "TensorFlow", level: 3 },
      { name: "Scikit-learn", level: 3 },
      { name: "Prompt Engineering", level: 4 },
    ],
  },
];

/* ─────────────────────────────────────────────
   Proficiency dots (1–5 scale)
───────────────────────────────────────────── */
function ProficiencyDots({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: i < level ? color : "oklch(0.5 0 0 / 0.2)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Single skill card
───────────────────────────────────────────── */
function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="skill-card rounded-2xl p-6 bg-card/70 backdrop-blur-sm border"
      style={{ borderColor: category.colorBorder }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: category.colorBg }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: category.color }} />
        </div>
        <h3 className="font-semibold text-base tracking-tight" style={{ color: category.color }}>
          {category.title}
        </h3>
      </div>

      {/* Skill list */}
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between gap-2">
            <span className="text-sm text-foreground/80 font-medium">{skill.name}</span>
            <ProficiencyDots level={skill.level} color={category.color} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export function Skills() {
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">
            Technical Skills
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              My <span className="gradient-text">arsenal.</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Tools and technologies I use daily in production environments and personal projects.
            </p>
          </div>
        </motion.div>

        {/* Proficiency legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-8 text-xs text-muted-foreground"
        >
          <span>Proficiency:</span>
          <span className="flex items-center gap-1.5">
            {["Familiar", "Comfortable", "Proficient", "Advanced", "Expert"].map((label, i) => (
              <span key={label} className="flex items-center gap-1">
                <span className="inline-flex gap-0.5">
                  {Array.from({ length: i + 1 }).map((_, j) => (
                    <span key={j} className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
                  ))}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </span>
            ))}
          </span>
        </motion.div>

        {/* Grid — 2 cols on md, 3 cols on lg */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
