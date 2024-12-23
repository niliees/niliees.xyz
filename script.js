// Feature management class
class FeatureManager {
    constructor() {
        this.matrixInterval = null;
        this.activeFeatures = new Set();
        this.initialize();
    }

    initialize() {
        // Initial setup based on current stylesheet
        if (this.isMatrixStyleActive()) {
            this.enableMatrixEffect();
        }
        this.setupEventListeners();
    }

    isMatrixStyleActive() {
        const styleSheet = document.querySelector('link[rel="stylesheet"]');
        return styleSheet && styleSheet.href.includes('styles.css');
    }

    setupEventListeners() {
        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactSubmit.bind(this));
        }

        // Style switcher
        const codeSubmit = document.querySelector('.code-submit');
        if (codeSubmit) {
            codeSubmit.addEventListener('click', this.handleStyleChange.bind(this));
        }

        // Resize handling for matrix effect
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleContactSubmit(e) {
        e.preventDefault();
        alert('Vielen Dank für Ihre Nachricht!');
        e.target.reset();
    }

    handleStyleChange() {
        const codeInput = document.querySelector('.code-input');
        const code = codeInput?.value.trim();
        const styleSheet = document.querySelector('link[rel="stylesheet"]');

        switch(code) {
            case '#0001':
                styleSheet.href = 'styles.css';
                this.enableMatrixEffect();
                break;
            case '#0002':
                styleSheet.href = 'style2.css';
                this.disableMatrixEffect();
                break;
            default:
                alert('Invalid code!');
        }
    }

    enableMatrixEffect() {
        if (this.activeFeatures.has('matrix')) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-bg';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        this.setupCanvas(ctx, canvas);
        this.matrixInterval = setInterval(() => this.renderMatrix(ctx), 50);
        this.activeFeatures.add('matrix');
    }

    setupCanvas(ctx, canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.cols = Math.floor(canvas.width / 20);
        this.ypos = Array(this.cols).fill(0);
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    renderMatrix(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = '15pt monospace';
        
        this.ypos.forEach((y, ind) => {
            const text = String.fromCharCode(Math.random() * 128);
            const x = ind * 20;
            ctx.fillText(text, x, y);
            if (y > 100 + Math.random() * 10000) {
                this.ypos[ind] = 0;
            } else {
                this.ypos[ind] = y + 20;
            }
        });
    }

    handleResize() {
        const canvas = document.getElementById('matrix-bg');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            this.setupCanvas(ctx, canvas);
        }
    }

    disableMatrixEffect() {
        if (!this.activeFeatures.has('matrix')) return;

        clearInterval(this.matrixInterval);
        const canvas = document.getElementById('matrix-bg');
        canvas?.remove();
        this.activeFeatures.delete('matrix');
    }
}

// Initialize features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FeatureManager();
});