class Router {
    constructor() {
        // Determine base path (e.g., '/portfolio' or '')
        this.basePath = this.getBasePath();
        
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
        
        // Check if we have a redirect path from 404.html
        const redirectPath = sessionStorage.getItem('redirectPath');
        if (redirectPath) {
            sessionStorage.removeItem('redirectPath');
            // Update URL without reload
            const fullPath = this.getFullPath(redirectPath);
            window.history.replaceState({}, '', fullPath);
            this.handleRoute();
            return;
        }
        
        // Handle initial route only if we're not on the main page
        const path = this.getCurrentPath();
        if (path !== '/' && path !== '/index.html') {
            this.handleRoute();
        }
    }

    getBasePath() {
        // Get base path from current location
        // If URL is https://ykvnkm.github.io/portfolio, basePath is '/portfolio'
        // If URL is https://ykvnkm.github.io, basePath is ''
        const pathname = window.location.pathname;
        if (pathname.startsWith('/portfolio')) {
            return '/portfolio';
        }
        return '';
    }

    getCurrentPath() {
        // Get current path relative to base path
        const pathname = window.location.pathname;
        if (this.basePath && pathname.startsWith(this.basePath)) {
            return pathname.substring(this.basePath.length) || '/';
        }
        return pathname;
    }

    getFullPath(path) {
        // Convert relative path to full path with base
        if (path.startsWith('/')) {
            return this.basePath + path;
        }
        return this.basePath + '/' + path;
    }

    saveOriginalContent() {
        const mainElement = document.querySelector('main');
        if (mainElement && !this.originalMainHTML) {
            this.originalMainHTML = mainElement.innerHTML;
        }
    }

    async navigate(path) {
        // Push the new state to history with full path
        const fullPath = this.getFullPath(path);
        window.history.pushState({}, '', fullPath);
        
        // Handle the route change
        await this.handleRoute();
    }

    async handleRoute() {
        const path = this.getCurrentPath();
        
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

            // Use full path for fetch with base path
            const fetchPath = this.basePath ? this.basePath + '/' + page : page;
            const response = await fetch(fetchPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let content = await response.text();
            
            // Fix relative paths in loaded content to work with base path
            if (this.basePath) {
                // Fix paths like ../public/ to /portfolio/public/
                content = content.replace(/\.\.\/public\//g, this.basePath + '/public/');
                // Fix paths like ../css/ to /portfolio/css/ (if any)
                content = content.replace(/\.\.\/css\//g, this.basePath + '/css/');
            }
            
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
            const homePath = this.getFullPath('/');
            window.history.replaceState({}, '', homePath);
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
            const homePath = this.getFullPath('/');
            window.location.href = homePath;
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
                const homePath = this.getFullPath('/');
                window.location.href = homePath;
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