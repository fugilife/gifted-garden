'use client';

import { useEffect, useState } from 'react';
import { ChildName } from '@/lib/storage';

interface MonkeyWithdrawAnimProps {
  isVisible: boolean;
  child: ChildName;
  amount: number;
  onComplete: () => void;
}

export default function MonkeyWithdrawAnim({
  isVisible,
  child,
  amount,
  onComplete,
}: MonkeyWithdrawAnimProps) {
  const [phase, setPhase] = useState<'swing-in' | 'pick' | 'celebrate' | 'bite' | 'swing-out'>('swing-in');

  useEffect(() => {
    if (!isVisible) {
      setPhase('swing-in');
      return;
    }

    const timeline = [
      { phase: 'swing-in', duration: 800 },
      { phase: 'pick', duration: 700 },
      { phase: 'celebrate', duration: 500 },
      { phase: 'bite', duration: 700 },
      { phase: 'swing-out', duration: 800 },
    ] as const;

    let currentTime = 0;

    timeline.forEach(({ phase: p, duration }) => {
      setTimeout(() => setPhase(p as any), currentTime);
      currentTime += duration;
    });

    setTimeout(() => {
      onComplete();
    }, currentTime + 200);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const fruit = child === 'gisele' ? 'apple' : 'orange';
  const fruitEmoji = child === 'gisele' ? '🍎' : '🍊';

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center pointer-events-none">
      {/* 猴子動畫 */}
      <div
        className={`absolute ${
          phase === 'swing-in'
            ? 'animate-swingIn right-0'
            : phase === 'swing-out'
            ? 'animate-swingOut left-1/2'
            : 'left-1/2 -translate-x-1/2'
        } top-1/3 transition-all duration-300`}
      >
        <svg viewBox="0 0 100 120" className="w-32 h-auto">
          {/* 藤蔓 */}
          <path
            d="M 50 0 Q 45 20 50 40"
            stroke="#6B4423"
            strokeWidth="3"
            fill="none"
            className={phase === 'swing-in' || phase === 'swing-out' ? 'animate-swingVine' : ''}
          />

          {/* 猴子身體 */}
          <g transform="translate(50, 60)">
            {/* 身體 */}
            <ellipse cx="0" cy="0" rx="18" ry="22" fill="#A0734A" />
            {/* 腹部 */}
            <ellipse cx="0" cy="3" rx="12" ry="15" fill="#D4956A" />

            {/* 頭 */}
            <circle cx="0" cy="-22" r="16" fill="#A0734A" />
            {/* 臉 */}
            <ellipse cx="0" cy="-20" rx="12" ry="10" fill="#D4956A" />

            {/* 眼睛 */}
            <circle cx="-5" cy="-22" r="3" fill="black" />
            <circle cx="5" cy="-22" r="3" fill="black" />
            <circle cx="-4" cy="-23" r="1.2" fill="white" />
            <circle cx="6" cy="-23" r="1.2" fill="white" />

            {/* 嘴巴（咧嘴大笑 - celebrate 和 bite 階段）*/}
            {(phase === 'celebrate' || phase === 'bite') && (
              <>
                <path
                  d="M -6 -16 Q 0 -12 6 -16"
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <ellipse cx="0" cy="-14" rx="4" ry="2" fill="#8B4A3A" />
              </>
            )}
            {phase !== 'celebrate' && phase !== 'bite' && (
              <ellipse cx="0" cy="-16" rx="3" ry="2" fill="#8B4A3A" />
            )}

            {/* 耳朵 */}
            <circle cx="-13" cy="-24" r="4" fill="#A0734A" />
            <circle cx="13" cy="-24" r="4" fill="#A0734A" />
            <circle cx="-13" cy="-24" r="2.5" fill="#D4956A" />
            <circle cx="13" cy="-24" r="2.5" fill="#D4956A" />

            {/* 手臂 */}
            {phase === 'pick' || phase === 'celebrate' || phase === 'bite' ? (
              <>
                {/* 右手伸向果實/舉起果實 */}
                <g transform={phase === 'celebrate' || phase === 'bite' ? 'translate(20, -25)' : 'translate(25, -10)'}>
                  <ellipse cx="0" cy="0" rx="6" ry="12" fill="#A0734A" transform="rotate(-30)" />
                  <circle cx="0" cy="10" r="5" fill="#D4956A" />
                </g>
                <ellipse cx="-15" cy="5" rx="6" ry="14" fill="#A0734A" transform="rotate(25)" />
              </>
            ) : (
              <>
                <ellipse cx="15" cy="5" rx="6" ry="14" fill="#A0734A" transform="rotate(-25)" />
                <ellipse cx="-15" cy="5" rx="6" ry="14" fill="#A0734A" transform="rotate(25)" />
              </>
            )}

            {/* 腿 */}
            <ellipse cx="8" cy="18" rx="6" ry="10" fill="#A0734A" />
            <ellipse cx="-8" cy="18" rx="6" ry="10" fill="#A0734A" />
            <circle cx="8" cy="26" r="5" fill="#D4956A" />
            <circle cx="-8" cy="26" r="5" fill="#D4956A" />

            {/* 尾巴 */}
            <path
              d="M 12 8 Q 20 12 22 20 Q 24 28 20 35"
              stroke="#A0734A"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* 果實（在手中）*/}
          {(phase === 'celebrate' || phase === 'bite') && (
            <g transform="translate(72, 35)">
              {fruit === 'apple' ? (
                <AppleFruit bitten={phase === 'bite'} />
              ) : (
                <OrangeFruit bitten={phase === 'bite'} />
              )}
            </g>
          )}
        </svg>

        {/* 😋 表情泡泡（bite 階段）*/}
        {phase === 'bite' && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl animate-bounce">
            😋
          </div>
        )}
      </div>

      {/* -XXX 元 💸 飄字 */}
      {(phase === 'celebrate' || phase === 'bite') && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-moneyDrop">
          <p className="text-4xl font-display font-black text-apple drop-shadow-lg">
            -{amount} 元 💸
          </p>
        </div>
      )}
    </div>
  );
}

