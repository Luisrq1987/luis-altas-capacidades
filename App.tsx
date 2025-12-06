import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { SubjectSelector } from './components/SubjectSelector';
import { ChallengeView } from './components/ChallengeView';
import { Dashboard } from './components/Dashboard';
import { generateChallenge } from './services/geminiService';
import { Challenge, SubjectArea, UserProfile } from './types';
import { Button } from './components/ui/Button';
import { LayoutDashboard, GraduationCap, Loader2 } from 'lucide-react';

type View = 'hero' | 'select' | 'challenge' | 'dashboard';

const initialProfile: UserProfile = {
  name: "Cadete",
  completedChallenges: 12,
  stats: {
    logic: 75,
    creativity: 88,
    verbal: 60,
    scientific: 45,
    persistence: 90
  },
  badges: ["Pensador", "Innovador"]
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('hero');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => setCurrentView('select');
  
  const handleSelectSubject = async (subject: SubjectArea) => {
    setIsLoading(true);
    setError(null);
    try {
      const challenge = await generateChallenge(subject);
      setActiveChallenge(challenge);
      setCurrentView('challenge');
    } catch (err) {
      setError("Error conectando con la base de datos de misiones. Intenta de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChallengeComplete = () => {
    // Simple mock update of stats
    setUserProfile(prev => ({
        ...prev,
        completedChallenges: prev.completedChallenges + 1,
        stats: {
            ...prev.stats,
            persistence: Math.min(100, prev.stats.persistence + 5),
            logic: Math.min(100, prev.stats.logic + 2)
        }
    }));
    setCurrentView('dashboard');
    setActiveChallenge(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500/30">
        {/* Sticky Nav */}
        <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-3 flex justify-between items-center">
            <div 
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200 cursor-pointer"
                onClick={() => setCurrentView('hero')}
            >
                Neuronauta
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
                 <button 
                    onClick={() => setIsTeacherMode(!isTeacherMode)}
                    className={`p-2 rounded-lg transition-colors ${isTeacherMode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Modo Docente"
                 >
                    <GraduationCap className="w-5 h-5" />
                 </button>
                 <button 
                    onClick={() => setCurrentView('dashboard')}
                    className={`p-2 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    title="Mi Progreso"
                 >
                    <LayoutDashboard className="w-5 h-5" />
                 </button>
            </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto">
            {currentView === 'hero' && <Hero onStart={handleStart} />}
            
            {currentView === 'select' && !isLoading && (
                <SubjectSelector 
                    onSelect={handleSelectSubject} 
                    onBack={() => setCurrentView('hero')}
                />
            )}

            {isLoading && (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
                    <p className="text-xl text-slate-300 animate-pulse">Generando simulación neuronal...</p>
                    <p className="text-sm text-slate-500 mt-2">Nuestra IA está diseñando un reto único para ti.</p>
                </div>
            )}

            {currentView === 'challenge' && activeChallenge && (
                <ChallengeView 
                    challenge={activeChallenge} 
                    isTeacherMode={isTeacherMode}
                    onComplete={handleChallengeComplete}
                    onBack={() => setCurrentView('select')}
                />
            )}

            {currentView === 'dashboard' && (
                <div className="pt-6">
                    <Button variant="ghost" onClick={handleStart} className="mb-4 ml-4 md:ml-8">
                        ← Volver a Misiones
                    </Button>
                    <Dashboard profile={userProfile} />
                </div>
            )}

            {/* Error Toast */}
            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500/90 text-white p-4 rounded-xl shadow-lg max-w-md animate-bounce">
                    <p className="font-bold">Error de Sistema</p>
                    <p className="text-sm">{error}</p>
                    <button onClick={() => setError(null)} className="absolute top-2 right-2 text-xs opacity-70 hover:opacity-100">✕</button>
                </div>
            )}
        </main>
    </div>
  );
};

export default App;