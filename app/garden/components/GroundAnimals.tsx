'use client';

import { useEffect, useState } from 'react';
import { ChildName } from '@/lib/storage';
import { getAnimalCount, getAnimalAnimationSeed } from '@/lib/gameData';

interface GroundAnimalsProps {
  child: ChildName;
  totalMoney: number;
}

type AnimalAction = 'idle' | 'move' | 'action';

export default function GroundAnimals({ child, totalMoney }: GroundAnimalsProps) {
  const count = getAnimalCount(totalMoney);
  const animals = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none">
      {animals.map((index) => (
        <Animal key={index} child={child} index={index} />
      ))}
    </div>
  );
}

function Animal({ child, index }: { child: ChildName; index: number }) {
  const [action, setAction] = useState<AnimalAction>('idle');
  const [position, setPosition] = useState(0);
  const seed = getAnimalAnimationSeed(index);

  // 每隻動物有不同的初始位置和外觀變化
  const variant = index % 3; // 0, 1, 2 三種變化

  useEffect(() => {
    const baseInterval = 8000 + seed * 1000;

    const randomAction = () => {
      const actions: AnimalAction[] = ['idle', 'move', 'action'];
      const randomIndex = Math.floor(Math.random() * actions.length);
      setAction(actions[randomIndex]);

      if (actions[randomIndex] === 'move') {
        const newPos = Math.random() * 160 - 80;
        setPosition(newPos);
      }

      setTimeout(() => setAction('idle'), 2000);
    };

    const interval = setInterval(randomAction, baseInterval);
    return () => clearInterval(interval);
  }, [seed]);

  const basePosition = -100 + index * 50;

  return (
    <div
      className="absolute transition-all duration-1000 ease-in-out animate-slideIn"
      style={{
        left: `calc(50% + ${basePosition + position}px)`,
        bottom: '4px',
        animationDelay: `${index * 200}ms`,
      }}
    >
      {child === 'gisele' ? (
        <Meerkat action={action} variant={variant} />
      ) : (
        <Rabbit action={action} variant={variant} />
      )}
    </div>
  );
}

function Meerkat({ action, variant }: { action: AnimalAction; variant: number }) {
  // 根據 variant 改變顏色深淺
  const colorShift = variant * 15;
  const bodyColor = `hsl(${35 + colorShift}, 60%, 62%)`;
  const bellyColor = `hsl(${40 + colorShift}, 50%, 85%)`;

  // 根據 variant 改變姿勢
  const isLookingLeft = variant === 1;
  const isSquatting = action === 'action' || variant === 2;

  return (
    <svg
      viewBox="0 0 40 60"
      className={`w-12 h-auto ${
        action === 'idle' ? 'animate-lookAround' : action === 'action' ? 'animate-dig' : ''
      }`}
      style={{ transform: isLookingLeft ? 'scaleX(-1)' : 'none' }}
    >
      {/* 狐獴身體（直立） */}
      <ellipse cx="20" cy={isSquatting ? "38" : "35"} rx="8" ry={isSquatting ? "12" : "15"} fill={bodyColor} />
      {/* 腹部 */}
      <ellipse cx="20" cy={isSquatting ? "40" : "38"} rx="5" ry={isSquatting ? "8" : "10"} fill={bellyColor} />
      {/* 頭 */}
      <ellipse cx="20" cy="18" rx="7" ry="8" fill="#D4A96A" />
      {/* 耳朵 */}
      <ellipse cx="16" cy="13" rx="2.5" ry="3" fill="#C49960" />
      <ellipse cx="24" cy="13" rx="2.5" ry="3" fill="#C49960" />
      {/* 臉部標記（眼框）*/}
      <ellipse cx="18" cy="18" rx="2" ry="2.5" fill="#8B6343" opacity="0.6" />
      <ellipse cx="22" cy="18" rx="2" ry="2.5" fill="#8B6343" opacity="0.6" />
      {/* 眼睛 */}
      <circle cx="18" cy="18" r="1.5" fill="black" />
      <circle cx="22" cy="18" r="1.5" fill="black" />
      <circle cx="18.5" cy="17.5" r="0.6" fill="white" />
      <circle cx="22.5" cy="17.5" r="0.6" fill="white" />
      {/* 鼻子 */}
      <ellipse cx="20" cy="21" rx="1" ry="0.8" fill="black" />
      {/* 前爪（抱胸）*/}
      <ellipse cx="15" cy="28" rx="2" ry="4" fill="#D4A96A" transform="rotate(-20 15 28)" />
      <ellipse cx="25" cy="28" rx="2" ry="4" fill="#D4A96A" transform="rotate(20 25 28)" />
      {/* 尾巴 */}
      <path d="M 20 48 Q 18 55 20 60" stroke="#B8935A" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* 挖地土塊（action 時顯示）*/}
      {action === 'action' && (
        <>
          <circle cx="12" cy="52" r="1.5" fill="#8B5E3C" opacity="0.7" />
          <circle cx="28" cy="50" r="1.2" fill="#8B5E3C" opacity="0.7" />
          <circle cx="16" cy="54" r="1" fill="#8B5E3C" opacity="0.6" />
        </>
      )}
    </svg>
  );
}

