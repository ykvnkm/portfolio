class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/projects/aist-filter': 'projects/aist-filter.html',
            '/projects/cupcast': 'projects/cupcast.html',
            '/projects/kolpak-news': 'projects/kolpak-news.html',
            '/projects/rentbuddy': 'projects/rentbuddy.html'
        };

        // Store original main content HTML
        this.originalMainHTML = null;

        // Handle navigation (back/forward buttons)
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Save original main content on first load
        this.saveOriginalContent();
        
        // Handle initial route only if we're not on the main page
        const path = window.location.pathname;
        if (path !== '/' && path !== '/index.html') {
            this.handleRoute();
        }
    }

    saveOriginalContent() {
        const mainElement = document.querySelector('main');
        if (mainElement && !this.originalMainHTML) {
            this.originalMainHTML = mainElement.innerHTML;
        }
    }

    async navigate(path) {
        // Push the new state to history
        window.history.pushState({}, '', path);
        
        // Handle the route change
        await this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        
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
            
            // Reinitialize logo button listener for project pages
            this.setupLogoButton();
            
            // Scroll to top
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error loading page:', error);
            // Handle 404 or other errors - navigate to home
            this.restoreMainPage();
            window.history.replaceState({}, '', '/');
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
            window.location.href = '/';
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
        this.setupLogoButton();
        
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
    }

    setupLogoButton() {
        const logoButton = document.querySelector('.logo-button');
        if (logoButton) {
            // Remove existing listeners by replacing the button
            const newButton = logoButton.cloneNode(true);
            logoButton.parentNode.replaceChild(newButton, logoButton);
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate('/');
            });
        }
    }
}

// Initialize router and make it globally available
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.router = new Router();
    });
} else {
    window.router = new Router();
}