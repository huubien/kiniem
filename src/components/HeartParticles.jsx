import React, { useRef, useEffect } from 'react';

const HEART_COLORS = ['#FF1493','#FF69B4','#FF4500','#FFD700','#FF6347','#E91E63','#FF80AB','#FF3366'];

function mkHeart(cx, cy) {
  const a = Math.random() * Math.PI * 2;
  const v = 1.8 + Math.random() * 3.5;
  return {
    x: cx + (Math.random() - 0.5) * 220,
    y: cy + (Math.random() - 0.5) * 110,
    vx: Math.cos(a) * v * 0.55,
    vy: -(v + Math.random()),
    sz: 7 + Math.random() * 18,
    alpha: 1,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    drift: (Math.random() - 0.5) * 0.18,
    decay: 0.007 + Math.random() * 0.007,
  };
}

function drawHeart(ctx, x, y, sz, color, alpha) {
  const s = sz * 0.5;
  ctx.save();
  ctx.globalAlpha = Math.max(0, alpha);
  ctx.fillStyle   = color;
  ctx.shadowColor = color;
  ctx.shadowBlur  = 10;
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y - s * 0.3,  x - s, y - s * 0.3, x - s, y + s * 0.3);
  ctx.bezierCurveTo(x - s, y + s * 0.9, x, y + s * 1.3,  x,     y + s * 1.3);
  ctx.bezierCurveTo(x, y + s * 1.3,  x + s, y + s * 0.9, x + s, y + s * 0.3);
  ctx.bezierCurveTo(x + s, y - s * 0.3, x, y - s * 0.3,  x,     y + s * 0.3);
  ctx.fill();
  ctx.restore();
}

export default function HeartParticles() {
  const ref   = useRef(null);
  const pool  = useRef([]);
  const timer = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx    = canvas.getContext('2d');
    let raf;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const burst = () => {
      const cx = canvas.width * 0.5, cy = canvas.height * 0.58;
      for (let i = 0; i < 10; i++) pool.current.push(mkHeart(cx, cy));
    };
    burst();
    timer.current = setInterval(burst, 1100);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pool.current = pool.current.filter(h => h.alpha > 0.01);
      pool.current.forEach(h => {
        h.x     += h.vx;
        h.y     += h.vy;
        h.vy    += 0.045;
        h.vx    += h.drift;
        h.alpha -= h.decay;
        drawHeart(ctx, h.x, h.y, h.sz, h.color, h.alpha);
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="layer" style={{ zIndex: 25 }} />;
}
