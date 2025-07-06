interface GameProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function GameProgress({
  currentQuestion,
  totalQuestions
}: GameProgressProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="px-4 mb-6">
      <div className="glass-card rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="text-center mt-2 text-sm text-white/70">
        Question {currentQuestion} of {totalQuestions}
      </div>
    </div>
  );
}
