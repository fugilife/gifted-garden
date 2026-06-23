# SPEC.md · 功能規格書

## 1. 資料層（lib/storage.ts）

### 資料型別定義

```typescript
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
```

### localStorage 操作函式

```typescript
const STORAGE_KEY = 'gifted-garden-v1';
const MONEY_PER_ACTION = 60;

export function loadGameData(): GameData
export function saveGameData(data: GameData): void
export function getChildData(child: ChildName): ChildData

// 記錄一次澆水/施肥：totalActions+1, totalMoney+60, availableMoney+60
export function recordAction(child: ChildName, type: 'water' | 'fertilize'): ChildData

// 提領金額：availableMoney -= amount（不可負數，不影響 totalMoney）
// 回傳 { success: boolean, updatedData: ChildData }
export function withdrawMoney(child: ChildName, amount: number): { success: boolean; updatedData: ChildData }
```

> ⚠️ **關鍵設計**：`totalMoney` 永遠只增不減。所有解鎖判斷（植物階段、鳥巢、樹下動物）均使用 `totalMoney`。提領只影響 `availableMoney`，不影響任何成就進度。

---

## 2. 遊戲邏輯（lib/gameData.ts）

### 植物設定

```typescript
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
    monkeyFruit: 'apple',   // 提領時猴子拔蘋果
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
    monkeyFruit: 'orange',  // 提領時猴子拔橘子
  },
};
```

### 生長階段計算

```typescript
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

export function getCurrentStage(child: ChildName, totalActions: number): GrowthStage
export function getActionsToNextStage(stage: GrowthStage, totalActions: number): number
export function getStageProgress(stage: GrowthStage, totalActions: number): number // 0–1
```

### 鳥巢解鎖計算

```typescript
export const NEST_UNLOCK_MONEY = 600;

export interface EggState {
  index: 0 | 1 | 2;
  state: 'egg' | 'crack' | 'hatch' | 'chick';
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
export function getEggStates(totalMoney: number): EggState[]
export function isNestUnlocked(totalMoney: number): boolean
```

### 樹下動物計算

```typescript
export const ANIMAL_UNLOCK_INTERVAL = 300; // 每 300 元出現一隻
export const ANIMAL_MAX_COUNT = 5;

// 回傳目前應出現的動物數量（0–5）
// Math.min(Math.floor(totalMoney / 300), 5)
export function getAnimalCount(totalMoney: number): number

// 各隻動物有固定 seed，確保動畫 offset 穩定不跳動
export function getAnimalAnimationSeed(index: number): number
```

---

## 3. 元件規格

### PlantStage.tsx
```typescript
interface PlantStageProps {
  child: ChildName;
  stage: 1 | 2 | 3 | 4 | 5;
  isAnimating: boolean;
}
```
- 內聯 SVG，10 個組合（2 種植物 × 5 階段）
- `isAnimating=true`：growBounce 800ms
- 持續：plantFloat 3s loop

### NestScene.tsx
```typescript
interface NestSceneProps {
  child: ChildName;
  totalMoney: number;
  isNewlyUnlocked: boolean; // 剛剛解鎖時觸發 drop-in 動畫
}
```
- `isNestUnlocked(totalMoney)` 為 false 時不渲染
- 包含：鳥巢 SVG、3 顆蛋（按 getEggStates 狀態）、三隻成鳥
- 三隻鳥顏色依 DESIGN.md 各角色配色實作，各有獨立動畫 loop

### GroundAnimals.tsx
```typescript
interface GroundAnimalsProps {
  child: ChildName;
  totalMoney: number;
}
```
- `getAnimalCount(totalMoney)` 決定顯示幾隻
- 每隻有獨立動畫狀態機（idle / move / action）
- 各隻動畫 offset 用 `getAnimalAnimationSeed(index)` 錯開
- Gisele：狐獴 SVG（直立、奔跑、挖地）
- Fiona：兔子 SVG（靜止、跳躍、移動、豎耳）

