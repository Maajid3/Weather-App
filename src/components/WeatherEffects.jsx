import { useEffect, useRef } from "react";
import { useWeatherData } from "../context/WeatherDataContext";

export default function WeatherEffects() {
  const { data } = useWeatherData();
  const isDay = data?.current?.is_day;
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.7,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.004,
    }));

    const clouds = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth * 1.5,
      y: window.innerHeight * (0.04 + i * 0.06 + Math.random() * 0.04),
      scale: 0.5 + Math.random() * 1.1,
      speed: 0.12 + Math.random() * 0.18,
      opacity: isDay ? 0.55 + Math.random() * 0.3 : 0.12 + Math.random() * 0.12,
    }));


    const SUN_X = canvas.width * 0.78;
    const SUN_Y = -60;

   
    const rays = Array.from({ length: 9 }, (_, i) => ({
      angle: 0.28 + i * 0.1 + (Math.random() - 0.5) * 0.07,
      length: canvas.height * (1.1 + Math.random() * 0.6),
      width: 28 + Math.random() * 55,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0003 + Math.random() * 0.0004,
      baseOpacity: 0.04 + Math.random() * 0.07,
    }));


    function drawCloud(x, y, scale, opacity) {
      const puffs = [
        { dx: 0, dy: 0, r: 54 * scale },
        { dx: -52 * scale, dy: 18 * scale, r: 40 * scale },
        { dx: 52 * scale, dy: 18 * scale, r: 38 * scale },
        { dx: -26 * scale, dy: 28 * scale, r: 32 * scale },
        { dx: 26 * scale, dy: 28 * scale, r: 30 * scale },
        { dx: 0, dy: 38 * scale, r: 28 * scale },
      ];
      puffs.forEach(({ dx, dy, r }) => {
        const g = ctx.createRadialGradient(
          x + dx,
          y + dy,
          0,
          x + dx,
          y + dy,
          r,
        );
        if (isDay) {
          g.addColorStop(0, `rgba(255,255,255,${opacity})`);
          g.addColorStop(0.5, `rgba(240,245,255,${opacity * 0.6})`);
          g.addColorStop(1, `rgba(220,235,255,0)`);
        } else {
          g.addColorStop(0, `rgba(160,185,240,${opacity})`);
          g.addColorStop(0.5, `rgba(120,150,220,${opacity * 0.5})`);
          g.addColorStop(1, `rgba(80,110,200,0)`);
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

 
    function drawRays(t) {
      const x = SUN_X;
      const y = SUN_Y;

      ctx.save();

      rays.forEach((ray) => {
        const breathe = 0.5 + 0.5 * Math.sin(t * ray.speed * 2000 + ray.phase);
        const opacity = ray.baseOpacity * (0.5 + breathe * 1.0);

        const tipX = x;
        const tipY = y;

        const endX = x + Math.sin(ray.angle) * ray.length;
        const endY = y + Math.cos(ray.angle) * ray.length;

       
        const perpX = Math.cos(ray.angle);
        const perpY = -Math.sin(ray.angle);
        const halfW = ray.width * (0.5 + breathe * 0.5);

        const grad = ctx.createLinearGradient(tipX, tipY, endX, endY);
        grad.addColorStop(0, `rgba(255, 240, 200, ${opacity * 1.2})`);
        grad.addColorStop(0.15, `rgba(255, 230, 170, ${opacity})`);
        grad.addColorStop(0.5, `rgba(255, 220, 150, ${opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255, 210, 120, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(tipX, tipY); 
        ctx.lineTo(endX + perpX * halfW, endY + perpY * halfW);
        ctx.lineTo(endX - perpX * halfW, endY - perpY * halfW);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();
    }

   
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      if (isDay) {
        drawRays(t);
      } else {
        stars.forEach((s) => {
          const tw =
            0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
          ctx.globalAlpha = tw;
          ctx.fillStyle = "white";
          ctx.shadowBlur = s.r * 4;
          ctx.shadowColor = "rgba(200,220,255,0.9)";
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      clouds.forEach((c) => {
        c.x -= c.speed;
        if (c.x < -300 * c.scale) {
          c.x = canvas.width + 200;
          c.y = canvas.height * (0.04 + Math.random() * 0.3);
        }
        drawCloud(c.x, c.y, c.scale, c.opacity);
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isDay]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}
    />
  );
}
