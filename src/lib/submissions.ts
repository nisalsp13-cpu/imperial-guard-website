// Simple local storage for quote submissions + email delivery via Formsubmit.co
// Formsubmit requires a one-time activation: the first submission triggers
// a confirmation email to imperial.aqua.consultants@gmail.com — once confirmed,
// every subsequent submission is delivered automatically.

export const TARGET_EMAIL = "imperial.aqua.consultants@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

export type QuoteSubmission = {
  id: string;
  createdAt: string;
  kind: "quote" | "contact";
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

const STORAGE_KEY = "imperial.submissions.v1";

export function getSubmissions(): QuoteSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSubmission(s: Omit<QuoteSubmission, "id" | "createdAt">): QuoteSubmission {
  const entry: QuoteSubmission = {
    ...s,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = getSubmissions();
  all.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return entry;
}

export function clearSubmissions() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function sendSubmissionEmail(s: QuoteSubmission): Promise<boolean> {
  try {
    const payload = {
      _subject: s.kind === "quote"
        ? `New Quote Request — ${s.service ?? "General"} — ${s.name}`
        : `New Contact Message — ${s.name}`,
      _template: "table",
      _captcha: "false",
      name: s.name,
      email: s.email,
      phone: s.phone ?? "",
      service: s.service ?? "",
      message: s.message,
      submitted_at: s.createdAt,
    };
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
