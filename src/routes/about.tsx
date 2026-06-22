import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Target, Eye, Heart, Award } from "lucide-react";
import md from "@/assets/managing-director.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Imperial Security & Consultants" },
      { name: "description", content: "Ex-Air Force leadership, military discipline and decades of security expertise serving Sri Lanka." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", text: "Honest, transparent operations — every officer accountable to the highest ethical standard." },
  { icon: Target, title: "Discipline", text: "Military-grade training and protocols applied to every assignment, every shift." },
  { icon: Eye, title: "Vigilance", text: "Round-the-clock awareness, proactive threat assessment and rapid response." },
  { icon: Heart, title: "Service", text: "Courteous, professional officers who represent your brand with pride." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container-page py-16 md:py-20">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--gold)]">About us</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Built on discipline. Driven by trust.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            Imperial Security & Consultants (Pvt) Ltd is a Ministry of Defence registered security firm headquartered in
            Mount Lavinia, Sri Lanka — protecting homes, businesses and high-value operations with elite, military-grade standards.
          </p>
        </div>
      </section>

      {/* Background */}
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary-glow">Our story</div>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">A legacy of protection.</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                Founded on the principles of military precision and modern corporate professionalism, Imperial Security
                has grown into one of Sri Lanka's most trusted private security providers. We safeguard offices,
                factories, gated communities, cash logistics and confidential investigations across the island.
              </p>
              <p>
                Every officer who wears our uniform is rigorously vetted, trained and supervised. Every contract is
                supported by a 24/7 operations control room, transparent reporting and an unwavering commitment to client trust.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-smooth hover:-translate-y-1 hover:border-primary/30">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-gradient text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Director */}
      <section className="bg-subtle-gradient">
        <div className="container-page py-20">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary-glow">Leadership</div>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">From the Managing Director.</h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[380px_1fr] lg:items-center">
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="absolute -inset-4 rounded-3xl bg-primary-gradient opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
                <img src={md} alt="Managing Director, Imperial Security & Consultants" className="aspect-[4/5] w-full object-cover" />
                <div className="border-t border-border bg-card p-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-primary">
                    <Award className="h-3.5 w-3.5" /> Ex-Sri Lanka Air Force
                  </div>
                  <div className="mt-3 font-display text-lg font-bold">Managing Director</div>
                  <div className="text-sm text-muted-foreground">Imperial Security & Consultants (Pvt) Ltd</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>
                Imperial Security is led by an <strong className="text-primary">ex-Sri Lanka Air Force</strong> veteran whose
                career was built on elite military discipline, strategic risk management and high-intensity tactical training.
                That same standard now defines every aspect of how we operate.
              </p>
              <p>
                His leadership instils a culture of strict operational protocols, sharp situational awareness and uncompromising
                accountability across every officer and assignment. From planning a residential protection detail to coordinating
                an armed cash-in-transit movement, every decision is informed by years of front-line experience and structured
                military doctrine.
              </p>
              <p>
                It is this fusion of <strong>military precision</strong> and <strong>modern corporate professionalism</strong> that
                gives our clients confidence — knowing their people, premises and assets are protected by a team trained to a standard
                far beyond the industry norm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
