import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  section: 'sleep' | 'recommendations' | 'jetlag';
}

const faqData: Record<'sleep' | 'recommendations' | 'jetlag', FAQ[]> = {
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
  recommendations: [
    {
      question: 'How much sleep does a newborn need?',
      answer: 'Newborns (0-3 months) need 14-17 hours of sleep per day, with a range of 11-19 hours being acceptable. Their sleep is distributed throughout day and night in short periods, typically 2-4 hours at a time, as they haven\'t yet developed a circadian rhythm.'
    },
    {
      question: 'What is the recommended sleep for teenagers?',
      answer: 'Teenagers (14-17 years) need 8-10 hours of sleep per night. This age group often experiences delayed sleep phase, feeling naturally more awake at night. Despite this, maintaining consistent sleep schedules is crucial for their physical development, learning, and mental health.'
    },
    {
      question: 'Do adults really need 8 hours of sleep?',
      answer: 'Adults (18-64 years) need 7-9 hours of sleep per night. While 8 hours is often cited, the ideal amount varies by individual. The key is to wake up feeling refreshed and maintain alertness throughout the day. Consistently getting less than 7 hours is linked to health risks.'
    },
    {
      question: 'How does sleep need change with age?',
      answer: 'Sleep needs decrease with age: newborns need 14-17 hours, infants need 12-15 hours, toddlers need 11-14 hours, preschoolers need 10-13 hours, school-age children need 9-11 hours, teenagers need 8-10 hours, and adults need 7-9 hours. Seniors (65+) still need 7-8 hours but often experience more fragmented sleep.'
    },
    {
      question: 'What happens if children don\'t get enough sleep?',
      answer: 'Insufficient sleep in children can lead to behavioral problems, difficulty concentrating, poor academic performance, weakened immune system, increased risk of obesity, and mood disturbances. Children who consistently get adequate sleep show better learning, memory consolidation, emotional regulation, and physical development.'
    },
    {
      question: 'Can you catch up on lost sleep on weekends?',
      answer: 'While weekend sleep-ins can help reduce sleep debt temporarily, they can\'t fully compensate for chronic sleep deprivation. Irregular sleep schedules disrupt your circadian rhythm, potentially causing "social jet lag." The best approach is maintaining consistent sleep and wake times throughout the week.'
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
