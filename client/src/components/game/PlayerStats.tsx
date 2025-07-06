import { User, Crown } from "lucide-react";

interface PlayerStatsProps {
  playerScore: number;
  playerLevel: number;
  abrahamScore: number;
  abrahamTitle: string;
  timeRemaining: number;
}

export default function PlayerStats({
  playerScore,
  playerLevel,
  abrahamScore,
  abrahamTitle,
  timeRemaining
}: PlayerStatsProps) {
  const timerPercentage = (timeRemaining / 15) * 100;

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Player Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="avatar-halo absolute inset-0 rounded-full blur-sm"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-2 border-white/20">
              <User className="text-white text-xl" size={24} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">{playerScore}</div>
            <div className="level-badge text-sm font-semibold px-2 py-1 rounded-full inline-block">
              Faith Level {playerLevel}
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="relative">
          <div className="timer-glow w-20 h-20 glass-card rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-yellow-300">{timeRemaining}</span>
          </div>
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(251, 191, 36, 0.3)"
              strokeWidth="2"
              strokeDasharray={`${timerPercentage}, 100`}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
        </div>

        {/* Abraham Section */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold">{abrahamScore}</div>
            <div className="text-sm text-yellow-300 font-medium">{abrahamTitle}</div>
          </div>
          <div className="relative">
            <div className="avatar-halo absolute inset-0 rounded-full blur-sm"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full overflow-hidden border-2 border-white/20 flex items-center justify-center">
              <Crown className="text-amber-900 text-xl" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
