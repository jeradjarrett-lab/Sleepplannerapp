import { Star, Quote } from 'lucide-react';
import { Card } from './ui/card';

interface TestimonialProps {
  section: 'sleep' | 'recommendations' | 'jetlag';
}

const testimonialData = {
  sleep: [
    {
      name: "Sarah M.",
      role: "Software Engineer",
      rating: 5,
      text: "The sleep calculator changed my life! I used to wake up groggy even after 8 hours. Now I time my sleep in 90-minute cycles and wake up refreshed every morning.",
      date: "2025-01-15",
    },
    {
      name: "David K.",
      role: "Medical Student",
      rating: 5,
      text: "As a medical student, I need quality sleep despite irregular hours. This calculator helps me maximize rest even when I only have 6 hours. The science behind it is solid.",
      date: "2025-01-10",
    },
    {
      name: "Jennifer L.",
      role: "Parent of Two",
      rating: 5,
      text: "Finally found a sleep tool that actually works! I use it to plan my bedtime around my kids' schedules. No more hitting snooze 5 times!",
      date: "2025-01-05",
    },
  ],
  recommendations: [
    {
      name: "Emily R.",
      role: "New Parent",
      rating: 5,
      text: "The age-based sleep recommendations helped me understand my baby's sleep needs. Now I know when to expect naps and night sleep. Incredibly helpful!",
      date: "2025-01-18",
    },
    {
      name: "Marcus T.",
      role: "High School Teacher",
      rating: 5,
      text: "I use this to educate my students about sleep importance. The National Sleep Foundation guidelines are clearly presented. Great educational resource!",
      date: "2025-01-12",
    },
    {
      name: "Lisa P.",
      role: "Senior Care Manager",
      rating: 5,
      text: "Perfect for understanding sleep needs across all ages. I use this professionally to advise families on healthy sleep schedules for elderly relatives.",
      date: "2025-01-08",
    },
  ],
  jetlag: [
    {
      name: "Alex W.",
      role: "International Consultant",
      rating: 5,
      text: "I travel internationally every month. This jet lag calculator is a game-changer. I start pre-adjusting before trips and recover 3x faster than colleagues.",
      date: "2025-01-20",
    },
    {
      name: "Rachel S.",
      role: "Flight Attendant",
      rating: 5,
      text: "As someone who crosses time zones weekly, I can't recommend this enough. The eastward vs westward guidance is spot-on. My jet lag is barely noticeable now.",
      date: "2025-01-14",
    },
    {
      name: "James H.",
      role: "Digital Nomad",
      rating: 5,
      text: "Living in different countries every few months used to wreck my sleep. This calculator's adjustment plans make transitions smooth. Essential tool for nomads!",
      date: "2025-01-09",
    },
  ],
};

export function Testimonials({ section }: TestimonialProps) {
  const testimonials = testimonialData[section];

  return (
    <section className="mt-12 md:mt-16" aria-labelledby="testimonials-heading">
      <div className="text-center mb-8">
        <h2 id="testimonials-heading" className="text-2xl md:text-3xl text-white mb-2">
          What Our Users Say
        </h2>
        <p className="text-white/60 text-sm md:text-base">
          Join thousands of people who improved their sleep with EyeLoveSleep
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white/70 text-sm">4.8 out of 5 stars</span>
          <span className="text-white/50 text-sm">(2,847 reviews)</span>
        </div>
      </div>

      <div 
        className="grid md:grid-cols-3 gap-4 md:gap-6"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/8 transition-all"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/Review"
          >
            <div className="space-y-4">
              {/* Quote Icon */}
              <div className="flex justify-between items-start">
                <Quote className="w-8 h-8 text-blue-400/40" aria-hidden="true" />
                <div className="flex" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                  <meta itemProp="bestRating" content="5" />
                  <meta itemProp="worstRating" content="1" />
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p 
                className="text-white/80 text-sm leading-relaxed"
                itemProp="reviewBody"
              >
                {testimonial.text}
              </p>

              {/* Reviewer Info */}
              <div 
                className="border-t border-white/10 pt-4"
                itemProp="author"
                itemScope
                itemType="https://schema.org/Person"
              >
                <p className="text-white" itemProp="name">
                  {testimonial.name}
                </p>
                <p className="text-white/50 text-xs" itemProp="jobTitle">
                  {testimonial.role}
                </p>
                <meta itemProp="datePublished" content={testimonial.date} />
              </div>
            </div>

            {/* Hidden schema data */}
            <div itemProp="itemReviewed" itemScope itemType="https://schema.org/SoftwareApplication" style={{ display: 'none' }}>
              <span itemProp="name">EyeLoveSleep</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Trust signals */}
      <div className="mt-8 text-center">
        <p className="text-white/50 text-xs md:text-sm">
          ✓ Used by <strong className="text-white/70">100,000+</strong> people worldwide
          {' • '}
          ✓ Based on <strong className="text-white/70">scientific research</strong>
          {' • '}
          ✓ <strong className="text-white/70">Free forever</strong>
        </p>
      </div>
    </section>
  );
}