### MoneyDisplay.tsx
```typescript
interface MoneyDisplayProps {
  totalMoney: number;
  availableMoney: number;
  childName: string;
  isEarning: boolean;     // 剛賺入 → moneyPop
  isWithdrawing: boolean; // 剛提領 → moneyDrop
  onWithdrawClick: () => void;
}
```

### WithdrawModal.tsx
```typescript
interface WithdrawModalProps {
  isOpen: boolean;
  availableMoney: number;
  child: ChildName;
  onConfirm: (amount: number) => void;
  onCancel: () => void;
}
```
- 數字輸入框（type="number"，min=1，max=availableMoney）
- 即時驗證：超出餘額時邊框變紅 + 「金額不夠哦！」
- 確認後關閉 Modal，觸發 MonkeyWithdrawAnim

### MonkeyWithdrawAnim.tsx
```typescript
interface MonkeyWithdrawAnimProps {
  isVisible: boolean;
  child: ChildName;       // 決定猴子拔蘋果或橘子
  amount: number;         // 顯示「-XXX 元 💸」
  onComplete: () => void; // 動畫結束後回調
}
```
- 全螢幕 overlay（z-index 最高）
- 動畫 timeline（共 3.2s）：
  1. 0.0s：猴子從右側藤蔓盪入
  2. 0.8s：伸手摘果實（果實從樹 SVG 消失）
  3. 1.5s：舉起果實 + 「-XXX 元 💸」飄字
  4. 2.2s：咬一口 + 😋 表情泡泡
  5. 3.0s：盪回右側消失
  6. 3.2s：觸發 onComplete，overlay 淡出

### ActionButtons.tsx
```typescript
interface ActionButtonsProps {
  onAction: (type: 'water' | 'fertilize') => void;
  isDisabled: boolean;
}
```
- 主觸發鈕「✏️ 我今天寫完中文字了！」
- 點擊後 slide-down 展開兩個圓形按鈕：💧 澆水、🌿 施肥

### GrowthBar.tsx
```typescript
interface GrowthBarProps {
  currentStage: GrowthStage;
  totalActions: number;
  themeColor: string;
}
```

### CelebrationEffect.tsx
```typescript
interface CelebrationEffectProps {
  isVisible: boolean;
  child: ChildName;
  isSpecial?: boolean; // 鳥巢解鎖 / 動物首次出現時用特別版
  onComplete: () => void;
}
```
- 25 個粒子，隨機位置大小方向
- Gisele：🍎 ⭐ 🌟 紅色小圓
- Fiona：🍊 ⭐ 🌟 橘色小圓
- `isSpecial=true`：粒子數加倍（50個）+ 持續 3 秒

---

## 4. 頁面規格

### app/page.tsx（首頁）

- 標題「🌱 吉福種樹花園」
- 兩個角色卡片並排
- 卡片顯示：植物 emoji + 孩子名字 + 植物名稱 + 第幾階 + 累積金額
- Gisele 卡片：蘋果紅主題
- Fiona 卡片：橘子橙主題

---

### app/garden/[child]/page.tsx（花園頁面）

**狀態管理**：
```typescript
const [childData, setChildData] = useState<ChildData>()
const [isAnimating, setIsAnimating] = useState(false)
const [showActions, setShowActions] = useState(false)
const [showCelebration, setShowCelebration] = useState(false)
const [isSpecialCelebration, setIsSpecialCelebration] = useState(false)
const [justLeveledUp, setJustLeveledUp] = useState(false)
const [isNestNewlyUnlocked, setIsNestNewlyUnlocked] = useState(false)
const [newAnimalCount, setNewAnimalCount] = useState(0) // 新增的動物隻數
const [showWithdrawModal, setShowWithdrawModal] = useState(false)
const [showMonkeyAnim, setShowMonkeyAnim] = useState(false)
const [withdrawAmount, setWithdrawAmount] = useState(0)
const [isEarning, setIsEarning] = useState(false)
const [isWithdrawing, setIsWithdrawing] = useState(false)
```

