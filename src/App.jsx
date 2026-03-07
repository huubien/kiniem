import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoveStory   from './components/LoveStory';
import { useRomanticMusic } from './hooks/useRomanticMusic';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [names, setNames] = useState({ boy: '', girl: '' });
  const music = useRomanticMusic();

  const start = (boy, girl) => { setNames({ boy, girl }); setPhase('story'); };
  const reset = ()           => { setPhase('landing'); setNames({ boy: '', girl: '' }); };

  return (
    <LanguageProvider>
      <div className="w-full h-screen overflow-hidden bg-black">
        {phase === 'landing' && <LandingPage onStart={start} music={music} />}
        {phase === 'story'   && <LoveStory boyName={names.boy} girlName={names.girl} onReset={reset} music={music} />}
      </div>
    </LanguageProvider>
  );
}
