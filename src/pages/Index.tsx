import { useState } from "react";
import Icon from "@/components/ui/icon";
import SimulationQuiz from "@/components/SimulationQuiz";
import ClinicalCaseDB from "@/components/ClinicalCaseDB";
import AuthScreen from "@/components/AuthScreen";
import { useAuth, UserRole } from "@/context/AuthContext";

type IconName = string & { _iconBrand?: never };

type Section = "home" | "simulations" | "reference" | "cases" | "analytics";

const navItems = [
  { id: "simulations" as Section, label: "Симуляции", icon: "Stethoscope" },
  { id: "reference" as Section, label: "Справочник", icon: "BookOpen" },
  { id: "cases" as Section, label: "Клинические случаи", icon: "FileText" },
  { id: "analytics" as Section, label: "Аналитика", icon: "BarChart3" },
];

const diseases = [
  { name: "Псориаз", category: "Хроническое", prevalence: "2–3% населения", icon: "🔴", color: "from-red-50 to-rose-50", badge: "bg-red-100 text-red-700" },
  { name: "Экзема", category: "Воспалительное", prevalence: "10–20% детей", icon: "🟠", color: "from-orange-50 to-amber-50", badge: "bg-orange-100 text-orange-700" },
  { name: "Меланома", category: "Онкологическое", prevalence: "1.7% всех раков", icon: "⚫", color: "from-slate-50 to-gray-50", badge: "bg-slate-100 text-slate-700" },
  { name: "Рожа", category: "Инфекционное", prevalence: "Частое", icon: "🟡", color: "from-yellow-50 to-amber-50", badge: "bg-yellow-100 text-yellow-700" },
  { name: "Дерматит", category: "Аллергическое", prevalence: "15–20% населения", icon: "🟣", color: "from-purple-50 to-violet-50", badge: "bg-purple-100 text-purple-700" },
  { name: "Акне", category: "Хроническое", prevalence: "85% подростков", icon: "🔵", color: "from-blue-50 to-sky-50", badge: "bg-blue-100 text-blue-700" },
];

const clinicalCases = [
  {
    id: 1,
    title: "Пациент М., 34 года",
    complaint: "Красные бляшки на локтях и коленях, зуд, шелушение в течение 3 месяцев",
    difficulty: "Средний",
    difficultyColor: "bg-amber-100 text-amber-700",
    tags: ["Псориаз", "Хроническое"],
    completed: true,
    score: 92,
  },
  {
    id: 2,
    title: "Пациентка Н., 28 лет",
    complaint: "Пузырьковая сыпь на кистях после контакта с моющим средством",
    difficulty: "Лёгкий",
    difficultyColor: "bg-green-100 text-green-700",
    tags: ["Контактный дерматит"],
    completed: true,
    score: 88,
  },
  {
    id: 3,
    title: "Пациент А., 52 года",
    complaint: "Асимметричное пигментное образование на спине с неровными краями",
    difficulty: "Сложный",
    difficultyColor: "bg-red-100 text-red-700",
    tags: ["Меланома", "Онко"],
    completed: false,
    score: null,
  },
  {
    id: 4,
    title: "Пациентка О., 19 лет",
    complaint: "Комедоны и папулы на лице, жирная кожа, ухудшение перед менструацией",
    difficulty: "Лёгкий",
    difficultyColor: "bg-green-100 text-green-700",
    tags: ["Акне", "Гормональное"],
    completed: false,
    score: null,
  },
];

const simulations = [
  {
    id: 1,
    title: "Диагностика псориаза",
    description: "Отработка навыков распознавания псориатических бляшек и дифференциальной диагностики",
    duration: "20 мин",
    steps: 8,
    icon: "Microscope",
    color: "from-blue-600 to-blue-700",
    level: "Базовый",
  },
  {
    id: 2,
    title: "Онкодерматология",
    description: "Оценка пигментных образований по системе ABCDE. Раннее выявление меланомы",
    duration: "35 мин",
    steps: 12,
    icon: "Search",
    color: "from-emerald-600 to-teal-700",
    level: "Продвинутый",
  },
  {
    id: 3,
    title: "Инфекционные дерматозы",
    description: "Распознавание бактериальных, грибковых и вирусных поражений кожи",
    duration: "25 мин",
    steps: 10,
    icon: "Shield",
    color: "from-indigo-600 to-blue-700",
    level: "Средний",
  },
];

