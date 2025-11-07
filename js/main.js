// Data
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

const projects = [
    {
        title: 'AIST Filter',
        description: 'Веб-приложение для фильтрации конфиденциальных и персональных данных в банковских чатах. Проект реализован в рамках хактона «AIст» по заданию банка «Центр-Инвест»',
        circleColor: 'rgba(130,201,94,1)',
        path: '/projects/aist-filter'
    },
    {
        title: 'CUPCAST',
        description: 'Веб-интерфейс предсказательной модели нейронной сети, которая помогает владельцам кофейных автоматов прогнозировать спрос на ближайшую неделю на основе аналитики и исторических данных о продажах',
        circleColor: 'rgba(212,135,64,1)',
        path: '/projects/cupcast'
    },
    {
        title: 'KOLPAK NEWS',
        description: 'Веб-приложение для чтения новостей STEM-направления с системой умного поиска по контексту на основе ИИ. Проект реализован в рамках форума «Хакатон Весна 2025» по заданию ФГУП «РНИИРС»',
        circleColor: 'rgba(15,100,153,1)',
        path: '/projects/kolpak-news'
    },
    {
        title: 'Rentbuddy',
        description: 'Сервис по поиску соседей для студентов на основе их персональных предпочтений. Платформа призвана помочь студентам быстро и просто найти подходящих людей для совместной аренды жилья',
        circleColor: 'rgba(186,138,214,1)',
        path: '/projects/rentbuddy'
    }
];

const skills = [
    'UX-аналитика', 'Исследование рынка', 'Проектирование интерфейсов', 'User Flow', 'UI-дизайн',
    'Типографика', 'Визуал', 'Адаптивный дизайн', 'Верстка', 'Дизайн-системы', 'Прототипирование',
    'Упаковка проекта', 'Презентация', 'Графический дизайн'
];

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

const aboutBlocks = [
    { text: "Я — UX/UI-дизайнер с техническим бэкграундом" },
    { text: "и опытом проектирования", tag: "веб-приложений" },
    { text: "Разрабатываю пользовательские сценарии," },
    { text: "прототипы и адаптивные интерфейсы", tag: "в Figma" },
    { text: "Понимаю процессы", tag: "UX-исследований" },
    { text: "и умею работать с дизайн-системами на практике." },
    { text: "Интересуюсь продуктами, связанными с", tag: "данными и AI" }
];

// Header scroll effect
function handleScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Smooth scroll to section
function scrollToSection(event) {
    const target = event.target;
    if (target.dataset.scroll) {
        const element = document.getElementById(target.dataset.scroll);
        element?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Render categories
function renderCategories() {
    const categoriesList = document.querySelector('.categories-list');
    if (!categoriesList) return;
    
    categoriesList.innerHTML = categories.map((category, index) => `
        <div class="category-item">
            <h3 class="category-title">${category.title}</h3>
            <div class="category-tags">
                ${category.tags.map(tag => `
                    <span class="category-tag">${tag}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Render projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map((project, index) => `
        <div class="project-card">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <button class="project-button" data-path="${project.path}">Подробнее</button>
            </div>
            <svg class="project-gradient" viewBox="0 0 590 590">
                <defs>
                    <radialGradient id="grad-${index}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="${project.circleColor}" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="${project.circleColor}" stop-opacity="0.05" />
                    </radialGradient>
                </defs>
                <circle cx="295" cy="295" r="295" fill="url(#grad-${index})" />
            </svg>
        </div>
    `).join('');

    // Add click handlers to project buttons
    document.querySelectorAll('.project-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const path = button.dataset.path;
            window.router.navigate(path);
        });
    });
}

// Render about section
function renderAbout() {
    const aboutContent = document.querySelector('.about-content');
    if (!aboutContent) return;

    aboutContent.innerHTML = aboutBlocks.map(block => `
        <div class="about-block">
            <p class="about-text">${block.text}</p>
            ${block.tag ? `<div class="about-tag shine">${block.tag}</div>` : ''}
        </div>
    `).join('');
}

// Render skills
function renderSkills() {
    const skillsTags = document.querySelector('.skills-tags');
    if (!skillsTags) return;

    skillsTags.innerHTML = skills.map(skill => `
        <span class="skill-tag">${skill}</span>
    `).join('');
}

// Render experience
function renderExperience() {
    const experienceList = document.querySelector('.experience-list');
    if (!experienceList) return;

    experienceList.innerHTML = experiences.map((exp, index) => `
        <div class="experience-item">
            <div class="experience-content">
                <h3 class="experience-position">${exp.position}</h3>
            </div>
            <div class="experience-details">
                <span class="experience-project">${exp.project}</span>
                <span class="experience-date">${exp.date}</span>
            </div>
        </div>
    `).join('');
}

// Initialize
function init() {
    // Always setup scroll handler
    window.addEventListener('scroll', handleScroll);

    // Only render and setup if we're on the main page
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') {
        // Setup navigation listeners
        document.querySelectorAll('[data-scroll]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.target.dataset.scroll || link.dataset.scroll;
                if (targetId) {
                    const element = document.getElementById(targetId);
                    element?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Setup logo button listener
        const logoButton = document.querySelector('.logo-button');
        if (logoButton && window.router) {
            logoButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.router.navigate('/');
            });
        }

        // Render all sections
        renderCategories();
        renderProjects();
        renderAbout();
        renderSkills();
        renderExperience();
    }
}

// Run initialization when DOM is loaded
// Make sure router is initialized first
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure router is initialized
        setTimeout(init, 0);
    });
} else {
    setTimeout(init, 0);
}