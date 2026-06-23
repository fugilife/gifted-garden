'use client';

import { useState } from 'react';

interface ActionButtonsProps {
  onAction: (type: 'water' | 'fertilize') => void;
  isDisabled: boolean;
}

export default function ActionButtons({ onAction, isDisabled }: ActionButtonsProps) {
  const [showActions, setShowActions] = useState(false);

  const handleMainClick = () => {
    setShowActions(true);
  };

  const handleAction = (type: 'water' | 'fertilize') => {
    onAction(type);
    setShowActions(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showActions && (
        <button
          onClick={handleMainClick}
          disabled={isDisabled}
          className="bg-gradient-to-r from-leaf to-leaf/90 text-white px-10 py-5 rounded-3xl text-xl font-display font-bold shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20"
        >
          <span className="flex items-center gap-3">
            <span className="text-2xl">✏️</span>
            我今天寫完中文字了！
          </span>
        </button>
      )}

      {showActions && (
        <div className="flex gap-8 animate-slideDown">
          <button
            onClick={() => handleAction('water')}
            disabled={isDisabled}
            className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-3 disabled:opacity-50 border-4 border-white/30"
            style={{ boxShadow: '0 8px 32px rgba(59, 130, 246, 0.5)' }}
          >
            <span className="text-6xl drop-shadow-lg">💧</span>
            <span className="text-xl font-display font-black tracking-wide">澆水</span>
          </button>

          <button
            onClick={() => handleAction('fertilize')}
            disabled={isDisabled}
            className="w-40 h-40 rounded-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-3 disabled:opacity-50 border-4 border-white/30"
            style={{ boxShadow: '0 8px 32px rgba(34, 197, 94, 0.5)' }}
          >
            <span className="text-6xl drop-shadow-lg">🌿</span>
            <span className="text-xl font-display font-black tracking-wide">施肥</span>
          </button>
        </div>
      )}
    </div>
  );
}
