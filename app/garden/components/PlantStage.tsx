import { ChildName } from '@/lib/storage';

interface PlantStageProps {
  child: ChildName;
  stage: 1 | 2 | 3 | 4 | 5;
  isAnimating: boolean;
}

export default function PlantStage({ child, stage, isAnimating }: PlantStageProps) {
  const animationClass = isAnimating ? 'animate-growBounce' : '';

  return (
    <div className={`animate-plantFloat ${animationClass}`}>
      {child === 'gisele' ? (
        <AppleTreeStage stage={stage} />
      ) : (
        <OrangeTreeStage stage={stage} />
      )}
    </div>
  );
}

function AppleTreeStage({ stage }: { stage: 1 | 2 | 3 | 4 | 5 }) {
  switch (stage) {
    case 1:
      return <AppleStage1 />;
    case 2:
      return <AppleStage2 />;
    case 3:
      return <AppleStage3 />;
    case 4:
      return <AppleStage4 />;
    case 5:
      return <AppleStage5 />;
  }
}

function OrangeTreeStage({ stage }: { stage: 1 | 2 | 3 | 4 | 5 }) {
  switch (stage) {
    case 1:
      return <OrangeStage1 />;
    case 2:
      return <OrangeStage2 />;
    case 3:
      return <OrangeStage3 />;
    case 4:
      return <OrangeStage4 />;
    case 5:
      return <OrangeStage5 />;
  }
}

// 蘋果樹階段 1：種子發芽
function AppleStage1() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      {/* 土壤線 */}
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 種子 */}
      <ellipse cx="140" cy="290" rx="12" ry="15" fill="#6B4423" />
      <ellipse cx="140" cy="288" rx="4" ry="5" fill="#8B6343" opacity="0.6" />

      {/* 嫩芽 */}
      <path
        d="M 140 290 Q 135 270 138 255"
        stroke="#7AC74F"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="136" cy="255" rx="6" ry="10" fill="#7AC74F" transform="rotate(-20 136 255)" />
      <ellipse cx="141" cy="260" rx="5" ry="8" fill="#7AC74F" transform="rotate(15 141 260)" />
    </svg>
  );
}

// 蘋果樹階段 2：幼苗
function AppleStage2() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 細樹幹 */}
      <rect x="137" y="220" width="6" height="60" fill="#8B6343" rx="3" />

      {/* 3-4 片心形葉子 */}
      <g>
        {/* 左葉 */}
        <path
          d="M 130 240 Q 115 235 110 245 Q 110 255 120 258 Q 115 245 130 240 Z"
          fill="#4A7C59"
        />
        {/* 右葉 */}
        <path
          d="M 150 230 Q 165 225 170 235 Q 170 245 160 248 Q 165 235 150 230 Z"
          fill="#4A7C59"
        />
        {/* 上左葉 */}
        <path
          d="M 135 215 Q 125 208 118 215 Q 115 225 125 230 Q 120 215 135 215 Z"
          fill="#5A8C69"
        />
        {/* 上右葉 */}
        <path
          d="M 145 210 Q 155 203 162 210 Q 165 220 155 225 Q 160 210 145 210 Z"
          fill="#5A8C69"
        />
      </g>
    </svg>
  );
}

// 蘋果樹階段 3：小樹
function AppleStage3() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 樹幹 */}
      <rect x="132" y="180" width="16" height="100" fill="#7A5C42" rx="8" />
      <rect x="135" y="180" width="10" height="100" fill="#8B6343" rx="5" />

      {/* 圓形樹冠 */}
      <ellipse cx="140" cy="120" rx="70" ry="65" fill="#4A7C59" opacity="0.9" />
      <ellipse cx="120" cy="140" rx="50" ry="48" fill="#5A8C69" opacity="0.8" />
      <ellipse cx="160" cy="135" rx="55" ry="50" fill="#5A8C69" opacity="0.8" />
      <ellipse cx="140" cy="105" rx="45" ry="42" fill="#6AA279" opacity="0.7" />

      {/* 葉子細節 */}
      <circle cx="110" cy="130" r="15" fill="#4A7C59" opacity="0.6" />
      <circle cx="170" cy="125" r="18" fill="#4A7C59" opacity="0.6" />
      <circle cx="140" cy="95" r="20" fill="#5A8C69" opacity="0.7" />
    </svg>
  );
}

