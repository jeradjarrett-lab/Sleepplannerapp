import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  section: 'sleep' | 'caffeine' | 'jetlag';
}

const faqData: Record<'sleep' | 'caffeine' | 'jetlag', FAQ[]> = {
  sleep: [
    {
      question: 'How does a sleep calculator work?',
      answer: 'A sleep calculator works by using the natural 90-minute sleep cycle rhythm. Each complete sleep cycle includes light sleep, deep sleep, and REM sleep stages. By timing your sleep in complete 90-minute cycles, you wake up during lighter sleep stages, feeling more refreshed and energized rather than groggy.'
    },
    {
      question: 'What is the ideal bedtime for optimal sleep?',
      answer: 'The ideal bedtime depends on when you need to wake up. Most adults need 7-9 hours of sleep (4-6 complete sleep cycles). For example, if you need to wake up at 7:00 AM, going to bed at 10:00 PM or 11:30 PM would give you 6 or 5 complete sleep cycles respectively.'
    },
    {
      question: 'Why do I feel groggy when I wake up?',
      answer: 'You feel groggy when you wake up during deep sleep or in the middle of a sleep cycle. This grogginess, called sleep inertia, can last 15-60 minutes. Using a sleep calculator to time your sleep in complete 90-minute cycles helps you wake up during lighter sleep stages, reducing grogginess.'
    },
    {
      question: 'How long is one sleep cycle?',
      answer: 'One complete sleep cycle averages 90 minutes in adults. During this time, you progress through light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. Most people need 4-6 complete cycles per night for optimal rest, totaling 6-9 hours of sleep.'
    },
    {
      question: 'Should I use sleep calculator for naps?',
      answer: 'Yes! For naps, aim for either a 20-minute power nap (which keeps you in light sleep) or a full 90-minute sleep cycle. Avoid napping for 30-60 minutes as this may cause sleep inertia. The 90-minute nap allows you to complete a full cycle and wake up refreshed.'
    },
    {
      question: 'Does age affect sleep cycles?',
      answer: 'Yes, age affects both sleep cycle duration and sleep needs. Infants have shorter 50-60 minute cycles, while adults average 90 minutes. Additionally, sleep requirements decrease with age: newborns need 14-17 hours, teenagers need 8-10 hours, and adults need 7-9 hours of sleep per night.'
    }
  ],
  caffeine: [
    {
      question: 'How does caffeine affect sleep?',
      answer: 'Caffeine blocks adenosine receptors in the brain, which prevents the buildup of sleep pressure. This can delay sleep onset, reduce total sleep time, decrease sleep quality, and particularly reduce deep slow-wave sleep. Even when consumed 6 hours before bedtime, caffeine can significantly disrupt sleep architecture.'
    },
    {
      question: 'What is caffeine half-life?',
      answer: 'Caffeine half-life is approximately 5 hours in healthy adults, meaning it takes 5 hours for your body to eliminate half of the caffeine consumed. After 10 hours, you still have 25% remaining, and after 15 hours, about 12.5% remains. This varies based on genetics, age, medications, pregnancy, and smoking status.'
    },
    {
      question: 'How much caffeine is too much?',
      answer: 'For most healthy adults, up to 400mg of caffeine per day (about 4 cups of coffee) is considered safe. However, for optimal sleep, you should avoid caffeine at least 6-8 hours before bedtime. Pregnant women should limit intake to 200mg, and teenagers should stay under 100mg daily.'
    },
    {
      question: 'When should I stop drinking coffee for better sleep?',
      answer: 'To optimize sleep quality, stop consuming caffeine at least 6-8 hours before your target bedtime. If you plan to sleep at 10 PM, your last caffeinated beverage should be no later than 2-4 PM. Individual sensitivity varies, so some people may need to cut off even earlier.'
    },
    {
      question: 'Does caffeine tolerance prevent sleep problems?',
      answer: 'No, caffeine tolerance only reduces the stimulant effects you feel consciously. Even if you don\'t feel wired or jittery, caffeine still disrupts your sleep architecture by blocking adenosine receptors and reducing deep sleep stages. Regular caffeine users often underestimate its impact on their sleep quality.'
    },
    {
      question: 'Are there alternatives to caffeine for energy?',
      answer: 'Yes! Natural alternatives include: getting adequate sleep (7-9 hours), staying hydrated, exercising regularly, taking short power naps (10-20 minutes), eating balanced meals, getting sunlight exposure in the morning, and using strategic rest breaks. These provide sustainable energy without sleep disruption.'
    }
  ],
  jetlag: [
    {
      question: 'What is jet lag and what causes it?',
      answer: 'Jet lag is a temporary sleep disorder that occurs when your internal body clock (circadian rhythm) is out of sync with the new time zone. It\'s caused by rapid travel across multiple time zones. Symptoms include fatigue, difficulty sleeping, digestive issues, mood changes, and reduced physical and mental performance.'
    },
    {
      question: 'How long does jet lag last?',
      answer: 'Jet lag typically lasts 1-3 days for each time zone crossed. For example, traveling across 6 time zones might require 6-18 days to fully adjust. Recovery is generally faster when traveling west (gaining hours) than east (losing hours), as it\'s easier to stay awake longer than to fall asleep earlier.'
    },
    {
      question: 'Does jet lag affect westward travel less?',
      answer: 'Yes, westward travel typically causes less severe jet lag than eastward travel. When traveling west, your day is extended, which aligns better with the body\'s natural tendency to have a slightly longer than 24-hour internal clock. Traveling east requires advancing your sleep schedule, which is more difficult for most people.'
    },
    {
      question: 'How can I prevent jet lag before traveling?',
      answer: 'Start adjusting your sleep schedule 3-4 days before travel: shift bedtime 1-2 hours earlier for eastward travel or later for westward travel. Get plenty of sleep before your trip, stay hydrated, and consider using light exposure strategically. Some travelers also adjust meal times to match their destination\'s schedule.'
    },
    {
      question: 'Should I sleep on the plane to avoid jet lag?',
      answer: 'It depends on your arrival time and direction of travel. If you arrive in the evening, try to sleep on the plane. If you arrive in the morning, try to stay awake during the flight. Set your watch to the destination time zone immediately and start following that schedule for meals and sleep attempts.'
    },
    {
      question: 'What are the best natural remedies for jet lag?',
      answer: 'Natural remedies for jet lag include: strategic light exposure (sunlight helps reset your circadian rhythm), staying hydrated, avoiding alcohol and caffeine before sleep, taking short naps (20 minutes max) if needed, exercising at appropriate times, and eating meals according to the new time zone. Melatonin supplements can also help when taken at the right time.'
    }
  ]
};

export function FAQSection({ section }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const faqs = faqData[section];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section className="mt-12 md:mt-16">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <h2 className="text-2xl md:text-3xl text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <div
              key={index}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4">
                  <h3 itemProp="name" className="text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 flex-shrink-0 transition-transform duration-200 ${
                      openItems.includes(index) ? 'transform rotate-180' : ''
                    }`}
                  />
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-4 md:px-5 pb-4 md:pb-5"
                  >
                    <p itemProp="text" className="text-blue-100/90 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
