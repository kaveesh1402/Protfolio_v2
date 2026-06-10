"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseIcon, SparklesIcon, GraduationCapIcon } from "lucide-react";

/* ─────────────────────────────────────────────
   Stats — impact numbers for recruiter scanning
───────────────────────────────────────────── */
const stats = [
  { value: "2.5+", label: "Years Experience" },
  { value: "5+",   label: "Production Projects" },
  { value: "100k+", label: "Events / Min Processed" },
  { value: "40%",  label: "API Latency Improved" },
];

/* ─────────────────────────────────────────────
   Work Experience only — projects moved to
   Projects section; personal work to Projects
───────────────────────────────────────────── */
const experience = [
  {
    type: "work",
    role: "Software Engineer - I",
    company: "Cognizant Technology Solutions",
    period: "May 2025 – Present",
    location: "Hyderabad, India",
    description:
      "Developed and optimized distributed Spring Boot microservices at scale. Implemented Kafka producers/consumers for high-throughput event streaming, processing 100k+ events per minute. Built secure REST APIs improving inter-service communication by 40%. Worked on Kubernetes deployments and observability with Prometheus & Grafana.",
    tags: ["Spring Boot", "Kafka", "Kubernetes", "Java 17", "REST APIs"],
  },
  {
    type: "intern",
    role: "Software Developer Intern",
    company: "ACIC – Atal Community Innovation Center",
    period: "Oct 2023 – Dec 2023",
    location: "Remote",
    description:
      "Conducted in-depth research on rural challenges, identifying key pain points affecting 90% of target communities. Crafted innovative digital solutions, resulting in a 30% increase in access to essential services. Presented findings to government officials and community leaders, achieving a 90% positive feedback rate.",
    tags: ["Research", "Solution Design", "Stakeholder Management"],
  },
  {
    type: "leadership",
    role: "Placement Coordinator",
    company: "Indian School of Business (ISB)",
    period: "Sep 2023 – Nov 2023",
    location: "Hyderabad, India",
    description:
      "Oversaw digital placement operations, managing a database of 5,000+ student profiles. Executed process improvements reducing placement cycle time by 20% and increasing student satisfaction by 15%. Collaborated with 50+ recruiters, resulting in a 25% increase in placement offers year-over-year.",
    tags: ["Operations", "Database Management", "Recruiting"],
  },
];

/* ─────────────────────────────────────────────
   Education
───────────────────────────────────────────── */
const education = [
  {
    degree: "B.Tech – Computer Science & Engineering",
    institution: "Presidency University",
    period: "2021 – 2025",
    grade: "CGPA: 8.2",
  },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold stat-value">{value}</div>
      <div className="text-xs text-muted-foreground mt-1 font-medium tracking-wide uppercase">{label}</div>
    </motion.div>
  );
}

const typeIcons: Record<string, string> = {
  work: "💼",
  intern: "🔬",
  leadership: "🎓",
};

function ExperienceItem({
  item,
  index,
}: {
  item: (typeof experience)[0];
  index: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Timeline dot */}
      <div className="absolute -left-[41px] w-5 h-5 mt-1.5">
        <motion.div
          className="w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px]"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 + index * 0.12 }}
          style={{ boxShadow: "0 0 12px oklch(0.68 0.22 264 / 0.5)" }}
        />
      </div>

      <Card className="border-border/40 bg-card/50 hover:border-primary/20 hover:bg-card/80 transition-all duration-300 backdrop-blur-sm">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="text-xs font-mono text-primary tracking-wider mb-1">{item.period}</div>
              <h3 className="text-base font-bold tracking-tight text-foreground leading-tight">{item.role}</h3>
              <div className="text-sm font-medium text-muted-foreground">{item.company}</div>
            </div>
            <span className="text-xl shrink-0 mt-0.5">{typeIcons[item.type]}</span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-3">{item.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/8 text-primary border border-primary/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [bioRef, bioInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [eduRef, eduInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Section bg */}
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">

        {/* ── Section header ── */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">About Me</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Engineer at <span className="gradient-text">heart.</span>
          </h2>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 rounded-2xl glass border border-border/40"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
          ))}
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Bio */}
          <motion.div
            ref={bioRef}
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none">
              <p>
                I&apos;m a <strong className="text-foreground">Software Engineer</strong> at Cognizant with
                hands-on production experience building distributed, resilient systems at scale. My core
                expertise is in <strong className="text-foreground">event-driven architecture</strong> and
                microservice observability using Spring Boot and Apache Kafka.
              </p>
              <p>
                I&apos;m passionate about the intersection of{" "}
                <strong className="text-foreground">system design and emerging AI</strong> — writing code
                that&apos;s functional, maintainable, and built to last while actively exploring Generative AI
                applications in production systems.
              </p>
              <p>
                Outside of work, I enjoy contributing to open-source projects, diving into distributed
                systems papers, and building full-stack side projects that solve real-world problems.
              </p>
            </div>

            {/* Education */}
            <motion.div
              ref={eduRef}
              initial={{ opacity: 0, y: 16 }}
              animate={eduInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-base font-semibold tracking-tight mb-4 flex items-center gap-2 text-foreground">
                <GraduationCapIcon className="h-4 w-4 text-primary" />
                Education
              </h3>
              {education.map((edu) => (
                <Card key={edu.degree} className="border-border/40 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="text-xs font-mono text-primary mb-1">{edu.period}</div>
                    <div className="font-semibold text-sm text-foreground leading-snug">{edu.degree}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{edu.institution}</div>
                    <div className="text-xs text-primary/80 font-medium mt-1">{edu.grade}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Experience timeline */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold tracking-tight mb-8 flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                Work Experience
              </h3>

              <div className="relative ml-3 pl-8">
                {/* Animated timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/30"
                    style={{ height: lineHeight }}
                  />
                </div>

                <div className="space-y-6">
                  {experience.map((item, index) => (
                    <ExperienceItem key={index} item={item} index={index} />
                  ))}

                  {/* Future node */}
                  <div className="relative">
                    <div className="absolute -left-[41px] w-5 h-5 mt-1.5 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                    </div>
                    <div className="text-base font-semibold text-muted-foreground/50 flex items-center gap-2">
                      <SparklesIcon className="h-4 w-4" />
                      Open to Next Opportunity
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
