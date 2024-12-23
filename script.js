// Feature Management System
class StyleBasedFeatureManager {
    constructor() {
        // Core configuration
        this.config = {
            matrixStyles: 'styles.css',
            modernStyles: 'style2.css'
        };
        
        // State management
        this.state = {
            matrixInterval: null,
            activeFeatures: new Set(),
            dimensions: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };

        this.initialize();
    }

    initialize() {
        this.detectInitialStyle();
        this.bindEventListeners();
    }

    detectInitialStyle() {
        const currentStyle = this.getCurrentStylesheet();
        if (currentStyle?.includes(this.config.matrixStyles)) {
            this.initializeMatrixEffect();
        }
    }

    getCurrentStylesheet() {
        return document.querySelector('link[rel="stylesheet"]')?.href;
    }

    bindEventListeners() {
        // Style switching
        const styleButton = document.querySelector('.code-submit');
        if (styleButton) {
            styleButton.addEventListener('click', () => this.handleStyleSwitch());
        }

        // Form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Responsive handling
        window.addEventListener('resize', () => this.handleResize());
    }

    handleStyleSwitch() {
        const codeInput = document.querySelector('.code-input');
        const styleCode = codeInput?.value.trim();
        const stylesheet = document.querySelector('link[rel="stylesheet"]');

        switch (styleCode) {
            case '#0001':
                stylesheet.href = this.config.matrixStyles;
                this.initializeMatrixEffect();
                break;
            case '#0002':
                stylesheet.href = this.config.modernStyles;
                this.cleanupMatrixEffect();
                break;
            default:
                console.warn('Invalid style code provided');
                alert('Invalid code!');
        }
    }

    initializeMatrixEffect() {
        if (this.state.activeFeatures.has('matrix')) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-bg';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        this.setupMatrixCanvas(canvas, ctx);
        this.state.matrixInterval = setInterval(() => this.renderMatrixFrame(ctx), 50);
        this.state.activeFeatures.add('matrix');
    }

    setupMatrixCanvas(canvas, ctx) {
        canvas.width = this.state.dimensions.width;
        canvas.height = this.state.dimensions.height;

        this.state.matrixColumns = Math.floor(canvas.width / 20);
        this.state.columnPositions = Array(this.state.matrixColumns).fill(0);

        // Initial canvas state
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    renderMatrixFrame(ctx) {
        // Semi-transparent fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Matrix rain rendering
        ctx.fillStyle = '#0f0';
        ctx.font = '15pt monospace';

        this.state.columnPositions.forEach((y, index) => {
            // Generate random character
            const char = String.fromCharCode(Math.random() * 128);
            const x = index * 20;
            
            // Draw character
            ctx.fillText(char, x, y);
            
            // Update position with wraparound
            if (y > 100 + Math.random() * 10000) {
                this.state.columnPositions[index] = 0;
            } else {
                this.state.columnPositions[index] = y + 20;
            }
        });
    }

    handleResize() {
        // Update dimensions
        this.state.dimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Update matrix effect if active
        const canvas = document.getElementById('matrix-bg');
        if (canvas && this.state.activeFeatures.has('matrix')) {
            const ctx = canvas.getContext('2d');
            this.setupMatrixCanvas(canvas, ctx);
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        alert('Vielen Dank für Ihre Nachricht!');
        event.target.reset();
    }

    cleanupMatrixEffect() {
        if (!this.state.activeFeatures.has('matrix')) return;

        // Clear interval
        if (this.state.matrixInterval) {
            clearInterval(this.state.matrixInterval);
            this.state.matrixInterval = null;
        }

        // Remove canvas
        const canvas = document.getElementById('matrix-bg');
        if (canvas) {
            canvas.remove();
        }

        this.state.activeFeatures.delete('matrix');
    }
}

// Initialize the feature manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new StyleBasedFeatureManager();
});