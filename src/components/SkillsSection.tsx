import { motion } from "framer-motion";
import { Code2, Brain, Database, Cloud, Terminal, Cpu, BarChart3, Globe } from "lucide-react";

const skillGroups = [
  { title: "Backend", icon: Terminal, skills: ["Django", "Django DRF", "FastAPI", "REST APIs", "JWT/RBAC"] },
  { title: "Frontend", icon: Globe, skills: ["React", "JavaScript", "HTML5/CSS3", "Tailwind CSS"] },
  { title: "AI / GenAI", icon: Brain, skills: ["RAG", "LangChain", "LLM APIs", "Prompt Engineering", "NLP"] },
  { title: "ML / DL", icon: Cpu, skills: ["TensorFlow", "Scikit-learn", "EfficientNet", "YOLOv8", "Hugging Face"] },
  { title: "Databases", icon: Database, skills: ["PostgreSQL", "MySQL", "FAISS", "Chroma", "Django ORM"] },
  { title: "DevOps", icon: Cloud, skills: ["AWS EC2", "Docker", "Git", "Postman"] },
  { title: "Languages", icon: Code2, skills: ["Python", "SQL", "JavaScript", "TypeScript"] },
  { title: "Data & Viz", icon: BarChart3, skills: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Streamlit"] },
];

const SkillsSection = () => (
  <section id="skills" className="py-16 lg:py-40 px-6 lg:px-12 bg-secondary/30">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-10 lg:mb-16">
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-primary uppercase">03</span>
        <div className="h-px w-8 bg-primary" />
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">Arsenal</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl lg:text-6xl font-bold mb-10 lg:mb-16">
        Tech <span className="text-primary neon-text">Stack</span>
      </motion.h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {skillGroups.map((group, i) => (
          <motion.div key={group.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6 }}
            className="border border-border p-4 sm:p-5 hover:border-primary/50 transition-all duration-500 group bg-card/50"
          >
            <group.icon className="w-5 h-5 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-sm font-bold mb-4 tracking-wide">{group.title}</h3>
            <div className="space-y-2">
              {group.skills.map((s) => (
                <div key={s} className="font-mono text-[0.65rem] text-muted-foreground tracking-wider">{s}</div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
