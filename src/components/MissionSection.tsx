import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex items-center overflow-hidden"
      style={{ padding: '0 8vw' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(var(--unblur-light)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--unblur-light)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, hsl(var(--unblur-glow)), transparent 70%)' }}
      />

      <motion.div className="relative z-10 max-w-4xl" style={{ y, opacity }}>
        <motion.p className="text-sm font-medium tracking-widest uppercase text-unblur-primary mb-6">
          Our Mission
        </motion.p>

        <h2
          className="text-display text-foreground mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Clarity as a service.
        </h2>

        <p className="text-body text-muted-foreground mb-8" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
          80% of students feel lost about their career path. Young adults face decision paralysis,
          self-doubt, and lack of direction. Traditional guidance often feels impersonal or too late.
        </p>

        <div className="w-16 h-px bg-unblur-primary opacity-40 mb-8" />

        <div>
          <p className="text-sm font-medium tracking-widest uppercase text-unblur-primary mb-4">
            Our Vision
          </p>
          <p className="text-body text-muted-foreground" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
            A guidance system helping students and young professionals take practical
            next steps with confidence — through relatable mentorship, actionable clarity steps,
            and human guidance powered by future AI insights.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionSection;
