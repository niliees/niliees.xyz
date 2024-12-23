document.addEventListener('DOMContentLoaded', () => {
    let matrixCanvas = null;
    let matrixInterval = null;

    // Initialize the Matrix effect
    function setupMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-bg';
        document.body.prepend(canvas);

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const cols = Math.floor(width / 20);
        const ypos = Array(cols).fill(0);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        return {
            canvas,
            interval: setInterval(() => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = '#0f0';
                ctx.font = '15pt monospace';
                
                ypos.forEach((y, ind) => {
                    const text = String.fromCharCode(Math.random() * 128);
                    const x = ind * 20;
                    ctx.fillText(text, x, y);
                    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
                    else ypos[ind] = y + 20;
                });
            }, 50)
        };
    }

    // Cleanup Matrix effect
    function cleanupMatrixEffect() {
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
        }
        if (matrixCanvas) {
            matrixCanvas.remove();
            matrixCanvas = null;
        }
    }

    // Apply style with proper initialization and cleanup
    function applyStyle(styleName, updateStorage = true) {
        const currentStyle = localStorage.getItem('selectedStyle');
        
        // Only proceed if we're actually changing styles
        if (currentStyle !== styleName || !currentStyle) {
            const stylesheet = document.querySelector('link[rel="stylesheet"]');
            
            // Clean up existing effects first
            cleanupMatrixEffect();

            if (styleName === 'matrix') {
                stylesheet.href = 'styles.css';
                const matrix = setupMatrixEffect();
                matrixCanvas = matrix.canvas;
                matrixInterval = matrix.interval;
            } else if (styleName === 'modern') {
                stylesheet.href = 'style2.css';
            }

            // Update storage if needed
            if (updateStorage) {
                localStorage.setItem('selectedStyle', styleName);
            }
        }
    }

    // Handle code input
    function handleStyleSwitch(code) {
        switch(code) {
            case '#0001':
                applyStyle('matrix');
                break;
            case '#0002':
                applyStyle('modern');
                break;
            default:
                alert('Invalid code!');
                return;
        }
    }

    // Initialize contact form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht!');
            contactForm.reset();
        });
    }

    // Set up style switcher
    const codeInput = document.querySelector('.code-input');
    const codeSubmit = document.querySelector('.code-submit');

    if (codeSubmit) {
        codeSubmit.addEventListener('click', () => {
            const code = codeInput.value.trim();
            handleStyleSwitch(code);
        });
    }

    // Initialize correct style on page load
    const preferredStyle = localStorage.getItem('selectedStyle') || 'matrix';
    const currentHref = document.querySelector('link[rel="stylesheet"]').href;

    // Check if current style matches stored preference
    const shouldBeMatrix = preferredStyle === 'matrix' && !currentHref.includes('style2.css');
    const shouldBeModern = preferredStyle === 'modern' && currentHref.includes('style2.css');

    if (!shouldBeMatrix && !shouldBeModern) {
        applyStyle(preferredStyle, false);
    } else if (preferredStyle === 'matrix' && !matrixCanvas) {
        const matrix = setupMatrixEffect();
        matrixCanvas = matrix.canvas;
        matrixInterval = matrix.interval;
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (matrixCanvas) {
            cleanupMatrixEffect();
            const matrix = setupMatrixEffect();
            matrixCanvas = matrix.canvas;
            matrixInterval = matrix.interval;
        }
    });
});