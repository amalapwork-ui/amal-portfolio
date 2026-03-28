import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Obstacle {
  x: number;
  width: number;
  height: number;
  passed: boolean;
}

const CANVAS_W = 700;
const CANVAS_H = 200;
const GROUND_Y = 160;
const DINO_W = 30;
const DINO_H = 40;
const GRAVITY = 0.6;
const JUMP_VEL = -12;

const DinoGame = () => {
  // Evaluated once at mount — stable for the session (same pattern as CustomCursor).
  const isFine = useRef(window.matchMedia("(pointer: fine)").matches);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const gameRef = useRef({ dinoY: GROUND_Y - DINO_H, velY: 0, obstacles: [] as Obstacle[], speed: 4, score: 0, frame: 0 });

  const resetGame = useCallback(() => {
    gameRef.current = { dinoY: GROUND_Y - DINO_H, velY: 0, obstacles: [], speed: 4, score: 0, frame: 0 };
    setScore(0);
    setGameState("playing");
  }, []);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.dinoY >= GROUND_Y - DINO_H - 1) {
      g.velY = JUMP_VEL;
    }
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const g = gameRef.current;
    const isDark = document.documentElement.classList.contains("dark");
    const fgColor = isDark ? "#d4e4d0" : "#1a2e1a";
    const accentColor = isDark ? "hsl(152,80%,45%)" : "hsl(152,80%,42%)";

    const loop = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      g.frame++;

      // Ground
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_W, GROUND_Y);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = isDark ? "rgba(34,197,94,0.05)" : "rgba(22,163,74,0.05)";
      for (let y = 0; y < CANVAS_H; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
      }

      // Physics
      g.velY += GRAVITY;
      g.dinoY += g.velY;
      if (g.dinoY > GROUND_Y - DINO_H) {
        g.dinoY = GROUND_Y - DINO_H;
        g.velY = 0;
      }

      // Dino
      ctx.fillStyle = accentColor;
      ctx.fillRect(60, g.dinoY, DINO_W, DINO_H);
      // Eye
      ctx.fillStyle = isDark ? "#0a0f0a" : "#fff";
      ctx.fillRect(78, g.dinoY + 6, 6, 6);

      // Spawn obstacles
      if (g.frame % Math.max(100 - Math.floor(g.speed * 5), 60) === 0) {
        const h = 20 + Math.random() * 30;
        g.obstacles.push({ x: CANVAS_W, width: 15 + Math.random() * 10, height: h, passed: false });
      }

      // Update obstacles
      g.obstacles = g.obstacles.filter((o) => o.x > -50);
      g.obstacles.forEach((o) => {
        o.x -= g.speed;

        ctx.fillStyle = fgColor;
        ctx.fillRect(o.x, GROUND_Y - o.height, o.width, o.height);

        // Collision
        if (
          60 + DINO_W > o.x && 60 < o.x + o.width &&
          g.dinoY + DINO_H > GROUND_Y - o.height
        ) {
          setGameState("over");
          return;
        }

        if (!o.passed && o.x + o.width < 60) {
          o.passed = true;
          g.score++;
          setScore(g.score);
        }
      });

      // Speed up
      g.speed = 3 + Math.log2(g.score + 1) * 0.8;

      // Score display
      ctx.fillStyle = fgColor;
      ctx.font = "12px JetBrains Mono, monospace";
      ctx.fillText(`SCORE: ${g.score}`, CANVAS_W - 120, 25);

      if (gameState === "playing") animId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  useEffect(() => {
    if (!isFine.current) return; // touch devices use onTouchStart on the canvas
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (gameState === "playing") jump();
        else resetGame();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gameState, jump, resetGame]);

  return (
    <section className="py-16 px-6 lg:px-12 border-y border-border bg-secondary/20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-[0.6rem] tracking-[0.3em] text-primary uppercase mb-4">
            Easter Egg — Take a break
          </div>
          <h3 className="font-display text-2xl font-bold mb-6">
            Code <span className="text-primary">Runner</span>
          </h3>


          <div
            className="relative inline-block border border-border neon-border overflow-hidden"
            onPointerDown={() => {
              gameState === "playing" ? jump() : resetGame();
            }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="bg-background max-w-full"
              style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
            />

            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="text-center">
                <div className="font-mono text-sm text-muted-foreground mb-2">{isFine.current ? "Press SPACE to start" : "Tap to start"}</div>
                <div className="font-mono text-[0.55rem] text-muted-foreground">Jump over obstacles!</div>
              </div>
            </div>


            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <div className="text-center">
                <div className="font-display text-xl font-bold text-primary mb-1">Game Over</div>
                <div className="font-mono text-sm text-muted-foreground mb-2">Score: {score}</div>
                <div className="font-mono text-[0.55rem] text-muted-foreground">{isFine.current ? "Press SPACE to restart" : "Tap to restart"}</div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DinoGame;
