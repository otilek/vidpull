import heroBg from "@/assets/hero-bg.jpg";
import { DownloaderCard } from "@/components/DownloaderCard";
import { PlatformIconGrid } from "@/components/PlatformBadge";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Pricing } from "@/components/Pricing";
import { Download } from "lucide-react";

const Index = () => {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Hero BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.12,
          maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
        }}
      />
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(195 100% 55% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
            >
              <Download size={16} style={{ color: "hsl(var(--primary-foreground))" }} />
            </div>
            <span className="font-bold text-lg" style={{ color: "hsl(var(--foreground))" }}>
              VidPull
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium"
            style={{
              background: "hsl(var(--primary) / 0.1)",
              border: "1px solid hsl(var(--primary) / 0.3)",
              color: "hsl(var(--primary))",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block mr-1" />
            Free & Fast
          </div>
        </nav>

        {/* Hero */}
        <section className="text-center px-4 pt-16 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "hsl(var(--secondary) / 0.12)",
              border: "1px solid hsl(var(--secondary) / 0.35)",
              color: "hsl(var(--secondary))",
            }}
          >
            ✦ Download from 4 platforms
          </div>

          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-4 max-w-3xl mx-auto"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Download Any Video,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Instantly
            </span>
          </h1>

          <p
            className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Paste any URL from YouTube, LinkedIn, Facebook, or Instagram.
            Choose your quality. Get your video.
          </p>

          {/* Platform icons */}
          <div className="mb-10">
            <PlatformIconGrid />
          </div>

          {/* Main card */}
          <div className="px-4">
            <DownloaderCard />
          </div>
        </section>

        {/* How it works */}
        <HowItWorks />

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <footer
          className="text-center py-8 text-xs"
          style={{
            color: "hsl(var(--muted-foreground))",
            borderTop: "1px solid hsl(var(--border))",
          }}
        >
          <p>
            VidPull — For personal use only. Respect copyright and platform terms of service.
          </p>
          <p className="mt-1">© {new Date().getFullYear()} VidPull. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
