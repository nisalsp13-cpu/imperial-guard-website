import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Award, Users, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { MOD_REG } from "@/components/site/Footer";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imperial Security & Consultants — Elite Security Solutions in Sri Lanka" },
      { name: "description", content: "Ministry of Defence registered. Commercial, industrial, residential, cash-in-transit and investigation services across Sri Lanka." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO — full-viewport background */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden text-white">
        {/* Fixed background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ backgroundImage: "url('/assets/hero-guard.png')" }}
          aria-hidden
        />
        {/* Dark overlays for readability — stronger on the left, lighter on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,15,38,0.85) 0%, rgba(7,15,38,0.65) 35%, rgba(7,15,38,0.35) 60%, rgba(7,15,38,0.15) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/20 md:bg-transparent" aria-hidden />

        {/* Content */}
        <div className="container-page relative z-10 flex h-full flex-col justify-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-[color:var(--gold)]" />
              Ministry of Defence Registered
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-7xl">
              Imperial Security<br />
              <span className="text-[color:var(--gold)]">&amp; Consultants</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium text-white/90 drop-shadow-md sm:text-xl">
              Professional Protection, Unmatched Reliability.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--gold)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[#0b1230] shadow-elegant transition-smooth hover:-translate-y-0.5 hover:brightness-110 sm:text-base"
              >
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-smooth hover:bg-white/15 sm:text-base"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 hidden max-w-sm rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur sm:block">
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[color:var(--gold)]">
                MoD Registration No.
              </div>
              <div className="mt-1 font-mono text-sm font-semibold break-all">{MOD_REG}</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container-page grid grid-cols-2 gap-4 py-12 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, label: "MoD Registered", value: "Licensed" },
            { icon: Clock, label: "Response", value: "24/7" },
            { icon: Users, label: "Trained Officers", value: "120+" },
            { icon: Award, label: "Years of Service", value: "20+" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-smooth hover:bg-white/15"
            >
              <s.icon className="h-7 w-7 text-[color:var(--gold)]" />
              <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs font-medium tracking-wider uppercase text-primary-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>


      {/* SERVICES OVERVIEW */}
      <section className="container-page py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary-glow">What we do</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
              A full spectrum of <span className="text-gradient">security services</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              From boardrooms to factory floors, gated estates to armed cash transit — one trusted partner for every layer of protection.
            </p>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-glow">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => (
            <div
              key={s.slug}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-gradient text-primary-foreground shadow-card-soft">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
              <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-subtle-gradient">
        <div className="container-page py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary-glow">Why Imperial</div>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                Trusted by those who can't afford to compromise.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our standards are forged in military discipline and refined for modern corporate environments. Every officer, protocol and patrol is built around one principle — uncompromising protection.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Ex-Air Force leadership with elite tactical training",
                  "Ministry of Defence licensed & fully insured",
                  "Strict vetting, training and uniform standards",
                  "24/7 operations control room and rapid response",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground/85">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-primary-gradient p-10 text-primary-foreground shadow-elegant">
                <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--gold)]">Get protected</div>
                <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  Request a free, no-obligation security assessment.
                </h3>
                <p className="mt-3 text-primary-foreground/85">
                  Tell us your premises and risk profile — we'll respond within one business day with a tailored proposal.
                </p>
                <Link
                  to="/quote"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary transition-smooth hover:-translate-y-0.5"
                >
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
