document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht!');
            contactForm.reset();
        });
    }

    // Matrix rain effect mit lila Farbe
    initializeMatrix('#b088f9', '#0a0015');

    // Style switcher
    const codeInput = document.querySelector('.code-input');
    const codeSubmit = document.querySelector('.code-submit');

    if (codeSubmit) {
        codeSubmit.addEventListener('click', () => {
            const code = codeInput.value.trim();
            
            switch(code) {
                case '#0001':
                    document.querySelector('link[rel="stylesheet"]').href = 'styles.css';
                    location.reload();
                    break;
                case '#0002':
                    document.querySelector('link[rel="stylesheet"]').href = 'style2.css';
                    break;
                default:
                    alert('Invalid code!');
            }
        });
    }
});

function initializeMatrix(matrixColor, bgColor) {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const cols = Math.floor(width / 20);
    const ypos = Array(cols).fill(0);

    ctx.fillStyle = bgColor; // Dunklerer Hintergrund
    ctx.fillRect(0, 0, width, height);

    function matrix() {
        ctx.fillStyle = `rgba(${parseInt(bgColor.slice(1, 3), 16)}, ${parseInt(bgColor.slice(3, 5), 16)}, ${parseInt(bgColor.slice(5, 7), 16)}, 0.05)`; // Dunklerer Fade-Effekt
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = matrixColor; // Lila Farbe für Matrix-Regen
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
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
    });

    setInterval(matrix, 50);
}
