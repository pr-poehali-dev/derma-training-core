import { useState } from "react";
import Icon from "@/components/ui/icon";

interface QuizQuestion {
  id: number;
  stage: "anamnesis" | "examination" | "diagnosis" | "treatment";
  stageLabel: string;
  question: string;
  hint?: string;
  options: { id: string; text: string; correct: boolean; explanation: string }[];
}

interface Simulation {
  id: number;
  title: string;
  patient: string;
  age: number;
  gender: "М" | "Ж";
  chiefComplaint: string;
  diagnosis: string;
  color: string;
  icon: string;
  questions: QuizQuestion[];
}

const simulations: Simulation[] = [
  {
    id: 1,
    title: "Диагностика псориаза",
    patient: "Михаил",
    age: 34,
    gender: "М",
    chiefComplaint: "Красные бляшки на локтях и коленях, зуд, шелушение — 3 месяца",
    diagnosis: "Псориаз вульгарный",
    color: "from-blue-600 to-blue-700",
    icon: "Microscope",
    questions: [
      {
        id: 1,
        stage: "anamnesis",
        stageLabel: "Сбор анамнеза",
        question: "Пациент жалуется на зудящие бляшки на локтях и коленях. Что важно уточнить в первую очередь?",
        hint: "Псориаз — хроническое заболевание с генетической предрасположенностью",
        options: [
          { id: "a", text: "Наследственность и случаи псориаза у родственников", correct: true, explanation: "Псориаз имеет выраженную генетическую составляющую — у 30–40% пациентов есть родственники с этим заболеванием." },
          { id: "b", text: "Цвет любимой одежды пациента", correct: false, explanation: "Цвет одежды не имеет диагностического значения при подозрении на псориаз." },
          { id: "c", text: "Только рацион питания", correct: false, explanation: "Питание может быть триггером, но не является первичным вопросом при сборе анамнеза." },
          { id: "d", text: "Место работы и профессия", correct: false, explanation: "Профессия важна при контактном дерматите, но не является приоритетом при данной клинической картине." },
        ],
      },
      {
        id: 2,
        stage: "examination",
        stageLabel: "Осмотр",
        question: "При осмотре на коже локтей обнаружены серебристо-белые чешуйки на эритематозном основании. Какой симптом нужно проверить?",
        hint: "Феномен Ауспитца — патогномоничный признак псориаза",
        options: [
          { id: "a", text: "Симптом стеаринового пятна и феномен Ауспитца", correct: true, explanation: "Триада Ауспитца (стеариновое пятно → терминальная плёнка → точечная кровь) является патогномоничным признаком псориаза." },
          { id: "b", text: "Симптом Никольского", correct: false, explanation: "Симптом Никольского характерен для пузырчатки, а не псориаза." },
          { id: "c", text: "Симптом «яблочного желе»", correct: false, explanation: "Этот симптом характерен для туберкулёза кожи (волчанки)." },
          { id: "d", text: "Симптом Дарье", correct: false, explanation: "Симптом Дарье характерен для мастоцитоза (крапивницы пигментной)." },
        ],
      },
      {
        id: 3,
        stage: "diagnosis",
        stageLabel: "Диагноз",
        question: "Псориатическая триада подтверждена. Какова степень тяжести, если PASI = 18?",
        hint: "PASI < 10 — лёгкая, 10–20 — средняя, > 20 — тяжёлая форма",
        options: [
          { id: "a", text: "Лёгкая форма", correct: false, explanation: "Лёгкая форма — PASI < 10. У данного пациента PASI = 18, что превышает этот порог." },
          { id: "b", text: "Средне-тяжёлая форма", correct: true, explanation: "PASI 10–20 соответствует средне-тяжёлой форме псориаза, требующей системной терапии." },
          { id: "c", text: "Тяжёлая форма", correct: false, explanation: "Тяжёлая форма диагностируется при PASI > 20. Здесь PASI = 18." },
          { id: "d", text: "Для оценки нужна биопсия", correct: false, explanation: "Биопсия не требуется для определения степени тяжести — для этого используются клинические индексы." },
        ],
      },
      {
        id: 4,
        stage: "treatment",
        stageLabel: "Тактика",
        question: "Выберите оптимальную тактику лечения при средне-тяжёлом псориазе с поражением суставов:",
        options: [
          { id: "a", text: "Только топические кортикостероиды", correct: false, explanation: "При средне-тяжёлой форме с артритом топических препаратов недостаточно — необходима системная терапия." },
          { id: "b", text: "НПВП курсом 2 недели", correct: false, explanation: "НПВП применяются для симптоматического лечения артрита, но не решают основную проблему." },
          { id: "c", text: "Метотрексат или биологические препараты (анти-ФНО)", correct: true, explanation: "При средне-тяжёлом псориазе с артритом показаны системные препараты: метотрексат, циклоспорин или биологическая терапия (адалимумаб, этанерцепт)." },
          { id: "d", text: "Антибиотики широкого спектра", correct: false, explanation: "Псориаз — не инфекционное заболевание, антибиотики не показаны." },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Онкодерматология",
    patient: "Александр",
    age: 52,
    gender: "М",
    chiefComplaint: "Асимметричное пигментное образование на спине, рост за 6 месяцев",
    diagnosis: "Подозрение на меланому",
    color: "from-emerald-600 to-teal-700",
    icon: "Search",
    questions: [
      {
        id: 1,
        stage: "anamnesis",
        stageLabel: "Сбор анамнеза",
        question: "Пациент замечает рост родинки на спине. Что является главным тревожным признаком в анамнезе?",
        hint: "Критерии ABCDE помогают оценить риск меланомы",
        options: [
          { id: "a", text: "Изменение формы, цвета и быстрый рост образования", correct: true, explanation: "Изменение существующего невуса по критериям ABCDE (Asymmetry, Border, Color, Diameter, Evolution) — ключевой тревожный признак." },
          { id: "b", text: "Периодический зуд без изменения вида", correct: false, explanation: "Изолированный зуд без морфологических изменений менее значим, хотя требует внимания." },
          { id: "c", text: "Сухость кожи в этой зоне", correct: false, explanation: "Сухость кожи не является специфическим признаком малигнизации." },
          { id: "d", text: "Загар в солярии более 5 лет назад", correct: false, explanation: "Это фактор риска, но не текущий тревожный симптом, требующий первостепенной оценки." },
        ],
      },
      {
        id: 2,
        stage: "examination",
        stageLabel: "Осмотр",
        question: "При дерматоскопии выявлена атипичная пигментная сеть, белые рубцеподобные области. Какой балл по шкале TDS указывает на меланому?",
        hint: "TDS (Total Dermoscopy Score): < 4.75 — доброкачественное, > 5.45 — меланома",
        options: [
          { id: "a", text: "TDS = 3.2", correct: false, explanation: "TDS 3.2 соответствует доброкачественному образованию (< 4.75)." },
          { id: "b", text: "TDS = 4.9", correct: false, explanation: "TDS 4.75–5.45 — пограничная зона, требует динамического наблюдения или биопсии." },
          { id: "c", text: "TDS = 5.8", correct: true, explanation: "TDS > 5.45 — высокая вероятность меланомы, показана срочная эксцизионная биопсия." },
          { id: "d", text: "TDS = 2.1", correct: false, explanation: "TDS 2.1 — признаки явно доброкачественного образования." },
        ],
      },
      {
        id: 3,
        stage: "diagnosis",
        stageLabel: "Диагноз",
        question: "Биопсия подтвердила меланому. Толщина по Бреслоу 1.2 мм, без изъязвления. Какая стадия?",
        hint: "T1: ≤1 мм, T2: 1.01–2 мм, T3: 2.01–4 мм, T4: > 4 мм",
        options: [
          { id: "a", text: "Стадия I (T1b)", correct: false, explanation: "T1b — толщина ≤1 мм с изъязвлением или митозами. Здесь толщина 1.2 мм, что выходит за рамки T1." },
          { id: "b", text: "Стадия IIA (T2a)", correct: true, explanation: "T2a: толщина 1.01–2 мм без изъязвления. При отсутствии поражения лимфоузлов — стадия IIA." },
          { id: "c", text: "Стадия IIB (T3a)", correct: false, explanation: "T3a соответствует толщине 2.01–4 мм без изъязвления. Здесь 1.2 мм." },
          { id: "d", text: "Стадия III", correct: false, explanation: "Стадия III предполагает поражение регионарных лимфоузлов. Биопсия сторожевого узла не проводилась." },
        ],
      },
      {
        id: 4,
        stage: "treatment",
        stageLabel: "Тактика",
        question: "Меланома T2a N0 M0. Какова оптимальная тактика?",
        options: [
          { id: "a", text: "Наблюдение без лечения", correct: false, explanation: "Меланома — злокачественная опухоль, требующая активного лечения. Наблюдение недопустимо." },
          { id: "b", text: "Широкое иссечение + биопсия сторожевого лимфоузла", correct: true, explanation: "Стандарт лечения T2a: широкое иссечение с отступом 1–2 см + биопсия сторожевого лимфоузла для уточнения стадии." },
          { id: "c", text: "Только лучевая терапия", correct: false, explanation: "Лучевая терапия не является методом первой линии при первичной меланоме без метастазов." },
          { id: "d", text: "Криодеструкция образования", correct: false, explanation: "Криодеструкция неприемлема — не позволяет получить материал для гистологии и не обеспечивает радикальность." },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Инфекционные дерматозы",
    patient: "Ольга",
    age: 28,
    gender: "Ж",
    chiefComplaint: "Пузырьковая сыпь на губах, жжение, температура 37.4°C",
    diagnosis: "Простой герпес I типа",
    color: "from-indigo-600 to-blue-700",
    icon: "Shield",
    questions: [
      {
        id: 1,
        stage: "anamnesis",
        stageLabel: "Сбор анамнеза",
        question: "Пациентка с рецидивирующими высыпаниями на губах. Что провоцирует рецидивы герпеса?",
        hint: "ВПГ-1 персистирует в нервных ганглиях",
        options: [
          { id: "a", text: "Употребление острой пищи", correct: false, explanation: "Острая пища не является типичным триггером герпеса, хотя механическое раздражение возможно." },
          { id: "b", text: "Стресс, ОРВИ, переохлаждение, инсоляция", correct: true, explanation: "Классические триггеры рецидивов ВПГ: иммуносупрессия, стресс, инфекции, УФ-облучение, менструация — всё что снижает иммунитет." },
          { id: "c", text: "Только контакт с больным человеком", correct: false, explanation: "Рецидивы возникают из собственного латентного вируса в ганглиях, без повторного заражения." },
          { id: "d", text: "Нарушение режима сна более 2 дней", correct: false, explanation: "Депривация сна косвенно влияет через иммунитет, но не является специфическим триггером." },
        ],
      },
      {
        id: 2,
        stage: "examination",
        stageLabel: "Осмотр",
        question: "На губе — сгруппированные везикулы на гиперемированном основании. На какой стадии можно мазком взять материал на ПЦР?",
        options: [
          { id: "a", text: "Только в стадии корки", correct: false, explanation: "В стадии корки вирус уже малодоступен, эффективность ПЦР снижена." },
          { id: "b", text: "На стадии везикулы (до вскрытия)", correct: true, explanation: "Оптимальный момент для взятия ПЦР-мазка — стадия везикулы: вирусная нагрузка максимальна, содержимое пузырька легко доступно." },
          { id: "c", text: "Только в продромальном периоде", correct: false, explanation: "В продромальном периоде видимых элементов нет, материал взять затруднительно." },
          { id: "d", text: "После полного заживления", correct: false, explanation: "После заживления вирус в поражённой коже не определяется." },
        ],
      },
      {
        id: 3,
        stage: "diagnosis",
        stageLabel: "Диагноз",
        question: "ПЦР положительная на ВПГ-1. Это 4-й рецидив за год. Как классифицировать?",
        options: [
          { id: "a", text: "Первичный эпизод герпеса", correct: false, explanation: "Первичный эпизод — первый контакт с вирусом, обычно протекает тяжелее рецидивов." },
          { id: "b", text: "Часто рецидивирующий герпес (≥4 эпизодов в год)", correct: true, explanation: "≥4 рецидивов в год — критерий часто рецидивирующего герпеса, требующего супрессивной терапии." },
          { id: "c", text: "Атипичная форма герпеса", correct: false, explanation: "Клиника типичная (везикулы на эритеме), атипичных проявлений нет." },
          { id: "d", text: "Генерализованный герпес", correct: false, explanation: "Генерализованный герпес — тяжёлая форма с висцеральными поражениями, здесь поражены только губы." },
        ],
      },
      {
        id: 4,
        stage: "treatment",
        stageLabel: "Тактика",
        question: "Часто рецидивирующий ВПГ-1 (4 рецидива/год). Выберите оптимальную схему:",
        options: [
          { id: "a", text: "Ацикловир крем при появлении симптомов", correct: false, explanation: "Местная терапия при частых рецидивах недостаточна и не предотвращает новые эпизоды." },
          { id: "b", text: "Антибиотики (амоксициллин) курсом", correct: false, explanation: "Антибиотики не действуют на вирусы. ВПГ — вирус, а не бактерия." },
          { id: "c", text: "Супрессивная терапия: ацикловир 400 мг 2×/день 6–12 месяцев", correct: true, explanation: "Супрессивная терапия ацикловиром или валацикловиром снижает частоту рецидивов на 70–80% и рекомендована при ≥4 эпизодах/год." },
          { id: "d", text: "Кортикостероиды системно", correct: false, explanation: "Системные кортикостероиды противопоказаны при герпесе — они подавляют иммунитет и могут вызвать генерализацию инфекции." },
        ],
      },
    ],
  },
];

const stageIcons: Record<string, string> = {
  anamnesis: "ClipboardList",
  examination: "Eye",
  diagnosis: "FileSearch",
  treatment: "Pill",
};

interface Props {
  onClose: () => void;
  simId: number;
}

export default function SimulationQuiz({ onClose, simId }: Props) {
  const sim = simulations.find((s) => s.id === simId) ?? simulations[0];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; selected: string }[]>([]);
  const [finished, setFinished] = useState(false);

  const question = sim.questions[currentQ];
  const totalQ = sim.questions.length;
  const progress = ((currentQ) / totalQ) * 100;

  const correctCount = answers.filter((a) => a.correct).length;
  const score = Math.round((correctCount / totalQ) * 100);

  function handleSelect(optId: string) {
    if (confirmed) return;
    setSelected(optId);
  }

  function handleConfirm() {
    if (!selected) return;
    const isCorrect = question.options.find((o) => o.id === selected)?.correct ?? false;
    setAnswers((prev) => [...prev, { correct: isCorrect, selected }]);
    setConfirmed(true);
  }

  function handleNext() {
    if (currentQ + 1 >= totalQ) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  const selectedOption = question?.options.find((o) => o.id === selected);

  if (finished) {
    const grade =
      score >= 90 ? { label: "Отлично", color: "text-emerald-600", bg: "bg-emerald-50", icon: "Trophy" } :
      score >= 75 ? { label: "Хорошо", color: "text-blue-600", bg: "bg-blue-50", icon: "ThumbsUp" } :
      score >= 50 ? { label: "Удовлетворительно", color: "text-amber-600", bg: "bg-amber-50", icon: "Target" } :
                   { label: "Нужна работа", color: "text-red-600", bg: "bg-red-50", icon: "AlertCircle" };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
          <div className={`bg-gradient-to-br ${sim.color} p-8 text-center`}>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={grade.icon as string} size={40} className="text-white" />
            </div>
            <div className="text-white/80 text-sm font-medium mb-1">Симуляция завершена</div>
            <div className="text-white font-display font-bold text-2xl">{sim.title}</div>
          </div>

          <div className="p-8">
            <div className={`${grade.bg} rounded-2xl p-5 text-center mb-6`}>
              <div className={`text-5xl font-display font-black ${grade.color} mb-1`}>{score}%</div>
              <div className={`text-sm font-semibold ${grade.color}`}>{grade.label}</div>
              <div className="text-muted-foreground text-xs mt-1">
                Правильных ответов: {correctCount} из {totalQ}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {sim.questions.map((q, i) => {
                const ans = answers[i];
                return (
                  <div key={q.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${ans?.correct ? "bg-emerald-100" : "bg-red-100"}`}>
                      <Icon name={ans?.correct ? "Check" : "X"} size={12} className={ans?.correct ? "text-emerald-600" : "text-red-600"} />
                    </div>
                    <div className="flex-1 text-sm">{q.stageLabel}</div>
                    <span className={`text-xs font-semibold ${ans?.correct ? "text-emerald-600" : "text-red-500"}`}>
                      {ans?.correct ? "+25 баллов" : "0 баллов"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-all"
              >
                Закрыть
              </button>
              <button
                onClick={() => {
                  setCurrentQ(0);
                  setSelected(null);
                  setConfirmed(false);
                  setAnswers([]);
                  setFinished(false);
                }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "hsl(var(--primary))" }}
              >
                Пройти снова
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className={`bg-gradient-to-br ${sim.color} px-6 py-5`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white/70 text-xs font-medium">Симуляция</div>
              <div className="text-white font-display font-bold text-lg">{sim.title}</div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Icon name="X" size={14} className="text-white" />
            </button>
          </div>

          {/* Patient card */}
          <div className="bg-white/15 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center">
              <Icon name="User" size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{sim.patient}, {sim.age} лет ({sim.gender})</div>
              <div className="text-white/70 text-xs">{sim.chiefComplaint}</div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-white/60 text-xs mb-1.5">
              <span>Вопрос {currentQ + 1} из {totalQ}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stage badge */}
          <div className="flex items-center gap-2 mb-4">
            {(["anamnesis", "examination", "diagnosis", "treatment"] as const).map((stage, i) => {
              const stageQ = sim.questions.find((q) => q.stage === stage);
              const stageIdx = sim.questions.indexOf(stageQ!);
              const isDone = stageIdx < currentQ;
              const isCurrent = stageIdx === currentQ;
              return (
                <div key={stage} className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone ? "bg-emerald-100 text-emerald-600" :
                      isCurrent ? "text-white" : "bg-muted text-muted-foreground"
                    }`}
                    style={isCurrent ? { background: "hsl(var(--primary))" } : {}}
                  >
                    {isDone ? <Icon name="Check" size={10} /> : i + 1}
                  </div>
                  {i < 3 && <div className={`h-px w-6 ${isDone ? "bg-emerald-300" : "bg-border"}`} />}
                </div>
              );
            })}
            <span className="ml-2 text-xs font-semibold text-muted-foreground">{question.stageLabel}</span>
          </div>

          {/* Question */}
          <div className="mb-2">
            <p className="font-display font-bold text-base leading-snug text-foreground">{question.question}</p>
          </div>

          {question.hint && (
            <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <Icon name="Lightbulb" size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700">{question.hint}</p>
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5 mb-4">
            {question.options.map((opt) => {
              const isSelected = selected === opt.id;
              const showResult = confirmed;
              const isCorrect = opt.correct;

              let style = "border-border bg-white hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
              if (showResult && isCorrect) style = "border-emerald-400 bg-emerald-50 cursor-default";
              else if (showResult && isSelected && !isCorrect) style = "border-red-400 bg-red-50 cursor-default";
              else if (isSelected && !showResult) style = "border-primary bg-primary/8 cursor-pointer";

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`border-2 rounded-xl p-3.5 transition-all ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        showResult && isCorrect ? "border-emerald-500 bg-emerald-500" :
                        showResult && isSelected && !isCorrect ? "border-red-500 bg-red-500" :
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
                      }`}
                    >
                      {(showResult && isCorrect) && <Icon name="Check" size={12} className="text-white" />}
                      {(showResult && isSelected && !isCorrect) && <Icon name="X" size={12} className="text-white" />}
                      {(!showResult && isSelected) && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{opt.text}</span>
                      {showResult && isSelected && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.explanation}</p>
                      )}
                      {showResult && !isSelected && isCorrect && (
                        <p className="text-xs text-emerald-700 mt-1 leading-relaxed">{opt.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {answers.map((a, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${a.correct ? "bg-emerald-500" : "bg-red-400"}`} />
            ))}
            {Array.from({ length: totalQ - answers.length }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-muted-foreground/20" />
            ))}
          </div>

          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={!selected}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              style={{ background: "hsl(var(--primary))" }}
            >
              Подтвердить ответ
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all hover:opacity-90"
              style={{ background: "hsl(var(--emerald))" }}
            >
              {currentQ + 1 >= totalQ ? "Завершить" : "Следующий вопрос"}
              <Icon name="ArrowRight" size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
