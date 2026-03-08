import { Check, Zap, Crown, Infinity } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "$1",
    period: "/month",
    description: "Perfect for occasional use",
    icon: Zap,
    features: [
      "Unlimited downloads",
      "All 4 platforms",
      "Up to 1080p quality",
      "MP4 & MP3 formats",
      "No watermarks",
    ],
    cta: "Start Monthly",
    highlight: false,
    badge: null,
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
  },
  {
    name: "Lifetime",
    price: "$5",
    period: " one-time",
    description: "Pay once, download forever",
    icon: Crown,
    features: [
      "Everything in Monthly",
      "4K & 8K quality",
      "Batch downloads",
      "Priority support",
      "All future features",
    ],
    cta: "Get Lifetime Access",
    highlight: true,
    badge: "BEST VALUE",
    gradient: "from-secondary/30 to-primary/20",
    borderColor: "border-secondary/60",
    iconColor: "text-secondary",
  },
  {
    name: "Annual",
    price: "$10",
    period: "/year",
    description: "Save vs monthly billing",
    icon: Infinity,
    features: [
      "Unlimited downloads",
      "All 4 platforms",
      "Up to 4K quality",
      "All formats",
      "No watermarks",
    ],
    cta: "Start Annual",
    highlight: false,
    badge: null,
    gradient: "from-muted/30 to-muted/10",
    borderColor: "border-border",
    iconColor: "text-muted-foreground",
  },
];

export const Pricing = ({ onGetStarted }: { onGetStarted?: () => void }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "hsl(var(--primary) / 0.12)",
              border: "1px solid hsl(var(--primary) / 0.35)",
              color: "hsl(var(--primary))",
            }}
          >
            ✦ Simple Pricing
          </div>
          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: "hsl(var(--foreground))" }}
          >
            One price.{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Unlimited videos.
            </span>
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            No hidden fees. No limits. Cancel anytime on monthly.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight ? "md:-translate-y-3 md:scale-105" : ""
                }`}
                style={{
                  background: plan.highlight
                    ? "linear-gradient(145deg, hsl(var(--card)), hsl(var(--secondary) / 0.08))"
                    : "hsl(var(--card))",
                  border: plan.highlight
                    ? "1.5px solid hsl(var(--secondary) / 0.6)"
                    : "1px solid hsl(var(--border))",
                  boxShadow: plan.highlight
                    ? "0 0 40px hsl(var(--secondary) / 0.15), 0 20px 60px -20px hsl(var(--background))"
                    : "0 4px 20px hsl(var(--background) / 0.5)",
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black tracking-widest"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: plan.highlight
                        ? "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2))"
                        : "hsl(var(--muted) / 0.5)",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: plan.highlight
                          ? "hsl(var(--secondary))"
                          : "hsl(var(--muted-foreground))",
                      }}
                    />
                  </div>
                  <span
                    className="font-bold text-sm tracking-wide uppercase"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span
                    className="text-5xl font-black"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm ml-1"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className="text-xs mb-6"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {plan.description}
                </p>

                {/* CTA */}
                <button
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 mb-6"
                  style={
                    plan.highlight
                      ? {
                          background:
                            "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                          color: "hsl(var(--primary-foreground))",
                          boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)",
                        }
                      : {
                          background: "hsl(var(--muted) / 0.6)",
                          color: "hsl(var(--foreground))",
                          border: "1px solid hsl(var(--border))",
                        }
                  }
                >
                  {plan.cta}
                </button>

                {/* Divider */}
                <div
                  className="h-px w-full mb-5"
                  style={{ background: "hsl(var(--border))" }}
                />

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: plan.highlight
                            ? "hsl(var(--secondary) / 0.2)"
                            : "hsl(var(--primary) / 0.15)",
                        }}
                      >
                        <Check
                          size={10}
                          style={{
                            color: plan.highlight
                              ? "hsl(var(--secondary))"
                              : "hsl(var(--primary))",
                          }}
                        />
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Money-back note */}
        <p
          className="text-center text-xs mt-8"
          style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}
        >
          🔒 Secure payment · 7-day money-back guarantee · Cancel anytime
        </p>
      </div>
    </section>
  );
};
