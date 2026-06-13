import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSubmissions, clearSubmissions, type QuoteSubmission } from "@/lib/submissions";
import { Trash2, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/admin/submissions")({
  head: () => ({ meta: [{ title: "Submissions — Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [items, setItems] = useState<QuoteSubmission[]>([]);
  useEffect(() => { setItems(getSubmissions()); }, []);

  return (
    <section className="container-page py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary-glow">Admin</div>
          <h1 className="mt-2 font-display text-3xl font-extrabold">Submissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Locally stored quote & contact submissions ({items.length}). Stored in this browser only.
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={() => { if (confirm("Clear all submissions?")) { clearSubmissions(); setItems([]); } }}
            className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-sm text-muted-foreground">
          No submissions yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {items.map((s) => (
            <article key={s.id} className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">{s.kind}</span>
                  <span className="ml-2 font-display text-base font-bold">{s.name}</span>
                </div>
                <time className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleString()}</time>
              </div>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> <a className="hover:text-primary" href={`mailto:${s.email}`}>{s.email}</a></div>
                {s.phone && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> <a className="hover:text-primary" href={`tel:${s.phone}`}>{s.phone}</a></div>}
                {s.service && <div className="text-muted-foreground">Service: <span className="font-medium text-foreground">{s.service}</span></div>}
              </div>
              <p className="mt-3 whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-3 text-sm">{s.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
