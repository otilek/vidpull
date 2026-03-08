const steps = [
  {
    n: "01",
    title: "Paste the URL",
    desc: "Copy the video link from YouTube, LinkedIn, Facebook, or Instagram and paste it above.",
  },
  {
    n: "02",
    title: "Choose Quality",
    desc: "Pick the resolution and format that suits you — from 4K to audio-only MP3.",
  },
  {
    n: "03",
    title: "Hit Download",
    desc: "Your video is processed and downloaded instantly to your device.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full max-w-3xl mx-auto mt-20 px-4">
      <h2
        className="text-center text-2xl font-bold mb-10"
        style={{ color: "hsl(var(--foreground))" }}
      >
        How it works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              className="text-3xl font-black mb-4 font-mono"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {step.n}
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: "hsl(var(--foreground))" }}>
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
