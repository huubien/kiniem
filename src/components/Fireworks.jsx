import React, { useRef, useEffect } from 'react';

const COLORS = [
  '#FF4466','#FF8800','#FFD700','#88FFAA','#44CCFF','#FF66FF','#FF88CC','#FFFFFF','#FFCCEE',
  '#FFB0D0','#80DFFF','#FFE866',
];

// Shells launch from the mountain horizon line (~68% down the screen)
function mkShell(W, H) {
  return {
    x:   W * (0.1 + Math.random() * 0.8),
    y:   H * 0.68,
    vy: -(H * 0.013 + Math.random() * H * 0.008),
    exploded: false,
    sparks:   [],
    fuseT:    0,
    maxT:     22 + Math.random() * 18,
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    trail:    [],
  };
}

function mkSpark(x, y, color) {
  const a = Math.random() * Math.PI * 2;
  const v = 1.5 + Math.random() * 5;
  return {
    x, y,
    vx: Math.cos(a) * v,
    vy: Math.sin(a) * v,
    alpha: 1,
    decay: 0.014 + Math.random() * 0.012,
    color,
    tail: [],
  };
}

export default function Fireworks() {
  const ref   = useRef(null);
  const state = useRef({ shells: [], timer: 0 });

  useEffect(() => {
    const canvas = ref.current;
    const ctx    = canvas.getContext('2d');
    let raf;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const shoot = () => state.current.shells.push(mkShell(canvas.width, canvas.height));
    shoot();
    const iv = setInterval(shoot, 900);

    const draw = () => {
      // Clear fully — background scene shows through the transparent canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { shells } = state.current;

      shells.forEach(sh => {
        if (!sh.exploded) {
          sh.trail.push({ x: sh.x, y: sh.y });
          if (sh.trail.length > 9) sh.trail.shift();

          sh.y    += sh.vy;
          sh.vy   += 0.20;
          sh.fuseT++;

          // Shell rising trail
          sh.trail.forEach((t, ti) => {
            ctx.save();
            ctx.globalAlpha = (ti / sh.trail.length) * 0.55;
            ctx.fillStyle   = sh.color;
            ctx.shadowColor = sh.color;
            ctx.shadowBlur  = 5;
            ctx.beginPath();
            ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });

          // Shell head
          ctx.save();
          ctx.fillStyle   = sh.color;
          ctx.shadowColor = sh.color;
          ctx.shadowBlur  = 12;
          ctx.beginPath();
          ctx.arc(sh.x, sh.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (sh.fuseT >= sh.maxT || sh.vy >= 0) {
            sh.exploded = true;
            const count = 90 + Math.floor(Math.random() * 60);
            for (let i = 0; i < count; i++) sh.sparks.push(mkSpark(sh.x, sh.y, sh.color));
          }
        } else {
          sh.sparks = sh.sparks.filter(s => s.alpha > 0.01);
          sh.sparks.forEach(s => {
            s.tail.push({ x: s.x, y: s.y });
            if (s.tail.length > 5) s.tail.shift();
            s.x      += s.vx;
            s.y      += s.vy;
            s.vy     += 0.09;
            s.vx     *= 0.97;
            s.alpha  -= s.decay;

            // tail
            s.tail.forEach((t, ti) => {
              ctx.save();
              ctx.globalAlpha = (ti / s.tail.length) * s.alpha * 0.5;
              ctx.fillStyle   = s.color;
              ctx.beginPath();
              ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            });
            // spark
            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle   = s.color;
            ctx.shadowColor = s.color;
            ctx.shadowBlur  = 6;
            ctx.beginPath();
            ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }
      });

      // Remove shells with no sparks left
      state.current.shells = shells.filter(sh => !sh.exploded || sh.sparks.length > 0);

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // clipPath hides any firework sparks that drift below the mountain horizon,
  // creating the illusion that shells launch from behind the mountains.
  return (
    <canvas
      ref={ref}
      className="layer"
      style={{
        zIndex: 22,
        clipPath: 'polygon(0 0, 100% 0, 100% 68%, 0 68%)',
      }}
    />
  );
}
