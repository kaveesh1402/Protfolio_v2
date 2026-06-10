"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { animated } from "@react-spring/web";
import { useMagnetic } from "@/hooks/use-magnetic";

/* ─────────────────────────────────────────────
   Typewriter hook
───────────────────────────────────────────── */
const ROLES = [
  "Software Engineer",
  "Java Developer",
  "Spring Boot Developer",
  "Cloud Enthusiast",
  "Full Stack Developer",
];

function useTypewriter(words: string[], typingSpeed = 75, deletingSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deletingSpeed);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ─────────────────────────────────────────────
   RevealLine helper
───────────────────────────────────────────── */
function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className="overflow-hidden leading-tight">
      <motion.div
        className={className}
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 22, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Hero
───────────────────────────────────────────── */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const role = useTypewriter(ROLES);

  // Parallax
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.93]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const avatarY = useTransform(scrollY, [0, 600], [0, -60]);
  const avatarSpring = useSpring(avatarY, { stiffness: 80, damping: 20 });

  // Cursor-reactive orbs
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);
  const orb1X = useSpring(useTransform(cursorX, [0, 1], [-30, 30]), { stiffness: 40, damping: 20 });
  const orb1Y = useSpring(useTransform(cursorY, [0, 1], [-20, 20]), { stiffness: 40, damping: 20 });
  const orb2X = useSpring(useTransform(cursorX, [0, 1], [20, -20]), { stiffness: 25, damping: 18 });
  const orb2Y = useSpring(useTransform(cursorY, [0, 1], [15, -25]), { stiffness: 25, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX / rect.width);
    cursorY.set(e.clientY / rect.height);
  };

  // Magnetic CTAs
  const primaryMag = useMagnetic(0.35);
  const resumeMag = useMagnetic(0.35);
  const secondaryMag = useMagnetic(0.35);
  const githubMag = useMagnetic(0.5);
  const linkedinMag = useMagnetic(0.5);
  const emailMag = useMagnetic(0.5);

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ scale: heroScale }}
      onMouseMove={handleMouseMove}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.22 264 / 0.25) 0%, transparent 70%)",
          top: "-10%",
          right: "5%",
          x: orb1X,
          y: orb1Y,
          filter: "blur(70px)",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.2 290 / 0.2) 0%, transparent 70%)",
          bottom: "10%",
          left: "5%",
          x: orb2X,
          y: orb2Y,
          filter: "blur(60px)",
        }}
      />

      <motion.div
        className="container relative mx-auto px-6 z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24"
        style={{ opacity: heroOpacity }}
      >
        {/* ── Text Content ── */}
        <div className="flex-1 space-y-8">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Open to Opportunities · Java & Cloud Native
          </motion.div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              <RevealLine delay={0.15} className="block text-foreground pb-1">
                Hi, I&apos;m
              </RevealLine>
              <RevealLine delay={0.28} className="block gradient-text pb-2">
                Kaveesh Bhat
              </RevealLine>
            </h1>

            {/* Typewriter subtitle */}
            <motion.div
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed min-h-[2.5rem] flex items-center gap-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              aria-label={`Role: ${role}`}
            >
              <span className="text-foreground/70">I&apos;m a </span>
              <span className="text-foreground font-semibold">{role}</span>
              <span className="typewriter-cursor text-primary" aria-hidden="true" />
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-[520px] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Building cloud-native, event-driven systems with Spring Boot & Kafka.
              Exploring Generative AI to shape the future of software.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            {/* View Projects */}
            <animated.div style={primaryMag.style}>
              <Button
                ref={primaryMag.ref as React.Ref<HTMLButtonElement>}
                size="lg"
                className="h-12 px-8 text-base shadow-lg ripple-container glow-primary"
                onMouseMove={primaryMag.onMouseMove as React.MouseEventHandler}
                onMouseLeave={primaryMag.onMouseLeave}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                data-cursor="View →"
                aria-label="Scroll to Projects section"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </animated.div>

            {/* Download Resume */}
            <animated.div style={resumeMag.style}>
              <Button
                ref={resumeMag.ref as React.Ref<HTMLButtonElement>}
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base glass hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all"
                onMouseMove={resumeMag.onMouseMove as React.MouseEventHandler}
                onMouseLeave={resumeMag.onMouseLeave}
                onClick={() => window.open("/resume.pdf", "_blank")}
                data-cursor="Download ↓"
                aria-label="Download Resume PDF"
              >
                <Download className="mr-2 h-4 w-4" /> Resume
              </Button>
            </animated.div>

            {/* Get in Touch */}
            <animated.div style={secondaryMag.style}>
              <Button
                ref={secondaryMag.ref as React.Ref<HTMLButtonElement>}
                size="lg"
                variant="ghost"
                className="h-12 px-8 text-base hover:text-primary"
                onMouseMove={secondaryMag.onMouseMove as React.MouseEventHandler}
                onMouseLeave={secondaryMag.onMouseLeave}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                data-cursor="Chat →"
                aria-label="Scroll to Contact section"
              >
                Contact Me
              </Button>
            </animated.div>

            {/* Social icons */}
            <div className="flex items-center gap-1 ml-2">
              {[
                {
                  ref: linkedinMag.ref,
                  style: linkedinMag.style,
                  move: linkedinMag.onMouseMove,
                  leave: linkedinMag.onMouseLeave,
                  icon: <Linkedin className="h-5 w-5" />,
                  sr: "LinkedIn",
                  href: "https://linkedin.com/in/kaveesh-bhat",
                },
                {
                  ref: githubMag.ref,
                  style: githubMag.style,
                  move: githubMag.onMouseMove,
                  leave: githubMag.onMouseLeave,
                  icon: <Github className="h-5 w-5" />,
                  sr: "GitHub",
                  href: "https://github.com/kaveesh1402",
                },
                {
                  ref: emailMag.ref,
                  style: emailMag.style,
                  move: emailMag.onMouseMove,
                  leave: emailMag.onMouseLeave,
                  icon: <Mail className="h-5 w-5" />,
                  sr: "Email",
                  href: "mailto:12akaveeshbhat@gmail.com",
                },
              ].map(({ ref, style, move, leave, icon, sr, href }, i) => (
                <animated.div key={i} style={style}>
                  <Button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    size="icon"
                    variant="ghost"
                    className="h-11 w-11 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    onMouseMove={move as React.MouseEventHandler}
                    onMouseLeave={leave}
                    onClick={() => window.open(href, "_blank")}
                    aria-label={sr}
                  >
                    {icon}
                    <span className="sr-only">{sr}</span>
                  </Button>
                </animated.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Avatar ── */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          style={{ y: avatarSpring }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.3 }}
        >
          <div className="relative group">
            {/* Glow ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary/40 via-primary/20 to-purple-500/30 blur-xl opacity-60 group-hover:opacity-90 transition-all duration-700" />
            <Avatar className="w-64 h-64 md:w-80 md:h-80 border-2 border-primary/20 shadow-2xl relative ring-1 ring-white/5">
              <AvatarImage src="/avatar.jpg" alt="Kaveesh Bhat — Software Engineer" className="object-cover" />
              <AvatarFallback className="text-6xl font-bold bg-muted text-primary">KB</AvatarFallback>
            </Avatar>

            {/* XP card */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-xl flex flex-col items-center justify-center gap-1"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
            >
              <span className="text-3xl font-bold gradient-text">2.5+</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Years Exp</span>
            </motion.div>

            {/* Stack badge */}
            <motion.div
              className="absolute -top-4 -left-4 glass rounded-xl px-3 py-2 shadow-lg text-xs font-mono text-primary border border-primary/20"
              initial={{ opacity: 0, x: -16, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
            >
              Java · Spring · Kafka
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
