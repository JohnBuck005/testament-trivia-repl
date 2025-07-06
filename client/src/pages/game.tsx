import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import GameHeader from "@/components/game/GameHeader";
import PlayerStats from "@/components/game/PlayerStats";
import QuestionDisplay from "@/components/game/QuestionDisplay";
import AnswerOptions from "@/components/game/AnswerOptions";
import GameHelpers from "@/components/game/GameHelpers";
import GameProgress from "@/components/game/GameProgress";
import FloatingElements from "@/components/game/FloatingElements";
import { type Question, type GameState } from "@shared/schema";

const PLAYER_ID = "player-1"; // In a real app, this would come from auth
const QUESTIONS_PER_GAME = 10;
const QUESTION_TIME_LIMIT = 15;

export default function Game() {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIME_LIMIT);
  const [playerScore, setPlayerScore] = useState(0);
  const [abrahamScore, setAbrahamScore] = useState(0);
  const [abrahamTitle, setAbrahamTitle] = useState("Desert Walker");
  const [helpersUsed, setHelpersUsed] = useState({
    askAdam: false,
    askEve: false,
    skipsUsed: 0
  });

  // Fetch questions for the game
  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ["/api/questions/random/" + QUESTIONS_PER_GAME],
    staleTime: Infinity, // Questions don't change during game
  });

  // Timer effect
  useEffect(() => {
    if (isAnswered || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isAnswered]);

  // Abraham response mutation
  const abrahamResponseMutation = useMutation({
    mutationFn: async ({ isCorrect, questionText }: { isCorrect: boolean; questionText: string }) => {
      const response = await fetch("/api/abraham/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCorrect, questionText }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setAbrahamTitle(data.title);
    },
  });

  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    
    // Abraham gets points for player timeout
    setAbrahamScore(prev => prev + 10);
    
    // Get Abraham's witty response
    const currentQuestion = questions?.[currentQuestionIndex];
    if (currentQuestion) {
      abrahamResponseMutation.mutate({
        isCorrect: false,
        questionText: currentQuestion.text
      });
    }

    toast({
      title: "Time's up!",
      description: "Abraham scores this round.",
      variant: "destructive",
    });

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const currentQuestion = questions?.[currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswerIndex;
    
    if (isCorrect) {
      setPlayerScore(prev => prev + Math.max(10, timeRemaining));
      toast({
        title: "Congratulations!",
        description: `+${Math.max(10, timeRemaining)} points`,
      });
    } else {
      setAbrahamScore(prev => prev + 15);
      toast({
        title: "Incorrect",
        description: "Abraham scores this round.",
        variant: "destructive",
      });
    }

    // Get Abraham's response
    abrahamResponseMutation.mutate({
      isCorrect,
      questionText: currentQuestion.text
    });

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS_PER_GAME - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeRemaining(QUESTION_TIME_LIMIT);
      // Reset helpers for new question
      setHelpersUsed(prev => ({
        ...prev,
        askAdam: false,
        askEve: false
      }));
    } else {
      // Game over
      toast({
        title: "Game Over!",
        description: `Final Score - You: ${playerScore}, Abraham: ${abrahamScore}`,
      });
    }
  };

  const useAskAdam = () => {
    if (helpersUsed.askAdam || isAnswered) return;
    
    setHelpersUsed(prev => ({ ...prev, askAdam: true }));
    
    const hints = [
      "Think about the patriarchs...",
      "This one is written in Genesis...", 
      "The answer lies in the Old Testament...",
      "Remember the stories from Sunday school...",
      "The desert wanderers know this one..."
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    toast({
      title: "Adam's Wisdom",
      description: randomHint,
    });
  };

  const useAskEve = () => {
    if (helpersUsed.askEve || isAnswered) return;
    
    setHelpersUsed(prev => ({ ...prev, askEve: true }));
    
    toast({
      title: "Eve's Insight",
      description: "Two wrong answers have been eliminated!",
    });
  };

  const skipQuestion = () => {
    if (helpersUsed.skipsUsed >= 3) {
      toast({
        title: "No skips left",
        description: "You've used all your skips!",
        variant: "destructive",
      });
      return;
    }
    
    setHelpersUsed(prev => ({ ...prev, skipsUsed: prev.skipsUsed + 1 }));
    nextQuestion();
    
    toast({
      title: "Question skipped",
      description: `${3 - helpersUsed.skipsUsed - 1} skips remaining`,
    });
  };

  if (questionsLoading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="glass-panel rounded-3xl p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-xl font-medium">Loading Testament Trivia...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions?.[currentQuestionIndex];
  const playerLevel = Math.floor(playerScore / 100) + 1;

  return (
    <div className="min-h-screen cosmic-bg text-white overflow-x-hidden relative">
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <GameHeader />
        
        <PlayerStats
          playerScore={playerScore}
          playerLevel={playerLevel}
          abrahamScore={abrahamScore}
          abrahamTitle={abrahamTitle}
          timeRemaining={timeRemaining}
        />

        <div className="mb-4">
          <GameProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS_PER_GAME}
          />
        </div>

        {currentQuestion && (
          <>
            <QuestionDisplay question={currentQuestion} />
            
            <AnswerOptions
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              onAnswerSelect={handleAnswerSelect}
              helpersUsed={helpersUsed}
            />
          </>
        )}

        <GameHelpers
          helpersUsed={helpersUsed}
          onAskAdam={useAskAdam}
          onAskEve={useAskEve}
          onSkip={skipQuestion}
          isAnswered={isAnswered}
        />

        {/* Bible Verse */}
        <div className="text-center mt-auto mb-20">
          <p className="text-yellow-300/80 italic text-sm font-light">
            "Trust in the Lord with all your heart"
          </p>
          <p className="text-yellow-300/60 text-xs mt-1">
            Proverbs 3:5
          </p>
        </div>
      </div>
    </div>
  );
}
