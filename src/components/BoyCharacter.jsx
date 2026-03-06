import React from 'react';

/**
 * Boy SVG character – two poses: 'standing' | 'kneeling'
 * Leg elements have IDs for GSAP walking animation.
 */
export default function BoyCharacter({ pose = 'standing' }) {
  const kneeling = pose === 'kneeling';

  /* shared face */
  const Face = ({ dy = 0 }) => (
    <>
      <circle cx="75" cy={dy + 55} r="44" fill="#FDBCB4" />
      <ellipse cx="31"  cy={dy + 57} rx="9"  ry="12" fill="#F0A090" />
      <ellipse cx="119" cy={dy + 57} rx="9"  ry="12" fill="#F0A090" />
      {/* hair */}
      <path d={`M32 ${dy+40} C35 ${dy+8},115 ${dy+8},118 ${dy+40} C108 ${dy+25},75 ${dy+20},32 ${dy+40}Z`} fill="#2e1a0e" />
      <rect x="31" y={dy+16} width="88" height="28" rx="10" fill="#2e1a0e" />
      <ellipse cx="30"  cy={dy+44} rx="10" ry="18" fill="#2e1a0e" />
      <ellipse cx="120" cy={dy+44} rx="10" ry="18" fill="#2e1a0e" />
      {/* eyes */}
      <ellipse cx="58" cy={dy+54} rx="10" ry="11" fill="white" />
      <ellipse cx="92" cy={dy+54} rx="10" ry="11" fill="white" />
      <circle  cx="59" cy={dy+55} r="7"   fill="#111" />
      <circle  cx="93" cy={dy+55} r="7"   fill="#111" />
      <circle  cx="60" cy={dy+55} r="4"   fill="#5D4037" />
      <circle  cx="94" cy={dy+55} r="4"   fill="#5D4037" />
      <circle cx="62" cy={dy+52} r="2" fill="white" />
      <circle cx="96" cy={dy+52} r="2" fill="white" />
      {/* eyebrows */}
      <path d={`M48 ${dy+38} Q59 ${dy+31} 70 ${dy+38}`} stroke="#2e1a0e" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d={`M80 ${dy+38} Q91 ${dy+31} 102 ${dy+38}`} stroke="#2e1a0e" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* nose */}
      <path d={`M70 ${dy+65} Q75 ${dy+72} 80 ${dy+65}`} stroke="#C07060" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* smile */}
      <path d={`M63 ${dy+79} Q75 ${dy+90} 87 ${dy+79}`} stroke="#B06060" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* blush */}
      <ellipse cx="46"  cy={dy+68} rx="12" ry="8" fill="rgba(255,130,110,0.38)" />
      <ellipse cx="104" cy={dy+68} rx="12" ry="8" fill="rgba(255,130,110,0.38)" />
    </>
  );

  /* flower bouquet */
  const Bouquet = ({ x, y }) => (
    <g transform={`translate(${x},${y})`}>
      {[-6,0,6].map((ox,i)=>(
        <line key={i} x1={ox} y1="0" x2={ox+2} y2="-28" stroke="#3a7a18" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      {[['#E53935',0,-30],['#EC407A',8,-22],['#FDD835',-8,-22],['#AB47BC',4,-14],['#FF7043',-4,-14]].map(([c,x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="9" fill={c}/>
      ))}
      {[['#EF5350',0,-30],['#F06292',8,-22],['#FFF176',-8,-22]].map(([c,x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="5" fill={c} opacity="0.7"/>
      ))}
      {/* ribbon */}
      <path d="M-8 0 Q0 4 8 0 Q4 8 0 10 Q-4 8 -8 0Z" fill="#FF69B4"/>
    </g>
  );

  return (
    <div style={{ width: 150, height: 275, position: 'relative' }}>

      {/* ── STANDING POSE ── */}
      <svg viewBox="0 0 150 275" width="150" height="275"
        xmlns="http://www.w3.org/2000/svg" overflow="visible"
        style={{ display: kneeling ? 'none' : 'block' }}>
        {/* shadow */}
        <ellipse cx="75" cy="270" rx="42" ry="8" fill="rgba(0,0,0,0.2)" />
        {/* left leg */}
        <g id="boy-leg-left">
          <rect x="44" y="172" width="22" height="58" rx="11" fill="#263238"/>
          <rect x="45" y="224" width="20" height="42" rx="8"  fill="#1a2428"/>
          <ellipse cx="55" cy="264" rx="20" ry="8" fill="#111"/>
        </g>
        {/* right leg */}
        <g id="boy-leg-right">
          <rect x="84" y="172" width="22" height="58" rx="11" fill="#263238"/>
          <rect x="85" y="224" width="20" height="42" rx="8"  fill="#1a2428"/>
          <ellipse cx="95" cy="264" rx="20" ry="8" fill="#111"/>
        </g>
        {/* body */}
        <rect x="40" y="104" width="70" height="74" rx="14" fill="#1565C0"/>
        <path d="M66 104 L75 120 L84 104" fill="#0d47a1"/>
        <rect x="40" y="172" width="70" height="10" rx="4" fill="#1a2428"/>
        {/* left arm */}
        <g id="boy-arm-left">
          <rect x="16" y="112" width="28" height="15" rx="7" fill="#FDBCB4"/>
          <circle cx="16" cy="119" r="8" fill="#FDBCB4"/>
        </g>
        {/* right arm – holding bouquet */}
        <g id="boy-arm-right">
          <rect x="106" y="108" width="28" height="15" rx="7" fill="#FDBCB4"
                transform="rotate(-20 120 120)"/>
          <circle cx="128" cy="104" r="8" fill="#FDBCB4"/>
          <Bouquet x={130} y={90} />
        </g>
        {/* neck */}
        <rect x="63" y="90" width="24" height="18" rx="10" fill="#FDBCB4"/>
        <Face dy={0} />
      </svg>

      {/* ── KNEELING POSE ── */}
      <svg viewBox="0 0 150 275" width="150" height="275"
        xmlns="http://www.w3.org/2000/svg" overflow="visible"
        style={{ display: kneeling ? 'block' : 'none', position:'absolute', top:0, left:0 }}>
        {/* shadow */}
        <ellipse cx="75" cy="270" rx="52" ry="9" fill="rgba(0,0,0,0.28)" />
        {/* kneeling legs */}
        <rect x="75" y="190" width="22" height="60" rx="11" fill="#263238"
              transform="rotate(75 86 190)"/>
        <ellipse cx="112" cy="258" rx="21" ry="8" fill="#111"/>
        <rect x="36" y="178" width="22" height="60" rx="11" fill="#263238"
              transform="rotate(-25 47 178)"/>
        <ellipse cx="38" cy="262" rx="21" ry="8" fill="#111"/>
        {/* body tilted forward */}
        <rect x="38" y="96" width="70" height="80" rx="14" fill="#1565C0"
              transform="rotate(14 75 176)"/>
        <rect x="38" y="170" width="70" height="10" rx="4" fill="#1a2428"
              transform="rotate(14 75 176)"/>
        {/* right arm extended with bouquet */}
        <g id="boy-kneeling-arm">
          <rect x="106" y="100" width="40" height="14" rx="7" fill="#FDBCB4"
                transform="rotate(-38 106 107)"/>
          <circle cx="136" cy="90" r="8" fill="#FDBCB4"/>
          <Bouquet x={138} y={78} />
        </g>
        {/* left arm */}
        <rect x="10" y="108" width="32" height="14" rx="7" fill="#FDBCB4"/>
        {/* neck */}
        <rect x="63" y="84" width="24" height="18" rx="10" fill="#FDBCB4"
              transform="rotate(12 75 93)"/>
        <Face dy={-6} />
      </svg>
    </div>
  );
}
