import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ClinicalCase {
  id: number;
  patient: string;
  age: number;
  gender: "М" | "Ж";
  complaint: string;
  anamnesis: string;
  examination: string;
  diagnosis: string;
  icd: string;
  treatment: string;
  prognosis: string;
  image: string;
  category: string;
  tags: string[];
  difficulty: "Лёгкий" | "Средний" | "Сложный";
  difficultyColor: string;
  score?: number;
}

const ALL_CATEGORIES = [
  "Все",
  "Хронические",
  "Воспалительные",
  "Инфекционные",
  "Онкологические",
  "Аллергические",
  "Грибковые",
];

const cases: ClinicalCase[] = [
  {
    id: 1,
    patient: "Михаил С.",
    age: 34,
    gender: "М",
    complaint: "Зудящие красные бляшки на локтях и коленях, шелушение 3 месяца",
    anamnesis: "Болен около 3 месяцев. Отец страдал псориазом. Обострение после стресса на работе. Ранее высыпаний не было. Сопутствующих заболеваний не выявлено.",
    examination: "На разгибательных поверхностях локтей и коленей — бляшки до 5 см, покрытые серебристо-белыми чешуйками на эритематозном основании. Триада Ауспитца положительная. PASI = 18.",
    diagnosis: "Псориаз вульгарный, средне-тяжёлая форма",
    icd: "L40.0",
    treatment: "Метотрексат 15 мг/нед, топические кортикостероиды, эмоленты",
    prognosis: "Хроническое течение с ремиссиями. При адекватной терапии — стойкая ремиссия до 2 лет.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/80db57a6-2987-4d42-b641-4fe633089967.jpg",
    category: "Хронические",
    tags: ["Псориаз", "Аутоиммунное"],
    difficulty: "Средний",
    difficultyColor: "bg-amber-100 text-amber-700",
    score: 92,
  },
  {
    id: 2,
    patient: "Наталья В.",
    age: 28,
    gender: "Ж",
    complaint: "Пузырьковая сыпь на кистях после контакта с моющим средством, зуд, жжение",
    anamnesis: "Высыпания появились через 2 часа после уборки без перчаток. Ранее подобных реакций не было. Аллергологический анамнез не отягощён. Профессия — медицинская сестра.",
    examination: "На тыле обеих кистей — эритема, везикулы 2–3 мм, мокнутие. Дермографизм красный. Patch-тест: положительный на детергенты (лаурилсульфат натрия).",
    diagnosis: "Острый контактный аллергический дерматит",
    icd: "L23.2",
    treatment: "Топические кортикостероиды (бетаметазон), цетиризин 10 мг/сут, исключение контакта с аллергеном",
    prognosis: "При устранении аллергена — полное разрешение за 1–2 недели.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/b6f23b0c-9d8d-4781-afe1-5892cbfc1a3d.jpg",
    category: "Аллергические",
    tags: ["Дерматит", "Аллергия"],
    difficulty: "Лёгкий",
    difficultyColor: "bg-green-100 text-green-700",
    score: 88,
  },
  {
    id: 3,
    patient: "Александр П.",
    age: 52,
    gender: "М",
    complaint: "Рост тёмного пятна на спине за 6 месяцев, периодический зуд",
    anamnesis: "Невус существует около 15 лет, изменился полгода назад — увеличился в диаметре, потемнел по краям. Работал на открытом воздухе 20 лет. Семейный анамнез по онкологии не отягощён.",
    examination: "На коже спины — асимметричное пигментное образование 14×11 мм, неровные края, неоднородная коричнево-чёрная окраска. Дерматоскопия: атипичная пигментная сеть, регрессионные структуры. TDS = 5.9.",
    diagnosis: "Меланома кожи T2aN0M0 (стадия IIA)",
    icd: "C43.5",
    treatment: "Широкое иссечение с отступом 1–2 см, биопсия сторожевого лимфоузла, наблюдение онколога",
    prognosis: "5-летняя выживаемость при стадии IIA — около 80% при своевременном лечении.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/b1b9c55f-b77b-4a8b-b733-4e58eb08cb33.jpg",
    category: "Онкологические",
    tags: ["Меланома", "Онко"],
    difficulty: "Сложный",
    difficultyColor: "bg-red-100 text-red-700",
  },
  {
    id: 4,
    patient: "Ольга Д.",
    age: 28,
    gender: "Ж",
    complaint: "Пузырьки на губе, жжение, температура 37.4°C, 4-й рецидив за год",
    anamnesis: "Герпес на губах впервые в 18 лет. Рецидивы 4–5 раз в год, провоцируются стрессом и ОРВИ. Принимала ацикловир крем — эффект неполный. Беременности нет.",
    examination: "На красной кайме верхней губы — сгруппированные везикулы 2–3 мм на гиперемированном основании, болезненные. Регионарные лимфоузлы не увеличены. ПЦР: ВПГ-1 положительный.",
    diagnosis: "Часто рецидивирующий простой герпес I типа",
    icd: "B00.1",
    treatment: "Супрессивная терапия: валацикловир 500 мг/сут 12 мес, иммунокоррекция",
    prognosis: "На фоне супрессивной терапии частота рецидивов снижается на 70–80%.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/2d737193-5606-4ee7-83e1-41041aaaf88c.jpg",
    category: "Инфекционные",
    tags: ["Герпес", "Вирусное"],
    difficulty: "Лёгкий",
    difficultyColor: "bg-green-100 text-green-700",
    score: 76,
  },
  {
    id: 5,
    patient: "Артём К.",
    age: 19,
    gender: "М",
    complaint: "Зудящие высыпания в локтевых сгибах, сухость кожи с детства",
    anamnesis: "С 2 лет — атопический дерматит, ремиссии до 3 лет. Бронхиальная астма лёгкой степени. Пищевая аллергия на цитрусовые. Обострение после смены климата.",
    examination: "В локтевых и подколенных сгибах — лихенификация, экскориации, гиперпигментация. Кожа диффузно сухая. IgE общий — 420 МЕ/мл (норма до 87). SCORAD = 41.",
    diagnosis: "Атопический дерматит, среднетяжёлое течение, период обострения",
    icd: "L20.8",
    treatment: "Дупилумаб 300 мг п/к каждые 2 недели, топические ингибиторы кальциневрина, регулярное применение эмолентов",
    prognosis: "На фоне биологической терапии — снижение SCORAD на 75% у 60% пациентов.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/a5087eee-0c44-42d0-85b6-03932609b54d.jpg",
    category: "Воспалительные",
    tags: ["Экзема", "Атопия"],
    difficulty: "Средний",
    difficultyColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 6,
    patient: "Виктория Р.",
    age: 23,
    gender: "Ж",
    complaint: "Кольцевидное шелушащееся пятно на предплечье, зуд 2 недели",
    anamnesis: "Высыпание появилось после похода в лес. Контакт с животными отрицает. Ранее подобных высыпаний не было. Профессия — студентка, занимается спортом в бассейне.",
    examination: "На левом предплечье — кольцевидный очаг 6 см с приподнятыми шелушащимися краями и частично просветлённым центром. Микроскопия чешуек: обнаружены нити мицелия. Культура: Trichophyton rubrum.",
    diagnosis: "Микроспория гладкой кожи (трихофития)",
    icd: "B35.4",
    treatment: "Тербинафин 250 мг/сут 2–4 недели, местно — антимикотические кремы (клотримазол)",
    prognosis: "При системной антимикотической терапии — полное излечение за 2–4 недели.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/d70781ac-5c49-408b-9342-973f5b205a57.jpg",
    category: "Грибковые",
    tags: ["Микоз", "Дерматофития"],
    difficulty: "Лёгкий",
    difficultyColor: "bg-green-100 text-green-700",
    score: 95,
  },
  {
    id: 7,
    patient: "Дмитрий Е.",
    age: 17,
    gender: "М",
    complaint: "Воспалённые высыпания на лице, спине и груди, жирная кожа",
    anamnesis: "Акне с 14 лет. Лечился самостоятельно — без эффекта. Наследственность: у отца в юности тоже были угри. Принимает спортивное питание (протеин).",
    examination: "На коже лица, спины и груди — открытые и закрытые комедоны, папулы, пустулы, единичные узлы. Кожа жирная. IGA (Investigator's Global Assessment) = 3. Тестостерон в норме.",
    diagnosis: "Акне вульгарный, папулопустулёзная форма, умеренной степени тяжести",
    icd: "L70.0",
    treatment: "Адапален 0.1% + бензоилпероксид 2.5% гель вечером, доксициклин 100 мг/сут 3 мес",
    prognosis: "При комплексной терапии — значительное улучшение через 8–12 недель.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/4cd544fe-65d9-4d06-92e3-8699844715f6.jpg",
    category: "Хронические",
    tags: ["Акне", "Гормональное"],
    difficulty: "Лёгкий",
    difficultyColor: "bg-green-100 text-green-700",
  },
  {
    id: 8,
    patient: "Людмила Ф.",
    age: 45,
    gender: "Ж",
    complaint: "Внезапные волдыри по всему телу, сильный зуд, отёк губ",
    anamnesis: "Острый эпизод впервые. Принимала ибупрофен за 1 час до высыпаний по поводу головной боли. Аллергии в анамнезе не было. Пищевой анамнез: ела креветки на ужин.",
    examination: "По всему кожному покрову — волдыри от 1 до 8 см, бледные в центре с розовым ободком, мигрирующие. Ангиоэдема губ. АД 115/70. Дыхание свободное.",
    diagnosis: "Острая крапивница с ангиоотёком, предположительно НПВП-индуцированная",
    icd: "L50.0",
    treatment: "Цетиризин 20 мг, дексаметазон 8 мг в/м, наблюдение 2 ч, отмена НПВП",
    prognosis: "При устранении триггера и антигистаминной терапии — разрешение в течение 24–48 ч.",
    image: "https://cdn.poehali.dev/projects/9982321f-8751-47b1-b26e-aa1e66e83fc7/files/28271c4f-2c63-4738-8cdd-53edabed950b.jpg",
    category: "Аллергические",
    tags: ["Крапивница", "Аллергия", "Неотложное"],
    difficulty: "Сложный",
    difficultyColor: "bg-red-100 text-red-700",
  },
];

