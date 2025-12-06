import React from 'react';
import { SubjectArea } from '../types';
import { Button } from './ui/Button';
import { 
  Calculator, 
  Binary, 
  FlaskConical, 
  Feather, 
  Cpu, 
  Palette, 
  HelpCircle,
  ArrowLeft
} from 'lucide-react';

interface SubjectSelectorProps {
  onSelect: (subject: SubjectArea) => void;
  onBack: () => void;
}

const subjects = [
  { id: SubjectArea.LOGIC, icon: Binary, color: 'text-cyan-400', desc: 'Patrones, algoritmos y misterios.' },
  { id: SubjectArea.MATH, icon: Calculator, color: 'text-blue-400', desc: 'Números más allá de lo evidente.' },
  { id: SubjectArea.SCIENCE, icon: FlaskConical, color: 'text-emerald-400', desc: 'Hipótesis y leyes universales.' },
  { id: SubjectArea.LANGUAGE, icon: Feather, color: 'text-pink-400', desc: 'El poder de las palabras.' },
  { id: SubjectArea.STEAM, icon: Cpu, color: 'text-orange-400', desc: 'Ingeniería y arte combinados.' },
  { id: SubjectArea.CREATIVITY, icon: Palette, color: 'text-violet-400', desc: 'Inventa lo imposible.' },
  { id: SubjectArea.SURPRISE, icon: HelpCircle, color: 'text-amber-400', desc: '¡Sorpréndeme!' },
];

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelect, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-white">Elige tu Misión</h2>
          <p className="text-slate-400">Selecciona un área para calibrar los sistemas de la nave.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="glass-panel p-6 rounded-2xl text-left transition-all duration-300 hover:bg-slate-800/80 hover:scale-[1.02] hover:border-emerald-500/50 group"
          >
            <div className={`mb-4 p-3 rounded-xl bg-slate-800 w-fit group-hover:bg-slate-700 transition-colors`}>
              <s.icon className={`w-8 h-8 ${s.color}`} />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">{s.id}</h3>
            <p className="text-sm text-slate-400">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};