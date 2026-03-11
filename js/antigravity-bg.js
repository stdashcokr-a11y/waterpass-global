class AntigravityBackground {
  constructor() {
    this.canvas = document.getElementById('antigravity-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };

    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  init() {
    this.resize();
  }

  initParticles() {
    this.particles = [];
    const numberOfParticles = (this.canvas.width * this.canvas.height) / 12000;
    
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * (innerWidth - size * 2) + size;
      const y = Math.random() * (innerHeight - size * 2) + size;
      const speedX = (Math.random() - 0.5) * 0.5;
      const speedY = (Math.random() - 0.5) * 0.5;
      
      this.particles.push(new Particle(this, x, y, speedX, speedY, size));
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
    }
    this.connect();
  }

  connect() {
    let opacityValue = 1;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          opacityValue = 1 - (distance / 120);
          this.ctx.strokeStyle = `rgba(255, 193, 7, ${opacityValue * 0.3})`; // Gold lines
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  constructor(bg, x, y, speedX, speedY, size) {
    this.bg = bg;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
    this.color = Math.random() > 0.5 ? 'rgba(255, 193, 7, 0.8)' : 'rgba(242, 169, 0, 0.6)';
  }

  update() {
    if (this.x > this.bg.canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > this.bg.canvas.height || this.y < 0) this.speedY = -this.speedY;

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.bg.mouse.x != null && this.bg.mouse.y != null) {
      const dx = this.bg.mouse.x - this.x;
      const dy = this.bg.mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.bg.mouse.radius + this.size) {
        if (this.bg.mouse.x < this.x && this.x < this.bg.canvas.width - this.size * 10) {
          this.x += 2;
        }
        if (this.bg.mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 2;
        }
        if (this.bg.mouse.y < this.y && this.y < this.bg.canvas.height - this.size * 10) {
          this.y += 2;
        }
        if (this.bg.mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 2;
        }
      }
    }
  }

  draw() {
    this.bg.ctx.beginPath();
    this.bg.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.bg.ctx.fillStyle = this.color;
    this.bg.ctx.fill();
    
    this.bg.ctx.shadowBlur = 10;
    this.bg.ctx.shadowColor = 'rgba(255, 193, 7, 0.8)';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AntigravityBackground();
});
