import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";

export const MOD_REG = "MOD/CIS/11/PS/01/570/005/561";

export function Footer() {
  return (
    <footer className="mt-24 bg-hero-gradient text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-lg bg-white/95 p-1.5" />
            <div className="font-display text-lg font-bold">Imperial Security</div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            Elite, disciplined security solutions trusted by Sri Lanka's leading homes, businesses and institutions.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider uppercase text-primary-foreground/90">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/quote" className="hover:text-white">Get a Quote</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider uppercase text-primary-foreground/90">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> No. 9, Vijaya Road, Mount Lavinia</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> <a href="tel:+94714715299" className="hover:text-white">+94 71 471 5299</a></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> <a href="tel:+94703100008" className="hover:text-white">+94 70 310 0008</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <a href="mailto:imperial.aqua.consultants@gmail.com" className="break-all hover:text-white">imperial.aqua.consultants@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wider uppercase text-primary-foreground/90">Registered & Licensed</h4>
          <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[color:var(--gold)]">
              <ShieldCheck className="h-4 w-4" /> Ministry of Defence
            </div>
            <div className="mt-2 font-mono text-xs leading-relaxed text-primary-foreground/90 break-all">
              {MOD_REG}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-primary-foreground/70 sm:flex-row">
          <div>© {new Date().getFullYear()} Imperial Security & Consultants (Pvt) Ltd. All rights reserved.</div>
          <div>MOD Reg: <span className="font-mono">{MOD_REG}</span></div>
        </div>
      </div>
    </footer>
  );
}
