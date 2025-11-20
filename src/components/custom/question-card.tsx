'use client';

import { useState } from 'react';
import { Question } from '@/lib/types';
import { CheckCircle2, XCircle, Clock, Award } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, xpEarned: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (index: number) => {
    if (showResult) return;

    setSelectedOption(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    // Aguarda animação antes de notificar
    setTimeout(() => {
      onAnswer(correct, correct ? question.xpReward : 0);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: Question['difficulty']) => {
    const colors = {
      easy: 'from-green-400 to-green-600',
      medium: 'from-yellow-400 to-orange-500',
      hard: 'from-red-400 to-red-600',
    };
    return colors[difficulty];
  };

  const getDifficultyLabel = (difficulty: Question['difficulty']) => {
    const labels = {
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Difícil',
    };
    return labels[difficulty];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm shadow-lg">
            {questionNumber}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Questão {questionNumber} de {totalQuestions}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{question.subject}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(
              question.difficulty
            )} text-white text-xs font-semibold shadow-lg`}
          >
            {getDifficultyLabel(question.difficulty)}
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs font-semibold shadow-lg">
            <Award className="w-3 h-3" />
            {question.xpReward} XP
          </div>
        </div>
      </div>

      {/* Questão */}
      <div className="mb-6">
        <p className="text-base sm:text-lg text-gray-900 dark:text-gray-100 leading-relaxed">
          {question.text}
        </p>
        {question.institution && question.year && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {question.institution} • {question.year}
          </p>
        )}
      </div>

      {/* Opções */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = index === question.correctAnswer;
          const showCorrect = showResult && isCorrectOption;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                showCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 ring-2 ring-green-300 dark:ring-green-700'
                  : showWrong
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500 ring-2 ring-red-300 dark:ring-red-700'
                  : isSelected
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10'
              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                      showCorrect
                        ? 'bg-green-500 text-white'
                        : showWrong
                        ? 'bg-red-500 text-white'
                        : isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span
                    className={`text-sm sm:text-base ${
                      showCorrect || showWrong
                        ? 'font-semibold'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {option}
                  </span>
                </div>
                {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />}
                {showWrong && <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explicação */}
      {showResult && (
        <div
          className={`p-4 rounded-xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
              : 'bg-red-50 dark:bg-red-900/20 border-red-500'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            ) : (
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {isCorrect ? '🎉 Parabéns! Resposta correta!' : '😔 Resposta incorreta'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {question.explanation}
              </p>
              {isCorrect && (
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-2">
                  +{question.xpReward} XP ganhos!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
