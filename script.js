document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vielen Dank für Ihre Nachricht!');
            contactForm.reset();
        });
    }

    // Matrix rain effect
    initializeMatrix('#0f0', '#000');

    // Style switcher
    const codeInput = document.querySelector('.code-input');
    const codeSubmit = document.querySelector('.code-submit');

    if (codeSubmit) {
        codeSubmit.addEventListener('click', () => {
            const code = codeInput.value.trim();
            
            switch(code) {
                case '#0001':
                    document.querySelector('link[rel="stylesheet"]').href = 'styles.css';
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

function initializeMatrix(color, bgColor) {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const cols = Math.floor(width / 20);
    const ypos = Array(cols).fill(0);

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    function matrix() {
        ctx.fillStyle = `${bgColor}0a`;
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = color;
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
