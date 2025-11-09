import { CheckCircle2 } from 'lucide-react';

interface HowToStep {
  name: string;
  text: string;
}

interface HowToSectionProps {
  section: 'sleep' | 'recommendations' | 'jetlag';
}

const howToData: Record<'sleep' | 'recommendations' | 'jetlag', { title: string; steps: HowToStep[] }> = {
  sleep: {
    title: 'How to Use the Sleep Calculator',
    steps: [
      {
        name: 'Choose Your Goal',
        text: 'Decide whether you want to calculate when to go to bed (if you know your wake time) or when to wake up (if you know your bedtime).'
      },
      {
        name: 'Enter Your Time',
        text: 'Use the interactive time dial to set either your desired wake time or your planned bedtime. The dial makes it easy to select any time of day.'
      },
      {
        name: 'Review Sleep Cycles',
        text: 'The calculator will show you multiple options based on complete 90-minute sleep cycles, ranging from 4 to 6 cycles (6 to 9 hours of sleep).'
      },
      {
        name: 'Account for Fall-Asleep Time',
        text: 'Remember to add 10-15 minutes to your bedtime for the time it takes to fall asleep. Our calculator includes a note about this important factor.'
      },
      {
        name: 'Choose Your Optimal Time',
        text: 'Select the time that gives you enough sleep cycles while fitting your schedule. Most adults feel best with 5-6 complete cycles (7.5-9 hours).'
      }
    ]
  },
  recommendations: {
    title: 'How to Determine Your Sleep Needs',
    steps: [
      {
        name: 'Enter Your Age',
        text: 'Input your age or the age of the person you\'re checking sleep recommendations for. The calculator works for all ages from newborns to seniors.'
      },
      {
        name: 'Review Age-Based Guidelines',
        text: 'See the recommended sleep hours for your age group based on National Sleep Foundation guidelines. This includes a minimum, maximum, and optimal range.'
      },
      {
        name: 'Check the Suggested Schedule',
        text: 'View a personalized daily sleep schedule including bedtime, wake time, and nap times (for children and infants who need them).'
      },
      {
        name: 'Customize Your Times',
        text: 'Adjust the bedtime, wake time, or total sleep hours using the interactive dials to fit your lifestyle while staying within recommended ranges.'
      },
      {
        name: 'Implement Consistently',
        text: 'Try to maintain consistent sleep and wake times every day, including weekends, to optimize your circadian rhythm and sleep quality.'
      }
    ]
  },
  jetlag: {
    title: 'How to Beat Jet Lag',
    steps: [
      {
        name: 'Enter Travel Details',
        text: 'Select your departure city, destination city, and travel date. The calculator uses real time zone data to determine the time difference.'
      },
      {
        name: 'Review Time Zone Difference',
        text: 'See exactly how many hours ahead or behind your destination is compared to your home. This helps you understand the adjustment needed.'
      },
      {
        name: 'Follow the Adjustment Plan',
        text: 'Get a day-by-day sleep schedule starting from your departure. The plan gradually shifts your sleep times to match your destination\'s time zone.'
      },
      {
        name: 'Pre-Adjust Before Travel',
        text: 'Start following the adjustment plan 2-3 days before departure. Shift your bedtime by 1-2 hours each day toward your destination\'s schedule.'
      },
      {
        name: 'Use Light Strategically',
        text: 'Expose yourself to bright light at times indicated in the plan. Light is the most powerful tool for resetting your circadian rhythm.'
      },
      {
        name: 'Stay Consistent Upon Arrival',
        text: 'Immediately adopt the local schedule for meals, activities, and sleep. Avoid napping for more than 20-30 minutes during the first few days.'
      }
    ]
  }
};

export function HowToSection({ section }: HowToSectionProps) {
  const howTo = howToData[section];

  return (
    <section className="mt-8 md:mt-12">
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div
          itemScope
          itemType="https://schema.org/HowTo"
        >
          <h2 itemProp="name" className="text-2xl md:text-3xl text-white mb-6">
            {howTo.title}
          </h2>
          
          <ol className="space-y-4" itemProp="step">
            {howTo.steps.map((step, index) => (
              <li
                key={index}
                itemScope
                itemProp="step"
                itemType="https://schema.org/HowToStep"
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-400/50 flex items-center justify-center text-blue-200">
                  <span className="text-sm">{index + 1}</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 itemProp="name" className="text-white mb-1">
                    {step.name}
                  </h3>
                  <p itemProp="text" className="text-blue-100/80 text-sm md:text-base leading-relaxed">
                    {step.text}
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
