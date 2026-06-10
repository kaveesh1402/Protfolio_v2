"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const socials = [
  { icon: <Github className="h-4 w-4" />, href: "https://github.com/kaveesh1402", label: "GitHub" },
  { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com/in/kaveesh-bhat", label: "LinkedIn" },
  { icon: <Mail className="h-4 w-4" />, href: "mailto:12akaveeshbhat@gmail.com", label: "Email" },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full border-t border-border/40 bg-background pt-12 pb-8">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-2xl font-bold tracking-tighter inline-block">
              KB<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-[200px] leading-relaxed">
              Software Engineer specializing in Java, Spring Boot, and cloud-native systems.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Navigation
            </p>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors link-underline w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact snippet */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
              Get In Touch
            </p>
            <div className="space-y-2">
              <a
                href="mailto:12akaveeshbhat@gmail.com"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors link-underline w-fit"
              >
                12akaveeshbhat@gmail.com
              </a>
              <a
                href="tel:+916006122535"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors link-underline w-fit"
              >
                +91 6006-122535
              </a>
              <p className="text-xs text-muted-foreground/60 mt-1">Hyderabad, India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Kaveesh Bhat. All rights reserved.</p>
            <span className="hidden sm:block text-border">·</span>
            <p className="text-xs">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                Next.js 16
              </a>{" "}
              · Deployed on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                Vercel
              </a>
            </p>
          </div>

          {/* Socials + back to top */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-cursor={label}
              >
                {icon}
              </motion.a>
            ))}
            <motion.button
              onClick={scrollToTop}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
