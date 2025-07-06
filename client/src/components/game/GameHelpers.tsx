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
      <div className="flex justify-center space-x-3 max-w-sm mx-auto">
        {/* Ask Adam */}
        <div className="glass-card rounded-xl p-3 flex-1">
          <button
            onClick={onAskAdam}
            disabled={helpersUsed.askAdam || isAnswered}
            className={cn(
              "w-full flex flex-col items-center transition-all duration-300",
              helpersUsed.askAdam || isAnswered
                ? "text-gray-400 cursor-not-allowed opacity-50"
                : "text-yellow-300 hover:scale-105 hover:text-yellow-200"
            )}
          >
            <Lightbulb className="mb-1" size={20} />
            <span className="text-xs font-medium">Ask Adam</span>
          </button>
        </div>

        {/* Skip */}
        <div className="glass-card rounded-xl p-3 flex-1">
          <button
            onClick={onSkip}
            disabled={helpersUsed.skipsUsed >= 3 || isAnswered}
            className={cn(
              "w-full flex flex-col items-center transition-all duration-300",
              helpersUsed.skipsUsed >= 3 || isAnswered
                ? "text-gray-400 cursor-not-allowed opacity-50"
                : "text-purple-300 hover:scale-105 hover:text-purple-200"
            )}
          >
            <SkipForward className="mb-1" size={20} />
            <span className="text-xs font-medium">Skip ({3 - helpersUsed.skipsUsed})</span>
          </button>
        </div>

        {/* Ask Eve */}
        <div className="glass-card rounded-xl p-3 flex-1">
          <button
            onClick={onAskEve}
            disabled={helpersUsed.askEve || isAnswered}
            className={cn(
              "w-full flex flex-col items-center transition-all duration-300",
              helpersUsed.askEve || isAnswered
                ? "text-gray-400 cursor-not-allowed opacity-50"
                : "text-blue-300 hover:scale-105 hover:text-blue-200"
            )}
          >
            <Percent className="mb-1" size={20} />
            <span className="text-xs font-medium">Ask Eve</span>
          </button>
        </div>
      </div>
    </div>
  );
}
