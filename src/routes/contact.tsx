import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, Clock } from "lucide-react";
import { saveSubmission, sendSubmissionEmail, TARGET_EMAIL } from "@/lib/submissions";
import { MOD_REG } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Imperial Security & Consultants" },
      { name: "description", content: "Reach Imperial Security & Consultants at No. 9, Vijaya Road, Mount Lavinia. Call +94 71 471 5299." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(2000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const entry = saveSubmission({ kind: "contact", ...parsed.data, phone: raw.phone || undefined });
    const ok = await sendSubmissionEmail(entry);
    setLoading(false);
    if (ok) toast.success("Your message has been sent successfully");
    else toast.message("Saved locally", { description: "We've stored your message — email delivery will retry." });
    setSent(true);
  }

  return (
    <>
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container-page py-16 md:py-20">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--gold)]">Contact us</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            We're here, around the clock.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            Reach our Mount Lavinia headquarters by phone, email or visit us in person.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* INFO */}
          <div className="space-y-4">
            <InfoCard icon={MapPin} title="Head Office">
              No. 9, Vijaya Road,<br />Mount Lavinia, Sri Lanka
            </InfoCard>
            <InfoCard icon={Phone} title="Call Us">
              <a href="tel:+94714715299" className="block hover:text-primary">+94 71 471 5299</a>
              <a href="tel:+94703100008" className="block hover:text-primary">+94 70 310 0008</a>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href={`mailto:${TARGET_EMAIL}`} className="break-all hover:text-primary">{TARGET_EMAIL}</a>
            </InfoCard>
            <InfoCard icon={Clock} title="Operations">
              24 / 7 Operations Control Room<br />Office: Mon–Sat · 9:00 – 18:00
            </InfoCard>
            <div className="rounded-2xl border border-border bg-primary-gradient p-5 text-primary-foreground shadow-card-soft">
              <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--gold)]">MoD Registration</div>
              <div className="mt-1.5 font-mono text-sm font-semibold break-all">{MOD_REG}</div>
            </div>
          </div>

          {/* FORM + MAP */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border shadow-card-soft">
              <iframe
                title="Imperial Security location — Mount Lavinia"
                src="https://www.google.com/maps?q=Vijaya+Road,+Mount+Lavinia,+Sri+Lanka&output=embed"
                className="block h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft sm:p-8">
              <h2 className="font-display text-xl font-bold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">We'll respond within one business day.</p>

              {sent ? (
                <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="mt-3 font-display text-lg font-bold">Thank you!</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Your message has been sent successfully.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="name" label="Name" required />
                    <Input name="email" label="Email" type="email" required />
                  </div>
                  <Input name="phone" label="Phone (optional)" type="tel" />
                  <div>
                    <label className="text-sm font-semibold">Message</label>
                    <textarea name="message" rows={4} required
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-card-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elegant disabled:opacity-70">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card-soft transition-smooth hover:border-primary/30">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-gradient text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground">{title}</div>
        <div className="mt-1 text-sm font-medium text-foreground">{children}</div>
      </div>
    </div>
  );
}

function Input({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input name={name} type={type} required={required}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
