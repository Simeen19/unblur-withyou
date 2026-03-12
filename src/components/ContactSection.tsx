import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
    <section className="min-h-svh flex items-center justify-center bg-background" style={{ padding: '4rem 8vw' }}>
      <div className="w-full max-w-xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-sm font-medium tracking-widest uppercase text-unblur-primary mb-4">
                Get in Touch
              </p>
              <h2
                className="text-display text-foreground mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                Let's build something clear.
              </h2>
              <p className="text-body text-muted-foreground mx-auto mb-10">
                Have a question or want to work with us? Drop us a message.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
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
                    rows={4}
                    maxLength={1000}
                    className="w-full bg-muted border-none rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 shadow-[0_0_0_1px_hsl(var(--border))] focus:shadow-[0_0_0_2px_hsl(var(--ring))] focus:outline-none transition-shadow duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>

              <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-center gap-6 text-sm text-muted-foreground">
                <span>UnBlur.withyou@gmail.com</span>
                <span className="hidden sm:inline">·</span>
                <span>/company/unblurwithyou</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="py-20"
            >
              <div className="w-16 h-16 rounded-full bg-unblur-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-display text-foreground mb-4" style={{ fontSize: '2rem' }}>
                Thank you.
              </h3>
              <p className="text-body text-muted-foreground mx-auto">
                We'll be in touch soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactSection;
