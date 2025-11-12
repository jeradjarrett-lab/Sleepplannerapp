interface ComparisonTableProps {
  section: 'sleep' | 'caffeine' | 'jetlag';
}

export function ComparisonTable({ section }: ComparisonTableProps) {
  if (section === 'sleep') {
    return (
      <section id="comparison" className="mt-8 md:mt-12 scroll-mt-24">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-x-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-6">
            Sleep Cycles Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" itemScope itemType="https://schema.org/Table">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 text-blue-200">Number of Cycles</th>
                  <th className="py-3 px-4 text-blue-200">Total Sleep Time</th>
                  <th className="py-3 px-4 text-blue-200">Recommended For</th>
                  <th className="py-3 px-4 text-blue-200">Energy Level</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">4 cycles</td>
                  <td className="py-3 px-4 text-white">6 hours</td>
                  <td className="py-3 px-4 text-blue-100/80">Minimum for adults (not ideal)</td>
                  <td className="py-3 px-4 text-yellow-400">⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 bg-blue-500/10">
                  <td className="py-3 px-4 text-white">5 cycles</td>
                  <td className="py-3 px-4 text-white">7.5 hours</td>
                  <td className="py-3 px-4 text-blue-100/80">Good for most adults</td>
                  <td className="py-3 px-4 text-green-400">⭐⭐⭐⭐</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5 bg-blue-500/10">
                  <td className="py-3 px-4 text-white">6 cycles</td>
                  <td className="py-3 px-4 text-white">9 hours</td>
                  <td className="py-3 px-4 text-blue-100/80">Optimal for most adults</td>
                  <td className="py-3 px-4 text-green-400">⭐⭐⭐⭐⭐</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="py-3 px-4 text-white">7 cycles</td>
                  <td className="py-3 px-4 text-white">10.5 hours</td>
                  <td className="py-3 px-4 text-blue-100/80">Teenagers, recovery sleep</td>
                  <td className="py-3 px-4 text-green-400">⭐⭐⭐⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-blue-100/60 text-sm mt-4 italic">
            Note: Add 10-15 minutes to bedtime to account for the time it takes to fall asleep.
          </p>
        </div>
      </section>
    );
  }

  if (section === 'caffeine') {
    return (
      <section id="comparison" className="mt-8 md:mt-12 scroll-mt-24">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-x-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-6">
            Caffeine Metabolism Timeline
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" itemScope itemType="https://schema.org/Table">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 text-amber-200">Time After Consumption</th>
                  <th className="py-3 px-4 text-amber-200">Caffeine Remaining (from 200mg)</th>
                  <th className="py-3 px-4 text-amber-200">Effect on Sleep</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">0 hours (Consumption)</td>
                  <td className="py-3 px-4 text-red-400">200mg (100%)</td>
                  <td className="py-3 px-4 text-red-400/70">Severe sleep disruption</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">1 hour</td>
                  <td className="py-3 px-4 text-orange-400">~175mg (87%)</td>
                  <td className="py-3 px-4 text-orange-400/70">Severe sleep disruption</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">3 hours</td>
                  <td className="py-3 px-4 text-orange-400">~140mg (70%)</td>
                  <td className="py-3 px-4 text-orange-400/70">Significant sleep disruption</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">5 hours (Half-life)</td>
                  <td className="py-3 px-4 text-yellow-400">100mg (50%)</td>
                  <td className="py-3 px-4 text-yellow-400/70">Moderate sleep disruption</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">8 hours</td>
                  <td className="py-3 px-4 text-blue-400">~57mg (28%)</td>
                  <td className="py-3 px-4 text-blue-400/70">Mild sleep disruption</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">10 hours</td>
                  <td className="py-3 px-4 text-green-400">~50mg (25%)</td>
                  <td className="py-3 px-4 text-green-400/70">Minimal sleep disruption</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="py-3 px-4 text-white">12-15 hours</td>
                  <td className="py-3 px-4 text-green-400">~25-13mg (12-6%)</td>
                  <td className="py-3 px-4 text-green-400/70">Negligible impact</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-amber-100/60 text-sm mt-4 italic">
            Based on average caffeine half-life of 5 hours in healthy adults
          </p>
        </div>
      </section>
    );
  }

  if (section === 'jetlag') {
    return (
      <section id="comparison" className="mt-8 md:mt-12 scroll-mt-24">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-x-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-6">
            Jet Lag Recovery Times by Time Zones
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" itemScope itemType="https://schema.org/Table">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 text-amber-200">Time Zones Crossed</th>
                  <th className="py-3 px-4 text-amber-200">Typical Recovery (Days)</th>
                  <th className="py-3 px-4 text-amber-200">Eastward Travel</th>
                  <th className="py-3 px-4 text-amber-200">Westward Travel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">1-2 zones</td>
                  <td className="py-3 px-4 text-green-400">1-2 days</td>
                  <td className="py-3 px-4 text-blue-100/70">Minimal impact</td>
                  <td className="py-3 px-4 text-blue-100/70">Very mild</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">3-4 zones</td>
                  <td className="py-3 px-4 text-yellow-400">3-4 days</td>
                  <td className="py-3 px-4 text-blue-100/70">Moderate difficulty</td>
                  <td className="py-3 px-4 text-blue-100/70">Mild difficulty</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">5-6 zones</td>
                  <td className="py-3 px-4 text-orange-400">5-7 days</td>
                  <td className="py-3 px-4 text-blue-100/70">Significant challenge</td>
                  <td className="py-3 px-4 text-blue-100/70">Moderate challenge</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">7-9 zones</td>
                  <td className="py-3 px-4 text-red-400">7-10 days</td>
                  <td className="py-3 px-4 text-blue-100/70">Very difficult</td>
                  <td className="py-3 px-4 text-blue-100/70">Challenging</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="py-3 px-4 text-white">10+ zones</td>
                  <td className="py-3 px-4 text-red-400">10-14 days</td>
                  <td className="py-3 px-4 text-blue-100/70">Extremely difficult</td>
                  <td className="py-3 px-4 text-blue-100/70">Very challenging</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-lg">
            <p className="text-amber-100/90 text-sm">
              <strong className="text-amber-200">Pro Tip:</strong> Your body adjusts approximately 1 hour per day when traveling east, 
              and about 1.5 hours per day when traveling west. Start pre-adjusting your schedule 2-3 days before your trip for best results.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
