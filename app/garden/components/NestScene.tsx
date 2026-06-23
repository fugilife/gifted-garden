'use client';

import { useEffect, useState } from 'react';
import { ChildName } from '@/lib/storage';
import { getEggStates, EggState } from '@/lib/gameData';

interface NestSceneProps {
  child: ChildName;
  totalMoney: number;
  isNewlyUnlocked: boolean;
}

export default function NestScene({ child, totalMoney, isNewlyUnlocked }: NestSceneProps) {
  const eggStates = getEggStates(totalMoney);
  const [birdBStopped, setBirdBStopped] = useState(false);
  const [birdCFlownAway, setBirdCFlownAway] = useState(false);
  const [singCount, setSingCount] = useState(0);

  // 成鳥 B：隨機停棲
  useEffect(() => {
    const interval = setInterval(() => {
      setBirdBStopped(true);
      setTimeout(() => setBirdBStopped(false), 3000);
    }, Math.random() * 4000 + 8000);

    return () => clearInterval(interval);
  }, []);

  // 成鳥 C：飛離/歸來
  useEffect(() => {
    const interval = setInterval(() => {
      setBirdCFlownAway(true);
      setTimeout(() => setBirdCFlownAway(false), Math.random() * 3000 + 5000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // 成鳥 C：唱歌
  useEffect(() => {
    if (!birdCFlownAway) {
      const interval = setInterval(() => {
        setSingCount((c) => c + 1);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [birdCFlownAway]);

  const birdColors = child === 'gisele'
    ? {
        birdA: { body: '#D4693A', wing: '#A84F2A', belly: '#F5E8C0' },
        birdB: { body: '#4A7FC4', wing: '#2E5C99', belly: '#E8F4FF' },
        birdC: { body: '#7AB848', wing: '#5A8C32', belly: '#F0FFE0' },
      }
    : {
        birdA: { body: '#E8A030', wing: '#C07820', belly: '#FFF5D0' },
        birdB: { body: '#C45A9B', wing: '#943878', belly: '#FFE8F5' },
        birdC: { body: '#5BBCD0', wing: '#3A90A8', belly: '#E8FAFF' },
      };

  return (
    <div className={`absolute inset-0 pointer-events-none ${isNewlyUnlocked ? 'animate-nestDrop' : ''}`}>
      <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
        {/* 鳥巢 */}
        <g transform={child === 'gisele' ? 'translate(180, 115)' : 'translate(90, 100)'}>
          <ellipse cx="0" cy="0" rx="30" ry="18" fill="#8B6343" opacity="0.9" />
          <ellipse cx="0" cy="-2" rx="28" ry="16" fill="#E8C870" />
          {/* 編織紋路 */}
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1={-25 + i * 7}
              y1={-8}
              x2={-22 + i * 7}
              y2={5}
              stroke="#A8843D"
              strokeWidth="1.5"
              opacity="0.6"
            />
          ))}

          {/* 三顆蛋 */}
          <g transform="translate(-12, 0)">
            <Egg state={eggStates[0].state} />
          </g>
          <g transform="translate(0, 2)">
            <Egg state={eggStates[1].state} />
          </g>
          <g transform="translate(12, -1)">
            <Egg state={eggStates[2].state} />
          </g>
        </g>

        {/* 成鳥 A（餵食鳥）- 固定在巢旁 */}
        <g transform={child === 'gisele' ? 'translate(155, 110)' : 'translate(120, 95)'}>
          <Bird
            colors={birdColors.birdA}
            animation="feed"
            flipped={child === 'gisele'}
          />
        </g>

        {/* 成鳥 B（守護鳥）- 巡邏飛行 */}
        {!birdBStopped && (
          <g className="animate-birdFly">
            <g transform="translate(200, 140)">
              <Bird colors={birdColors.birdB} animation="fly" />
            </g>
          </g>
        )}
        {birdBStopped && (
          <g transform="translate(220, 140)">
            <Bird colors={birdColors.birdB} animation="idle" />
          </g>
        )}

        {/* 成鳥 C（歌唱鳥）- 樹頂 */}
        {!birdCFlownAway && (
          <g transform={child === 'gisele' ? 'translate(110, 70)' : 'translate(170, 65)'}>
            <Bird colors={birdColors.birdC} animation="sing" />
            {/* 音符 */}
            {[...Array(2)].map((_, i) => (
              <text
                key={`${singCount}-${i}`}
                x={i * 8}
                y={-15}
                fontSize="14"
                className="animate-musicNote"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {i === 0 ? '♪' : '♫'}
              </text>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}

function Egg({ state }: { state: EggState['state'] }) {
  if (state === 'chick') {
    return (
      <g>
        {/* 雛鳥 */}
        <ellipse cx="0" cy="0" rx="7" ry="8" fill="#F5C842" />
        <circle cx="0" cy="-3" r="5" fill="#F5C842" />
        {/* 眼睛 */}
        <circle cx="-2" cy="-4" r="1.5" fill="black" />
        <circle cx="2" cy="-4" r="1.5" fill="black" />
        {/* 嘴 */}
        <path d="M 0 -2 L 3 -1 L 0 0 Z" fill="#E07B39" />
        {/* 翅膀 */}
        <ellipse cx="-5" cy="2" rx="3" ry="4" fill="#E0B032" opacity="0.8" />
        <ellipse cx="5" cy="2" rx="3" ry="4" fill="#E0B032" opacity="0.8" />
      </g>
    );
  }

  if (state === 'hatch') {
    return (
      <g>
        {/* 破殼，雛鳥頭露出 */}
        <ellipse cx="0" cy="2" rx="8" ry="5" fill="#B8D4E8" />
        <circle cx="0" cy="-3" r="4" fill="#F5C842" />
        <circle cx="-1.5" cy="-4" r="1" fill="black" />
        <circle cx="1.5" cy="-4" r="1" fill="black" />
        <path d="M -4 0 L -6 -2 L -5 1 Z" fill="#A8C4D8" />
        <path d="M 4 0 L 6 -2 L 5 1 Z" fill="#A8C4D8" />
      </g>
    );
  }

  if (state === 'crack') {
    return (
      <g>
        <ellipse cx="0" cy="0" rx="8" ry="10" fill="#B8D4E8" />
        <ellipse cx="-2" cy="-3" rx="2" ry="3" fill="#D8E8F8" opacity="0.6" />
        {/* 裂縫 */}
        <path d="M 0 -8 L -1 -4 L 1 -2 L 0 2" stroke="#5C4A3A" strokeWidth="1" fill="none" />
      </g>
    );
  }

  // 完整蛋
  return (
    <g>
      <ellipse cx="0" cy="0" rx="8" ry="10" fill="#B8D4E8" />
      <ellipse cx="-2" cy="-3" rx="2.5" ry="3.5" fill="#D8E8F8" opacity="0.5" />
    </g>
  );
}

interface BirdProps {
  colors: { body: string; wing: string; belly: string };
  animation?: 'feed' | 'fly' | 'idle' | 'sing';
  flipped?: boolean;
}

function Bird({ colors, animation = 'idle', flipped = false }: BirdProps) {
  const transform = flipped ? 'scale(-1, 1)' : '';

  return (
    <g transform={transform} className={animation === 'feed' ? 'animate-birdFeed' : animation === 'fly' ? 'animate-birdFlap' : animation === 'sing' ? 'animate-birdSing' : ''}>
      {/* 身體 */}
      <ellipse cx="0" cy="0" rx="10" ry="8" fill={colors.body} />
      {/* 腹部 */}
      <ellipse cx="0" cy="2" rx="6" ry="5" fill={colors.belly} />
      {/* 頭 */}
      <circle cx="8" cy="-3" r="5" fill={colors.body} />
      {/* 眼睛 */}
      <circle cx="10" cy="-4" r="1.5" fill="black" />
      <circle cx="10.5" cy="-4.5" r="0.6" fill="white" />
      {/* 嘴 */}
      <path d="M 12 -3 L 15 -3.5 L 12 -2 Z" fill="#E07B39" />
      {/* 翅膀 */}
      <ellipse cx="-3" cy="0" rx="6" ry="8" fill={colors.wing} transform="rotate(-25)" />
      {/* 尾巴 */}
      <ellipse cx="-8" cy="1" rx="4" ry="6" fill={colors.wing} transform="rotate(15)" />
    </g>
  );
}
