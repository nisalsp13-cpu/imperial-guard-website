import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, Send, Phone, Mail, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { saveSubmission, sendSubmissionEmail, TARGET_EMAIL } from "@/lib/submissions";

type QuoteSearch = { service?: string };

export const Route = createFileRoute("/quote")({
  validateSearch: (s: Record<string, unknown>): QuoteSearch => ({
    service: typeof s.service === "string" ? s.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Get a Free Quote — Imperial Security & Consultants" },
      { name: "description", content: "Request a free, no-obligation security quote tailored to your premises and risk profile." },
    ],
  }),
  component: QuotePage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(10, "Please describe your requirements (min 10 chars)").max(2000),
});

function QuotePage() {
  const { service: prefilled } = Route.useSearch();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const entry = saveSubmission({ kind: "quote", ...parsed.data });
    const ok = await sendSubmissionEmail(entry);
    setLoading(false);
    if (ok) {
      toast.success("Your quote request has been sent successfully");
    } else {
      toast.message("Saved locally", { description: "We've stored your request — email delivery will retry." });
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="container-page py-24">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-elegant">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-gradient text-primary-foreground shadow-glow">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold">Thank you!</h1>
          <p className="mt-3 text-muted-foreground">
            Your quote request has been sent successfully. A member of our team will be in touch within one business day.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="tel:+94714715299" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-accent">
              <Phone className="h-4 w-4" /> +94 71 471 5299
            </a>
            <a href={`mailto:${TARGET_EMAIL}`} className="inline-flex items-center gap-2 rounded-lg bg-primary-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 transition-smooth">
              <Mail className="h-4 w-4" /> Email us
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container-page py-16 md:py-20">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--gold)]">Get a quote</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Tell us what you need to protect.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            Share a few details and our security consultants will respond with a tailored proposal within one business day.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-10">
          <form onSubmit={onSubmit} className="space-y-5">
            <Field label="Full Name" name="name" placeholder="John Perera" required />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
              <Field label="Phone Number" name="phone" type="tel" placeholder="+94 7X XXX XXXX" required />
            </div>
            <div>
              <Label>Type of Security Needed</Label>
              <select
                name="service"
                required
                defaultValue={prefilled ?? ""}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                <option value="" disabled>Select a service…</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
                <option value="other">Other / Multiple</option>
              </select>
            </div>
            <div>
              <Label>Message / Requirements</Label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us about your premises, location, and any specific concerns…"
                className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-gradient px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-card-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elegant disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Sending…" : "Submit Quote Request"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to be contacted regarding your security inquiry. Your details remain confidential.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-foreground">{children}</label>;
}

function Field({
  label, name, type = "text", placeholder, required,
}: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
