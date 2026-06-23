'use client';

import { useState } from 'react';
import { ChildName } from '@/lib/storage';

interface WithdrawModalProps {
  isOpen: boolean;
  availableMoney: number;
  child: ChildName;
  onConfirm: (amount: number) => void;
  onCancel: () => void;
}

export default function WithdrawModal({
  isOpen,
  availableMoney,
  child,
  onConfirm,
  onCancel,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const value = parseInt(amount);

    if (isNaN(value) || value <= 0) {
      setError('請輸入有效金額');
      return;
    }

    if (value > availableMoney) {
      setError('金額不夠哦！');
      return;
    }

    onConfirm(value);
    setAmount('');
    setError('');
  };

  const handleCancel = () => {
    setAmount('');
    setError('');
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-cream rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <p className="text-4xl mb-3">🐒</p>
          <h2 className="text-2xl font-bold text-bark mb-2">
            要讓猴子拔幾顆果實？
          </h2>
          <p className="text-bark/60">
            可提領餘額：<span className="font-bold text-leaf">{availableMoney} 元</span>
          </p>
        </div>

        <div className="mb-6">
          <input
            type="number"
            inputMode="numeric"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            placeholder="輸入金額"
            className={`w-full px-6 py-4 rounded-xl border-2 text-center text-2xl font-bold ${
              error
                ? 'border-apple bg-apple/5'
                : 'border-bark/20 bg-white focus:border-leaf'
            } outline-none transition-colors`}
          />
          {error && (
            <p className="text-apple text-sm mt-2 text-center font-medium">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-bark/20 text-bark font-bold hover:bg-bark/5 active:scale-95 transition-all"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 rounded-xl bg-orange text-white font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all hover:bg-orange/90"
          >
            確認提領
          </button>
        </div>
      </div>
    </div>
  );
}
