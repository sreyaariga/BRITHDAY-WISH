document.addEventListener('DOMContentLoaded', () => {
    const revealBtn = document.getElementById('reveal-btn');
    const replayBtn = document.getElementById('replay-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const messageScreen = document.getElementById('message-screen');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');

    // State
    let confettiActive = false;
    let particles = [];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Interaction
    revealBtn.addEventListener('click', () => {
        welcomeScreen.classList.remove('active');
        welcomeScreen.classList.add('hidden');
        
        setTimeout(() => {
            messageScreen.classList.remove('hidden');
            messageScreen.classList.add('active');
            startConfetti();
        }, 600); // Wait for exit animation
    });

    replayBtn.addEventListener('click', () => {
        messageScreen.classList.remove('active');
        messageScreen.classList.add('hidden');
        
        setTimeout(() => {
            welcomeScreen.classList.remove('hidden');
            welcomeScreen.classList.add('active');
            stopConfetti();
        }, 600);
    });

    // Confetti Engine
    function startConfetti() {
        if (!confettiActive) {
            confettiActive = true;
            particles = []; // Reset particles
            // Spawn initial burst
            for (let i = 0; i < 150; i++) {
                particles.push(createParticle());
            }
            animateConfetti();
        }
    }

    function stopConfetti() {
        confettiActive = false;
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function createParticle() {
        const colors = ['#ffd700', '#ff00cc', '#00ffff', '#ffffff', '#6a00ff'];
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Start above
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 5 + 2,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            wobble: Math.random() * 2 * Math.PI,
            wobbleSpeed: Math.random() * 0.1
        };
    }

    function animateConfetti() {
        if (!confettiActive) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.y += p.speedY;
            p.x += Math.sin(p.wobble) * 2;
            p.wobble += p.wobbleSpeed;

            // Draw
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Reset if out of view
            if (p.y > canvas.height) {
                particles[index] = createParticle();
                particles[index].y = -10; // Reset to top
            }
        });

        requestAnimationFrame(animateConfetti);
    }
});
