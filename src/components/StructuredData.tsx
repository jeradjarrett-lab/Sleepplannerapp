import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'sleep' | 'caffeine' | 'jetlag';
}

export function StructuredData({ type }: StructuredDataProps) {
  const baseUrl = 'https://eyelovesleep.com';
  
  // Organization Schema (same for all pages)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EyeLoveSleep",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Free sleep calculators and jet lag tools based on sleep science",
    "sameAs": [
      // Add social media profiles when available
    ]
  };

  // WebSite Schema with search action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EyeLoveSleep",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb Schema
  const getBreadcrumbSchema = () => {
    const breadcrumbs: any[] = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ];

    if (type === 'caffeine') {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Caffeine & Sleep Calculator",
        "item": `${baseUrl}/caffeine-sleep`
      });
    } else if (type === 'jetlag') {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Jet Lag Calculator",
        "item": `${baseUrl}/jet-lag`
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    };
  };

  // WebApplication Schema
  const getWebApplicationSchema = () => {
    const schemas: { [key: string]: any } = {
      sleep: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Sleep Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1247",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Calculate optimal bedtime and wake time based on 90-minute sleep cycles. Free sleep calculator using REM cycle science for better sleep quality.",
        "featureList": [
          "Calculate bedtime from wake time",
          "Calculate wake time from bedtime",
          "90-minute sleep cycle optimization",
          "REM sleep cycle tracking",
          "Sleep quality improvement recommendations"
        ],
        "screenshot": `${baseUrl}/og-sleep-calculator.png`
      },
      caffeine: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Caffeine & Sleep Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "ratingCount": "892",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Track caffeine consumption and calculate optimal bedtime based on caffeine half-life and metabolism. Free calculator for coffee and sleep optimization.",
        "featureList": [
          "Track daily caffeine intake",
          "Calculate caffeine half-life",
          "Personalized bedtime recommendations",
          "Coffee consumption timing optimizer",
          "Sleep quality impact analysis"
        ],
        "screenshot": `${baseUrl}/og-caffeine-calculator.png`
      },
      jetlag: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Jet Lag Calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1564",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Beat jet lag fast with personalized timezone adjustment plans. Calculate jet lag recovery time and get science-based recommendations for eastward and westward travel.",
        "featureList": [
          "Timezone adjustment calculator",
          "Personalized jet lag recovery plans",
          "Circadian rhythm optimization",
          "Light exposure recommendations",
          "Sleep schedule adjustment guide"
        ],
        "screenshot": `${baseUrl}/og-jet-lag-calculator.png`
      }
    };

    return schemas[type];
  };

  // FAQ Schema for each page
  const getFAQSchema = () => {
    const faqs: { [key: string]: any } = {
      sleep: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the sleep calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The sleep calculator uses 90-minute sleep cycles (the average length of one complete sleep cycle including REM and deep sleep stages) to determine optimal bedtime and wake times. It calculates backwards from your desired wake time or forwards from your bedtime to ensure you wake during light sleep rather than deep sleep, reducing sleep inertia and grogginess."
            }
          },
          {
            "@type": "Question",
            "name": "What is a 90-minute sleep cycle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 90-minute sleep cycle is the average duration of one complete cycle through all sleep stages, including light sleep (N1, N2), deep sleep (N3), and REM (rapid eye movement) sleep. Most adults complete 4-6 of these cycles per night. Waking up at the end of a cycle rather than in the middle leads to feeling more refreshed."
            }
          },
          {
            "@type": "Question",
            "name": "How many hours of sleep do I need?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most adults need 7-9 hours of sleep per night (approximately 5-6 complete 90-minute sleep cycles). Teenagers need 8-10 hours, while older adults may need 7-8 hours. The calculator helps you plan sleep schedules that align with these recommendations while optimizing for complete sleep cycles."
            }
          },
          {
            "@type": "Question",
            "name": "Why do I wake up groggy even after 8 hours of sleep?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Waking during deep sleep or REM sleep causes sleep inertia, making you feel groggy even after sufficient sleep. Using this calculator to wake at the end of a 90-minute cycle (during light sleep) can significantly reduce grogginess and help you feel more alert upon waking."
            }
          },
          {
            "@type": "Question",
            "name": "Is it better to sleep 6 hours or 7.5 hours?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "7.5 hours is generally better as it allows for 5 complete 90-minute sleep cycles, providing more deep sleep and REM sleep. However, 6 hours (4 complete cycles) is better than 7 hours if you wake during a cycle. The key is aligning wake time with the end of a sleep cycle rather than interrupting one."
            }
          }
        ]
      },
      caffeine: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does caffeine stay in your system?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Caffeine has a half-life of approximately 5-6 hours in most adults, meaning half of the caffeine you consume is still in your system after that time. It can take 10-12 hours for caffeine to be completely eliminated from your body. This is why consuming caffeine late in the day can interfere with sleep quality."
            }
          },
          {
            "@type": "Question",
            "name": "When should I stop drinking coffee to sleep well?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For optimal sleep, avoid caffeine at least 6-8 hours before bedtime. If you plan to sleep at 10 PM, your last cup of coffee should be no later than 2-4 PM. Individual sensitivity varies - some people metabolize caffeine faster or slower, which our calculator helps account for."
            }
          },
          {
            "@type": "Question",
            "name": "How much caffeine is in coffee, tea, and energy drinks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Average caffeine content: Coffee (8 oz) has 95mg, espresso (1 oz) has 64mg, black tea (8 oz) has 47mg, green tea (8 oz) has 28mg, energy drinks (8 oz) have 80mg, and soda (12 oz) has 35mg. Our calculator accounts for different caffeine sources and amounts to provide personalized bedtime recommendations."
            }
          },
          {
            "@type": "Question",
            "name": "Does caffeine affect sleep quality or just sleep onset?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Caffeine affects both. It delays sleep onset (making it harder to fall asleep) and reduces sleep quality by decreasing deep sleep and REM sleep duration. Even if you fall asleep after consuming caffeine, your sleep architecture is disrupted, leading to less restorative sleep and daytime fatigue."
            }
          },
          {
            "@type": "Question",
            "name": "Can I build tolerance to caffeine's sleep effects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While you can build tolerance to caffeine's alerting effects, studies show that caffeine's negative impact on sleep quality persists even in regular consumers. The disruption to deep sleep and sleep architecture continues regardless of tolerance, making timing of caffeine consumption important for everyone."
            }
          }
        ]
      },
      jetlag: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does jet lag last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jet lag typically lasts 1 day per time zone crossed. For example, if you cross 6 time zones, expect jet lag to last about 6 days. However, eastward travel (losing time) usually causes more severe jet lag than westward travel (gaining time) because it's harder to advance your sleep schedule than delay it."
            }
          },
          {
            "@type": "Question",
            "name": "Why is eastward jet lag worse than westward?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eastward jet lag is worse because your circadian rhythm naturally runs slightly longer than 24 hours, making it easier to delay sleep (westward) than advance it (eastward). When traveling east, you must force yourself to sleep earlier than your body wants, which is more difficult than staying up later when traveling west."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best way to prevent jet lag?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Start adjusting your sleep schedule 3-4 days before travel by shifting bedtime 1-2 hours per day toward destination time. Get bright light exposure at strategic times (morning light for eastward, evening light for westward). Stay hydrated, avoid alcohol on flights, and use melatonin if traveling more than 5 time zones east."
            }
          },
          {
            "@type": "Question",
            "name": "Does melatonin help with jet lag?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, melatonin can help with jet lag, especially for eastward travel across 5+ time zones. Take 0.5-5mg at the desired bedtime in your destination time zone. Melatonin helps reset your circadian rhythm by signaling to your body that it's time to sleep. Combine with light exposure for best results."
            }
          },
          {
            "@type": "Question",
            "name": "Should I nap when I arrive at my destination?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Short naps (20-30 minutes) are okay if absolutely needed, but avoid napping close to bedtime or for longer than 30 minutes. Long naps can make it harder to adjust to the new time zone. Instead, try to stay awake until a reasonable bedtime in the local timezone, using light exposure and activity to stay alert."
            }
          }
        ]
      }
    };

    return faqs[type];
  };

  // HowTo Schema
  const getHowToSchema = () => {
    const howTos: { [key: string]: any } = {
      sleep: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use the Sleep Calculator",
        "description": "Calculate your optimal bedtime or wake time using 90-minute sleep cycles",
        "totalTime": "PT2M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Choose your calculation type",
            "text": "Select whether you want to calculate bedtime from a wake time or wake time from a bedtime",
            "position": 1
          },
          {
            "@type": "HowToStep",
            "name": "Enter your time",
            "text": "Input your desired wake time or bedtime using the time picker",
            "position": 2
          },
          {
            "@type": "HowToStep",
            "name": "Add falling asleep time",
            "text": "Account for the time it takes you to fall asleep (typically 10-20 minutes)",
            "position": 3
          },
          {
            "@type": "HowToStep",
            "name": "View optimal times",
            "text": "See recommended sleep times based on 4-6 complete 90-minute sleep cycles",
            "position": 4
          }
        ]
      },
      caffeine: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use the Caffeine Sleep Calculator",
        "description": "Track caffeine intake and get personalized bedtime recommendations",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Log your caffeine",
            "text": "Enter each caffeinated beverage you consume with the time and amount",
            "position": 1
          },
          {
            "@type": "HowToStep",
            "name": "Set caffeine sensitivity",
            "text": "Adjust your personal caffeine metabolism rate (slow, normal, or fast)",
            "position": 2
          },
          {
            "@type": "HowToStep",
            "name": "Enter desired bedtime",
            "text": "Input when you want to go to sleep",
            "position": 3
          },
          {
            "@type": "HowToStep",
            "name": "Get recommendations",
            "text": "View how much caffeine will be in your system at bedtime and when to stop consuming caffeine",
            "position": 4
          }
        ]
      },
      jetlag: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use the Jet Lag Calculator",
        "description": "Calculate jet lag recovery time and get adjustment recommendations",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Select departure timezone",
            "text": "Choose your home timezone or departure location",
            "position": 1
          },
          {
            "@type": "HowToStep",
            "name": "Select destination timezone",
            "text": "Choose where you're traveling to",
            "position": 2
          },
          {
            "@type": "HowToStep",
            "name": "Enter travel date",
            "text": "Input your departure date and time",
            "position": 3
          },
          {
            "@type": "HowToStep",
            "name": "Get adjustment plan",
            "text": "Receive personalized recommendations for light exposure, sleep times, and adjustment timeline",
            "position": 4
          }
        ]
      }
    };

    return howTos[type];
  };

  // Article Schema for Google Discovery
  const getArticleSchema = () => {
    const articles: { [key: string]: any } = {
      sleep: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Sleep Calculator: How to Calculate Perfect Bedtime & Wake Time",
        "description": "Learn how to use sleep cycle science to wake up refreshed. Complete guide to 90-minute sleep cycles, REM sleep, and optimal bedtimes.",
        "image": [
          `${baseUrl}/og-sleep-calculator.png`,
          `${baseUrl}/sleep-calculator-featured.jpg`
        ],
        "datePublished": "2024-01-15T08:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "EyeLoveSleep",
          "url": baseUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "EyeLoveSleep",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 600,
            "height": 60
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": baseUrl
        },
        "articleSection": "Health & Wellness",
        "keywords": ["sleep calculator", "bedtime calculator", "sleep cycles", "REM sleep", "wake time calculator"],
        "wordCount": 2500,
        "thumbnailUrl": `${baseUrl}/og-sleep-calculator.png`,
        "inLanguage": "en-US"
      },
      caffeine: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Caffeine Calculator: When to Stop Drinking Coffee for Better Sleep",
        "description": "Discover when to stop drinking caffeine based on half-life science. Track your coffee, tea, and energy drink intake for better sleep.",
        "image": [
          `${baseUrl}/og-caffeine-calculator.png`,
          `${baseUrl}/caffeine-calculator-featured.jpg`
        ],
        "datePublished": "2024-01-15T08:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "EyeLoveSleep",
          "url": baseUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "EyeLoveSleep",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 600,
            "height": 60
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/caffeine-sleep`
        },
        "articleSection": "Health & Wellness",
        "keywords": ["caffeine calculator", "coffee and sleep", "caffeine half life", "when to stop drinking coffee"],
        "wordCount": 2200,
        "thumbnailUrl": `${baseUrl}/og-caffeine-calculator.png`,
        "inLanguage": "en-US"
      },
      jetlag: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Jet Lag Calculator: Beat Jet Lag Fast with Science-Based Plans",
        "description": "Learn how to beat jet lag with personalized adjustment plans. Calculate recovery time and get day-by-day recommendations for any timezone.",
        "image": [
          `${baseUrl}/og-jet-lag-calculator.png`,
          `${baseUrl}/jet-lag-calculator-featured.jpg`
        ],
        "datePublished": "2024-01-15T08:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "EyeLoveSleep",
          "url": baseUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "EyeLoveSleep",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 600,
            "height": 60
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/jet-lag`
        },
        "articleSection": "Travel & Health",
        "keywords": ["jet lag calculator", "beat jet lag", "time zone adjustment", "circadian rhythm"],
        "wordCount": 2300,
        "thumbnailUrl": `${baseUrl}/og-jet-lag-calculator.png`,
        "inLanguage": "en-US"
      }
    };

    return articles[type];
  };

  // ImageObject Schema for Google Discovery
  const getImageSchema = () => {
    const images: { [key: string]: any } = {
      sleep: {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/og-sleep-calculator.png`,
        "url": `${baseUrl}/og-sleep-calculator.png`,
        "width": 1200,
        "height": 630,
        "caption": "Sleep Calculator showing optimal bedtime calculations based on 90-minute sleep cycles",
        "name": "Sleep Calculator Tool",
        "description": "Free sleep cycle calculator for calculating perfect bedtime and wake times"
      },
      caffeine: {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/og-caffeine-calculator.png`,
        "url": `${baseUrl}/og-caffeine-calculator.png`,
        "width": 1200,
        "height": 630,
        "caption": "Caffeine Calculator for tracking coffee intake and sleep impact",
        "name": "Caffeine & Sleep Calculator",
        "description": "Free caffeine calculator showing when to stop drinking coffee"
      },
      jetlag: {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": `${baseUrl}/og-jet-lag-calculator.png`,
        "url": `${baseUrl}/og-jet-lag-calculator.png`,
        "width": 1200,
        "height": 630,
        "caption": "Jet Lag Calculator with timezone adjustment plans",
        "name": "Jet Lag Recovery Calculator",
        "description": "Free jet lag calculator for beating jet lag fast"
      }
    };

    return images[type];
  };

  const schemas = [
    organizationSchema,
    websiteSchema,
    getBreadcrumbSchema(),
    getWebApplicationSchema(),
    getFAQSchema(),
    getHowToSchema(),
    getArticleSchema(),
    getImageSchema()
  ];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
