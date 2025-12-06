export enum SubjectArea {
  LOGIC = 'Lógica y Computacional',
  MATH = 'Matemáticas Avanzadas',
  SCIENCE = 'Ciencias y Experimentos',
  LANGUAGE = 'Lengua y Retórica',
  STEAM = 'Retos STEAM',
  CREATIVITY = 'Creatividad e Innovación',
  SURPRISE = 'Exploración Libre'
}

export enum DifficultyLevel {
  LEVEL_1 = 'Exploración Inicial',
  LEVEL_2 = 'Enriquecimiento',
  LEVEL_3 = 'Reto Profundo (HOTS)'
}

export interface ChallengeLevel {
  title: string;
  description: string;
  question: string;
  hint?: string;
}

export interface Challenge {
  id: string;
  subject: SubjectArea;
  title: string;
  narrative: string;
  description: string;
  skills: string[];
  levels: {
    [key in DifficultyLevel]: ChallengeLevel;
  };
  extraChallenge: string;
  metacognitiveQuestions: string[];
  teacherNotes: string; // Pedagogical suggestions
}

export interface UserStats {
  logic: number;
  creativity: number;
  verbal: number;
  scientific: number;
  persistence: number;
}

export interface UserProfile {
  name: string;
  completedChallenges: number;
  stats: UserStats;
  badges: string[];
}
