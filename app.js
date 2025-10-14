// ========================================
// Drone Technology Exhibition Viewer
// Professional Interactive Display System
// Optimized for Fast & Efficient Redirects
// ========================================

class ExhibitionViewer {
    constructor() {
        // Page configurations - Optimized mapping for both days
        this.pages = {
            // Day 1 Activities
            'day1-act1': 'animations/day1/act1-propellor-thrust.html',
            'day1-act2': 'animations/day1/act2-balance.html',
            'day1-act3': 'animations/day1/act3-weight-lift.html',
            'day1-act4': 'animations/day1/act4-vertical-forces.html',
            'day1-act5': 'animations/day1/act5-drone-parts.html',
            
            // Day 2 Activities
            'day2-act1': 'animations/day2/act1-battery-charging.html',
            'day2-act2': 'animations/day2/act2-multi-rotor-torque-cancelation.html',
            'day2-act3': 'animations/day2/act3-fcsi-simulation.html',
            'day2-act4': 'animations/day2/act4-dgca.html'
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