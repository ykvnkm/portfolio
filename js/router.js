class Router {
    constructor() {
        // Определяем base path из текущего URL (для GitHub Pages это /portfolio/)
        this.basePath = window.location.pathname.startsWith('/portfolio/') ? '/portfolio' : '';
        
        // Routes с учетом base path
        this.routes = {
            '/': 'index.html',
            '/aist-filter': 'aist-filter.html',
            '/cupcast': 'cupcast.html',
            '/kolpak-news': 'kolpak-news.html',
            '/rentbuddy': 'rentbuddy.html'
        };

        // Store original main content HTML
        this.originalMainHTML = null;

        // Handle navigation (back/forward buttons)
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Save original main content on first load
        this.saveOriginalContent();
        
        // Check if we have a redirect path from 404.html
        const redirectPath = sessionStorage.getItem('redirectPath');
        if (redirectPath) {
            sessionStorage.removeItem('redirectPath');
            // Update URL without reload
            window.history.replaceState({}, '', redirectPath);
            this.handleRoute();
            return;
        }
        
        // Handle initial route
        this.handleRoute();
    }

    saveOriginalContent() {
        const mainElement = document.querySelector('main');
        if (mainElement && !this.originalMainHTML) {
            this.originalMainHTML = mainElement.innerHTML;
        }
    }

    async navigate(path) {
        // Добавляем base path к пути для навигации
        const fullPath = this.basePath + path;
        // Push the new state to history
        window.history.pushState({}, '', fullPath);
        
        // Handle the route change
        await this.handleRoute();
    }

    getNormalizedPath(fullPath) {
        // Убираем base path из пути для поиска в routes
        if (this.basePath && fullPath.startsWith(this.basePath + '/')) {
            return fullPath.slice(this.basePath.length);
        }
        return fullPath;
    }

    async handleRoute() {
        const fullPath = window.location.pathname;
        const path = this.getNormalizedPath(fullPath);
        
        // If we're on the main page, restore original content
        if (path === '/' || path === '/index.html') {
            this.restoreMainPage();
            return;
        }

        // Load project page
        try {
            const page = this.routes[path];
            if (!page) {
                throw new Error('Page not found');
            }

            const response = await fetch(page);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            
            // Replace the main content
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.innerHTML = content;
            }
            
            // Setup navigation for project pages
            this.setupProjectPageListeners();
            
            // Scroll to top
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error loading page:', error);
            // Handle 404 or other errors - navigate to home
            this.restoreMainPage();
            window.history.replaceState({}, '', this.basePath + '/');
        }
    }

    restoreMainPage() {
        const mainElement = document.querySelector('main');
        if (!mainElement) return;

        // Restore original content if we have it
        if (this.originalMainHTML) {
            mainElement.innerHTML = this.originalMainHTML;
        } else {
            // If we don't have it saved, reload the page
            window.location.href = this.basePath + '/';
            return;
        }
        
        // Reinitialize all main page functions
        if (typeof renderCategories === 'function') {
            renderCategories();
        }
        if (typeof renderProjects === 'function') {
            renderProjects();
        }
        if (typeof renderAbout === 'function') {
            renderAbout();
        }
        if (typeof renderSkills === 'function') {
            renderSkills();
        }
        if (typeof renderExperience === 'function') {
            renderExperience();
        }
        
        // Reinitialize event listeners
        this.setupMainPageListeners();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    setupMainPageListeners() {
        // Setup scroll to section listeners
        document.querySelectorAll('[data-scroll]').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = event.target.dataset.scroll || link.dataset.scroll;
                if (targetId) {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Setup logo button listener
        const logoButton = document.querySelector('.logo-button');
        if (logoButton) {
            logoButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate('/');
            });
        }
    }

    setupProjectPageListeners() {
        // Setup logo button listener for project pages
        const logoButton = document.querySelector('.logo-button');
        if (logoButton) {
            logoButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate('/');
            });
        }

        // Setup Projects navigation link
        const projectsLink = document.querySelector('[data-scroll="projects"]');
        if (projectsLink) {
            projectsLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate('/');
                // After navigation, scroll to projects section
                setTimeout(() => {
                    const projectsElement = document.getElementById('projects');
                    if (projectsElement) {
                        projectsElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            });
        }
    }
}

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.router = new Router();
});