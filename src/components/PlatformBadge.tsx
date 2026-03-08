import { Youtube, Linkedin, Facebook, Instagram } from "lucide-react";

export type Platform = "youtube" | "linkedin" | "facebook" | "instagram" | null;

interface PlatformBadgeProps {
  platform: Platform;
  size?: "sm" | "md";
}

const platformConfig = {
  youtube: {
    label: "YouTube",
    icon: Youtube,
    bg: "hsl(0 85% 55% / 0.15)",
    border: "hsl(0 85% 55% / 0.4)",
    color: "hsl(0 85% 60%)",
    glow: "0 0 16px hsl(0 85% 55% / 0.3)",
  },
  linkedin: {
    label: "LinkedIn",
    icon: Linkedin,
    bg: "hsl(210 85% 45% / 0.15)",
    border: "hsl(210 85% 45% / 0.4)",
    color: "hsl(210 85% 60%)",
    glow: "0 0 16px hsl(210 85% 45% / 0.3)",
  },
  facebook: {
    label: "Facebook",
    icon: Facebook,
    bg: "hsl(220 75% 52% / 0.15)",
    border: "hsl(220 75% 52% / 0.4)",
    color: "hsl(220 75% 65%)",
    glow: "0 0 16px hsl(220 75% 52% / 0.3)",
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    bg: "hsl(330 80% 58% / 0.15)",
    border: "hsl(330 80% 58% / 0.4)",
    color: "hsl(330 80% 68%)",
    glow: "0 0 16px hsl(330 80% 58% / 0.3)",
  },
};

export function PlatformBadge({ platform, size = "md" }: PlatformBadgeProps) {
  if (!platform) return null;
  const cfg = platformConfig[platform];
  const Icon = cfg.icon;

  return (
    <span
      className={`platform-badge animate-fade-in ${size === "sm" ? "text-xs px-2 py-1" : ""}`}
      style={{
        background: cfg.bg,
        borderColor: cfg.border,
        color: cfg.color,
        boxShadow: cfg.glow,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <Icon size={size === "sm" ? 12 : 14} />
      {cfg.label}
    </span>
  );
}

export function detectPlatform(url: string): Platform {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("facebook.com") || lower.includes("fb.watch")) return "facebook";
  if (lower.includes("instagram.com")) return "instagram";
  return null;
}

export function PlatformIconGrid() {
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center">
      {(Object.keys(platformConfig) as Platform[]).filter(Boolean).map((p) => {
        const cfg = platformConfig[p!]!;
        const Icon = cfg.icon;
        return (
          <div
            key={p}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color,
            }}
          >
            <Icon size={16} />
            {cfg.label}
          </div>
        );
      })}
    </div>
  );
}
