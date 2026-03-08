import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Which platforms are supported?",
    a: "We support YouTube, LinkedIn, Facebook, and Instagram. Simply paste any valid video URL from these platforms.",
  },
  {
    q: "What video qualities can I download?",
    a: "You can choose from 4K, 1080p, 720p, 480p, 360p, or Audio Only (MP3). Availability depends on the original video.",
  },
  {
    q: "What formats are available?",
    a: "Videos can be downloaded as MP4, WEBM, or MP3 (for audio-only). MP4 is recommended for the best compatibility.",
  },
  {
    q: "Is it free to use?",
    a: "Yes, this tool is completely free. No signup or account is required.",
  },
  {
    q: "Do you store my videos?",
    a: "No. Videos are fetched on demand and are never stored on our servers.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full max-w-2xl mx-auto mt-20 px-4 pb-20">
      <h2 className="text-center text-2xl font-bold mb-10" style={{ color: "hsl(var(--foreground))" }}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="glass-card rounded-xl overflow-hidden transition-all duration-200"
            style={{
              borderColor: open === i ? "hsl(var(--primary) / 0.3)" : undefined,
            }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm"
              style={{ color: "hsl(var(--foreground))" }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.q}
              <ChevronDown
                size={16}
                className="flex-shrink-0 transition-transform duration-200"
                style={{
                  transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  color: "hsl(var(--primary))",
                }}
              />
            </button>
            {open === i && (
              <div
                className="px-5 pb-4 text-sm leading-relaxed animate-slide-up"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
