export type ChildName = 'gisele' | 'fiona';

export interface ActionRecord {
  date: string;        // "YYYY-MM-DD"
  type: 'water' | 'fertilize';
  moneyEarned: number; // always 60
}

export interface WithdrawalRecord {
  date: string;        // "YYYY-MM-DD"
  amount: number;      // 提領金額
}

export interface ChildData {
  totalActions: number;      // 累計澆水+施肥次數
  totalMoney: number;        // 累計賺到總金額（只增不減，決定所有解鎖）
  availableMoney: number;    // 可提領餘額（totalMoney - 已提領總額）
  lastAction: string;        // 最後一次行動日期
  history: ActionRecord[];
  withdrawals: WithdrawalRecord[];
}

export interface GameData {
  gisele: ChildData;
  fiona: ChildData;
}

const STORAGE_KEY = 'gifted-garden-v1';
const MONEY_PER_ACTION = 60;

const defaultChildData: ChildData = {
  totalActions: 0,
  totalMoney: 0,
  availableMoney: 0,
  lastAction: '',
  history: [],
  withdrawals: [],
};

const defaultGameData: GameData = {
  gisele: { ...defaultChildData },
  fiona: { ...defaultChildData },
};

export function loadGameData(): GameData {
  if (typeof window === 'undefined') {
    return defaultGameData;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultGameData;
    }
    return JSON.parse(stored) as GameData;
  } catch (error) {
    console.error('Failed to load game data:', error);
    return defaultGameData;
  }
}

export function saveGameData(data: GameData): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save game data:', error);
  }
}

export function getChildData(child: ChildName): ChildData {
  const data = loadGameData();
  return data[child];
}

export function recordAction(child: ChildName, type: 'water' | 'fertilize'): ChildData {
  const data = loadGameData();
  const childData = data[child];

  const today = new Date().toISOString().split('T')[0];

  const newRecord: ActionRecord = {
    date: today,
    type,
    moneyEarned: MONEY_PER_ACTION,
  };

  const updatedData: ChildData = {
    ...childData,
    totalActions: childData.totalActions + 1,
    totalMoney: childData.totalMoney + MONEY_PER_ACTION,
    availableMoney: childData.availableMoney + MONEY_PER_ACTION,
    lastAction: today,
    history: [...childData.history, newRecord],
  };

  data[child] = updatedData;
  saveGameData(data);

  return updatedData;
}

export function withdrawMoney(
  child: ChildName,
  amount: number
): { success: boolean; updatedData: ChildData } {
  if (amount <= 0) {
    const childData = getChildData(child);
    return { success: false, updatedData: childData };
  }

  const data = loadGameData();
  const childData = data[child];

  if (amount > childData.availableMoney) {
    return { success: false, updatedData: childData };
  }

  const today = new Date().toISOString().split('T')[0];

  const newWithdrawal: WithdrawalRecord = {
    date: today,
    amount,
  };

  const updatedData: ChildData = {
    ...childData,
    availableMoney: childData.availableMoney - amount,
    withdrawals: [...childData.withdrawals, newWithdrawal],
  };

  data[child] = updatedData;
  saveGameData(data);

  return { success: true, updatedData };
}
