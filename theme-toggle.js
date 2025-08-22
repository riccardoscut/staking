// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.theme);
    
    // Create theme toggle button
    this.createToggleButton();
    
    // Listen for system theme changes
    this.listenForSystemTheme();
  }

  setTheme(theme) {
    this.theme = theme;
    
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    localStorage.setItem('theme', theme);
    
    // Update toggle button state
    this.updateToggleButton();
  }

  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    
    // Add transition class for smooth theme switching
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }

  createToggleButton() {
    // Check if toggle already exists
    if (document.getElementById('theme-toggle')) return;
    
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle-btn glass rounded-full p-3 transition-all duration-200 hover:glass-strong hover:scale-110';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.innerHTML = this.getToggleIcon();
    
    toggle.addEventListener('click', () => this.toggleTheme());
    
    // Insert into header or create floating button
    const header = document.querySelector('header');
    if (header) {
      const headerContent = header.querySelector('.container');
      if (headerContent) {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'absolute top-6 right-6 z-50';
        toggleContainer.appendChild(toggle);
        headerContent.appendChild(toggleContainer);
      }
    } else {
      // Create floating toggle button
      const floatingToggle = document.createElement('div');
      floatingToggle.className = 'fixed top-6 right-6 z-50';
      floatingToggle.appendChild(toggle);
      document.body.appendChild(floatingToggle);
    }
  }

  updateToggleButton() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.innerHTML = this.getToggleIcon();
    }
  }

  getToggleIcon() {
    if (this.theme === 'dark') {
      return `
        <svg class="w-6 h-6 text-accent-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      `;
    } else {
      return `
        <svg class="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      `;
    }
  }

  listenForSystemTheme() {
    // Check if user prefers dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        // Only auto-switch if user hasn't manually set a preference
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Initial check
    if (!localStorage.getItem('theme')) {
      this.setTheme(mediaQuery.matches ? 'dark' : 'light');
    }
  }
}

// CSS for theme transitions
const themeStyles = document.createElement('style');
themeStyles.textContent = `
  .theme-transition,
  .theme-transition *,
  .theme-transition *:before,
  .theme-transition *:after {
    transition: all 0.3s ease !important;
  }
  
  .theme-toggle-btn {
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .theme-toggle-btn:hover {
    border-color: rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  }
`;

document.head.appendChild(themeStyles);

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
