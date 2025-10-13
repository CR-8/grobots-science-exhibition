// ========================================
// Drone Technology Exhibition Viewer
// Professional Interactive Display System
// Optimized for Fast & Efficient Redirects
// ========================================

class ExhibitionViewer {
    constructor() {
        // Page configurations - Optimized mapping
        this.pages = {
            'vertical-forces': 'animations/act4-vertical-forces.html',
            'weight-lift': 'animations/act3-weight-lift.html',
            'drone-parts': 'animations/act5-drone-parts.html',
            'propeller-thrust': 'animations/act1-propellor-thrust.html',
            'balance': 'animations/act2-balance.html'
        };

        // Cache DOM elements for better performance
        this.navButtons = null;
        
        // Initialize immediately
        this.init();
    }

    init() {
        // Cache navigation buttons
        this.navButtons = document.querySelectorAll('.nav-button');
        
        // Use event delegation for better performance
        if (this.navButtons.length > 0) {
            this.attachEventListeners();
        } else {
            console.warn('No navigation buttons found');
        }
    }

    attachEventListeners() {
        // Direct event binding for optimal performance
        this.navButtons.forEach(button => {
            const pageKey = button.getAttribute('data-page');
            
            // Validate page exists
            if (!this.pages[pageKey]) {
                console.error(`Invalid page key: ${pageKey}`);
                return;
            }

            // Use direct click handler for faster execution
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openPage(pageKey, button);
            }, { passive: false });
        });
    }

    openPage(pageKey, clickedButton) {
        // Fast validation
        const url = this.pages[pageKey];
        if (!url) {
            console.error(`Page not found: ${pageKey}`);
            return;
        }

        // Update active state efficiently (only if button provided)
        if (clickedButton) {
            // Remove active from all in one pass
            this.navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            clickedButton.classList.add('active');
        }

        // Direct redirect - fastest method
        // Always open in new tab
        try {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            
            // Fallback if popup blocked - try again with less restrictive settings
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                console.warn('Popup blocked, trying alternative method');
                // Alternative approach - create temporary link and click it
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error opening page:', error);
            // Last resort fallback - still try to open in new tab
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Utility method for programmatic navigation
    navigateTo(pageKey) {
        this.openPage(pageKey, null);
    }
}

// Optimized initialization - runs as soon as DOM is ready
let viewer;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        viewer = new ExhibitionViewer();
    });
} else {
    // DOM already loaded
    viewer = new ExhibitionViewer();
}

// Export for external access
window.exhibitionViewer = viewer;