import { type Question } from "@shared/schema";
import { cn } from "@/lib/utils";

interface AnswerOptionsProps {
  question: Question;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswerSelect: (index: number) => void;
  helpersUsed: {
    askAdam: boolean;
    askEve: boolean;
    skipsUsed: number;
  };
}

export default function AnswerOptions({
  question,
  selectedAnswer,
  isAnswered,
  onAnswerSelect,
  helpersUsed
}: AnswerOptionsProps) {
  // For Ask Eve helper - randomly hide 2 wrong answers
  const hiddenAnswers = new Set<number>();
  if (helpersUsed.askEve && !isAnswered) {
    const wrongAnswers = question.answers
      .map((_, index) => index)
      .filter(index => index !== question.correctAnswerIndex);
    
    // Randomly select 2 wrong answers to hide
    const shuffled = wrongAnswers.sort(() => 0.5 - Math.random());
    hiddenAnswers.add(shuffled[0]);
    hiddenAnswers.add(shuffled[1]);
  }

  const getAnswerState = (index: number) => {
    if (!isAnswered) return "";
    if (index === question.correctAnswerIndex) return "correct";
    if (index === selectedAnswer) return "incorrect";
    return "";
  };

  return (
    <div className="px-4 mb-6 flex-1">
      <div className="grid grid-cols-1 gap-4">
        {question.answers.map((answer, index) => {
          const isHidden = hiddenAnswers.has(index);
          const answerState = getAnswerState(index);
          
          if (isHidden) {
            return (
              <div key={index} className="h-16 rounded-2xl border border-dashed border-white/20 flex items-center justify-center opacity-50">
                <span className="text-white/50 italic">Eliminated by Eve</span>
              </div>
            );
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={isAnswered}
              className={cn(
                "answer-card rounded-2xl p-4 text-left font-medium text-lg transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed",
                answerState === "correct" && "correct",
                answerState === "incorrect" && "incorrect"
              )}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </div>
  );
}
