import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';

const STARS = Array.from({ length: 65 }, (_, i) => ({
  x:  ((i * 137.5 * 13.7) % 98) + 1,
  y:  ((i * 97.3  * 7.1)  % 65) + 1,
  sz: i % 6 === 0 ? 2.8 : 1.3,
  d:  `${((i * 0.7) % 3) + 1.5}s`,
}));

export default function LandingPage({ onStart, music }) {
  const { lang, t, toggle: toggleLang } = useLanguage();
  const [boy,   setBoy]   = useState('');
  const [girl,  setGirl]  = useState('');
  const [muted, setMuted] = useState(false);
  const handleMute = () => { const m = music?.toggle(); setMuted(!!m); };

  const [going, setGoing] = useState(false);

  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const formRef  = useRef(null);
  const btnRef   = useRef(null);
  const musicStarted = useRef(false);

  /* Start music on first user interaction (bypasses browser autoplay policy) */
  const triggerMusic = () => {
    if (!musicStarted.current) {
      musicStarted.current = true;
      music?.start();
    }
  };

  useEffect(() => {
    gsap.set([cardRef.current, titleRef.current, formRef.current], { opacity: 0, y: 50 });
    const tl = gsap.timeline();
    tl.to(cardRef.current,  { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(formRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');

    gsap.to(cardRef.current, { y: -10, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!boy.trim() || !girl.trim() || going) return;
    triggerMusic(); // ensure music starts on button press (iOS fallback)
    setGoing(true);
    gsap.timeline()
      .to(btnRef.current, { scale: 0.92, duration: 0.1 })
      .to(btnRef.current, { scale: 1.05, duration: 0.12 })
      .to(wrapRef.current, { opacity: 0, duration: 0.7, ease: 'power2.in',
          onComplete: () => onStart(boy.trim(), girl.trim()) });
  };

  const valid = boy.trim() && girl.trim();

  return (
    <div ref={wrapRef}
      onClick={triggerMusic}
      onKeyDown={triggerMusic}
      onTouchStart={triggerMusic}
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 100%, #3a0a5e 0%, #1a0530 40%, #05001a 100%)' }}>

      {/* Stars */}
      {STARS.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.sz, height: s.sz,
            animation: `twinkle ${s.d} ease-in-out ${i * 0.1}s infinite`,
          }} />
      ))}

      {/* Ambient glow orbs */}
      <div className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,80,255,0.12) 0%, transparent 70%)', top: '10%', left: '5%' }} />
      <div className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,100,150,0.10) 0%, transparent 70%)', bottom: '15%', right: '8%' }} />

      {/* Floating hearts */}
      {['4%','8%','28%','60%','75%','18%'].map((top, i) => (
        <div key={i} className="absolute pointer-events-none text-rose-400/20 text-2xl"
          style={{ top, left: i % 2 === 0 ? `${3 + i * 3}%` : undefined,
                   right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined,
                   animation: `float ${3.5 + i * 0.3}s ease-in-out ${i * 0.5}s infinite` }}>
          ♡
        </div>
      ))}

      {/* Card */}
      <div ref={cardRef} className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>

          {/* Pink top glow */}
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,150,200,0.6), transparent)' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,100,200,0.12) 0%, transparent 60%)' }} />

          {/* Title */}
          <div ref={titleRef} className="text-center mb-8 relative">
            <div className="text-5xl mb-3" style={{ animation: 'pulseSoft 3s ease-in-out infinite',
              filter: 'drop-shadow(0 0 16px rgba(255,120,200,0.8))' }}>🌸</div>
            <h1 className="cin-text text-3xl md:text-4xl font-bold !not-italic">
              {t.title}
            </h1>
            <p className="text-rose-200/60 text-sm mt-2 tracking-widest">
              {t.subtitle}
            </p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={submit} className="space-y-5">
            {[
              { label: t.labelBoy,  val: boy,  set: setBoy,  ph: t.placeholderBoy  },
              { label: t.labelGirl, val: girl, set: setGirl, ph: t.placeholderGirl },
            ].map(({ label, val, set, ph }) => (
              <div key={label}>
                <label className="block text-rose-200/80 text-xs font-bold mb-2 uppercase tracking-widest">{label}</label>
                <input type="text" value={val} onChange={e => set(e.target.value)}
                  placeholder={ph} maxLength={25}
                  className="w-full px-5 py-3.5 rounded-2xl text-white placeholder-white/25 text-base
                             outline-none transition-all duration-300 border border-white/15
                             focus:border-rose-400/70 focus:ring-2 focus:ring-rose-400/25"
                  style={{ background: 'rgba(255,255,255,0.07)' }} />
              </div>
            ))}

            <button ref={btnRef} type="submit" disabled={!valid || going}
              className="w-full py-4 mt-1 rounded-2xl text-white font-bold text-lg tracking-wide
                         shadow-lg transition-all duration-200
                         disabled:opacity-35 disabled:cursor-not-allowed
                         hover:brightness-110 hover:shadow-rose-500/30 active:scale-95"
              style={{ background: valid ? 'linear-gradient(135deg,#e91e63,#ff5722,#e91e63)' : 'rgba(255,255,255,0.12)',
                       backgroundSize: '200% auto', animation: valid ? 'shimmer 3s linear infinite' : 'none' }}>
              {going ? t.btnCreating : t.btnCreate}
            </button>
          </form>

          {/* Credit */}
          <p className="text-center mt-6 text-xs"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
                     color: 'rgba(255,182,193,0.55)' }}>
            {t.credit}
          </p>
        </div>
      </div>

      {/* ── Bottom bar: Music + Language ── */}
      <div className="absolute bottom-4 inset-x-0 flex justify-between items-center px-4 z-50">
        <button onClick={handleMute}
          className="text-white/50 text-sm px-3 py-2
                     rounded-full border border-white/15 hover:text-white/80
                     transition-all duration-200 backdrop-blur-sm flex items-center gap-1.5"
          style={{ background: 'rgba(0,0,0,0.28)' }}>
          <span>{muted ? '🔇' : '🎵'}</span>
          <span className="text-xs">{muted ? t.musicOff : t.musicOn}</span>
        </button>

        <button onClick={toggleLang}
          className="text-white/60 text-sm px-3 py-2
                     rounded-full border border-white/15 hover:text-white/90
                     transition-all duration-200 backdrop-blur-sm font-bold tracking-widest"
          style={{ background: 'rgba(0,0,0,0.28)' }}>
          {lang === 'vi' ? '🇬🇧 EN' : '🇻🇳 VI'}
        </button>
      </div>

    </div>
  );
}
