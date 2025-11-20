'use client';

import { useState, useEffect } from 'react';
import { User, GameProgress } from '@/lib/types';
import { calculateLevel, calculateXPForNextLevel } from '@/lib/game-logic';

const STORAGE_KEY = 'concursos-app-user';

const DEFAULT_USER: User = {
  id: '1',
  name: 'Estudante',
  email: 'estudante@exemplo.com',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  longestStreak: 0,
  badges: [],
  selectedState: '',
  selectedArea: '',
  createdAt: new Date(),
};

export const useGameProgress = () => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastStudyDate: parsed.lastStudyDate ? new Date(parsed.lastStudyDate) : undefined,
        });
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    setLoading(false);
  }, []);

  // Salvar dados no localStorage
  const saveUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  // Adicionar XP
  const addXP = (amount: number) => {
    const newXP = user.xp + amount;
    const newLevel = calculateLevel(newXP);
    const xpToNextLevel = calculateXPForNextLevel(newLevel);

    saveUser({
      ...user,
      xp: newXP,
      level: newLevel,
      xpToNextLevel,
      lastStudyDate: new Date(),
    });

    return { leveledUp: newLevel > user.level, newLevel };
  };

  // Atualizar streak
  const updateStreak = () => {
    const today = new Date();
    const lastStudy = user.lastStudyDate ? new Date(user.lastStudyDate) : null;

    if (!lastStudy) {
      // Primeiro estudo
      saveUser({
        ...user,
        streak: 1,
        longestStreak: Math.max(1, user.longestStreak),
        lastStudyDate: today,
      });
      return;
    }

    // Zera horas para comparar apenas datas
    today.setHours(0, 0, 0, 0);
    lastStudy.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - lastStudy.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = user.streak;

    if (diffDays === 0) {
      // Já estudou hoje
      return;
    } else if (diffDays === 1) {
      // Estudou ontem, incrementa streak
      newStreak = user.streak + 1;
    } else {
      // Quebrou o streak
      newStreak = 1;
    }

    saveUser({
      ...user,
      streak: newStreak,
      longestStreak: Math.max(newStreak, user.longestStreak),
      lastStudyDate: today,
    });
  };

  // Adicionar badge
  const addBadge = (badge: User['badges'][0]) => {
    if (user.badges.some((b) => b.id === badge.id)) {
      return false; // Badge já desbloqueado
    }

    saveUser({
      ...user,
      badges: [...user.badges, { ...badge, unlockedAt: new Date() }],
    });

    return true;
  };

  // Atualizar seleção de estado/área
  const updateSelection = (state: string, area: string) => {
    saveUser({
      ...user,
      selectedState: state,
      selectedArea: area,
    });
  };

  // Resetar progresso (para testes)
  const resetProgress = () => {
    saveUser(DEFAULT_USER);
  };

  return {
    user,
    loading,
    addXP,
    updateStreak,
    addBadge,
    updateSelection,
    resetProgress,
  };
};
