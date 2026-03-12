import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const HeroSection = () => {
  return (
    <section className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(hsl(var(--unblur-primary)) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Main wordmark */}
      <div className="relative z-10 flex items-baseline">
        <motion.span
          className="text-display text-foreground"
          style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1.2, ease }}
        >
          Un
        </motion.span>
        <motion.span
          className="text-display text-foreground"
          style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
          initial={{ filter: 'blur(20px)', opacity: 0.6 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ delay: 2, duration: 2, ease }}
        >
          Blur
        </motion.span>
      </div>

      {/* Tagline */}
      <motion.p
        className="text-body text-muted-foreground mt-6 text-center px-6"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1, ease }}
      >
        Helping you see your next steps clearly
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span className="text-sm tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
