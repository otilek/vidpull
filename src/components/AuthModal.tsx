import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
            onSuccess={onClose}
          />
        ) : (
          <SignupForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            onSwitchToLogin={() => setTab("login")}
            onSuccess={() => setTab("login")}
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
  onSuccess,
}: {
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  onSwitchToSignup: () => void;
  onSuccess: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      onSuccess();
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <Field icon={<Mail size={15} />} label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
      <PasswordField
        label="Password"
        placeholder="Enter your password"
        show={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        value={password}
        onChange={setPassword}
      />

      {error && (
        <p className="text-xs px-3 py-2 rounded-lg" style={{ color: "hsl(var(--destructive))", background: "hsl(var(--destructive) / 0.1)" }}>
          {error}
        </p>
      )}

      <div className="flex items-center justify-between text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" className="accent-primary" />
          Remember me
        </label>
      </div>

      <SubmitBtn label="Log In" loading={loading} />

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
};

/* ─── Signup Form ─── */
const SignupForm = ({
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  onSwitchToLogin,
  onSuccess,
}: {
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (v: boolean) => void;
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(onSuccess, 2000);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6 space-y-3">
        <div className="text-3xl">🎉</div>
        <p className="font-bold" style={{ color: "hsl(var(--foreground))" }}>Account created!</p>
        <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          Check your email to confirm your account, then log in.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSignup}>
      <Field icon={<User size={15} />} label="Full Name" type="text" placeholder="John Doe" value={fullName} onChange={setFullName} />
      <Field icon={<Mail size={15} />} label="Email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} />
      <PasswordField
        label="Password"
        placeholder="Create a strong password"
        show={showPassword}
        onToggle={() => setShowPassword(!showPassword)}
        value={password}
        onChange={setPassword}
      />
      <PasswordField
        label="Confirm Password"
        placeholder="Repeat your password"
        show={showConfirm}
        onToggle={() => setShowConfirm(!showConfirm)}
        value={confirm}
        onChange={setConfirm}
      />

      {error && (
        <p className="text-xs px-3 py-2 rounded-lg" style={{ color: "hsl(var(--destructive))", background: "hsl(var(--destructive) / 0.1)" }}>
          {error}
        </p>
      )}

      <SubmitBtn label="Create Account" loading={loading} />

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
};

/* ─── Shared sub-components ─── */
const Field = ({
  icon,
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }}>
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
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
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  show: boolean;
  onToggle: () => void;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-xs font-semibold mb-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }}>
        <Lock size={15} />
      </span>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
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

const SubmitBtn = ({ label, loading }: { label: string; loading: boolean }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
    style={{
      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
      color: "hsl(var(--primary-foreground))",
      boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)",
    }}
  >
    {loading && <Loader2 size={15} className="animate-spin" />}
    {label}
  </button>
);
