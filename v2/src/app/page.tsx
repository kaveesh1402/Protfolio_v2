"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";

const About = dynamic(
  () => import("@/components/sections/about").then((mod) => mod.About),
  { ssr: false }
);
const Skills = dynamic(
  () => import("@/components/sections/skills").then((mod) => mod.Skills),
  { ssr: false }
);
const Projects = dynamic(
  () => import("@/components/sections/projects").then((mod) => mod.Projects),
  { ssr: false }
);
const Achievements = dynamic(
  () => import("@/components/sections/achievements").then((mod) => mod.Achievements),
  { ssr: false }
);
const GithubStats = dynamic(
  () => import("@/components/sections/github-stats").then((mod) => mod.GithubStats),
  { ssr: false }
);
const Contact = dynamic(
  () => import("@/components/sections/contact").then((mod) => mod.Contact),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <GithubStats />
      <Contact />
    </>
  );
}
