import { motion } from "framer-motion";

const items = ["Full Stack", "•", "AI / ML", "•", "Django", "•", "React", "•", "RAG", "•", "LLM", "•", "FastAPI", "•", "TensorFlow", "•", "AWS", "•", "Docker", "•"];

const Marquee = () => (
  <div className="relative z-0 mt-16 py-6 border-y border-border overflow-hidden bg-secondary/50">
    <div className="animate-marquee flex whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className={`mx-6 font-mono text-sm tracking-widest uppercase ${item === "•" ? "text-primary" : "text-muted-foreground"}`}>
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
