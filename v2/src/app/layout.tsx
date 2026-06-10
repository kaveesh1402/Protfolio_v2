import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaveesh Bhat — Software Engineer | Java · Spring Boot · Kafka",
  description:
    "Software Engineer at Cognizant specializing in cloud-native microservices, Apache Kafka, Spring Boot, Kubernetes, and Generative AI. Open to full-time opportunities.",
  keywords: [
    "Software Engineer",
    "Java Engineer",
    "Spring Boot Developer",
    "Apache Kafka",
    "Microservices",
    "Kubernetes",
    "Cloud Native",
    "Full Stack Developer",
    "Next.js",
    "Generative AI",
    "Kaveesh Bhat",
    "Cognizant",
    "Hyderabad",
  ],
  authors: [{ name: "Kaveesh Bhat", url: "https://linkedin.com/in/kaveesh-bhat" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Kaveesh Bhat — Software Engineer",
    description:
      "Cloud-native engineer building event-driven systems with Spring Boot, Kafka & Kubernetes. Exploring Gen AI.",
    type: "website",
    locale: "en_US",
    siteName: "Kaveesh Bhat Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaveesh Bhat — Software Engineer",
    description:
      "Cloud-native engineer building event-driven systems with Spring Boot, Kafka & Kubernetes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* LenisProvider is a client component — GradientMesh dynamic import lives there */}
          <LenisProvider>
            <CustomCursor />
            <Navbar />
            <main className="flex-1 w-full relative z-10">
              {children}
            </main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
