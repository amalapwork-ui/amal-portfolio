import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const certs = ["Python Essentials 1 — Cisco", "AWS Cloud Quest — AWS", "Data Science Orientation — IBM"];

const EducationSection = () => (
  <section className="py-24 lg:py-40 px-6 lg:px-12 bg-secondary/30">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-primary uppercase">05</span>
        <div className="h-px w-8 bg-primary" />
        <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">Education</span>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border p-8 hover:border-primary/30 transition-colors duration-500">
          <GraduationCap className="w-6 h-6 text-primary mb-6" />
          <h3 className="font-display text-xl font-bold mb-2">B.Tech in Computer Science</h3>
          <p className="text-sm text-muted-foreground mb-1">Marian Engineering College</p>
          <p className="font-mono text-[0.6rem] text-primary tracking-widest">APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY — 2024</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="border border-border p-8 hover:border-primary/30 transition-colors duration-500">
          <Award className="w-6 h-6 text-primary mb-6" />
          <h3 className="font-display text-xl font-bold mb-4">Certifications</h3>
          <ul className="space-y-3">
            {certs.map((c) => (
              <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default EducationSection;