interface Props {
  onClose: () => void;
}

export default function ClinicalCaseDB({ onClose }: Props) {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null);
  const [activeTab, setActiveTab] = useState<"anamnesis" | "examination" | "diagnosis" | "treatment">("anamnesis");
  const [difficulty, setDifficulty] = useState("Все");

  const filtered = cases.filter((c) => {
    const matchCat = activeCategory === "Все" || c.category === activeCategory;
    const matchDiff = difficulty === "Все" || c.difficulty === difficulty;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.diagnosis.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.patient.toLowerCase().includes(q) ||
      c.complaint.toLowerCase().includes(q);
    return matchCat && matchDiff && matchSearch;
  });

  if (selectedCase) {
    const tabs = [
      { id: "anamnesis" as const, label: "Анамнез", icon: "ClipboardList" },
      { id: "examination" as const, label: "Осмотр", icon: "Eye" },
      { id: "diagnosis" as const, label: "Диагноз", icon: "FileSearch" },
      { id: "treatment" as const, label: "Лечение", icon: "Pill" },
    ];

    const tabContent: Record<string, { text: string; extra?: string }> = {
      anamnesis: { text: selectedCase.anamnesis },
      examination: { text: selectedCase.examination },
      diagnosis: {
        text: selectedCase.diagnosis,
        extra: `МКБ-10: ${selectedCase.icd}`,
      },
      treatment: {
        text: selectedCase.treatment,
        extra: selectedCase.prognosis,
      },
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="relative h-56 shrink-0 overflow-hidden bg-slate-900">
            <img
              src={selectedCase.image}
              alt={selectedCase.diagnosis}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Icon name="ArrowLeft" size={14} className="text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedCase.difficultyColor}`}>
                  {selectedCase.difficulty}
                </span>
                <span className="text-xs text-white/60 font-mono">{selectedCase.icd}</span>
              </div>
              <h2 className="font-display font-bold text-xl text-white leading-tight">{selectedCase.diagnosis}</h2>
              <p className="text-white/70 text-sm mt-0.5">
                {selectedCase.patient}, {selectedCase.age} лет ({selectedCase.gender})
              </p>
            </div>
          </div>

          {/* Complaint */}
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <p className="text-sm text-muted-foreground italic">«{selectedCase.complaint}»</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={tab.icon as string} size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-5">
            <p className="text-sm text-foreground leading-relaxed">{tabContent[activeTab].text}</p>
            {tabContent[activeTab].extra && (
              <div className="mt-4 p-3 rounded-xl bg-muted/40 border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  {activeTab === "diagnosis" ? "Код МКБ-10" : "Прогноз"}
                </p>
                <p className="text-sm text-foreground">{tabContent[activeTab].extra}</p>
              </div>
            )}
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCase.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted font-medium">{tag}</span>
              ))}
            </div>
          </div>

          <div className="px-5 py-4 border-t border-border bg-muted/20 flex justify-between items-center">
            {selectedCase.score ? (
              <div className="flex items-center gap-2 text-emerald-600">
                <Icon name="CheckCircle2" size={16} />
                <span className="text-sm font-semibold">Пройдено: {selectedCase.score}%</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">Случай не пройден</span>
            )}
            <button
              onClick={() => setSelectedCase(null)}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "hsl(var(--primary))" }}
            >
              К списку случаев
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between shrink-0" style={{ background: "hsl(var(--navy))" }}>
          <div>
            <div className="text-white/60 text-xs font-medium mb-0.5">База данных</div>
            <h2 className="font-display font-bold text-xl text-white">Клинические случаи</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Icon name="X" size={14} className="text-white" />
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 pt-4 pb-3 border-b border-border shrink-0 space-y-3">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={15} className="absolute left-3.5 top-2.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по диагнозу, симптомам, пациенту..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-muted/30 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Нозология:</span>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat ? "text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
                style={activeCategory === cat ? { background: "hsl(var(--primary))" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Сложность:</span>
            {["Все", "Лёгкий", "Средний", "Сложный"].map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  difficulty === d
                    ? d === "Лёгкий" ? "bg-green-500 text-white"
                    : d === "Средний" ? "bg-amber-500 text-white"
                    : d === "Сложный" ? "bg-red-500 text-white"
                    : "text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
                style={difficulty === d && d === "Все" ? { background: "hsl(var(--primary))" } : {}}
              >
                {d}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted-foreground">{filtered.length} случаев</span>
          </div>
        </div>

        {/* Cases grid */}
        <div className="flex-1 overflow-y-auto p-5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <Icon name="SearchX" size={32} className="mb-3 opacity-40" />
              <p className="text-sm">Случаи не найдены</p>
              <button onClick={() => { setSearch(""); setActiveCategory("Все"); setDifficulty("Все"); }} className="text-xs text-primary mt-2 hover:underline">
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  onClick={() => { setSelectedCase(c); setActiveTab("anamnesis"); }}
                  className="bg-white border border-border rounded-2xl overflow-hidden card-hover cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={c.image}
                      alt={c.diagnosis}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.difficultyColor}`}>
                        {c.difficulty}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 text-white font-mono">
                        {c.icd}
                      </span>
                    </div>
                    {c.score && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        <Icon name="Check" size={10} />
                        {c.score}%
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-display font-bold text-sm leading-tight">{c.patient}, {c.age} л.</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-sm mb-1 leading-snug">{c.diagnosis}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{c.complaint}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium">{tag}</span>
                        ))}
                      </div>
                      <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