function Rabbit({ action, variant }: { action: AnimalAction; variant: number }) {
  const [earUp, setEarUp] = useState(false);

  // 根據 variant 改變顏色
  const colors = [
    { body: '#F5F0E8', ear: '#FFB6C1', eye: '#FF6B9D' }, // 原始白色
    { body: '#E8E0D8', ear: '#FFA8B8', eye: '#FF5B8D' }, // 淺灰
    { body: '#FFF8F0', ear: '#FFC0CB', eye: '#FF7BA0' }, // 淡粉
  ];
  const color = colors[variant];

  const isLookingRight = variant === 1;

  useEffect(() => {
    if (action === 'idle') {
      const interval = setInterval(() => {
        setEarUp((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setEarUp(true);
    }
  }, [action]);

  return (
    <svg
      viewBox="0 0 40 50"
      className={`w-12 h-auto ${action === 'move' ? 'animate-hop' : action === 'idle' ? '' : ''}`}
      style={{ transform: isLookingRight ? 'scaleX(-1)' : 'none' }}
    >
      {/* 兔子身體 */}
      <ellipse cx="20" cy="32" rx="10" ry="12" fill={color.body} />
      {/* 頭 */}
      <circle cx="20" cy="18" r="8" fill={color.body} />
      {/* 長耳朵 */}
      <ellipse
        cx="16"
        cy="8"
        rx="2.5"
        ry={earUp ? "10" : "8"}
        fill="#F5F0E8"
        className={earUp ? '' : 'transition-all duration-300'}
      />
      <ellipse
        cx="24"
        cy="8"
        rx="2.5"
        ry={earUp ? "10" : "8"}
        fill="#F5F0E8"
        className={earUp ? '' : 'transition-all duration-300'}
      />
      {/* 耳內（粉紅）*/}
      <ellipse cx="16" cy="10" rx="1.2" ry="5" fill="#FFB6C1" opacity="0.8" />
      <ellipse cx="24" cy="10" rx="1.2" ry="5" fill="#FFB6C1" opacity="0.8" />
      {/* 眼睛（粉紅大眼）*/}
      <circle cx="17" cy="18" r="2.5" fill="#FF6B9D" />
      <circle cx="23" cy="18" r="2.5" fill="#FF6B9D" />
      <circle cx="17.5" cy="17.5" r="1" fill="white" />
      <circle cx="23.5" cy="17.5" r="1" fill="white" />
      {/* 鼻子 */}
      <ellipse cx="20" cy="21" rx="1.5" ry="1" fill="#FF9BB0" />
      {/* 鬍鬚 */}
      <line x1="13" y1="20" x2="9" y2="19" stroke="#D4C4B8" strokeWidth="0.5" />
      <line x1="13" y1="21" x2="9" y2="22" stroke="#D4C4B8" strokeWidth="0.5" />
      <line x1="27" y1="20" x2="31" y2="19" stroke="#D4C4B8" strokeWidth="0.5" />
      <line x1="27" y1="21" x2="31" y2="22" stroke="#D4C4B8" strokeWidth="0.5" />
      {/* 前爪 */}
      <ellipse cx="15" cy="35" rx="2" ry="3" fill="#F5F0E8" />
      <ellipse cx="25" cy="35" rx="2" ry="3" fill="#F5F0E8" />
      {/* 後腿 */}
      <ellipse cx="14" cy="42" rx="3.5" ry="5" fill="#F5F0E8" />
      <ellipse cx="26" cy="42" rx="3.5" ry="5" fill="#F5F0E8" />
      {/* 蓬鬆尾巴 */}
      <circle cx="20" cy="44" r="4" fill="#F5F0E8" opacity="0.9" />
    </svg>
  );
}
