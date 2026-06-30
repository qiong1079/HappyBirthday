document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let fireworks = [];

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor(x, y, color, angle, speed) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.angle = angle;
            this.speed = speed;
            this.size = Math.random() * 2 + 1;
            this.alpha = 1;
            this.gravity = 0.02;
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            this.speed *= 0.98;
            this.alpha -= 0.015;
            this.speed -= this.gravity;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Firework {
        constructor(x, y, particleCount = 50) {
            this.x = x;
            this.y = y;
            this.particles = [];
            this.colors = ["#ff5733", "#ffbd33", "#33ff57", "#3357ff", "#f033ff"];

            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 2;
                const color = this.colors[Math.floor(Math.random() * this.colors.length)];
                this.particles.push(new Particle(this.x, this.y, color, angle, speed));
            }
        }

        update() {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].update();
                if (this.particles[i].alpha <= 0) {
                    this.particles.splice(i, 1);
                }
            }
        }

        draw() {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].particles.length === 0) {
                fireworks.splice(i, 1);
            }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        fireworks.push(new Firework(x, y, 30));
    });

    animate();
});