import { User, Settings, Trophy, Book } from "lucide-react";
import FloatingElements from "@/components/game/FloatingElements";

export default function Profile() {
  return (
    <div className="min-h-screen cosmic-bg text-white overflow-x-hidden relative">
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex flex-col px-4 pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Faith Seeker</h1>
          <p className="text-white/70">Faith Level 5</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
            <div className="text-xl font-bold">230</div>
            <div className="text-sm text-white/70">Total Score</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Book className="text-blue-400 mx-auto mb-2" size={24} />
            <div className="text-xl font-bold">15</div>
            <div className="text-sm text-white/70">Games Played</div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Settings className="mr-2" size={20} />
            Settings
          </h2>
          
          <div className="glass-card rounded-xl p-4 profile-settings-hover cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-white">Sound Effects</span>
              <div className="w-12 h-6 bg-yellow-400 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 profile-settings-hover cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-white">Push Notifications</span>
              <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 profile-settings-hover cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-white">Dark Mode</span>
              <div className="w-12 h-6 bg-yellow-400 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bible Verse */}
        <div className="text-center mt-auto mb-20">
          <p className="text-yellow-300/80 italic text-sm font-light">
            "Grow in grace and knowledge"
          </p>
          <p className="text-yellow-300/60 text-xs mt-1">
            2 Peter 3:18
          </p>
        </div>
      </div>
    </div>
  );
}