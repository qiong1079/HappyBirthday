document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const colors = ['#fff', '#ffd700', '#ff69b4', '#87ceeb', '#dda0dd'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.opacity += (Math.random() - 0.5) * 0.01;
            this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));

            if (this.y < -10) {
                this.reset();
            }
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        const particle = new Particle();
        particle.y = Math.random() * canvas.height;
        particles.push(particle);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    animate();
});