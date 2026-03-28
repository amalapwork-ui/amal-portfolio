import { useEffect, useRef } from "react";

/**
 * Premium custom cursor — dot + lagging ring, neon green.
 * Only mounted when Index.tsx confirms (pointer: fine) && (hover: hover).
 * This internal guard is a defensive fallback — the component should never
 * reach here on mobile, but the check costs nothing and prevents edge-case leaks.
 */
const CustomCursor = () => {
  // Defensive fallback — matches Index.tsx's mount guard.
  const isFine = useRef(window.matchMedia("(pointer: fine) and (hover: hover)").matches);

  const dotRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  const mouse = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);
  const initialized = useRef(false);
  const lastPointerCheck = useRef(0);

  useEffect(() => {
    if (!isFine.current) return;

    document.documentElement.classList.add("cursor-none");

    // --- helpers (direct DOM, no setState) ---
    const setVisible = (v: boolean) => {
      const o = v ? "1" : "0";
      if (dotRef.current) dotRef.current.style.opacity = o;
      if (innerRef.current) innerRef.current.style.opacity = o;
    };

    const updateRingScale = (isPointer: boolean, inProjects: boolean) => {
      if (!innerRef.current) return;
      innerRef.current.style.transform =
        isPointer ? "scale(0.55)" : inProjects ? "scale(1.2)" : "scale(1)";
      if (hintRef.current)
        hintRef.current.style.opacity = inProjects && !isPointer ? "1" : "0";
    };

    // --- event handlers ---
    let curIsPointer = false;
    let curInProjects = false;

    const onMove = (e: MouseEvent) => {
      // Snap ring to cursor on very first move so it doesn't lerp from off-screen
      if (!initialized.current) {
        ring.current = { x: e.clientX, y: e.clientY };
        initialized.current = true;
      }
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Throttle expensive checks to every 50 ms
      const now = performance.now();
      if (now - lastPointerCheck.current > 50) {
        lastPointerCheck.current = now;

        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        let isPointer = false;
        if (el) {
          // getComputedStyle always returns "none" here (cursor-none class is active),
          // so check semantic elements + Tailwind's cursor-pointer class instead.
          isPointer = !!el.closest(
            "a, button, [role='button'], input, textarea, select, label, .cursor-pointer"
          );
        }

        const work = document.getElementById("work");
        const inProjects = work
          ? (() => {
              const r = work.getBoundingClientRect();
              return e.clientY > r.top && e.clientY < r.bottom;
            })()
          : false;

        if (isPointer !== curIsPointer || inProjects !== curInProjects) {
          curIsPointer = isPointer;
          curInProjects = inProjects;
          updateRingScale(isPointer, inProjects);
        }
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // --- RAF animation loop (lerp ring toward dot) ---
    const tick = () => {
      const LERP = 0.12;
      ring.current.x += (mouse.current.x - ring.current.x) * LERP;
      ring.current.y += (mouse.current.y - ring.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      if (outerRef.current) {
        // outerRef is 48×48; offset by half (24) to center on cursor
        outerRef.current.style.transform = `translate(${ring.current.x - 24}px, ${ring.current.y - 24}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Touch / coarse-pointer devices: render nothing.
  // No DOM nodes → no GPU compositing layers → no cursor-none override leaking.
  if (!isFine.current) return null;

  return (
    <>
      {/* Dot — instant tracking */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9999] pointer-events-none"
        style={{ willChange: "transform", opacity: 0, transition: "opacity 0.15s" }}
      />

      {/* Outer wrapper — RAF-controlled translate (no CSS transition on transform) */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-12 h-12 z-[9999] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {/* Inner ring — CSS transitions for scale/opacity only */}
        <div
          ref={innerRef}
          className="w-full h-full rounded-full border border-primary/50 flex items-center justify-center"
          style={{
            opacity: 0,
            transition: "opacity 0.15s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <span
            ref={hintRef}
            className="font-mono text-primary/60 select-none"
            style={{
              fontSize: "0.4rem",
              letterSpacing: "0.18em",
              opacity: 0,
              transition: "opacity 0.2s",
            }}
          >
            ← →
          </span>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
