const Footer = () => (
  <footer className="py-12 px-6 lg:px-12 border-t border-border">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="font-display text-sm font-bold">
        <span className="text-primary">A</span>mal<span className="text-primary">.</span>
      </div>
      <div className="font-mono text-[0.6rem] text-muted-foreground tracking-widest">
        © {new Date().getFullYear()} AMAL A P — BUILT WITH PASSION
      </div>
      <div className="flex gap-6">
        <a href="https://github.com/amalapwork-ui" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase">GitHub</a>
        <a href="https://linkedin.com/in/amalap" target="_blank" rel="noopener noreferrer" className="font-mono text-[0.6rem] text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase">LinkedIn</a>
      </div>
    </div>
  </footer>
);

export default Footer;
