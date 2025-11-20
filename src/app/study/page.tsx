'use client';

import { useState, useEffect } from 'react';
import { useGameProgress } from '@/hooks/useGameProgress';
import { getRandomQuestions } from '@/lib/questions-data';
import { checkBadgeUnlock, ALL_BADGES } from '@/lib/game-logic';
import QuestionCard from '@/components/custom/question-card';
import Navbar from '@/components/custom/navbar';
import { Question } from '@/lib/types';
import { Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function StudyPage() {
  const { user, addXP, updateStreak, addBadge } = useGameProgress();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  useEffect(() => {
    startNewSession();
    updateStreak();
  }, []);

  const startNewSession = () => {
    setQuestions(getRandomQuestions(5));
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setTotalXPEarned(0);
    setSessionComplete(false);
    setNewBadges([]);
  };

  const handleAnswer = (isCorrect: boolean, xpEarned: number) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setTotalXPEarned((prev) => prev + xpEarned);
      
      const result = addXP(xpEarned);
    }

    // Próxima questão ou finalizar
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        finishSession();
      }
    }, 2000);
  };

  const finishSession = () => {
    setSessionComplete(true);

    // Verificar badges desbloqueados
    const userStats = {
      level: user.level,
      streak: user.streak,
      totalQuestions: questions.length,
      accuracy: (correctAnswers / questions.length) * 100,
    };

    const unlockedBadges: string[] = [];
    ALL_BADGES.forEach((badge) => {
      if (checkBadgeUnlock(badge.id, userStats)) {
        const wasAdded = addBadge(badge);
        if (wasAdded) {
          unlockedBadges.push(badge.name);
        }
      }
    });

    setNewBadges(unlockedBadges);
  };

  if (sessionComplete) {
    const accuracy = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 pb-24 sm:pb-8 sm:pt-24">
        <Navbar />
        
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 shadow-2xl">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Sessão Concluída! 🎉
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Parabéns pelo seu esforço!
            </p>
          </div>

          {/* Resultados */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Acertos</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {correctAnswers}/{questions.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Precisão</p>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {accuracy}%
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-800 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">XP Ganho</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  +{totalXPEarned} XP
                </p>
              </div>
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          {/* Novos badges */}
          {newBadges.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-800 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Novas Conquistas Desbloqueadas!
              </h3>
              <div className="space-y-2">
                {newBadges.map((badgeName) => (
                  <p
                    key={badgeName}
                    className="text-sm text-gray-700 dark:text-gray-300 font-medium"
                  >
                    🎖️ {badgeName}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={startNewSession}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Estudar Mais
            </button>
            <Link
              href="/dashboard"
              className="flex-1 px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Voltar ao Início
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">
          Carregando questões...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-8 px-4 pb-24 sm:pb-8 sm:pt-24">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Sessão de Estudos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Responda as questões e ganhe XP!
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Progresso
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Questão */}
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
}
