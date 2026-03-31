"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSpring as useReactSpring, animated } from "@react-spring/web";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon, SparklesIcon } from "lucide-react";

const skills = [
  { category: "Languages", items: ["Java 11/17", "TypeScript", "Python", "SQL"] },
  { category: "Frameworks & UI", items: ["Spring Boot", "React", "Next.js", "Tailwind CSS"] },
  { category: "Infrastructure & Data", items: ["Apache Kafka", "Kubernetes", "Docker", "MySQL", "Redis"] },
  { category: "AI & ML", items: ["OpenAI API", "RAG Systems", "LangChain", "TensorFlow", "Vector DBs"] },
];

const timeline = [
  {
    role: "Programmer Analyst",
    company: "Cognizant Technology Solutions",
    period: "May 2025 – Present",
    description:
      "Developed and optimized distributed Spring Boot microservices at scale. Implemented Kafka producers/consumers for high-throughput event streaming. Built secure REST APIs improving inter-service communication by 40%.",
  },
  {
    role: "Calorie Tracker Mobile Application",
    company: "Personal Project",
    period: "June 2025 – Aug 2025",
    description:
      "Developed a mobile application to track daily calorie intake, meals, and nutritional data. Built the frontend using Flutter and integrated Firebase for real-time data storage and user authentication. Implemented food search functionality using the USDA FoodData Central API for accurate calorie data retrieval.",
  },
  {
    role: "Movie Recommendation System",
    company: "Python, NLTK, Streamlit, Scikit-learn",
    period: "March 2024 – June 2024",
    description:
      "Integrated data preprocessing techniques to handle text data, including tokenization, stemming, and vectorization. Implemented sentiment analysis algorithms to classify user sentiment towards movies based on textual data. Utilized machine learning models such as collaborative filtering and content-based filtering to personalize recommendations.",
  },
  {
    role: "SDE Intern",
    company: "ACIC (Atal Community Innovation Center)",
    period: "October 2023 – December 2023",
    description:
      "Conducted in depth research on rural challenges, identifying key pain points affecting 90% communities. Crafted Innovative solutions, resulting in 30% increase in access to essential services within target regions. Presented findings to stakeholders, including government officials and community leaders, resulting in a 90% positive feedback rate and identifying 3 potential avenues for implementation.",
  },
  {
    role: "Placement Coordinator",
    company: "Indian School of Business (ISB)",
    period: "Sep 2023 – Nov 2023",
    description:
      "Oversaw digital placement operations, managing a database of 5000+ student profiles. Executed process improvements, reducing placement cycle time by 20% and increasing student satisfaction by 15%. Collaborated with 50+ recruiters to facilitate seamless recruitment processes, resulting in a 25% increase in placement offers compared to the previous year.",
  },
];

// Physics-bouncy skill badge
function SkillBadge({ skill, delay }: { skill: string; delay: number }) {
  const [style, api] = useReactSpring(() => ({
    scale: 1,
    y: 0,
    config: { tension: 300, friction: 12, mass: 0.5 },
  }));

  return (
    <animated.div
      style={style}
      onMouseEnter={() => api.start({ scale: 1.15, y: -4 })}
      onMouseLeave={() => api.start({ scale: 1, y: 0 })}
      className="inline-block"
    >
      <Badge
        variant="secondary"
        className="font-normal bg-secondary/60 hover:bg-primary/15 hover:text-primary hover:border-primary/30 border border-transparent transition-colors cursor-default text-xs px-3 py-1"
      >
        {skill}
      </Badge>
    </animated.div>
  );
}

// 3D tilt card
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [style, api] = useReactSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 1, tension: 200, friction: 20 },
  }));

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    api.start({ rotateX: -x * 10, rotateY: y * 10, scale: 1.02 });
  };

  const onMouseLeave = () => api.start({ rotateX: 0, rotateY: 0, scale: 1 });

  return (
    <animated.div
      style={{ ...style, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </animated.div>
  );
}

// Timeline item with scroll-triggered animation
function TimelineItem({ item, index }: { item: (typeof timeline)[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="absolute -left-[41px] w-5 h-5 mt-1.5">
        <motion.div
          className="w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 + index * 0.1 }}
          style={{ boxShadow: "0 0 12px oklch(0.68 0.22 264 / 0.5)" }}
        />
      </div>
      <div className="text-xs font-mono text-primary mb-1 tracking-wider">{item.period}</div>
      <div className="text-xl font-bold tracking-tight text-foreground">{item.role}</div>
      <div className="text-sm font-medium text-muted-foreground mb-3">{item.company}</div>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [bioRef, bioInView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Scroll-triggered timeline line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);

  return (
    <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Subtle section bg */}
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Engineer at <span className="gradient-text">heart.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Bio + Skills */}
          <div className="lg:col-span-7 space-y-14">
            <motion.div
              ref={bioRef}
              className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p>
                I&apos;m a <strong className="text-foreground">Software Engineer</strong> with
                production experience building distributed, resilient systems at scale. My roots are
                deep in event-driven architecture and microservice observability.
              </p>
              <p>
                I&apos;m passionate about the intersection of{" "}
                <strong className="text-foreground">system design and emerging AI</strong> — writing
                code that&apos;s functional, maintainable, and built to last while actively exploring
                Generative AI applications.
              </p>
            </motion.div>

            {/* Skill Badges */}
            <div className="space-y-8">
              <motion.h3
                className="text-xl font-semibold tracking-tight"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Technical Arsenal
              </motion.h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.map((group, gi) => (
                  <TiltCard key={group.category}>
                    <Card className="h-full glass border-border/50 hover:border-primary/20 transition-colors">
                      <CardContent className="p-5">
                        <div className="text-xs font-semibold tracking-[0.15em] text-primary/80 uppercase mb-3">
                          {group.category}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((skill, si) => (
                            <SkillBadge
                              key={skill}
                              skill={skill}
                              delay={gi * 0.1 + si * 0.04}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold tracking-tight mb-8 flex items-center gap-2">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                Experience
              </h3>

              <div className="relative ml-3 pl-8">
                {/* Animated timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/30"
                    style={{ height: lineHeight }}
                  />
                </div>

                <div className="space-y-10">
                  {timeline.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                  ))}

                  {/* Future node */}
                  <div className="relative">
                    <div className="absolute -left-[41px] w-5 h-5 mt-1.5 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                    </div>
                    <div className="text-lg font-semibold text-muted-foreground/50 flex items-center gap-2">
                      <SparklesIcon className="h-4 w-4" />
                      Open to Opportunities
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
