import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const scrollTo = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 4, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <button onClick={() => scrollTo("home")}>
        <img src={logo} alt="UnBlur" className="h-12 w-12 object-contain" />
      </button>
      <div className="flex items-center gap-8">
        {[
          { label: "Home", id: "home" },
          { label: "Mission", id: "mission" },
          { label: "Approach", id: "process" },
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
