import React from 'react';

/**
 * Girl SVG character with CSS wind animations on hair and dress.
 * pose = 'standing' | 'accepting'
 */
export default function GirlCharacter({ pose = 'standing' }) {
  const accepting = pose === 'accepting';
  const together  = pose === 'together';

  const Face = () => (
    <>
      <circle cx="75" cy="52" r="45" fill="#FDBCB4" />
      <ellipse cx="30"  cy="54" rx="9"  ry="13" fill="#F0A090" />
      <ellipse cx="120" cy="54" rx="9"  ry="13" fill="#F0A090" />

      {/* long hair back layer */}
      <path d="M29 36 C18 80, 16 165, 28 208 L40 208 C32 160, 32 88, 38 50Z" fill="#2e1a0e" />
      <path d="M121 36 C132 80, 134 165, 122 208 L110 208 C118 160, 118 88, 112 50Z" fill="#2e1a0e" />

      {/* hair top – solid dome, peak at y≈5, above head top y=7 */}
      <path d="M29 48 C29 -10 121 -10 121 48 Z" fill="#2e1a0e" />
      <ellipse cx="29"  cy="44" rx="11" ry="22" fill="#2e1a0e" />
      <ellipse cx="121" cy="44" rx="11" ry="22" fill="#2e1a0e" />

      {/* hair clip */}
      <ellipse cx="52" cy="16" rx="13" ry="7" fill="#FF69B4" transform="rotate(-20 52 16)"/>
      <ellipse cx="52" cy="16" rx="5"  ry="3" fill="#FF1493"/>

      {/* eyes with lashes */}
      <ellipse cx="58" cy="51" rx="11" ry="12" fill="white"/>
      <ellipse cx="92" cy="51" rx="11" ry="12" fill="white"/>
      <path d="M47 44 Q58 38 70 44" stroke="#222" strokeWidth="2.5" fill="none"/>
      <path d="M80 44 Q92 38 104 44" stroke="#222" strokeWidth="2.5" fill="none"/>
      <circle cx="59" cy="52" r="8"   fill="#111"/>
      <circle cx="93" cy="52" r="8"   fill="#111"/>
      <circle cx="60" cy="52" r="4.5" fill="#6D4C41"/>
      <circle cx="94" cy="52" r="4.5" fill="#6D4C41"/>
      <circle cx="63" cy="48" r="2.2" fill="white"/>
      <circle cx="97" cy="48" r="2.2" fill="white"/>
      {/* lash flicks */}
      {[[47,60,44,64],[70,60,73,64],[81,60,78,64],[104,60,107,64]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      ))}

      {/* eyebrows */}
      <path d="M47 36 Q58 28 70 35" stroke="#2e1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M80 35 Q92 28 103 36" stroke="#2e1a0e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* nose */}
      <path d="M70 63 Q75 70 80 63" stroke="#C07070" strokeWidth="1.8" fill="none" strokeLinecap="round"/>

      {/* mouth */}
      <path d="M62 78 Q75 90 88 78" stroke="#D06060" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M67 76 Q75 72 83 76" stroke="rgba(255,170,160,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* blush */}
      <ellipse cx="43"  cy="66" rx="13" ry="9" fill="rgba(255,110,120,0.40)"/>
      <ellipse cx="107" cy="66" rx="13" ry="9" fill="rgba(255,110,120,0.40)"/>
    </>
  );

  return (
    <div style={{ width: 150, height: 300, position: 'relative' }}>

      {/* ── STANDING POSE ── */}
      <svg viewBox="0 0 150 300" width="150" height="300"
        xmlns="http://www.w3.org/2000/svg" overflow="visible"
        style={{ display: (accepting || together) ? 'none' : 'block' }}>
        {/* shadow */}
        <ellipse cx="75" cy="293" rx="44" ry="8" fill="rgba(0,0,0,0.2)"/>

        {/* dress skirt (wind-animated) */}
        <g className="dress-wind">
          <path d="M36 172 L14 290 L136 290 L114 172Z" fill="#F48FB1"/>
          <path d="M40 182 L20 290 L80 290Z"  fill="rgba(255,255,255,0.13)"/>
          <path d="M110 182 L130 290 L80 290Z" fill="rgba(255,255,255,0.13)"/>
          <path d="M14 278 Q75 265 136 278 L136 290 L14 290Z" fill="rgba(255,255,255,0.5)"/>
        </g>

        {/* dress bodice */}
        <rect x="38" y="106" width="74" height="70" rx="14" fill="#E91E63"/>
        <path d="M63 106 L75 123 L87 106" fill="#C2185B"/>

        {/* arms */}
        <rect x="14" y="114" width="28" height="14" rx="7" fill="#FDBCB4"/>
        <circle cx="14" cy="121" r="7.5" fill="#FDBCB4"/>
        <rect x="108" y="114" width="28" height="14" rx="7" fill="#FDBCB4"/>
        <circle cx="136" cy="121" r="7.5" fill="#FDBCB4"/>

        {/* neck */}
        <rect x="63" y="92" width="24" height="18" rx="10" fill="#FDBCB4"/>

        {/* head + hair-wind wrapper */}
        <g className="hair-wind" style={{transformOrigin:'75px 10px'}}>
          <Face />
        </g>

        {/* shoes */}
        <ellipse cx="46"  cy="288" rx="20" ry="8" fill="#880E4F"/>
        <ellipse cx="104" cy="288" rx="20" ry="8" fill="#880E4F"/>
      </svg>

      {/* ── ACCEPTING POSE ── */}
      <svg viewBox="0 0 150 300" width="150" height="300"
        xmlns="http://www.w3.org/2000/svg" overflow="visible"
        style={{ display: accepting ? 'block' : 'none', position:'absolute', top:0, left:0 }}>
        {/* shadow */}
        <ellipse cx="75" cy="293" rx="44" ry="8" fill="rgba(0,0,0,0.2)"/>
        {/* dress */}
        <g className="dress-wind">
          <path d="M36 172 L14 290 L136 290 L114 172Z" fill="#F48FB1"/>
          <path d="M14 278 Q75 265 136 278 L136 290 L14 290Z" fill="rgba(255,255,255,0.5)"/>
        </g>
        <rect x="38" y="106" width="74" height="70" rx="14" fill="#E91E63"/>
        <path d="M63 106 L75 123 L87 106" fill="#C2185B"/>
        {/* left arm reaching toward boy */}
        <g id="girl-arm-accepting">
          <rect x="5" y="118" width="36" height="14" rx="7" fill="#FDBCB4"
                transform="rotate(38 41 125)"/>
          <circle cx="14" cy="140" r="8" fill="#FDBCB4"/>
        </g>
        {/* right arm */}
        <rect x="108" y="114" width="28" height="14" rx="7" fill="#FDBCB4"/>
        <circle cx="136" cy="121" r="7.5" fill="#FDBCB4"/>
        {/* neck */}
        <rect x="63" y="92" width="24" height="18" rx="10" fill="#FDBCB4"/>
        <g className="hair-wind" style={{transformOrigin:'75px 10px'}}>
          <Face />
        </g>
        <ellipse cx="46"  cy="288" rx="20" ry="8" fill="#880E4F"/>
        <ellipse cx="104" cy="288" rx="20" ry="8" fill="#880E4F"/>
      </svg>

      {/* ── TOGETHER POSE ── holding boy's hand + holding bouquet */}
      <svg viewBox="0 0 150 300" width="150" height="300"
        xmlns="http://www.w3.org/2000/svg" overflow="visible"
        style={{ display: together ? 'block' : 'none', position:'absolute', top:0, left:0 }}>
        {/* shadow */}
        <ellipse cx="75" cy="293" rx="44" ry="8" fill="rgba(0,0,0,0.2)"/>
        {/* dress */}
        <g className="dress-wind">
          <path d="M36 172 L14 290 L136 290 L114 172Z" fill="#F48FB1"/>
          <path d="M40 182 L20 290 L80 290Z"  fill="rgba(255,255,255,0.13)"/>
          <path d="M110 182 L130 290 L80 290Z" fill="rgba(255,255,255,0.13)"/>
          <path d="M14 278 Q75 265 136 278 L136 290 L14 290Z" fill="rgba(255,255,255,0.5)"/>
        </g>
        <rect x="38" y="106" width="74" height="70" rx="14" fill="#E91E63"/>
        <path d="M63 106 L75 123 L87 106" fill="#C2185B"/>
        {/* left arm – extended toward boy to hold his hand */}
        <g>
          <rect x="0" y="119" width="52" height="14" rx="7" fill="#FDBCB4"
                transform="rotate(-16 52 126)"/>
          <circle cx="3" cy="140" r="7.5" fill="#FDBCB4"/>
        </g>
        {/* right arm – holding the gifted bouquet */}
        <g style={{filter:'drop-shadow(0 0 5px rgba(255,100,200,0.9)) drop-shadow(0 0 10px rgba(255,60,140,0.5))'}}>
          <rect x="108" y="108" width="28" height="14" rx="7" fill="#FDBCB4"
                transform="rotate(-22 122 115)"/>
          <circle cx="130" cy="100" r="7.5" fill="#FDBCB4"/>
          {/* mini bouquet */}
          <g transform="translate(132,86)">
            {[[-4,0,-5,-22],[0,0,1,-26],[4,0,5,-20]].map(([x1,y1,x2,y2],i)=>(
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a8a18" strokeWidth="2" strokeLinecap="round"/>
            ))}
            {[['#FF1493',0,-28,7,'#FF69B4'],['#E91E63',7,-20,6,'#F48FB1'],['#FDD835',-7,-20,6,'#FFF176']].map(([c,fx,fy,r,lc],i)=>(
              <g key={i}>
                {[0,60,120,180,240,300].map((a,j)=>{
                  const rd=a*Math.PI/180;
                  return <ellipse key={j} cx={fx+Math.cos(rd)*r*0.85} cy={fy+Math.sin(rd)*r*0.85}
                    rx={r*0.6} ry={r*0.33} fill={lc} opacity="0.88"
                    transform={`rotate(${a} ${fx+Math.cos(rd)*r*0.85} ${fy+Math.sin(rd)*r*0.85})`}/>;
                })}
                <circle cx={fx} cy={fy} r={r*0.45} fill={c}/>
              </g>
            ))}
            <path d="M-6 2 Q0 5 6 2 Q4 9 0 10 Q-4 9 -6 2Z" fill="#FF69B4"/>
          </g>
        </g>
        {/* neck */}
        <rect x="63" y="92" width="24" height="18" rx="10" fill="#FDBCB4"/>
        <g className="hair-wind" style={{transformOrigin:'75px 10px'}}>
          <Face />
        </g>
        <ellipse cx="46"  cy="288" rx="20" ry="8" fill="#880E4F"/>
        <ellipse cx="104" cy="288" rx="20" ry="8" fill="#880E4F"/>
      </svg>
    </div>
  );
}
