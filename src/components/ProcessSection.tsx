import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const steps = [
  {
    number: "01",
    title: "Identify",
    subtitle: "Identifying Your Skills",
    description:
      "We start by understanding you — your strengths, interests, and hidden talents. Through personalized 1:1 sessions and structured assessments, we map out what makes you unique and where your potential lies.",
    icon: Search,
  },
  {
    number: "02",
    title: "Build",
    subtitle: "Building These Skills",
    description:
      "Once we know your strengths, we help you sharpen them. Through workshops, group sessions, and curated resources, we turn raw potential into real, marketable abilities that set you apart.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Connect",
    subtitle: "Connecting with Industry Experts",
    description:
      "Skills need context. We connect you with industry mentors and professionals through podcasts, networking sessions, and community events — so you can see exactly where your path leads.",
    icon: Users,
  },
];

const ProcessSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="min-h-svh flex items-center bg-muted/30" style={{ padding: '6rem 8vw' }}>
      <div className="w-full max-w-6xl mx-auto">
        <motion.p
          className="text-sm font-medium tracking-widest uppercase text-unblur-primary mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Approach
        </motion.p>
        <motion.h2
          className="text-display text-foreground mb-16"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          Three steps to clarity.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: Step list */}
          <div className="flex flex-col gap-2">
            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActive(i)}
                className={`text-left p-5 rounded-lg transition-all duration-300 border ${
                  active === i
                    ? 'bg-background border-border shadow-lg shadow-unblur-glow/10'
                    : 'bg-transparent border-transparent hover:bg-background/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-display transition-colors duration-300 ${
                      active === i ? 'text-unblur-primary' : 'text-muted-foreground/30'
                    }`}
                    style={{ fontSize: '2rem' }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <span
                      className={`text-lg font-bold transition-colors duration-300 ${
                        active === i ? 'text-foreground' : 'text-muted-foreground/50'
                      }`}
                    >
                      {step.title}
                    </span>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        active === i ? 'text-muted-foreground' : 'text-muted-foreground/30'
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Active step content */}
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease }}
                className="w-full"
              >
                <div className="p-8 rounded-2xl bg-background border border-border shadow-xl shadow-unblur-glow/5">
                  <div className="w-12 h-12 rounded-xl bg-unblur-primary/10 flex items-center justify-center mb-6">
                    {(() => {
                      const Icon = steps[active].icon;
                      return <Icon className="w-6 h-6 text-unblur-primary" />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {steps[active].subtitle}
                  </h3>
                  <p className="text-body text-muted-foreground">
                    {steps[active].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
