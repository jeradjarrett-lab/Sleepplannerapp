export function Footer() {
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = 'admin';
  };

  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-12 md:mt-16 py-6 md:py-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2 md:space-y-3">
        <p className="text-xs md:text-sm text-white/70">
          <strong>EyeLoveSleep</strong> — Free Sleep Calculator, Bedtime Calculator & Jet Lag Tool
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[10px] md:text-xs text-white/50" aria-label="Footer navigation">
          <a href="#privacy" className="hover:text-white/80 transition-colors underline-offset-2 hover:underline">Privacy Policy</a>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <a href="#terms" className="hover:text-white/80 transition-colors underline-offset-2 hover:underline">Terms of Service</a>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <a href="#about" className="hover:text-white/80 transition-colors underline-offset-2 hover:underline">About Us</a>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <a href="#contact" className="hover:text-white/80 transition-colors underline-offset-2 hover:underline">Contact</a>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <a 
            href="#admin" 
            onClick={handleAdminClick}
            className="hover:text-white/80 transition-colors underline-offset-2 hover:underline opacity-30 hover:opacity-100"
            aria-label="Admin panel"
          >
            Admin
          </a>
        </nav>
        <p className="text-[10px] md:text-xs text-white/40">
          © 2025 EyeLoveSleep. All rights reserved.
        </p>
        <p className="text-[9px] md:text-[10px] text-white/30 max-w-2xl mx-auto">
          <strong>Disclaimer:</strong> EyeLoveSleep provides evidence-based sleep recommendations and educational content. This is not medical advice. Consult qualified healthcare professionals for sleep disorders, chronic sleep issues, or medical concerns. Sleep calculator results are estimates based on average 90-minute sleep cycles.
        </p>
        <div className="text-[9px] md:text-[10px] text-white/30 max-w-2xl mx-auto pt-2">
          <p>Keywords: sleep calculator, bedtime calculator, wake time calculator, jet lag calculator, sleep cycles, 90 minute sleep cycle, REM sleep, sleep by age, sleep recommendations, circadian rhythm, sleep hygiene, time zone adjustment</p>
        </div>
      </div>
    </footer>
  );
}
