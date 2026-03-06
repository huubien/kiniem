/**
 * useRomanticMusic
 * Generates soft romantic background music entirely via Web Audio API.
 * No external files needed.
 *
 * Architecture:
 *  - Piano-like melody  (triangle + 2nd harmonic, ADSR envelope, low-pass filter)
 *  - Ambient pad chords (sine oscillators, very slow attack/release, heavy filter)
 *  - Delay-based reverb
 *  - Master gain with fade-in / fade-out
 *  - Auto-looping scheduler
 */

const NOTE = {
  C3:130.81, D3:146.83, E3:164.81, F3:174.61, G3:196.00, A3:220.00, B3:246.94,
  C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392.00, A4:440.00, B4:493.88,
  C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99, A5:880.00,
};

// ── Romantic waltz melody (80 BPM ≈ 0.75 s/beat) ──────────────────────────
const B = 0.75;
const MELODY = [
  // Phrase 1 – gentle rise
  [NOTE.E4, B*2, .44], [NOTE.G4, B,   .38], [NOTE.C5, B*2, .42],
  [NOTE.B4, B,   .35], [NOTE.A4, B*2, .40], [NOTE.G4, B,   .34],
  [NOTE.E4, B*3, .40],
  // Phrase 2 – development
  [NOTE.D4, B*2, .38], [NOTE.F4, B,   .34], [NOTE.A4, B*2, .40],
  [NOTE.G4, B,   .36], [NOTE.F4, B*2, .34], [NOTE.E4, B,   .30],
  [NOTE.D4, B*3, .38],
  // Phrase 3 – gentle climax
  [NOTE.G4, B*2, .44], [NOTE.A4, B,   .40], [NOTE.C5, B*2, .46],
  [NOTE.D5, B,   .42], [NOTE.E5, B*2, .48], [NOTE.D5, B,   .44],
  [NOTE.C5, B*3, .46],
  // Phrase 4 – resolution
  [NOTE.A4, B*2, .42], [NOTE.G4, B,   .36], [NOTE.E4, B*2, .40],
  [NOTE.D4, B,   .34], [NOTE.C4, B*4, .44],
  // Phrase 5 – gentle coda
  [NOTE.E4, B*2, .38], [NOTE.A4, B*2, .40], [NOTE.G4, B,   .36],
  [NOTE.E4, B,   .32], [NOTE.D4, B,   .30], [NOTE.C4, B*3, .42],
];

// ── Slow pad chord progression (6 s each) ─────────────────────────────────
const PAD_DUR = 6.5;
const CHORDS  = [
  [NOTE.C3, NOTE.E3, NOTE.G3, NOTE.C4],   // C maj
  [NOTE.A3, NOTE.C4, NOTE.E4],            // Am
  [NOTE.F3, NOTE.A3, NOTE.C4],            // F maj
  [NOTE.G3, NOTE.B3, NOTE.D4, NOTE.G4],  // G maj
  [NOTE.A3, NOTE.C4, NOTE.E4],            // Am
  [NOTE.F3, NOTE.A3, NOTE.C4, NOTE.F4],  // F maj
  [NOTE.C3, NOTE.E3, NOTE.G3],            // C maj
  [NOTE.G3, NOTE.D4, NOTE.G4],            // G5/G
];

// ── melody total duration ─────────────────────────────────────────────────
const MELODY_DUR = MELODY.reduce((s, [, d]) => s + d * 0.88, 0);

// ─────────────────────────────────────────────────────────────────────────
function buildGraph(ctx) {
  /* Master */
  const master = ctx.createGain();
  master.gain.value = 0;

  /* Dynamics compressor */
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -24;
  comp.knee.value      = 18;
  comp.ratio.value     = 6;
  comp.attack.value    = 0.004;
  comp.release.value   = 0.3;

  /* Simple delay reverb */
  const delayA = ctx.createDelay(3);
  const delayB = ctx.createDelay(2);
  const fbA    = ctx.createGain();
  const fbB    = ctx.createGain();
  const wet    = ctx.createGain();
  delayA.delayTime.value = 0.14;
  delayB.delayTime.value = 0.31;
  fbA.gain.value = 0.26;
  fbB.gain.value = 0.20;
  wet.gain.value = 0.38;

  delayA.connect(fbA); fbA.connect(delayA); delayA.connect(wet);
  delayB.connect(fbB); fbB.connect(delayB); delayB.connect(wet);

  /* chain: master → dry comp + wet reverb → destination */
  master.connect(comp);
  master.connect(delayA);
  master.connect(delayB);
  wet.connect(comp);
  comp.connect(ctx.destination);

  return master;
}

