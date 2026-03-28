// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

// const ContactSection = () => (
//   <section id="contact" className="py-24 lg:py-40 px-6 lg:px-12">
//     <div className="max-w-7xl mx-auto">
//       <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
//         <span className="font-mono text-[0.65rem] tracking-[0.3em] text-primary uppercase">06</span>
//         <div className="h-px w-8 bg-primary" />
//         <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">Contact</span>
//       </motion.div>
//       <div className="grid lg:grid-cols-2 gap-16">
//         <div>
//           <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-4xl lg:text-6xl font-bold mb-8">
//             Let's build something <span className="text-primary neon-text">great</span>
//           </motion.h2>
//           <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground leading-relaxed mb-10">
//             Whether you have a project in mind, a job opportunity, or just want to connect — I'm always open to conversations about tech, AI, and building cool stuff.
//           </motion.p>
//           <div className="space-y-4">
//             {[
//               { icon: Mail, label: "amalapdev2001@gmail.com", href: "mailto:amalapdev2001@gmail.com" },
//               { icon: Phone, label: "+91 7356790062", href: "tel:+917356790062" },
//               { icon: MapPin, label: "Kerala, India", href: "#" },
//             ].map((item, i) => (
//               <motion.a key={item.label} href={item.href} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 group">
//                 <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
//                   <item.icon size={16} />
//                 </div>
//                 <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">{item.label}</span>
//               </motion.a>
//             ))}
//           </div>
//           <div className="flex gap-4 mt-8">
//             {[
//               { icon: Github, href: "https://github.com/amalapwork-ui", label: "GitHub" },
//               { icon: Linkedin, href: "https://linkedin.com/in/amalap", label: "LinkedIn" },
//             ].map((s) => (
//               <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300">
//                 <s.icon size={16} />
//               </a>
//             ))}
//           </div>
//         </div>
//         <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border p-8 lg:p-10">
//           <h3 className="font-display text-lg font-bold mb-6">Send a message</h3>
//           <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
//             <div>
//               <label className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase mb-2 block">Name</label>
//               <input className="w-full bg-transparent border-b border-border py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="Your name" />
//             </div>
//             <div>
//               <label className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase mb-2 block">Email</label>
//               <input className="w-full bg-transparent border-b border-border py-3 text-sm focus:border-primary outline-none transition-colors" placeholder="your@email.com" type="email" />
//             </div>
//             <div>
//               <label className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase mb-2 block">Message</label>
//               <textarea className="w-full bg-transparent border-b border-border py-3 text-sm focus:border-primary outline-none transition-colors resize-none" rows={4} placeholder="Tell me about your project..." />
//             </div>
//             <button className="font-mono text-xs tracking-widest uppercase px-8 py-4 bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-500 w-full">
//               Send Message
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   </section>
// );

// export default ContactSection;
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  // ✅ state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ✅ WhatsApp handler
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    const phone = "917356790062";

    const text = `Hello Amal,%0A
Name: ${name}%0A
Email: ${email}%0A
Message: ${message}`;

    const url = `https://wa.me/${phone}?text=${text}`;

    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="py-24 lg:py-40 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-primary uppercase">06</span>
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">Contact</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-4xl lg:text-6xl font-bold mb-8">
              Let's build something <span className="text-primary neon-text">great</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground leading-relaxed mb-10">
              Whether you have a project in mind, a job opportunity, or just want to connect — I'm always open to conversations about tech, AI, and building cool stuff.
            </motion.p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "amalapdev2001@gmail.com", href: "mailto:amalapdev2001@gmail.com" },
                { icon: Phone, label: "+91 7356790062", href: "tel:+917356790062" },
                { icon: MapPin, label: "Kerala, India", href: "#" },
              ].map((item, i) => (
                <motion.a key={item.label} href={item.href} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                    <item.icon size={16} />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">{item.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { icon: Github, href: "https://github.com/amalapwork-ui", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/amalap", label: "LinkedIn" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border border-border p-8 lg:p-10">
            <h3 className="font-display text-lg font-bold mb-6">Send a message</h3>

            {/* ✅ UPDATED FORM */}
            <form onSubmit={handleSend} className="space-y-5">

              <div>
                <label className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase mb-2 block">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase mb-2 block">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-3 text-sm focus:border-primary outline-none transition-colors"
                  placeholder="your@email.com"
                  type="email"
                />
              </div>

              <div>
                <label className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase mb-2 block">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-border py-3 text-sm focus:border-primary outline-none transition-colors resize-none"
                  rows={4}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                disabled={!name || !email || !message}
                className="font-mono text-xs tracking-widest uppercase px-8 py-4 bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-500 w-full">
                Send Message
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;