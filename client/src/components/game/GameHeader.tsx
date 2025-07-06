import logoPath from "@assets/Logo_1751810712162.png";

export default function GameHeader() {
  return (
    <header className="mx-4 mt-4 mb-6 p-6">
      <div className="flex items-center justify-center space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <img 
            src={logoPath} 
            alt="Testament Trivia Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          Testament Trivia
        </h1>
      </div>
    </header>
  );
}
