import FloatingElements from "@/components/game/FloatingElements";

export default function Versus() {
  return (
    <div className="min-h-screen cosmic-bg text-white overflow-x-hidden relative">
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pb-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Versus Mode</h1>
          <p className="text-white/70 mb-8">
            Challenge friends in 1v1 biblical trivia matches
          </p>
          <div className="glass-card rounded-2xl p-8">
            <p className="text-yellow-300">Coming Soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}