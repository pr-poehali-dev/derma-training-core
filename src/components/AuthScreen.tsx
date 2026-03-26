import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useAuth, DEMO_USERS, UserRole } from "@/context/AuthContext";

const ROLE_COLORS: Record<UserRole, { bg: string; text: string; border: string; badge: string }> = {
  resident: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  doctor: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  admin: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
};

const ROLE_ICONS: Record<UserRole, string> = {
  resident: "GraduationCap",
  doctor: "Stethoscope",
  admin: "ShieldCheck",
};

export default function AuthScreen() {
  const { login } = useAuth();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    if (!selectedUser) {
      setError("Выберите учётную запись");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(selectedUser, password || "demo");
      if (!ok) {
        setError("Неверный пароль");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "hsl(var(--navy))" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Glow orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(var(--emerald-glow)), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(160 70% 60%), transparent 70%)", transform: "translate(30%, 30%)" }}
      />

      <div className="relative w-full max-w-md mx-4 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "hsl(var(--emerald-glow) / 0.15)", border: "1px solid hsl(var(--emerald-glow) / 0.3)" }}
          >
            <Icon name="Cross" size={28} className="text-emerald-400" />
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-1">DermaMed Trainer</h1>
          <p className="text-white/50 text-sm">Система симуляционного обучения дерматологии</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-display font-bold text-lg text-foreground mb-1">Выберите учётную запись</h2>
            <p className="text-muted-foreground text-xs">Демо-версия: пароль не требуется</p>
          </div>

          <div className="p-4 space-y-2">
            {DEMO_USERS.map((u) => {
              const colors = ROLE_COLORS[u.role];
              const isSelected = selectedUser === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => { setSelectedUser(u.id); setError(""); setPassword(""); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    isSelected
                      ? `${colors.bg} ${colors.border}`
                      : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-sm transition-all ${
                      isSelected ? `${colors.text} ${colors.bg}` : "bg-muted text-muted-foreground"
                    }`}
                    style={isSelected ? { boxShadow: "0 0 0 2px currentColor" } : {}}
                  >
                    {u.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm truncate">{u.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge} flex items-center gap-1`}>
                        <Icon name={ROLE_ICONS[u.role] as string} size={10} />
                        {u.roleLabel}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">{u.department}</span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? `border-transparent ${colors.text.replace("text-", "bg-").replace("-700", "-500")}` : "border-muted-foreground/30"
                  }`}
                    style={isSelected ? { background: `hsl(${u.role === "resident" ? "214 72% 55%" : u.role === "doctor" ? "160 55% 45%" : "270 60% 60%"})` } : {}}
                  >
                    {isSelected && <Icon name="Check" size={11} className="text-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Password */}
          <div className="px-4 pb-2">
            <div className="relative">
              <Icon name="Lock" size={14} className="absolute left-3.5 top-3 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Пароль (для демо — любой)"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-muted/30 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={15} />
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500">
                <Icon name="AlertCircle" size={12} />
                {error}
              </div>
            )}
          </div>

          {/* Login button */}
          <div className="p-4 pt-2">
            <button
              onClick={handleLogin}
              disabled={loading || !selectedUser}
              className="w-full py-3 rounded-xl font-display font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:opacity-90"
              style={{ background: "hsl(var(--primary))" }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={15} />
                  Войти в систему
                </>
              )}
            </button>
          </div>

          <div className="px-6 pb-5 text-center">
            <p className="text-xs text-muted-foreground">
              Демонстрационная версия DermaMed Trainer v1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
