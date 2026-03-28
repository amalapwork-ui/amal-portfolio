import { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import amalPhoto from "@/assets/amal-photo.png";

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "rgba(34,197,94," : "rgba(22,163,74,";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}0.4)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${color}${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

const HeroSection = () => {

  const roles = useMemo(
    () => ["Full Stack Developer", "AI Engineer", "Python Backend Engineer", "React Developer"],
    []
  );

  useEffect(() => {
    const handleClose = () => setShowResumeOptions(false);

    window.addEventListener("scroll", handleClose);
    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("scroll", handleClose);
      window.removeEventListener("click", handleClose);
    };
  }, []);
  const [showResumeOptions, setShowResumeOptions] = useState(false);
  const [isColored, setIsColored] = useState(false);
  return (
    <section id="home" className="min-h-screen relative flex items-center overflow-hidden pb-24 grid-bg">
      <ParticleCanvas />

      {/* Huge background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[clamp(4rem,18vw,18rem)] font-extrabold text-primary/[0.04] leading-none whitespace-nowrap">
          ENGINEER
        </span>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center pt-20">
        {/* Left — text */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start lg:ml-16 xl:ml-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-muted-foreground">
              Available for work
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,10vw,7rem)] font-extrabold leading-[0.9] tracking-tight"
            >
              Amal
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,10vw,7rem)] font-extrabold leading-[0.9] tracking-tight text-primary neon-text"
            >
              A P
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="font-mono text-sm text-primary mb-6 h-6 relative flex justify-center lg:justify-start"
          >
            {roles.map((r, i) => (
              <motion.span
                key={r}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ delay: 0.4 + i * 2, duration: 2, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: (roles.length - 1) * 2 }}
                className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 flex items-center whitespace-nowrap"
              >
                <span className="text-primary/60 mr-2">&gt;</span>
                {r}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-muted-foreground max-w-md leading-relaxed mb-8 text-sm"
          >
            Crafting scalable web applications and intelligent AI systems — from REST APIs to RAG pipelines. Based in Kerala, India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex items-center justify-center font-mono text-xs tracking-widest uppercase px-5 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              View Work
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex items-center justify-center font-mono text-xs tracking-widest uppercase px-5 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              Contact
            </a>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowResumeOptions((prev) => !prev);
                }}
                className="flex items-center justify-center font-mono text-xs tracking-widest uppercase px-5 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500"
              >
                Download Resume
              </button>

              {showResumeOptions && (
                <div className="absolute mt-2 w-full bg-background border border-border shadow-lg">
                  <a
                    href="/Amal_A_P_Full_Stack.pdf"
                    download
                    className="block px-4 py-1 text-sm hover:bg-primary hover:text-primary-foreground"
                  >
                    Developer Resume
                  </a>
                  <a
                    href="/Amal_AP_AI_Engineer.pdf"
                    download
                    className="block px-4 py-1 text-sm hover:bg-primary hover:text-primary-foreground"
                  >
                    AI Resume
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center mt-10 lg:mt-0"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] aspect-[4/5]">
            <div className="absolute inset-0 border-2 border-primary/30 translate-x-4 translate-y-4 neon-border" />
            <img
              src={amalPhoto}
              alt="Amal A P"
              width={350}
              height={420}
              onClick={() => setIsColored((prev) => !prev)}
              className={`w-full h-full object-cover object-top transition-all duration-700 relative z-10 cursor-pointer ${isColored ? "grayscale-0" : "grayscale"
                } hover:grayscale-0`}
            />
            <div className="absolute -bottom-6 -right-6 font-mono text-[0.55rem] tracking-[0.3em] text-primary uppercase">
              Kerala, India
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on very short screens to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.5rem] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-primary/50"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
