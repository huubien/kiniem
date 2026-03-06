import React, { useRef, useEffect } from 'react';

const COLORS = [
  'rgba(255,182,193,0.88)', 'rgba(255,105,180,0.78)',
  'rgba(255,20,147,0.65)',  'rgba(255,228,196,0.82)',
  'rgba(220,180,255,0.75)', 'rgba(255,240,160,0.82)',
  'rgba(255,160,122,0.72)', 'rgba(200,230,255,0.70)',
];

function mkPetal(W, H) {
  return {
    x: Math.random() * W,
    y: -20 - Math.random() * 250,
    vx: (Math.random() - 0.5) * 1.3,
    vy: 0.55 + Math.random() * 1.6,
    rot: Math.random() * Math.PI * 2,
    rs: (Math.random() - 0.5) * 0.07,
    w: 10 + Math.random() * 14,
    h:  5 + Math.random() * 9,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    wobble: Math.random() * Math.PI * 2,
    ws: 0.025 + Math.random() * 0.03,
  };
}

export default function PetalParticles({ count = 60 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx    = canvas.getContext('2d');
    let raf;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const petals = Array.from({ length: count }, () => mkPetal(canvas.width, canvas.height));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.wobble += p.ws;
        p.x  += p.vx + Math.sin(p.wobble) * 0.55;
        p.y  += p.vy;
        p.rot += p.rs;
        if (p.y > canvas.height + 25) Object.assign(p, mkPetal(canvas.width, canvas.height));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(-p.w / 2 + 2, 0);
        ctx.lineTo(p.w / 2 - 2, 0);
        ctx.stroke();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);

  return <canvas ref={ref} className="layer" style={{ zIndex: 14 }} />;
}
