document.addEventListener('DOMContentLoaded', () => {
    let matrixInterval; // Store interval ID for cleanup
    const contactForm = document.getElementById('contactForm');
    
    // Contact form handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht!');
            contactForm.reset();
        });
    }

    // Function to check current stylesheet
    function isMatrixStyleActive() {
        const styleSheet = document.querySelector('link[rel="stylesheet"]');
        return styleSheet && styleSheet.href.includes('styles.css');
    }

    // Matrix rain effect setup
    function setupMatrixRain() {
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

        function matrix() {
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
        }

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);
        });

        matrixInterval = setInterval(matrix, 50);
        return canvas;
    }

    // Function to handle style changes
    function handleStyleChange(code) {
        const styleSheet = document.querySelector('link[rel="stylesheet"]');
        const matrixCanvas = document.getElementById('matrix-bg');
        
        switch(code) {
            case '#0001':
                styleSheet.href = 'styles.css';
                if (!matrixCanvas) {
                    setupMatrixRain();
                }
                break;
            case '#0002':
                styleSheet.href = 'style2.css';
                if (matrixCanvas) {
                    clearInterval(matrixInterval);
                    matrixCanvas.remove();
                }
                break;
            default:
                alert('Invalid code!');
        }
    }

    // Initial setup based on current stylesheet
    if (isMatrixStyleActive()) {
        setupMatrixRain();
    }

    // Style switcher
    const codeInput = document.querySelector('.code-input');
    const codeSubmit = document.querySelector('.code-submit');

    if (codeSubmit) {
        codeSubmit.addEventListener('click', () => {
            const code = codeInput.value.trim();
            handleStyleChange(code);
        });
    }
});