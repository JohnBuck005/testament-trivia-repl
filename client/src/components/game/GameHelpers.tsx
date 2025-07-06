import { Lightbulb, Percent, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameHelpersProps {
  helpersUsed: {
    askAdam: boolean;
    askEve: boolean;
    skipsUsed: number;
  };
  onAskAdam: () => void;
  onAskEve: () => void;
  onSkip: () => void;
  isAnswered: boolean;
}

export default function GameHelpers({
  helpersUsed,
  onAskAdam,
  onAskEve,
  onSkip,
  isAnswered
}: GameHelpersProps) {
  return (
    <div className="px-4 mb-6">
      <div className="glass-panel rounded-2xl p-4">
        <div className="flex justify-center space-x-4">
          {/* Ask Adam (Hint) */}
          <button
            onClick={onAskAdam}
            disabled={helpersUsed.askAdam || isAnswered}
            className={cn(
              "glass-card rounded-xl px-4 py-3 flex items-center space-x-2 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
              helpersUsed.askAdam && "opacity-50"
            )}
          >
            <Lightbulb className="text-yellow-400" size={20} />
            <span className="font-medium">Ask Adam</span>
          </button>

          {/* Ask Eve (50:50) */}
          <button
            onClick={onAskEve}
            disabled={helpersUsed.askEve || isAnswered}
            className={cn(
              "glass-card rounded-xl px-4 py-3 flex items-center space-x-2 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
              helpersUsed.askEve && "opacity-50"
            )}
          >
            <Percent className="text-blue-400" size={20} />
            <span className="font-medium">Ask Eve</span>
          </button>

          {/* Skip */}
          <button
            onClick={onSkip}
            disabled={helpersUsed.skipsUsed >= 3}
            className={cn(
              "glass-card rounded-xl px-4 py-3 flex items-center space-x-2 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
              helpersUsed.skipsUsed >= 3 && "opacity-50"
            )}
          >
            <SkipForward className="text-purple-400" size={20} />
            <span className="font-medium">Skip ({3 - helpersUsed.skipsUsed})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
