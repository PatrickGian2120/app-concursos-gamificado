'use client';

import { useState } from 'react';
import { BRAZILIAN_STATES } from '@/lib/types';

interface BrazilMapProps {
  selectedState: string;
  onStateSelect: (stateCode: string) => void;
}

export default function BrazilMap({ selectedState, onStateSelect }: BrazilMapProps) {
  const [hoveredState, setHoveredState] = useState<string>('');

  // Posições aproximadas dos estados no mapa (em %)
  const statePositions: Record<string, { top: string; left: string }> = {
    AC: { top: '45%', left: '8%' },
    AM: { top: '35%', left: '18%' },
    RR: { top: '15%', left: '22%' },
    PA: { top: '35%', left: '35%' },
    AP: { top: '20%', left: '38%' },
    MA: { top: '38%', left: '50%' },
    PI: { top: '45%', left: '52%' },
    CE: { top: '40%', left: '58%' },
    RN: { top: '43%', left: '62%' },
    PB: { top: '47%', left: '62%' },
    PE: { top: '50%', left: '60%' },
    AL: { top: '54%', left: '62%' },
    SE: { top: '57%', left: '60%' },
    BA: { top: '58%', left: '52%' },
    TO: { top: '50%', left: '42%' },
    MT: { top: '58%', left: '30%' },
    RO: { top: '52%', left: '18%' },
    GO: { top: '65%', left: '42%' },
    DF: { top: '65%', left: '45%' },
    MS: { top: '72%', left: '32%' },
    MG: { top: '72%', left: '52%' },
    ES: { top: '75%', left: '58%' },
    RJ: { top: '78%', left: '55%' },
    SP: { top: '78%', left: '45%' },
    PR: { top: '85%', left: '42%' },
    SC: { top: '90%', left: '42%' },
    RS: { top: '95%', left: '38%' },
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-blue-200 dark:border-blue-900">
      {/* Título do mapa */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Selecione seu Estado
        </h3>
        {hoveredState && (
          <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mt-1">
            {BRAZILIAN_STATES.find((s) => s.code === hoveredState)?.name}
          </p>
        )}
      </div>

      {/* Estados como botões posicionados */}
      {BRAZILIAN_STATES.map((state) => {
        const position = statePositions[state.code];
        const isSelected = selectedState === state.code;
        const isHovered = hoveredState === state.code;

        return (
          <button
            key={state.code}
            onClick={() => onStateSelect(state.code)}
            onMouseEnter={() => setHoveredState(state.code)}
            onMouseLeave={() => setHoveredState('')}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isSelected
                ? 'scale-125 z-20'
                : isHovered
                ? 'scale-110 z-10'
                : 'scale-100 z-0'
            }`}
            style={{ top: position.top, left: position.left }}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-xs shadow-lg transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ring-4 ring-blue-300 dark:ring-blue-700'
                  : isHovered
                  ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white ring-2 ring-blue-200 dark:ring-blue-800'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              {state.code}
            </div>
          </button>
        );
      })}

      {/* Legenda */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {selectedState
            ? `${BRAZILIAN_STATES.find((s) => s.code === selectedState)?.name} selecionado`
            : 'Clique em um estado'}
        </p>
      </div>
    </div>
  );
}
