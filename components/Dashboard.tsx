import React from 'react';
import { UserProfile } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Trophy, Star, TrendingUp, User } from 'lucide-react';

interface DashboardProps {
    profile: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
    
  const data = [
    { subject: 'Lógica', A: profile.stats.logic, fullMark: 100 },
    { subject: 'Creatividad', A: profile.stats.creativity, fullMark: 100 },
    { subject: 'Verbal', A: profile.stats.verbal, fullMark: 100 },
    { subject: 'Ciencia', A: profile.stats.scientific, fullMark: 100 },
    { subject: 'Persistencia', A: profile.stats.persistence, fullMark: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <User className="mr-3 w-8 h-8 text-emerald-400" />
            Perfil de Neuronauta: {profile.name}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Card */}
            <div className="glass-panel p-6 rounded-2xl lg:col-span-2">
                <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                    Radar de Habilidades
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid stroke="#475569" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Habilidades"
                            dataKey="A"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="#10b981"
                            fillOpacity={0.3}
                        />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Achievements Card */}
            <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-amber-400" />
                        Progreso General
                    </h3>
                    <div className="text-center py-6">
                        <span className="text-5xl font-bold text-white">{profile.completedChallenges}</span>
                        <p className="text-slate-400 mt-2">Misiones Completadas</p>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-purple-400" />
                        Insignias
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        {profile.badges.map((badge, idx) => (
                             <div key={idx} className="flex flex-col items-center justify-center p-2 bg-slate-800/50 rounded-lg border border-slate-700">
                                <span className="text-2xl mb-1">🏅</span>
                                <span className="text-[10px] text-center text-slate-300 leading-tight">{badge}</span>
                             </div>
                        ))}
                        {/* Placeholder for empty badges */}
                        {Array.from({length: Math.max(0, 6 - profile.badges.length)}).map((_, i) => (
                             <div key={`empty-${i}`} className="flex flex-col items-center justify-center p-2 bg-slate-900/30 rounded-lg border border-slate-800 border-dashed">
                                <div className="w-6 h-6 rounded-full bg-slate-800" />
                             </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};