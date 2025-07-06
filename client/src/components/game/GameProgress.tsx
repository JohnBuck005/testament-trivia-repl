interface GameProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function GameProgress({
  currentQuestion,
  totalQuestions
}: GameProgressProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const bibleVerses = [
    "Trust in the Lord with all your heart - Proverbs 3:5",
    "Be strong and courageous - Joshua 1:9",
    "I can do all things through Christ - Philippians 4:13",
    "The Lord is my shepherd - Psalm 23:1",
    "Walk by faith, not by sight - 2 Corinthians 5:7",
    "God is love - 1 John 4:8",
    "Seek first the kingdom of God - Matthew 6:33",
    "Perfect love casts out fear - 1 John 4:18"
  ];

  const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];

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
      <div className="text-center mt-2 text-xs text-yellow-300/80 italic font-light">
        "{randomVerse}"
      </div>
    </div>
  );
}
