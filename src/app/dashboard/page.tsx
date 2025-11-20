'use client';

import { useGameProgress } from '@/hooks/useGameProgress';
import { ALL_BADGES } from '@/lib/game-logic';
import XPBar from '@/components/custom/xp-bar';
import StreakCounter from '@/components/custom/streak-counter';
import BadgeDisplay from '@/components/custom/badge-display';
import Navbar from '@/components/custom/navbar';
import Link from 'next/link';
import {
  BookOpen,
  Brain,
  Calendar,
  Trophy,
  Zap,
  Target,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useGameProgress();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Carregando...</div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Estudar Agora',
      description: 'Responda questões e ganhe XP',
      icon: BookOpen,
      href: '/study',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Flashcards',
      description: 'Revise conceitos importantes',
      icon: Brain,
      href: '/flashcards',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: 'Simulados',
      description: 'Teste seus conhecimentos',
      icon: Target,
      href: '/simulados',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: 'Calendário',
      description: 'Próximas provas e eventos',
      icon: Calendar,
      href: '/calendario',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  const stats = [
    {
      label: 'Questões Respondidas',
      value: '0',
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Taxa de Acerto',
      value: '0%',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Tempo de Estudo',
      value: '0h',
      icon: Zap,
      color: 'text-orange-600 dark:text-orange-400',
    },
    {
      label: 'Conquistas',
      value: user.badges.length.toString(),
      icon: Award,
      color: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 sm:pb-8 sm:pt-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue sua jornada rumo à aprovação
          </p>
        </div>

        {/* XP e Streak */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <XPBar user={user} showDetails={true} />
          </div>
          <div>
            <StreakCounter
              streak={user.streak}
              longestStreak={user.longestStreak}
              compact={false}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  <div className="relative">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} text-white mb-4 shadow-lg`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Suas Estatísticas
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges */}
        <BadgeDisplay badges={user.badges} allBadges={ALL_BADGES} compact={false} />
      </div>
    </div>
  );
}
