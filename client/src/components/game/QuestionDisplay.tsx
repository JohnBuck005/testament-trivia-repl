import { type Question } from "@shared/schema";

interface QuestionDisplayProps {
  question: Question;
}

export default function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className="px-4 mb-6">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-center leading-relaxed">
          {question.text}
        </h2>
      </div>
    </div>
  );
}
