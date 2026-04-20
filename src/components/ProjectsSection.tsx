import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";
import projectAi from "@/assets/project-ai.jpg";
import projectMedical from "@/assets/project-medical.jpg";
import projectFullstack from "@/assets/project-fullstack.jpg";
import projectSports from "@/assets/project-sports.jpg";
import projectCode from "@/assets/code.jpg";

type Project = {
  num: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  story: string;
  tech: string[];
  github: string;
  live?: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "SupportAI - AI Customer Support Platform",
    subtitle: "Agentic AI / Full Stack",
    year: "2026",
    image: projectAi,
    story:
      "Agentic RAG pipeline with document ingestion, semantic search via FAISS/Chroma, and context-aware LLM responses. Full JWT + RBAC authentication with Django DRF backend and React frontend.",
    tech: ["Django DRF", "React", "RAG", "FAISS", "LLM API", "JWT"],
    github: "https://github.com/amalapwork-ui/AI-Tech-Support-Platform",
  },
  {
    num: "02",
    title: "Clinic Management System",
    subtitle: "Full Stack Web App",
    year: "2025",
    image: projectFullstack,
    story:
      "End-to-end clinic platform with appointment scheduling, role-based auth, REST API integration. React frontend deployed live on Vercel with MySQL database powering the backend.",
    tech: ["Django DRF", "React", "MySQL", "AWS EC2"],
    github: "https://github.com/amalapwork-ui/Clinic-Management-System-2026",
    live: "https://clinic-management-system-2026-dt74.vercel.app/",
  },
  {
    num: "03",
    title: "Medical AI Cancer Detection",
    subtitle: "Deep Learning / Medical",
    year: "2026",
    image: projectMedical,
    story:
      "CNN-based image classification for cancer detection in MRI & histopathology images. Built with EfficientNet architecture, live confidence scoring, and a Streamlit interface for medical professionals.",
    tech: ["TensorFlow", "EfficientNet", "CNN", "Streamlit"],
    github: "https://github.com/amalapwork-ui/Medical-AI-Cancer-Detection",
  },
  {
    num: "04",
    title: "Sports Performance Analytics",
    subtitle: "ML + Computer Vision",
    year: "2025",
    image: projectSports,
    story:
      "ML pipeline for player performance prediction and injury risk assessment. YOLOv8 tracking from video frames with XGBoost models, visualized through an interactive Streamlit dashboard.",
    tech: ["Python", "XGBoost", "YOLOv8", "Streamlit"],
    github: "https://github.com/amalapwork-ui/Sports-Performance-Analysis",
  },
  {
    num: "05",
    title: "Smart Talent Selection Engine",
    subtitle: "AI / ML",
    year: "2026",
    image: projectCode,
    story:
      "AI-powered recruitment pipeline automating candidate screening, skill matching, and ranking. NLP parses résumés and job descriptions; an ML classifier scores and ranks candidates for faster, fairer hiring decisions.",
    tech: ["Python", "NLP", "Scikit-learn", "FastAPI", "React"],
    github: "https://github.com/amalapwork-ui/Smart-Talent-Selection-Engine",
  },
];

// ─── FlipCard ─────────────────────────────────────────────────────────────────

const FlipCard = ({
  project,
  index,
}: {
  project: Project;
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
        w-72 sm:w-80 md:w-[380px] max-[768px]:w-full
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
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.55rem] tracking-wider uppercase px-3 py-1.5 border border-primary/30 text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            {/* Buttons — stopPropagation prevents card flip on link click */}
            <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] tracking-wider uppercase px-3 py-1.5 border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
              >
                <Github size={11} />
                GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] tracking-wider uppercase px-3 py-1.5 border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                >
                  <ExternalLink size={11} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
          <div className="font-mono text-[0.5rem] text-muted-foreground tracking-widest uppercase text-right mt-4">
            ← Tap to flip back
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── ProjectsSection ──────────────────────────────────────────────────────────

const ProjectsSection = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onScroll = () => {
      const max = wrap.scrollWidth - wrap.clientWidth;
      setScrollProgress(max > 0 ? wrap.scrollLeft / max : 0);
    };
    wrap.addEventListener("scroll", onScroll, { passive: true });
    return () => wrap.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = { x: e.pageX, scrollLeft: wrap.scrollLeft };
    wrap.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !wrapRef.current) return;
    const dist = e.pageX - dragStart.current.x;
    if (Math.abs(dist) > 4) hasDragged.current = true;
    wrapRef.current.scrollLeft = dragStart.current.scrollLeft - dist;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (wrapRef.current) wrapRef.current.style.cursor = "grab";
  };

  // Suppress card flip when mousedown+move was a drag, not a click
  const onClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      hasDragged.current = false;
    }
  };

  return (
    <section id="work" className="flex flex-col">
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
          Concepts Turned{" "}
          <span className="text-primary neon-text">Into Reality</span>
        </motion.h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-muted-foreground tracking-widest uppercase"
          >
            <span className="hidden sm:inline">← drag / scroll →  · </span>Tap card to flip ↓
          </motion.p>

          {/* Scroll progress bar — desktop only */}
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

      {/* ── Card scroll area ── */}
      <div className="relative">
        {/* Right-edge fade — desktop only, teases cards off-screen */}
        <div
          className="absolute right-0 inset-y-0 w-12 sm:w-20 z-10 pointer-events-none hidden md:block"
          style={{
            background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        {/* Scroll wrapper — horizontal on desktop, natural on mobile */}
        <div
          ref={wrapRef}
          className="overflow-x-auto overflow-y-hidden md:cursor-grab md:select-none pb-3"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClickCapture={onClickCapture}
        >
          {/* Card track — row + max-content on desktop, column + full-width on mobile */}
          <div
            className="flex gap-5 sm:gap-6 py-4 lg:py-6 px-6 lg:px-12
              w-max max-[768px]:flex-col max-[768px]:w-full"
          >
            {projects.map((p, i) => (
              <FlipCard key={p.num} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
