class StyleSwitcher {
    constructor() {
        // Style configuration
        this.styles = {
            matrix: {
                code: '#0001',
                file: 'styles.css',
                features: ['matrix']
            },
            modern: {
                code: '#0002',
                file: 'style2.css',
                features: []
            }
        };
        
        // Feature management
        this.matrixEffect = null;
        this.initialize();
    }

    initialize() {
        // Set up event listeners
        const submitButton = document.querySelector('.code-submit');
        if (submitButton) {
            submitButton.addEventListener('click', () => this.handleStyleChange());
        }

        // Initialize matrix effect if needed
        if (this.isCurrentStyle('matrix')) {
            this.setupMatrixEffect();
        }
    }

    isCurrentStyle(styleName) {
        const currentStylesheet = document.querySelector('link[rel="stylesheet"]');
        return currentStylesheet && currentStylesheet.href.endsWith(this.styles[styleName].file);
    }

    async handleStyleChange() {
        const codeInput = document.querySelector('.code-input');
        if (!codeInput) return;

        const code = codeInput.value.trim();
        const stylesheet = document.querySelector('link[rel="stylesheet"]');
        if (!stylesheet) return;

        try {
            switch (code) {
                case this.styles.matrix.code:
                    await this.switchToStyle('matrix', stylesheet);
                    break;
                case this.styles.modern.code:
                    await this.switchToStyle('modern', stylesheet);
                    break;
                default:
                    console.warn('Invalid style code:', code);
                    alert('Invalid code!');
            }
        } catch (error) {
            console.error('Style switching error:', error);
            alert('Error changing style. Please try again.');
        }
    }

    async switchToStyle(styleName, stylesheet) {
        // Clean up existing features
        this.cleanupFeatures();

        // Change stylesheet
        const newPath = this.styles[styleName].file;
        stylesheet.href = newPath;

        // Initialize new features
        if (this.styles[styleName].features.includes('matrix')) {
            await this.setupMatrixEffect();
        }

        // Verify style change
        await this.verifyStyleChange(newPath);
    }

    async verifyStyleChange(expectedPath) {
        // Wait for stylesheet to load
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        const currentPath = document.querySelector('link[rel="stylesheet"]').href;
        if (!currentPath.endsWith(expectedPath)) {
            console.warn('Style change verification failed');
        }
    }

    setupMatrixEffect() {
        if (this.matrixEffect) return;

        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-bg';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        this.initializeCanvas(canvas, ctx);
        this.startMatrixAnimation(ctx);
    }

    initializeCanvas(canvas, ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Store canvas properties
        this.matrixEffect = {
            canvas,
            ctx,
            columns: Math.floor(canvas.width / 20),
            yPositions: Array(Math.floor(canvas.width / 20)).fill(0),
            intervalId: null
        };
    }

    startMatrixAnimation(ctx) {
        if (!this.matrixEffect) return;

        this.matrixEffect.intervalId = setInterval(() => {
            this.renderMatrixFrame(ctx);
        }, 50);
    }

    renderMatrixFrame(ctx) {
        const { canvas, yPositions } = this.matrixEffect;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = '15pt monospace';
        
        yPositions.forEach((y, index) => {
            const char = String.fromCharCode(Math.random() * 128);
            const x = index * 20;
            
            ctx.fillText(char, x, y);
            yPositions[index] = y > 100 + Math.random() * 10000 ? 0 : y + 20;
        });
    }

    cleanupFeatures() {
        if (this.matrixEffect) {
            clearInterval(this.matrixEffect.intervalId);
            this.matrixEffect.canvas.remove();
            this.matrixEffect = null;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new StyleSwitcher();
});