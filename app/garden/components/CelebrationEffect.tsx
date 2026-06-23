'use client';

import { useEffect } from 'react';
import { ChildName } from '@/lib/storage';

interface CelebrationEffectProps {
  isVisible: boolean;
  child: ChildName;
  isSpecial?: boolean;
  onComplete: () => void;
}

export default function CelebrationEffect({
  isVisible,
  child,
  isSpecial = false,
  onComplete,
}: CelebrationEffectProps) {
  useEffect(() => {
    if (isVisible) {
      const duration = isSpecial ? 3000 : 2000;
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isSpecial, onComplete]);

  if (!isVisible) return null;

  const particleCount = isSpecial ? 50 : 25;
  const particles = Array.from({ length: particleCount });

  const giseleEmojis = ['🍎', '⭐', '🌟'];
  const fionaEmojis = ['🍊', '⭐', '🌟'];
  const emojis = child === 'gisele' ? giseleEmojis : fionaEmojis;
  const primaryColor = child === 'gisele' ? '#D94F3D' : '#F07B2A';

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((_, i) => {
        const isEmoji = i % 3 !== 2;
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const tx = (Math.random() - 0.5) * 400;
        const ty = -Math.random() * 500 - 100;
        const delay = Math.random() * 200;
        const size = isEmoji ? 24 + Math.random() * 16 : 8 + Math.random() * 8;

        return (
          <div
            key={i}
            className="absolute animate-celebrationParticle"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 40}%`,
              '--tx': `${tx}px`,
              '--ty': `${ty}px`,
              animationDelay: `${delay}ms`,
              fontSize: isEmoji ? `${size}px` : undefined,
            } as React.CSSProperties}
          >
            {isEmoji ? (
              randomEmoji
            ) : (
              <div
                className="rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: primaryColor,
                  opacity: 0.8,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
