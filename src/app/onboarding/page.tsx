'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BrazilMap from '@/components/custom/brazil-map';
import { STUDY_AREAS } from '@/lib/types';
import { useGameProgress } from '@/hooks/useGameProgress';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { updateSelection } = useGameProgress();
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode);
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
  };

  const handleFinish = () => {
    updateSelection(selectedState, selectedArea);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-3xl bg-white shadow-2xl">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              C
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8" />
            Bem-vindo ao ConcursoPro
          </h1>
          <p className="text-white/90 text-lg">
            Sua jornada rumo à aprovação começa aqui!
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div
            className={`w-12 h-2 rounded-full transition-all duration-300 ${
              step >= 1 ? 'bg-white' : 'bg-white/30'
            }`}
          />
          <div
            className={`w-12 h-2 rounded-full transition-all duration-300 ${
              step >= 2 ? 'bg-white' : 'bg-white/30'
            }`}
          />
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                Onde você quer estudar?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Selecione seu estado no mapa interativo
              </p>

              <BrazilMap selectedState={selectedState} onStateSelect={handleStateSelect} />

              <button
                onClick={() => setStep(2)}
                disabled={!selectedState}
                className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                Qual área te interessa?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Escolha sua área de estudo principal
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {STUDY_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleAreaSelect(area)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedArea === area
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg scale-105'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
                    }`}
                  >
                    <p className="font-semibold">{area}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  Voltar
                </button>
                <button
                  onClick={handleFinish}
                  disabled={!selectedArea}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  Começar
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
