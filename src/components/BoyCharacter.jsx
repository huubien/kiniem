import React from 'react';

/**
 * Boy SVG character – two poses: 'standing' | 'kneeling'
 * Leg elements have IDs for GSAP walking animation.
 */
export default function BoyCharacter({ pose = 'standing' }) {
  const kneeling = pose === 'kneeling';
  const together = pose === 'together';

  /* shared face */
  const Face = ({ dy = 0 }) => (
    <>
      <circle cx="75" cy={dy + 55} r="44" fill="#FDBCB4" />
      <ellipse cx="31"  cy={dy + 57} rx="9"  ry="12" fill="#F0A090" />
      <ellipse cx="119" cy={dy + 57} rx="9"  ry="12" fill="#F0A090" />
      {/* hair – dome closes at dy+42 (above eyes at dy+54), peak at dy+0 */}
      <path d={`M30 ${dy+42} C30 ${dy-14} 120 ${dy-14} 120 ${dy+42} Z`} fill="#2e1a0e" />
      <ellipse cx="27"  cy={dy+46} rx="11" ry="16" fill="#2e1a0e" />
      <ellipse cx="123" cy={dy+46} rx="11" ry="16" fill="#2e1a0e" />
      {/* cute small tuft at front */}
      <path d={`M70 ${dy+14} C68 ${dy+21},73 ${dy+27},74 ${dy+31}`} stroke="#3a220e" strokeWidth="4" fill="none" strokeLinecap="round"/>
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

  /* flower bouquet – beautiful glowing version */
  const Bouquet = ({ x, y }) => (
    <g transform={`translate(${x},${y})`}
       style={{filter:'drop-shadow(0 0 6px rgba(255,120,200,0.95)) drop-shadow(0 0 14px rgba(255,60,150,0.55))'}}>
      {/* stems */}
      {[[-8,0,-10,-38],[0,0,2,-44],[8,0,10,-36],[-4,-4,-14,-30],[5,-3,16,-28]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a8a18" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      {/* leaves */}
      <ellipse cx="-11" cy="-22" rx="7" ry="3.5" fill="#4aaa20" transform="rotate(-35 -11 -22)" opacity="0.92"/>
      <ellipse cx="13"  cy="-20" rx="7" ry="3.5" fill="#4aaa20" transform="rotate(35 13 -20)"  opacity="0.92"/>
      {/* petal flowers */}
      {[
        ['#FF1493',0,-46,11,'#FF69B4'],
        ['#E91E63',11,-34,10,'#F48FB1'],
        ['#FF5722',-11,-32,10,'#FF8A65'],
        ['#9C27B0',5,-24,9,'#CE93D8'],
        ['#FDD835',-6,-22,9,'#FFF176'],
      ].map(([c,fx,fy,r,lc],i)=>(
        <g key={i}>
          {[0,60,120,180,240,300].map((a,j)=>{
            const rd=a*Math.PI/180;
            return <ellipse key={j}
              cx={fx+Math.cos(rd)*r*0.88} cy={fy+Math.sin(rd)*r*0.88}
              rx={r*0.62} ry={r*0.36} fill={lc} opacity="0.88"
              transform={`rotate(${a} ${fx+Math.cos(rd)*r*0.88} ${fy+Math.sin(rd)*r*0.88})`}/>;
          })}
          <circle cx={fx} cy={fy} r={r*0.48} fill={c}/>
          <circle cx={fx} cy={fy} r={r*0.22} fill="#FFD700" opacity="0.95"/>
        </g>
      ))}
      {/* baby's breath */}
      {[[-15,-40],[17,-38],[-5,-52],[15,-22],[0,-14]].map(([bx,by],i)=>(
        <circle key={i} cx={bx} cy={by} r="2.8" fill="white" opacity="0.88"/>
      ))}
      {/* ribbon */}
      <path d="M-10 2 Q0 7 10 2 Q6 14 0 16 Q-6 14 -10 2Z" fill="#FF69B4"/>
      <path d="M-10 2 Q-7 -5 -2 2Z" fill="#E91E63" opacity="0.75"/>
      <path d="M10 2 Q7 -5 2 2Z"    fill="#E91E63" opacity="0.75"/>
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
          <rect x="50" y="172" width="20" height="58" rx="11" fill="#263238"/>
          <rect x="51" y="224" width="18" height="42" rx="8"  fill="#1a2428"/>
          <ellipse cx="60" cy="264" rx="19" ry="8" fill="#111"/>
        </g>
        {/* right leg */}
        <g id="boy-leg-right">
          <rect x="80" y="172" width="20" height="58" rx="11" fill="#263238"/>
          <rect x="81" y="224" width="18" height="42" rx="8"  fill="#1a2428"/>
          <ellipse cx="90" cy="264" rx="19" ry="8" fill="#111"/>
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
        {/* right arm – holding bouquet (standing) or holding hand (together) */}
        {together ? (
          <g id="boy-arm-right">
            <rect x="108" y="119" width="44" height="14" rx="7" fill="#FDBCB4"
                  transform="rotate(16 108 126)"/>
            <circle cx="147" cy="136" r="8" fill="#FDBCB4"/>
          </g>
        ) : (
          <g id="boy-arm-right">
            <rect x="106" y="108" width="28" height="15" rx="7" fill="#FDBCB4"
                  transform="rotate(-20 120 120)"/>
            <circle cx="128" cy="104" r="8" fill="#FDBCB4"/>
            <Bouquet x={130} y={90} />
          </g>
        )}
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
