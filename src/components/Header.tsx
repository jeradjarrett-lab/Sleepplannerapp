import { Moon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Moon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-white text-lg md:text-xl lg:text-2xl">EyeLoveSleep</h1>
          </div>
          <div className="text-xs md:text-sm text-white/50 hidden sm:block">
            Free Sleep Tools
          </div>
        </div>
      </div>
    </header>
  );
}
