'use client';

import { useGameProgress } from '@/hooks/useGameProgress';
import { ALL_BADGES, getBadgeColor } from '@/lib/game-logic';
import Navbar from '@/components/custom/navbar';
import XPBar from '@/components/custom/xp-bar';
import BadgeDisplay from '@/components/custom/badge-display';
import StreakCounter from '@/components/custom/streak-counter';
import {
  User as UserIcon,
  Mail,
  MapPin,
  BookOpen,
  Trophy,
  Zap,
  Target,
  Calendar,
  Settings,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, loading, resetProgress } = useGameProgress();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Carregando...</div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Nível',
      value: user.level.toString(),
      icon: Trophy,
      color: 'from-yellow-400 to-orange-600',
    },
    {
      label: 'XP Total',
      value: user.xp.toLocaleString(),
      icon: Zap,
      color: 'from-purple-400 to-pink-600',
    },
    {
      label: 'Sequência',
      value: `${user.streak} dias`,
      icon: Target,
      color: 'from-orange-400 to-red-600',
    },
    {
      label: 'Conquistas',
      value: user.badges.length.toString(),
      icon: Trophy,
      color: 'from-blue-400 to-purple-600',
    },
  ];

  const memberSince = new Date(user.createdAt).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 sm:pb-8 sm:pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header com Avatar */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-2xl">
              <UserIcon className="w-12 h-12 text-gray-600" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-white/90 mb-4">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {user.selectedState || 'Estado não selecionado'}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {user.selectedArea || 'Área não selecionada'}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Membro desde {memberSince}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm('Tem certeza que deseja resetar seu progresso?')) {
                  resetProgress();
                  window.location.href = '/onboarding';
                }
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Settings className="w-4 h-4" />
              Resetar Progresso
            </button>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <XPBar user={user} showDetails={true} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 shadow-lg`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Streak */}
        <div className="mb-8">
          <StreakCounter
            streak={user.streak}
            longestStreak={user.longestStreak}
            compact={false}
          />
        </div>

        {/* Badges */}
        <BadgeDisplay badges={user.badges} allBadges={ALL_BADGES} compact={false} />

        {/* Estatísticas Detalhadas */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Estatísticas Detalhadas
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Questões Respondidas</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">0</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Taxa de Acerto</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">0%</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Tempo Total de Estudo</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">0h 0min</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Simulados Realizados</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">0</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">Flashcards Revisados</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">0</span>
            </div>
          </div>
        </div>

        {/* Metas */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Suas Metas
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Alcançar Nível 10
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user.level}/10
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ width: `${Math.min((user.level / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Sequência de 7 dias
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user.streak}/7
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-600"
                  style={{ width: `${Math.min((user.streak / 7) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Desbloquear 5 conquistas
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {user.badges.length}/5
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-600"
                  style={{ width: `${Math.min((user.badges.length / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
