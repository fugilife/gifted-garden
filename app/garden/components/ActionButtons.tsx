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
          className="bg-leaf text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-leaf/90"
        >
          ✏️ 我今天寫完中文字了！
        </button>
      )}

      {showActions && (
        <div className="flex gap-6 animate-slideDown">
          <button
            onClick={() => handleAction('water')}
            disabled={isDisabled}
            className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-150 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
            style={{ boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)' }}
          >
            <span className="text-5xl">💧</span>
            <span className="text-lg font-bold">澆水</span>
          </button>

          <button
            onClick={() => handleAction('fertilize')}
            disabled={isDisabled}
            className="w-36 h-36 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-150 flex flex-col items-center justify-center gap-2 disabled:opacity-50"
            style={{ boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)' }}
          >
            <span className="text-5xl">🌿</span>
            <span className="text-lg font-bold">施肥</span>
          </button>
        </div>
      )}
    </div>
  );
}
