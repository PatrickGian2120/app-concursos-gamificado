'use client';

import { Badge } from '@/lib/types';
import { getBadgeColor } from '@/lib/game-logic';
import { Lock } from 'lucide-react';

interface BadgeDisplayProps {
  badges: Badge[];
  allBadges: Badge[];
  compact?: boolean;
}

export default function BadgeDisplay({ badges, allBadges, compact = false }: BadgeDisplayProps) {
  const unlockedIds = new Set(badges.map((b) => b.id));

  const getRarityLabel = (rarity: Badge['rarity']) => {
    const labels = {
      common: 'Comum',
      rare: 'Raro',
      epic: 'Épico',
      legendary: 'Lendário',
    };
    return labels[rarity];
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {badges.slice(0, 5).map((badge) => (
          <div
            key={badge.id}
            className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${getBadgeColor(
              badge.rarity
            )} shadow-lg text-xl`}
            title={badge.name}
          >
            {badge.icon}
          </div>
        ))}
        {badges.length > 5 && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400">
            +{badges.length - 5}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Conquistas</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {badges.length} / {allBadges.length}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {allBadges.map((badge) => {
          const isUnlocked = unlockedIds.has(badge.id);

          return (
            <div
              key={badge.id}
              className={`relative group cursor-pointer transition-all duration-300 ${
                isUnlocked ? 'scale-100 hover:scale-110' : 'scale-95 opacity-50'
              }`}
            >
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-2xl ${
                  isUnlocked
                    ? `bg-gradient-to-br ${getBadgeColor(badge.rarity)} shadow-xl`
                    : 'bg-gray-200 dark:bg-gray-700'
                } transition-all duration-300`}
              >
                {isUnlocked ? (
                  <span className="text-3xl">{badge.icon}</span>
                ) : (
                  <Lock className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg p-3 shadow-xl min-w-[200px] border border-gray-700">
                  <p className="font-semibold mb-1">{badge.name}</p>
                  <p className="text-gray-300 mb-2">{badge.description}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      isUnlocked
                        ? `bg-gradient-to-r ${getBadgeColor(badge.rarity)}`
                        : 'bg-gray-700'
                    }`}
                  >
                    {getRarityLabel(badge.rarity)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {badges.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Complete desafios para desbloquear conquistas!
          </p>
        </div>
      )}
    </div>
  );
}
