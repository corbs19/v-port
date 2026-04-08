import { useEffect, useRef } from "react";

export default function ParticleBackground({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Dark mode: espresso/cream/amber particles ──
    const darkColors = [
      () => `hsl(38, ${Math.random() * 20 + 60}%, ${Math.random() * 15 + 82}%)`, // creams
      () => `hsl(25, ${Math.random() * 30 + 50}%, ${Math.random() * 20 + 40}%)`, // mid browns
      () => `hsl(35, ${Math.random() * 30 + 60}%, ${Math.random() * 20 + 55}%)`, // amber
      () => `hsl(38, ${Math.random() * 20 + 40}%, ${Math.random() * 15 + 65}%)`, // light cream
    ];

    // ── Light mode: deep brown/espresso/dark amber particles ──
    const lightColors = [
      () => `hsl(20, ${Math.random() * 20 + 50}%, ${Math.random() * 10 + 18}%)`, // espresso dark
      () => `hsl(25, ${Math.random() * 20 + 45}%, ${Math.random() * 15 + 28}%)`, // dark brown
      () => `hsl(15, ${Math.random() * 15 + 35}%, ${Math.random() * 10 + 22}%)`, // near-black brown
      () => `hsl(30, ${Math.random() * 25 + 40}%, ${Math.random() * 15 + 35}%)`, // rich brown
      () => `hsl(35, ${Math.random() * 20 + 50}%, ${Math.random() * 10 + 30}%)`, // dark amber
    ];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.4;
        this.assignColor();
      }

      assignColor() {
        const palette = darkMode ? darkColors : lightColors;
        const colorFn = palette[Math.floor(Math.random() * palette.length)];
        this.color = colorFn();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 130; i++) {
        particles.push(new Particle());
      }
    };

    const drawDarkBackground = () => {
      ctx.fillStyle = "#100800"; // Deep espresso
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g1 = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.2, 0,
        canvas.width * 0.15, canvas.height * 0.2, canvas.width * 0.55
      );
      g1.addColorStop(0, "rgba(90,45,10,0.55)");
      g1.addColorStop(0.5, "rgba(50,22,5,0.3)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g2 = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.8, 0,
        canvas.width * 0.85, canvas.height * 0.8, canvas.width * 0.5
      );
      g2.addColorStop(0, "rgba(120,65,20,0.45)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawLightBackground = () => {
      ctx.fillStyle = "#f5ede0"; // Warm cream
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g1 = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.2, 0,
        canvas.width * 0.15, canvas.height * 0.2, canvas.width * 0.6
      );
      g1.addColorStop(0, "rgba(210,170,120,0.45)");
      g1.addColorStop(0.5, "rgba(200,160,110,0.2)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const g2 = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.8, 0,
        canvas.width * 0.85, canvas.height * 0.8, canvas.width * 0.5
      );
      g2.addColorStop(0, "rgba(180,130,80,0.35)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      if (darkMode) {
        drawDarkBackground();
      } else {
        drawLightBackground();
      }
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [darkMode]); // Redraws when darkMode prop changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Behind content
      }}
    />
  );
}