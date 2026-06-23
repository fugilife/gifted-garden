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
    <div className="bg-cream rounded-2xl p-5 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-bark/60">目前階段</p>
          <p className="text-xl font-bold text-bark">
            第 {currentStage.stage} 階：{currentStage.name} {currentStage.emoji}
          </p>
        </div>
      </div>

      {!isMaxLevel && (
        <>
          <div className="w-full h-4 bg-bark/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress * 100}%`,
                backgroundColor: themeColor,
              }}
            />
          </div>
          <p className="text-sm text-bark/70 mt-2 text-center">
            還需 <span className="font-bold text-bark">{actionsNeeded}</span> 次就能長大！
          </p>
        </>
      )}

      {isMaxLevel && (
        <div className="text-center py-2">
          <p className="text-lg font-bold text-sun">🏆 已達最高成就！</p>
        </div>
      )}
    </div>
  );
}
