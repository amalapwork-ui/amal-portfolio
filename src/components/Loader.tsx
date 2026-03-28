import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = ["Full Stack Developer", "AI Engineer", "Problem Solver"];

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  // RAF-based ease-out progress — feels fast (reaches 80% quickly, decelerates near 100%)
  useEffect(() => {
    const DURATION = 750; // ms until 100%
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease-out cubic: fast start, slow end → feels snappy
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Brief pause at 100%, then exit
        setTimeout(() => {
          setExiting(true);
          setTimeout(handleComplete, 480);
        }, 100);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [handleComplete]);

  // Phrase cycling
  useEffect(() => {
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % phrases.length), 400);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.48, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Phrase with crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={phraseIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.22 }}
                className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-8"
              >
                {phrases[phraseIdx]}
              </motion.div>
            </AnimatePresence>

            {/* Large percent counter */}
            <div
              className="font-display font-bold neon-text text-primary tabular-nums leading-none"
              style={{ fontSize: "clamp(5rem, 18vw, 9rem)" }}
            >
              {progress}
              <span style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>%</span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-10 sm:bottom-12 w-40 sm:w-64">
            <div className="h-px bg-border overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${progress}%`, transition: "none" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
