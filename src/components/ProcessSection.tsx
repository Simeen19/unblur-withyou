import { motion, useInView } from "framer-motion";
import { Search, Zap, Users } from "lucide-react";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  {
    number: "01",
    title: "Identify",
    subtitle: "Identify Your Skills",
    description:
      "We start by understanding you, your strengths, interests, and hidden talents. Through personalized sessions and assessments, we map out what makes you unique.",
    icon: Search,
    color: "#3B1A47", // Deep
  },
  {
    number: "02",
    title: "Build",
    subtitle: "Build These Skills",
    description:
      "Once we know your strengths, we help you sharpen them. Through workshops, group sessions, and curated resources, we turn raw potential into real abilities.",
    icon: Zap,
    color: "#6A4C93", // Primary
  },
  {
    number: "03",
    title: "Connect",
    subtitle: "Connect with Experts",
    description:
      "Skills need context. We connect you with industry mentors and professionals through podcasts, networking sessions, and community events.",
    icon: Users,
    color: "#B49FCC", // Light
  },
];

const IsometricStep = ({ 
  index, 
  color, 
  isActive, 
  onHover 
}: { 
  index: number; 
  color: string; 
  isActive: boolean;
  onHover: (index: number | null) => void;
}) => {
  // Isometric constants
  const stepWidth = 140;
  const stepHeight = 40;
  const xOffset = index * 60;
  const yOffset = -index * 50;

  return (
    <motion.g
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2, ease }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Side Face (Darker) */}
      <motion.path
        d={`M ${xOffset + stepWidth},${yOffset} L ${xOffset + stepWidth},${yOffset + stepHeight} L ${xOffset + stepWidth - 60},${yOffset + stepHeight + 35} L ${xOffset + stepWidth - 60},${yOffset + 35} Z`}
        fill={color}
        filter="brightness(0.6)"
        animate={{ 
          filter: isActive ? "brightness(0.8)" : "brightness(0.6)"
        }}
      />
      
      {/* Front Face (Medium) */}
      <motion.path
        d={`M ${xOffset},${yOffset + stepHeight} L ${xOffset + stepWidth - 60},${yOffset + stepHeight + 35} L ${xOffset + stepWidth - 60},${yOffset + 35} L ${xOffset},${yOffset} Z`}
        fill={color}
        filter="brightness(0.8)"
        animate={{ 
          filter: isActive ? "brightness(1)" : "brightness(0.8)"
        }}
      />

      {/* Top Face (Original Color) */}
      <motion.path
        d={`M ${xOffset},${yOffset} L ${60 + xOffset},${-35 + yOffset} L ${stepWidth + xOffset},${yOffset} L ${stepWidth - 60 + xOffset},${35 + yOffset} Z`}
        fill={isActive ? "#C499FF" : color}
        stroke="#000"
        strokeWidth="1.5"
        animate={{ 
          y: isActive ? -10 : 0,
          fill: isActive ? "#C499FF" : color 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.g>
  );
};

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="min-h-svh flex items-center bg-background overflow-hidden" style={{ padding: '8rem 8vw' }}>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Story & Steps */}
        <div ref={containerRef}>
          <motion.p
            className="text-sm font-medium tracking-widest uppercase text-unblur-primary mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            Our Approach
          </motion.p>
          <motion.h2
            className="text-display text-foreground mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            A path designed <br /> for <span className="text-unblur-primary">growth.</span>
          </motion.h2>

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className={`group relative pl-8 border-l-2 transition-all duration-500 ${
                  activeStep === i 
                    ? "border-unblur-primary opacity-100" 
                    : "border-border opacity-60 hover:opacity-100"
                }`}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xs font-bold tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{step.subtitle}</h3>
                </div>
                <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                  {step.description}
                </p>
                
                {/* Visual highlight bar */}
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-unblur-primary"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: activeStep === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Isometric Animation */}
        <div className="relative flex items-center justify-center p-4">
          <div className="w-full aspect-square max-w-md relative">
            {/* Background glow */}
            <motion.div 
              className="absolute inset-0 bg-unblur-primary/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            <svg 
              viewBox="0 0 450 450" 
              className="w-full h-full relative z-10 drop-shadow-2xl"
              style={{ overflow: 'visible' }}
            >
              {/* The Base Wall/Block inspired by the image */}
              <motion.path
                d="M 120,320 L 120,120 L 360,120 L 360,320 L 240,390 L 120,320 Z"
                fill="#FDFCFB"
                stroke="#000"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease }}
              />

              {/* Inner detail lines for the block */}
              <path 
                d="M 130,312 L 130,130 L 350,130 L 350,312 L 240,378 L 130,312 Z" 
                fill="none" 
                stroke="#000" 
                strokeWidth="1" 
                opacity="0.2"
              />

              {/* Steps */}
              <g transform="translate(120, 320)">
                {steps.map((step, i) => (
                  <IsometricStep 
                    key={step.number}
                    index={i}
                    color={step.color}
                    isActive={activeStep === i}
                    onHover={setActiveStep}
                  />
                ))}
              </g>

              {/* Decorative stars from the palette image */}
              {[...Array(3)].map((_, i) => (
                <motion.path
                  key={i}
                  d="M 0,-20 Q 0,0 20,0 Q 0,0 0,20 Q 0,0 -20,0 Q 0,0 0,-20 Z"
                  fill={steps[i].color}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { 
                    opacity: [0.2, 0.5, 0.2], 
                    scale: 0.3 + (i * 0.1),
                    x: [350 - i*80, 360 - i*80, 350 - i*80],
                    y: [100 + i*100, 90 + i*100, 100 + i*100]
                  } : {}}
                  transition={{ delay: 1.5 + i * 0.3, duration: 4, repeat: Infinity }}
                />
              ))}
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