**行動流程（澆水/施肥）**：
1. 點「✏️ 我今天寫完中文字了！」→ showActions=true
2. 選擇行動類型
3. 記錄前的 totalMoney = prevMoney
4. `recordAction(child, type)` → 更新 localStorage
5. 檢查：是否升階？是否新解鎖鳥巢？是否新增動物？
6. `setIsAnimating(true)`，`setIsEarning(true)`
7. 若解鎖新事物：`setIsSpecialCelebration(true)`
8. 觸發 CelebrationEffect
9. 800ms 後 setIsAnimating(false)，2s 後 setShowCelebration(false)
10. showActions=false

**提領流程**：
1. 點「💸 提領」→ setShowWithdrawModal(true)
2. 輸入金額並確認
3. `withdrawMoney(child, amount)`
4. setWithdrawAmount(amount)，setShowMonkeyAnim(true)，setIsWithdrawing(true)
5. 關閉 Modal
6. 猴子動畫播放（3.2s）
7. onComplete → setShowMonkeyAnim(false)，setIsWithdrawing(false)
8. 零用錢顯示以 moneyDrop 動畫更新

**升階提示模態**：
- 內容：「🎉 [植物名稱] 長大了！進入第X階：[階段名稱]」
- 3秒後自動消失

**解鎖提示**：
- 鳥巢：「🪺 有鳥兒來築巢了！這棵樹長得夠大了 ✨」（4秒）
- 第 N 隻動物：「🦦/🐰 有新朋友來了！」（3秒）

---

## 5. 路由與導航

```
/                 → 首頁
/garden/gisele    → Gisele 花園
/garden/fiona     → Fiona 花園
```

---

## 6. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
}
module.exports = nextConfig
```

---

## 7. 部署（Vercel）

1. `git init && git add . && git commit -m "init: gifted garden"`
2. 推送至 GitHub
3. Vercel 連結 repo → 自動部署
4. 孩子用手機打開網址即可使用

---

## 8. package.json

```json
{
  "name": "gifted-garden",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

---

## 9. 完整解鎖時間軸（以 totalMoney 計算）

| totalMoney | 事件 |
|-----------|------|
| 0 元 | 遊戲開始，種子發芽 🌱 |
| 180 元 | 植物進入第 2 階：幼苗 🌿 |
| 300 元 | 🦦/🐰 第 1 隻動物出現 |
| 360 元 | 植物進入第 3 階：小樹 🌳 |
| 600 元 | 🪺 鳥巢降落！3 顆蛋出現，3 隻成鳥到來；第 2 隻動物出現 |
| 600 元 | 植物進入第 4 階：大樹開花 🌼 |
| 720 元 | 第 1 顆蛋出現裂縫 🥚→裂縫 |
| 840 元 | 第 1 顆破殼 🐣 |
| 900 元 | 第 3 隻動物出現 |
| 960 元 | 第 1 顆完全孵化 🐥，第 2 顆出現裂縫 |
| 900 元 | 植物進入第 5 階：豐收結果 🍎/🍊 |
| 1080 元 | 第 2 顆破殼 🐣 |
| 1200 元 | 第 2 顆孵化 🐥，第 3 顆裂縫；第 4 隻動物出現 |
| 1320 元 | 第 3 顆破殼 🐣 |
| 1440 元 | 三隻雛鳥全孵化 🐥🐥🐥 |
| 1500 元 | 第 5 隻動物出現（最終狀態） |

---

## 10. 未來可擴充方向（不在本次 scope）

- 音效：澆水聲、施肥聲、慶祝音樂、動物叫聲
- PWA：加入主畫面 icon，離線可用
- 連續天數獎勵：連續 7 天種樹解鎖特殊外觀
- 父母端：/parent 路由查看歷史紀錄
- 植物重置：豐收後可重新種植，累積「收穫勛章」
