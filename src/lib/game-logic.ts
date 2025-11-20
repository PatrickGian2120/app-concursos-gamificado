import { Badge, Question } from './types';

// Sistema de níveis e XP
export const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const calculateXPForNextLevel = (level: number): number => {
  return Math.pow(level, 2) * 100;
};

export const calculateXPProgress = (currentXP: number, level: number): number => {
  const currentLevelXP = calculateXPForNextLevel(level - 1);
  const nextLevelXP = calculateXPForNextLevel(level);
  const progress = ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return Math.max(0, Math.min(100, progress));
};

// Sistema de badges
export const ALL_BADGES: Badge[] = [
  {
    id: 'first-question',
    name: 'Primeira Questão',
    description: 'Respondeu sua primeira questão',
    icon: '🎯',
    rarity: 'common',
  },
  {
    id: 'streak-3',
    name: 'Consistência',
    description: 'Estudou por 3 dias seguidos',
    icon: '🔥',
    rarity: 'common',
  },
  {
    id: 'streak-7',
    name: 'Dedicação',
    description: 'Estudou por 7 dias seguidos',
    icon: '⚡',
    rarity: 'rare',
  },
  {
    id: 'streak-30',
    name: 'Imparável',
    description: 'Estudou por 30 dias seguidos',
    icon: '💎',
    rarity: 'epic',
  },
  {
    id: 'level-5',
    name: 'Iniciante',
    description: 'Alcançou o nível 5',
    icon: '🌱',
    rarity: 'common',
  },
  {
    id: 'level-10',
    name: 'Estudante',
    description: 'Alcançou o nível 10',
    icon: '📚',
    rarity: 'rare',
  },
  {
    id: 'level-25',
    name: 'Expert',
    description: 'Alcançou o nível 25',
    icon: '🎓',
    rarity: 'epic',
  },
  {
    id: 'level-50',
    name: 'Mestre',
    description: 'Alcançou o nível 50',
    icon: '👑',
    rarity: 'legendary',
  },
  {
    id: 'accuracy-90',
    name: 'Precisão',
    description: 'Acertou 90% das questões',
    icon: '🎯',
    rarity: 'rare',
  },
  {
    id: 'questions-100',
    name: 'Centurião',
    description: 'Respondeu 100 questões',
    icon: '💯',
    rarity: 'rare',
  },
  {
    id: 'questions-500',
    name: 'Guerreiro',
    description: 'Respondeu 500 questões',
    icon: '⚔️',
    rarity: 'epic',
  },
  {
    id: 'questions-1000',
    name: 'Lenda',
    description: 'Respondeu 1000 questões',
    icon: '🏆',
    rarity: 'legendary',
  },
];

export const checkBadgeUnlock = (
  badgeId: string,
  userStats: {
    level: number;
    streak: number;
    totalQuestions: number;
    accuracy: number;
  }
): boolean => {
  switch (badgeId) {
    case 'first-question':
      return userStats.totalQuestions >= 1;
    case 'streak-3':
      return userStats.streak >= 3;
    case 'streak-7':
      return userStats.streak >= 7;
    case 'streak-30':
      return userStats.streak >= 30;
    case 'level-5':
      return userStats.level >= 5;
    case 'level-10':
      return userStats.level >= 10;
    case 'level-25':
      return userStats.level >= 25;
    case 'level-50':
      return userStats.level >= 50;
    case 'accuracy-90':
      return userStats.accuracy >= 90;
    case 'questions-100':
      return userStats.totalQuestions >= 100;
    case 'questions-500':
      return userStats.totalQuestions >= 500;
    case 'questions-1000':
      return userStats.totalQuestions >= 1000;
    default:
      return false;
  }
};

// Recompensas por dificuldade
export const getXPReward = (difficulty: Question['difficulty'], correct: boolean): number => {
  if (!correct) return 0;
  
  const baseXP = {
    easy: 10,
    medium: 25,
    hard: 50,
  };
  
  return baseXP[difficulty];
};

// Sistema de streak
export const calculateStreak = (lastStudyDate?: Date): number => {
  if (!lastStudyDate) return 0;
  
  const today = new Date();
  const lastStudy = new Date(lastStudyDate);
  
  // Zera horas para comparar apenas datas
  today.setHours(0, 0, 0, 0);
  lastStudy.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - lastStudy.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Se estudou hoje ou ontem, mantém streak
  return diffDays <= 1 ? 1 : 0;
};

// Cores por raridade
export const getBadgeColor = (rarity: Badge['rarity']): string => {
  const colors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-600',
  };
  return colors[rarity];
};
