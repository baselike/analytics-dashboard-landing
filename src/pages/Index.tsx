import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const DASHBOARD_IMG = "https://cdn.poehali.dev/projects/315870e9-1209-4611-bed0-4604659a1c9e/files/233ee78f-e44e-4c96-8585-6367074dbce1.jpg";

const metrics = [
  { label: "Лидов приходит", icon: "TrendingUp" },
  { label: "Конверсия по этапам", icon: "Filter" },
  { label: "Средний чек", icon: "CircleDollarSign" },
  { label: "Выручка", icon: "BarChart2" },
  { label: "Цикл сделки", icon: "Clock" },
  { label: "Активность менеджеров", icon: "Users" },
  { label: "Причины отказов", icon: "XCircle" },
  { label: "Просроченные задачи", icon: "AlertCircle" },
  { label: "Сколько оплачивает", icon: "CreditCard" },
];

const problems = [
  { text: "Где теряются лиды — непонятно" },
  { text: "Почему падает выручка — непонятно" },
  { text: "Кто реально эффективен — непонятно" },
  { text: "Где тормозит воронка — неизвестно" },
];

const results = [
  { text: "Руководитель видит реальные цифры", icon: "Eye" },
  { text: "Видно узкие места воронки", icon: "GitMerge" },
  { text: "Появляется контроль дисциплины", icon: "Shield" },
  { text: "Решения принимаются на основе данных", icon: "Lightbulb" },
  { text: "Отдел продаж становится управляемым", icon: "Target" },
];

const steps = [
  {
    num: "01",
    title: "Подключаемся к CRM",
    desc: "Собираем все данные: сделки, этапы, пользователей, задачи, бюджеты, причины отказов, историю движения по воронке. Обновление каждые 5–15 минут.",
  },
  {
    num: "02",
    title: "Нормализуем данные",
    desc: "CRM почти всегда ведётся с ошибками: задним числом меняются статусы, не заполняются поля, дублируются сделки. Мы создаём единый массив управляемых данных.",
  },
  {
    num: "03",
    title: "Создаём систему метрик",
    desc: "Прозрачная картина бизнеса: лиды, конверсии, средний чек, выручка, активность менеджеров. Базовый управленческий слой.",
  },
  {
    num: "04",
    title: "Настраиваем дашборды",
    desc: "Понятные визуальные панели по отделу, каждому менеджеру, воронке и динамике выручки. Без Excel, без ручных таблиц.",
  },
];

const whenNeeded = [
  "Отдел продаж больше 2–3 человек",
  "Есть ощущение, что деньги «утекают»",
  "Рост замедлился без видимых причин",
  "Решения принимаются интуитивно",
  "CRM есть, но пользы от неё мало",
];