function AppleFruit({ bitten }: { bitten: boolean }) {
  return (
    <g>
      {bitten && (
        <path
          d="M 8 -2 Q 12 0 10 4"
          fill="#FDF8F0"
          stroke="#D94F3D"
          strokeWidth="1"
        />
      )}
      <circle cx="0" cy="0" r="10" fill="#D94F3D" />
      <circle cx="0" cy="0" r="8.5" fill="#E85D4A" />
      <ellipse cx="-3" cy="-3" rx="3" ry="4" fill="#FFAAAA" opacity="0.5" />
      <line x1="0" y1="-10" x2="0" y2="-14" stroke="#6B4423" strokeWidth="2" />
      <ellipse cx="2" cy="-13" rx="4" ry="2.5" fill="#4A7C59" transform="rotate(20 2 -13)" />
    </g>
  );
}

function OrangeFruit({ bitten }: { bitten: boolean }) {
  return (
    <g>
      {bitten && (
        <path
          d="M 8 -2 Q 12 0 10 4"
          fill="#FDF8F0"
          stroke="#F07B2A"
          strokeWidth="1"
        />
      )}
      <circle cx="0" cy="0" r="10" fill="#F07B2A" />
      <circle cx="0" cy="0" r="8.5" fill="#FF8C3A" />
      <ellipse cx="-3" cy="-3" rx="3.5" ry="4.5" fill="#FFCC88" opacity="0.5" />
      <circle cx="0" cy="-10" r="2.5" fill="#6B8E3D" />
      <line x1="0" y1="-10" x2="0" y2="-13" stroke="#6B4423" strokeWidth="1.5" />
    </g>
  );
}
