import { ChildName } from './storage';

export const PLANT_CONFIG = {
  gisele: {
    name: 'Gisele',
    plantName: '蘋果樹',
    fruitEmoji: '🍎',
    treeEmoji: '🌳',
    themeColor: '#D94F3D',
    secondaryColor: '#4A7C59',
    gradientFrom: '#FFF0EE',
    gradientTo: '#E8F4F0',
    monkeyFruit: 'apple' as const,
  },
  fiona: {
    name: 'Fiona',
    plantName: '橘子樹',
    fruitEmoji: '🍊',
    treeEmoji: '🌳',
    themeColor: '#F07B2A',
    secondaryColor: '#4A7C59',
    gradientFrom: '#FFF5EE',
    gradientTo: '#FFF0E0',
    monkeyFruit: 'orange' as const,
  },
};

export interface GrowthStage {
  stage: 1 | 2 | 3 | 4 | 5;
  name: string;
  emoji: string;
  minActions: number;
  nextStageAt: number; // Infinity for stage 5
}

export const APPLE_STAGES: GrowthStage[] = [
  { stage: 1, name: '種子發芽',   emoji: '🌱', minActions: 0,  nextStageAt: 3 },
  { stage: 2, name: '蘋果幼苗',   emoji: '🌿', minActions: 3,  nextStageAt: 6 },
  { stage: 3, name: '小蘋果樹',   emoji: '🌳', minActions: 6,  nextStageAt: 10 },
  { stage: 4, name: '蘋果樹開花', emoji: '🌼', minActions: 10, nextStageAt: 15 },
  { stage: 5, name: '豐收蘋果樹', emoji: '🍎', minActions: 15, nextStageAt: Infinity },
];

export const ORANGE_STAGES: GrowthStage[] = [
  { stage: 1, name: '種子發芽',   emoji: '🌱', minActions: 0,  nextStageAt: 3 },
  { stage: 2, name: '橘子幼苗',   emoji: '🌿', minActions: 3,  nextStageAt: 6 },
  { stage: 3, name: '小橘子樹',   emoji: '🌳', minActions: 6,  nextStageAt: 10 },
  { stage: 4, name: '橘子樹開花', emoji: '🌼', minActions: 10, nextStageAt: 15 },
  { stage: 5, name: '豐收橘子樹', emoji: '🍊', minActions: 15, nextStageAt: Infinity },
];

export function getCurrentStage(child: ChildName, totalActions: number): GrowthStage {
  const stages = child === 'gisele' ? APPLE_STAGES : ORANGE_STAGES;

  for (let i = stages.length - 1; i >= 0; i--) {
    if (totalActions >= stages[i].minActions) {
      return stages[i];
    }
  }

  return stages[0];
}

export function getActionsToNextStage(stage: GrowthStage, totalActions: number): number {
  if (stage.nextStageAt === Infinity) {
    return 0;
  }
  return Math.max(0, stage.nextStageAt - totalActions);
}

export function getStageProgress(stage: GrowthStage, totalActions: number): number {
  if (stage.nextStageAt === Infinity) {
    return 1;
  }

  const rangeSize = stage.nextStageAt - stage.minActions;
  const currentProgress = totalActions - stage.minActions;

  return Math.min(1, Math.max(0, currentProgress / rangeSize));
}

// 鳥巢解鎖
export const NEST_UNLOCK_MONEY = 600;

export interface EggState {
  index: 0 | 1 | 2;
  state: 'egg' | 'crack' | 'hatch' | 'chick';
}

export function isNestUnlocked(totalMoney: number): boolean {
  return totalMoney >= NEST_UNLOCK_MONEY;
}

export function getEggStates(totalMoney: number): EggState[] {
  if (!isNestUnlocked(totalMoney)) {
    return [
      { index: 0, state: 'egg' },
      { index: 1, state: 'egg' },
      { index: 2, state: 'egg' },
    ];
  }

  // 孵化時程（以 totalMoney 計算）
  // 600–719：🥚🥚🥚
  // 720–839：裂縫🥚🥚
  // 840–959：🐣🥚🥚
  // 960–1079：🐥裂縫🥚
  // 1080–1199：🐥🐣🥚
  // 1200–1319：🐥🐥裂縫
  // 1320–1439：🐥🐥🐣
  // 1440+：🐥🐥🐥

  const getEggState = (moneyThreshold: number[]): EggState['state'] => {
    if (totalMoney >= moneyThreshold[3]) return 'chick';
    if (totalMoney >= moneyThreshold[2]) return 'hatch';
    if (totalMoney >= moneyThreshold[1]) return 'crack';
    return 'egg';
  };

  return [
    { index: 0, state: getEggState([600, 720, 840, 960]) },
    { index: 1, state: getEggState([600, 960, 1080, 1200]) },
    { index: 2, state: getEggState([600, 1200, 1320, 1440]) },
  ];
}

// 樹下動物
export const ANIMAL_UNLOCK_INTERVAL = 300; // 每 300 元出現一隻
export const ANIMAL_MAX_COUNT = 5;

export function getAnimalCount(totalMoney: number): number {
  return Math.min(Math.floor(totalMoney / ANIMAL_UNLOCK_INTERVAL), ANIMAL_MAX_COUNT);
}

export function getAnimalAnimationSeed(index: number): number {
  // 固定 seed，確保動畫 offset 穩定
  const seeds = [0, 3.2, 1.7, 4.5, 2.1];
  return seeds[index] || 0;
}
