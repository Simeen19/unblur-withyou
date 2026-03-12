import { motion } from "framer-motion";

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-bold text-lg text-foreground tracking-tight">UnBlur</span>
      <div className="flex items-center gap-8">
        {[
          { label: "Mission", id: "mission" },
          { label: "Process", id: "process" },
          { label: "Contact", id: "contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {item.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