function playNote(ctx, master, freq, start, duration, vel = 0.35) {
  const osc1   = ctx.createOscillator();
  const osc2   = ctx.createOscillator(); // soft 2nd harmonic
  const filt   = ctx.createBiquadFilter();
  const env    = ctx.createGain();
  const harm   = ctx.createGain();

  osc1.type = 'triangle';
  osc1.frequency.value = freq;
  osc2.type = 'sine';
  osc2.frequency.value = freq * 2.001;
  harm.gain.value = 0.12;

  filt.type = 'lowpass';
  filt.frequency.value = 2200;
  filt.Q.value = 0.35;

  const atk = start + 0.018;
  const dec = atk   + 0.22;
  const rel = start + duration;

  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(vel, atk);
  env.gain.linearRampToValueAtTime(vel * 0.62, dec);
  env.gain.setValueAtTime(vel * 0.62, rel - 0.25);
  env.gain.linearRampToValueAtTime(0, rel + 0.05);

  osc1.connect(filt);
  osc2.connect(harm); harm.connect(filt);
  filt.connect(env);
  env.connect(master);

  osc1.start(start); osc1.stop(rel + 0.15);
  osc2.start(start); osc2.stop(rel + 0.15);
}

function playPad(ctx, master, freqs, start, duration, vol = 0.055) {
  freqs.forEach((f, i) => {
    const osc  = ctx.createOscillator();
    const filt = ctx.createBiquadFilter();
    const env  = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = f * (1 + (i % 3 - 1) * 0.0015); // micro-detune

    filt.type = 'lowpass';
    filt.frequency.value = 420;
    filt.Q.value = 0.4;

    const rise = 2.2, fall = 2.0;
    env.gain.setValueAtTime(0, start);
    env.gain.linearRampToValueAtTime(vol, start + rise);
    env.gain.setValueAtTime(vol, start + duration - fall);
    env.gain.linearRampToValueAtTime(0, start + duration);

    osc.connect(filt); filt.connect(env); env.connect(master);
    osc.start(start); osc.stop(start + duration + 0.1);
  });
}

/* Schedule one full loop of melody + pads, return absolute end time */
function schedule(ctx, master, startAt) {
  let t = startAt + 0.05;

  // Melody
  MELODY.forEach(([freq, dur, vel]) => {
    playNote(ctx, master, freq, t, dur * 0.87, vel * 0.32);
    t += dur * 0.88;
  });

  // Pads (run alongside melody from startAt)
  let pt = startAt;
  CHORDS.forEach(chord => {
    playPad(ctx, master, chord, pt, PAD_DUR, 0.052);
    pt += PAD_DUR;
  });

  return t; // when melody ends
}

// ─────────────────────────────────────────────────────────────────────────
import { useRef, useEffect, useCallback } from 'react';

export function useRomanticMusic() {
  const audioRef  = useRef(null);
  const fadeRef   = useRef(null);
  const mutedRef  = useRef(false);

  const ensureAudio = () => {
    if (!audioRef.current) {
      const a = new Audio(import.meta.env.BASE_URL + 'music/bgm.mp3');
      a.loop   = true;
      a.volume = 0;
      audioRef.current = a;
    }
    return audioRef.current;
  };

  /* Smooth fade helper — ramps volume toward `target` over `ms` milliseconds */
  const fadeTo = (target, ms = 2000) => {
    const a = audioRef.current;
    if (!a) return;
    clearInterval(fadeRef.current);
    const steps  = 40;
    const delay  = ms / steps;
    const start  = a.volume;
    const delta  = (target - start) / steps;
    let   i      = 0;
    fadeRef.current = setInterval(() => {
      i++;
      a.volume = Math.min(1, Math.max(0, start + delta * i));
      if (i >= steps) {
        a.volume = target;
        clearInterval(fadeRef.current);
        if (target === 0) a.pause();
      }
    }, delay);
  };

  const start = useCallback(() => {
    try {
      const a = ensureAudio();
      mutedRef.current = false;
      a.currentTime = 0;
      a.volume = 0;
      a.play().catch(() => {});
      fadeTo(0.72, 3000);
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    fadeTo(0, 1500);
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    mutedRef.current = !mutedRef.current;
    fadeTo(mutedRef.current ? 0 : 0.72, 600);
    if (!mutedRef.current) audioRef.current.play().catch(() => {});
    return mutedRef.current;
  }, []);

  /* cleanup on unmount */
  useEffect(() => {
    return () => {
      clearInterval(fadeRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { start, stop, toggle };
}
