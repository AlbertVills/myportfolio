/**
 * Ambient Particles Canvas
 * Albert S. Villasor Portfolio
 */

(function () {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };
  let animationFrameId;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(width / 20), 75);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.0 + 0.9,
        baseAlpha: Math.random() * 0.4 + 0.2,
        colorIndex: Math.floor(Math.random() * 4)
      });
    }
  }

  function getParticleColor(index, isDarkMode) {
    if (isDarkMode) {
      const darkColors = [
        "139, 92, 246", // Electric Purple
        "59, 130, 246",  // Vibrant Blue
        "6, 182, 212",   // Bright Cyan
        "0, 210, 255"    // Electric Neon Blue
      ];
      return darkColors[index % darkColors.length];
    } else {
      const lightColors = [
        "124, 58, 237", // Deep purple
        "37, 99, 235",  // Deep blue
        "14, 116, 144", // Deep cyan
        "2, 132, 199"   // Deep sky blue
      ];
      return lightColors[index % lightColors.length];
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const darkMode = isDark();

    // Draw and connect particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse gentle repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }
      }

      const color = getParticleColor(p.colorIndex, darkMode);
      const alpha = darkMode ? p.baseAlpha : p.baseAlpha * 0.55;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const lineAlpha = (1 - dist / 100) * (darkMode ? 0.16 : 0.08);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${color}, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Exposed function for theme update
  window.updateParticlesTheme = function () {
    // Redraw loop continues automatically picking up isDark()
  };

  // Event Listeners
  window.addEventListener("resize", () => {
    resize();
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Start
  resize();
  animate();
})();
