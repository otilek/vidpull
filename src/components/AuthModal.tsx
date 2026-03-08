import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Download } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  defaultTab?: "login" | "signup";
  onClose: () => void;
}

export const AuthModal = ({ open, defaultTab = "login", onClose }: AuthModalProps) => {
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "hsl(var(--background) / 0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8 animate-slide-up"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          boxShadow: "0 0 60px hsl(var(--primary) / 0.1), 0 30px 80px hsl(var(--background) / 0.8)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
          style={{ color: "hsl(var(--muted-foreground))", background: "hsl(var(--muted) / 0.5)" }}
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
          >
            <Download size={15} style={{ color: "hsl(var(--primary-foreground))" }} />
          </div>
          <span className="font-black text-lg" style={{ color: "hsl(var(--foreground))" }}>VidPull</span>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-xl p-1 mb-8 gap-1"
          style={{ background: "hsl(var(--muted) / 0.5)" }}
        >
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 capitalize"
              style={
                tab === t
                  ? {
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "0 2px 12px hsl(var(--primary) / 0.35)",
                    }
                  : { color: "hsl(var(--muted-foreground))" }
              }
            >
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <LoginForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSwitchToSignup={() => setTab("signup")}
          />
        ) : (
          <SignupForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            onSwitchToLogin={() => setTab("login")}
          />
        )}
      </div>
    </div>
  );
};

/* ─── Login Form ─── */
const LoginForm = ({
  showPassword,
  setShowPassword,
  onSwitchToSignup,
}: {
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  onSwitchToSignup: () => void;
}) => (
  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
    <Field icon={<Mail size={15} />} label="Email" type="email" placeholder="you@example.com" />
    <PasswordField
      label="Password"
      placeholder="Enter your password"
      show={showPassword}
      onToggle={() => setShowPassword(!showPassword)}
    />

    <div className="flex items-center justify-between text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input type="checkbox" className="accent-primary" />
        Remember me
      </label>
      <button
        type="button"
        className="hover:underline transition-colors"
        style={{ color: "hsl(var(--primary))" }}
      >
        Forgot password?
      </button>
    </div>

    <SubmitBtn label="Log In" />

    <p className="text-center text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
      Don't have an account?{" "}
      <button
        type="button"
        onClick={onSwitchToSignup}
        className="font-semibold hover:underline"
        style={{ color: "hsl(var(--primary))" }}
      >
        Sign up free
      </button>
    </p>
  </form>
);

/* ─── Signup Form ─── */
const SignupForm = ({
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  onSwitchToLogin,
}: {
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (v: boolean) => void;
  onSwitchToLogin: () => void;
}) => (
  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
    <Field icon={<User size={15} />} label="Full Name" type="text" placeholder="John Doe" />
    <Field icon={<Mail size={15} />} label="Email" type="email" placeholder="you@example.com" />
    <PasswordField
      label="Password"
      placeholder="Create a strong password"
      show={showPassword}
      onToggle={() => setShowPassword(!showPassword)}
    />
    <PasswordField
      label="Confirm Password"
      placeholder="Repeat your password"
      show={showConfirm}
      onToggle={() => setShowConfirm(!showConfirm)}
    />

    <SubmitBtn label="Create Account" />

    <p className="text-center text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
      Already have an account?{" "}
      <button
        type="button"
        onClick={onSwitchToLogin}
        className="font-semibold hover:underline"
        style={{ color: "hsl(var(--primary))" }}
      >
        Log in
      </button>
    </p>

    <p className="text-center text-xs" style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}>
      By signing up you agree to our Terms of Service & Privacy Policy.
    </p>
  </form>
);

/* ─── Shared sub-components ─── */
const Field = ({
  icon,
  label,
  type,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
}) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
      {label}
    </label>
    <div className="relative">
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="input-dark w-full pl-9 pr-4 py-3 rounded-xl text-sm"
        style={{
          background: "hsl(var(--input))",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--foreground))",
        }}
      />
    </div>
  </div>
);

const PasswordField = ({
  label,
  placeholder,
  show,
  onToggle,
}: {
  label: string;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
}) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
      {label}
    </label>
    <div className="relative">
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <Lock size={15} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="input-dark w-full pl-9 pr-10 py-3 rounded-xl text-sm"
        style={{
          background: "hsl(var(--input))",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--foreground))",
        }}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  </div>
);

const SubmitBtn = ({ label }: { label: string }) => (
  <button
    type="submit"
    className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 mt-2"
    style={{
      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
      color: "hsl(var(--primary-foreground))",
      boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)",
    }}
  >
    {label}
  </button>
);