// 蘋果樹階段 4：開花
function AppleStage4() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 樹幹 */}
      <rect x="130" y="160" width="20" height="120" fill="#7A5C42" rx="10" />
      <rect x="133" y="160" width="14" height="120" fill="#8B6343" rx="7" />

      {/* 樹枝 */}
      <path d="M 142 200 Q 100 190 85 200" stroke="#7A5C42" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 142 200 Q 180 190 195 200" stroke="#7A5C42" strokeWidth="8" fill="none" strokeLinecap="round" />

      {/* 茂密樹冠 */}
      <ellipse cx="140" cy="110" rx="80" ry="70" fill="#4A7C59" opacity="0.9" />
      <ellipse cx="110" cy="130" rx="60" ry="55" fill="#5A8C69" opacity="0.8" />
      <ellipse cx="170" cy="125" rx="65" ry="58" fill="#5A8C69" opacity="0.8" />
      <ellipse cx="140" cy="90" rx="50" ry="45" fill="#6AA279" opacity="0.7" />

      {/* 白色蘋果花 */}
      {[
        [120, 120], [160, 115], [140, 100], [130, 140], [170, 140],
        [110, 105], [175, 110], [145, 130]
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#FFFFFF" opacity="0.95" />
          <circle cx={x} cy={y} r="3" fill="#F5C842" opacity="0.8" />
          {/* 5 片花瓣 */}
          {[0, 72, 144, 216, 288].map((angle, j) => (
            <ellipse
              key={j}
              cx={x + Math.cos((angle * Math.PI) / 180) * 6}
              cy={y + Math.sin((angle * Math.PI) / 180) * 6}
              rx="3.5"
              ry="3"
              fill="#FFFFFF"
              opacity="0.9"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

// 蘋果樹階段 5：豐收（結蘋果）
function AppleStage5() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 樹幹 */}
      <rect x="130" y="150" width="20" height="130" fill="#7A5C42" rx="10" />
      <rect x="133" y="150" width="14" height="130" fill="#8B6343" rx="7" />

      {/* 樹枝 */}
      <path d="M 142 180 Q 95 170 80 185" stroke="#7A5C42" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M 142 180 Q 185 170 200 185" stroke="#7A5C42" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M 140 200 Q 110 195 95 205" stroke="#7A5C42" strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* 豐盛樹冠 */}
      <ellipse cx="140" cy="105" rx="85" ry="75" fill="#4A7C59" opacity="0.9" />
      <ellipse cx="105" cy="125" rx="65" ry="60" fill="#5A8C69" opacity="0.85" />
      <ellipse cx="175" cy="120" rx="70" ry="62" fill="#5A8C69" opacity="0.85" />
      <ellipse cx="140" cy="85" rx="55" ry="50" fill="#6AA279" opacity="0.75" />

      {/* 8 顆紅蘋果 - 分散排列，避開鳥巢區域 */}
      {[
        [85, 100], [160, 95], [140, 75], [100, 145], [175, 140],
        [75, 130], [150, 150], [115, 85]
      ].map(([x, y], i) => (
        <g key={i}>
          {/* 蘋果主體 */}
          <ellipse cx={x} cy={y} rx="11" ry="12" fill="#D94F3D" />
          <ellipse cx={x} cy={y} rx="9" ry="10" fill="#E85D4A" />
          {/* 高光 */}
          <ellipse cx={x - 3} cy={y - 3} rx="3" ry="4" fill="#FFAAAA" opacity="0.6" />
          {/* 蘋果梗 */}
          <line x1={x} y1={y - 12} x2={x} y2={y - 16} stroke="#6B4423" strokeWidth="2" />
          {/* 小葉子 */}
          <ellipse cx={x + 2} cy={y - 15} rx="4" ry="2.5" fill="#4A7C59" transform={`rotate(20 ${x + 2} ${y - 15})`} />
        </g>
      ))}
    </svg>
  );
}

// 橘子樹階段 1：種子發芽
function OrangeStage1() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 種子 */}
      <ellipse cx="140" cy="290" rx="11" ry="14" fill="#B8863D" />
      <ellipse cx="140" cy="288" rx="4" ry="5" fill="#D4A96A" opacity="0.5" />

      {/* 嫩黃色芽 */}
      <path
        d="M 140 290 Q 136 272 139 258"
        stroke="#A8C857"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="137" cy="258" rx="5.5" ry="9" fill="#B8D86F" transform="rotate(-18 137 258)" />
      <ellipse cx="142" cy="262" rx="5" ry="7.5" fill="#B8D86F" transform="rotate(12 142 262)" />
    </svg>
  );
}

