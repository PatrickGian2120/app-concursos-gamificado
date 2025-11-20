// Types para o aplicativo de concursos gamificado

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  badges: Badge[];
  selectedState: string;
  selectedArea: string;
  createdAt: Date;
  lastStudyDate?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  institution?: string;
  year?: number;
}

export interface StudySession {
  id: string;
  userId: string;
  questionsAnswered: number;
  correctAnswers: number;
  xpEarned: number;
  duration: number;
  date: Date;
}

export interface Concurso {
  id: string;
  title: string;
  institution: string;
  state: string;
  area: string;
  salary: string;
  vacancies: number;
  education: string;
  inscriptionStart: Date;
  inscriptionEnd: Date;
  examDate?: Date;
  status: 'open' | 'closed' | 'upcoming';
  editalUrl?: string;
}

export interface GameProgress {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalXP: number;
  currentStreak: number;
  studyTime: number; // em minutos
}

export const BRAZILIAN_STATES = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' },
];

export const STUDY_AREAS = [
  'Direito',
  'Administração',
  'Contabilidade',
  'Tecnologia da Informação',
  'Saúde',
  'Educação',
  'Engenharia',
  'Segurança Pública',
  'Fiscal e Tributária',
  'Judiciário',
];
