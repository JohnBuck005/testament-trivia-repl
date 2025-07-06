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
            Sharpen your sword of truth
          </p>
        </div>

        {/* Game Mode Cards */}
        <div className="w-full max-w-md space-y-6 mb-8 px-4">
          {/* Solo Mode */}
          <Link href="/game">
            <div className="glass-card home-card-spacing rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-2xl hover:animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Crown className="text-white" size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">Solo Challenge</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Face off against Abraham in biblical trivia
                  </p>
                  <p className="text-yellow-300/60 text-xs mt-1 italic">
                    Faith level: Legendary
                  </p>
                </div>
                <Play className="text-yellow-400 group-hover:text-yellow-300 transition-colors" size={22} />
              </div>
            </div>
          </Link>

          {/* Versus Mode */}
          <Link href="/versus">
            <div className="glass-card home-card-spacing rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-2xl hover:animate-bounce">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Users className="text-white" size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">Versus Mode</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Challenge friends in 1v1 matches
                  </p>
                  <p className="text-yellow-300/60 text-xs mt-1 italic">
                    Thou shalt not lose
                  </p>
                </div>
                <Play className="text-yellow-400 group-hover:text-yellow-300 transition-colors" size={22} />
              </div>
            </div>
          </Link>

          {/* Bible Knowledge */}
          <Link href="/knowledge">
            <div className="glass-card home-card-spacing rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-2xl hover:animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <Book className="text-white" size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-white">Bible Knowledge</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Deep dive into saints & sinners, floods & plagues. It's fun, we promise 🕊📚
                  </p>
                  <p className="text-yellow-300/60 text-xs mt-1 italic">
                    Powered by scrolls, prophets, and parables
                  </p>
                </div>
                <Play className="text-yellow-400 group-hover:text-yellow-300 transition-colors" size={22} />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Line */}
        <div className="text-center mb-20">
          <p className="text-yellow-300/80 italic text-sm font-light">
            "Trust in the Lord… but also know your Scripture if you want to beat Abraham." 😉
          </p>
        </div>
      </div>
    </div>
  );
}