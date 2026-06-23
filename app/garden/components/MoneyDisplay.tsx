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
    <div className="bg-gradient-to-br from-[#FFFBF0] via-[#FFF8DC] to-[#FFF4C8] rounded-3xl p-7 shadow-xl border border-sun/20 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <p className="text-sm font-medium text-bark/70 tracking-wide">累積零用錢</p>
          </div>
          <p
            className={`text-6xl font-display font-black bg-gradient-to-r from-bark to-bark/80 bg-clip-text text-transparent mb-1 ${
              isEarning ? 'animate-moneyPop' : ''
            }`}
          >
            {totalMoney}
          </p>
          <p className="text-lg font-display font-bold text-bark/60 mb-4">元</p>

          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-bark/50 uppercase tracking-wider">可提領</p>
              <p
                className={`text-3xl font-display font-bold text-leaf ${
                  isWithdrawing ? 'animate-moneyDrop' : ''
                }`}
              >
                {availableMoney} <span className="text-xl text-bark/60">元</span>
              </p>
            </div>
            <button
              onClick={onWithdrawClick}
              className="px-6 py-3 bg-gradient-to-r from-orange to-orange/90 text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 hover:from-orange/90 hover:to-orange/80"
            >
              💸 提領
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
