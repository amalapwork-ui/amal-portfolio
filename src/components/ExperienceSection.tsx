import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => (
  <section id="experience" className="py-24 lg:py-40 px-6 lg:px-12">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-primary uppercase">04</span>
        <div className="h-px w-8 bg-primary" />
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">Experience</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-4xl lg:text-6xl font-bold mb-16">
        Experience That Built <span className="text-primary neon-text"> My Foundation</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border p-8 lg:p-12 hover:border-primary/30 transition-colors duration-500 neon-border">
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h3 className="font-display text-xl font-bold">Full Stack Development Intern</h3>
                <p className="font-mono text-sm text-primary">Faith Infotech Academy</p>
              </div>
              <span className="font-mono text-[0.65rem] text-muted-foreground tracking-widest mt-2 lg:mt-0">SEPT 2025 — FEB 2026</span>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {[
                "Developed RESTful backend APIs using Django REST Framework with serializers, validation & exception handling",
                "Implemented JWT authentication, RBAC, and Django ORM schema design with query optimization",
                "Built ML models (regression, classification, CNN) and NLP preprocessing pipelines",
                "Applied RAG concepts and integrated LLM APIs into real-world mini-projects",
                "Deployed applications on AWS EC2, used Redis caching, followed Agile with Git workflows",
              ].map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ExperienceSection;
