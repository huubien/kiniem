import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import SunsetScene         from './SunsetScene';
import BoyCharacter        from './BoyCharacter';
import GirlCharacter       from './GirlCharacter';
import PetalParticles      from './PetalParticles';
import HeartParticles      from './HeartParticles';
import Fireworks           from './Fireworks';
import { useRomanticMusic } from '../hooks/useRomanticMusic';
import { useLanguage }     from '../i18n/LanguageContext';

/* ── small helper: cinematic text paragraph ── */
const CinText = React.forwardRef(({ children, className = '' }, ref) => (
  <p ref={ref}
    className={`cin-text text-base sm:text-xl md:text-3xl lg:text-4xl px-4 sm:px-6 pointer-events-none ${className}`}
    style={{ maxWidth: 780, lineHeight: 1.7 }}>
    {children}
  </p>
));

export default function LoveStory({ boyName, girlName, onReset, music }) {
  const { lang, t, toggle: toggleLang } = useLanguage();
  /* ── character pose state ── */
  const [boyPose,   setBoyPose]   = useState('standing');
  const [girlPose,  setGirlPose]  = useState('standing');
  const [hearts,    setHearts]    = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [muted,     setMuted]     = useState(false);

  /* ── music (passed from App) ── */
  // music prop used directly — no new hook needed

  /* ── DOM refs ── */
  const bgRef          = useRef(null);
  const boyRef         = useRef(null);
  const girlRef        = useRef(null);
  const darkenRef      = useRef(null);
  const text1Ref       = useRef(null);   // scene 1 text
  const girlNameRef    = useRef(null);   // scene 2 name
  const text2Ref       = useRef(null);   // scene 3 text
  const text4Ref       = useRef(null);   // scene 4 text
  const forYouRef      = useRef(null);   // scene 5 "For you…"
  const finalContRef   = useRef(null);   // scene 7 container
  const finalNameRef   = useRef(null);   // scene 7 names
  const finalSubRef    = useRef(null);   // scene 7 subtitle
  const creditRef      = useRef(null);   // "By Hữu Biên"
  const replayRef      = useRef(null);   // replay button
  const skipRef        = useRef(null);   // skip button
  const text1bRef      = useRef(null);   // scene 1b "A day for someone special"
  const text2bRef      = useRef(null);   // scene 2b "Because today is all about you."
  const happy83Ref     = useRef(null);   // scene 7 "Happy 8/3"

  useEffect(() => {
    const W = window.innerWidth;

    /* ── initial hidden states ── */
    gsap.set(boyRef.current,  { x: -W * 0.54, scale: 0.38, opacity: 0, transformOrigin: 'bottom center' });
    gsap.set(girlRef.current, { opacity: 0, x: 70 });
    [text1Ref, text1bRef, girlNameRef, text2bRef, text2Ref, text4Ref, forYouRef,
     finalContRef, finalNameRef, finalSubRef, happy83Ref, creditRef, replayRef].forEach(r => {
      if (r.current) gsap.set(r.current, { opacity: 0 });
    });
    gsap.set(darkenRef.current, { opacity: 0 });
    gsap.set(replayRef.current,  { y: 30 });
    gsap.set(skipRef.current,    { opacity: 0.55 });

    /* ── music already started in App.jsx ── */

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    /* ════════════════════════════════════════════
       SCENE 1 – Sunset field zoom (0 – 9 s)
    ════════════════════════════════════════════ */
    tl.addLabel('s1', 0)
      /* cinematic zoom into the field */
      .to(bgRef.current, { scale: 1.22, duration: 9, ease: 'power1.inOut' }, 's1')
      /* text 1 – "March 8th ✿" */
      .fromTo(text1Ref.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 's1+=1.0')
      .to(text1Ref.current, { opacity: 0, y: -24, duration: 1.0, ease: 'power2.in' }, 's1+=3.5')
      /* text 1b – "A day for someone special" (after text1 fully gone) */
      .fromTo(text1bRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }, 's1+=5.0')
      .to(text1bRef.current, { opacity: 0, y: -20, duration: 1, ease: 'power2.in' }, 's1+=7.8')

    /* ════════════════════════════════════════════
       SCENE 2 – Girl appears (9 – 18 s)
    ════════════════════════════════════════════ */
    tl.addLabel('s2', 9)
      .to(bgRef.current, { scale: 1, duration: 2.2, ease: 'power2.inOut' }, 's2')
      /* girl floats in from right */
      .to(girlRef.current, { opacity: 1, x: 0, duration: 1.4, ease: 'back.out(1.6)' }, 's2+=1')
      /* her name */
      .fromTo(girlNameRef.current,
        { opacity: 0, y: 28, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'back.out(1.5)' }, 's2+=2')
      .to(girlNameRef.current, { opacity: 0, duration: 1, ease: 'power2.in' }, 's2+=5.0')
      /* "Because today is all about you." — after name fully gone */
      .fromTo(text2bRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 's2+=6.2')
      .to(text2bRef.current, { opacity: 0, duration: 0.8 }, 's2+=8.0')

    /* ════════════════════════════════════════════
       SCENE 3 – Boy appears in distance (18 – 27 s)
    ════════════════════════════════════════════ */
    tl.addLabel('s3', 18)
      /* wide shot – background zooms out a touch */
      .to(bgRef.current, { scale: 0.96, duration: 2 }, 's3')
      /* boy materialises, tiny and far left */
      .to(boyRef.current, { opacity: 1, duration: 0.9 }, 's3+=0.6')
      /* text 2 */
      .fromTo(text2Ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 's3+=2')
      .to(text2Ref.current, { opacity: 0, duration: 1 }, 's3+=6.2')

    /* ════════════════════════════════════════════
       SCENE 4 – Boy walks toward girl (27 – 38 s)
    ════════════════════════════════════════════ */
    tl.addLabel('s4', 27)

    const WALK = 8.5;
    const reps = Math.round(WALK / 0.3);

    /* boy grows & walks (perspective approach) */
    tl.to(boyRef.current, { x: 0, scale: 1, duration: WALK, ease: 'power1.inOut' }, 's4')
      /* walking bounce */
      .to(boyRef.current, { y: -16, duration: 0.3, repeat: reps, yoyo: true, ease: 'sine.inOut' }, 's4')
      /* leg swing via DOM ids */

    const legL = document.getElementById('boy-leg-left');
    const legR = document.getElementById('boy-leg-right');
    if (legL && legR) {
      tl.to(legL, { rotation: 32, transformOrigin: 'top center', duration: 0.3,
                    repeat: reps, yoyo: true, ease: 'sine.inOut' }, 's4')
        .to(legR, { rotation: -32, transformOrigin: 'top center', duration: 0.3,
                    repeat: reps, yoyo: true, ease: 'sine.inOut' }, 's4+=0.15');
    }

    /* camera parallax follows boy: bg drifts left then re-centers */
    tl.to(bgRef.current, { x: '-3.5%', scale: 1.04, duration: 4.5, ease: 'power1.inOut' }, 's4+=0.5')
      .to(bgRef.current, { x: '0%',    scale: 1,    duration: 3,   ease: 'power1.inOut' }, 's4+=5')

    /* optional mid-walk text */
    tl.fromTo(text4Ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out' }, 's4+=0.8')
      .to(text4Ref.current, { opacity: 0, duration: 1 }, 's4+=5.5')

    /* ════════════════════════════════════════════
       SCENE 5 – Flower giving moment (38 – 47 s)
    ════════════════════════════════════════════ */
    tl.addLabel('s5', 38)
      /* stop bounce carry-over */
      .to(boyRef.current,  { y: 0, duration: 0.4, ease: 'power2.out' }, 's5')
      /* boy kneels */
      .call(() => setBoyPose('kneeling'), null, 's5+=0.3')
      .to(boyRef.current,  { y: 44, duration: 0.65, ease: 'power2.out' }, 's5+=0.3')
      /* girl accepts */
      .call(() => setGirlPose('accepting'), null, 's5+=0.8')
      .to(girlRef.current, { y: 18, duration: 0.7 }, 's5+=0.8')
      /* hearts */
      .call(() => setHearts(true), null, 's5+=1.4')
      /* "For you {girlName}" */
      .fromTo(forYouRef.current,
        { opacity: 0, y: 38, scale: 0.82 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'back.out(1.6)' }, 's5+=2.2')
      .to(forYouRef.current, { opacity: 0, duration: 1.1 }, 's5+=6.5')

    /* ════════════════════════════════════════════
       SCENE 6 – Together, fireworks (47 – 57 s)
    ════════════════════════════════════════════ */
    tl.addLabel('s6', 47)
      /* boy stands with hand extended toward girl */
      .call(() => { setBoyPose('together'); }, null, 's6')
      .to(boyRef.current,  { y: 0, duration: 0.8 }, 's6')
      .to(girlRef.current, { y: 0, duration: 0.8 }, 's6')
      /* girl transitions to together (holding bouquet + holding hand) */
      .call(() => { setGirlPose('together'); }, null, 's6+=0.4')
      /* switch to hearts off, fireworks on */
      .call(() => { setHearts(false); setFireworks(true); }, null, 's6+=0.5')
      /* camera slowly rotates around them: slight parallax oscillation */
      .to(bgRef.current, { x: '3%',  scale: 1.08, duration: 4.5, ease: 'sine.inOut' }, 's6+=0.5')
      .to(bgRef.current, { x: '-2%', scale: 1.06, duration: 3.5, ease: 'sine.inOut' }, 's6+=5')

    /* ════════════════════════════════════════════
       SCENE 7 – Final text (57 – 68 s)
    ════════════════════════════════════════════ */
    tl.addLabel('s7', 57)
      /* background settles */
      .to(bgRef.current, { x: '0%', scale: 1, duration: 2, ease: 'power2.out' }, 's7')
      /* darkening overlay */
      .to(darkenRef.current, { opacity: 1, duration: 2.2 }, 's7')
      /* fireworks stop */
      .call(() => setFireworks(false), null, 's7+=2')
      /* container */
      .to(finalContRef.current, { opacity: 1, duration: 0.6 }, 's7+=2.4')
      /* "Happy 8/3 🌸" */
      .fromTo(happy83Ref.current,
        { opacity: 0, y: 40, scale: 0.84 },
        { opacity: 1, y: 0,  scale: 1, duration: 1.3, ease: 'back.out(1.6)' }, 's7+=2.4')
      /* "{boyName} ❤️ {girlName}" */
      .fromTo(finalNameRef.current,
        { opacity: 0, y: 55, scale: 0.78 },
        { opacity: 1, y: 0,  scale: 1, duration: 1.6, ease: 'back.out(1.5)' }, 's7+=3.8')
      /* "You deserve all the flowers in the world" */
      .fromTo(finalSubRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 's7+=5.6')
      /* credit */
      .fromTo(creditRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }, 's7+=6')
      /* replay button */
      .to(replayRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' }, 's7+=6.5');

    /* hide skip once story ends */
    tl.to(skipRef.current, { opacity: 0, duration: 0.5 }, 's7+=2');

    return () => {
      tl.kill();
      music.stop();
    };
  }, [boyName, girlName]); // eslint-disable-line

  /* ── skip to end ── */
  const handleSkip = () => gsap.globalTimeline.progress(1);
  const handleMute = () => {
    const nowMuted = music.toggle();
    setMuted(nowMuted);
  };
  const handleReset = () => {
    music.stop();
    gsap.to(document.body, { opacity: 0, duration: 0.5, onComplete: () => {
      gsap.set(document.body, { opacity: 1 });
      onReset();
    }});
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black select-none">

      {/* ── Cinematic letterbox ── */}
      <div className="letterbox letterbox-top" />
      <div className="letterbox letterbox-bottom" />

      {/* ── Background ── */}
      <div ref={bgRef} className="absolute inset-0" style={{ transformOrigin: 'center center' }}>
        <SunsetScene />
      </div>

      {/* ── Particles (always rendered, controlled by state) ── */}
      <PetalParticles count={65} />
      {hearts    && <HeartParticles />}
      {fireworks && <Fireworks />}

      {/* ── Vignette + grain ── */}
      <div className="vignette" />
      <div className="grain" />

      {/* ── Characters ── */}
      {/* Girl – right side */}
      <div ref={girlRef} className="absolute char-pos-girl">
        <div className="char-wrap">
          <GirlCharacter pose={girlPose} />
        </div>
      </div>

      {/* Boy – target position, starts far left via GSAP x */}
      <div ref={boyRef} className="absolute char-pos-boy">
        <div className="char-wrap">
          <BoyCharacter pose={boyPose} />
        </div>
      </div>

      {/* ── Scene text overlays ── */}
      {/* Scene 1 – March 8th */}
      <div ref={text1Ref}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-20"
        style={{ top: '30%' }}>
        <CinText>{t.scene1}</CinText>
      </div>

      {/* Scene 1b – A day for someone special */}
      <div ref={text1bRef}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-20"
        style={{ top: '30%' }}>
        <CinText>{t.scene1b}</CinText>
      </div>

      {/* Scene 2 – girl name */}
      <div ref={girlNameRef}
        className="absolute inset-x-0 flex flex-col items-center pointer-events-none z-20"
        style={{ top: '22%' }}>
        <p className="cin-name text-3xl sm:text-5xl md:text-7xl font-bold text-white"
          style={{ fontFamily: "'Playfair Display',serif", fontStyle:'italic' }}>
          {girlName}
        </p>
        <div className="mt-3 h-px w-32 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
      </div>

      {/* Scene 2b – Because today is all about you */}
      <div ref={text2bRef}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-20"
        style={{ top: '42%' }}>
        <CinText>{t.scene2b}</CinText>
      </div>

      {/* Scene 3 */}
      <div ref={text2Ref}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-20"
        style={{ top: '28%' }}>
        <CinText>{t.scene3}</CinText>
      </div>

      {/* Scene 4 mid-walk */}
      <div ref={text4Ref}
        className="absolute inset-x-0 flex justify-center pointer-events-none z-20"
        style={{ bottom: '30%' }}>
        <CinText className="text-lg md:text-2xl opacity-90">
          {t.scene4}
        </CinText>
      </div>

      {/* Scene 5 – Happy Women's Day */}
      <div ref={forYouRef}
        className="absolute inset-x-0 flex flex-col items-center pointer-events-none z-20"
        style={{ top: '20%' }}>
        <p className="cin-text text-xl sm:text-3xl md:text-5xl">
          {t.scene5a}
        </p>
        <p className="cin-name text-2xl sm:text-4xl md:text-6xl font-bold text-rose-300 mt-1"
          style={{ fontFamily: "'Playfair Display',serif" }}>
          {girlName} 🌸"
        </p>
      </div>

      {/* ── Dark overlay for scene 7 ── */}
      <div ref={darkenRef}
        className="absolute inset-0 pointer-events-none z-28"
        style={{ background: 'rgba(0,0,0,0.62)' }} />

      {/* ── Final text (Scene 7) ── */}
      <div ref={finalContRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-40 px-6 text-center"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,0,0,0.28) 0%, transparent 100%)' }}>
        <div className="h-px w-48 mb-8 bg-gradient-to-r from-transparent via-rose-300/60 to-transparent" />
        <p ref={happy83Ref}
          className="font-bold tracking-[0.1em] mb-2"
          style={{
            fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
            fontSize: 'clamp(1.3rem,3.2vw,2.4rem)',
            color: '#ffb8d4',
            textShadow: '0 0 22px rgba(255,130,190,0.85)',
          }}>
          {t.happy83}
        </p>
        <p ref={finalNameRef}
          className="text-white font-bold"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 'clamp(1.3rem,5vw,5rem)',
            textShadow: '0 0 35px rgba(255,210,80,0.98), 0 0 70px rgba(255,150,60,0.55), 0 2px 4px rgba(0,0,0,0.5)',
          }}>
          {boyName}&nbsp;❤️&nbsp;{girlName}
        </p>
        <p ref={finalSubRef}
          className="text-rose-200/85 mt-5 tracking-[0.3em]"
          style={{
            fontFamily: "'Playfair Display',serif", fontStyle:'italic',
            fontSize: 'clamp(0.85rem,2vw,1.9rem)',
            textShadow: '0 0 20px rgba(255,150,180,0.7)',
          }}>
          {t.finalSub}
        </p>
        <div className="h-px w-48 mt-8 bg-gradient-to-r from-transparent via-rose-300/60 to-transparent" />
        <p ref={creditRef}
          className="mt-5 text-sm"
          style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic',
                   color:'rgba(255,182,193,0.5)' }}>
          {t.credit}
        </p>
        <button ref={replayRef}
          onClick={handleReset}
          className="mt-10 px-8 py-3 rounded-full text-white font-semibold pointer-events-auto
                     border border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95
                     transition-all duration-200 tracking-wide backdrop-blur-sm"
          style={{ background:'rgba(255,255,255,0.10)', fontSize:'1rem' }}>
          {t.btnReplay}
        </button>
      </div>

      {/* ── Skip button ── */}
      <button ref={skipRef}
        onClick={handleSkip}
        className="absolute bottom-12 right-6 z-50 text-white/50 text-sm px-4 py-2
                   rounded-full border border-white/15 hover:text-white/80 hover:border-white/35
                   transition-all duration-200 backdrop-blur-sm"
        style={{ background:'rgba(0,0,0,0.25)' }}>
        {t.btnSkip}
      </button>

      {/* ── Language toggle ── */}
      <button
        onClick={toggleLang}
        className="absolute bottom-12 right-24 z-50 text-white/55 text-sm px-4 py-2
                   rounded-full border border-white/15 hover:text-white/85 hover:border-white/35
                   transition-all duration-200 backdrop-blur-sm font-bold tracking-widest"
        style={{ background: 'rgba(0,0,0,0.28)' }}>
        {lang === 'vi' ? '🇬🇧 EN' : '🇻🇳 VI'}
      </button>

      {/* ── Music toggle button ── */}
      <button
        onClick={handleMute}
        title={muted ? t.titleMusicOff : t.titleMusicOn}
        className="absolute bottom-12 left-6 z-50 text-white/55 text-base px-4 py-2
                   rounded-full border border-white/15 hover:text-white/85 hover:border-white/35
                   transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
        style={{ background: 'rgba(0,0,0,0.28)' }}>
        <span style={{ fontSize: '1.1rem' }}>{muted ? '🔇' : '🎵'}</span>
        <span className="text-xs tracking-wide">{muted ? t.musicOff : t.musicOn}</span>
      </button>
    </div>
  );
}
