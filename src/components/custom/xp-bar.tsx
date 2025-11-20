'use client';

import { User } from '@/lib/types';
import { calculateXPProgress } from '@/lib/game-logic';

interface XPBarProps {
  user: User;
  showDetails?: boolean;
}

export default function XPBar({ user, showDetails = true }: XPBarProps) {
  const progress = calculateXPProgress(user.xp, user.level);
  const xpInCurrentLevel = user.xp - (user.level - 1) * (user.level - 1) * 100;
  const xpNeededForNextLevel = user.level * user.level * 100 - (user.level - 1) * (user.level - 1) * 100;

  return (
    <div className="w-full">
      {showDetails && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold text-sm shadow-lg">
              {user.level}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Nível {user.level}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {xpInCurrentLevel} / {xpNeededForNextLevel} XP
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {user.xp.toLocaleString()} XP
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
          </div>
        </div>
      )}

      <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>

      {showDetails && (
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
          {Math.round(progress)}% para o próximo nível
        </p>
      )}
    </div>
  );
}
