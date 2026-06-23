interface MoneyDisplayProps {
  totalMoney: number;
  availableMoney: number;
  childName: string;
  isEarning: boolean;
  isWithdrawing: boolean;
  onWithdrawClick: () => void;
}

export default function MoneyDisplay({
  totalMoney,
  availableMoney,
  childName,
  isEarning,
  isWithdrawing,
  onWithdrawClick,
}: MoneyDisplayProps) {
  return (
    <div className="bg-gradient-to-br from-[#FFF8DC] to-[#FFF0C0] rounded-2xl p-6 shadow-lg border-2 border-sun/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-bark/60 mb-1">💰 累積零用錢</p>
          <p
            className={`text-5xl font-display font-black text-bark ${
              isEarning ? 'animate-moneyPop' : ''
            }`}
          >
            {totalMoney} 元
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div>
              <p className="text-xs text-bark/50">可提領</p>
              <p
                className={`text-2xl font-display font-bold text-leaf ${
                  isWithdrawing ? 'animate-moneyDrop' : ''
                }`}
              >
                {availableMoney} 元
              </p>
            </div>
            <button
              onClick={onWithdrawClick}
              className="ml-auto px-5 py-2.5 bg-orange text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-150 hover:bg-orange/90"
            >
              💸 提領
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
