export function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-12 md:mt-16 py-6 md:py-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2 md:space-y-3">
        <p className="text-xs md:text-sm text-white/70">
          <strong>EyeLoveSleep</strong> — Free Sleep Calculator, Bedtime Calculator & Jet Lag Tool
        </p>
        <p className="text-[10px] md:text-xs text-white/40">
          © 2025 EyeLoveSleep. All rights reserved.
        </p>
        <p className="text-[9px] md:text-[10px] text-white/30 max-w-2xl mx-auto">
          <strong>Disclaimer:</strong> EyeLoveSleep provides evidence-based sleep recommendations and educational content. This is not medical advice. Consult qualified healthcare professionals for sleep disorders, chronic sleep issues, or medical concerns. Sleep calculator results are estimates based on average 90-minute sleep cycles.
        </p>
        <div className="text-[9px] md:text-[10px] text-white/30 max-w-2xl mx-auto pt-2">
          <p>Keywords: sleep calculator, bedtime calculator, wake time calculator, jet lag calculator, sleep cycles, 90 minute sleep cycle, REM sleep, sleep by age, sleep recommendations, circadian rhythm, sleep hygiene, time zone adjustment</p>
        </div>
        
        {/* Histats noscript fallback */}
        <noscript>
          <div className="pt-2">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <img 
                src="//sstatic1.histats.com/0.gif?4990579&101" 
                alt="analytics" 
                className="inline-block opacity-0 w-0 h-0"
                style={{ border: 0 }}
              />
            </a>
          </div>
        </noscript>
      </div>
    </footer>
  );
}