// 橘子樹階段 2：幼苗
function OrangeStage2() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 細樹幹 */}
      <rect x="137" y="220" width="6" height="60" fill="#8B6343" rx="3" />

      {/* 橢圓深綠葉子 */}
      <g>
        <ellipse cx="120" cy="245" rx="18" ry="10" fill="#3A6B49" transform="rotate(-25 120 245)" />
        <ellipse cx="160" cy="235" rx="20" ry="11" fill="#3A6B49" transform="rotate(20 160 235)" />
        <ellipse cx="130" cy="220" rx="16" ry="9" fill="#4A7C59" transform="rotate(-15 130 220)" />
        <ellipse cx="150" cy="215" rx="17" ry="10" fill="#4A7C59" transform="rotate(18 150 215)" />
        {/* 中脈線 */}
        <line x1="120" y1="240" x2="120" y2="250" stroke="#2A5B39" strokeWidth="1" opacity="0.4" />
        <line x1="160" y1="230" x2="160" y2="240" stroke="#2A5B39" strokeWidth="1" opacity="0.4" />
      </g>
    </svg>
  );
}

// 橘子樹階段 3：小樹（圓錐形樹冠）
function OrangeStage3() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 樹幹 */}
      <rect x="132" y="180" width="16" height="100" fill="#7A5C42" rx="8" />
      <rect x="135" y="180" width="10" height="100" fill="#8B6343" rx="5" />

      {/* 圓錐形樹冠（橘子樹特徵）*/}
      <ellipse cx="140" cy="140" rx="65" ry="60" fill="#3A6B49" opacity="0.9" />
      <ellipse cx="140" cy="120" rx="58" ry="52" fill="#4A7C59" opacity="0.85" />
      <ellipse cx="140" cy="100" rx="48" ry="45" fill="#5A8C69" opacity="0.8" />
      <ellipse cx="140" cy="85" rx="35" ry="32" fill="#6AA279" opacity="0.75" />

      {/* 深綠有光澤的葉子層 */}
      <circle cx="115" cy="130" r="18" fill="#3A6B49" opacity="0.7" />
      <circle cx="165" cy="125" r="20" fill="#3A6B49" opacity="0.7" />
      <circle cx="140" cy="110" r="22" fill="#4A7C59" opacity="0.6" />

      {/* 光澤高光 */}
      <ellipse cx="125" cy="115" rx="8" ry="6" fill="#7AC285" opacity="0.3" />
      <ellipse cx="155" cy="120" rx="10" ry="7" fill="#7AC285" opacity="0.3" />
    </svg>
  );
}

