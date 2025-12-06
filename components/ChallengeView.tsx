import React, { useState } from 'react';
import { Challenge, DifficultyLevel } from '../types';
import { Button } from './ui/Button';
import { ChevronRight, Lightbulb, Save, CheckCircle2, BookOpen } from 'lucide-react';

interface ChallengeViewProps {
  challenge: Challenge;
  isTeacherMode: boolean;
  onComplete: () => void;
  onBack: () => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({ challenge, isTeacherMode, onComplete, onBack }) => {
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel>(DifficultyLevel.LEVEL_1);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentLevelData = challenge.levels[activeLevel];

  const handleNextLevel = () => {
    if (!completedLevels.includes(activeLevel)) {
        setCompletedLevels([...completedLevels, activeLevel]);
    }
    setAnswer('');
    setShowHint(false);
    setShowFeedback(false);

    if (activeLevel === DifficultyLevel.LEVEL_1) setActiveLevel(DifficultyLevel.LEVEL_2);
    else if (activeLevel === DifficultyLevel.LEVEL_2) setActiveLevel(DifficultyLevel.LEVEL_3);
    else {
        // All done
        onComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20">
      {/* Header Narrative */}
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white">{challenge.title}</h2>
             <Button variant="ghost" onClick={onBack} size="sm">Salir</Button>
        </div>
        <p className="text-lg text-emerald-100 italic font-medium">"{challenge.narrative}"</p>
        <div className="mt-4 flex flex-wrap gap-2">
            {challenge.skills.map(skill => (
                <span key={skill} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                    {skill}
                </span>
            ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {Object.values(DifficultyLevel).map((level) => (
            <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                    activeLevel === level 
                    ? 'bg-emerald-500 text-white' 
                    : completedLevels.includes(level) 
                        ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
            >
                {completedLevels.includes(level) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                {level}
            </button>
        ))}
      </div>

      {/* Main Challenge Area */}
      <div className="glass-panel p-8 rounded-3xl min-h-[400px] flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl font-black">{activeLevel === DifficultyLevel.LEVEL_1 ? '01' : activeLevel === DifficultyLevel.LEVEL_2 ? '02' : '03'}</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">{currentLevelData.title}</h3>
        <p className="text-slate-300 text-lg mb-6 leading-relaxed">{currentLevelData.description}</p>
        
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 mb-6">
            <p className="font-semibold text-emerald-400 mb-2">Misión:</p>
            <p className="text-white">{currentLevelData.question}</p>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex flex-col space-y-4">
            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escribe tu solución, hipótesis o idea aquí..."
                className="w-full h-32 bg-slate-800 text-white p-4 rounded-xl border border-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none transition-all"
            />
            
            <div className="flex justify-between items-center">
                 <button 
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                 >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    {showHint ? 'Ocultar Pista' : 'Necesito una pista'}
                 </button>

                 <Button onClick={handleNextLevel} disabled={answer.length < 5} variant="primary">
                    {activeLevel === DifficultyLevel.LEVEL_3 ? 'Completar Misión' : 'Siguiente Nivel'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                 </Button>
            </div>

            {showHint && currentLevelData.hint && (
                <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg text-yellow-200 text-sm animate-fade-in">
                    💡 Pista: {currentLevelData.hint}
                </div>
            )}
        </div>
      </div>

      {/* Extra Challenge (Only visible on Level 3 or if configured) */}
      {activeLevel === DifficultyLevel.LEVEL_3 && (
         <div className="glass-panel p-6 rounded-2xl border border-violet-500/30">
            <h4 className="text-lg font-bold text-violet-300 mb-2">🚀 Bonus: Desafío Creativo</h4>
            <p className="text-slate-300">{challenge.extraChallenge}</p>
         </div>
      )}

      {/* Teacher Mode Panel */}
      {isTeacherMode && (
          <div className="bg-slate-800 border-2 border-dashed border-indigo-500/50 p-6 rounded-2xl relative">
            <div className="absolute -top-3 left-6 bg-indigo-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                Modo Docente
            </div>
            <div className="flex items-start gap-4 mt-2">
                <BookOpen className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                <div className="text-sm text-slate-300">
                    <p className="font-bold text-white mb-2">Notas Pedagógicas:</p>
                    <p>{challenge.teacherNotes}</p>
                    <div className="mt-4">
                        <p className="font-bold text-white mb-1">Preguntas Metacognitivas Sugeridas:</p>
                        <ul className="list-disc list-inside space-y-1">
                            {challenge.metacognitiveQuestions.map((q, i) => (
                                <li key={i}>{q}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
          </div>
      )}
    </div>
  );
};