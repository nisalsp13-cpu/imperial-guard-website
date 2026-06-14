import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/quote", label: "Get a Quote" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-4" onClick={() => setOpen(false)}>
          <img src={logo} alt="Imperial Security & Consultants" className="h-20 w-20 shrink-0 object-contain" />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-xl font-bold text-primary sm:text-2xl">Imperial Security</div>
            <div className="truncate text-sm font-medium tracking-wider text-muted-foreground uppercase">& Consultants</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-primary"
              activeProps={{ className: "rounded-md px-4 py-2 text-sm font-semibold text-primary bg-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/quote"
            className="ml-2 inline-flex items-center justify-center rounded-md bg-primary-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card-soft transition-smooth hover:shadow-elegant hover:-translate-y-0.5"
          >
            Free Quote
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-primary"
                activeProps={{ className: "rounded-md px-3 py-3 text-sm font-semibold text-primary bg-accent" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
