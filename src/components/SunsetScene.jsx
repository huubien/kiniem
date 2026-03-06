import React from 'react';

/* reusable cloud blob */
const Cloud = ({ x, y, s = 1, op = 0.82 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`} opacity={op}>
    <ellipse cx="80"  cy="25" rx="72" ry="26" fill="white" />
    <ellipse cx="32"  cy="34" rx="40" ry="22" fill="white" />
    <ellipse cx="128" cy="30" rx="36" ry="18" fill="white" />
    <ellipse cx="80"  cy="36" rx="72" ry="22" fill="white" />
  </g>
);

const STARS = Array.from({ length: 90 }, (_, i) => ({
  x:  ((i * 137.5 * 13.7) % 1910) + 5,
  y:  ((i * 97.3  * 7.1)  % 500)  + 5,
  r:  i % 7 === 0 ? 2.2 : 1,
  d:  `${1.8 + (i % 5)}s`,
  op: 0.2 + ((500 - ((i * 97.3 * 7.1) % 500)) / 500) * 0.75,
}));

/* A winding path / road through the flower field */
const PATH_D = "M -100 1080 C 400 950, 650 900, 960 870 C 1270 840, 1520 870, 2020 1080";

export default function SunsetScene() {
  const flowers = Array.from({ length: 55 }, (_, i) => {
    const seed   = i * 137.5;
    const colors = ['#FF69B4','#FF1493','#FFD700','#FF6347','#DA70D6','#FF8C00','#FFA07A','#ADFF2F'];
    return {
      x:  ((seed * 29.7) % 1820) + 50,
      y:  820 + (i % 7) * 11,
      c:  colors[i % colors.length],
      sz: 0.5 + (i % 5) * 0.13,
    };
  });

  return (
    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Sky */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#040015" />
          <stop offset="14%"  stopColor="#170535" />
          <stop offset="32%"  stopColor="#5c1070" />
          <stop offset="52%"  stopColor="#aa3030" />
          <stop offset="66%"  stopColor="#d85520" />
          <stop offset="78%"  stopColor="#e87030" />
          <stop offset="88%"  stopColor="#f09040" />
          <stop offset="100%" stopColor="#ffd070" />
        </linearGradient>
        {/* Sun glow */}
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(255,220,80,0.7)" />
          <stop offset="55%" stopColor="rgba(255,160,40,0.3)" />
          <stop offset="100%" stopColor="rgba(255,100,0,0)" />
        </radialGradient>
        {/* Horizon haze */}
        <radialGradient id="haze" cx="50%" cy="100%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,140,50,0.45)" />
          <stop offset="100%" stopColor="rgba(255,140,50,0)" />
        </radialGradient>
        {/* Ground */}
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4a7c20" />
          <stop offset="45%"  stopColor="#2e5c10" />
          <stop offset="100%" stopColor="#1a3a08" />
        </linearGradient>
        {/* Path on ground */}
        <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,200,100,0.5)" />
          <stop offset="100%" stopColor="rgba(200,150,50,0.2)" />
        </linearGradient>
        <filter id="blur6"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="blur12"><feGaussianBlur stdDeviation="12" /></filter>
        <filter id="blur3"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      {/* ── SKY ── */}
      <rect width="1920" height="1080" fill="url(#sky)" />

      {/* Stars */}
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op}>
          <animate attributeName="opacity" values={`${s.op};${Math.min(s.op+0.5,1)};${s.op}`}
            dur={s.d} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Moon (upper left) */}
      <circle cx="220" cy="130" r="48" fill="#FFF8DC" opacity="0.85" filter="url(#blur3)" />
      <circle cx="220" cy="130" r="42" fill="#FFFACD" opacity="0.9" />
      <circle cx="244" cy="112" r="36" fill="#0d0030" opacity="0.7" />
      {/* Moon glow */}
      <circle cx="220" cy="130" r="75" fill="rgba(255,250,200,0.08)" filter="url(#blur12)" />

      {/* Horizon haze */}
      <ellipse cx="960" cy="1080" rx="900" ry="350" fill="url(#haze)" />

      {/* Sun */}
      <circle cx="960" cy="860" r="160" fill="url(#sunGlow)" filter="url(#blur12)" />
      <circle cx="960" cy="860" r="88"  fill="#FFD060" opacity="0.93">
        <animate attributeName="r"       values="85;93;85" dur="5s"  repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.88;0.97;0.88" dur="5s" repeatCount="indefinite" />
      </circle>
      {Array.from({length:14},(_, i) => {
        const a = i*25.7, rd = a*Math.PI/180;
        return <line key={i}
          x1={960+Math.cos(rd)*100} y1={860+Math.sin(rd)*100}
          x2={960+Math.cos(rd)*148} y2={860+Math.sin(rd)*148}
          stroke="rgba(255,210,60,0.55)" strokeWidth="4" strokeLinecap="round">
          <animate attributeName="opacity" values="0.35;0.8;0.35"
            dur={`${2.5+(i%4)}s`} repeatCount="indefinite"/>
        </line>;
      })}

      {/* ── DISTANT MOUNTAINS (3 layers) ── */}
      <path d="M0 660 L130 540 L280 630 L460 490 L640 600 L820 470 L1000 590 L1180 460
               L1360 570 L1540 480 L1720 560 L1920 490 L1920 1080 L0 1080Z"
        fill="rgba(40,8,70,0.55)" />
      <path d="M0 710 L200 620 L380 690 L560 600 L740 670 L920 570 L1100 660 L1280 580
               L1460 650 L1640 590 L1820 630 L1920 600 L1920 1080 L0 1080Z"
        fill="rgba(55,12,65,0.65)" />
      <path d="M0 760 L240 690 L440 750 L620 680 L800 740 L980 660 L1160 730 L1340 670
               L1520 720 L1700 670 L1920 700 L1920 1080 L0 1080Z"
        fill="rgba(35,8,55,0.75)" />

      {/* ── CLOUDS ── */}
      <g style={{animation:'cloudDrift 28s ease-in-out infinite alternate'}}>
        <Cloud x={60}   y={100} s={1.3} op={0.72} />
      </g>
      <g style={{animation:'cloudDrift 38s ease-in-out infinite alternate-reverse'}}>
        <Cloud x={450}  y={65}  s={1.0} op={0.58} />
      </g>
      <g style={{animation:'cloudDrift 22s ease-in-out infinite alternate'}}>
        <Cloud x={900}  y={125} s={1.2} op={0.48} />
      </g>
      <g style={{animation:'cloudDrift 32s ease-in-out infinite alternate-reverse'}}>
        <Cloud x={1350} y={85}  s={1.4} op={0.62} />
      </g>
      <g style={{animation:'cloudDrift 26s ease-in-out infinite alternate'}}>
        <Cloud x={1680} y={140} s={0.9} op={0.52} />
      </g>

      {/* ── ROLLING HILLS ── */}
      <path d="M0 810 Q240 770 480 800 Q720 830 960 800 Q1200 770 1440 800 Q1680 830 1920 800 L1920 1080 L0 1080Z"
        fill="#3a6b18" opacity="0.9" />

      {/* ── TREES (silhouette sides) ── */}
      {/* Left trees */}
      {[50,160,270,380].map((x,i) => (
        <g key={i} transform={`translate(${x},${730+i*12})`}>
          <rect x="-8" y="0" width="16" height={90+i*10} rx="4" fill="#0d1f05" opacity="0.85" />
          <ellipse cx="0" cy="0" rx={35+i*4} ry={70+i*8} fill="#0d2005" opacity="0.85" />
        </g>
      ))}
      {/* Right trees */}
      {[1550,1660,1760,1850].map((x,i) => (
        <g key={i} transform={`translate(${x},${740+i*8})`}>
          <rect x="-8" y="0" width="16" height={80+i*12} rx="4" fill="#0d1f05" opacity="0.85" />
          <ellipse cx="0" cy="0" rx={32+i*3} ry={65+i*7} fill="#0d2005" opacity="0.85" />
        </g>
      ))}

      {/* ── WINDING PATH ── */}
      <path d={PATH_D} stroke="url(#pathGrad)" strokeWidth="38" fill="none" strokeLinecap="round" />
      <path d={PATH_D} stroke="rgba(255,220,140,0.18)" strokeWidth="18" fill="none" strokeLinecap="round" />

      {/* ── GROUND ── */}
      <path d="M0 858 Q480 838 960 858 Q1440 878 1920 858 L1920 1080 L0 1080Z"
        fill="url(#ground)" />

      {/* Grass blades */}
      {Array.from({length:130},(_, i)=>{
        const x = ((i*16.3+8)%1900)+10, h = 12+(i%7)*7;
        return <path key={i}
          d={`M${x} 860 C${x+(i%2?3:-3)} ${860-h*0.4},${x+(i%2?-2:2)} ${860-h*0.75},${x+(i%2?2:-2)} ${860-h}`}
          stroke="#5a9e28" strokeWidth="1.8" fill="none" strokeLinecap="round" />;
      })}

      {/* ── FLOWERS ── */}
      {flowers.map(({x,y,c,sz},i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${sz})`}>
          <line x1="0" y1="0" x2="0" y2="-24" stroke="#4a8c18" strokeWidth="2.5" strokeLinecap="round" />
          {[0,60,120,180,240,300].map((a,j) => {
            const rd = a*Math.PI/180;
            return <ellipse key={j} cx={Math.cos(rd)*10} cy={-24+Math.sin(rd)*10}
              rx="7" ry="4.5" fill={c} opacity="0.9"
              transform={`rotate(${a} ${Math.cos(rd)*10} ${-24+Math.sin(rd)*10})`} />;
          })}
          <circle cx="0" cy="-24" r="5" fill="#FFD700" />
        </g>
      ))}

      {/* Foreground dark strip */}
      <rect x="0" y="885" width="1920" height="195" fill="#152808" opacity="0.4" />

      {/* Atmospheric horizon glow strip */}
      <rect x="0" y="800" width="1920" height="65" fill="rgba(255,140,40,0.14)" />
    </svg>
  );
}
