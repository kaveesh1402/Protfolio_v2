"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const GITHUB_USERNAME = "kaveesh1402";

const THEME_PARAMS =
  "bg_color=0d0d1a&title_color=818cf8&text_color=94a3b8&icon_color=818cf8&border_color=1e1e3a&hide_border=false&border_radius=12";

export function GithubStats() {
  const [titleRef, titleInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="github" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">Open Source</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              GitHub <span className="gradient-text">activity.</span>
            </h2>
            <Button
              variant="outline"
              className="glass hover:border-primary/40 hover:text-primary self-start md:self-auto"
              onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, "_blank")}
            >
              <Github className="mr-2 h-4 w-4" />
              @{GITHUB_USERNAME}
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </motion.div>

        {/* Stats widgets grid */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 32 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-5"
        >
          {/* GitHub Stats */}
          <div className="rounded-2xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm p-1 hover:border-primary/20 transition-colors group">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&count_private=true&${THEME_PARAMS}`}
              alt={`${GITHUB_USERNAME} GitHub stats`}
              className="w-full rounded-xl"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Top Languages */}
          <div className="rounded-2xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm p-1 hover:border-primary/20 transition-colors group">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&langs_count=8&${THEME_PARAMS}`}
              alt={`${GITHUB_USERNAME} top languages`}
              className="w-full rounded-xl"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Streak stats — spans full width on md */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm p-1 hover:border-primary/20 transition-colors group">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&${THEME_PARAMS}&dates=94a3b8&ring=818cf8&fire=818cf8&currStreakLabel=818cf8`}
              alt={`${GITHUB_USERNAME} GitHub streak`}
              className="w-full rounded-xl max-h-40 object-contain"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-6"
        >
          Stats powered by{" "}
          <a
            href="https://github.com/anuraghazra/github-readme-stats"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            github-readme-stats
          </a>
          . Private repo contributions counted.
        </motion.p>
      </div>
    </section>
  );
}