const analyticsData = [
  { month: "Окт", score: 65 },
  { month: "Ноя", score: 71 },
  { month: "Дек", score: 74 },
  { month: "Янв", score: 80 },
  { month: "Фев", score: 85 },
  { month: "Мар", score: 91 },
];

const skillsData = [
  { name: "Визуальная диагностика", value: 87, color: "bg-blue-500" },
  { name: "Дифференциальная диагностика", value: 73, color: "bg-emerald-500" },
  { name: "Онкодерматология", value: 65, color: "bg-amber-500" },
  { name: "Инфекции кожи", value: 91, color: "bg-indigo-500" },
  { name: "Дерматоскопия", value: 58, color: "bg-violet-500" },
];

const ROLE_COLORS: Record<UserRole, string> = {
  resident: "hsl(214 72% 50%)",
  doctor: "hsl(160 55% 40%)",
  admin: "hsl(270 55% 55%)",
};

const ROLE_ICONS: Record<UserRole, string> = {
  resident: "GraduationCap",
  doctor: "Stethoscope",
  admin: "ShieldCheck",
};

export default function Index() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [showCaseDB, setShowCaseDB] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!user) return <AuthScreen />;

  return (
    <div className="flex h-screen bg-background overflow-hidden font-body">
      {/* Sidebar */}
      <aside
        className={`flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}
        style={{ background: "hsl(var(--navy))" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "hsl(var(--emerald-glow) / 0.2)",
              border: "1px solid hsl(var(--emerald-glow) / 0.4)",
            }}
          >
            <Icon name="Cross" size={18} className="text-emerald-400" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <div className="font-display font-bold text-white text-sm leading-tight">DermaMed</div>
              <div className="text-xs text-white/40 font-body">Trainer</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          <button
            onClick={() => setActiveSection("home")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              activeSection === "home"
                ? "text-white font-medium"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            }`}
            style={
              activeSection === "home"
                ? { background: "hsl(var(--emerald) / 0.25)", borderLeft: "3px solid hsl(var(--emerald-glow))" }
                : {}
            }
          >
            <Icon name="Home" size={18} className="shrink-0" />
            {sidebarOpen && <span>Главная</span>}
          </button>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeSection === item.id
                  ? "text-white font-medium"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
              style={
                activeSection === item.id
                  ? { background: "hsl(var(--emerald) / 0.25)", borderLeft: "3px solid hsl(var(--emerald-glow))" }
                  : {}
              }
            >
              <Icon name={item.icon as IconName} size={18} className="shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-white/10 relative">
          <button
            onClick={() => setShowUserMenu((v) => !v)}
            className="w-full flex items-center gap-3 rounded-xl p-1 hover:bg-white/5 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white"
              style={{ background: ROLE_COLORS[user.role] }}
            >
              {user.initials}
            </div>
            {sidebarOpen && (
              <div className="animate-fade-in overflow-hidden flex-1 text-left">
                <div className="text-white text-xs font-medium truncate">
                  {user.name.split(" ").slice(0, 2).join(" ")}
                </div>
                <div className="text-white/40 text-xs flex items-center gap-1">
                  <Icon name={ROLE_ICONS[user.role] as string} size={9} />
                  {user.roleLabel}
                </div>
              </div>
            )}
            {sidebarOpen && (
              <Icon name="ChevronUp" size={13} className={`text-white/40 transition-transform ${showUserMenu ? "" : "rotate-180"}`} />
            )}
          </button>

          {/* User menu popup */}
          {showUserMenu && sidebarOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden animate-slide-up">
              {/* Profile header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: ROLE_COLORS[user.role] }}
                  >
                    {user.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground leading-tight">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="font-bold text-sm text-primary">{user.stats.cases}</div>
                    <div className="text-xs text-muted-foreground">случаев</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="font-bold text-sm text-emerald-600">{user.stats.score}%</div>
                    <div className="text-xs text-muted-foreground">балл</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="font-bold text-sm text-amber-600">{user.stats.rank}</div>
                    <div className="text-xs text-muted-foreground">рейтинг</div>
                  </div>
                </div>
              </div>

              {/* Switch account */}
              <div className="p-2">
                <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5">Сменить учётную запись</div>
                <button
                  onClick={() => { setShowUserMenu(false); logout(); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                >
                  <Icon name="LogOut" size={14} />
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 border-t border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
        >
          <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={16} />
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              {activeSection === "home" && `Добро пожаловать, ${user.name.split(" ")[1]}!`}
              {activeSection === "simulations" && "Симуляции"}
              {activeSection === "reference" && "Справочник заболеваний"}
              {activeSection === "cases" && "Клинические случаи"}
              {activeSection === "analytics" && "Аналитика прогресса"}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {activeSection === "home" && "Система симуляционного обучения дерматологии"}
              {activeSection === "simulations" && "Интерактивные сценарии диагностики"}
              {activeSection === "reference" && "База знаний по дерматологическим нозологиям"}
              {activeSection === "cases" && "Виртуальные клинические случаи"}
              {activeSection === "analytics" && "Отслеживание улучшений диагностики"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Role badge */}
            <div
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 text-white"
              style={{ background: ROLE_COLORS[user.role] }}
            >
              <Icon name={ROLE_ICONS[user.role] as IconName} size={11} />
              {user.roleLabel}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
              style={{ background: "hsl(var(--emerald) / 0.12)", color: "hsl(var(--emerald))" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
              Онлайн
            </div>
            <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={logout}
              className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Выйти"
            >
              <Icon name="LogOut" size={15} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ===== HOME ===== */}
          {activeSection === "home" && (
            <div className="p-6 space-y-6 animate-fade-in">
              {/* Hero */}
              <div className="relative rounded-2xl overflow-hidden p-8" style={{ background: "hsl(var(--navy))" }}>
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div
                  className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10"
                  style={{
                    background: "radial-gradient(circle, hsl(var(--emerald-glow)), transparent 70%)",
                    transform: "translate(30%, -30%)",
                  }}
                />
                <div className="relative">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
                    style={{
                      background: "hsl(var(--emerald-glow) / 0.15)",
                      color: "hsl(var(--emerald-glow))",
                      border: "1px solid hsl(var(--emerald-glow) / 0.3)",
                    }}
                  >
                    <Icon name="Sparkles" size={12} />
                    DermaMed Trainer v1.0
                  </div>
                  <h2 className="font-display font-bold text-3xl text-white mb-2">
                    Профессиональная диагностика<br />начинается здесь
                  </h2>
                  <p className="text-white/60 text-sm max-w-lg mb-6">
                    Отрабатывайте навыки визуальной диагностики на реальных клинических случаях.
                    Получайте мгновенную обратную связь и отслеживайте прогресс.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveQuiz(1)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: "hsl(var(--emerald))" }}
                    >
                      Начать симуляцию
                    </button>
                    <button
                      onClick={() => setShowCaseDB(true)}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/80 border border-white/20 hover:bg-white/10 transition-all"
                    >
                      Клинические случаи
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Завершено случаев", value: String(user.stats.cases), icon: "CheckCircle2", change: "+5 за месяц", color: "text-emerald-600" },
                  { label: "Средний балл", value: `${user.stats.score}%`, icon: "TrendingUp", change: "+6% за месяц", color: "text-blue-600" },
                  { label: "Часов обучения", value: String(user.stats.hours), icon: "Clock", change: "12 ч за неделю", color: "text-indigo-600" },
                  { label: "Рейтинг группы", value: user.stats.rank, icon: "Award", change: "Топ 15%", color: "text-amber-600" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-border card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <Icon name={stat.icon as IconName} size={20} className={stat.color} />
                      <span className="text-xs text-muted-foreground">{stat.change}</span>
                    </div>
                    <div className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick access */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-border">
                  <h3 className="font-display font-semibold text-base mb-3">Рекомендованные симуляции</h3>
                  <div className="space-y-2">
                    {simulations.slice(0, 2).map((sim) => (
                      <button
                        key={sim.id}
                        onClick={() => setActiveSection("simulations")}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${sim.color} flex items-center justify-center shrink-0`}>
                          <Icon name={sim.icon as IconName} size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{sim.title}</div>
                          <div className="text-xs text-muted-foreground">{sim.duration} · {sim.level}</div>
                        </div>
                        <Icon name="ChevronRight" size={14} className="text-muted-foreground ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-border">
                  <h3 className="font-display font-semibold text-base mb-3">Последние случаи</h3>
                  <div className="space-y-2">
                    {clinicalCases.slice(0, 2).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setActiveSection("cases")}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Icon name="User" size={16} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{c.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{c.tags.join(", ")}</div>
                        </div>
                        {c.completed && (
                          <span className="text-xs font-bold text-emerald-600">{c.score}%</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== SIMULATIONS ===== */}
          {activeSection === "simulations" && (
            <div className="p-6 space-y-5 animate-fade-in">
              <div className="grid grid-cols-3 gap-5">
                {simulations.map((sim, i) => (
                  <div key={sim.id} className="bg-white rounded-2xl border border-border overflow-hidden card-hover">
                    <div className={`h-32 bg-gradient-to-br ${sim.color} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <Icon name={sim.icon as IconName} size={48} className="text-white/80 relative" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium">{sim.level}</span>
                        <span className="text-xs text-muted-foreground">{sim.steps} шагов</span>
                      </div>
                      <h3 className="font-display font-bold text-base mb-1">{sim.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{sim.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} />
                          {sim.duration}
                        </span>
                        <button
                          onClick={() => setActiveQuiz(sim.id)}
                          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                          style={{ background: "hsl(var(--primary))" }}
                        >
                          Начать
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-display font-bold text-base mb-4">Как проходит симуляция</h3>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { step: "01", title: "Анамнез", desc: "Изучение жалоб и истории пациента", icon: "ClipboardList" },
                    { step: "02", title: "Осмотр", desc: "Визуальный анализ кожных проявлений", icon: "Eye" },
                    { step: "03", title: "Диагноз", desc: "Постановка предварительного диагноза", icon: "FileSearch" },
                    { step: "04", title: "Оценка", desc: "Мгновенная обратная связь системы", icon: "CheckCircle2" },
                  ].map((item) => (
                    <div key={item.step} className="text-center p-4 rounded-xl bg-muted/30">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ background: "hsl(var(--primary) / 0.1)" }}
                      >
                        <Icon name={item.icon as IconName} size={18} className="text-primary" />
                      </div>
                      <div className="text-xs font-bold text-muted-foreground mb-1">{item.step}</div>
                      <div className="font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== REFERENCE ===== */}
          {activeSection === "reference" && (
            <div className="p-6 space-y-5 animate-fade-in">
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск по нозологиям, симптомам, коду МКБ..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {["Все", "Воспалительные", "Инфекционные", "Онкологические", "Аллергические", "Хронические"].map((cat) => (
                  <button
                    key={cat}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      cat === "Все" ? "text-white" : "bg-muted text-muted-foreground hover:bg-muted/60"
                    }`}
                    style={cat === "Все" ? { background: "hsl(var(--primary))" } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {diseases.map((d, i) => (
                  <div key={i} className={`bg-gradient-to-br ${d.color} rounded-2xl p-5 border border-border card-hover cursor-pointer`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{d.icon}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.badge}`}>{d.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-base mb-1">{d.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{d.prevalence}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Icon name="Image" size={11} /> Фото</span>
                      <span className="flex items-center gap-1"><Icon name="FileText" size={11} /> МКБ</span>
                      <span className="flex items-center gap-1"><Icon name="Pill" size={11} /> Лечение</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== CASES ===== */}
          {activeSection === "cases" && (
            <div className="p-6 space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {["Все", "Новые", "Завершённые"].map((f) => (
                    <button
                      key={f}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        f === "Все" ? "text-white" : "bg-white border border-border text-muted-foreground hover:text-foreground"
                      }`}
                      style={f === "Все" ? { background: "hsl(var(--primary))" } : {}}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowCaseDB(true)}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "hsl(var(--emerald))" }}
                >
                  <Icon name="Database" size={13} />
                  База случаев (8)
                </button>
              </div>

              <div className="space-y-3">
                {clinicalCases.map((c, i) => (
                  <div key={c.id} className="bg-white rounded-2xl border border-border p-5 card-hover cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--primary) / 0.08)" }}
                      >
                        <Icon name="User" size={22} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-display font-bold text-base">{c.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.difficultyColor}`}>{c.difficulty}</span>
                          {c.completed && (
                            <span className="ml-auto flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                              <Icon name="CheckCircle2" size={14} />
                              {c.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{c.complaint}</p>
                        <div className="flex items-center gap-2">
                          {c.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium">{tag}</span>
                          ))}
                          <button
                            onClick={() => setShowCaseDB(true)}
                            className="ml-auto px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                            style={{ background: c.completed ? "hsl(var(--secondary))" : "hsl(var(--primary))" }}
                          >
                            {c.completed ? "Просмотреть" : "Разобрать"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ANALYTICS ===== */}
          {activeSection === "analytics" && (
            <div className="p-6 space-y-5 animate-fade-in">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Общий прогресс", value: "+26%", sub: "за 6 месяцев", icon: "TrendingUp", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Лучший навык", value: "Инфекции", sub: "91% точность", icon: "Star", color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Нужна работа", value: "Дерматоскопия", sub: "58% точность", icon: "Target", color: "text-red-500", bg: "bg-red-50" },
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} rounded-2xl p-5 border border-border`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={item.icon as IconName} size={16} className={item.color} />
                      <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                    </div>
                    <div className={`text-2xl font-display font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-display font-bold text-base mb-5">Динамика диагностической точности</h3>
                <div className="flex items-end gap-3 h-40">
                  {analyticsData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-primary">{d.score}%</span>
                      <div
                        className="w-full rounded-t-lg transition-all"
                        style={{
                          height: `${(d.score / 100) * 120}px`,
                          background:
                            i === analyticsData.length - 1
                              ? "hsl(var(--emerald))"
                              : "hsl(var(--primary) / 0.2)",
                        }}
                      />
                      <span className="text-xs text-muted-foreground">{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-display font-bold text-base mb-5">Профиль компетенций</h3>
                <div className="space-y-4">
                  {skillsData.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-bold">{skill.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${skill.color} rounded-full`}
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* History */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-display font-bold text-base mb-4">История обучения</h3>
                <div className="space-y-2">
                  {clinicalCases
                    .filter((c) => c.completed)
                    .map((c) => (
                      <div key={c.id} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                        <Icon name="CheckCircle2" size={16} className="text-emerald-500 shrink-0" />
                        <span className="text-sm flex-1">{c.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{c.difficulty}</span>
                        <span className="text-sm font-bold text-emerald-600">{c.score}%</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {activeQuiz !== null && (
        <SimulationQuiz simId={activeQuiz} onClose={() => setActiveQuiz(null)} />
      )}

      {showCaseDB && (
        <ClinicalCaseDB onClose={() => setShowCaseDB(false)} />
      )}
    </div>
  );
}