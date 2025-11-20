'use client';

import { Flame } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  longestStreak: number;
  compact?: boolean;
}

export default function StreakCounter({ streak, longestStreak, compact = false }: StreakCounterProps) {
  const getStreakColor = (days: number) => {
    if (days >= 30) return 'from-orange-500 to-red-600';
    if (days >= 7) return 'from-yellow-500 to-orange-500';
    if (days >= 3) return 'from-blue-500 to-purple-500';
    return 'from-gray-400 to-gray-600';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 rounded-lg border border-orange-500/20">
        <Flame className="w-5 h-5 text-orange-500" />
        <span className="font-bold text-orange-600 dark:text-orange-400">{streak}</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Sequência de Estudos
        </h3>
        <Flame className="w-6 h-6 text-orange-500" />
      </div>

      <div className="flex items-center justify-center mb-4">
        <div
          className={`flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getStreakColor(
            streak
          )} shadow-2xl`}
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{streak}</p>
            <p className="text-xs text-white/80">dias</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Sequência atual</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {streak} {streak === 1 ? 'dia' : 'dias'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Melhor sequência</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {longestStreak} {longestStreak === 1 ? 'dia' : 'dias'}
          </span>
        </div>
      </div>

      {streak >= 3 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 rounded-lg border border-orange-500/20">
          <p className="text-xs text-center text-orange-700 dark:text-orange-300 font-medium">
            {streak >= 30
              ? '🔥 Você está em chamas! Continue assim!'
              : streak >= 7
              ? '⚡ Incrível! Mantenha o ritmo!'
              : '💪 Ótimo começo! Continue estudando!'}
          </p>
        </div>
      )}
    </div>
  );
}
