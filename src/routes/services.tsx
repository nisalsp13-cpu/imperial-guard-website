import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Factory, Home, Search, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Security Services — Imperial Security & Consultants" },
      { name: "description", content: "Commercial, industrial, residential, private investigation and cash-in-transit security services across Sri Lanka." },
    ],
  }),
  component: ServicesPage,
});

const ICONS = {
  commercial: Building2,
  industrial: Factory,
  residential: Home,
  investigation: Search,
  cit: Truck,
} as const;

function ServicesPage() {
  return (
    <>
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container-page py-16 md:py-20">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--gold)]">Our services</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Protection engineered for every environment.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            Five core service lines — one disciplined standard. Choose the protection that fits your operation.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.slug];
            return (
              <article
                key={s.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card-soft transition-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-card-soft">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="mt-6 font-display text-xl font-bold">{s.title}</h2>
                <p className="mt-1 text-sm font-medium text-primary-glow">{s.short}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <Link
                  to="/quote"
                  search={{ service: s.slug } as never}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                >
                  Request a quote <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary-gradient p-7 text-primary-foreground shadow-elegant">
            <div>
              <ShieldCheck className="h-9 w-9 text-[color:var(--gold)]" />
              <h2 className="mt-5 font-display text-xl font-bold">Not sure what you need?</h2>
              <p className="mt-3 text-sm text-primary-foreground/85">
                Our consultants will assess your site and recommend the right combination of officers, technology and protocols.
              </p>
            </div>
            <Link to="/quote" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary transition-smooth hover:-translate-y-0.5">
              Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
