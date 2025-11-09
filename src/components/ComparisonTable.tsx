interface ComparisonTableProps {
  section: 'sleep' | 'recommendations' | 'jetlag';
}

export function ComparisonTable({ section }: ComparisonTableProps) {
  if (section === 'sleep') {
    return (
      <section className="mt-8 md:mt-12">
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

  if (section === 'recommendations') {
    return (
      <section className="mt-8 md:mt-12">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl overflow-x-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-6">
            Detailed Sleep Requirements by Age Group
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" itemScope itemType="https://schema.org/Table">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 text-purple-200">Age Group</th>
                  <th className="py-3 px-4 text-purple-200">Recommended Hours</th>
                  <th className="py-3 px-4 text-purple-200">May Be Appropriate</th>
                  <th className="py-3 px-4 text-purple-200">Not Recommended</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Newborns (0-3 mo)</td>
                  <td className="py-3 px-4 text-green-400">14-17 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">11-13, 18-19 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;11, &gt;19 hours</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Infants (4-11 mo)</td>
                  <td className="py-3 px-4 text-green-400">12-15 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">10-11, 16-18 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;10, &gt;18 hours</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Toddlers (1-2 yr)</td>
                  <td className="py-3 px-4 text-green-400">11-14 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">9-10, 15-16 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;9, &gt;16 hours</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Preschoolers (3-5 yr)</td>
                  <td className="py-3 px-4 text-green-400">10-13 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">8-9, 14 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;8, &gt;14 hours</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">School Age (6-13 yr)</td>
                  <td className="py-3 px-4 text-green-400">9-11 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">7-8, 12 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;7, &gt;12 hours</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Teenagers (14-17 yr)</td>
                  <td className="py-3 px-4 text-green-400">8-10 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">7, 11 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;7, &gt;11 hours</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Young Adults (18-25 yr)</td>
                  <td className="py-3 px-4 text-green-400">7-9 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">6, 10-11 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;6, &gt;11 hours</td>
                </tr>
                <tr className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Adults (26-64 yr)</td>
                  <td className="py-3 px-4 text-green-400">7-9 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">6, 10 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;6, &gt;10 hours</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="py-3 px-4 text-white">Older Adults (65+ yr)</td>
                  <td className="py-3 px-4 text-green-400">7-8 hours</td>
                  <td className="py-3 px-4 text-blue-100/70">5-6, 9 hours</td>
                  <td className="py-3 px-4 text-red-400/70">&lt;5, &gt;9 hours</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-purple-100/60 text-sm mt-4 italic">
            Source: National Sleep Foundation's sleep duration recommendations (2015)
          </p>
        </div>
      </section>
    );
  }

  if (section === 'jetlag') {
    return (
      <section className="mt-8 md:mt-12">
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
