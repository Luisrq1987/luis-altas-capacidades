import React from 'react';
import { Button } from './ui/Button';
import { Rocket, Brain, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 glass-panel p-12 rounded-3xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl animate-float">
            <Brain className="w-16 h-16 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400 drop-shadow-sm">
          Neuronauta
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 font-light">
          Misión: Transformar tu inteligencia en un <span className="text-amber-400 font-semibold">Superpoder</span>.
        </p>

        <p className="text-slate-400 max-w-2xl mx-auto">
          Bienvenido al centro de mando. Aquí encontrarás desafíos que pondrán a prueba tu creatividad, 
          lógica y capacidad de invención. ¿Estás listo para despegar?
        </p>

        <div className="pt-8">
          <Button onClick={onStart} size="lg" variant="accent" className="group">
            <Rocket className="mr-2 w-6 h-6 group-hover:animate-bounce" />
            Comenzar la Aventura
          </Button>
        </div>
      </div>
    </div>
  );
};