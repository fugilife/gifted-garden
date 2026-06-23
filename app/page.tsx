'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getChildData } from '@/lib/storage';
import { getCurrentStage, PLANT_CONFIG } from '@/lib/gameData';

export default function Home() {
  const [giseleData, setGiseleData] = useState({ totalActions: 0, totalMoney: 0 });
  const [fionaData, setFionaData] = useState({ totalActions: 0, totalMoney: 0 });

  useEffect(() => {
    const gData = getChildData('gisele');
    const fData = getChildData('fiona');
    setGiseleData({ totalActions: gData.totalActions, totalMoney: gData.totalMoney });
    setFionaData({ totalActions: fData.totalActions, totalMoney: fData.totalMoney });
  }, []);

  const giseleStage = getCurrentStage('gisele', giseleData.totalActions);
  const fionaStage = getCurrentStage('fiona', fionaData.totalActions);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-bark text-center mb-3">
          🌱 吉福種樹花園
        </h1>
        <p className="text-lg text-bark/70 text-center mb-12">
          選擇你的花園
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gisele Card */}
          <Link href="/garden/gisele">
            <div
              className="bg-cream rounded-3xl p-8 shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-150 cursor-pointer border-4 border-apple/20 hover:border-apple/40"
              style={{
                background: `linear-gradient(135deg, ${PLANT_CONFIG.gisele.gradientFrom} 0%, ${PLANT_CONFIG.gisele.gradientTo} 100%)`,
              }}
            >
              <div className="text-7xl text-center mb-4">🍎</div>
              <h2 className="text-3xl font-display font-bold text-apple text-center mb-2">
                Gisele
              </h2>
              <p className="text-xl text-bark text-center mb-4">的蘋果樹花園</p>
              <div className="text-center space-y-1">
                <p className="text-sm text-bark/60">
                  第 {giseleStage.stage} 階：{giseleStage.name}
                </p>
                <p className="text-2xl font-display font-bold text-sun">
                  {giseleData.totalMoney} 元
                </p>
              </div>
            </div>
          </Link>

          {/* Fiona Card */}
          <Link href="/garden/fiona">
            <div
              className="bg-cream rounded-3xl p-8 shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-150 cursor-pointer border-4 border-orange/20 hover:border-orange/40"
              style={{
                background: `linear-gradient(135deg, ${PLANT_CONFIG.fiona.gradientFrom} 0%, ${PLANT_CONFIG.fiona.gradientTo} 100%)`,
              }}
            >
              <div className="text-7xl text-center mb-4">🍊</div>
              <h2 className="text-3xl font-display font-bold text-orange text-center mb-2">
                Fiona
              </h2>
              <p className="text-xl text-bark text-center mb-4">的橘子樹花園</p>
              <div className="text-center space-y-1">
                <p className="text-sm text-bark/60">
                  第 {fionaStage.stage} 階：{fionaStage.name}
                </p>
                <p className="text-2xl font-display font-bold text-sun">
                  {fionaData.totalMoney} 元
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
