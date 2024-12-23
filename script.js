document.addEventListener('DOMContentLoaded', () => {
    let matrixCanvas = null;
    let matrixInterval = null;

    // Initialize contact form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht!');
            contactForm.reset();
        });
    }

    // Function to setup matrix effect
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

    // Function to cleanup matrix effect
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

    // Function to handle style switching
    function handleStyleSwitch(code) {
        const stylesheet = document.querySelector('link[rel="stylesheet"]');
        
        switch(code) {
            case '#0001':
                stylesheet.href = 'styles.css';
                const matrix = setupMatrixEffect();
                matrixCanvas = matrix.canvas;
                matrixInterval = matrix.interval;
                break;
                
            case '#0002':
                stylesheet.href = 'style2.css';
                cleanupMatrixEffect();
                break;
                
            default:
                alert('Invalid code!');
                return;
        }
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

    // Initialize matrix effect if starting with matrix style
    if (document.querySelector('link[rel="stylesheet"]').href.includes('styles.css')) {
        const matrix = setupMatrixEffect();
        matrixCanvas = matrix.canvas;
        matrixInterval = matrix.interval;
    }

    // Handle window resize for matrix effect
    window.addEventListener('resize', () => {
        if (matrixCanvas) {
            cleanupMatrixEffect();
            const matrix = setupMatrixEffect();
            matrixCanvas = matrix.canvas;
            matrixInterval = matrix.interval;
        }
    });
});