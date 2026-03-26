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

interface Disease {
  name: string;
  category: string;
  prevalence: string;
  icon: string;
  color: string;
  badge: string;
  icd: string;
  definition: string;
  etiology: string;
  pathogenesis: string;
  clinicalFeatures: string;
  diagnostics: string;
  differentialDiagnosis: string;
  treatment: string;
  prognosis: string;
}

const diseases: Disease[] = [
  {
    name: "Псориаз", category: "Хроническое", prevalence: "2–3% населения", icon: "🔴",
    color: "from-red-50 to-rose-50", badge: "bg-red-100 text-red-700",
    icd: "L40",
    definition: "Хронический рецидивирующий иммуноопосредованный дерматоз с генетической предрасположенностью. Характеризуется гиперпролиферацией эпидермиса и нарушением кератинизации.",
    etiology: "Мультифакториальное заболевание: генетическая предрасположенность (HLA-Cw6), триггеры — стресс, инфекции (β-гемолитический стрептококк), травмы кожи (феномен Кёбнера), приём лекарств (β-блокаторы, литий, антималярийные), алкоголь.",
    pathogenesis: "Активация Th1/Th17-лимфоцитов → выброс IL-17, IL-23, TNF-α → гиперпролиферация кератиноцитов (цикл обновления 3–4 дня вместо 28). Формирование акантоза, паракератоза, микроабсцессов Мунро.",
    clinicalFeatures: "Мономорфная папулёзно-бляшечная сыпь с серебристо-белыми чешуйками. Излюбленная локализация: разгибательные поверхности, волосистая часть головы, пояснично-крестцовая область. Триада Ауспитца: «стеариновое пятно» → «терминальная плёнка» → «точечное кровотечение». Формы: вульгарный, каплевидный, пустулёзный, эритродермический, артропатический.",
    diagnostics: "Клинический диагноз на основании типичной картины и триады Ауспитца. Индексы тяжести: PASI, BSA, DLQI. Биопсия при сомнительных случаях: паракератоз, акантоз, удлинение дермальных сосочков, микроабсцессы Мунро. Дерматоскопия: равномерно распределённые точечные сосуды на красном фоне.",
    differentialDiagnosis: "Себорейный дерматит (жирные чешуйки, складки), розовый лишай Жибера (медальон, ориентация по линиям Лангера), грибовидный микоз (пойкилодермия), вторичный сифилис (анамнез, серология), экзема (мокнутие, полиморфизм).",
    treatment: "Лёгкая форма: топические ГКС (бетаметазон), аналоги витамина D3 (кальципотриол), комбинированные препараты. Средняя/тяжёлая: фототерапия (NB-UVB 311 нм), метотрексат 15–25 мг/нед, циклоспорин. Биологическая терапия: ингибиторы TNF-α (адалимумаб), IL-17 (секукинумаб, иксекизумаб), IL-23 (гуселькумаб, ризанкизумаб). Целевой PASI 90/100.",
    prognosis: "Хроническое течение с ремиссиями и обострениями. При адекватной терапии — контроль заболевания и высокое качество жизни. Риск коморбидности: псориатический артрит (до 30%), метаболический синдром, сердечно-сосудистые заболевания."
  },
  {
    name: "Экзема", category: "Воспалительное", prevalence: "10–20% детей", icon: "🟠",
    color: "from-orange-50 to-amber-50", badge: "bg-orange-100 text-orange-700",
    icd: "L20–L30",
    definition: "Группа воспалительных заболеваний кожи с характерным зудом, полиморфизмом высыпаний, склонностью к мокнутию и хроническому рецидивирующему течению.",
    etiology: "Атопическая: генетический дефект филаггрина (FLG), нарушение эпидермального барьера. Контактная аллергическая: сенсибилизация (никель, хром, формальдегид). Микробная: вторичная сенсибилизация к микробным антигенам. Себорейная: Malassezia spp.",
    pathogenesis: "Нарушение барьерной функции эпидермиса → трансэпидермальная потеря воды → проникновение аллергенов → Th2-ответ (IL-4, IL-13, IL-31) → зуд и воспаление. Хронизация: переключение на Th1-ответ, лихенификация.",
    clinicalFeatures: "Острая: эритема, папулы, везикулы, мокнутие, серозные корки. Подострая: шелушение, инфильтрация. Хроническая: лихенификация, трещины, гипер/гипопигментация. Атопическая: младенцы — лицо, разгибатели; дети — сгибатели, шея; взрослые — кисти, лицо, сгибы.",
    diagnostics: "Клинические критерии Hanifin–Rajka (4 больших + 3 малых). Оценка тяжести: SCORAD, EASI. Лабораторно: повышение общего IgE (неспецифично), аллерготесты (прик-тесты, спец. IgE). Патч-тесты при подозрении на контактную экзему. Биопсия: спонгиоз, акантоз.",
    differentialDiagnosis: "Псориаз (чёткие границы, серебристые чешуйки), чесотка (ходы, ночной зуд), грибковая инфекция (KOH+), Т-клеточная лимфома кожи (стойкие пятна), дерматит Дюринга (герпетиформное расположение, IgA).",
    treatment: "Базовый уход: эмоленты (церамиды, мочевина 5–10%) — постоянно. Обострение: топические ГКС (мометазон, метилпреднизолона ацепонат), ингибиторы кальциневрина (такролимус, пимекролимус). Тяжёлые формы: дупилумаб (anti-IL-4Rα), барицитиниб/упадацитиниб (JAK-ингибиторы), циклоспорин. Фототерапия: NB-UVB.",
    prognosis: "Атопическая экзема: у 60% детей ремиссия к подростковому возрасту. Хроническое течение у 40% взрослых. «Атопический марш»: экзема → аллергический ринит → бронхиальная астма."
  },
  {
    name: "Меланома", category: "Онкологическое", prevalence: "1.7% всех раков", icon: "⚫",
    color: "from-slate-50 to-gray-50", badge: "bg-slate-100 text-slate-700",
    icd: "C43",
    definition: "Злокачественная опухоль из меланоцитов. Высоко агрессивна, рано метастазирует лимфогенно и гематогенно. Наиболее опасное новообразование кожи.",
    etiology: "Факторы риска: УФ-излучение (особенно солнечные ожоги в детстве), фототип I–II по Фицпатрику, множественные невусы (>50), диспластические невусы, семейный анамнез, мутации BRAF (40–60%), NRAS, CDKN2A. Предшественники: диспластический невус, лентиго-меланоз.",
    pathogenesis: "Мутации → нарушение апоптоза и неконтролируемая пролиферация меланоцитов. Фазы роста: радиальная (in situ, горизонтальная) → вертикальная (инвазия в дерму, метастазирование). BRAF V600E → активация MAPK-пути.",
    clinicalFeatures: "Правило ABCDE: Asymmetry — асимметрия; Border — неровные края; Color — неоднородность цвета (коричневый, чёрный, красный, белый, голубой); Diameter >6 мм; Evolution — изменение во времени. Типы: поверхностно-распространяющаяся (70%), узловая (15%), лентиго-меланома (10%), акральная.",
    diagnostics: "Дерматоскопия (ELM): асимметрия структур, атипичная пигментная сеть, бело-голубые структуры, атипичные сосуды. Эксцизионная биопсия (НИКОГДА инцизионная!). Гистология: толщина по Бреслоу, уровень по Кларку, митотический индекс, изъязвление. Стадирование: AJCC TNM. ЛДГ, КТ/ПЭТ-КТ при подозрении на метастазы.",
    differentialDiagnosis: "Себорейный кератоз (комедоноподобные отверстия, «приклеенный» вид), пигментная базалиома (жемчужные структуры), гемангиома (красные лакуны), дерматофиброма (белая сеть), невус Шпиц (starburst-паттерн), подногтевая гематома (анамнез травмы).",
    treatment: "Хирургическое иссечение: in situ — отступ 0.5 см; <1 мм — 1 см; >1 мм — 2 см. Биопсия сторожевого лимфоузла при толщине >0.8 мм. Адъювантная терапия: анти-PD-1 (ниволумаб, пембролизумаб), BRAF+MEK ингибиторы (дабрафениб + траметиниб) при BRAF+. Метастатическая: иммунотерапия (ниволумаб + ипилимумаб), таргетная терапия.",
    prognosis: "5-летняя выживаемость: IA стадия — 97%, IB — 92%, IIA — 81%, IIB — 70%, IIC — 53%, III — 40–78%, IV — 15–20%. Толщина по Бреслоу — главный прогностический фактор. Изъязвление ухудшает прогноз."
  },
  {
    name: "Рожа", category: "Инфекционное", prevalence: "Частое", icon: "🟡",
    color: "from-yellow-50 to-amber-50", badge: "bg-yellow-100 text-yellow-700",
    icd: "A46",
    definition: "Острое инфекционное заболевание кожи, вызываемое β-гемолитическим стрептококком группы A (Streptococcus pyogenes). Характеризуется очаговым серозным или серозно-геморрагическим воспалением дермы.",
    etiology: "Возбудитель: Streptococcus pyogenes (ГСА). Входные ворота: микротравмы, трещины, грибковые поражения стоп, послеоперационные раны. Предрасполагающие факторы: лимфостаз, хроническая венозная недостаточность, сахарный диабет, ожирение, иммунодефицит.",
    pathogenesis: "Проникновение стрептококка в лимфатические сосуды дермы → серозное воспаление → отёк, лимфангиит → нарушение лимфодренажа. Токсины стрептококка (стрептолизин O, гиалуронидаза, М-белок) → усиление воспаления, аллергизация. Рецидивы → фиброз → стойкий лимфостаз (слоновость).",
    clinicalFeatures: "Острое начало: озноб, лихорадка 38–40°С, интоксикация. Через 6–12 часов — яркая эритема с чёткими границами («языки пламени»), отёк, жжение, болезненность. Формы: эритематозная, буллёзная (пузыри с серозным содержимым), геморрагическая (петехии, экхимозы), некротическая. Локализация: 60–70% — голени, 20% — лицо.",
    diagnostics: "Преимущественно клинический диагноз. ОАК: лейкоцитоз, нейтрофилёз, ускорение СОЭ. Повышение СРБ, прокальцитонина. Бактериологическое исследование малоинформативно (высеваемость <5%). АСЛО (при рецидивах). УЗИ мягких тканей — дифференциация с абсцессом.",
    differentialDiagnosis: "Флегмона (нет чётких границ, более глубокое поражение), контактный дерматит (зуд, анамнез контакта), тромбоз глубоких вен (отёк всей конечности, D-димер), опоясывающий лишай (дерматомное распределение), эризипелоид (профессиональный анамнез).",
    treatment: "Антибиотики выбора: бензилпенициллин 2–12 млн ЕД/сут в/м 10 дней; амоксициллин 500 мг × 3 р/д per os. Альтернатива (аллергия на β-лактамы): азитромицин, клиндамицин. Буллёзная форма: обработка пузырей, антисептики. Рецидивирующая: бициллин-5 1.5 млн ЕД в/м 1 раз в 3–4 нед (профилактика). Компрессионная терапия при лимфостазе.",
    prognosis: "При адекватной терапии — выздоровление за 7–14 дней. Рецидивы у 30–40% пациентов. Осложнения: лимфостаз (слоновость), абсцедирование, сепсис (редко). Профилактика рецидивов: санация входных ворот (лечение микозов стоп), бициллинопрофилактика."
  },
  {
    name: "Атопический дерматит", category: "Аллергическое", prevalence: "15–20% населения", icon: "🟣",
    color: "from-purple-50 to-violet-50", badge: "bg-purple-100 text-purple-700",
    icd: "L20",
    definition: "Хроническое рецидивирующее воспалительное заболевание кожи с генетической предрасположенностью, характеризующееся интенсивным зудом, сухостью кожи и возрастной морфологией высыпаний.",
    etiology: "Генетика: мутации гена филаггрина (FLG) — до 50% пациентов. Семейная атопия (астма, ринит, АтД). Триггеры: пищевые аллергены (дети), аэроаллергены, Staphylococcus aureus (колонизация у 90%), стресс, раздражающие вещества, климат (сухой, холодный воздух).",
    pathogenesis: "Дефект эпидермального барьера (↓ филаггрин, ↓ церамиды) → ↑ трансэпидермальная потеря воды → проникновение аллергенов и микробов → Th2-поляризация: IL-4, IL-13 (подавляют барьерные белки), IL-31 (зуд), IL-5 (эозинофилия). Цикл «зуд–расчёс» → лихенификация.",
    clinicalFeatures: "Младенческая фаза (2 мес – 2 года): экссудативные очаги на щеках, лбу, разгибателях. Детская (2–12 лет): лихенификация в сгибах (локти, колени, шея), сухость. Взрослая: диффузная сухость, лихенификация кистей, лица, шеи. «Малые» признаки: белый дермографизм, складки Денни–Моргана, потемнение вокруг глаз.",
    diagnostics: "Критерии Hanifin–Rajka: зуд + 3 из 4 (типичная морфология и локализация, хроническое рецидивирующее течение, атопия в анамнезе, начало в раннем возрасте). Индексы: SCORAD (площадь + интенсивность + субъективные симптомы), EASI, IGA. Общий IgE (↑ у 80%). Аллергообследование: прик-тесты, sIgE.",
    differentialDiagnosis: "Себорейный дерматит (жирные чешуйки, отсутствие зуда), чесотка (ходы, ночной зуд, семейный очаг), псориаз (серебристые чешуйки, триада), контактный дерматит (чёткая связь с аллергеном), Т-клеточная лимфома (стойкие пятна), ихтиоз (сухость без воспаления).",
    treatment: "Базис: эмоленты (300–500 г/мес) — ПОСТОЯННО, увлажнение, избегание триггеров. Обострение лёгкое: тГКС средней силы (мометазон), ИКН (такролимус 0.03–0.1%, пимекролимус). Проактивная терапия: тГКС/ИКН 2 р/нед на зоны частых рецидивов. Средне-тяжёлое: фототерапия NB-UVB. Тяжёлое: дупилумаб (anti-IL-4Rα) п/к — 1 линия, JAK-ингибиторы (барицитиниб, упадацитиниб, аброцитиниб). Антигистаминные — только при сопутствующих аллергических заболеваниях.",
    prognosis: "60% детей — ремиссия к подростковому возрасту. 40% — персистирующее течение у взрослых. Атопический марш: АтД → аллергический ринит (50%) → бронхиальная астма (30%). Значительное снижение качества жизни (зуд, нарушение сна, стигматизация)."
  },
  {
    name: "Акне", category: "Хроническое", prevalence: "85% подростков", icon: "🔵",
    color: "from-blue-50 to-sky-50", badge: "bg-blue-100 text-blue-700",
    icd: "L70",
    definition: "Хроническое воспалительное заболевание сальных желёз и волосяных фолликулов, характеризующееся себореей, комедонами, папулами, пустулами и в тяжёлых случаях — узлами и рубцами.",
    etiology: "4 ключевых фактора: гиперандрогения / повышенная чувствительность рецепторов к андрогенам, фолликулярный гиперкератоз (закупорка устья фолликула), гиперсекреция кожного сала, колонизация Cutibacterium acnes. Триггеры: стресс, диета (молочные продукты, высокий ГИ), комедогенная косметика, приём анаболиков.",
    pathogenesis: "Андрогены → ↑ себопродукция → фолликулярный гиперкератоз → микрокомедон → закрытый комедон → открытый комедон. C. acnes активирует TLR-2 → IL-1α, TNF-α → воспаление (папула, пустула). Разрыв стенки фолликула → гранулематозное воспаление (узел, киста) → рубцевание.",
    clinicalFeatures: "Невоспалительные: открытые комедоны («чёрные точки»), закрытые комедоны. Воспалительные: папулы, пустулы, узлы (>5 мм), кисты. Постакне: атрофические рубцы (ice-pick, boxcar, rolling), поствоспалительная гипер/гипопигментация. Локализация: лицо (99%), спина (60%), грудь (15%).",
    diagnostics: "Клинический диагноз. Классификация по тяжести: комедональное, лёгкое папуло-пустулёзное, средне-тяжёлое папуло-пустулёзное, тяжёлое узловато-кистозное. Шкалы: IGA (0–4), GEA. У женщин: гормональное обследование при позднем начале, гирсутизме, нарушениях цикла (тестостерон, ДГЭА-С, 17-ОНП).",
    differentialDiagnosis: "Розацеа (телеангиэктазии, без комедонов, >30 лет), периоральный дерматит (мелкие папулы вокруг рта), фолликулит (монодерм, нет комедонов), демодекоз (папулы, пустулы, шелушение), медикаментозные акнеформные высыпания (анамнез приёма ГКС, EGFR-ингибиторов).",
    treatment: "Комедональное: адапален 0.1% (ретиноид). Лёгкое: адапален + бензоилпероксид 2.5% (комбинация). Средне-тяжёлое: + системные антибиотики (доксициклин 100 мг/д, 3 мес). Тяжёлое / рубцующее: изотретиноин 0.5–1.0 мг/кг/д, 6–9 мес (кумулятивная доза 120–150 мг/кг). Женщины: КОК (дроспиренон), спиронолактон. Поддержание: адапален длительно.",
    prognosis: "Улучшение у большинства к 20–25 годам. Стойкие акне у взрослых — до 20% (чаще женщины). Рубцы формируются у 30–40%, требуют лазерной коррекции. Изотретиноин — рецидив <20% после полного курса. Психологическое влияние: тревожность, депрессия, снижение самооценки."
  },
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
  { id: 1, title: "Диагностика псориаза", description: "Распознавание псориатических бляшек, триада Ауспитца, оценка PASI", duration: "15 мин", steps: 5, icon: "Microscope", color: "from-blue-600 to-blue-700", level: "Базовый" },
  { id: 2, title: "Онкодерматология", description: "Оценка пигментных образований по ABCDE, дерматоскопия, стадирование меланомы", duration: "15 мин", steps: 5, icon: "Search", color: "from-emerald-600 to-teal-700", level: "Продвинутый" },
  { id: 3, title: "Инфекционные дерматозы", description: "Диагностика и лечение рецидивирующего герпеса, супрессивная терапия", duration: "15 мин", steps: 5, icon: "Shield", color: "from-indigo-600 to-blue-700", level: "Средний" },
  { id: 4, title: "Атопический дерматит", description: "Критерии диагностики АтД, оценка SCORAD, биологическая терапия", duration: "15 мин", steps: 5, icon: "Flame", color: "from-orange-600 to-amber-700", level: "Средний" },
  { id: 5, title: "Сифилис", description: "Первичный сифилис: клиника, серодиагностика, лечение пенициллином", duration: "15 мин", steps: 5, icon: "AlertTriangle", color: "from-rose-600 to-red-700", level: "Продвинутый" },
  { id: 6, title: "Акне", description: "Классификация акне, шкала IGA, комбинированная терапия, изотретиноин", duration: "15 мин", steps: 5, icon: "Droplets", color: "from-sky-600 to-blue-700", level: "Базовый" },
  { id: 7, title: "Острая крапивница", description: "Дифференциальная диагностика волдырей, ангиоотёк, уртикарный васкулит", duration: "15 мин", steps: 5, icon: "Zap", color: "from-pink-600 to-rose-700", level: "Средний" },
  { id: 8, title: "Микозы кожи", description: "Дерматофитии, микроскопия с KOH, лампа Вуда, антимикотическая терапия", duration: "15 мин", steps: 5, icon: "Bug", color: "from-lime-600 to-green-700", level: "Базовый" },
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
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

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
                    DermaMed Trainer
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
                  <div
                    key={i}
                    onClick={() => setSelectedDisease(d)}
                    className={`bg-gradient-to-br ${d.color} rounded-2xl p-5 border border-border card-hover cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{d.icon}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.badge}`}>{d.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-base mb-1">{d.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{d.prevalence}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Icon name="FileText" size={11} /> МКБ {d.icd}</span>
                      <span className="flex items-center gap-1"><Icon name="Pill" size={11} /> Лечение</span>
                      <span className="flex items-center gap-1"><Icon name="ChevronRight" size={11} /> Подробнее</span>
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

      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl border border-border w-full max-w-3xl mx-4 animate-slide-up">
            <div className={`bg-gradient-to-br ${selectedDisease.color} rounded-t-2xl p-6 border-b border-border relative`}>
              <button
                onClick={() => setSelectedDisease(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedDisease.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-display font-bold text-2xl">{selectedDisease.name}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedDisease.badge}`}>{selectedDisease.category}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Icon name="FileText" size={13} /> МКБ-10: {selectedDisease.icd}</span>
                    <span>·</span>
                    <span>{selectedDisease.prevalence}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {[
                { title: "Определение", icon: "BookOpen", content: selectedDisease.definition },
                { title: "Этиология", icon: "Dna", content: selectedDisease.etiology },
                { title: "Патогенез", icon: "GitBranch", content: selectedDisease.pathogenesis },
                { title: "Клиническая картина", icon: "Eye", content: selectedDisease.clinicalFeatures },
                { title: "Диагностика", icon: "Microscope", content: selectedDisease.diagnostics },
                { title: "Дифференциальная диагностика", icon: "GitCompare", content: selectedDisease.differentialDiagnosis },
                { title: "Лечение", icon: "Pill", content: selectedDisease.treatment },
                { title: "Прогноз", icon: "TrendingUp", content: selectedDisease.prognosis },
              ].map((section) => (
                <div key={section.title} className="border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/40 border-b border-border">
                    <Icon name={section.icon as IconName} size={15} className="text-primary shrink-0" />
                    <h3 className="font-display font-semibold text-sm">{section.title}</h3>
                  </div>
                  <p className="px-4 py-3 text-sm text-foreground/80 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border flex justify-end">
              <button
                onClick={() => setSelectedDisease(null)}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "hsl(var(--primary))" }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}