const cases = [
  {
    industry: "Строительство",
    company: "Застройщик, 12 менеджеров",
    result: "Нашли этап, на котором терялось 40% лидов. Конверсия выросла на 18% за первый месяц.",
    metric: "+18% конверсия",
  },
  {
    industry: "B2B услуги",
    company: "ИТ-интегратор, 8 менеджеров",
    result: "Выявили, что 3 менеджера из 8 делают 70% выручки. Перераспределили нагрузку и ввели стандарты.",
    metric: "×2.3 выручка",
  },
  {
    industry: "Оптовая торговля",
    company: "Дистрибьютор, 6 менеджеров",
    result: "Сократили цикл сделки с 34 до 19 дней за счёт видимости просроченных задач.",
    metric: "−44% цикл сделки",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EFEFEF] font-ibm">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EFEFEF]/90 backdrop-blur-sm border-b border-[#181816]/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <img
            src="https://cdn.poehali.dev/projects/315870e9-1209-4611-bed0-4604659a1c9e/bucket/2372e756-487c-4b66-aea8-117236f071e4.png"
            alt="Baselike"
            className="h-9 w-auto"
          />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#181816]/70">
            <a href="#problem" className="hover:text-[#181816] transition-colors">Проблема</a>
            <a href="#solution" className="hover:text-[#181816] transition-colors">Решение</a>
            <a href="#process" className="hover:text-[#181816] transition-colors">Процесс</a>
            <a href="#cases" className="hover:text-[#181816] transition-colors">Кейсы</a>
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex bg-[#9050FF] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[#7a3de0] transition-colors"
          >
            Обсудить проект
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#EFEFEF] border-t border-[#181816]/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            <a href="#problem" onClick={() => setMenuOpen(false)}>Проблема</a>
            <a href="#solution" onClick={() => setMenuOpen(false)}>Решение</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>Процесс</a>
            <a href="#cases" onClick={() => setMenuOpen(false)}>Кейсы</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-[#9050FF] text-white px-4 py-2.5 rounded-sm text-center">Обсудить проект</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <Section>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#D4F236] text-[#181816] text-xs font-semibold px-3 py-1.5 rounded-sm mb-6 uppercase tracking-widest">
                Аналитический дашборд
              </div>
              <h1 className="font-golos font-black text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-[#181816] mb-6">
                От хаоса к<br />
                <span className="text-[#9050FF]">управляемым</span><br />
                цифрам
              </h1>
              <p className="text-lg text-[#181816]/60 leading-relaxed mb-8 max-w-lg">
                Аналитика продаж на базе CRM. Подключаем, нормализуем, выстраиваем метрики — за 2–4 недели у вас есть рабочий дашборд.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#181816] text-[#EFEFEF] font-medium px-7 py-4 rounded-sm hover:bg-[#2a2a28] transition-colors"
                >
                  Обсудить внедрение
                  <Icon name="ArrowRight" size={18} />
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center justify-center gap-2 border border-[#181816]/20 text-[#181816] font-medium px-7 py-4 rounded-sm hover:border-[#181816]/40 transition-colors"
                >
                  Как это работает
                </a>
              </div>
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-[#181816]/10">
                <div>
                  <div className="font-golos font-black text-3xl text-[#181816]">2–4</div>
                  <div className="text-xs text-[#181816]/50 mt-0.5">недели до запуска</div>
                </div>
                <div className="w-px h-10 bg-[#181816]/10" />
                <div>
                  <div className="font-golos font-black text-3xl text-[#181816]">15 мин</div>
                  <div className="text-xs text-[#181816]/50 mt-0.5">обновление данных</div>
                </div>
                <div className="w-px h-10 bg-[#181816]/10" />
                <div>
                  <div className="font-golos font-black text-3xl text-[#9050FF]">9+</div>
                  <div className="text-xs text-[#181816]/50 mt-0.5">ключевых метрик</div>
                </div>
              </div>
            </div>
            <div className="lg:w-[440px] flex-shrink-0">
              <div className="rounded-sm overflow-hidden border border-[#181816]/10 shadow-2xl shadow-[#181816]/10">
                <img
                  src={DASHBOARD_IMG}
                  alt="Аналитический дашборд"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* WHEN NEEDED */}
      <section id="when" className="py-20 px-6 bg-[#181816]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="flex flex-col lg:flex-row lg:items-start gap-16">
              <div className="lg:w-80 flex-shrink-0">
                <div className="text-[#D4F236] text-xs font-semibold uppercase tracking-widest mb-4">Когда нужна аналитика</div>
                <h2 className="font-golos font-black text-4xl text-white leading-tight">
                  Узнайте<br />себя
                </h2>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                {whenNeeded.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-sm px-5 py-4 hover:bg-white/8 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D4F236] flex-shrink-0" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-[#9050FF] text-xs font-semibold uppercase tracking-widest mb-4">Проблема</div>
            <h2 className="font-golos font-black text-4xl lg:text-5xl text-[#181816] mb-4 leading-tight max-w-xl">
              Большинство компаний принимают решения «по ощущениям»
            </h2>
            <p className="text-[#181816]/60 mb-12 max-w-lg">
              Менеджеры работают, сделки идут — но картина размытая. Вот что это значит на практике:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#181816]/8 rounded-sm p-6 hover-scale"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#181816] rounded-sm flex items-center justify-center flex-shrink-0">
                      <Icon name="HelpCircle" size={18} className="text-[#EFEFEF]" />
                    </div>
                    <p className="text-[#181816] font-medium leading-snug pt-1.5">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-[#D4F236] rounded-sm p-6">
              <p className="font-golos font-bold text-xl text-[#181816]">
                Мы делаем так, чтобы у собственника были цифры, а не догадки.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* SOLUTION / METRICS */}
      <section id="solution" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-[#9050FF] text-xs font-semibold uppercase tracking-widest mb-4">Решение</div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
              <h2 className="font-golos font-black text-4xl lg:text-5xl text-[#181816] leading-tight max-w-lg">
                Метрики, которые видит руководитель
              </h2>
              <p className="text-[#181816]/60 max-w-xs lg:text-right">
                Прозрачная картина всего отдела продаж в одном месте
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="bg-[#EFEFEF] rounded-sm p-5 flex items-center gap-3 hover-scale group"
                >
                  <div className="w-9 h-9 bg-[#9050FF] rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#7a3de0] transition-colors">
                    <Icon name={m.icon} size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-[#181816] leading-snug">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { label: "По отделу продаж", icon: "Building2" },
                { label: "По каждому менеджеру", icon: "User" },
                { label: "По динамике выручки", icon: "TrendingUp" },
              ].map((d, i) => (
                <div key={i} className="border-2 border-[#181816]/8 rounded-sm p-5 flex items-center gap-3">
                  <Icon name={d.icon} size={20} className="text-[#9050FF]" />
                  <span className="font-medium text-sm text-[#181816]">{d.label}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-[#9050FF] text-xs font-semibold uppercase tracking-widest mb-4">Процесс</div>
            <h2 className="font-golos font-black text-4xl lg:text-5xl text-[#181816] mb-12 leading-tight max-w-xl">
              Как происходит внедрение
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-sm p-8 border border-[#181816]/8 hover-scale"
                >
                  <div className="font-golos font-black text-5xl text-[#181816]/8 mb-4 leading-none">{s.num}</div>
                  <h3 className="font-golos font-bold text-xl text-[#181816] mb-3">{s.title}</h3>
                  <p className="text-[#181816]/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-[#181816] rounded-sm p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-golos font-bold text-white text-lg mb-1">Срок внедрения: 2–4 недели</p>
                <p className="text-white/40 text-sm">Данные обновляются каждые 5–15 минут после запуска</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#D4F236] text-[#181816] font-semibold px-6 py-3 rounded-sm hover:bg-[#c4e320] transition-colors whitespace-nowrap"
              >
                Начать внедрение
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </Section>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-24 px-6 bg-[#9050FF]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-[#D4F236] text-xs font-semibold uppercase tracking-widest mb-4">Результаты</div>
            <h2 className="font-golos font-black text-4xl lg:text-5xl text-white mb-12 leading-tight max-w-xl">
              Что меняется после внедрения
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 rounded-sm p-6 hover:bg-white/15 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#D4F236] rounded-sm flex items-center justify-center mb-4">
                    <Icon name={r.icon} size={18} className="text-[#181816]" />
                  </div>
                  <p className="text-white font-medium leading-snug">{r.text}</p>
                </div>
              ))}
              <div className="bg-[#D4F236] rounded-sm p-6 sm:col-span-2 lg:col-span-1 flex items-center">
                <p className="font-golos font-bold text-[#181816] text-lg leading-snug">
                  Если собственник начинает требовать правильного ведения CRM — система работает.
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="text-[#9050FF] text-xs font-semibold uppercase tracking-widest mb-4">Кейсы</div>
            <h2 className="font-golos font-black text-4xl lg:text-5xl text-[#181816] mb-12 leading-tight max-w-xl">
              Примеры успешного внедрения
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {cases.map((c, i) => (
                <div
                  key={i}
                  className="bg-[#EFEFEF] rounded-sm p-7 flex flex-col hover-scale border border-[#181816]/6"
                >
                  <div className="text-xs font-semibold text-[#9050FF] uppercase tracking-widest mb-2">{c.industry}</div>
                  <div className="text-sm text-[#181816]/50 mb-4">{c.company}</div>
                  <p className="text-[#181816] text-sm leading-relaxed flex-1 mb-6">{c.result}</p>
                  <div className="bg-[#181816] text-[#D4F236] font-golos font-black text-xl rounded-sm px-4 py-3 inline-block self-start">
                    {c.metric}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-[#181816]">
        <div className="max-w-6xl mx-auto">
          <Section>
            <div className="max-w-2xl">
              <div className="text-[#D4F236] text-xs font-semibold uppercase tracking-widest mb-4">Начать работу</div>
              <h2 className="font-golos font-black text-4xl lg:text-5xl text-white mb-4 leading-tight">
                Готовы превратить данные в управление?
              </h2>
              <p className="text-white/50 mb-10 leading-relaxed">
                Расскажите о своём бизнесе — и мы покажем, как будет выглядеть ваш дашборд. Бесплатная консультация, без обязательств.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Ваше имя и компания"
                  className="flex-1 bg-white/8 border border-white/15 rounded-sm px-5 py-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#9050FF] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон или Telegram"
                  className="flex-1 bg-white/8 border border-white/15 rounded-sm px-5 py-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#9050FF] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#9050FF] text-white font-semibold px-7 py-4 rounded-sm hover:bg-[#7a3de0] transition-colors whitespace-nowrap"
                >
                  Отправить
                </button>
              </form>
              <p className="text-white/25 text-xs mt-4">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[#181816]/10 bg-[#EFEFEF]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img
            src="https://cdn.poehali.dev/projects/315870e9-1209-4611-bed0-4604659a1c9e/bucket/2372e756-487c-4b66-aea8-117236f071e4.png"
            alt="Baselike"
            className="h-7 w-auto"
          />
          <p className="text-[#181816]/40 text-sm">Аналитика продаж на базе CRM</p>
          <p className="text-[#181816]/30 text-xs">© 2024 Baselike. Все права защищены.</p>
        </div>
      </footer>

    </div>
  );
}