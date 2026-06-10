"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, X, ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

/* ─────────────────────────────────────────────
   Category filters
───────────────────────────────────────────── */
const CATEGORIES = ["All", "Full Stack", "Backend", "AI / ML", "Mobile"];

/* ─────────────────────────────────────────────
   Project data — includes moved projects from about.tsx
───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: "PillPrice — Pharmacy Aggregator",
    category: "Full Stack",
    shortDesc:
      "A modern web app helping users find the best prescription prices by comparing local pharmacy rates with real-time scraping and geolocation filtering.",
    description:
      "A modern web app helping users find the best prescription prices by comparing local pharmacy rates. Features high-end UI animations, real-time scraping logic, and geolocation-based branch filtering.",
    problem:
      "Patients struggle to compare medication prices across pharmacies, often overpaying due to lack of transparency in pharmaceutical pricing.",
    solution:
      "Built a real-time aggregation platform that scrapes, normalizes, and displays prices across local pharmacies with geolocation-based filtering, allowing users to instantly find the cheapest option near them.",
    achievements: [
      "Reduced average medication cost discovery time from ~30 mins to under 30 seconds",
      "Implemented geolocation-based filtering with sub-100ms response times",
      "Deployed on Vercel with SSR for SEO-optimized listing pages",
    ],
    tags: ["Next.js 15", "Tailwind CSS", "Prisma", "Supabase", "Framer Motion"],
    demoUrl: "https://pill-price.vercel.app/",
    githubUrl: "#",
    featured: true,
    gradient: "from-blue-500/20 to-indigo-500/20",
    accentColor: "oklch(0.68 0.22 264)",
  },
  {
    id: 2,
    title: "Event-Driven Order System",
    category: "Backend",
    shortDesc:
      "Fault-tolerant microservices on Kubernetes with Saga and Outbox patterns for reliable multi-service transactions and exactly-once event delivery.",
    description:
      "Fault-tolerant microservices on Kubernetes. Implemented Saga and Outbox patterns for reliable multi-service transactions and exactly-once event delivery.",
    problem:
      "Distributed order processing systems often suffer from inconsistency during partial failures — a payment can succeed while inventory update fails, leaving the system in a corrupt state.",
    solution:
      "Implemented the Saga pattern with compensating transactions and the Transactional Outbox pattern to guarantee exactly-once event delivery, even in the face of broker outages or network partitions.",
    achievements: [
      "Achieved exactly-once Kafka event delivery using the Transactional Outbox pattern",
      "Processed 100k+ events/minute sustained load with sub-50ms p99 latency",
      "Zero data loss across 3 simulated broker failure scenarios",
    ],
    tags: ["Spring Boot", "Kafka", "Kubernetes", "Redis", "MySQL", "Prometheus"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    gradient: "from-violet-500/20 to-purple-500/20",
    accentColor: "oklch(0.65 0.2 290)",
  },
  {
    id: 3,
    title: "AI News Aggregator Platform",
    category: "Full Stack",
    shortDesc:
      "End-to-end platform leveraging OpenAI APIs and LLMs to aggregate, summarize, and analyze trending AI news with vector semantic search.",
    description:
      "End-to-end platform leveraging OpenAI APIs and LLMs to aggregate, summarize, and analyze trending AI news. Includes vector databases for semantic search.",
    problem:
      "AI practitioners waste hours daily sifting through noise across hundreds of sources. Existing aggregators don't understand context or provide intelligent summarization.",
    solution:
      "Built an RAG-powered platform that ingests news from 50+ sources, vectorizes content with OpenAI embeddings, and surfaces personalized summaries through a semantic search interface.",
    achievements: [
      "Reduced content discovery time by 70% for beta testers",
      "Ingested and vectorized 10k+ articles with sub-2s semantic search",
      "Built custom RAG pipeline using LangChain + pgvector",
    ],
    tags: ["OpenAI", "Spring Boot", "React", "Vector DB", "RAG", "LangChain"],
    demoUrl: "#",
    githubUrl: "https://github.com/kaveesh1402/news-aggregator",
    featured: true,
    gradient: "from-orange-500/20 to-amber-500/20",
    accentColor: "oklch(0.72 0.18 60)",
  },
  {
    id: 4,
    title: "Real-Time Fraud Detection",
    category: "AI / ML",
    shortDesc:
      "Streaming system combining rule-based filtering with ML anomaly detection, handling 100k+ transactions/minute with fully async communication.",
    description:
      "Streaming system combining rule-based filtering with ML anomaly detection. Handles 100k+ transactions/minute with fully async communication.",
    problem:
      "Traditional batch-based fraud detection introduces unacceptable latency — fraudulent transactions complete before alerts are raised.",
    solution:
      "Built a streaming pipeline using Kafka Streams with a hybrid approach: a fast rule engine for known patterns and an ML model for statistical anomaly detection, all operating in real-time.",
    achievements: [
      "Detected fraudulent transactions within 200ms of event ingestion",
      "Achieved 94.3% precision on the test dataset with <1% false positive rate",
      "Processed 100k+ transactions per minute under sustained load",
    ],
    tags: ["Spring Boot", "Kafka Streams", "Rule Engine", "ML", "Anomaly Detection"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-cyan-500/20 to-blue-500/20",
    accentColor: "oklch(0.7 0.18 210)",
  },
  {
    id: 5,
    title: "Dementia Recognition System",
    category: "AI / ML",
    shortDesc:
      "Deep learning model using pre-trained VGG16 to classify MRI brain scans into dementia stages with augmented medical imaging datasets.",
    description:
      "Deep learning model using pre-trained VGG16 to classify MRI brain scans into various dementia stages. Preprocessed and augmented medical imaging datasets.",
    problem:
      "Manual MRI analysis for dementia classification is time-consuming and subject to inter-rater variability, delaying critical diagnoses.",
    solution:
      "Fine-tuned a VGG16 CNN on augmented MRI datasets with custom preprocessing pipeline including normalization, rotation, and flipping to improve model generalization.",
    achievements: [
      "Achieved 91% classification accuracy across 4 dementia severity classes",
      "Applied data augmentation to balance a skewed dataset (10,000+ scans)",
      "Reduced model inference time to under 500ms per scan",
    ],
    tags: ["TensorFlow", "Keras", "VGG16", "CNN", "Medical Imaging", "Python"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-emerald-500/20 to-teal-500/20",
    accentColor: "oklch(0.65 0.18 170)",
  },
  {
    id: 6,
    title: "Calorie Tracker App",
    category: "Mobile",
    shortDesc:
      "Flutter mobile app tracking daily calorie intake with Firebase backend and USDA FoodData Central API integration for accurate nutritional data.",
    description:
      "Mobile application to track daily calorie intake, meals, and nutritional data. Built with Flutter and Firebase for real-time data storage and user authentication.",
    problem:
      "Existing calorie tracking apps have inaccurate food databases or require manual entry, making consistent tracking difficult.",
    solution:
      "Built a Flutter app integrated with USDA FoodData Central API for accurate, up-to-date nutritional data with Firebase for real-time sync across devices.",
    achievements: [
      "Integrated 500k+ food items from USDA FoodData Central API",
      "Implemented real-time calorie dashboard with Firebase Firestore",
      "Built barcode scanning feature for instant nutritional lookup",
    ],
    tags: ["Flutter", "Firebase", "USDA API", "Dart", "Firestore"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-pink-500/20 to-rose-500/20",
    accentColor: "oklch(0.68 0.2 0)",
  },
];

/* ─────────────────────────────────────────────
   Project Card
───────────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: (typeof PROJECTS)[0];
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const idx = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={(node) => {
        cardRef.current = node;
        (ref as (node: HTMLDivElement | null) => void)(node);
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative group cursor-pointer h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="View →"
    >
      {/* Mouse-follow glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${project.accentColor}30 0%, transparent 60%)`,
        }}
      />

      <div className="relative h-full rounded-2xl border border-border/50 group-hover:border-primary/20 bg-card/70 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/5 flex flex-col">
        {/* Top accent line */}
        <div className={`h-px w-full bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 text-xs">
                {project.category}
              </Badge>
              {project.featured && (
                <span className="featured-badge inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full">
                  <Star className="h-2.5 w-2.5 fill-current" /> Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-muted-foreground/40">{idx}</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>
          </div>

          <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
            {project.shortDesc}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Project Modal
───────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[0] | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-4 md:inset-[8%] z-[101] glass rounded-3xl overflow-hidden border border-border/60 shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 h-9 w-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="max-w-2xl">
                {/* Badges */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Badge className="bg-primary/10 text-primary border border-primary/20">{project.category}</Badge>
                  {project.featured && (
                    <Badge className="featured-badge">
                      <Star className="h-3 w-3 fill-current mr-1" /> Featured
                    </Badge>
                  )}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">{project.description}</p>

                {/* Problem → Solution → Achievements */}
                <div className="space-y-6 mb-8">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                    <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-destructive/70 mb-2">
                      🔴 Problem
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.problem}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                    <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-primary/80 mb-2">
                      🟢 Solution
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.solution}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                    <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
                      ⭐ Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {project.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-primary mt-0.5 shrink-0">✓</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.demoUrl !== "#" && (
                    <Button
                      className="flex-1 h-12 glow-primary"
                      onClick={() => window.open(project.demoUrl, "_blank")}
                      data-cursor="Open ↗"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  )}
                  {project.githubUrl !== "#" && (
                    <Button
                      variant="outline"
                      className="flex-1 h-12 glass"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      data-cursor="View →"
                    >
                      <Github className="mr-2 h-4 w-4" /> Source Code
                    </Button>
                  )}
                  {project.demoUrl === "#" && project.githubUrl === "#" && (
                    <p className="text-sm text-muted-foreground italic">
                      This project is in a private/enterprise repository.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Things I&apos;ve <span className="gradient-text">built.</span>
            </h2>
          </div>

          {/* Category filter */}
          <motion.div className="flex flex-wrap gap-2" layout>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-primary border-primary/50 bg-primary/10"
                    : "text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
