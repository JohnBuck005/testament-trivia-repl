import { Play, Users, Book, Crown } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/Logo_1751810712162.png";
import FloatingElements from "@/components/game/FloatingElements";

export default function Home() {
  return (
    <div className="min-h-screen cosmic-bg text-white overflow-x-hidden relative">
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pb-20">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden">
            <img 
              src={logoPath} 
              alt="Testament Trivia Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4">
            Testament Trivia
          </h1>
          <p className="text-white/70 text-lg">
            Test your biblical knowledge and grow in faith
          </p>
        </div>

        {/* Game Mode Cards */}
        <div className="w-full max-w-md space-y-4 mb-8">
          {/* Solo Mode */}
          <Link href="/game">
            <div className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Crown className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Solo Challenge</h3>
                  <p className="text-white/70 text-sm">
                    Face off against Abraham in biblical trivia
                  </p>
                </div>
                <Play className="text-yellow-400" size={20} />
              </div>
            </div>
          </Link>

          {/* Versus Mode */}
          <Link href="/versus">
            <div className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Versus Mode</h3>
                  <p className="text-white/70 text-sm">
                    Challenge friends in 1v1 matches
                  </p>
                </div>
                <Play className="text-yellow-400" size={20} />
              </div>
            </div>
          </Link>

          {/* Bible Knowledge */}
          <Link href="/knowledge">
            <div className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Book className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">Bible Knowledge</h3>
                  <p className="text-white/70 text-sm">
                    Learn about biblical facts and people
                  </p>
                </div>
                <Play className="text-yellow-400" size={20} />
              </div>
            </div>
          </Link>
        </div>

        {/* Daily Verse */}
        <div className="text-center">
          <p className="text-yellow-300/80 italic text-sm font-light">
            "Trust in the Lord with all your heart and lean not on your own understanding" - Proverbs 3:5
          </p>
        </div>
      </div>
    </div>
  );
}