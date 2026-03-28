import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import codePhoto from "@/assets/code.jpg";

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
};

const AboutSection = () => (
  <section id="about" className="py-24 lg:py-40 px-6 lg:px-12">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-primary uppercase">01</span>
        <div className="h-px w-8 bg-primary" />
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">About</span>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Building the future with{" "}
            <span className="text-primary neon-text">code & AI</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
            Computer Science graduate with hands-on experience building full stack web applications
            using Django, FastAPI, and React. Specialized in REST API development,
            frontend-backend integration, and AI-powered solutions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
            From RAG pipelines with semantic search to CNN-based medical imaging systems, I bridge
            the gap between intelligent AI and robust web infrastructure.
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[
              { num: 4, suffix: "+", label: "Projects" },
              { num: 6, suffix: "+", label: "Months Exp" },
              { num: 10, suffix: "+", label: "Technologies" },
            ].map((s) => (
              <div key={s.label} className="border border-border p-3 sm:p-4 text-center neon-border">
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
                  <CountUp target={s.num} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[0.55rem] sm:text-[0.6rem] tracking-widest text-muted-foreground uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image — visible on ALL screen sizes (was hidden lg:block) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mt-4 lg:mt-0"
        >
          <div className="relative w-full aspect-square max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto">
            <div className="absolute inset-4 border border-primary/20 rounded-lg neon-border" />
            <img
              src={codePhoto}
              alt="Code setup"
              loading="lazy"
              width={500}
              height={500}
              className="w-full h-full object-cover object-top rounded-lg grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
