import { GrowthStage, getActionsToNextStage, getStageProgress } from '@/lib/gameData';

interface GrowthBarProps {
  currentStage: GrowthStage;
  totalActions: number;
  themeColor: string;
}

export default function GrowthBar({ currentStage, totalActions, themeColor }: GrowthBarProps) {
  const actionsNeeded = getActionsToNextStage(currentStage, totalActions);
  const progress = getStageProgress(currentStage, totalActions);
  const isMaxLevel = currentStage.stage === 5;

  return (
    <div className="bg-gradient-to-br from-cream to-white rounded-3xl p-6 shadow-lg border border-bark/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{currentStage.emoji}</span>
          <div>
            <p className="text-xs font-medium text-bark/50 uppercase tracking-wider mb-1">目前階段</p>
            <p className="text-xl font-display font-bold text-bark">
              第 {currentStage.stage} 階 · {currentStage.name}
            </p>
          </div>
        </div>
      </div>

      {!isMaxLevel && (
        <>
          <div className="w-full h-5 bg-bark/5 rounded-full overflow-hidden shadow-inner mb-3">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${themeColor}, ${themeColor}dd)`,
              }}
            />
          </div>
          <p className="text-sm text-bark/70 text-center font-medium">
            再 <span className="font-display font-black text-bark text-lg">{actionsNeeded}</span> 次就升級！
          </p>
        </>
      )}

      {isMaxLevel && (
        <div className="text-center py-3 bg-gradient-to-r from-sun/20 to-sun/10 rounded-2xl">
          <p className="text-xl font-display font-bold text-bark">🏆 已達最高成就！</p>
        </div>
      )}
    </div>
  );
}
