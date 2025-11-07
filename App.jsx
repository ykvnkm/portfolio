import React, { useState, useEffect } from 'react';

// Подключение шрифтов
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Header Component
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'bg-transparent'}`} style={{ backgroundColor: scrolled ? '#000000' : 'transparent' }}>
      <div className="w-full max-w-[1200px] mx-auto px-[92px] py-6 flex items-center justify-between">
        <div className="h-10 w-10">
          <img src="/images/logo.svg" alt="Logo" className="h-full w-full object-contain" />
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <button onClick={() => scrollToSection('projects')} className="text-[#b3c2cb] hover:text-white transition" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '15px', fontWeight: '400', lineHeight: '100%' }}>
            Проекты
          </button>
          <button onClick={() => scrollToSection('skills')} className="text-[#b3c2cb] hover:text-white transition" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '15px', fontWeight: '400', lineHeight: '100%' }}>
            Навыки и опыт
          </button>
          <a href="https://t.me/ykvnkm" target="_blank" rel="noopener noreferrer" className="bg-[#0f151f] text-[#e6e6e6] px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '15px', fontWeight: '400', lineHeight: '100%' }}>
            Связаться со мной
          </a>
        </nav>
      </div>
    </header>
  );
}

// Avatar + Name Section
function HeroSection() {
  return (
    <section style={{ paddingTop: '164px' }}>
      <div className="w-full max-w-[1200px] mx-auto px-[92px] pb-[96px]">
        <div className="flex flex-col items-center">
          <div className="w-[132px] h-[132px] rounded-full overflow-hidden mb-6" style={{ animation: 'fadeIn 0.8s ease-out' }}>
            <img 
              src="/images/avatar.jpeg" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-center text-[#e6e6e6] mb-6" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '46px', fontWeight: '400', letterSpacing: '-0.7px', lineHeight: '120%', animation: 'slideUp 0.6s ease-out 0.2s backwards' }}>
            Максим Яковенко
          </h1>
          
          <div className="text-center" style={{ animation: 'slideUp 0.6s ease-out 0.3s backwards' }}>
            <p className="text-[#b3c2cb] mb-3" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '20px', fontWeight: '400', lineHeight: '140%' }}>Junior UX/UI & Graphic designer</p>
            <div className="flex gap-4 justify-center text-[#b3c2cb]" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '20px', fontWeight: '400', lineHeight: '140%' }}>
              <a href="tel:+79882551161" className="hover:text-[#e6e6e6] transition">+7 (988) 255-11-61</a>
              <span>|</span>
              <a href="https://t.me/ykvnkm" target="_blank" rel="noopener noreferrer" className="hover:text-[#e6e6e6] transition">@ykvnkm</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

// What I Do Section
function WhatIDoSection() {
  const categories = [
    {
      title: 'Исследование',
      tags: ['Конкурентный анализ', 'Проблемные интервью', 'CJM', 'User Flow']
    },
    {
      title: 'UI-дизайн',
      tags: ['Композиция', 'Визуал', 'Компоненты', 'Адаптивность']
    },
    {
      title: 'Прототипирование',
      tags: ['Интерактивный дизайн']
    },
    {
      title: 'Упаковка и презентация',
      tags: ['Гайдлайны', 'Презентации', 'Отчеты']
    }
  ];

  return (
    <section className="py-[80px]" style={{ backgroundColor: '#000000' }}>
      <div className="w-full max-w-[1200px] mx-auto px-[92px]">
        {/* Заголовок с точкой */}
        <div className="flex items-center mb-[48px]">
          <img
            src="/images/dot.svg"
            alt="dot"
            className="w-[10px] h-[10px] mr-[16px]"
          />
          <h2
            className="text-[#E6E6E6]"
            style={{
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: '38px',
              fontWeight: '400',
              letterSpacing: '-0.7px',
              lineHeight: '120%'
            }}
          >
            Чем я занимаюсь
          </h2>
        </div>

        {/* Список категорий */}
        <div className="space-y-[16px]">
          {categories.map((category, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center">
                {/* Подзаголовок */}
                <h3
                  className="text-[#D1DAE0]"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '24px',
                    fontWeight: '400',
                    letterSpacing: '-0.5px',
                    lineHeight: '140%'
                  }}
                >
                  {category.title}
                </h3>

                {/* Теги */}
                <div className="flex flex-wrap justify-end gap-x-[24px] gap-y-[8px] max-w-[500px]">
                  {category.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[#B3C2CB]"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        letterSpacing: '0',
                        lineHeight: '120%'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Разделительная линия с отступом 16px сверху и снизу */}
              {idx < categories.length - 1 && (
                <div
                  className="h-px my-[24px]"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const projects = [
    {
      title: 'AIST Filter',
      description: 'Веб-приложение для фильтрации конфиденциальных и персональных данных в банковских чатах. Проект реализован в рамках хакатона «AIст» по заданию банка «Центр-Инвест»',
      circleColor: 'rgba(130,201,94,1)'
    },
    {
      title: 'CUPCAST',
      description: 'Веб-интерфейс предсказательной модели нейронной сети, которая помогает владельцам кофейных автоматов прогнозировать спрос на ближайшую неделю на основе аналитики и исторических данных о продажах',
      circleColor: 'rgba(212,135,64,1)'
    },
    {
      title: 'KOLPAK NEWS',
      description: 'Веб-приложение для чтения новостей STEM-направления с системой умного поиска по контексту на основе ИИ. Проект реализован в рамках форума «Хакатон Весна 2025» по заданию ФГУП «РНИИРС»',
      circleColor: 'rgba(15,100,153,1)'
    },
    {
      title: 'Rentbuddy',
      description: 'Сервис по поиску соседей для студентов на основе их персональных предпочтений. Платформа призвана помочь студентам быстро и просто найти подходящих людей для совместной аренды жилья',
      circleColor: 'rgba(186,138,214,1)'
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="w-full max-w-[1200px] mx-auto px-[92px]">
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-[#0f151f] rounded-[32px] border border-white/20 p-12 relative overflow-hidden min-h-[380px] flex"
              style={{ position: 'relative' }}
            >
              {/* Градиентный круг */}
              <svg
                style={{
                  position: 'absolute',
                  width: '590px',
                  height: '590px',
                  right: '-1px',
                  top: '-45px',
                  bottom: '-45px',
                  pointerEvents: 'none'
                }}
                viewBox="0 0 590 590"
              >
                <defs>
                  <radialGradient id={`grad-${idx}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={project.circleColor} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={project.circleColor} stopOpacity="0.05" />
                  </radialGradient>
                </defs>
                <circle cx="295" cy="295" r="295" fill={`url(#grad-${idx})`} />
              </svg>

              {/* Текст и изображение в две колонки */}
              <div className="flex gap-12 w-full relative z-10">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[#e6e6e6] mb-6" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '38px', fontWeight: '400', letterSpacing: '-0.7px', lineHeight: '120%' }}>
                      {project.title}
                    </h3>
                    <p className="text-[#b3c2cb]" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '20px', fontWeight: '400', lineHeight: '140%' }}>
                      {project.description}
                    </p>
                  </div>
                  <button className="bg-[#0f151f] text-white px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition w-fit" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
                    Подробнее
                  </button>
                </div>
                <div className="flex-1 min-h-[380px] bg-transparent rounded-2xl hidden lg:block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const textBlocks = [
    { text: "Я — UX/UI-дизайнер с техническим бэкграундом" },
    { text: "и опытом проектирования", tag: "веб-приложений" },
    { text: "Разрабатываю пользовательские сценарии," },
    { text: "прототипы и адаптивные интерфейсы", tag: "в Figma" },
    { text: "Понимаю процессы\n", tag: "UX-исследований" },
    { text: "и умею работать с дизайн-системами на практике." },
    { text: "Интересуюсь продуктами, связанными с", tag: "данными и AI" }
  ];

  return (
    <section style={{ padding: '80px 0', display: 'flex', justifyContent: 'center' }}>
      <div className="max-w-[640px] w-full px-[24px] flex flex-col gap-[16px] items-center">
        {textBlocks.map((block, idx) => (
          <div key={idx} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '24px', fontWeight: '400', letterSpacing: '-0.5px', lineHeight: '140%', color: '#e6e6e6', margin: 0, textAlign: 'center' }}>
              {block.text}
            </p>
            {block.tag && (
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#000',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                boxShadow: '0 30px 0 rgba(0,0,0,0.25)' // внешняя тень
              }}>
                <span className="shine" style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '20px',
                  fontWeight: '400',
                  lineHeight: '150%',
                  whiteSpace: 'nowrap',
                  textShadow: '0 30px 0 rgba(0,0,0,0.25)' // реалистичная тень
                }}>
                  {block.tag}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shine {
          display: inline-block;
          color: #b3c2cd;
          background: linear-gradient(
            90deg,
            #b3c2cd 0%,
            #b3c2cd 30%,
            #ffffff 50%,
            #b3c2cd 70%,
            #b3c2cd 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 0.25s cubic-bezier(0.12, 0.23, 0.5, 1) infinite;
          animation-direction: normal;
        }
      `}</style>
    </section>
  );
}

function SkillsTagsSection() {
  const skills = [
    'UX-аналитика', 'Исследование рынка', 'Проектирование интерфейсов', 'User Flow', 'UI-дизайн',
    'Типографика', 'Визуал', 'Адаптивный дизайн', 'Верстка', 'Дизайн-системы', 'Прототипирование',
    'Упаковка проекта', 'Презентация', 'Графический дизайн'
  ];

  return (
    <section id="skills" className="py-[96px]" style={{ backgroundColor: '#000000' }}>
      <div className="w-full max-w-[1200px] mx-auto px-[92px]">
        {/* Заголовок с точкой */}
        <div className="flex items-center mb-[48px]">
          <img
            src="/images/dot.svg"
            alt="dot"
            className="w-[10px] h-[10px] mr-[16px]"
          />
          <h2
            className="text-[#E6E6E6]"
            style={{
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: '38px',
              fontWeight: '400',
              letterSpacing: '-0.7px',
              lineHeight: '120%'
            }}
          >
            Навыки
          </h2>
        </div>

        {/* Теги */}
        <div
          className="flex flex-wrap gap-x-[12px] gap-y-[12px]"
          style={{ marginRight: '154px' }}
        >
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-[#0f151f] text-[#B3C2CB] border border-white/20 rounded-[8px] hover:border-white/40 transition"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                letterSpacing: '0',
                lineHeight: '140%',
                padding: '8px 12px'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      position: 'UX/UI & Graphic Designer',
      project: 'KOLPAK NEWS',
      date: 'апр 2025'
    },
    {
      position: 'UX/UI Designer',
      project: 'AIST Filter',
      date: 'фев — мар 2025'
    },
    {
      position: 'UX/UI Designer & Frontend Developer',
      project: 'CUPCAST',
      date: 'сен 2024 — янв 2025'
    },
    {
      position: 'Design Lead',
      project: 'Rentbuddy',
      date: 'сен 2023 — апр 2024'
    }
  ];

  return (
    <section className="py-24">
      <div className="w-full max-w-[1200px] mx-auto px-[92px]">
        {/* Заголовок */}
        <div className="flex items-center mb-12">
          <img
            src="/images/dot.svg"
            alt=""
            className="w-[10px] h-[10px] mr-4"
          />
          <h2
            className="text-[38px] font-normal text-[#E6E6E6]"
            style={{
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '-0.7px',
              lineHeight: '120%',
            }}
          >
            Опыт
          </h2>
        </div>

        {/* Список опыта */}
        <div className="space-y-0">
          {experiences.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center" style={{ gap: '24px' }}>
                {/* Левая часть — должность */}
                <h3
                  className="text-[24px] font-normal text-[#D1DAE0]"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    letterSpacing: '-0.5px',
                    lineHeight: '140%',
                  }}
                >
                  {exp.position}
                </h3>

                {/* Правая часть — организация и даты */}
                <div className="flex flex-col items-end" style={{ gap: '10px' }}>
                  <span
                    className="text-[18px] text-[#b3c2cb]"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      letterSpacing: '-0.2px',
                      lineHeight: '140%',
                    }}
                  >
                    {exp.project}
                  </span>
                  <span
                    className="text-[14px] text-[#b3c2cb]/50"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      letterSpacing: '-0.2px',
                      lineHeight: '120%',
                      opacity: 0.5,
                    }}
                  >
                    {exp.date}
                  </span>
                </div>
              </div>

              {/* Разделительная линия */}
              {idx < experiences.length - 1 && (
                <div className="h-px bg-white/20 my-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// Footer
function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-[92px]">
      <div className="w-full max-w-[1200px] mx-auto text-center text-[#b3c2cb]" style={{ fontFamily: 'Manrope, sans-serif' }}>
        <p>© 2025 Максим Яковенко. Все права защищены.</p>
        <div className="mt-4 flex gap-6 justify-center">
          <a href="https://t.me/ykvnkm" target="_blank" rel="noopener noreferrer" className="hover:text-[#e6e6e6] transition">Telegram</a>
          <a href="mailto:ykvnkm@gmail.com" className="hover:text-[#e6e6e6] transition">Email</a>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="text-white min-h-screen overflow-x-hidden" style={{ backgroundColor: '#000000' }}>
      <Header />
      <HeroSection />
      <ProjectsSection />
      <WhatIDoSection />
      <AboutSection />
      <SkillsTagsSection />
      <ExperienceSection />
      <Footer />
    </div>
  );
}