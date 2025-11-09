export function Footer() {
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = 'admin';
  };

  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-12 md:mt-16 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2 md:space-y-3">
        <p className="text-xs md:text-sm text-white/70">
          EyeLoveSleep — Simple sleep, smarter life.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[10px] md:text-xs text-white/50">
          <a href="#" className="hover:text-white/80 transition-colors underline-offset-2 hover:underline">Privacy Policy</a>
          <span className="hidden sm:inline">|</span>
          <a href="#" className="hover:text-white/80 transition-colors underline-offset-2 hover:underline">Terms</a>
          <span className="hidden sm:inline">|</span>
          <a href="#" className="hover:text-white/80 transition-colors underline-offset-2 hover:underline">About</a>
          <span className="hidden sm:inline">|</span>
          <a 
            href="#admin" 
            onClick={handleAdminClick}
            className="hover:text-white/80 transition-colors underline-offset-2 hover:underline opacity-30 hover:opacity-100"
          >
            Admin
          </a>
        </div>
        <p className="text-[10px] md:text-xs text-white/40">© 2025 EyeLoveSleep. All rights reserved.</p>
        <p className="text-[9px] md:text-[10px] text-white/30 max-w-md mx-auto">
          Evidence-based sleep recommendations. Not medical advice. Consult healthcare professionals for sleep disorders.
        </p>
      </div>
    </footer>
  );
}
