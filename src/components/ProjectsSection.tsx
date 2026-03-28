import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectAi from "@/assets/project-ai.jpg";
import projectMedical from "@/assets/project-medical.jpg";
import projectFullstack from "@/assets/project-fullstack.jpg";
import projectSports from "@/assets/project-sports.jpg";

// Register once at module level — safe to call multiple times
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "Enterprise Smart Technical Support",
    subtitle: "RAG + Full Stack",
    year: "2026",
    image: projectAi,
    story:
      "Built a RAG pipeline with document ingestion, semantic search via FAISS/Chroma, and context-aware LLM responses. Full JWT + RBAC authentication with Django DRF backend and React frontend.",
    tech: ["Django DRF", "React", "RAG", "FAISS", "LLM API", "JWT"],
  },
  {
    num: "02",
    title: "Clinic Management System",
    subtitle: "Full Stack Web App",
    year: "2025",
    image: projectFullstack,
    story:
      "End-to-end clinic platform with appointment scheduling, role-based auth, REST API integration. React frontend deployed live on AWS EC2 with MySQL database powering the backend.",
    tech: ["Django DRF", "React", "MySQL", "AWS EC2"],
  },
  {
    num: "03",
    title: "Multi-Cancer Medical AI Detection",
    subtitle: "Deep Learning / Medical",
    year: "2026",
    image: projectMedical,
    story:
      "CNN-based image classification for cancer detection in MRI & histopathology images. Built with EfficientNet architecture, live confidence scoring, and a Streamlit interface for medical professionals.",
    tech: ["TensorFlow", "EfficientNet", "CNN", "Streamlit"],
  },
  {
    num: "04",
    title: "Sports Performance Analysis",
    subtitle: "ML + Computer Vision",
    year: "2025",
    image: projectSports,
    story:
      "ML pipeline for player performance prediction and injury risk assessment. YOLOv8 tracking from video frames with XGBoost models, visualized through an interactive Streamlit dashboard.",
    tech: ["Python", "XGBoost", "YOLOv8", "Streamlit"],
  },
];

// ─── FlipCard ────────────────────────────────────────────────────────────────

const FlipCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setFlipped((f) => !f)}
      className={`flip-card flex-shrink-0 cursor-pointer
        w-72 sm:w-80 md:w-[380px]
        h-[calc(100vh-300px)] max-h-[440px] sm:max-h-[460px] md:max-h-[480px]
        ${flipped ? "flipped" : ""}
      `}
    >
      <div className="flip-card-inner w-full h-full relative">
        {/* Front */}
        <div className="flip-card-front absolute inset-0 border border-border overflow-hidden group">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width={420}
            height={500}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <div className="font-mono text-[0.55rem] tracking-[0.3em] text-primary mb-2">
              {project.num} — {project.year}
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold mb-1 leading-snug">
              {project.title}
            </h3>
            <p className="font-mono text-[0.6rem] tracking-widest text-primary uppercase">
              {project.subtitle}
            </p>
          </div>
          <div className="absolute top-4 right-4 font-mono text-[0.5rem] text-muted-foreground/70 tracking-widest uppercase">
            Tap to flip →
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 border border-primary/30 bg-card p-6 sm:p-8 flex flex-col justify-between neon-border">
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.3em] text-primary mb-4">
              {project.num} — THE STORY
            </div>
            <h3 className="font-display text-lg sm:text-2xl font-bold mb-4 leading-snug">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.story}</p>
          </div>
          <div>
            <div className="font-mono text-[0.5rem] tracking-widest text-muted-foreground mb-3 uppercase">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.55rem] tracking-wider uppercase px-3 py-1.5 border border-primary/30 text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="font-mono text-[0.5rem] text-muted-foreground tracking-widest uppercase text-right">
            ← Tap to flip back
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── ProjectsSection ──────────────────────────────────────────────────────────

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isFine = window.matchMedia("(pointer: fine)").matches;

    // ── Mobile / touch: native horizontal swipe ──────────────────────────────
    if (!isFine) {
      track.style.overflowX = "auto";
      track.style.scrollbarWidth = "none";

      const onScroll = () => {
        const max = track.scrollWidth - track.clientWidth;
        setScrollProgress(max > 0 ? track.scrollLeft / max : 0);
      };
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => track.removeEventListener("scroll", onScroll);
    }

    // ── Guard: if all cards already fit in the viewport, no horizontal scroll needed ──
    if (track.scrollWidth <= window.innerWidth) return;

    // ── Desktop: GSAP ScrollTrigger pin + scroll-driven translateX ───────────
    //
    // How it works:
    //  1. Section pins to top of viewport (position: fixed).
    //  2. GSAP creates a spacer div above the pinned section with height =
    //     section.height + totalScroll, preserving the page scroll budget.
    //  3. As the user scrolls, progress (0 → 1) drives the track's translateX
    //     from 0 → -totalScroll, revealing cards left-to-right.
    //  4. When progress === 1, the pin releases and normal scroll resumes.
    //  5. scrub: 1 → smooth 1-second lag (feels natural, not hijacked).
    //  6. anticipatePin: 1 → eliminates the visual jump at pin start.
    //  7. invalidateOnRefresh: true → recalculates dimensions on resize.

    const ctx = gsap.context(() => {
      // fromTo with explicit x:0 guarantees the start position is always clean,
      // regardless of any stale transform from a prior render cycle.
      // window.innerWidth matches the actual pinned viewport width; section.offsetWidth
      // is narrower on Windows (scrollbar) and produces a 17-px translation error.
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            // anticipatePin removed — it causes a non-zero progress jump at pin
            // start which makes the track appear already-shifted when pinning fires.
            invalidateOnRefresh: true,
            onUpdate: (self) => setScrollProgress(self.progress),
          },
        }
      );
    }, section); // scope to section for clean ctx.revert()

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="flex flex-col lg:min-h-screen overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 lg:px-12 max-w-7xl mx-auto w-full pt-16 pb-6 lg:pt-24 lg:pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-primary uppercase">02</span>
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
            Selected Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight"
        >
          Concepts Turned {" "}
          <span className="text-primary neon-text">Into Reality</span>
        </motion.h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-muted-foreground tracking-widest uppercase"
          >
            {/* Hint changes based on device — only pointer:fine sees "scroll" */}
            <span className="hidden sm:inline">Scroll to explore · </span>Tap card to flip ↓
          </motion.p>

          {/* Horizontal scroll progress bar (md+, desktop only) */}
          <div className="hidden md:flex items-center gap-3">
            <span className="font-mono text-[0.5rem] text-muted-foreground tracking-widest uppercase">
              {Math.round(scrollProgress * 100)}%
            </span>
            <div className="w-28 h-px bg-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-100 linear"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Card track ── */}
      <div className="relative lg:flex-1 lg:flex lg:items-center">
        {/* Right-edge fade — teases content off-screen to the right */}
        <div
          className="absolute right-0 inset-y-0 w-12 sm:w-20 lg:w-20 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        {/*
          Desktop: track has no overflow — GSAP drives translateX.
          Mobile:  track.style.overflowX = "auto" is set in useEffect above.
          will-change-transform → GPU compositing layer for smooth animation.
        */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 py-4 lg:py-0 px-6 lg:px-0 will-change-transform"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {/*
            Desktop centering spacer — width = max(3rem, (100vw - totalCardsWidth) / 2).
            When viewport ≥ 1688px this equals (vw-1592)/2, making scrollWidth === vw so
            the GSAP guard fires and cards sit perfectly centered with no scroll.
            When viewport < 1688px it collapses to 3rem (48px) — matching the header's px-12
            baseline and giving the first card the same left inset as the section text.
            The mirror spacer at the end produces a symmetric exit frame on the last card.
          */}
          <div
            className="hidden lg:block shrink-0"
            style={{ width: "max(3rem, calc((100vw - 1592px) / 2))" }}
            aria-hidden
          />
          {projects.map((p, i) => (
            <FlipCard key={p.num} project={p} index={i} />
          ))}
          <div
            className="hidden lg:block shrink-0"
            style={{ width: "max(3rem, calc((100vw - 1592px) / 2))" }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