// 橘子樹階段 4：開花（橘花）
function OrangeStage4() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 樹幹 */}
      <rect x="130" y="160" width="20" height="120" fill="#7A5C42" rx="10" />
      <rect x="133" y="160" width="14" height="120" fill="#8B6343" rx="7" />

      {/* 樹枝 */}
      <path d="M 142 195 Q 100 185 85 195" stroke="#7A5C42" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 142 195 Q 180 185 195 195" stroke="#7A5C42" strokeWidth="8" fill="none" strokeLinecap="round" />

      {/* 茂密錐形樹冠 */}
      <ellipse cx="140" cy="115" rx="78" ry="68" fill="#3A6B49" opacity="0.9" />
      <ellipse cx="110" cy="130" rx="62" ry="56" fill="#4A7C59" opacity="0.85" />
      <ellipse cx="170" cy="125" rx="64" ry="57" fill="#4A7C59" opacity="0.85" />
      <ellipse cx="140" cy="95" rx="52" ry="48" fill="#5A8C69" opacity="0.8" />

      {/* 白色橘花（帶香氣感）*/}
      {[
        [118, 118], [162, 113], [140, 98], [128, 138], [172, 135],
        [108, 108], [178, 115], [148, 128]
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7.5" fill="#FFFEF8" opacity="0.95" />
          <circle cx={x} cy={y} r="2.5" fill="#F5E6A0" opacity="0.9" />
          {/* 4 片花瓣（橘花特徵）*/}
          {[0, 90, 180, 270].map((angle, j) => (
            <ellipse
              key={j}
              cx={x + Math.cos((angle * Math.PI) / 180) * 5.5}
              cy={y + Math.sin((angle * Math.PI) / 180) * 5.5}
              rx="3.2"
              ry="2.8"
              fill="#FFFEF8"
              opacity="0.92"
            />
          ))}
          {/* 香氣線（細微）*/}
          <path
            d={`M ${x} ${y - 10} Q ${x + 3} ${y - 15} ${x + 1} ${y - 18}`}
            stroke="#F5E6A0"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />
        </g>
      ))}
    </svg>
  );
}

// 橘子樹階段 5：豐收（結橘子）
function OrangeStage5() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-auto max-w-xs mx-auto">
      <line x1="0" y1="280" x2="280" y2="280" stroke="#8B5E3C" strokeWidth="3" />

      {/* 樹幹 */}
      <rect x="130" y="150" width="20" height="130" fill="#7A5C42" rx="10" />
      <rect x="133" y="150" width="14" height="130" fill="#8B6343" rx="7" />

      {/* 樹枝 */}
      <path d="M 142 175 Q 95 165 80 180" stroke="#7A5C42" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M 142 175 Q 185 165 200 180" stroke="#7A5C42" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M 140 195 Q 110 190 95 200" stroke="#7A5C42" strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* 豐盛錐形樹冠 */}
      <ellipse cx="140" cy="110" rx="82" ry="72" fill="#3A6B49" opacity="0.9" />
      <ellipse cx="105" cy="128" rx="66" ry="58" fill="#4A7C59" opacity="0.87" />
      <ellipse cx="175" cy="123" rx="68" ry="60" fill="#4A7C59" opacity="0.87" />
      <ellipse cx="140" cy="88" rx="56" ry="50" fill="#5A8C69" opacity="0.8" />

      {/* 8 顆橙黃橘子 - 分散排列 */}
      {[
        [93, 103], [177, 98], [140, 83], [108, 138], [188, 133],
        [83, 123], [165, 143], [120, 93]
      ].map(([x, y], i) => (
        <g key={i}>
          {/* 橘子主體 */}
          <circle cx={x} cy={y} r="11" fill="#F07B2A" />
          <circle cx={x} cy={y} r="9.5" fill="#FF8C3A" />
          {/* 橘皮質感（細點）*/}
          {[...Array(8)].map((_, j) => (
            <circle
              key={j}
              cx={x + (Math.random() - 0.5) * 12}
              cy={y + (Math.random() - 0.5) * 12}
              r="0.5"
              fill="#E07020"
              opacity="0.4"
            />
          ))}
          {/* 高光 */}
          <ellipse cx={x - 3.5} cy={y - 3.5} rx="3.5" ry="4.5" fill="#FFCC88" opacity="0.5" />
          {/* 橘蒂 */}
          <circle cx={x} cy={y - 11} r="2.5" fill="#6B8E3D" />
          <line x1={x} y1={y - 11} x2={x} y2={y - 14} stroke="#6B4423" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}
