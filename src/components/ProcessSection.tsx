import { motion } from "framer-motion";
import { Search, Zap, Users } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  {
    number: "01",
    title: "Identify",
    subtitle: "Identifying Your Skills",
    description:
      "We start by understanding you — your strengths, interests, and hidden talents. Through personalized 1:1 sessions and structured assessments, we map out what makes you unique.",
    icon: Search,
    color: "#3B1A47",
  },
  {
    number: "02",
    title: "Build",
    subtitle: "Building These Skills",
    description:
      "Once we know your strengths, we help you sharpen them. Through workshops, group sessions, and curated resources, we turn raw potential into real, marketable abilities.",
    icon: Zap,
    color: "#6A4C93",
  },
  {
    number: "03",
    title: "Connect",
    subtitle: "Connecting with Industry Experts",
    description:
      "Skills need context. We connect you with industry mentors and professionals through podcasts, networking sessions, and community events.",
    icon: Users,
    color: "#B49FCC",
  },
];

const ProcessSection = () => {
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
          className="text-display text-foreground mb-20"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          Three steps to clarity.
        </motion.h2>

        {/* Staircase / Ladder layout */}
        <div className="relative flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex"
              style={{ paddingLeft: `${i * 12}%` }}
              initial={{ opacity: 0, x: -40, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2, ease }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="absolute left-1/2 bottom-0 w-px h-8 -mb-8 z-0"
                  style={{ backgroundColor: step.color, opacity: 0.3, left: `calc(${i * 12}% + 2rem)` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.4, ease }}
                />
              )}

              <motion.div
                className="relative flex items-start gap-6 p-8 rounded-2xl bg-background border border-border w-full max-w-2xl"
                style={{
                  boxShadow: `0 8px 32px -8px ${step.color}20`,
                  borderLeft: `4px solid ${step.color}`,
                }}
                whileHover={{ y: -4, boxShadow: `0 16px 48px -12px ${step.color}30` }}
                transition={{ duration: 0.25 }}
              >
                {/* Step number block */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <span
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-5 h-5 flex-shrink-0" style={{ color: step.color }} />
                    <h3 className="text-xl font-bold text-foreground">{step.subtitle}</h3>
                  </div>
                  <p className="text-body text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Spacer for staircase gap */}
              {i < steps.length - 1 && <div className="h-8" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
