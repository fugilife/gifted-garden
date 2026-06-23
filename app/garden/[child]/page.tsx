'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChildName, getChildData, recordAction, withdrawMoney } from '@/lib/storage';
import { getCurrentStage, PLANT_CONFIG, isNestUnlocked, getAnimalCount } from '@/lib/gameData';
import PlantStage from '../components/PlantStage';
import MoneyDisplay from '../components/MoneyDisplay';
import GrowthBar from '../components/GrowthBar';
import ActionButtons from '../components/ActionButtons';
import CelebrationEffect from '../components/CelebrationEffect';
import NestScene from '../components/NestScene';
import GroundAnimals from '../components/GroundAnimals';
import WithdrawModal from '../components/WithdrawModal';
import MonkeyWithdrawAnim from '../components/MonkeyWithdrawAnim';

export default function GardenPage() {
  const params = useParams();
  const router = useRouter();
  const child = params.child as ChildName;

  const [childData, setChildData] = useState(() => getChildData(child));
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSpecialCelebration, setIsSpecialCelebration] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showMonkeyAnim, setShowMonkeyAnim] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [isEarning, setIsEarning] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isNestNewlyUnlocked, setIsNestNewlyUnlocked] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpMessage, setLevelUpMessage] = useState('');
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState('');

  const currentStage = getCurrentStage(child, childData.totalActions);
  const config = PLANT_CONFIG[child];
  const nestUnlocked = isNestUnlocked(childData.totalMoney);
  const animalCount = getAnimalCount(childData.totalMoney);

  const handleAction = useCallback((type: 'water' | 'fertilize') => {
    const prevStage = getCurrentStage(child, childData.totalActions);
    const prevNestUnlocked = isNestUnlocked(childData.totalMoney);
    const prevAnimalCount = getAnimalCount(childData.totalMoney);

    const updatedData = recordAction(child, type);
    setChildData(updatedData);

    const newStage = getCurrentStage(child, updatedData.totalActions);
    const newNestUnlocked = isNestUnlocked(updatedData.totalMoney);
    const newAnimalCount = getAnimalCount(updatedData.totalMoney);

    setIsAnimating(true);
    setIsEarning(true);

    const didLevelUp = newStage.stage > prevStage.stage;
    const didUnlockNest = !prevNestUnlocked && newNestUnlocked;
    const didUnlockAnimal = newAnimalCount > prevAnimalCount;

    if (didLevelUp || didUnlockNest || didUnlockAnimal) {
      setIsSpecialCelebration(true);
    }

    setShowCelebration(true);

    if (didUnlockNest) {
      setIsNestNewlyUnlocked(true);
      setTimeout(() => setIsNestNewlyUnlocked(false), 1000);
    }

    setTimeout(() => setIsAnimating(false), 800);
    setTimeout(() => setIsEarning(false), 1000);

    if (didLevelUp) {
      setTimeout(() => {
        setLevelUpMessage(`🎉 ${config.plantName}長大了！進入第${newStage.stage}階：${newStage.name}`);
        setShowLevelUpModal(true);
        setTimeout(() => setShowLevelUpModal(false), 3000);
      }, 2000);
    }

    if (didUnlockNest) {
      setTimeout(() => {
        setUnlockMessage('🪺 有鳥兒來築巢了！這棵樹長得夠大了 ✨');
        setShowUnlockModal(true);
        setTimeout(() => setShowUnlockModal(false), 4000);
      }, 2000);
    } else if (didUnlockAnimal) {
      const animalEmoji = child === 'gisele' ? '🦦' : '🐰';
      setTimeout(() => {
        setUnlockMessage(`${animalEmoji} 有新朋友來了！`);
        setShowUnlockModal(true);
        setTimeout(() => setShowUnlockModal(false), 3000);
      }, 2000);
    }
  }, [child, childData, config]);

  const handleWithdrawClick = useCallback(() => {
    if (childData.availableMoney > 0) {
      setShowWithdrawModal(true);
    }
  }, [childData.availableMoney]);

  const handleWithdrawConfirm = useCallback((amount: number) => {
    const result = withdrawMoney(child, amount);
    if (result.success) {
      setWithdrawAmount(amount);
      setShowWithdrawModal(false);
      setShowMonkeyAnim(true);
      setIsWithdrawing(true);
      setChildData(result.updatedData);
    }
  }, [child]);

  const handleMonkeyAnimComplete = useCallback(() => {
    setShowMonkeyAnim(false);
    setTimeout(() => setIsWithdrawing(false), 600);
  }, []);

  const handleCelebrationComplete = useCallback(() => {
    setShowCelebration(false);
    setIsSpecialCelebration(false);
  }, []);

  useEffect(() => {
    const refreshData = () => {
      setChildData(getChildData(child));
    };
    refreshData();
  }, [child]);

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${config.gradientFrom} 0%, ${config.gradientTo} 100%)`,
      }}
    >
      {/* 頂部導航與金錢顯示 */}
      <div className="relative z-10 p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-white/80 rounded-xl text-bark font-medium hover:bg-white active:scale-95 transition-all shadow-md"
            >
              ← 返回
            </button>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-bark">
              {config.name} 的{config.plantName}花園
            </h1>
          </div>

          <MoneyDisplay
            totalMoney={childData.totalMoney}
            availableMoney={childData.availableMoney}
            childName={config.name}
            isEarning={isEarning}
            isWithdrawing={isWithdrawing}
            onWithdrawClick={handleWithdrawClick}
          />
        </div>
      </div>

      {/* 中央植物場景區 */}
      <div className="relative flex items-center justify-center py-8 md:py-12" style={{ minHeight: '400px' }}>
        <div className="relative w-full max-w-md mx-auto">
          {/* 樹下動物層 */}
          {animalCount > 0 && (
            <GroundAnimals child={child} totalMoney={childData.totalMoney} />
          )}

          {/* 植物主體 */}
          <div className="relative z-10">
            <PlantStage
              child={child}
              stage={currentStage.stage}
              isAnimating={isAnimating}
            />
          </div>

          {/* 鳥巢覆蓋層 */}
          {nestUnlocked && (
            <NestScene
              child={child}
              totalMoney={childData.totalMoney}
              isNewlyUnlocked={isNestNewlyUnlocked}
            />
          )}
        </div>
      </div>

      {/* 底部控制區 */}
      <div className="relative z-10 p-4 md:p-6 pb-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <GrowthBar
            currentStage={currentStage}
            totalActions={childData.totalActions}
            themeColor={config.themeColor}
          />

          <ActionButtons
            onAction={handleAction}
            isDisabled={isAnimating}
          />
        </div>
      </div>

      {/* 慶祝動畫 */}
      <CelebrationEffect
        isVisible={showCelebration}
        child={child}
        isSpecial={isSpecialCelebration}
        onComplete={handleCelebrationComplete}
      />

      {/* 升級提示模態 */}
      {showLevelUpModal && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl border-4 border-sun">
            <p className="text-2xl font-bold text-bark text-center">{levelUpMessage}</p>
          </div>
        </div>
      )}

      {/* 解鎖提示模態 */}
      {showUnlockModal && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl border-4 border-leaf">
            <p className="text-xl font-bold text-bark text-center">{unlockMessage}</p>
          </div>
        </div>
      )}

      {/* 提領模態 */}
      <WithdrawModal
        isOpen={showWithdrawModal}
        availableMoney={childData.availableMoney}
        child={child}
        onConfirm={handleWithdrawConfirm}
        onCancel={() => setShowWithdrawModal(false)}
      />

      {/* 猴子拔果實動畫 */}
      <MonkeyWithdrawAnim
        isVisible={showMonkeyAnim}
        child={child}
        amount={withdrawAmount}
        onComplete={handleMonkeyAnimComplete}
      />
    </main>
  );
}
