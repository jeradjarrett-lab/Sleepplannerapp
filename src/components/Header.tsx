import { Moon } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg" role="banner">
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-3">
        <nav className="flex items-center justify-between" role="navigation" aria-label="Main site navigation">
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-2 md:gap-3 group cursor-pointer transition-transform hover:scale-105"
            aria-label="EyeLoveSleep - Go to home page"
            title="EyeLoveSleep - Free Sleep Calculator & Jet Lag Tools"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
              <Moon className="w-5 h-5 md:w-6 md:h-6 text-white" aria-hidden="true" />
            </div>
            <span className="text-white text-lg md:text-xl lg:text-2xl group-hover:text-blue-300 transition-colors">EyeLoveSleep</span>
          </button>
          <p className="text-xs md:text-sm text-white/70 hidden sm:block">
            Free Sleep & Jet Lag Tools
          </p>
        </nav>
      </div>
    </header>
  );
}
