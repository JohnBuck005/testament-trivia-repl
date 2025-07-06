export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large floating spheres */}
      <div className="sphere absolute w-32 h-32 rounded-full top-10 left-10 animate-float opacity-40" style={{ animationDelay: '0s' }}></div>
      <div className="sphere absolute w-20 h-20 rounded-full top-1/3 right-20 animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
      <div className="sphere absolute w-24 h-24 rounded-full bottom-20 left-1/4 animate-float opacity-35" style={{ animationDelay: '4s' }}></div>
      <div className="sphere absolute w-16 h-16 rounded-full bottom-1/3 right-10 animate-float opacity-25" style={{ animationDelay: '1s' }}></div>
      
      {/* Small accent elements */}
      <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-1/4 left-1/3 animate-pulse-slow opacity-60"></div>
      <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-2/3 right-1/3 animate-pulse-slow opacity-70" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full bottom-1/4 left-2/3 animate-pulse-slow opacity-50" style={{ animationDelay: '3s' }}></div>
    </div>
  );
}
