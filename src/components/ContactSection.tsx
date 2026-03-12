import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const socials = [
  {
    icon: Mail,
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=UnBlur.withyou@gmail.com",
    label: "Email",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/unblurwithyou",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/unblur.withyou",
    label: "Instagram",
  },
];

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", reason: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.reason.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 255),
      reason: form.reason.trim().slice(0, 1000),
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSubmitted(true);
    toast.success("Message sent successfully!");
  };

  return (
    <section className="min-h-svh flex flex-col justify-center bg-background" style={{ padding: '6rem 8vw' }}>
      <div className="w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
            >
          
              <h2
                className="text-display text-foreground mb-3 text-center"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
              >
               Get in Touch
              </h2>
              

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    maxLength={100}
                    className="w-full bg-muted border-none rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 shadow-[0_0_0_1px_hsl(var(--border))] focus:shadow-[0_0_0_2px_hsl(var(--ring))] focus:outline-none transition-shadow duration-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    maxLength={255}
                    className="w-full bg-muted border-none rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 shadow-[0_0_0_1px_hsl(var(--border))] focus:shadow-[0_0_0_2px_hsl(var(--ring))] focus:outline-none transition-shadow duration-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Reason to Connect</label>
                  <textarea
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    placeholder="Tell us why you'd like to connect with UnBlur..."
                    rows={3}
                    maxLength={1000}
                    className="w-full bg-muted border-none rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 shadow-[0_0_0_1px_hsl(var(--border))] focus:shadow-[0_0_0_2px_hsl(var(--ring))] focus:outline-none transition-shadow duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-unblur-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-display text-foreground mb-4" style={{ fontSize: '2rem' }}>
                Thank you.
              </h3>
              <p className="text-muted-foreground">
                We'll be in touch soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Social links footer */}
      <div className="w-full max-w-2xl mx-auto mt-16 pt-8 border-t border-border">
        <p className="text-xs text-muted-foreground text-center mb-5 tracking-widest uppercase">
          Connect with us
        </p>
        <div className="flex justify-center items-center gap-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <s.icon className="w-5 h-5 group-hover:text-unblur-primary transition-colors duration-200" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
